import { useState } from 'react';
import OnePoint from '../logic/OnePoint';
import Inputs from '../component/Inputs';
import Solution from '../component/Solution';
import IterationTable from '../component/IterationTable';
import OnePointGraph from '../component/OnePointGraph';

function OnePointUI() {
    const [inputs, setInputs] = useState({
        fx: '(x+1)/2',
        xi: '0',
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
            const onePoint = new OnePoint(inputs.fx, inputs.xi, inputs.error);
            const output = onePoint.calculate();
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
                methodType="open-single"
            />
            {result && (
                <>
                    <Solution result={result} />
                    <OnePointGraph 
                        fx={inputs.fx} history={result.history} />
                    <IterationTable 
                        history={result.history} 
                        methodType="onepoint" 
                    />
                </>
            )}
        </div>
    );
}

export default OnePointUI;