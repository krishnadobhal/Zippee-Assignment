import { useQuery } from "@tanstack/react-query"
import { GetCharacters } from "../utils/api";

export const useCharacters = (page: number) => {
    return useQuery({
        queryKey: ["characters", page],
        queryFn: async () =>
            await GetCharacters(page),
        placeholderData: (prev) => prev
    });
};
