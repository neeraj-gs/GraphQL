import { gql, useQuery } from '@apollo/client';
import ClipLoader from "react-spinners/ClipLoader";
import './App.css';

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
  if(loading){
    return(
      <ClipLoader
        color={"#000000"}
        loading={loading}
        size={150}
        aria-label="Loading"
        data-testid="loader"
      />
    )

    
  } 
  console.log(data)
  return (
    <div>
      {JSON.stringify(data)}
    </div>
  );
}

export default App;
