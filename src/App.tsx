import './App.css'
import { AuthProvider } from "./contexts/AuthProvider.tsx";
import {Header} from "./components"

import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./screens/Home.tsx";
import AdminPage from "./screens/AdminPage.tsx";

function App() {

  return (
      <Router>
          <AuthProvider>
              <div className={`justify-center items-center flex flex-col w-screen h-screen`}>
                  <div className={'w-full'}>
                      <Header/>
                  </div>
                  <div className={`
                    w-full h-full flex flex-col items-center justify-center          
                  `}>
                      <Routes>
                          <Route path="/" element={<Home/>}/>
                          <Route path="/admin" element={<AdminPage/>}/>
                      </Routes>
                  </div>
              </div>
          </AuthProvider>
      </Router>
  )
}

export default App
