import { motion } from "framer-motion";
import { cmToMeters, massKg, formatDate } from "../../utils/format";

interface CharacterDetailsProps {
  person: any;
  species: any;
  homeland: any;
  isLoading: boolean;
}

export const CharacterDetails = ({ person, species, homeland, isLoading }: CharacterDetailsProps) => (
  <div className="space-y-4 text-sm">
    <div className="grid grid-cols-2 gap-4">
      <Info label="Height" value={cmToMeters(person.height)} />
      <Info label="Mass" value={massKg(person.mass)} />
      <Info label="Birth Year" value={person.birth_year} />
      <Info label="Films" value={person.films.length} />
      <Info label="Date Added" value={formatDate(person.created)} />
      {species?.name && <Info label="Species" value={species.name} />}
    </div>
    <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
    {isLoading ? (
      <p>Loading Homeworld...</p>
    ) : (

      <div >
        <motion.h3 className="font-bold text-lg mb-3">
          HomeLand
        </motion.h3>
        <div>
          <div className="grid grid-cols-2 gap-4 ">
            <Info label="Name" value={homeland?.name} />
            <Info label="Climate" value={homeland?.climate} />
            <Info label="Terrain" value={homeland?.terrain} />
            <Info label="Population" value={homeland?.population} />
          </div>
        </div>
      </div>
    )}
  </div>
);

const Info = ({ label, value }: { label: string; value: string | number }) => (
  <div>
    <p className="font-semibold">{label}</p>
    <p>{value}</p>
  </div>
);
