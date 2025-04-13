import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import api from "../api/monitoringApi.js";

export const fetchGroups = createAsyncThunk(
    'groups/fetchGroups',
    async function(_,{rejectWithValue}) {
        try{
            const response = await api.get('/groups');
            if(response.statusText !== "OK") {
                throw new Error("Server Error!");
            }
            return response.data;
        }catch(err){
            return rejectWithValue(err.message);
        }
    }
);


const groupsSlice = createSlice({
    name: "groups",
    initialState: {
        groups: {},
        selectedId: null,
        status: null,
        error: null
    },
    reducers: {

    },
    extraReducers:(builder) => {
        builder
            .addCase(fetchGroups.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchGroups.fulfilled, (state, action) => {
                state.status = "resolved";
                const groupData = {};
                action.payload.forEach((e)=>{
                    const {group_name, ...node} = e
                    if(!groupData[group_name]){
                        groupData[group_name] = [node]
                    }else{
                        groupData[group_name].push(node)
                    }
                })
                state.groups = groupData
                console.log(state.groups)
            })
            .addCase(fetchGroups.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.payload;
            });
    }
});

export default groupsSlice.reducer;
export const { selectGroup } = groupsSlice.actions;
