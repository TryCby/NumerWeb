// src/calculate/Linear_Algebra_Equations/component/latexHelpers.js
import { round } from 'mathjs';

// MathJax Configuration
export const mathJaxConfig = {
    loader: { load: ["[tex]/ams"] },
    tex: {
        packages: { "[+]": ["ams"] },
        inlineMath: [["$", "$"]],
        displayMath: [["$$", "$$"]]
    }
};

// Format Matrix as LaTeX
export const fmtMatrix = (m) => {
    const content = m.map(row => 
        row.map(val => round(val, 6)).join(' & ')
    ).join('\\\\');
    return `\\begin{bmatrix} ${content} \\end{bmatrix}`;
};

// Format Vector as LaTeX
export const fmtVector = (v) => {
    const content = v.map(val => round(val, 6)).join('\\\\');
    return `\\begin{Bmatrix} ${content} \\end{Bmatrix}`;
};

// Format Determinant Matrix (with vertical bars)
export const fmtDet = (m) => {
    const content = m.map(row => 
        row.map(val => round(val, 6)).join(' & ')
    ).join('\\\\');
    return `\\begin{vmatrix} ${content} \\end{vmatrix}`;
};

// Format Augmented Matrix [A|B]
export const fmtAugmented = (A, B) => {
    const AB = A.map((row, idx) => {
        const a = row.map(val => round(val, 6));
        const b = round(B[idx], 6);
        return [...a, b];
    });
    const cols = AB[0].length;
    const colFmt = 'c'.repeat(cols - 1) + '|c';
    const content = AB.map(row => row.join(' & ')).join('\\\\');
    return `\\left[ \\begin{array}{${colFmt}} ${content}\\end{array} \\right]`;
};

// Format [A|I] for Matrix Inversion
export const fmtAugmentedIdentity = (A, I) => {
    const AI = A.map((row, idx) => {
        const a = row.map(val => round(val, 6));
        const i = I[idx].map(val => round(val, 6));
        return [...a, ...i];
    });
    const cols = A[0].length;
    const colFmt = 'c'.repeat(cols) + '|' + 'c'.repeat(cols);
    const content = AI.map(row => row.join(' & ')).join('\\\\');
    return `\\left[ \\begin{array}{${colFmt}} ${content}\\end{array} \\right]`;
};

// Format solution vector
export const fmtSolution = (x) => {
    return `
        \\mathbf{x} = 
        \\begin{Bmatrix}
            ${x.map((_, i) => `x_{${i + 1}}`).join(' \\\\ ')}
        \\end{Bmatrix}
        =
        \\begin{Bmatrix}
            ${x.map(xi => round(xi, 6)).join(' \\\\ ')}
        \\end{Bmatrix}
    `;
};

// Create new zero matrix
export const createMatrix = (size) => 
    Array(size).fill(0).map(() => Array(size).fill(0));

// Create new zero vector
export const createVector = (size) => Array(size).fill(0);

// Standard handler generators
export const createHandlers = (size, setMatrixA, setMatrixB, setSolution, setSize) => ({
    handleSizeChange: (e) => {
        const newSize = parseInt(e.target.value);
        setSize(newSize);
        setMatrixA(createMatrix(newSize));
        setMatrixB(createVector(newSize));
        setSolution(null);
    },

    handleMatrixAChange: (i, j, value) => {
        setMatrixA(prev => {
            const newMatrix = prev.map(row => [...row]);
            newMatrix[i][j] = value;
            return newMatrix;
        });
    },

    handleMatrixBChange: (i, value) => {
        setMatrixB(prev => {
            const newVector = [...prev];
            newVector[i] = value;
            return newVector;
        });
    },

    handleClear: () => {
        setMatrixA(createMatrix(size));
        setMatrixB(createVector(size));
        setSolution(null);
    }
});