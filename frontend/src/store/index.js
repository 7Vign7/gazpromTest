import {configureStore} from "@reduxjs/toolkit";
import groupsSlice from "./groupsSlice";
import nodesSlice from "./nodesSlice";
import metricsSlice from "./metricsSlice";

const store = configureStore({
    reducer:{
        groups: groupsSlice,
        nodes: nodesSlice,
        metrics: metricsSlice,
    }
});
export default store;