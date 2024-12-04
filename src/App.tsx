import './App.css'
import { AuthProvider } from "./contexts/AuthProvider.tsx";
import {Header} from "./components"

import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./screens/Home.tsx";

function App() {

  return (
      <Router>
          <AuthProvider>

              <div className={`flex flex-col justify-center items-center w-screen h-screen`}>
                  <Header/>
                  <Routes>
                        <Route path="/" element={
                            <Home/>
                        }/>
                  </Routes>
              </div>
          </AuthProvider>
      </Router>
  )
}

export default App
