import { useState } from "react";
import { usePeople } from "../../hooks/usePeople";
import { useNavigate } from "react-router-dom";

import { IPerson } from "../../types/StarWarsTypes";

import { LoadingSpinner } from "../loading-spinner";

import "./PersonList.css";

export const PersonList = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data, error, isLoading } = usePeople(currentPage);
  const [selectedPersonId, setSelectedPersonId] = useState<number | null>(null);

  const navigate = useNavigate();

  if (error) {
    return <div className="error">An error occurred: {error.message}</div>;
  }

  const handlePersonClick = (person: IPerson) => {
    const isSamePersonSelected = selectedPersonId === person.id;
    setSelectedPersonId(isSamePersonSelected ? null : person.id);

    if (!isSamePersonSelected) {
      navigate(`/person/${person.id}`);
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
      <h1 className="title">Star Wars People</h1>
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
                <h2>{person.name}</h2>
                <p>
                  <strong>Birth Year:</strong> {person.birth_year}
                </p>
                <p>
                  <strong>Gender:</strong> {person.gender}
                </p>
                <p>
                  <strong>Eye Color:</strong> {person.eye_color}
                </p>
                <p>
                  <strong>Films:</strong> {person.films.join(", ")}
                </p>
                <p>
                  <strong>Species:</strong> {person.species.join(", ")}
                </p>
                <p>
                  <strong>Starships:</strong> {person.starships.join(", ")}
                </p>
                <p>
                  <strong>Vehicles:</strong> {person.vehicles.join(", ")}
                </p>
              </div>
            ))}
          </div>

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
