import { type FC, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "../../hooks/";
import { useFetch } from "../../hooks/";
import { getSpeciesColor } from "../../utils/format";
import { CharacterCardItem } from "./CharacterCardItem";
import { CharacterModal } from "./CharacterModal";

interface CharacterProps {
  person: any;
}

export const CharacterExpandableCard: FC<CharacterProps> = ({ person }) => {
  const { data: Species } = useFetch(person.species?.[0] ?? "", person.species?.[0] ?? "");
  const { data: Homeland, isLoading: HomeLandLoading } = useFetch(
    person.homeworld ?? "",
    person.homeworld ?? ""
  );

  const [active, setActive] = useState<boolean>(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && setActive(false);
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useOutsideClick(ref, () => setActive(false));

  const cardStyle = {
    backgroundColor: getSpeciesColor(Species?.name),
  };

  return (
    <>
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

      <AnimatePresence>
        {active && (
          <CharacterModal
            ref={ref}
            id={id}
            person={person}
            species={Species}
            homeland={Homeland}
            isLoading={HomeLandLoading}
            onClose={() => setActive(false)}
          />
        )}
      </AnimatePresence>

      <CharacterCardItem
        id={id}
        person={person}
        imageLoaded={imageLoaded}
        onImageLoad={() => setImageLoaded(true)}
        onClick={() => setActive(true)}
        style={cardStyle}
      />
    </>
  );
};
