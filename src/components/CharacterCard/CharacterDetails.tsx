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

    {isLoading ? (
      <p>Loading Homeworld...</p>
    ) : (
      <div className="border p-3 rounded-xl">
        <p className="font-semibold mb-2">Homeworld</p>
        <p><span className="font-semibold">Name:</span> {homeland?.name}</p>
        <p><span className="font-semibold">Climate:</span> {homeland?.climate}</p>
        <p><span className="font-semibold">Terrain:</span> {homeland?.terrain}</p>
        <p><span className="font-semibold">Population:</span> {homeland?.population}</p>
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
