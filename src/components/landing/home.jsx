import React from "react";
import Header from './Header.jsx'
import Hero from './Hero.jsx'
import { Outlet } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
