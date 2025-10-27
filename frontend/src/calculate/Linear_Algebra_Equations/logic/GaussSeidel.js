export class GaussSeidel {
    constructor(n, tolerance = 0.000001) {
        this.n = n;
        this.maxIterations = 100;
        this.tolerance = tolerance;
    }

    calculate(a, b, initialX = null) {
        const A = a.map(row => row.map(val => parseFloat(val) || 0));
        const B = b.map(val => parseFloat(val) || 0);

        // Check diagonal dominance
        for (let i = 0; i < this.n; i++) {
            let sum = 0;
            for (let j = 0; j < this.n; j++) {
                if (i !== j) sum += Math.abs(A[i][j]);
            }
            if (Math.abs(A[i][i]) < sum) {
                console.warn('Matrix may not be diagonally dominant. Convergence not guaranteed.');
            }
        }

        // Use provided initial values or default to zeros
        let x = initialX 
            ? initialX.map(val => parseFloat(val) || 0)
            : Array(this.n).fill(0);

        const history = [];
        let iteration = 0;
        let error = 1;

        while (error > this.tolerance && iteration < this.maxIterations) {
            const xOld = [...x];
            
            // Gauss-Seidel iteration (uses updated values immediately)
            for (let i = 0; i < this.n; i++) {
                let sum = 0;
                for (let j = 0; j < this.n; j++) {
                    if (i !== j) {
                        sum += A[i][j] * x[j]; // Use latest x values
                    }
                }
                x[i] = (B[i] - sum) / A[i][i];
            }

            // Calculate error for each variable
            const errors = [];
            error = 0;
            for (let i = 0; i < this.n; i++) {
                let err = 0;
                if (Math.abs(x[i]) > 1e-10) {
                    err = Math.abs((x[i] - xOld[i]) / x[i]);
                } else {
                    err = Math.abs(x[i] - xOld[i]);
                }
                errors.push(err);
                error = Math.max(error, err);
            }

            iteration++;
            history.push({
                iteration,
                x: [...x],
                errors: errors,
                error: error
            });

            if (iteration >= this.maxIterations) {
                throw new Error(`Did not converge after ${this.maxIterations} iterations`);
            }
        }

        return { 
            x: x, 
            history: history, 
            A: A, 
            B: B 
        };
    }
}