import { Dropdown } from "../index.ts";
import { Measurement } from "../../types";
import { useTheme } from "../../hooks";

interface MeasurementInputProps {
    label?: string;
    setMeasurement: (measurement: Measurement) => void;
    measurement: Measurement;
    type?: "length" | "weight" | "density" | "modulus";
}

function MeasurementInput({ label, setMeasurement, measurement, type = "length" }: MeasurementInputProps) {
    const { theme } = useTheme();

    const unitOptions = {
        length: ["mm", "cm", "in", "ft", "m"],
        weight: ["kg/m", "lb/ft"],
        density: ["g/cc", "lb/cu.ft"],
        modulus: ["GPa", "psi"],
    };

    const options = unitOptions[type] || [];

    return (
        <div className="flex flex-row justify-center items-center w-full gap-3">
            <div className="flex flex-grow">{label || "Measurement"}</div>
            <input
                className={`w-20 h-10 text-center border rounded-md ${
                    theme === "dark" ? "bg-neutral-800 text-neutral-200" : "bg-neutral-50 text-neutral-800"
                }`}
                type="number"
                value={measurement.value}
                onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    setMeasurement({ ...measurement, value });
                }}
                min={0}
            />
            <Dropdown options={options} selected={measurement.unit} setSelected={(unit) => setMeasurement({ ...measurement, unit })} />
        </div>
    );
}

export default MeasurementInput;
