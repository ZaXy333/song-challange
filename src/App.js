import React, { useState } from "react";
import "./App.css";

// Zmieniamy początkowe dane na puste, ponieważ będziemy je ładować z localStorage
const initialTiles = [
  { artist: "", title: "", description: "a song you discovered last year", image: "" },
  { artist: "", title: "", description: "a song that always makes you smile", image: "" },
  { artist: "", title: "", description: "a song that makes you cry", image: "" },
  { artist: "", title: "", description: "a song you know all the words to", image: "" },
  { artist: "", title: "", description: "a song from a genre you don`t listen normally", image: "" },
  { artist: "", title: "", description: "a song you don`t like, but like an artist", image: "" },
  { artist: "", title: "", description: "a song you like, but don`t like an artist", image: "" },
  { artist: "", title: "", description: "an underrated song", image: "" },
  { artist: "", title: "", description: "a song title that has a lot of words", image: "" },
  { artist: "", title: "", description: "a song from your childhood", image: "" },
  { artist: "", title: "", description: "a song that reminds you of summer", image: "" },
  { artist: "", title: "", description: "a guilty pleasure song", image: "" },
  { artist: "", title: "", description: "a song with a name in the title", image: "" },
  { artist: "", title: "", description: "a song that someone showed you", image: "" },
  { artist: "", title: "", description: "a song from a movie soundtrack", image: "" },
  { artist: "", title: "", description: "a song with no words", image: "" },
  { artist: "", title: "", description: "a song that you want to forget", image: "" },
  { artist: "", title: "", description: "a song that reminds you of somebody", image: "" },
  { artist: "", title: "", description: "a song to drive to", image: "" },
  { artist: "", title: "", description: "a song with a number in the title", image: "" },
  { artist: "", title: "", description: "a really one favourite song", image: "" },
  { artist: "", title: "", description: "a song with a long time duration", image: "" },
  { artist: "", title: "", description: "a song with a color in the title", image: "" },
  { artist: "", title: "", description: "a song that you`ve had stuck in your head", image: "" },
  { artist: "", title: "", description: "a song that you listen at Christmas", image: "" },
  { artist: "", title: "", description: "a song to wake up to", image: "" },
  { artist: "", title: "", description: "a song that describes how you feel right now", image: "" },
  { artist: "", title: "", description: "a song you used to hate but now love", image: "" },
  { artist: "", title: "", description: "a song in a language you don`t understand", image: "" },
  { artist: "", title: "", description: "a song you want to share", image: "" },
  { artist: "", title: "", description: "a song you play at the New Year`s Eve party", image: "" },
];

function App() {
  // Ładowanie motywu z localStorage lub domyślnie ciemny motyw
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme : "dark";
  });

  // Stan do przechowywania kafelek
  const [tiles, setTiles] = useState(() => {
    const savedTiles = localStorage.getItem("tiles");
    return savedTiles ? JSON.parse(savedTiles) : initialTiles;
  });

  // Funkcja zmiany motywu
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme); // Zapisz nowy motyw w localStorage
  };

  // Funkcja resetu (czyszczenie kafelków)
  const resetTiles = () => {
    const clearedTiles = initialTiles.map(tile => ({ ...tile, image: "" }));
    setTiles(clearedTiles);
    localStorage.setItem("tiles", JSON.stringify(clearedTiles)); // Zapisz wyczyszczone kafelki w localStorage
  };

  // Funkcja do zapisywania stanu kafelek w localStorage
  const saveToLocalStorage = (newTiles) => {
    localStorage.setItem("tiles", JSON.stringify(newTiles));
  };

  // Funkcja obsługująca zmianę obrazu
  const handleImageUpload = (index) => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const updatedTiles = [...tiles];
          updatedTiles[index].image = reader.result;
          setTiles(updatedTiles);
          saveToLocalStorage(updatedTiles); // Zapisujemy dane po zmianie
        };
        reader.readAsDataURL(file);
      }
    };
    fileInput.click();
  };

  // Funkcja obsługująca zmianę danych wejściowych (np. artysta, tytuł)
  const handleInputChange = (index, field, value) => {
    const updatedTiles = [...tiles];
    updatedTiles[index][field] = value;
    setTiles(updatedTiles);
    saveToLocalStorage(updatedTiles); // Zapisujemy dane po zmianie
  };

  return (
    <div className={`App ${theme}`}>
      <div className="header">
        <h1>31 Day Song Challenge 2024</h1>
        <hr />
      </div>

      {/* Przycisk resetu */}
      <button className="reset-button" onClick={resetTiles}>
        Reset All
      </button>

      {/* Przycisk zmiany motywu */}
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === "dark" ? "Switch to Light Theme" : "Switch to Dark Theme"}
      </button>

      <div className="container">
        {tiles.map((tile, index) => (
          <div key={index} className="card">
            <h3>Day {index + 1}</h3>
            <div
              className={`image-upload ${tile.image ? 'has-image' : ''}`}
              onClick={() => handleImageUpload(index)}
            >
              {tile.image ? (
                <img src={tile.image} alt={`Day ${index + 1}`} />
              ) : (
                <div className="placeholder">Click to add image</div>
              )}
            </div>
            <input
              type="text"
              placeholder="Artist"
              value={tile.artist}
              onChange={(e) => handleInputChange(index, "artist", e.target.value)}
            />
            <input
              type="text"
              placeholder="Title"
              value={tile.title}
              onChange={(e) => handleInputChange(index, "title", e.target.value)}
            />
            <p>{tile.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
