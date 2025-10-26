import * as S from "./styles";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { PodcastCard } from "../../components/PodcastCard";
import MOCK_PODCASTS_DATA from "../../mocks/podcasts.json";

export const Podcasts = () => {
  const { setIsLoading } = useOutletContext();
  const [podcasts, setPodcasts] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    const timeout = setTimeout(() => {
      setPodcasts(MOCK_PODCASTS_DATA.feed.entry);
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timeout);
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
