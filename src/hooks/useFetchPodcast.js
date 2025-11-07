import { useState, useEffect } from "react";
import { useGlobalLoading } from "./useGlobalLoading";

export const useFetchPodcast = ({ podcastId }) => {
  const [data, setData] = useState({ podcast: [], episodes: [] });
  const { showLoading, hideLoading } = useGlobalLoading();

  useEffect(() => {
    let cancelled = false;
    showLoading();

    const fetchData = async () => {
      try {
        const [podcastsRes, episodesRes] = await Promise.all([
          fetch(
            "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
          ),
          fetch(
            `https://api.allorigins.win/get?url=${encodeURIComponent(
              `https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`
            )}`
          ),
        ]);

        const [podcastsData, episodesData] = await Promise.all([
          podcastsRes.json(),
          episodesRes.json(),
        ]);

        const podcasts = podcastsData.feed?.entry;
        const podcastData =
          podcasts.find((p) => p.id.attributes["im:id"] === podcastId) || {};

        const avatar = podcastData["im:image"]?.find(
          (p) => p.attributes.height === "170"
        )?.label;
        const title = podcastData["im:name"]?.label;
        const author = podcastData["im:artist"]?.label;
        const description = podcastData["summary"]?.label;
        const podcast = { avatar, title, author, description };

        const episodes = JSON.parse(episodesData.contents.trim());

        if (!cancelled) {
          setData({ podcast, episodes });
        }
      } catch (err) {
        if (!cancelled) console.error("useFetchPodcast fetchData error: ", err);
      } finally {
        hideLoading();
      }
    };

    fetchData();

    return () => {
      cancelled = true;
      hideLoading();
    };
  }, [podcastId, showLoading, hideLoading]);

  return { ...data };
};
