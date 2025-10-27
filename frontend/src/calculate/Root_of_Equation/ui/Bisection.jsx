import { useState } from 'react';
import Bisection from '../logic/Bisection';
import Inputs from '../component/Inputs';
import Solution from '../component/Solution';
import IterationTable from '../component/IterationTable';
import FunctionGraph from '../component/FunctionGraph';
import axios from 'axios';

function BisectionUI() {
    const [inputs, setInputs] = useState({
        fx: '',
        xl: '',
        xr: '',
        error: ''
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
            const bisection = new Bisection(inputs.fx, inputs.xl, inputs.xr, inputs.error);
            const output = bisection.calculate();
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
                        methodType="bisection" 
                    />
                </>
            )}
        </div>
    );
}

export default BisectionUI;