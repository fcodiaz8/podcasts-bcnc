import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { Podcasts } from "./pages/podcasts";
import { Podcast } from "./pages/podcast";
import { Episode } from "./pages/episode";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Podcasts />} />
      <Route path="/podcast/:podcastId" element={<Podcast />} />
      <Route
        path="/podcast/:podcastId/episode/:episodeId"
        element={<Episode />}
      />
    </Routes>
  );
};

export default App;
