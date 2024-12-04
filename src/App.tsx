import './App.css'
import { AuthProvider } from "./providers/AuthProvider.tsx";
import Header from "./components/Header.tsx";

function App() {

  return (
      <AuthProvider>
          <div className={`flex flex-col justify-center items-center w-screen h-screen`}>
              <Header/>
          </div>
      </AuthProvider>
  )
}

export default App
