import { useEffect, useState } from "react";
import { useCharacters } from "../hooks";
import SkeletonCard from "../components/SkeletonCard";
import { characterImage } from "../utils/image";
import { CharacterExpandableCard } from "../components/CharacterCard";

export default function CharactersPage() {
    const [page, setPage] = useState(1);
    const [CharacterData, setCharacterData] = useState<any[]>([]);

    const { data, isLoading } = useCharacters(page);

    useEffect(() => {
        const processedData = data?.results?.map((p: any) => ({ ...p, src: characterImage(p.name) })) ?? [];
        setCharacterData(processedData);
    }, [data]);

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Star Wars Characters</h1>
            <div className="flex justify-between mb-6">
                <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className="px-4 py-2 border rounded-xl"
                >
                    ← Prev
                </button>

                <button
                    onClick={() => setPage((p) => p + 1)}
                    className="px-4 py-2 border rounded-xl"
                >
                    Next →
                </button>
            </div>

            {isLoading && CharacterData.length != 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <SkeletonCard key={i} />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                    {CharacterData.map((p: any) => (
                        <CharacterExpandableCard
                            key={p.url}
                            person={p}
                        />
                    ))}

                </div>
            )}
        </div>
    );
}
