import { createSlice } from "@reduxjs/toolkit";

interface UIState {
    isProfileModalOpen: boolean;
}

const initialState: UIState = {
    isProfileModalOpen: false,
};

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        openProfileModal: (state) => {
            state.isProfileModalOpen = true;
        },
        closeProfileModal: (state) => {
            state.isProfileModalOpen = false;
        },
        toggleProfileModal: (state) => {
            state.isProfileModalOpen = !state.isProfileModalOpen;
        },
    },
});

export const { openProfileModal, closeProfileModal, toggleProfileModal } = uiSlice.actions;
export default uiSlice.reducer;
