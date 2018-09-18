import { string, shape, arrayOf, object } from 'prop-types';
import { Line } from 'react-chartjs-2';

// import css from './style.css';

const propTypes = {
    dataset: arrayOf(object)
};

const borderColors = ['red', 'blue', 'purple', 'orange'];

const Chart = ({
    datasets
}) => {
    const { values, yUnit, xUnit } = datasets;

    const lines = values.map((dataset, index) => {
            return {
                label: dataset.name,
                fill: false,
                lineTension: 0.1,
                borderColor: borderColors[index],
                borderCapStyle: 'square',
                pointBackgroundColor: 'white',
                pointHoverRadius: 8,
                pointHoverBorderColor: 'brown',
                pointHoverBorderWidth: 2,
                data: dataset.all,
            };
        });
    
    if (!lines.length) {
        return null;
    }

    const firstDatasetSet = values[0];

    return (
        <div>
            <Line
                data={{
                    labels: firstDatasetSet.x,
                    datasets: lines,
                }}
                options={{
                    scales: {
                        xAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: xUnit
                            },
                        }],
                        yAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: yUnit
                            },
                        }],
                    },
                }}
            />
        </div>
    );   
};

Chart.propTypes = propTypes;

export default Chart;
