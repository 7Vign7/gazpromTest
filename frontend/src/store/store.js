import {configureStore} from "@reduxjs/toolkit";
import groupsSlice from "./Slice/groupsSlice.js";
import nodesSlice from "./Slice/nodesSlice.js";
import metricsSlice from "./Slice/metricsSlice.js";

const store = configureStore({
    reducer:{
        groups: groupsSlice,
        nodes: nodesSlice,
        metrics: metricsSlice,
    }
});
export default store;