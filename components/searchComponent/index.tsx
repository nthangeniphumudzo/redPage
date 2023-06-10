"use client";

import { FC } from "react";
import style from "./styles.module.scss";
import { Input } from "antd";

const { Search } = Input;

const SearchComponent: FC<any> = () => {
  return (
    <Search
      className={style.search}
      placeholder="Search by location"
      enterButton="Locate"
      size="large"
    />
  );
};

export default SearchComponent;
