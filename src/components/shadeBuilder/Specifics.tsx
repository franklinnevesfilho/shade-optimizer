import MeasurementInput from "../form/MeasurementInput.tsx";
import QuestionTemplate, {QuestionsProps} from "./QuestionTemplate.tsx";


interface SpecificsProps extends QuestionsProps{
    specifics:{
        shadePlacement: "" | "outside" | "inside",
        width: {value: number, unit: string},
        drop: {value: number, unit: string}},
    setSpecifics: (
        value: {
            shadePlacement: "" | "outside" | "inside",
            width: {value: number, unit: string},
            drop: {value: number, unit: string}
        }) => void,
}

function Specifics({specifics, setSpecifics, onNext, ...props}: SpecificsProps) {

    const fullyAnswered =
        // specifics.shadePlacement !== '' &&
        specifics.width.value !== 0 && specifics.width.unit != '' && specifics.drop.value !== 0 && specifics.drop.unit != ''

    const errorMsg =
        specifics.width.value !== 0 && specifics.width.unit != '' ?
            (specifics.drop.value !== 0 && specifics.drop.unit != '' ? '' : 'Please enter a drop') :
            (specifics.drop.value !== 0 && specifics.drop.unit != '' ? 'Please enter a width' : 'Please enter a width and drop');

    return (
        <QuestionTemplate
            title={'Shade Sizing'}
            answered={fullyAnswered}
            onNext={onNext}
            errorMsg={errorMsg}
            {...props}
        >
            <div className={`flex flex-col justify-center items-center gap-3`}>
                <MeasurementInput
                    label={"Width"}
                    setMeasurement={(width) => {
                        setSpecifics({...specifics, width})
                    }}
                    measurement={specifics.width}
                />
                <MeasurementInput
                    label={"Drop"}
                    setMeasurement={(drop) => setSpecifics({...specifics, drop})}
                    measurement={specifics.drop}
                />
            </div>
        </QuestionTemplate>
);
}

export default Specifics;