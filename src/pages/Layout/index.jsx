import { useState } from "react";
import * as S from "./styles";
import { Outlet, Link } from "react-router-dom";
import { Loader } from "../../components/Loader";

export const Layout = () => {
  const [isLoading, setIsLoading] = useState(false);

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
        <Outlet context={{ setIsLoading }} />
      </main>
    </S.Layout>
  );
};
