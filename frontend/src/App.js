import logo from './logo.svg';
import './App.css';
import * as React from 'react';
import axios from 'axios';

function App() {
  // const [charOverall, setCharOverall] = React.useState('-')
  const param = { nickname: '비밀의햇잎' }
  React.useEffect(() => {
    axios.get('/api/char/overall', {params: param})
      .then(response => {
        console.log(response.data)
        // setCharOverall(response.data)
      })
      .catch(error => console.log(error))
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div>
          백엔드에서 가져온 데이터입니다
        </div>
      </header>

    </div>
  );
}

export default App;
