// src/calculate/Linear_Algebra_Equations/ui/MatrixInversion.jsx
import { useState } from 'react';
import { MathJaxContext } from 'better-react-mathjax';
import { MatrixInversion } from '../logic/MatrixInversion';
import MatrixSizeSelector from '../component/MatrixSizeSelector';
import MatrixInputLatex from '../component/MatrixInputLatex';
import ActionButtons from '../component/ActionButtons';
import SolutionDisplay from '../component/SolutionDisplay';
import { mathJaxConfig, fmtAugmentedIdentity, fmtMatrix, fmtVector, fmtSolution, createHandlers } from '../component/latexHelpers';

function MatrixInversionUI() {
    const [size, setSize] = useState(3);
    const [matrixA, setMatrixA] = useState([[-2, 3, 1], [3, 4, -5], [1, -2, 1]]);
    const [matrixB, setMatrixB] = useState([9, 0, -4]);
    const [solution, setSolution] = useState(null);

    const handlers = createHandlers(size, setMatrixA, setMatrixB, setSolution, setSize);

    const formatSolution = ({ steps, x, B, inverseA }) => {
        let count = 0;
        const elimination = steps.map(({ Ai, Ii, e, r }) => {
            if (count === steps.length - 1) {
                return `${fmtAugmentedIdentity(Ai, Ii)}`;
            } else if (count >= steps.length - size - 1) {
                count++;
                return `${fmtAugmentedIdentity(Ai, Ii)} \\\\ \\xrightarrow{R_{${r}} = \\frac{R_{${r}}}{a_{${r}${r}}}} \\\\`;
            } else {
                count++;
                return `${fmtAugmentedIdentity(Ai, Ii)} \\\\ \\xrightarrow{R_{${e}} = R_{${e}} - \\frac{a_{${e}${r}}}{a_{${r}${r}}} R_{${r}}} \\\\`;
            }
        }).join('\\\\[2em]');

        const multiplication = `
            \\mathbf{X} = \\mathbf{A}^{-1}\\mathbf{B}
            = {${fmtMatrix(inverseA)}}{${fmtVector(B)}} =
            ${fmtVector(x)}
        `;

        return `
            \\begin{gather*}
            \\text{Matrix Inversion: } [A|I] \\rightarrow [I|A^{-1}] \\\\[2em]
            ${elimination} \\\\[2em]
            ${multiplication} \\\\[2em]
            ${fmtSolution(x)}
            \\end{gather*}
        `;
    };

    const handleCalculate = () => {
        try {
            const result = new MatrixInversion(size).calculate(matrixA, matrixB);
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

export default MatrixInversionUI;