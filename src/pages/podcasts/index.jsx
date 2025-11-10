import * as S from "./styles";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalLoading } from "../../hooks/useGlobalLoading";
import { PodcastCard } from "../../components/PodcastCard";

export const Podcasts = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [filteredPodcasts, setFilteredPodcasts] = useState([]);
  const { showLoading, hideLoading } = useGlobalLoading();

  useEffect(() => {
    showLoading();
    const now = Date.now();

    const fetchPodcasts = async () => {
      try {
        const res = await fetch(
          "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
        );
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

        const data = await res.json();
        const podcastsData = data.feed.entry;
        setPodcasts(podcastsData);
        setFilteredPodcasts(podcastsData);
        localStorage.setItem(
          "podcasts",
          JSON.stringify({ data: podcastsData, lastUpdate: now })
        );
      } catch (error) {
        console.error("Error al cargar podcasts:", error);
      } finally {
        hideLoading();
      }
    };

    const storagePodcasts = localStorage.getItem("podcasts");
    if (!storagePodcasts) {
      fetchPodcasts();
      return;
    }

    const { data, lastUpdate } = JSON.parse(storagePodcasts);

    const podcastsTTL = Number(
      import.meta.env.VITE_PODCASTS_TTL_MS ?? 86400000
    );
    const isExpired = now > lastUpdate + podcastsTTL;

    if (isExpired) {
      fetchPodcasts();
    } else {
      setPodcasts(data);
      setFilteredPodcasts(data);
      hideLoading();
    }
  }, [showLoading, hideLoading]);

  const handleChangeFilter = (e) => {
    const filterValue = e.target.value.toLowerCase();

    const newPodcasts = podcasts.filter((p) => {
      const name = p["im:name"].label.toLowerCase();
      const artist = p["im:artist"].label.toLowerCase();
      return name.includes(filterValue) || artist.includes(filterValue);
    });

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
        {filteredPodcasts.map((p, index) => {
          const podcastId = p.id.attributes["im:id"];
          return (
            <Link key={index} to={`/podcast/${podcastId}`}>
              <PodcastCard data={p} />
            </Link>
          );
        })}
      </S.PodcastsGrid>

      {podcasts.length > 0 && filteredPodcasts.length === 0 && (
        <p>No results for this filter.</p>
      )}
    </S.Podcasts>
  );
};
