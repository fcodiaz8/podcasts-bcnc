import * as S from "./styles";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { PodcastCard } from "../../components/PodcastCard";

export const Podcasts = () => {
  const { setIsLoading } = useOutletContext();
  const [podcasts, setPodcasts] = useState([]);
  const [filteredPodcasts, setFilteredPodcasts] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    const fetchPodcasts = async () => {
      try {
        const res = await fetch(
          "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
        );
        const data = await res.json();
        setPodcasts(data.feed.entry);
        setFilteredPodcasts(data.feed.entry);
      } catch (error) {
        console.error("Error al cargar podcasts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPodcasts();
  }, [setIsLoading]);

  const handleChangeFilter = (e) => {
    const filterValue = e.target.value.toLowerCase();

    const newPodcasts = podcasts.filter(
      (p) =>
        p["im:name"].label.toLowerCase().includes(filterValue) ||
        p["im:artist"].label.toLowerCase().includes(filterValue)
    );

    setFilteredPodcasts(newPodcasts);
  };

  return (
    <S.Podcasts>
      <S.Filter>
        <p>{filteredPodcasts.length}</p>
        <input
          id="filter"
          type="text"
          placeholder="Filter podcasts..."
          onChange={handleChangeFilter}
        />
      </S.Filter>

      <S.PodcastsGrid>
        {filteredPodcasts.map((p, index) => (
          <PodcastCard key={index} data={p} />
        ))}
      </S.PodcastsGrid>
      {filteredPodcasts.length === 0 && (
        <p>Ningún resultado para este filtro.</p>
      )}
    </S.Podcasts>
  );
};
