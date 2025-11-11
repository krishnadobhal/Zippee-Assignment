import { useQuery } from "@tanstack/react-query"
import { FetchData } from "../utils/api";

export const useFetch = (url: string, key: string) => {
    return useQuery({
        queryKey: [key],
        queryFn: async () =>
            await FetchData(url),
        placeholderData: (prev) => prev
    });
};
