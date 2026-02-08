import { Outlet } from "react-router";
import Navbar from "./pages/Navbar";

export default function App() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
