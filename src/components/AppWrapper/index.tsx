import { message } from "antd";
import React from "react";

function AppWrapper({ children }: { children: JSX.Element }) {
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <>
      {contextHolder}
      {children}
    </>
  );
}

export default AppWrapper;
