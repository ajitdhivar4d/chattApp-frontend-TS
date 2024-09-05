import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define a type for the slice state
interface SelectedDeleteChat {
  chatId: string;
  groupChat: boolean;
}

interface MiscState {
  isNewGroup: boolean;
  isAddMember: boolean;
  isNotification: boolean;
  isMobile: boolean;
  isSearch: boolean;
  isFileMenu: boolean;
  isDeleteMenu: boolean;
  uploadingLoader: boolean;
  selectedDeleteChat: SelectedDeleteChat;
}

const initialState: MiscState = {
  isNewGroup: false,
  isAddMember: false,
  isNotification: false,
  isMobile: false,
  isSearch: false,
  isFileMenu: false,
  isDeleteMenu: false,
  uploadingLoader: false,
  selectedDeleteChat: {
    chatId: "",
    groupChat: false,
  },
};

export const miscSlice = createSlice({
  name: "misc",
  initialState,
  reducers: {
    setIsNewGroup: (state, action: PayloadAction<boolean>) => {
      state.isNewGroup = action.payload;
    },
    setIsAddMember: (state, action: PayloadAction<boolean>) => {
      state.isAddMember = action.payload;
    },
    setIsNotification: (state, action: PayloadAction<boolean>) => {
      state.isNotification = action.payload;
    },
    setIsMobile: (state, action: PayloadAction<boolean>) => {
      state.isMobile = action.payload;
    },
    setIsSearch: (state, action: PayloadAction<boolean>) => {
      state.isSearch = action.payload;
    },
    setIsFileMenu: (state, action: PayloadAction<boolean>) => {
      state.isFileMenu = action.payload;
    },
    setIsDeleteMenu: (state, action: PayloadAction<boolean>) => {
      state.isDeleteMenu = action.payload;
    },
    setUploadingLoader: (state, action: PayloadAction<boolean>) => {
      state.uploadingLoader = action.payload;
    },
    setSelectedDeleteChat: (
      state,
      action: PayloadAction<SelectedDeleteChat>,
    ) => {
      state.selectedDeleteChat = action.payload;
    },
  },
});

export const {
  setIsNewGroup,
  setIsAddMember,
  setIsNotification,
  setIsMobile,
  setIsSearch,
  setIsFileMenu,
  setIsDeleteMenu,
  setUploadingLoader,
  setSelectedDeleteChat,
} = miscSlice.actions;

// Update the selector to access the correct state property
export const selectMiscState = (state: RootState) => state.misc;

export default miscSlice.reducer;
