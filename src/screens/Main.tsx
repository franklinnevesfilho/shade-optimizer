import {ReactNode, useState} from "react";
import Pagination from "../components/Pagination.tsx";

function Main() {

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
            <div className="w-[100%] h-[100%] flex flex-col justify-center items-center mt-5 md:mt-16">
                {/* Card */}
                <div className="w-[90%] sm:w-[60%] h-[90%] sm:h-[80%]  flex flex-col border-2 border-white rounded-lg shadow-lg p-5 mb-auto">
                    <div className="flex justify-center items-center m-5 p-10">
                        {
                            PageComponent(pages[selectedPage].component)
                        }
                    </div>
                    <div className={`mt-auto`}>
                        <Pagination
                            setSelectedPage={setSelectedPage}
                            selectedPage={selectedPage}
                            numberOfPages={pages.length} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main
