import { useEffect, useState } from "react";
import { fetchCharacters } from "../api/starWarsApi";
import { IPerson } from "../types/StarWarsTypes";

const useFetchCharacters = (initialPage: number) => {
  const [characters, setCharacters] = useState<IPerson[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(initialPage);

  useEffect(() => {
    const loadCharacters = async () => {
      try {
        const data = await fetchCharacters(page);
        setCharacters(data);
      } catch (err) {
        setError("Error fetching characters.");
      } finally {
        setLoading(false);
      }
    };

    loadCharacters();
  }, [page]);

  return { characters, loading, error, setPage };
};

export default useFetchCharacters;
