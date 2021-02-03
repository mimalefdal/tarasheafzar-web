import { configureStore } from "@reduxjs/toolkit";
import navBarReducer from "./navSlice";

export default configureStore({
    reducer: {
        navBar: navBarReducer
    }
});
