// src/calculate/Linear_Algebra_Equations/ui/LU_Decomposition.jsx
import { useState } from 'react';
import { MathJaxContext } from 'better-react-mathjax';
import { LU_Decomposition } from '../logic/LU_Decomposition';
import MatrixSizeSelector from '../component/MatrixSizeSelector';
import MatrixInputLatex from '../component/MatrixInputLatex';
import ActionButtons from '../component/ActionButtons';
import SolutionDisplay from '../component/SolutionDisplay';
import { mathJaxConfig, fmtMatrix, fmtVector, fmtSolution, createHandlers } from '../component/LatexHelpers';

function LU_DecompositionUI() {
    const [size, setSize] = useState(3);
    const [matrixA, setMatrixA] = useState([[-2, 3, 1], [3, 4, -5], [1, -2, 1]]);
    const [matrixB, setMatrixB] = useState([9, 0, -4]);
    const [solution, setSolution] = useState(null);

    const handlers = createHandlers(size, setMatrixA, setMatrixB, setSolution, setSize);

    const formatSolution = ({ L, U, y, x, A, B }) => `
        \\begin{gather*}
        \\text{LU Decomposition: } \\mathbf{A} = \\mathbf{L} \\mathbf{U} \\\\[1em]
        ${fmtMatrix(A)} = ${fmtMatrix(L)} ${fmtMatrix(U)} \\\\[2em]
        
        \\text{Forward Substitution: } \\mathbf{L}\\mathbf{y} = \\mathbf{B} \\\\[1em]
        ${fmtMatrix(L)} ${fmtVector(y)} = ${fmtVector(B)} \\\\[2em]
        
        \\text{Back Substitution: } \\mathbf{U}\\mathbf{x} = \\mathbf{y} \\\\[1em]
        ${fmtMatrix(U)} ${fmtVector(x)} = ${fmtVector(y)} \\\\[2em]
        
        \\therefore \\quad ${fmtSolution(x)}
        \\end{gather*}
    `;

    const handleCalculate = () => {
        try {
            const result = new LU_Decomposition(size).calculate(matrixA, matrixB);
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

export default LU_DecompositionUI;