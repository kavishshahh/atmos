import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Token {
  id: string;
  name: string;
  symbol: string;
  icon: string;
}

interface CryptoSwapState {
  sellAmount: string;
  buyAmount: string;
  usdValue: string;
  receiveUsdValue: string;
  isModalOpen: boolean;
  buySelectedToken: Token | null;
  sellSelectedToken: Token | null;
  buyTriggered: boolean;
}

const initialState: CryptoSwapState = {
  sellAmount: '',
  buyAmount: '',
  usdValue: '$0',
  receiveUsdValue: '$0',
  isModalOpen: false,
  buySelectedToken: null,
  sellSelectedToken: null,
  buyTriggered: false,
};

const cryptoSwapSlice = createSlice({
  name: 'cryptoSwap',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<{ sellSelectedToken: Token; usdValue: string }>) => {
      state.sellSelectedToken = action.payload.sellSelectedToken;
      state.usdValue = action.payload.usdValue;
    },
    setAmounts: (state, action: PayloadAction<{ buySelectedToken: Token; buyAmount: string; receiveUsdValue: string }>) => {
      state.buySelectedToken = action.payload.buySelectedToken;
      state.buyAmount = action.payload.buyAmount;
      state.receiveUsdValue = action.payload.receiveUsdValue;
    },
    toggleModal: (state, action: PayloadAction<boolean>) => {
      state.isModalOpen = action.payload;
    },
  },
});

export const { setToken, setAmounts, toggleModal } = cryptoSwapSlice.actions;

export default cryptoSwapSlice.reducer; 