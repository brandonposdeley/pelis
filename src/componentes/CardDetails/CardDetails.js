import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { GoUnmute, GoMute } from "react-icons/go";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDataContext } from "../../context/slice.js";
import { Link } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";

function CardDetails({ title, img, id, desc, puntaje, estreno }) {
  const [showCard, setShowCard] = useState(true);
  const [link, setLink] = useState("");
  const [mute, setMute] = useState(false);
  const params = useParams();
  const { peliculas, pelis } = useDataContext();
  const videos = async () => {
    try {
      const video = await axios
        .get(
          `https://api.themoviedb.org/3/movie/${params.id}/videos?api_key=e8002c635aacc458eb931614052b44af&language=en-US`
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
  const data = peliculas.filter((item) => item.id === Number(params.id));

  const sonido = () => {
    setMute(!mute);
  };

  useEffect(() => {
    videos();
    pelis();

    if (link !== "") {
      setShowCard(true);
    }
  }, []);

  return (
    <div
      style={{ minHeight: "100vh", height: "auto" }}
      className="w-full bg-gray-800 py-4"
    >
      <div className="w-10/12 h-96 mx-auto text-white">
        <p className="w-20 mb-4 ml-auto">
          <Link to={"/"}>
            <TiArrowBack fontSize={60} />
          </Link>
        </p>
        {showCard ? (
          <ReactPlayer
            url={`http://www.youtube.com/watch?v=${link}`}
            height={"100%"}
            width={"100%"}
            volume={10}
            playing={true}
            muted={mute}
          />
        ) : (
          <h4 className="no-video">NO HAY VIDEO</h4>
        )}
      </div>
      {data.map((item) => {
        return (
          <div key={item.title} className="text-white w-10/12 mx-auto">
            {mute ? (
              <GoMute className="desc-mute" onClick={sonido} />
            ) : (
              <GoUnmute className="desc-mute" onClick={sonido} />
            )}
            <div>
              <p className="">Estreno: {item.estreno}</p>
              <p className="">Puntaje: {item.puntaje}</p>
            </div>
            <h3 className="">{item.title}</h3>
            <p className="">{item.desc}</p>
            <img
              className="w-80"
              src={`https://image.tmdb.org/t/p/w500/${item.img}`}
              alt=""
            />
          </div>
        );
      })}
    </div>
  );
}

export default CardDetails;
