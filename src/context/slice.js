import axios from "axios";
import { createContext, useContext, useState } from "react";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [peliculas, setPeliculas] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <Context.Provider value={{ peliculas, isLoading, pelis }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;

export const useDataContext = () => {
  const context = useContext(Context);
  return context;
};
