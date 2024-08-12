import './App.css'
import Main from './components/Main'
import { Toaster } from "react-hot-toast";
function App() {
  return ( 
    <div className='app'>
     <Main/>
     <Toaster position="top-center" reverseOrder={false} />
     </div>   
  )
}

export default App
