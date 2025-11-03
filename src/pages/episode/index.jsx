import { useEffect, useState } from "react";
import * as S from "./styles";
import DOMPurify from "dompurify";
import { useParams } from "react-router-dom";
import { PodcastInfo } from "../../components/PodcastInfo";
import { useGlobalLoading } from "../../hooks/useGlobalLoading";

export const Episode = () => {
  const { podcastId, episodeId } = useParams();
  const [podcastData, setPodcastData] = useState({});
  const [summaryPodcast, setSummaryPodcast] = useState("");
  const { showLoading, hideLoading } = useGlobalLoading();

  useEffect(() => {
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
        hideLoading();
      }
    };

    const fetchPodcasts = async () => {
      try {
        const res = await fetch(
          "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
        );
        const data = await res.json();
        const thisPodcast = data.feed.entry.find(
          (p) => p.id.attributes["im:id"] === podcastId
        );
        setSummaryPodcast(thisPodcast.summary?.label);
      } catch (error) {
        console.error("Error al cargar podcasts:", error);
      } finally {
        hideLoading();
      }
    };

    fetchEpisodes();
    fetchPodcasts();
  }, [podcastId, showLoading, hideLoading]);

  const podcastInfo = podcastData.resultCount ? podcastData.results[0] : {};
  const avatar = podcastInfo.artworkUrl600;
  const title = podcastInfo.collectionName;
  const author = podcastInfo.artistName;

  const podcast =
    podcastData.results?.find((p) => p.trackId.toString() === episodeId) || {};
  const { trackName, description: epidodeDescription, episodeUrl } = podcast;

  return (
    <S.Podcast>
      <div className="info">
        <PodcastInfo
          avatar={avatar}
          title={title}
          author={author}
          description={summaryPodcast}
          podcastId={podcastId}
        />
      </div>

      <div className="episode">
        <h2>{trackName}</h2>
        <div
          className="episodeDescription"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(
              epidodeDescription?.replace(/\n/g, "<br>")
            ),
          }}
        />
        {podcast && <audio controls src={episodeUrl} />}
      </div>
    </S.Podcast>
  );
};
