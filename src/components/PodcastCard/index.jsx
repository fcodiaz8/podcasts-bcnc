import * as S from "./styles";

export const PodcastCard = ({ data }) => {
  const name = data["im:name"].label ?? "-";

  const avatar = data["im:image"].find(
    (i) => i.attributes.height === "170"
  ).label;

  const artist = data["im:artist"].label ?? "-";

  return (
    <S.PodcastCard>
      <img src={avatar} alt={name} />
      <p className="podcast-name">{name.toUpperCase()}</p>
      <p>Author: {artist}</p>
    </S.PodcastCard>
  );
};
