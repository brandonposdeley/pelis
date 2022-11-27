import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [peliculas, setPeliculas] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [link, setLink] = useState("");
  const [pag, setPag] = useState(1);
  const [genero, setGenero] = useState("popular");

  const pelis = async () => {
    try {
      setIsLoading(true);
      const resultData = await axios.get(
        `https://api.themoviedb.org/3/movie/${genero}?api_key=e8002c635aacc458eb931614052b44af&language=es-MX&page=${pag}&videos`
      );
      setPeliculas(
        resultData.data.results.map((pelicula) => ({
          title: pelicula.title,
          img: pelicula.poster_path,
          id: pelicula.id,
          desc: pelicula.overview,
          puntaje: pelicula.vote_average,
          estreno: pelicula.release_date,
        }))
      );
      /*
        .then((res) =>
          setPeliculas(
            res.data.results.map((pelicula) => ({
              title: pelicula.title,
              img: pelicula.poster_path,
              id: pelicula.id,
              desc: pelicula.overview,
              puntaje: pelicula.vote_average,
              estreno: pelicula.release_date,
            }))
          )
        );
        */
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    pelis();
  }, [pag, genero]);

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
      value={{
        peliculas,
        setPeliculas,
        isLoading,
        pelis,
        videos,
        link,
        pag,
        setPag,
        setGenero,
        genero,
      }}
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
