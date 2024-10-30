"use client";

import React from "react";
import { Provider } from "react-redux";
import CryptoSwap from "./components/CryptoSwap";
import store from "./redux/store";

const Page: React.FC = () => {
  return (
    <Provider store={store}>
      <CryptoSwap />
    </Provider>
  );
};

export default Page;
