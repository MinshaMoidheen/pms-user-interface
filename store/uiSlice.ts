import { createSlice } from "@reduxjs/toolkit";

interface UIState {
    isProfileModalOpen: boolean;
    isPlaceAnAdModalOpen: boolean;
}

const initialState: UIState = {
    isProfileModalOpen: false,
    isPlaceAnAdModalOpen: false,
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
        openPlaceAnAdModal: (state) => {
            state.isPlaceAnAdModalOpen = true;
        },
        closePlaceAnAdModal: (state) => {
            state.isPlaceAnAdModalOpen = false;
        },
        togglePlaceAnAdModal: (state) => {
            state.isPlaceAnAdModalOpen = !state.isPlaceAnAdModalOpen;
        },
    },
});

export const {
    openProfileModal,
    closeProfileModal,
    toggleProfileModal,
    openPlaceAnAdModal,
    closePlaceAnAdModal,
    togglePlaceAnAdModal
} = uiSlice.actions;
export default uiSlice.reducer;
