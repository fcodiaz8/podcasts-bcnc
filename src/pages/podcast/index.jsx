import { useEffect, useState } from "react";
import * as S from "./styles";
import { Link, useOutletContext, useParams } from "react-router-dom";
import { PodcastInfo } from "../../components/PodcastDescription";

export const Podcast = () => {
  const { setIsLoading } = useOutletContext();
  const { podcastId } = useParams();
  const [podcastData, setPodcastData] = useState({});

  useEffect(() => {
    setIsLoading(true);

    const fetchPodcasts = async () => {
      try {
        const res = await fetch(
          `https://api.allorigins.win/get?url=${encodeURIComponent(
            `https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`
          )}`
        );
        const data = await res.json();
        const jsonData = JSON.parse(data.contents.trim());
        setPodcastData(jsonData);
        console.log(jsonData); ///tmp
      } catch (error) {
        console.error("Error al cargar podcast:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPodcasts();
  }, [setIsLoading, podcastId]);

  const podcastInfo = podcastData.resultCount ? podcastData.results[0] : {};
  const avatar = podcastInfo.artworkUrl600 ?? "-";
  const title = podcastInfo.collectionName ?? "-";
  const author = podcastInfo.artistName ?? "-";
  const description = podcastInfo.description ?? "-";
  const episodes = podcastData.resultCount ? podcastData.results.slice(1) : [];

  return (
    <S.Podcast>
      <div className="info">
        <PodcastInfo
          avatar={avatar}
          title={title}
          author={author}
          description={description}
        />
      </div>
      <div className="episodes">
        <div className="episodes-count">
          <h2>Episodes: 66</h2>
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
              {episodes.map((e) => {
                const date = new Date(e.releaseDate);
                const formattedDate = date.toLocaleDateString("es-ES");

                const totalSeconds = Math.floor(e.trackTimeMillis / 1000);
                const minutes = Math.floor(totalSeconds / 60);
                const seconds = totalSeconds % 60;
                const formattedTrackTime = `${minutes}:${seconds
                  .toString()
                  .padStart(2, "0")}`;
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
                    <td>{formattedTrackTime}</td>
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
