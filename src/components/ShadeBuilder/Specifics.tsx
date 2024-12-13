import QuestionTemplate, {QuestionsProps} from "./QuestionTemplate.tsx";
// import ToggleBtn from "../basic/ToggleBtn.tsx";
import MeasurementInput from "../form/MeasurementInput.tsx";


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
            title={'Shade Specifics'}
            answered={fullyAnswered}
            onNext={onNext}
            errorMsg={errorMsg}
            {...props}
        >
            <div className={`flex flex-col justify-center items-center gap-3`}>
                {/*<div className={`flex flex-row justify-center items-center gap-3`}>*/}
                {/*     <ToggleBtn*/}
                {/*         isToggled={specifics.shadePlacement === 'inside'}*/}
                {/*            onClick={() => setSpecifics({...specifics, shadePlacement: 'inside'})}*/}
                {/*         style={`text-xl p-2`}> Inside </ToggleBtn>*/}
                {/*    or*/}
                {/*    <ToggleBtn*/}
                {/*        isToggled={specifics.shadePlacement === 'outside'}*/}
                {/*        onClick={() => setSpecifics({...specifics, shadePlacement: 'outside'})}*/}
                {/*        style={`text-xl p-2`}> Outside </ToggleBtn>*/}
                {/*    shade placement?*/}
                {/*</div>*/}
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