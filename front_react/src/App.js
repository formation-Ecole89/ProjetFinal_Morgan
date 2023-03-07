import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Video from "./components/Video";
import VideoAdd from "./components/VideoAdd";
import VideoRemove from "./components/VideoRemove";
import Vi from "./components/Menu";
import User from "./components/User";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/video" />} />
        <Route path="/video" element={<Vi />} />
        <Route path="/video/:id" element={<Video />} />
        <Route path="/video/add" element={<VideoAdd />} />
        <Route path="/video/remove" element={<VideoRemove />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </BrowserRouter>
  );
}