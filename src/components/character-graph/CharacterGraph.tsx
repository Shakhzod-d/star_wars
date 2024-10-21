import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  Edge,
  Node,
} from "react-flow-renderer";
import { ICharacter, IFilms, IStarships } from "../../types/StarWarsTypes";

import "./CharacterGraph.css";

interface CharacterGraphProps {
  character: ICharacter | null;
  films: IFilms[] | null;
  starships: IStarships[] | null;
}

export const CharacterGraph = ({
  character,
  films,
  starships,
}: CharacterGraphProps) => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  if (character) {
    nodes.push({
      id: `character-${character.id}`,
      type: "default",
      data: { label: character.name },
      position: { x: 250, y: 25 },
      style: { background: "#ffcc00", color: "#000" },
    });

    // Add movies and connections
    films?.forEach((film, index) => {
      nodes.push({
        id: `movie-id-${film.id}`,
        type: "default",
        data: { label: `Movie: ${film.name}` },
        position: { x: 100 + index * 150, y: 200 },
        style: { background: "#28a745", color: "#fff" },
      });

      // Connect character to movies
      edges.push({
        id: `edge-character-movie-${character.id}-${film.id}`,
        source: `character-${character.id}`,
        target: `movie-id-${film.id}`,
        animated: true,
        style: { stroke: "#000" },
      });

      // Add starships and connections from movies to starships
      starships?.forEach((starship, starshipIndex) => {
        nodes.push({
          id: `starship-id-${starship.id}`,
          type: "default",
          data: { label: `Starship: ${starship.name}` },
          position: { x: 300 + starshipIndex * 150, y: 200 + index * 100 },
          style: { background: "#007bff", color: "#fff" },
        });

        // Connect movie to starship
        edges.push({
          id: `edge-movie-starship-${film.id}-${starship.id}`,
          source: `movie-id-${film.id}`,
          target: `starship-id-${starship.id}`,
          animated: true,
          style: { stroke: "#000" },
        });
      });
    });
  }

  return (
    <div className="map">
      <ReactFlow nodes={nodes} edges={edges} style={{ background: "#f0f0f0" }}>
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};
