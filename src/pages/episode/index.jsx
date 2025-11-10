import * as S from "./styles";
import DOMPurify from "dompurify";
import { useParams } from "react-router-dom";
import { PodcastInfo } from "../../components/PodcastInfo";
import { useFetchPodcast } from "../../hooks/useFetchPodcast";

export const Episode = () => {
  const { podcastId, episodeId } = useParams();
  const { podcast, episodes } = useFetchPodcast({ podcastId });

  const episode =
    episodes?.results?.find((p) => p.trackId.toString() === episodeId) || {};

  const { trackName, description: epidodeDescription, episodeUrl } = episode;

  return (
    <S.Podcast>
      <div className="info">
        <PodcastInfo
          avatar={podcast.avatar}
          title={podcast.title}
          author={podcast.author}
          description={podcast.description}
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
