import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./componentes/Navbar/Navbar";
import Card from "./componentes/Card/Card.js";
import { useDataContext } from "./context/slice";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [pag, setPag] = useState(1);
  const [genero, setGenero] = useState("popular");
  const [input, setInput] = useState("");
  const [searchOn, setSearchOn] = useState(false);
  const { pelis, peliculas, setPeliculas } = useDataContext();

  useEffect(() => {
    pelis(genero, pag);
  }, [pag, genero]);

  const busqueda = async (event) => {
    busquedaOn();
    event.preventDefault();
    const search = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=e8002c635aacc458eb931614052b44af&language=es-MX&page=${pag}&query=${input}`
    );
    const datosSearch = await search.json();
    console.log(datosSearch.results);
    setPeliculas(
      datosSearch.results.map((pelicula) => ({
        title: pelicula.title,
        img: pelicula.poster_path,
        id: pelicula.id,
        desc: pelicula.overview,
        puntaje: pelicula.vote_average,
        estreno: pelicula.release_date,
      }))
    );

    setInput("");
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
    console.log("pun");
    setGenero("top_rated");
    pelis();
    setPag(1);
  };
  const pelisPopulares = () => {
    console.log("pop");
    setGenero("popular");
    pelis();
    setPag(1);
  };
  const pelisProx = () => {
    console.log("es");
    setGenero("now_playing");
    pelis();
    setPag(1);
  };

  const busquedaOn = () => {
    setSearchOn(!searchOn);
  };

  return (
    <div className="App">
      <Navbar
        pelisPuntuadas={pelisPuntuadas}
        pelisPopulares={pelisPopulares}
        pelisProx={pelisProx}
      />
      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Customers also purchased
          </h2>
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

      <div className="btn__pagina">
        <div className="btn__pagina__container">
          <button className="btn" onClick={pagAnterior}>
            Anterior
          </button>
          <p>{pag}</p>
          <button className="btn" onClick={pagSiguiente}>
            Siguiente
          </button>
        </div>
      </div>

      <div className="footer">
        <div className="footer__container">
          <p>
            Creado por
            <strong> Brandon Posdeley</strong>. 2022
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
