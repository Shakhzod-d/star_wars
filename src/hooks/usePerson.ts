import { useQuery } from "@tanstack/react-query";
import { IPerson } from "../types/StarWarsTypes";
import { fetchPersonById } from "../api/starWarsApi";

export const usePerson = (id: string) => {
  return useQuery<IPerson, Error>({
    queryKey: ["person", id],
    queryFn: () => fetchPersonById(id),
    enabled: !!id,
  });
};
