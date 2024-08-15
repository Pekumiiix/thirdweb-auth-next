"use client";

import type { NextPage } from "next";
import { ConnectButton, ThirdwebProvider } from "thirdweb/react";
import { LoginButton } from "./components/login-button";
import { client } from "../../lib/client";
import React, { useState } from "react";

const Basic: NextPage = () => {
  const [connect, setConnect] = useState(false);

  return (
    <ThirdwebProvider>
      <header className="w-full flex items-center justify-center border-b border-[#29292F] bg-[#111115]">
        <nav className="container w-full h-[90px] flex items-center justify-between">
          <p className="text-[#F8F8FF] text-[42px] font-semibold">Demo</p>
        </nav>
      </header>

      <main className="bg-[#111115] flex items-center justify-center py-20">
        <div className="flex flex-col w-fit gap-5 pt-10">
          <div className="flex flex-col gap-3">
            <p className="text-[#F8F8FF] font-medium">
              Connect your Wallet to continue
            </p>
            <ConnectButton client={client} onConnect={() => setConnect(true)} />
          </div>

          <div className={`${connect ? "flex" : "hidden"} flex-col gap-3`}>
            <p className="text-[#F8F8FF] font-medium">
              Sign the payload to continue
            </p>
            <LoginButton />
          </div>
        </div>
      </main>
    </ThirdwebProvider>
  );
};

export default Basic;
