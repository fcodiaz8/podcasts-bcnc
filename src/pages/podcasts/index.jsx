import * as S from "./styles";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { PodcastCard } from "../../components/PodcastCard";

export const Podcasts = () => {
  const { setIsLoading } = useOutletContext();
  const [podcasts, setPodcasts] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    const fetchPodcasts = async () => {
      try {
        const res = await fetch(
          "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
        );
        const data = await res.json();
        setPodcasts(data.feed.entry);
      } catch (error) {
        console.error("Error al cargar podcasts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPodcasts();
  }, [setIsLoading]);

  return (
    <S.Podcasts>
      <S.Filter>
        <p>100</p>
        <input type="text" placeholder="Filter podcasts..." id="filter" />
      </S.Filter>

      <S.PodcastsGrid>
        {podcasts.map((p, index) => (
          <PodcastCard key={index} data={p} />
        ))}
      </S.PodcastsGrid>
    </S.Podcasts>
  );
};
