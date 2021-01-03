import { createSlice } from "@reduxjs/toolkit";
import { t } from "../../utils";

const defaultNavBarTitle = t("app.name");

export const slice = createSlice({
    name: "navBar",
    initialState: {},
    reducers: {
        setTitle: (state, action) => {
            state.navBarTitle = action.payload;
        },
        resetTitle: state => {
            state.navBarTitle = defaultNavBarTitle;
        },
        clearTitle: state => {
            state.navBarTitle = "";
        }
    }
});

export const { setTitle, resetTitle, clearTitle } = slice.actions;

export const navBarTitle = state => state.navBar.navBarTitle;

export default slice.reducer;
