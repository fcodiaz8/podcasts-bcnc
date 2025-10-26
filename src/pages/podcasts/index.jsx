import * as S from "./styles";
import { useEffect, useState } from "react";
import { PodcastCard } from "../../components/PodcastCard";
import PODCASTS_DATA from "../../mocks/podcasts.json";

export const Podcasts = () => {
  const [podcasts, setPodcasts] = useState([]);

  useEffect(() => {
    setPodcasts(PODCASTS_DATA.feed.entry);
  }, []);

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
