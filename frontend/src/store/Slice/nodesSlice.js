import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {fetchMetrics} from "./metricsSlice.js";
import {setSelectedGroup} from "./groupsSlice.js";
import api from "../../api/monitoringApi.js";

export const fetchNodes = createAsyncThunk(
    'nodes/fetchNodes',
    async function(_,{rejectWithValue, dispatch,getState}) {
        try{
            const nodes = await api.get('/groups');
            await dispatch(fetchMetrics()).unwrap();
            const { metrics } = getState();
            if(nodes.statusText !== "OK") {
                throw new Error(`Error: ${nodes.status}`);
            }
            return {
                nodes: nodes.data,
                metrics: metrics.metrics
            };
        }catch(err){
            return rejectWithValue(err.message);
        }
    }
);

const nodesSlice = createSlice({
    name: "nodes",
    initialState: {
        nodes: [],
        selectedNode: null,
        status: null,
        error: null,
    },
    reducers: {
        setSelectedNode(state, action) {
            state.selectedNode = action.payload;
        },
    },
    extraReducers:(builder) => {
        builder
            .addCase(fetchNodes.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchNodes.fulfilled, (state, action) => {
                state.status = "resolved";
                const {nodes, metrics} = action.payload;
                const nodesData = []
                nodes.forEach((node)=>{
                    nodesData.push({ ...node,  node_metrics: metrics[node.node_id] })
                })
                state.nodes = nodesData;
            })
            .addCase(fetchNodes.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.payload;
            })
    }
});

export default nodesSlice.reducer;
export const { selectNodes, setSelectedNode } = nodesSlice.actions;
// export const { selectNodes } = nodesSlice.actions;