import { forwardRef } from "react";
import { motion } from "framer-motion";
import { CharacterDetails } from "./CharacterDetails";

interface CharacterModalProps {
  id: string;
  person: any;
  species: any;
  homeland: any;
  isLoading: boolean;
  onClose: () => void;
}

export const CharacterModal = forwardRef<HTMLDivElement, CharacterModalProps>(
  ({ id, person, species, homeland, isLoading, onClose }, ref) => (
    <div className="fixed inset-0 grid place-items-center z-40">
      <motion.div
        layoutId={`card-${person.name}-${id}`}
        ref={ref}
        className="max-w-[500px] w-full max-h-[90%] bg-white rounded-3xl shadow-xl overflow-hidden relative"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 z-50 bg-gray-200 hover:bg-gray-300 rounded-full p-2 text-gray-700 transition-colors"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4 sm:w-5 sm:h-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <motion.div layoutId={`image-${person.name}-${id}`}>
          <img src={person.src} className="w-full h-72 object-cover" alt={person.name} />
        </motion.div>

        <div className="p-4">
          <motion.h3 layoutId={`name-${person.name}-${id}`} className="font-bold text-xl">
            {person.name}
          </motion.h3>

          <motion.div className="my-4">
            <CharacterDetails person={person} species={species} homeland={homeland} isLoading={isLoading} />
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
);

CharacterModal.displayName = "CharacterModal";
