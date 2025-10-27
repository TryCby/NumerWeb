import { useState } from 'react';
import Graphical from '../logic/Graphical';
import Inputs from '../component/Inputs';
import Solution from '../component/Solution';
import IterationTable from '../component/IterationTable';
import FunctionGraph from '../component/FunctionGraph';

function GraphicalUI() {
    const [inputs, setInputs] = useState({
        fx: '43x - 180',
        xl: '0',
        xr: '10',
        error: '0.000001' 
    });
    const [result, setResult] = useState(null);

    const handleInputChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        });
    };

    const handleCalculate = () => {
        try {
            const graphical = new Graphical(inputs.fx, inputs.xl, inputs.xr, inputs.error);
            const output = graphical.calculate();
            setResult(output);
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    return (
        <div>
            <Inputs
                inputs={inputs}
                onChange={handleInputChange}
                onCalculate={handleCalculate}
                methodType="bracket"
            />
            {result && (
                <>
                    <Solution result={result} />
                    <FunctionGraph 
                        fx={inputs.fx} 
                        root={result.root} 
                        xl={inputs.xl} 
                        xr={inputs.xr}
                        history={result.history}
                    />
                    <IterationTable 
                        history={result.history} 
                        methodType="graphical" 
                    />
                </>
            )}
        </div>
    );
}

export default GraphicalUI;