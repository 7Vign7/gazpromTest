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
        group: [],
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
                    console.log(e)
                })
                console.log(state.group)

            })
            .addCase(fetchGroups.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.payload;
            });
    }
});

export default groupsSlice.reducer;
export const { selectGroup } = groupsSlice.actions;
