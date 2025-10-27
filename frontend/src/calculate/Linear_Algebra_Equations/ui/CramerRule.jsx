// src/calculate/Linear_Algebra_Equations/ui/CramerRule.jsx
import { useState } from 'react';
import { MathJaxContext } from 'better-react-mathjax';
import { round } from 'mathjs';
import { CramerRule } from '../logic/CramerRule';
import MatrixSizeSelector from '../component/MatrixSizeSelector';
import MatrixInputLatex from '../component/MatrixInputLatex';
import ActionButtons from '../component/ActionButtons';
import SolutionDisplay from '../component/SolutionDisplay';
import { mathJaxConfig, fmtDet, fmtSolution, createHandlers } from '../component/LatexHelpers';

function CramerRuleUI() {
    const [size, setSize] = useState(3);
    const [matrixA, setMatrixA] = useState([[-2, 3, 1], [3, 4, -5], [1, -2, 1]]);
    const [matrixB, setMatrixB] = useState([9, 0, -4]);
    const [solution, setSolution] = useState(null);

    const handlers = createHandlers(size, setMatrixA, setMatrixB, setSolution, setSize);

    const formatSolution = ({ detA, results, A }) => {
        const detAPart = `\\text{det}(A) = ${fmtDet(A)} = ${round(detA, 6)}`;
        
        const calculations = results.map(({ index, detAi, xi, Ai }) => `
            x_{${index}} = \\frac{\\text{det}(A_{${index}})}{\\text{det}(A)} 
            = \\frac{${fmtDet(Ai)}}{${round(detA, 6)}}
            = \\frac{${round(detAi, 6)}}{${round(detA, 6)}}
            = ${round(xi, 6)}
        `).join('\\\\[2em]');

        return `
            \\begin{gather*}
            ${detAPart} \\\\[2em]
            ${calculations} \\\\[2em]
            \\therefore \\quad ${fmtSolution(results.map(r => r.xi))}
            \\end{gather*}
        `;
    };

    const handleCalculate = () => {
        try {
            const result = new CramerRule(size).calculate(matrixA, matrixB);
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

export default CramerRuleUI;