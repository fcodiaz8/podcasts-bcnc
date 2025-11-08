import { useState, useEffect } from "react";
import { useGlobalLoading } from "./useGlobalLoading";
import { fetchAndCache } from "../utils/fetchAndCache";

export const useFetchPodcast = ({ podcastId }) => {
  const [podcasts, setPodcasts] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [podcast, setPodcast] = useState({});
  const { showLoading, hideLoading } = useGlobalLoading();

  const extractPodcastInfo = ({ podcasts, podcastId }) => {
    const podcastData =
      podcasts.find((p) => p.id.attributes["im:id"] === podcastId) || {};

    const avatar = podcastData["im:image"]?.find(
      (p) => p.attributes.height === "170"
    )?.label;
    const title = podcastData["im:name"]?.label;
    const author = podcastData["im:artist"]?.label;
    const description = podcastData["summary"]?.label;
    return { avatar, title, author, description };
  };

  useEffect(() => {
    const podcast = extractPodcastInfo({ podcasts, podcastId });
    setPodcast(podcast);
  }, [podcasts, podcastId]);

  useEffect(() => {
    let cancelled = false;
    showLoading();

    const fetchData = async () => {
      try {
        if (!cancelled) {
          await Promise.all(fetches.map((f) => fetchAndCache(f)));
        }
      } catch (err) {
        if (!cancelled) console.error("useFetchPodcast fetchData error: ", err);
      } finally {
        hideLoading();
      }
    };

    const now = Date.now();
    const podcastsCache = JSON.parse(localStorage.getItem("podcasts") || "{}");
    const episodesCache = JSON.parse(
      localStorage.getItem(`episodes_${podcastId}`) || "{}"
    );

    const podcastsTTL = Number(
      import.meta.env.VITE_PODCASTS_TTL_MS ?? 86400000
    );
    const episodesTTL = Number(
      import.meta.env.VITE_EPISODES_TTL_MS ?? 86400000
    );

    const podcastsExpired =
      !podcastsCache.lastUpdate || now > podcastsCache.lastUpdate + podcastsTTL;
    const episodesExpired =
      !episodesCache.lastUpdate || now > episodesCache.lastUpdate + episodesTTL;

    const fetches = [];

    if (podcastsExpired) {
      fetches.push({
        url: "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json",
        setState: setPodcasts,
        storageKey: "podcasts",
        parser: (data) => data.feed.entry,
      });
    } else {
      const podcast = extractPodcastInfo({
        podcasts: podcastsCache.data,
        podcastId,
      });
      setPodcast(podcast || {});
    }

    if (episodesExpired) {
      fetches.push({
        url: `https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode`,
        setState: setEpisodes,
        storageKey: `episodes_${podcastId}`,
        parser: (data) => data,
      });
    } else {
      setEpisodes(episodesCache.data || []);
    }

    fetchData();

    return () => {
      cancelled = true;
      hideLoading();
    };
  }, [podcastId, showLoading, hideLoading]);

  return { podcast, episodes };
};
