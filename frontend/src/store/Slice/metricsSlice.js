import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import api from "../../api/monitoringApi.js";
import {parseCustomDate} from "../../utils/Utils.js";
import {setSelectedNode} from "./nodesSlice.js";

export const fetchMetrics = createAsyncThunk(
    'metrics/fetchMetrics',
    async function(_,{rejectWithValue}) {
        try{
            const metrics = await api.get('/metrics');

            if(metrics.statusText !== "OK") {
                throw new Error(`Error: ${metrics.status}`);
            }

            return metrics.data
        }catch(err){
            return rejectWithValue(err.message);
        }
    }
);


const metricsSlice = createSlice({
    name: "metrics",
    initialState: {
        metrics: {},
        status: null,
        error: null
    },
    reducers: {

    },
    extraReducers:(builder) => {
        builder
            .addCase(fetchMetrics.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchMetrics.fulfilled, (state, action) => {
                state.status = "resolved";
                const nodesMetrics = {};
                const metrics = action.payload;
                metrics.forEach((element)=>{
                    const {node_id, ...metrics} = element;
                    if(!nodesMetrics[node_id]){
                        nodesMetrics[node_id] = [metrics];
                    }else{
                        nodesMetrics[node_id].push(metrics)
                    }
                })
                Object.keys(nodesMetrics).forEach(node_id => {
                    nodesMetrics[node_id].sort((a, b) => {
                        return parseCustomDate(a.datetime) - parseCustomDate(b.datetime);
                    });
                });
                state.metrics = nodesMetrics;
            })
            .addCase(fetchMetrics.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.payload;
            })
    }
});

export default metricsSlice.reducer;
export const { selectMetrics } = metricsSlice.actions;
