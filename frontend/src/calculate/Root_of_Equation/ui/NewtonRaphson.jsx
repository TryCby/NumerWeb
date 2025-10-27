import { useState } from 'react';
import NewtonRaphson from '../logic/NewtonRaphson';
import Inputs from '../component/Inputs';
import Solution from '../component/Solution';
import IterationTable from '../component/IterationTable';
import NewtonGraph from '../component/NewtonGraph';

function NewtonRaphsonUI() {
    const [inputs, setInputs] = useState({
        fx: '(7 + x)(1 + x)',
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
            const newtonRaphson = new NewtonRaphson(inputs.fx, inputs.xi, inputs.error);
            const output = newtonRaphson.calculate();
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
                    <NewtonGraph 
                        fx={inputs.fx} 
                        history={result.history} 
                    />
                    <IterationTable 
                        history={result.history} 
                        methodType="newtonraphson" 
                    />
                </>
            )}
        </div>
    );
}

export default NewtonRaphsonUI;