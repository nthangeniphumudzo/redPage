"use client";
import { Slider } from "antd";
import { FC, useState } from "react";
import style from "./styles.module.scss";

const RangePicker: FC<any> = () => {
  const [inputValue, setInputValue] = useState(1);

  const onChange = (newValue: number) => {
    setInputValue(newValue);
  };
  return (
    <Slider
    className={style.main}
      min={10}
      max={50}
      onChange={onChange}
      value={typeof inputValue === "number" ? inputValue : 0}
    />
  );
};

export default RangePicker;
