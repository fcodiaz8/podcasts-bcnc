import * as S from "./styles";

export const Podcasts = () => {
  return (
    <S.Podcasts>
      <h2>Podcaster</h2>
      <hr />
      <S.Filter>
        <p>100</p>
        <input type="text" placeholder="Filter podcasts..." id="filter" />
      </S.Filter>
    </S.Podcasts>
  );
};
