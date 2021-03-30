import { createSlice } from "@reduxjs/toolkit";
import { t } from "../../utils";

const defaultNavBarTitle = t("app.name");

export const slice = createSlice({
    name: "navBar",
    initialState: {},
    reducers: {
        addTitle: (state, action) => {
            // TODO : must omplement more preicised
            // console.log("addTitle called!", action.payload);
            state.navBarTitle = state.navBarTitle + " > " + action.payload;
        },
        setTitle: (state, action) => {
            // console.log("setTitle called!", action.payload);
            state.navBarTitle = action.payload;
        },
        resetTitle: state => {
            // console.log("resetTitle called!");
            state.navBarTitle = defaultNavBarTitle;
        },
        clearTitle: state => {
            // console.log("clearTitle called!");
            state.navBarTitle = "";
        }
    }
});

export const { setTitle, resetTitle, clearTitle, addTitle } = slice.actions;

export const navBarTitle = state => state.navBar.navBarTitle;

export default slice.reducer;
