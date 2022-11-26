import axios from "axios";
import { createContext, useContext, useState } from "react";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [peliculas, setPeliculas] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [link, setLink] = useState("");

  const pelis = async (genero, pag) => {
    try {
      setIsLoading(true);

      const pelis = await axios
        .get(
          `https://api.themoviedb.org/3/movie/${genero}?api_key=e8002c635aacc458eb931614052b44af&language=es-MX&page=${pag}&videos`
        )
        .then((res) => res.data);
      setPeliculas(
        pelis.results.map((pelicula) => ({
          title: pelicula.title,
          img: pelicula.poster_path,
          id: pelicula.id,
          desc: pelicula.overview,
          puntaje: pelicula.vote_average,
          estreno: pelicula.release_date,
        }))
      );
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const videos = async (id) => {
    try {
      const video = await axios
        .get(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=e8002c635aacc458eb931614052b44af&language=en-US`
        )
        .then((res) => res.data);

      const trailer = video.results
        .filter((tra) => tra.type.toLowerCase().includes("trailer"))
        .map((elem) => ({
          llave: elem.key,
        }));
      setLink(trailer[0].llave);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Context.Provider
      value={{ peliculas, setPeliculas, isLoading, pelis, videos, link }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;

export const useDataContext = () => {
  const context = useContext(Context);
  return context;
};
