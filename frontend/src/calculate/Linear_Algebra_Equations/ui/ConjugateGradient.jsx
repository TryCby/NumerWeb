// src/calculate/Linear_Algebra_Equations/ui/ConjugateGradient.jsx
import { useState } from 'react';
import { ConjugateGradient } from '../logic/ConjugateGradient';
import MatrixInput from '../component/MatrixInput';
import MatrixSolution from '../component/MatrixSolution';
import IterationTableMatrix from '../component/IterationTableMatrix';

function ConjugateGradientUI() {
    const [n, setN] = useState(3);
    const [matrixA, setMatrixA] = useState([
        ['4', '1', '0'],
        ['1', '4', '1'],
        ['0', '1', '4']
    ]);
    const [matrixB, setMatrixB] = useState(['5', '6', '5']);
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
            const cg = new ConjugateGradient(n, tol);
            const output = cg.calculate(matrixA, matrixB, initialX);
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
                    <MatrixSolution result={result} methodType="conjugate" />
                    <IterationTableMatrix history={result.history} n={n} />
                    <div style={{ padding: '20px', border: '1px solid #ccc', marginBottom: '20px' }}>
                        <p style={{ color: '#666', fontSize: '14px' }}>
                            Note: Conjugate Gradient method requires a symmetric positive definite matrix.
                        </p>
                    </div>
                </>
            )}
        </div>
    );
}

export default ConjugateGradientUI;