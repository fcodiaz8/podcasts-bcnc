import styled from "styled-components";

export const PodcastCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;

  height: 10rem;
  margin-top: 4rem;
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;

  border: 1px solid lightgrey;
  border-top: 1px solid #eee;
  border-radius: 0.2rem;
  box-shadow: 0 2px 3px 1px lightgrey;

  img {
    border-radius: 50%;
  }

  p.podcast-name {
    font-weight: bold;
    text-align: center;
    margin: 0.5rem 0;
  }
`;
