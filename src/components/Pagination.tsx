
interface PaginationProps {
    numberOfPages: number;
    selectedPage: number;
    setSelectedPage: (page: number) => void;
}

function Pagination({numberOfPages, selectedPage, setSelectedPage}: PaginationProps) {
    return (
        <div>
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
            <div className={'join mx-3'}>
                {
                    Array.from({length: numberOfPages}, (_, index) => {
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
            </div>
            <button
                className={`
                              join-item btn md:btn-square btn-sm-square border-0
                              bg-neutral-700 text-neutral-100
                            hover:bg-neutral-100 hover:text-neutral-800
                              `}
                onClick={() => {
                    if (selectedPage < numberOfPages - 1) {
                        setSelectedPage(selectedPage + 1)
                    }
                }}
            >
                {'>'}
            </button>
        </div>
    );
}

export default Pagination;