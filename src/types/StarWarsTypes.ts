export interface IFilms {
  id: number;
  name?: string;
}
export interface ICharacter {
  id: number;
  name: string;
  films: string[];
  starships: number[];
}

export interface IPerson {
  id: number;
  name: string;
  birth_year: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  height: string;
  mass: string;
  skin_color: string;
  homeworld: number;
  films: IFilms[];
  species: number[];
  starships: number[];
  vehicles: number[];
  created: string;
  edited: string;
  url: string;
}

export interface ICharacterListResponse {
  count: number;
  next: string;
  previous: null | number;
  results: IPerson[];
}

export interface IMovie {
  id: number;
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: number[];
  planets: number[];
  starships: number[];
  vehicles: number[];
  species: number[];
  created: string;
  edited: string;
  url: string;
}

export interface IStarships {
  id: number;
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
  pilots: number[];
  films: number[];
  created: string;
  edited: string;
  url: string;
}
