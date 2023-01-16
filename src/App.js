import React, { useState } from "react";
import "./App.css";
import Navbar from "./componentes/Navbar/Navbar";
import Card from "./componentes/Card/Card.js";
import { useDataContext } from "./context/slice";
import { GiFilmSpool } from "react-icons/gi";
import Footer from "./componentes/Footer/Footer";
import axios from "axios";

function App() {
  const [isLoading, setIsLoading] = useState(false);

  const [input, setInput] = useState("");
  const [searchOn, setSearchOn] = useState(false);
  const { pelis, peliculas, setPeliculas, pag, setGenero, setPag } =
    useDataContext();
  const busqueda = async (event) => {
    event.preventDefault();
    if (![input].includes("")) {
      busquedaOn();
      event.preventDefault();
      const search = await axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=e8002c635aacc458eb931614052b44af&language=es-MX&page=${pag}&query=${input}`
        )
        .then((res) => res.data);
      setPeliculas(
        search.results.map((pelicula) => ({
          title: pelicula.title,
          img: pelicula.poster_path,
          id: pelicula.id,
          desc: pelicula.overview,
          puntaje: pelicula.vote_average,
          estreno: pelicula.release_date,
        }))
      );
      setInput("");
    }
  };

  const pagSiguiente = () => {
    if (pag < 1000) {
      setPag(pag + 1);
      setIsLoading(false);
    }
  };
  const pagAnterior = () => {
    if (pag > 1) {
      setPag(pag - 1);
      setIsLoading(false);
    }
  };

  const pelisPuntuadas = () => {
    setGenero("top_rated");
    pelis();
    setPag(1);
  };
  const pelisPopulares = () => {
    setGenero("popular");
    pelis();
    setPag(1);
  };
  const pelisProx = () => {
    setGenero("now_playing");
    pelis();
    setPag(2);
  };

  const busquedaOn = () => {
    setSearchOn(!searchOn);
  };

  return (
    <div className="App">
      <Navbar
        busqueda={busqueda}
        setInput={setInput}
        pelisPuntuadas={pelisPuntuadas}
        pelisPopulares={pelisPopulares}
        pelisProx={pelisProx}
        input={input}
      />
      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-16 px-2 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="flex justify-center items-center">
            <GiFilmSpool fontSize={80} />
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Peliculas
            </h2>
          </div>
          <div className="mt-6 grid grid-cols-1 text-center gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {isLoading === true ? (
              <p>Loading</p>
            ) : (
              peliculas?.map((item) => (
                <Card
                  title={item.title}
                  img={item.img}
                  id={item.id}
                  key={item.id}
                  desc={item.desc}
                  puntaje={item.puntaje}
                  estreno={item.estreno}
                />
              ))
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-5 items-center mb-20">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={pagAnterior}
          data-ripple-dark="true"
        >
          Anterior
        </button>
        <p className="text-lg">{pag}</p>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={pagSiguiente}
          data-ripple-dark="true"
        >
          Siguiente
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default App;
