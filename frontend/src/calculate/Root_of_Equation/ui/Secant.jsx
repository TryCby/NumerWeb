import { useState } from 'react';
import Secant from '../logic/Secant';
import Inputs from '../component/Inputs';
import Solution from '../component/Solution';
import IterationTable from '../component/IterationTable';
import SecantGraph from '../component/SecantGraph';

function SecantUI() {
    const [inputs, setInputs] = useState({
        fx: '(7 + x)(1 + x)',
        x0: '0',
        x1: '2',
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
            const secant = new Secant(inputs.fx, inputs.x0, inputs.x1, inputs.error);
            const output = secant.calculate();
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
                methodType="open-double"
            />
            {result && (
                <>
                    <Solution result={result} />
                    <SecantGraph 
                        fx={inputs.fx} 
                        history={result.history} 
                    />
                    <IterationTable 
                        history={result.history} 
                        methodType="secant" 
                    />
                </>
            )}
        </div>
    );
}

export default SecantUI;