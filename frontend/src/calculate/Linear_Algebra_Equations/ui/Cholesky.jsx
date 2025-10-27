// src/calculate/Linear_Algebra_Equations/ui/Cholesky.jsx
import { useState } from 'react';
import { MathJaxContext } from 'better-react-mathjax';
import { Cholesky } from '../logic/Cholesky';
import MatrixSizeSelector from '../component/MatrixSizeSelector';
import MatrixInputLatex from '../component/MatrixInputLatex';
import ActionButtons from '../component/ActionButtons';
import SolutionDisplay from '../component/SolutionDisplay';
import { mathJaxConfig, fmtMatrix, fmtVector, fmtSolution, createHandlers } from '../component/latexHelpers';

function CholeskyUI() {
    const [size, setSize] = useState(3);
    const [matrixA, setMatrixA] = useState([[4, 2, 1], [2, 5, 3], [1, 3, 6]]);
    const [matrixB, setMatrixB] = useState([7, 10, 10]);
    const [solution, setSolution] = useState(null);

    const handlers = createHandlers(size, setMatrixA, setMatrixB, setSolution, setSize);

    const formatSolution = ({ L, LT, y, x, A, B }) => `
        \\begin{gather*}
        \\text{Cholesky Decomposition: } \\mathbf{A} = \\mathbf{L} \\mathbf{L}^T \\\\[1em]
        ${fmtMatrix(A)} = ${fmtMatrix(L)} ${fmtMatrix(LT)} \\\\[2em]
        
        \\text{Forward Substitution: } \\mathbf{L}\\mathbf{y} = \\mathbf{B} \\\\[1em]
        ${fmtMatrix(L)} ${fmtVector(y)} = ${fmtVector(B)} \\\\[2em]
        
        \\text{Back Substitution: } \\mathbf{L}^T\\mathbf{x} = \\mathbf{y} \\\\[1em]
        ${fmtMatrix(LT)} ${fmtVector(x)} = ${fmtVector(y)} \\\\[2em]
        
        \\therefore \\quad ${fmtSolution(x)}
        \\end{gather*}
    `;

    const handleCalculate = () => {
        try {
            const result = new Cholesky(size).calculate(matrixA, matrixB);
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
                
                <div style={{ 
                    padding: '15px', 
                    backgroundColor: '#fff3cd', 
                    border: '1px solid #ffc107',
                    borderRadius: '6px',
                    marginTop: '20px'
                }}>
                    <strong>⚠️ Note:</strong> Cholesky decomposition requires a symmetric positive definite matrix.
                </div>
            </div>
        </MathJaxContext>
    );
}

export default CholeskyUI;