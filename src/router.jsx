import { createBrowserRouter } from "react-router-dom";
import { Podcasts } from "./pages/Podcasts";
import { Layout } from "./pages/Layout";
import { Podcast } from "./pages/Podcast";
import { Episode } from "./pages/Episode";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Podcasts /> },
      { path: "/podcast/:podcastId", element: <Podcast /> },
      { path: "/podcast/:podcastId/episode/:episodeId", element: <Episode /> },
      { path: "*", element: <h2>Pagina no encontrada</h2> },
    ],
  },
]);
