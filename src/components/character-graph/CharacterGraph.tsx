import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  Edge,
  Node,
} from "react-flow-renderer";
import { IFilms, IPerson, IStarships } from "../../types/StarWarsTypes";

import "./CharacterGraph.css";
// import { MovieNode } from "../movie-node";

interface CharacterGraphProps {
  character: IPerson | null;
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
        data: {
          label: `Movie: ${film.title}`,
          details: `Release Date: ${film.release_date}\nDirector: ${film.director}\nEpisode: ${film.episode_id}\nProducer: ${film.producer}`,
          // releaseDate: `Release Date: ${film.release_date}`,
          // director: `Director: ${film.director}`,
          // episode: `Episode: ${film.episode_id}`,
          // producer: `Producer: ${film.producer}`,
        },
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
    <div className="map" style={{ width: "90%" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        // nodeTypes={{ custom: MovieNode }}
        style={{
          background: "#f0f0f0",
          minWidth: "90% !important",
          height: "80vh",
        }}
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};
