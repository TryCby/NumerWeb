export class LU_Decomposition {
    constructor(n) {
        this.n = n;
    }

    calculate(a, b) {
        const A = a.map(row => row.map(val => parseFloat(val) || 0));
        const B = b.map(val => parseFloat(val) || 0);
        
        const L = Array(this.n).fill(0).map(() => Array(this.n).fill(0));
        const U = Array(this.n).fill(0).map(() => Array(this.n).fill(0));
        
        // Initialize L diagonal to 1
        for (let i = 0; i < this.n; i++) {
            L[i][i] = 1;
        }

        // LU Decomposition
        for (let i = 0; i < this.n; i++) {
            // Upper triangular
            for (let k = i; k < this.n; k++) {
                let sum = 0;
                for (let j = 0; j < i; j++) {
                    sum += L[i][j] * U[j][k];
                }
                U[i][k] = A[i][k] - sum;
            }

            // Lower triangular
            for (let k = i + 1; k < this.n; k++) {
                let sum = 0;
                for (let j = 0; j < i; j++) {
                    sum += L[k][j] * U[j][i];
                }
                L[k][i] = (A[k][i] - sum) / U[i][i];
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

        // Back substitution: Ux = y
        const x = Array(this.n).fill(0);
        for (let i = this.n - 1; i >= 0; i--) {
            x[i] = y[i];
            for (let j = i + 1; j < this.n; j++) {
                x[i] -= U[i][j] * x[j];
            }
            x[i] /= U[i][i];
        }

        return { 
            L: L, 
            U: U, 
            y: y, 
            x: x, 
            A: A, 
            B: B 
        };
    }
}