import { Outlet, Link } from "react-router-dom";
import * as S from "./styles";

export const Layout = () => {
  return (
    <S.Layout>
      <header>
        <nav>
          <Link to="/">Podcaster</Link>
        </nav>
        <hr />
      </header>

      <main>
        <Outlet />
      </main>
    </S.Layout>
  );
};
