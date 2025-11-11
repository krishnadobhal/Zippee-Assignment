import { motion } from "framer-motion";
import SkeletonCard from "../SkeletonCard";

interface CharacterCardItemProps {
  id: string;
  person: any;
  imageLoaded: boolean;
  onImageLoad: () => void;
  onClick: () => void;
  style?: React.CSSProperties;
}

export const CharacterCardItem = ({
  id,
  person,
  imageLoaded,
  onImageLoad,
  onClick,
  style,
}: CharacterCardItemProps) => (
  <motion.div
    layoutId={`card-${person.name}-${id}`}
    onClick={onClick}
    className="border p-4 rounded-xl cursor-pointer hover:bg-slate-50 transition"
    style={style}
  >
    <div className="flex items-center gap-4">
      {imageLoaded ? (
        <div className="p-4 rounded-xl">
          <motion.div layoutId={`image-${person.name}-${id}`}>
            <img
              src={person.src}
              className="h-20 w-20 rounded-lg object-cover"
              alt={person.name}
            />
          </motion.div>

          <motion.h3
            layoutId={`name-${person.name}-${id}`}
            className="font-semibold mt-2"
          >
            {person.name}
          </motion.h3>
        </div>
      ) : (
        <SkeletonCard />
      )}
      <img
        src={person.src}
        alt={person.name}
        className="hidden"
        onLoad={onImageLoad}
      />
    </div>
  </motion.div>
);
