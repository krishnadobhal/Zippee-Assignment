import { useState } from "react";
import { useCharacters } from "../hooks/characters";
import { useFetch } from "../hooks/Fetch";
import { useQueries } from "@tanstack/react-query";
import { FetchData } from "../utils/api";

import SkeletonCard from "../components/SkeletonCard";
import { CharacterExpandableCard } from "../components/aceternity-ui/CharacterExpandableCard";

export default function CharactersPage() {
    const [page, setPage] = useState(1);
    const [selected, setSelected] = useState<any>(null);

    const { data, isLoading } = useCharacters(page);

    const speciesUrls = data?.results?.map((p: any) => p.species?.[0] ?? "") ?? [];

    const speciesQueries = useQueries({
        queries: speciesUrls.map((url: string, i: number) => ({
            queryKey: [`species-${data?.results?.[i]?.url ?? i}`],
            queryFn: async () => await FetchData(url),
            enabled: !!url,
        })),
    }) || [];

    const speciesMap: Record<string, string> = {};
    speciesQueries.forEach((q: any, i: number) => {
        const key = data?.results?.[i]?.species?.[0];
        if (key) speciesMap[key] = q.data?.name ?? "Unknown";
    });

    const homeworldQuery = useFetch(
        selected?.homeworld ?? "",
        selected ? `homeworld-${selected?.url}` : "homeworld"
    );

    const speciesQuery = useFetch(
        selected?.species?.[0] ?? "",
        selected ? `modal-species-${selected?.url}` : "modal-species"
    );

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Star Wars Characters</h1>

            {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <SkeletonCard key={i} />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                    {data?.results?.map((p: any) => (
                        <CharacterExpandableCard
                            key={p.url}
                            person={p}
                            homeworld={homeworldQuery.data}
                            speciesName={speciesMap[p.species[0]] || "Human"}
                            loading={homeworldQuery.isLoading || speciesQuery.isLoading}
                        />
                    ))}

                </div>
            )}

            {/* Pagination */}
            <div className="flex justify-between mt-6">
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
        </div>
    );
}
