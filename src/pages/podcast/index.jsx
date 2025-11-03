import { useEffect, useState } from "react";
import * as S from "./styles";
import { Link, useParams } from "react-router-dom";
import { PodcastInfo } from "../../components/PodcastInfo/index.jsx";
import { useGlobalLoading } from "../../hooks/useGlobalLoading.js";

export const Podcast = () => {
  const { podcastId } = useParams();
  const [podcastData, setPodcastData] = useState({});
  const { showLoading, hideLoading, isLoading } = useGlobalLoading();

  useEffect(() => {
    let cancelled = false;
    showLoading();

    const fetchEpisodes = async () => {
      try {
        const res = await fetch(
          `https://api.allorigins.win/get?url=${encodeURIComponent(
            `https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`
          )}`
        );
        const data = await res.json();
        const jsonData = JSON.parse(data.contents.trim());
        setPodcastData(jsonData);
      } catch (error) {
        console.error("Error al cargar podcast:", error);
      } finally {
        if (!cancelled) hideLoading();
      }
    };

    fetchEpisodes();

    return () => {
      cancelled = true;
      hideLoading();
    };
  }, [podcastId, showLoading, hideLoading]);

  const podcastInfo = podcastData.resultCount ? podcastData.results[0] : {};
  const avatar = podcastInfo.artworkUrl600;
  const title = podcastInfo.collectionName;
  const author = podcastInfo.artistName;
  const description = podcastInfo.description ?? "-";
  const episodes = podcastData.resultCount ? podcastData.results.slice(1) : [];

  const formatDuration = (trackTimeMillis) => {
    const totalSeconds = Math.floor(trackTimeMillis / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");

    const formattedTrackTime = hours
      ? `${hours}:${minutes}:${seconds}`
      : `${minutes}:${seconds}`;
    return formattedTrackTime;
  };

  return (
    <S.Podcast>
      <div className="info">
        <PodcastInfo
          avatar={avatar}
          title={title}
          author={author}
          description={description}
          podcastId={podcastId}
        />
      </div>
      <div className="episodes">
        <div className="episodes-count">
          <h2>Episodes: {isLoading ? "..." : podcastData.resultCount - 1}</h2>
        </div>
        <div className="episodes-titles">
          <table>
            <colgroup>
              <col className="titleCol" />
              <col className="fieldCol" />
              <col className="fieldCol" />
            </colgroup>
            <thead>
              <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                </tr>
              )}
              {!isLoading &&
                episodes.map((e) => {
                  const date = new Date(e.releaseDate);
                  const formattedDate = date.toLocaleDateString("es-ES");
                  const formattedDuration = formatDuration(e.trackTimeMillis);

                  return (
                    <tr key={e.trackId}>
                      <td>
                        <Link
                          to={`/podcast/${e.collectionId}/episode/${e.trackId}`}
                        >
                          {e.trackName}
                        </Link>
                      </td>
                      <td>{formattedDate}</td>
                      <td>{formattedDuration}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </S.Podcast>
  );
};
