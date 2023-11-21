import { gql, useQuery } from '@apollo/client';
import ClipLoader from "react-spinners/ClipLoader";

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
  return (
    <div>
      <table>
        <tbody>
          {
            data.getTodos.map(t=> <tr key={t.id}>
              {t.user?.name? <>
                <td>{t.title}</td>
                <td>{t.user?.name}</td> 
              </>
              
            : ""}
            </tr>)
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;
