import axios from "axios";
import { IPerson } from "../types/StarWarsTypes";

export const BASE_URL = "https://sw-api.starnavi.io";

export const fetchCharacters = async (page: number): Promise<IPerson[]> => {
  const response = await axios.get(`${BASE_URL}/people?page=${page}`);
  return response.data.results;
};

export const fetchData = async (ids: string[], endpoint: string) => {
  const requests = ids.map((id) =>
    fetch(`${BASE_URL}/${endpoint}/${id}/`).then((response) => response.json())
  );

  // Wait for all requests to settle (fulfilled or rejected)
  const results = await Promise.allSettled(requests);

  // Process the results: return only fulfilled ones
  return results
    .filter((result) => result.status === "fulfilled")
    .map((result: any) => result.value);
};
