"use client";
import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getProviders } from "next-auth/react";
import style from "./styles.module.scss";
import { Button, Dropdown, Menu } from "antd";
import { MenuOutlined } from "@ant-design/icons";

const Nav: FC<any> = () => {
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const setProvider = async () => {
      const response = await getProviders();
      setProviders(response as any);
    };
    setProvider();
  }, []);

  const menu = (
    <Menu>
      <Menu.Item key="home">Home</Menu.Item>
      <Menu.Item key="services">Services</Menu.Item>
      <Menu.Item key="terms">T & Cs</Menu.Item>
      <Menu.Item key="about">About Us</Menu.Item>
      <Menu.Item key="faqs">FAQs</Menu.Item>
    </Menu>
  );

  const ButtonDropdown = () => {
    return (
      <div className={style.buttonLinkSmall}>
        <Dropdown overlay={menu} placement="bottomLeft">
          <Button className={style.hoverableButton}>
            <MenuOutlined />
          </Button>
        </Dropdown>
      </div>
    );
  };
  return (
    <>
      <div className={style.navContainer}>
        <Link href="/" className={style.logo}>
          <Image
            src="/assets/images/logo.svg"
            alt="Promptopia Logo"
            width={30}
            height={30}
          />
          <p className={style.heading}>Red Page</p>
        </Link>

        <div className={`${style.buttonLinks} ${style.largeDisplayOnly}`}>
          <Button className={style.hoverableButton}>Home</Button>
          <Button className={style.hoverableButton}>Services</Button>
          <Button className={style.hoverableButton}>T & Cs</Button>
          <Button className={style.hoverableButton}>About Us</Button>
          <Button className={style.hoverableButton}>FAQS</Button>
        </div>
        <ButtonDropdown />
      </div>
    </>
  );
};

export default Nav;
