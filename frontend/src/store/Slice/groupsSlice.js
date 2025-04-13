import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {fetchNodes} from "./nodesSlice.js";

export const fetchGroups = createAsyncThunk(
    'groups/fetchGroups',
    async function(_,{rejectWithValue,dispatch,getState}) {
        try{
            await dispatch(fetchNodes()).unwrap();
            const { nodes } = getState();
            return nodes.nodes;
        }catch(err){
            return rejectWithValue(err.message);
        }
    }
);


const groupsSlice = createSlice({
    name: "groups",
    initialState: {
        groups: {},
        selectedGroup: null,
        status: null,
        error: null
    },
    reducers: {
        setSelectedGroup(state, action) {
            state.selectedGroup = action.payload;
        },
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
            })
            .addCase(fetchGroups.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.payload;
            })

    }
});

export default groupsSlice.reducer;
export const { selectGroup, setSelectedGroup } = groupsSlice.actions;
// export const { selectGroup } = groupsSlice.actions;