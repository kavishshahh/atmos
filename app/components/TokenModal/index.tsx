"use client";

import { Grid, Search, X } from "lucide-react";
import { useState } from "react";

interface Token {
  id: string;
  name: string;
  symbol: string;
  icon: string;
}
interface TokenModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (token: Token, isSellToken: boolean) => void;
  buyTriggered: boolean;
}

const tokens: Token[] = [
  { id: "BTC", name: "Bitcoin", symbol: "BTC", icon: "0x" },
  { id: "ETH", name: "Ethereum", symbol: "ETH", icon: "0x" },
  { id: "zrx", name: "0x Protocol Token", symbol: "ZRX", icon: "0x" },
  { id: "1inch", name: "1INCH Token", symbol: "1INCH", icon: "1inch" },
  { id: "aave", name: "Aave Token", symbol: "AAVE", icon: "aave" },
  { id: "acx", name: "Across Protocol Token", symbol: "ACX", icon: "across" },
  { id: "aevo", name: "Aevo", symbol: "AEVO", icon: "aevo" },
  { id: "aioz", name: "AIOZ Network", symbol: "AIOZ", icon: "aioz" },
  { id: "aleph", name: "aleph.im v2", symbol: "ALEPH", icon: "aleph" },
  { id: "ankr", name: "Ankr Network", symbol: "ANKR", icon: "ankr" },
];
export const TokenModal: React.FC<TokenModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  buyTriggered,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredTokens = tokens.filter(
    (token) =>
      token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isOpen) return null;

  const handleTokenClick = (token: Token) => {
    if (buyTriggered) {
      onSelect(token, false);
    } else {
      onSelect(token, true);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
      <div className="bg-[#1a1a1d] rounded-2xl w-full max-w-md shadow-lg">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">Select a token</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-700 rounded-lg"
          >
            <X className="w-6 h-6 text-gray-300" />
          </button>
        </div>

        {/* Search Box */}
        <div className="p-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search tokens"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-3 bg-[#2c2c2e] text-white rounded-xl outline-none border border-transparent focus:border-[#0ea7bf]"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Grid className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Token List */}
        <div className="px-2">
          <div className="px-2 py-1">
            <span className="text-sm text-gray-500 flex items-center gap-2">
              <span className="text-lg">★</span> Tokens
            </span>
          </div>

          <div className="max-h-[400px] overflow-y-auto">
            {filteredTokens.map((token) => (
              <button
                key={token.id}
                onClick={() => handleTokenClick(token)}
                className="w-full flex items-center gap-3 p-2 hover:bg-[#333] rounded-xl"
              >
                <div className="w-8 h-8 rounded-full bg-[#0ea7bf] text-white flex items-center justify-center">
                  <span className="text-xs">{token.icon}</span>
                </div>
                <div className="flex flex-col items-start text-white">
                  <span className="font-medium">{token.name}</span>
                  <span className="text-sm text-gray-400">{token.symbol}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
