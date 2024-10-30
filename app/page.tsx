"use client";

import { ChevronDown, Settings } from "lucide-react";
import React, { useState } from "react";
import OrderRouting from "./components/OrderRouting";
import PriceChart from "./components/PriceChart";
import SettingsPanel from "./components/SettingsPanel";
import { TokenModal } from "./components/TokenModal";
interface Token {
  id: string;
  name: string;
  symbol: string;
  icon: string;
}

const CryptoSwap: React.FC = () => {
  const [state, setState] = useState<{
    sellAmount: string;
    buyAmount: string;
    usdValue: string;
    receiveUsdValue: string;
    isModalOpen: boolean;
    buySelectedToken: Token | null;
    sellSelectedToken: Token | null;
    buyTriggered: boolean;
  }>({
    sellAmount: "",
    buyAmount: "",
    usdValue: "$0",
    receiveUsdValue: "$0",
    isModalOpen: false,
    buySelectedToken: null,
    sellSelectedToken: null,
    buyTriggered: false,
  });
  const [isOrderRouteOpen, setOrderRouteOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  const gasFees = 5;

  const tokenValues: { [key: string]: { price: number; symbol: string } } = {
    ETH: { price: 2000, symbol: "ETH" },
    BTC: { price: 30000, symbol: "BTC" },
    ZRX: { price: 0.75, symbol: "ZRX" },
    "1INCH": { price: 2.5, symbol: "1INCH" },
    AAVE: { price: 150, symbol: "AAVE" },
    ACX: { price: 1.2, symbol: "ACX" },
    AEVO: { price: 0.5, symbol: "AEVO" },
    AIOZ: { price: 0.3, symbol: "AIOZ" },
    ALEPH: { price: 0.1, symbol: "ALEPH" },
    ANKR: { price: 0.08, symbol: "ANKR" },
  };

  const handleTokenSelect = (token: Token, isSellToken: boolean): void => {
    setState((prev) => {
      const tokenValue = tokenValues[token.symbol];
      if (isSellToken) {
        return {
          ...prev,
          sellSelectedToken: token,
          usdValue: tokenValue
            ? `$${tokenValue.price.toFixed(2)}`
            : prev.usdValue,
        };
      } else {
        const amount = parseFloat(prev.sellAmount) || 0;
        return {
          ...prev,
          buySelectedToken: token,
          buyAmount: tokenValue
            ? (amount * (tokenValue.price / tokenValues["ETH"].price)).toFixed(
                2
              )
            : prev.buyAmount,
          receiveUsdValue: tokenValue
            ? `$${(amount * tokenValue.price).toFixed(2)}`
            : prev.receiveUsdValue,
        };
      }
    });
    setState((prev) => ({ ...prev, isModalOpen: false }));
  };

  const handleSwap = () => {
    setState((prev) => {
      const tempSellAmount = prev.sellAmount;
      const tempBuyAmount = prev.buyAmount;

      return {
        ...prev,
        sellAmount: tempBuyAmount,
        buyAmount: tempSellAmount,
        usdValue: prev.receiveUsdValue,
        receiveUsdValue: prev.usdValue,
        buySelectedToken: prev.sellSelectedToken,
        sellSelectedToken: prev.buySelectedToken,
      };
    });
  };

  const handleAmountChange = (value: string, isSell: boolean) => {
    const sanitizedValue = value.replace(/[^0-9.]/g, "");
    setState((prev) => {
      const amount = parseFloat(sanitizedValue) || 0;
      const tokenValue = isSell
        ? tokenValues[prev.sellSelectedToken?.symbol || ""]
        : tokenValues[prev.buySelectedToken?.symbol || ""];
      const newState = isSell
        ? {
            sellAmount: sanitizedValue,
            usdValue: tokenValue
              ? `$${(amount * tokenValue.price).toFixed(2)}`
              : prev.usdValue,
            receiveUsdValue: tokenValue
              ? `$${(amount * tokenValue.price).toFixed(2)}`
              : prev.receiveUsdValue,
            buyAmount:
              tokenValue && prev.buySelectedToken
                ? (
                    amount *
                    (tokenValue.price /
                      tokenValues[prev.buySelectedToken.symbol].price)
                  ).toFixed(2)
                : prev.buyAmount,
          }
        : {
            buyAmount: sanitizedValue,
            sellAmount:
              tokenValue && prev.sellSelectedToken
                ? (
                    amount *
                    (tokenValue.price /
                      tokenValues[prev.sellSelectedToken.symbol].price)
                  ).toFixed(2)
                : prev.sellAmount,
            receiveUsdValue: tokenValue
              ? `$${(amount * tokenValue.price).toFixed(2)}`
              : prev.receiveUsdValue,
            usdValue:
              tokenValue && prev.sellSelectedToken
                ? `$${(
                    amount *
                    (tokenValue.price /
                      tokenValues[prev.sellSelectedToken.symbol].price) *
                    tokenValues[prev.sellSelectedToken.symbol].price
                  ).toFixed(2)}`
                : prev.usdValue,
          };
      return { ...prev, ...newState };
    });
  };

  return (
    <>
      <div className=" flex-col min-h-screen bg-gradient-to-br from-[#0dbbac] via-[#0ea7bf] to-[#0bd790] p-6 flex items-center">
        <div className="max-w-md w-full bg-[#1a1a1d] rounded-2xl p-6 shadow-lg mb-10">
          <div className="flex flex-row justify-between items-center">
            <h1 className="text-3xl font-bold mb-8 text-center text-white">
              Swap anytime, <br /> anywhere.
            </h1>

            <button
              onClick={() => {
                setIsSettingsOpen(true);
              }}
            >
              <Settings color="blue" size={24} />
            </button>
          </div>

          <div className="space-y-4">
            <div className="bg-[#2c2c2e] p-4 rounded-xl">
              <div className="text-gray-500 text-sm mb-2">You pay</div>
              <div className="flex items-center justify-between">
                <input
                  type="text"
                  inputMode="decimal"
                  pattern="[0-9]*"
                  placeholder="0"
                  value={state.sellAmount}
                  onChange={(e) => handleAmountChange(e.target.value, true)}
                  className="text-4xl font-light bg-transparent text-white outline-none w-full"
                />
                <button
                  type="button"
                  className="flex items-center space-x-2 bg-[#333] px-3 py-2 rounded-lg shadow-sm"
                  onClick={() => {
                    setState((prev) => ({
                      ...prev,
                      isModalOpen: true,
                      buyTriggered: false,
                    }));
                  }}
                >
                  {state.sellSelectedToken ? (
                    <>
                      <div className="w-6 h-6 rounded-full bg-[#0ea7bf] text-white flex items-center justify-center">
                        <span className="text-xs">
                          {state.sellSelectedToken.icon}
                        </span>
                      </div>
                      <span className="text-white">
                        {state.sellSelectedToken.symbol}
                      </span>
                    </>
                  ) : (
                    <span className="text-[#0bd790]">Select token</span>
                  )}
                  <ChevronDown className="w-4 h-4 text-[#0bd790]" />
                </button>
              </div>
              <div className="text-gray-500 text-sm mt-1">
                ~{state.usdValue}
              </div>
            </div>

            {/* Swap Arrow */}
            <div className="flex justify-center">
              <div
                className="w-8 h-8 bg-[#333] rounded-full flex items-center justify-center cursor-pointer"
                onClick={handleSwap}
              >
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </div>
            </div>

            <div className="bg-[#2c2c2e] p-4 rounded-xl">
              <div className="text-gray-500 text-sm mb-2">You receive</div>
              <div className="flex items-center justify-between">
                <input
                  type="text"
                  inputMode="decimal"
                  pattern="[0-9]*"
                  placeholder="0"
                  value={state.buyAmount}
                  onChange={(e) => handleAmountChange(e.target.value, false)}
                  className="text-4xl font-light bg-transparent text-white outline-none w-full"
                />
                <button
                  type="button"
                  onClick={() => {
                    setState((prev) => ({
                      ...prev,
                      isModalOpen: true,
                      buyTriggered: true,
                    }));
                  }}
                  className="flex items-center space-x-2 bg-[#333] px-3 py-2 rounded-lg shadow-sm"
                >
                  {state.buySelectedToken ? (
                    <>
                      <div className="w-6 h-6 rounded-full bg-[#0ea7bf] text-white flex items-center justify-center">
                        <span className="text-xs">
                          {state.buySelectedToken.icon}
                        </span>
                      </div>
                      <span className="text-white">
                        {state.buySelectedToken.symbol}
                      </span>
                    </>
                  ) : (
                    <span className="text-[#0bd790]">Select token</span>
                  )}
                  <ChevronDown className="w-4 h-4 text-[#0bd790]" />
                </button>
              </div>
              {state.buySelectedToken && (
                <div className="text-gray-500 text-sm mt-1">
                  {parseFloat(state.receiveUsdValue.replace(/[^0-9.]/g, "")) -
                    gasFees <
                  0 ? (
                    <span className="text-red-500">Insufficient gas fees</span>
                  ) : (
                    `~$${
                      parseFloat(
                        state.receiveUsdValue.replace(/[^0-9.]/g, "")
                      ) - gasFees
                    }`
                  )}
                </div>
              )}
            </div>
            {isOrderRouteOpen && (
              <OrderRouting
                isOpen={isOrderRouteOpen}
                onClose={() => setOrderRouteOpen(false)}
              />
            )}

            <div
              className="text-white cursor-pointer"
              onClick={() => {
                setOrderRouteOpen(true);
              }}
            >
              Order route
            </div>

            <button
              type="button"
              className="w-full bg-[#0ea7bf] text-white py-4 rounded-xl font-medium mt-4 hover:bg-[#0dbbac] transition"
            >
              Get started
            </button>
            {isSettingsOpen && <SettingsPanel isSettingsOpen={isSettingsOpen} setIsSettingsOpen={setIsSettingsOpen}/>}
          </div>
        </div>

        <TokenModal
          isOpen={state.isModalOpen}
          onClose={() => setState((prev) => ({ ...prev, isModalOpen: false }))}
          onSelect={handleTokenSelect}
          buyTriggered={state.buyTriggered}
        />
        
        <PriceChart />

      </div>
    </>
  );
};

export default CryptoSwap;
