import styled from "styled-components";

export const Podcast = styled.section`
  --color-primary: #2b6cb6;
  padding: 1rem 0.5rem;

  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 5%;
  width: 100%;
  box-sizing: border-box;

  div.info {
    hr {
      margin: 1rem 0;
    }
  }

  div.episodes {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    div.episodes-count {
      padding: 0.5rem 1rem;

      border: 1px solid lightgrey;
      border-top: 1px solid #eee;
      border-radius: 0.2rem;
      box-shadow: 0 2px 3px 1px lightgrey;
    }

    div.episodes-titles {
      padding: 0.5rem 1rem;

      border: 1px solid lightgrey;
      border-top: 1px solid #eee;
      border-radius: 0.2rem;
      box-shadow: 0 2px 3px 1px lightgrey;

      table {
        width: 100%;
        border-collapse: collapse;

        a {
          color: var(--color-primary);
          text-decoration: none;
        }

        col.titleCol {
          width: 70%;
          text-align: center;
        }

        col.fieldCol {
          width: 15%;
          text-align: center;
        }

        th:nth-child(1),
        td:nth-child(1) {
          padding-left: 1rem;
        }

        th:nth-child(1),
        th:nth-child(2) {
          text-align: left;
        }

        th:nth-child(3),
        td:nth-child(3) {
          text-align: center;
        }

        th {
          background-color: white;
          border-bottom: 2px solid lightgray;
        }

        td {
          border-bottom: 1px solid lightgray;
        }

        tr {
          height: 2.5rem;
        }

        tr:nth-child(even) {
          background-color: white;
        }

        tr:nth-child(odd) {
          background-color: #f8f8f8;
        }
      }
    }
  }
`;
