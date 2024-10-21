import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { IPerson } from "../types/StarWarsTypes";
import { BASE_URL } from "../api/starWarsApi";

interface PeopleResponse {
  results: IPerson[];
  next: string | null;
}

const fetchPeople = async (page: number): Promise<PeopleResponse> => {
  const response = await fetch(`${BASE_URL}/people/?page=${page}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const usePeople = (
  page: number,
  options?: UseQueryOptions<PeopleResponse, Error>
) => {
  return useQuery<PeopleResponse, Error>({
    queryKey: ["people", page],
    queryFn: () => fetchPeople(page),
    ...options,
  });
};
