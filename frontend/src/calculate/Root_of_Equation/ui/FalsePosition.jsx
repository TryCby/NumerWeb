import { useState } from 'react';
import FalsePosition from '../logic/FalsePosition';
import Inputs from '../component/Inputs';
import Solution from '../component/Solution';
import IterationTable from '../component/IterationTable';
import FunctionGraph from '../component/FunctionGraph';

function FalsePositionUI() {
    const [inputs, setInputs] = useState({
        fx: 'x^4 - 13',
        xl: '1.5',
        xr: '2',
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
            const falsePosition = new FalsePosition(inputs.fx, inputs.xl, inputs.xr, inputs.error);
            const output = falsePosition.calculate();
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
                        methodType="falseposition" 
                    />
                </>
            )}
        </div>
    );
}

export default FalsePositionUI;