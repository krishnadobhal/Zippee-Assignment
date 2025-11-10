"use client";

import { type FC, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { characterImage } from "../../utils/image";
import { cmToMeters, massKg, formatDate } from "../../utils/format";

interface CharacterProps {
    person: any;
    homeworld: any;
    speciesName: string;
    loading: boolean;
}

export const CharacterExpandableCard: FC<CharacterProps> = ({
    person,
    homeworld,
    speciesName,
    loading,
}) => {
    const cards = [
        {
            name: person.name,
            src: characterImage(person.name),
            ctaText: `${speciesName}`,
            ctaLink: "#",
            content: () => (
                <div className="space-y-4 text-sm">

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="font-semibold">Height</p>
                            <p>{cmToMeters(person.height)}</p>
                        </div>

                        <div>
                            <p className="font-semibold">Mass</p>
                            <p>{massKg(person.mass)}</p>
                        </div>

                        <div>
                            <p className="font-semibold">Birth Year</p>
                            <p>{person.birth_year}</p>
                        </div>

                        <div>
                            <p className="font-semibold">Films</p>
                            <p>{person.films.length}</p>
                        </div>

                        <div>
                            <p className="font-semibold">Date Added</p>
                            <p>{formatDate(person.created)}</p>
                        </div>

                        <div>
                            <p className="font-semibold">Species</p>
                            <p>{speciesName}</p>
                        </div>
                    </div>

                    <div className="border p-3 rounded-xl">
                        <p className="font-semibold mb-2">Homeworld</p>

                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <>
                                <p><span className="font-semibold">Name:</span> {homeworld?.name}</p>
                                <p><span className="font-semibold">Climate:</span> {homeworld?.climate}</p>
                                <p><span className="font-semibold">Terrain:</span> {homeworld?.terrain}</p>
                                <p><span className="font-semibold">Population:</span> {homeworld?.population}</p>
                            </>
                        )}
                    </div>
                </div>
            ),
        },
    ];

    const [active, setActive] = useState<any>(null);

    const ref = useRef<HTMLDivElement>(null);
    const id = useId();

    useEffect(() => {
        function onKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") setActive(null);
        }
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, []);

    useOutsideClick(ref, () => setActive(null));

    return (
        <>
            {/* Background Overlay */}
            <AnimatePresence>
                {active && (
                    <motion.div
                        className="fixed inset-0 bg-black/20 z-20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />
                )}
            </AnimatePresence>

            {/* Expanded View */}
            <AnimatePresence>
                {active && (
                    <div className="fixed inset-0 grid place-items-center z-40">
                        <motion.div
                            layoutId={`card-${active.name}-${id}`}
                            ref={ref}
                            className="max-w-[500px] w-full max-h-[90%] bg-white rounded-3xl shadow-xl overflow-hidden"
                        >
                            <motion.div layoutId={`image-${active.name}-${id}`}>
                                <img
                                    src={active.src}
                                    className="w-full h-72 object-cover"
                                />
                            </motion.div>

                            <div className="p-4">
                                <motion.h3
                                    layoutId={`name-${active.name}-${id}`}
                                    className="font-bold text-xl"
                                >
                                    {active.name}
                                </motion.h3>

                                <motion.div className="my-4">
                                    {active.content()}
                                </motion.div>
                            </div>

                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Collapsed Card */}
            <motion.div
                layoutId={`card-${cards[0].name}-${id}`}
                onClick={() => setActive(cards[0])}
                className="border p-4 rounded-xl cursor-pointer hover:bg-slate-50 transition"
            >
                <div className="flex items-center gap-4">
                    <motion.div layoutId={`image-${cards[0].name}-${id}`}>
                        <img
                            src={cards[0].src}
                            className="h-20 w-20 rounded-lg object-cover"
                        />
                    </motion.div>

                    <div>
                        <motion.h3
                            layoutId={`name-${cards[0].name}-${id}`}
                            className="font-semibold"
                        >
                            {cards[0].name}
                        </motion.h3>
                        <p className="text-sm text-slate-500">{speciesName}</p>
                    </div>
                </div>
            </motion.div>
        </>
    );
};
