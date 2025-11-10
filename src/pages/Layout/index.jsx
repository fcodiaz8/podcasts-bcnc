import * as S from "./styles";
import { Outlet, Link } from "react-router-dom";
import { Loader } from "../../components/Loader";
import { useGlobalLoading } from "../../hooks/useGlobalLoading.js";

export const Layout = () => {
  const { isLoading } = useGlobalLoading();

  return (
    <S.Layout>
      <header>
        <nav>
          <Link to="/">Podcaster</Link>
        </nav>
        {isLoading && <Loader />}
      </header>
      <hr />

      <main>
        <Outlet />
      </main>
    </S.Layout>
  );
};
