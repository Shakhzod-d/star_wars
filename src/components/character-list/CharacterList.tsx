import { useCallback, useEffect, useState } from "react";
import { usePeople } from "../../hooks/usePeople";

import { fetchData } from "../../api/starWarsApi";
import { CharacterGraph } from "../character-graph";
import {
  ICharacter,
  IMovie,
  IPerson,
  IStarships,
} from "../../types/StarWarsTypes";

import { LoadingSpinner } from "../loading-spinner";
import { PersonCard } from "../person-card";

import "./PersonList.css";

export const PersonList = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data, error, isLoading } = usePeople(currentPage);
  const [selectedPersonId, setSelectedPersonId] = useState<number | null>(null);
  const [currentChar, setCurrentChar] = useState<ICharacter | null>(null);
  const [films, setFilms] = useState<IMovie[] | null>(null);
  const [starships, setStarships] = useState<IStarships[] | null>(null);

  if (error) {
    return <div className="error">An error occurred: {error.message}</div>;
  }

  const fetchCharacterData = useCallback(async (char: ICharacter) => {
    if (char.films.length > 0) {
      const fetchedFilms = await fetchData(char.films, "films");
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

  // Update character details when selected
  useEffect(() => {
    if (currentChar) {
      fetchCharacterData(currentChar);
    }
  }, [currentChar, fetchCharacterData]);

  useEffect(() => {
    if (currentChar && currentChar?.starships.length > 0) {
      const fetchStarships = async () => {
        try {
          // Use the fetchData function for starships
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

  const handlePersonClick = (person: IPerson) => {
    const isSamePersonSelected = selectedPersonId === person.id;
    setSelectedPersonId(isSamePersonSelected ? null : person.id);
    if (!isSamePersonSelected) {
      setCurrentChar({
        id: person.id,
        name: person.name,
        films: person.films.map(String),
        starships: person.starships,
      });
    } else {
      setCurrentChar(null);
    }
  };

  const handleNextPage = () => {
    if (data && data.next) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="person-list-container">
      <h1>Star Wars People</h1>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="people-list">
            {data?.results.map((person) => (
              <div
                key={person.id}
                className="person-name"
                onClick={() => handlePersonClick(person)}
              >
                <img
                  width={170}
                  height={200}
                  src={`https://starwars-visualguide.com/assets/img/characters/${person.id}.jpg`}
                  alt={person.name}
                />
                <div>{person.name}</div>
              </div>
            ))}
          </div>

          <div className="person-details">
            {data?.results
              .filter((person) => person.id === selectedPersonId)
              .map((person) => (
                <PersonCard key={person.id} person={person} />
              ))}
            {currentChar && (
              <CharacterGraph
                character={currentChar}
                films={films}
                starships={starships}
              />
            )}
          </div>

          {/* Pagination Controls */}
          <div className="pagination-controls">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              Previous
            </button>
            <span className="current-page">{currentPage || 1}</span>
            <button onClick={handleNextPage} disabled={!data?.next}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};
