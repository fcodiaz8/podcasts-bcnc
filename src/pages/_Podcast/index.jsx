import * as S from "./styles";
import { Link, useParams } from "react-router-dom";
import { PodcastInfo } from "../../components/PodcastInfo/index.jsx";
import { useGlobalLoading } from "../../hooks/useGlobalLoading.js";
import { useFetchPodcast } from "../../hooks/useFetchPodcast.js";
import { formatDuration } from "../../utils/formatDuration.js";

export const Podcast = () => {
  const { podcastId } = useParams();
  const { isLoading } = useGlobalLoading();
  const { podcast, episodes } = useFetchPodcast({ podcastId });
  const { resultCount, results = [] } = episodes;
  const episodesData = results.slice(1);

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

      <div className="episodes">
        <div className="episodes-count">
          <h2>Episodes: {isLoading ? "..." : resultCount - 1}</h2>
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
                episodesData.map((e) => {
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
