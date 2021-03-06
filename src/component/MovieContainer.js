//영화 목록 그리기
//데이터 요청
import styled from "styled-components";
import MovieCard from "./MovieCard";
import axios from "axios";
import { useState, useEffect } from "react";

const MovieListWrap = styled.div`
  width: 100%;
  background-color: #161b20;
`;

export default function MovieContainer(props) {
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
  const [movies, setMovies] = useState();
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    if (props.word !== "") {
      setLoading(true);
      axios
        .get("/v1/search/movie.json", {
          params: {
            query: props.word,
            display: 20,
          },
          headers: {
            "X-Naver-Client-Id": CLIENT_ID,
            "X-Naver-Client-Secret": CLIENT_SECRET,
          },
        })
        .then((response) => {
          setLoading(false);
          setMovies(response.data);
        });
    }
  }, [props.word, CLIENT_ID, CLIENT_SECRET]);
  return (
    <MovieListWrap>
      {isLoading
        ? "Loading..."
        : movies &&
          movies.items.map((movie, idx) => {
            const title = movie.title;
            const newTitle = title.replace(/(<([^>]+)>)/gi, "");
            const director = movie.director;
            const newDirector = director.replace("|", "");
            return (
              <MovieCard
                key={idx}
                actor={movie.actor}
                director={newDirector}
                image={movie.image}
                link={movie.link}
                pubDate={movie.pubDate}
                title={newTitle}
                userRating={movie.userRating}
                isList={false}
              />
            );
          })}
    </MovieListWrap>
  );
}
