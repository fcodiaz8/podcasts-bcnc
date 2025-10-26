import styled from "styled-components";

export const PodcastCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  div.podcast-image {
    height: 5rem;
    img {
      border-radius: 50%;
      position: relative;
      height: 12rem;
    }
  }

  div.podcast-textdata {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;

    height: fit-content;
    width: 100%;
    padding: 1rem;
    padding-top: 7rem;
    box-sizing: border-box;

    border: 1px solid lightgrey;
    border-top: 1px solid #eee;
    border-radius: 0.2rem;
    box-shadow: 0 2px 3px 1px lightgrey;

    p {
      text-align: center;
    }
    p.podcast-name {
      font-weight: bold;
      margin: 0.5rem 0;
    }
  }
`;
