import * as S from "./styles";
import { useGlobalLoading } from "../../hooks/useGlobalLoading";
import { Link } from "react-router-dom";

export const PodcastInfo = ({
  avatar,
  title = "-",
  author = "-",
  description = "-",
  podcastId,
}) => {
  const { isLoading } = useGlobalLoading();

  return isLoading ? (
    <S.PodcastInfo>...</S.PodcastInfo>
  ) : (
    <S.PodcastInfo>
      <Link to={`/podcast/${podcastId}`}>
        <div className="podcast-info-image">
          {avatar && <img src={avatar} alt={title} />}
        </div>
        <hr />
        <div className="podcast-info-name">
          <p>
            <b>{title}</b>
          </p>
          <p>
            <i>by {author}</i>
          </p>
        </div>
      </Link>
      <hr />
      <div className="podcast-info-description">
        <p>
          <b>Description:</b>
        </p>
        <p>
          <i>{description}</i>
        </p>
      </div>
    </S.PodcastInfo>
  );
};
