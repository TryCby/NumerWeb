// src/calculate/Linear_Algebra_Equations/ui/GaussJordan.jsx
import { useState } from 'react';
import { MathJaxContext } from 'better-react-mathjax';
import { GaussJordan } from '../logic/GaussJordan';
import MatrixSizeSelector from '../component/MatrixSizeSelector';
import MatrixInputLatex from '../component/MatrixInputLatex';
import ActionButtons from '../component/ActionButtons';
import SolutionDisplay from '../component/SolutionDisplay';
import { mathJaxConfig, fmtAugmented, fmtSolution, createHandlers } from '../component/latexHelpers';

function GaussJordanUI() {
    const [size, setSize] = useState(3);
    const [matrixA, setMatrixA] = useState([[-2, 3, 1], [3, 4, -5], [1, -2, 1]]);
    const [matrixB, setMatrixB] = useState([9, 0, -4]);
    const [solution, setSolution] = useState(null);

    const handlers = createHandlers(size, setMatrixA, setMatrixB, setSolution, setSize);

    const formatSolution = ({ steps, x }) => {
        const showSteps = steps.length > 10 
            ? [...steps.slice(0, 5), ...steps.slice(-3)]
            : steps;

        let count = 0;
        const elimination = showSteps.map(({ Ai, Bi, operation }) => {
            if (count === showSteps.length - 1) {
                return `${fmtAugmented(Ai, Bi)}`;
            }
            count++;
            return `${fmtAugmented(Ai, Bi)} \\\\ \\xrightarrow{${operation || ''}} \\\\`;
        }).join('\\\\[2em]');

        return `
            \\begin{gather*}
            \\text{Gauss-Jordan Elimination} \\\\[2em]
            ${steps.length > 10 ? '\\text{(Showing first 5 and last 3 steps)} \\\\[1em]' : ''}
            ${elimination} \\\\[2em]
            ${fmtSolution(x)}
            \\end{gather*}
        `;
    };

    const handleCalculate = () => {
        try {
            const result = new GaussJordan(size).calculate(matrixA, matrixB);
            setSolution(formatSolution(result));
        } catch (error) {
            alert('Error: ' + error.message);
            setSolution(null);
        }
    };

    return (
        <MathJaxContext config={mathJaxConfig}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <MatrixSizeSelector size={size} onSizeChange={handlers.handleSizeChange} />
                <MatrixInputLatex
                    size={size}
                    matrixA={matrixA}
                    matrixB={matrixB}
                    onMatrixAChange={handlers.handleMatrixAChange}
                    onMatrixBChange={handlers.handleMatrixBChange}
                />
                <ActionButtons onCalculate={handleCalculate} onClear={handlers.handleClear} />
                <SolutionDisplay latex={solution} />
            </div>
        </MathJaxContext>
    );
}

export default GaussJordanUI;