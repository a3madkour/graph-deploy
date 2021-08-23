import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Components from './components';

function App() {
  const [state, setState] = React.useState({ route: "/" });


  return (
    <div>
      <Components.GrammarComponent />
    </div>
  );
}

export default App;
