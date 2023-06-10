"use client";
import { useState } from "react";
import Map from "@components/map";
import "../../node_modules/antd/dist/antd";
import SearchComponent from "@components/searchComponent";
const Home = () => {
  return (
    <>
      <SearchComponent />
      <Map />
    </>
  );
};

export default Home;
