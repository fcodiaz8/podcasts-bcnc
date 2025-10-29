import styled from "styled-components";

export const PodcastInfo = styled.div`
  padding: 1rem;

  border: 1px solid lightgrey;
  border-top: 1px solid #eee;
  border-radius: 0.2rem;
  box-shadow: 0 2px 3px 1px lightgrey;

  div.podcast-info-image {
    text-align: center;

    img {
      width: 70%;
      border-radius: 0.5rem;
    }
  }

  hr {
    border: 1px solid #ddd;
  }
`;
