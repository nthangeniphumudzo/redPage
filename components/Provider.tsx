"use client";
import React, { Children, FC } from "react";
import { SessionProvider } from "next-auth/react";

const Provider: FC<any> = ({ Children, session }) => {
  return <SessionProvider session={session}>{Children}</SessionProvider>;
};

export default Provider;
