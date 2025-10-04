import { Outlet } from 'react-router-dom';
import { Cabecalho } from './Components/Cabecalho/Cabecalho'; 

function App() {
  return (
    <div>
      <Cabecalho /> 
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default App