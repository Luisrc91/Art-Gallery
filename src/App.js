import { useState, useEffect } from "react";
import ButtonBar from "./components/ButtonBar";
import Gallery from "./components/Gallery";
import "./App.css";

// import logo from './logo.svg';

function App() {
  let [data, setData] = useState({});
  let [objectId, artDetails] = useState(12720);

  useEffect(() => {
    document.title = "Welcome to Artworld";
    fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`
    )
      .then((response) => response.json())
      .then((resData) => setData(resData));
  }, [objectId]);

  const handleIterate = (e) => {
    artDetails(objectId + Number(e.target.value));
  };

  const displayImage = () => {
    if (!data.primaryImage) {
      return <h2>No Image!</h2>;
    }
    return (
      <Gallery
        objectImg={data.primaryImage}
        artist={data.artistDisplayName}
        title={data.title}
      />
    );
  };
  return (
    <div className="App">
      <h1>{data.title}</h1>
      <div style={{ width: "100%" }}>{displayImage()}</div>
      <ButtonBar handleIterate={handleIterate} />
    </div>
  );
}

export default App;
