import styled from "styled-components";

export const Podcast = styled.section`
  --color-primary: #2b6cb6;
  padding: 1rem 0.5rem;

  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 5%;
  width: 100%;
  box-sizing: border-box;

  div.episode {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    padding: 2rem;
    border: 1px solid lightgrey;
    border-top: 1px solid #eee;
    border-radius: 0.2rem;
    box-shadow: 0 2px 3px 1px lightgrey;

    div.episodeDescription {
      word-wrap: break-word;
      overflow-wrap: anywhere;
      white-space: normal;
    }

    audio {
      height: 3rem;
      width: 100%;
    }

    audio::-webkit-media-controls-enclosure {
      border-radius: 10px;
    }

    audio::-webkit-media-controls-panel {
      background-color: darkgray;
    }
  }
`;
