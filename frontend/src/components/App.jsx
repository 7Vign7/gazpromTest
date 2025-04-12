import api from "../api/monitoringApi.js"
import {useEffect} from "react";
import {fetchGroups} from "../store/groupsSlice.js";
import {useDispatch, useSelector} from "react-redux";

function App() {
  const dispatch = useDispatch();
  const {status,error,group} = useSelector((state) => state.groups);
  useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch]);
  return (
    <>
      {status === "loading" && <h1>Loading...</h1>}
    </>
  )
}

export default App
