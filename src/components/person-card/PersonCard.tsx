import { IPerson } from "../../types/StarWarsTypes";
import "./PersonCard.css"; // Importing CSS file for styling

interface PersonCardProps {
  person: IPerson;
}

export const PersonCard = ({ person }: PersonCardProps) => {
  return (
    <div className="person-card">
      <h2>{person.name}</h2>
      <p>
        <strong>Birth Year:</strong> {person.birth_year}
      </p>
      <p>
        <strong>Gender:</strong> {person.gender}
      </p>
      <p>
        <strong>Height:</strong> {person.height} cm
      </p>
      <p>
        <strong>Mass:</strong> {person.mass} kg
      </p>
      <p>
        <strong>Eye Color:</strong> {person.eye_color}
      </p>
      <p>
        <strong>Hair Color:</strong> {person.hair_color}
      </p>
      <p>
        <strong>Skin Color:</strong> {person.skin_color}
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
      <p>
        <strong>Created:</strong> {new Date(person.created).toLocaleString()}
      </p>
      <p>
        <strong>Edited:</strong> {new Date(person.edited).toLocaleString()}
      </p>
    </div>
  );
};
