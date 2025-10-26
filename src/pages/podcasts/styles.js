import styled from "styled-components";

export const Podcasts = styled.section`
  --color-primary: #2b6cb6;
`;

export const Filter = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;

  p {
    color: white;
    background-color: var(--color-primary);
    font-weight: bold;
    font-size: 1rem;
    height: 1.5rem;
    line-height: 1.5rem;
    padding: 0.1rem 0.35rem;
    border-radius: 0.5rem;
  }

  input {
    width: 20rem;
    height: 1.5rem;
    color: #444;
    padding: 0.2rem 0.4rem;
    border: 1px solid grey;
    border-radius: 0.2rem;
    outline: none;
  }
`;

export const PodcastsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, auto);
  gap: 5rem 2rem;
  width: 100%;
  box-sizing: content-box;
`;
