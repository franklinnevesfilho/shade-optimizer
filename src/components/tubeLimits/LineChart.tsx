"use client";
import "chart.js/auto";
import {Line} from "react-chartjs-2";
import {ChartData} from "chart.js";

export interface BarChartProps {
    data: ChartData<"line", number[], number>;
    title?: string;
    xLabel?: string;
    yLabel?: string;
}


function LineChart(props:BarChartProps) {
    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    const getGridColor = () => {
        return prefersDarkMode? 'rgba(255,255,255,0.3)': 'rgba(0,0,0,0.3)';
    }

    const getTextColor = () => {
        return prefersDarkMode? 'rgba(255,255,255,1)': 'rgba(0,0,0,1)';
    }

    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: getGridColor() // You can replace this with a CSS variable

                },
                ticks: {
                    color: getTextColor() // You can replace this with a CSS variable
                }
            },
            x: {
                title: {
                    display: true,
                    text: props.xLabel,
                    color: getTextColor() // You can replace this with a CSS variable

                },
                grid: {
                    color: getGridColor() // You can replace this with a CSS variable
                },
                ticks: {
                    color: getTextColor() // You can replace this with a CSS variable
                },
            },
        }
    };

    return (
        <div className={'chart-container'}>
            <Line
                data={props.data}
                options={chartOptions}/>

        </div>
    );
}

export default LineChart;