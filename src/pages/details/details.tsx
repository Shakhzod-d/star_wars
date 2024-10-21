import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { IMovie, IPerson, IStarships } from "../../types/StarWarsTypes";
import { fetchData } from "../../api/starWarsApi";
import { CharacterGraph } from "../../components";
import { usePerson } from "../../hooks";
import { LoadingSpinner } from "../../components/loading-spinner";

export const Details = () => {
  const [films, setFilms] = useState<IMovie[] | null>(null);
  const [starships, setStarships] = useState<IStarships[] | null>(null);

  const { id } = useParams();
  if (!id) return <div style={{ color: "#fff" }}>No valid person ID</div>;

  const { data: currentChar, isLoading, isError, error } = usePerson(id);

  const fetchCharacterData = useCallback(async (char: IPerson) => {
    if (char.films.length > 0) {
      const fetchedFilms = await fetchData(char.films.map(String), "films");
      setFilms(fetchedFilms.map((film) => ({ ...film, name: film.title })));
    }
    if (char.starships.length > 0) {
      const fetchedStarships = await fetchData(
        char.starships.map(String),
        "starships"
      );
      setStarships(fetchedStarships);
    }
  }, []);

  useEffect(() => {
    if (currentChar) {
      fetchCharacterData(currentChar);
    }
  }, [currentChar, fetchCharacterData]);

  useEffect(() => {
    if (currentChar && currentChar?.starships.length > 0) {
      const fetchStarships = async () => {
        try {
          const fetchedStarships = await fetchData(
            currentChar?.starships.map(String),
            "starships"
          );
          setStarships(fetchedStarships);
        } catch (error) {
          console.error("Error fetching starships:", error);
        }
      };

      fetchStarships();
    }
  }, [currentChar?.starships]);

  return (
    <>
      <div className="person-details">
        {isError ? JSON.stringify(error) : ""}

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          currentChar && (
            <CharacterGraph
              character={currentChar}
              films={films}
              starships={starships}
            />
          )
        )}
      </div>
    </>
  );
};
