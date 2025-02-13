import React from 'react';
import {useTheme} from "../../hooks";
import PopUp from "../basic/PopUp.tsx";

export interface QuestionsProps{
    onNext?: () => void,
    onPrev?: () => void
}

interface QuestionTemplateProps {
    title: string,
    answered?: () => boolean
    children?: React.ReactNode
    style?: string
    onNext?: () => void
    onPrev?: () => void
    errorMsg?: () => string
}
function QuestionTemplate(
    {
        title,
        children,
        style,
        onPrev,
        onNext,
        answered = ()=> false,
        errorMsg = ()=> 'Please answer the question before proceeding'
    }: QuestionTemplateProps) {
    const [error, setError] = React.useState(false)
    const {theme} = useTheme()

    const navButtons = ({onClick, text}: {onClick: () => void, text: string}) => {

        return (
            <button
                className={`
                p-2 w-20
                border-2
                ${
                    theme === 'dark' ? 
                        `
                        border-neutral-700 bg-neutral-800
                        hover:bg-neutral-700 hover:border-neutral-600
                        `:`
                        text-neutral-800
                        border-neutral-300
                        hover:bg-neutral-100 hover:border-neutral-400
                        `
                }
                `}
                onClick={onClick}
            >
                {text}
            </button>
        )
    }

    const handleNext = () => {
        if(onNext){

            if(answered()){
                onNext()
            }else{
                setError(true)
            }

        }
    }

    return (
        <>
        {
            error &&
            <PopUp
                title={'Error'}
                onClose={setError}
            >
                <div className={`text-lg`}>
                    {errorMsg()}
                </div>
            </PopUp>
        }
            <div className={`
        flex flex-col justify-center items-center gap-5 h-full w-full
        `}>
                <div className={`flex flex-row text-2xl italic border-b px-3`}>
                    {title}
                </div>
                <div className={`flex flex-col justify-center items-center gap-3 ${style}`}>
                    {children}
                </div>
                <div className={`mt-auto flex flex-row gap-3`}>
                    {
                        onPrev && navButtons({onClick: onPrev, text: 'Prev'})
                    }
                    {
                        onNext && navButtons({onClick: handleNext, text: 'Next'})
                    }
                </div>
            </div>
        </>
    );
}

export default QuestionTemplate;