import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Components/NavBar.jsx'
import NavBar from './Components/NavBar.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <NavBar/>
    </div>
  )
}

export default App
