import * as S from "./styles";

export const PodcastInfo = ({ avatar, title, author, description }) => {
  console.log({ avatar });

  return (
    <S.PodcastInfo>
      <div className="podcast-info-image">
        <img src={avatar} alt={title} />
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
