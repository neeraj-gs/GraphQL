import logo from './logo.svg';
import './App.css';
import {gql, useQuery} from '@apollo/client'

const query = gql`
  query GetTodosWithUser {
    getTodos{
      id
      title
      completed
      user{
        id
        name
      }
    }
  }

`


function App() {
  const  {data,loading} = useQuery(query) //actual data and laoding is getting rendered
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
      </header>
    </div>
  );
}

export default App;
