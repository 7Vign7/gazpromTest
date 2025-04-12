import {configureStore} from "@reduxjs/toolkit";
import groupsSlice from "./groupsSlice";
// import nodesReducer from "./nodesSlice";
// import metricsReducer from "./metricsSlice";

const store = configureStore({
    reducer:{
        groups: groupsSlice
    }
});
export default store;