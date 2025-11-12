import { useEffect, useState, useMemo } from "react";
import { Menu, X } from "lucide-react";
import { useCharacters } from "../hooks";
import SkeletonCard from "../components/SkeletonCard";
import { characterImage } from "../utils/image";
import { CharacterExpandableCard } from "../components/CharacterCard";
import { FetchData } from "../utils/api";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom"

export default function CharactersPage() {
    const { token } = useAuth()
    console.log("Current token:", token);

    if (!token) return <Navigate to="/login" replace />

    const [page, setPage] = useState(1);
    const [CharacterData, setCharacterData] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    // filter state
    const [selectedHomeworld, setSelectedHomeworld] = useState("");
    const [selectedSpecies, setSelectedSpecies] = useState("");
    const [selectedFilm, setSelectedFilm] = useState("");

    // option lists (url -> label mapping)
    const [homeworldOptions, setHomeworldOptions] = useState<Array<{ url: string; name: string }>>([]);
    const [speciesOptions, setSpeciesOptions] = useState<Array<{ url: string; name: string }>>([]);
    const [filmOptions, setFilmOptions] = useState<Array<{ url: string; title: string }>>([]);
    const [showFilters, setShowFilters] = useState(false);

    const { data, isLoading } = useCharacters(page);

    useEffect(() => {
        const processedData =
            data?.results?.map((p: any) => ({ ...p, src: characterImage(p.name) })) ?? [];
        setCharacterData(processedData);
    }, [data]);

    useEffect(() => {
        if (!CharacterData || CharacterData.length === 0) {
            setHomeworldOptions([]);
            setSpeciesOptions([]);
            setFilmOptions([]);
            return;
        }

        // Get Unique URLs
        const homeworldUrls = Array.from(new Set(CharacterData.map((c) => c.homeworld).filter(Boolean)));
        const speciesUrls = Array.from(new Set(CharacterData.flatMap((c) => c.species || []).filter(Boolean)));
        const filmUrls = Array.from(new Set(CharacterData.flatMap((c) => c.films || []).filter(Boolean)));

        const fetchLabels = async () => {
            try {
                // Create fetch promises
                const hwPromises = homeworldUrls.map((u) => FetchData(u));
                const spPromises = speciesUrls.map((u) => FetchData(u));
                const fmPromises = filmUrls.map((u) => FetchData(u));

                // Fetch all in parallel
                const [hwResults, spResults, fmResults] = await Promise.all([
                    Promise.all(hwPromises),
                    Promise.all(spPromises),
                    Promise.all(fmPromises),
                ]);

                // set options lists

                setHomeworldOptions(
                    hwResults.map((r: any, i: number) => ({ url: homeworldUrls[i], name: r.name }))
                        .sort((a, b) => a.name.localeCompare(b.name))
                );
                setSpeciesOptions(
                    spResults.map((r: any, i: number) => ({ url: speciesUrls[i], name: r.name }))
                        .sort((a, b) => a.name.localeCompare(b.name))
                );
                setFilmOptions(
                    fmResults.map((r: any, i: number) => ({ url: filmUrls[i], title: r.title }))
                        .sort((a, b) => a.title.localeCompare(b.title))
                );
            } catch (err) {
                console.error("Error fetching filter labels", err);
            }
        };

        fetchLabels();
    }, [CharacterData]);

    // filtering logic
    const filteredCharacters = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();
        return CharacterData.filter((char) => {
            // name filter
            if (term && !char.name.toLowerCase().includes(term)) return false;

            // homeworld filter
            if (selectedHomeworld && char.homeworld !== selectedHomeworld) return false;
            // species filter
            if (selectedSpecies && !(char.species ?? []).includes(selectedSpecies)) return false;
            // film filter
            if (selectedFilm && !(char.films ?? []).includes(selectedFilm)) return false;
            return true;
        });
    }, [CharacterData, searchTerm, selectedHomeworld, selectedSpecies, selectedFilm]);

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">Star Wars Characters</h1>

                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="sm:hidden p-2 border rounded-lg hover:bg-gray-100"
                >
                    {showFilters ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            <div
                className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 transition-all duration-300 
                    ${showFilters ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0 sm:max-h-none sm:opacity-100"} 
                    overflow-hidden sm:overflow-visible`}
            >
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-2/3">
                    <input
                        type="text"
                        placeholder="Search by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border px-4 py-2 rounded-xl w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <select
                        value={selectedHomeworld}
                        onChange={(e) => setSelectedHomeworld(e.target.value)}
                        className="border px-3 py-2 rounded-xl w-full sm:w-1/4 focus:outline-none"
                    >
                        <option value="">All homeworlds</option>
                        {homeworldOptions.map((o) => (
                            <option key={o.url} value={o.url}>{o.name}</option>
                        ))}
                        {selectedHomeworld &&
                            !homeworldOptions.some((o) => o.url === selectedHomeworld) && (
                                <option value={selectedHomeworld}>Unknown Homeworld</option>
                            )}
                    </select>

                    <select
                        value={selectedSpecies}
                        onChange={(e) => setSelectedSpecies(e.target.value)}
                        className="border px-3 py-2 rounded-xl w-full sm:w-1/4 focus:outline-none"
                    >
                        <option value="">All species</option>
                        {speciesOptions.map((s) => (
                            <option key={s.url} value={s.url}>{s.name}</option>
                        ))}
                        {selectedSpecies &&
                            !speciesOptions.some((s) => s.url === selectedSpecies) && (
                                <option value={selectedSpecies}>Unknown Species</option>
                            )}
                    </select>

                    <select
                        value={selectedFilm}
                        onChange={(e) => setSelectedFilm(e.target.value)}
                        className="border px-3 py-2 rounded-xl w-full sm:w-1/4 focus:outline-none"
                    >
                        <option value="">All films</option>
                        {filmOptions.map((f) => (
                            <option key={f.url} value={f.url}>{f.title}</option>
                        ))}
                        {selectedFilm &&
                            !filmOptions.some((f) => f.url === selectedFilm) && (
                                <option value={selectedFilm}>Unknown Film</option>
                            )}
                    </select>

                    <button
                        onClick={() => {
                            setSelectedHomeworld("");
                            setSelectedSpecies("");
                            setSelectedFilm("");
                        }}
                        className="px-6 py-2 rounded-lg text-sm font-medium text-white transition hover:bg-red-700 disabled:opacity-70 bg-red-800"
                    >
                        Clear
                    </button>
                </div>

            </div>
            <div className="flex gap-2 justify-between sm:justify-end mb-4">
                <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className={`px-4 py-2 rounded-lg text-sm font-medium text-white transition bg-red-600 hover:bg-red-800 disabled:opacity-70 ${page === 1 ? "cursor-not-allowed" : "cursor-pointer"}`}
                >
                    ← Prev
                </button>

                <button
                    onClick={() => setPage((p) => p + 1)}
                    className="px-4 py-2 rounded-lg bg-indigo-600 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:opacity-70"
                >
                    Next →
                </button>
            </div>

            {isLoading && CharacterData.length === 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <SkeletonCard key={i} />
                    ))}
                </div>
            ) : filteredCharacters.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                    {filteredCharacters.map((p: any) => (
                        <CharacterExpandableCard key={p.url} person={p} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500 mt-10">No characters found.</p>
            )}
        </div>
    );
}
