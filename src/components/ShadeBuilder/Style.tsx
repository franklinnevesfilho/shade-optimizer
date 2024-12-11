import QuestionTemplate, {QuestionsProps} from "./QuestionTemplate.tsx";
import {ShadeOption} from "./ShadeOptions.tsx";

interface StyleProps extends QuestionsProps{
    styleOptions: {
        fabric: string,
        bottomRail: string
    },
    setStyleOptions: (value: {fabric: string, bottomRail: string}) => void
}

function Style({styleOptions, setStyleOptions, ...props}: StyleProps) {



    return (
        <QuestionTemplate
            title={'Shade Style'}
            answered={
                styleOptions.fabric !== '' && styleOptions.bottomRail !== ''
            }
            {...props}
        >
            <ShadeOption
                label={"Fabric"}
                options={['Fabric 1', 'Fabric 2', 'Fabric 3']}
                selected={styleOptions.fabric}
                setSelected={(fabric) => setStyleOptions({...styleOptions, fabric})}
            />
            <ShadeOption
                label={"Bottom Rail"}
                options={['Rail 1', 'Rail 2', 'Rail 3']}
                selected={styleOptions.bottomRail}
                setSelected={(bottomRail) => setStyleOptions({...styleOptions, bottomRail})}
            />
        </QuestionTemplate>
    );
}

export default Style;