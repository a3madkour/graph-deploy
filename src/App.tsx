
import React from 'react';
import './App.css';
import {GraphComponent} from "./graph.component"
import { IGraph } from './util/graph';
import graphs from './graphs.json';
function App() {
  const emptyGraph: IGraph =
  {
    nodes: [
      {
        label: 'Start',
        id: 'dceb748f-7d66-4194-8200-a1e33fc4cb34',
        abbrev: 'S'
      },
      {
        label: 'End',
        id: 'b0bd97f9-d157-489e-b443-4bdf89b1fd4d',
        abbrev: 'E'
      }

    ],
    edges: [
      {
        from: 'dceb748f-7d66-4194-8200-a1e33fc4cb34',
        to: 'b0bd97f9-d157-489e-b443-4bdf89b1fd4d',
        id: '20246849-4cf3-4d22-b1e5-f49577f054dc'
      }
    ]
  }
  const emptyLetter = {
    label: "",
    abbrev: "",
    terminality: false
  }
    const [state, setState] = React.useState({ currentGraph: graphs["graph_0"] });

    const makeGraphs = () => {
        var returnValue:any[] = []
        for (var graph_name in graphs){
            returnValue.push(
                <option value={graph_name}>{graph_name}</option>
            )
        }
        return returnValue
    }

    const handleChange = (e:any) =>{
        console.log()
        const select_str:keyof typeof graphs = e.target.value
        setState({currentGraph: graphs[select_str]})
    }
    return (
      <div>
          <div style={{display : "flex"}}>
          <h2>Selected Graph:</h2>
          <select name="graphs_menu" id="graphs_menu" onChange={handleChange}>
              {makeGraphs()}
          </select>
          </div>
          <GraphComponent graph={state.currentGraph} letter={emptyLetter} manipulate={false}/>
      </div>
  );
}

export default App;
