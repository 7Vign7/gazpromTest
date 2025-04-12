import {configureStore} from "@reduxjs/toolkit";
import groupsReducer from "./groupsSlice";
import nodesReducer from "./nodesSlice";
import metricsReducer from "./metricsSlice";
export default configureStore({
    reducer: {
        groups: groupsReducer,
        nodes: nodesReducer,
        metrics: metricsReducer
    }
});