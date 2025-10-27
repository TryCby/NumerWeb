// src/calculate/Linear_Algebra_Equations/ui/GaussElimination.jsx
import { useState } from 'react';
import { MathJaxContext } from 'better-react-mathjax';
import { round } from 'mathjs';
import { GaussElimination } from '../logic/GaussElimination';
import MatrixSizeSelector from '../component/MatrixSizeSelector';
import MatrixInputLatex from '../component/MatrixInputLatex';
import ActionButtons from '../component/ActionButtons';
import SolutionDisplay from '../component/SolutionDisplay';
import { mathJaxConfig, fmtAugmented, fmtSolution, createHandlers } from '../component/LatexHelpers';

function GaussEliminationUI() {
    const [size, setSize] = useState(3);
    const [matrixA, setMatrixA] = useState([[-2, 3, 1], [3, 4, -5], [1, -2, 1]]);
    const [matrixB, setMatrixB] = useState([9, 0, -4]);
    const [solution, setSolution] = useState(null);

    const handlers = createHandlers(size, setMatrixA, setMatrixB, setSolution, setSize);

    const getBackSubstitution = (x, n) => {
        const equations = [];
        for (let i = n - 1; i >= 0; i--) {
            let sum = `b_{${i + 1}}`;
            for (let j = i + 1; j < n; j++) {
                sum += ` - a_{${i + 1}${j + 1}}x_{${j + 1}}`;
            }
            equations.push(`x_{${i + 1}} = \\frac{${sum}}{a_{${i + 1}${i + 1}}} = ${round(x[i], 6)} \\\\[1em]`);
        }
        return `\\begin{gathered} ${equations.join('')} \\end{gathered}`;
    };

    const formatSolution = ({ steps, x }) => {
        let count = 0;
        const forward = steps.map(({ Ai, Bi, e, r }) => {
            if (count === steps.length - 1) {
                return `${fmtAugmented(Ai, Bi)}`;
            }
            count++;
            return `${fmtAugmented(Ai, Bi)} \\\\ \\xrightarrow{R_{${e}} = R_{${e}} - \\frac{a_{${e}${r}}}{a_{${r}${r}}} R_{${r}}} \\\\`;
        }).join('\\\\[2em]');

        return `
            \\begin{gather*}
            \\text{Forward Elimination} \\\\[2em]
            ${forward} \\\\[2em]
            \\text{Back Substitution} \\\\[2em]
            ${getBackSubstitution(x, size)} \\\\[2em]
            ${fmtSolution(x)}
            \\end{gather*}
        `;
    };

    const handleCalculate = () => {
        try {
            const result = new GaussElimination(size).calculate(matrixA, matrixB);
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

export default GaussEliminationUI;