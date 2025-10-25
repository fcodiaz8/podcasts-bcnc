import styled from "styled-components";

export const Layout = styled.div`
  --color-primary: #2b6cb6;

  header {
    a {
      font-size: 1.5rem;
      font-weight: bold;
      color: var(--color-primary);
      text-decoration: none;
    }

    a:hover {
      color: #0000aa;
    }

    hr {
      width: 100%;
    }
  }
`;
