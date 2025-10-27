// src/calculate/Linear_Algebra_Equations/ui/Jacobi.jsx
import { useState } from 'react';
import { Jacobi } from '../logic/Jacobi';
import MatrixInput from '../component/MatrixInput';
import MatrixSolution from '../component/MatrixSolution';
import IterationTableMatrix from '../component/IterationTableMatrix';

function JacobiUI() {
    const [n, setN] = useState(3);
    const [matrixA, setMatrixA] = useState([
        ['5', '2', '0'],
        ['2', '5', '2'],
        ['0', '2', '5']
    ]);
    const [matrixB, setMatrixB] = useState(['12', '17', '14']);
    const [initialX, setInitialX] = useState(['0', '0', '0']);
    const [tolerance, setTolerance] = useState('0.000001');
    const [result, setResult] = useState(null);

    const handleNChange = (newN) => {
        if (newN < 2 || newN > 10) return;
        
        setN(newN);
        setMatrixA(Array(newN).fill(0).map(() => Array(newN).fill('')));
        setMatrixB(Array(newN).fill(''));
        setInitialX(Array(newN).fill('0'));
        setResult(null);
    };

    const handleMatrixChange = (type, value) => {
        if (type === 'A') {
            setMatrixA(value);
        } else if (type === 'B') {
            setMatrixB(value);
        }
        setResult(null);
    };

    const handleInitialXChange = (value) => {
        setInitialX(value);
        setResult(null);
    };

    const handleToleranceChange = (value) => {
        setTolerance(value);
        setResult(null);
    };

    const handleCalculate = () => {
        try {
            const tol = parseFloat(tolerance) || 0.000001;
            const jacobi = new Jacobi(n, tol);
            const output = jacobi.calculate(matrixA, matrixB, initialX);
            setResult(output);
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    return (
        <div>
            <MatrixInput
                n={n}
                onNChange={handleNChange}
                matrixA={matrixA}
                matrixB={matrixB}
                onMatrixChange={handleMatrixChange}
                onCalculate={handleCalculate}
                showInitialX={true}
                initialX={initialX}
                onInitialXChange={handleInitialXChange}
                showTolerance={true}
                tolerance={tolerance}
                onToleranceChange={handleToleranceChange}
            />
            {result && (
                <>
                    <MatrixSolution result={result} methodType="jacobi" />
                    <IterationTableMatrix history={result.history} n={n} />
                </>
            )}
        </div>
    );
}

export default JacobiUI;