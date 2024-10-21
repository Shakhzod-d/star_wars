import { PersonList } from "./components/character-list/CharacterList";

import "./App.css";

const App = () => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <PersonList />
    </div>
  );
};

export default App;
