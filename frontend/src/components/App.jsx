import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGroups } from "../store/groupsSlice";
import "../styles/App.scss";
import StatusBlock from "./blocks/Status/StatusBlock.jsx";
import Groups from "./blocks/Groups/Groups.jsx";
import Nodes from "./blocks/Nodes/Nodes.jsx";
import NodesData from "./blocks/NodeData/NodesData.jsx";

function App() {
  const dispatch = useDispatch();
  const { status, error} = useSelector((state) => state.groups);

  useEffect(() => {
    const fetchData = () => dispatch(fetchGroups());
    fetchData();
    const intervalId = setInterval(fetchData, 60000);
    return () => clearInterval(intervalId);
  }, [dispatch]);



  return (
      <div className="app-container">
        {status === "loading" && <h1>Loading...</h1>}
        {status === "rejected" && <h1>Error: {error}</h1>}
        {status === "resolved" && (
            <>
              <div className="columns">
                <div>
                  <StatusBlock />
                  <Groups/>
                </div>
                <Nodes/>
                {/*<NodesData/>*/}
              </div>
            </>
        )}
      </div>
  )
}

export default App;