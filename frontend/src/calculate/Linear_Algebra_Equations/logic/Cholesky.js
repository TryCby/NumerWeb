export class Cholesky {
    constructor(n) {
        this.n = n;
    }

    calculate(a, b) {
        const A = a.map(row => row.map(val => parseFloat(val) || 0));
        const B = b.map(val => parseFloat(val) || 0);

        // Check if matrix is symmetric
        for (let i = 0; i < this.n; i++) {
            for (let j = 0; j < this.n; j++) {
                if (Math.abs(A[i][j] - A[j][i]) > 1e-10) {
                    throw new Error('Matrix must be symmetric for Cholesky decomposition');
                }
            }
        }

        const L = Array(this.n).fill(0).map(() => Array(this.n).fill(0));

        // Cholesky decomposition: A = L * L^T
        for (let i = 0; i < this.n; i++) {
            for (let j = 0; j <= i; j++) {
                let sum = 0;
                
                if (j === i) {
                    for (let k = 0; k < j; k++) {
                        sum += L[j][k] * L[j][k];
                    }
                    const value = A[j][j] - sum;
                    if (value < 0) {
                        throw new Error('Matrix is not positive definite');
                    }
                    L[j][j] = Math.sqrt(value);
                } else {
                    for (let k = 0; k < j; k++) {
                        sum += L[i][k] * L[j][k];
                    }
                    L[i][j] = (A[i][j] - sum) / L[j][j];
                }
            }
        }

        // L^T
        const LT = Array(this.n).fill(0).map(() => Array(this.n).fill(0));
        for (let i = 0; i < this.n; i++) {
            for (let j = 0; j < this.n; j++) {
                LT[i][j] = L[j][i];
            }
        }

        // Forward substitution: Ly = B
        const y = Array(this.n).fill(0);
        for (let i = 0; i < this.n; i++) {
            y[i] = B[i];
            for (let j = 0; j < i; j++) {
                y[i] -= L[i][j] * y[j];
            }
            y[i] /= L[i][i];
        }

        // Back substitution: L^T x = y
        const x = Array(this.n).fill(0);
        for (let i = this.n - 1; i >= 0; i--) {
            x[i] = y[i];
            for (let j = i + 1; j < this.n; j++) {
                x[i] -= LT[i][j] * x[j];
            }
            x[i] /= LT[i][i];
        }

        return { 
            L: L, 
            LT: LT, 
            y: y, 
            x: x, 
            A: A, 
            B: B 
        };
    }
}