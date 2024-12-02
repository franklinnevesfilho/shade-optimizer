import './App.css'
import Title from "./components/Title.tsx";
import {ReactNode, useState} from "react";

function App() {

    const [selectedPage, setSelectedPage] = useState(0)

    const pages = [
        {
            component: <div>Page 1</div>
        },
        {
            component: <div>Page 2</div>
        },
        {
            component: <div>Page 3</div>
        }
    ]

    const PageComponent = (page: ReactNode) => {
        return page
    }

  return (
      <div className={`flex flex-col justify-center items-center w-screen h-screen `}>
          <Title style={'w-[80%] border-b-2 p-2 mt-10'}>Vertilux's Shade Optimizer</Title>
          <div className="w-[100%] h-[100%] flex flex-col justify-center items-center mt-5 md:mt-16">
              {/* Card */}
              <div className="w-[90%] sm:w-[60%] h-[90%] sm:h-[80%]  flex flex-col border-2 border-white rounded-lg shadow-lg p-5 mb-auto">
                  <div className="flex justify-center items-center m-5 p-10">
                      {
                          PageComponent(pages[selectedPage].component)
                      }
                  </div>
                  <div className={`mt-auto`}>
                      <div className={'join'}>
                          <button
                              className={`
                              join-item btn md:btn-square btn-sm-square border-0
                              bg-neutral-700 text-neutral-100
                            hover:bg-neutral-100 hover:text-neutral-800
                              `}
                              onClick={() => {
                                  if (selectedPage > 0) {
                                      setSelectedPage(selectedPage - 1)
                                  }
                              }}
                          >
                              {'<'}
                          </button>
                          {
                              pages.map((_, index) => {
                                  return (
                                      <button key={index}
                                              className={`
                                              hidden md:inline-block
                                              join-item btn btn-sm-square
                                              border-0
                                              hover:bg-neutral-100 hover:text-neutral-800
                                              ${selectedPage === index ?
                                                  'bg-neutral-100 text-neutral-800' :
                                                  'bg-neutral-700 text-neutral-100'
                                              }`}
                                              onClick={() => setSelectedPage(index)}
                                      >
                                          {index + 1}
                                      </button>
                                  )
                              })
                          }
                          <button
                              className={`
                              join-item btn md:btn-square btn-sm-square border-0
                              bg-neutral-700 text-neutral-100
                            hover:bg-neutral-100 hover:text-neutral-800
                              `}
                              onClick={() => {
                                  if (selectedPage < pages.length - 1) {
                                      setSelectedPage(selectedPage + 1)
                                  }
                              }}
                          >
                              {'>'}
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  )
}

export default App
