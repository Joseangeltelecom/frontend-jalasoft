import "./App.css";
import { useEffect, useState } from "react";
import CharacterCard from "./CharacterCard";
import LoadingSpinner from "./hooks/LoadingSpinner";

function App() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchJSON = async () => {
      const response = await fetch("./characters.json");
      const data = await response.json();
      setCharacters(data);
      setIsLoading(false);
    };

    setTimeout(() => {
      fetchJSON();
    }, 3000);
  }, []);

  const renderCharacters = (
    <>
      {characters.map((character) => (
        <CharacterCard
          id={character.id}
          key={character.id}
          name={character.name}
          image={character.image}
          occupation={character.occupation}
          description={character.description}
        />
      ))}
    </>
  );

  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  return (
    <div className="App">
      <>
        {isLoading ? (
          <div style={style}>
            <LoadingSpinner />
          </div>
        ) : (
          renderCharacters
        )}
      </>
    </div>
  );
}

export default App;
