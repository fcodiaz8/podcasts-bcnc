import styled from "styled-components";

export const Layout = styled.div`
  --color-primary: #2b6cb6;

  header {
    display: flex;
    justify-content: space-between;

    a {
      font-size: 1.5rem;
      font-weight: bold;
      color: var(--color-primary);
      text-decoration: none;
    }

    a:hover {
      color: #0033dd;
    }
  }

  hr {
    border: 1px solid #ddd;
  }
`;
