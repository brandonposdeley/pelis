import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { GoUnmute, GoMute } from "react-icons/go";
import { useParams } from "react-router-dom";
import { useDataContext } from "../../context/slice.js";
import { Link } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";

function CardDetails() {
  const [showCard, setShowCard] = useState(true);
  const [mute, setMute] = useState(false);
  const [data, setData] = useState([]);
  const params = useParams();
  const { peliculas, videos, link } = useDataContext();

  const sonido = () => {
    setMute(!mute);
  };

  useEffect(() => {
    videos(params.id);
    if (link !== "") {
      setShowCard(true);
    }
    if (peliculas !== null) {
      setData(peliculas.filter((item) => item.id === Number(params.id)));
    }
  }, [peliculas]);

  return (
    <div
      style={{ minHeight: "100vh", height: "auto" }}
      className="w-full bg-gray-800 py-4"
    >
      <div className="w-10/12 h-96 mx-auto text-white">
        <p className="w-20 ml-auto">
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
      {data &&
        data.length > 0 &&
        data?.map((item) => {
          return (
            <div key={item.title} className="text-white w-10/12 mt-16 mx-auto">
              <div className="w-10 ml-auto">
                {mute ? (
                  <GoMute fontSize={28} onClick={sonido} />
                ) : (
                  <GoUnmute fontSize={28} onClick={sonido} />
                )}
              </div>
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
