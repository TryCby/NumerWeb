export class ConjugateGradient {
    constructor(n, tolerance = 0.000001) {
        this.n = n;
        this.maxIterations = 100;
        this.tolerance = tolerance;
    }

    // Matrix-vector multiplication
    matrixVectorMult(A, v) {
        const result = Array(this.n).fill(0);
        for (let i = 0; i < this.n; i++) {
            for (let j = 0; j < this.n; j++) {
                result[i] += A[i][j] * v[j];
            }
        }
        return result;
    }

    // Dot product
    dotProduct(v1, v2) {
        let sum = 0;
        for (let i = 0; i < this.n; i++) {
            sum += v1[i] * v2[i];
        }
        return sum;
    }

    // Vector addition/subtraction
    vectorOp(v1, v2, scalar = 1, operation = 'add') {
        const result = Array(this.n).fill(0);
        for (let i = 0; i < this.n; i++) {
            result[i] = operation === 'add' 
                ? v1[i] + scalar * v2[i]
                : v1[i] - scalar * v2[i];
        }
        return result;
    }

    calculate(a, b, initialX = null) {
        const A = a.map(row => row.map(val => parseFloat(val) || 0));
        const B = b.map(val => parseFloat(val) || 0);

        // Check if matrix is symmetric
        for (let i = 0; i < this.n; i++) {
            for (let j = 0; j < this.n; j++) {
                if (Math.abs(A[i][j] - A[j][i]) > 1e-10) {
                    throw new Error('Matrix must be symmetric for Conjugate Gradient method');
                }
            }
        }

        // Use provided initial values or default to zeros
        let x = initialX 
            ? initialX.map(val => parseFloat(val) || 0)
            : Array(this.n).fill(0);

        // Initial residual: r = b - Ax
        const Ax0 = this.matrixVectorMult(A, x);
        let r = this.vectorOp(B, Ax0, 1, 'sub');
        let p = [...r]; // Initial search direction
        const history = [];
        let iteration = 0;

        while (iteration < this.maxIterations) {
            const xOld = [...x];
            const Ap = this.matrixVectorMult(A, p);
            const rDotR = this.dotProduct(r, r);
            const alpha = rDotR / this.dotProduct(p, Ap);

            // Update x
            x = this.vectorOp(x, p, alpha, 'add');

            // Update residual
            const rNew = this.vectorOp(r, Ap, alpha, 'sub');
            const rNewDotRNew = this.dotProduct(rNew, rNew);

            // Calculate error for each variable
            const errors = [];
            let maxError = 0;
            for (let i = 0; i < this.n; i++) {
                let err = 0;
                if (Math.abs(x[i]) > 1e-10) {
                    err = Math.abs((x[i] - xOld[i]) / x[i]);
                } else {
                    err = Math.abs(x[i] - xOld[i]);
                }
                errors.push(err);
                maxError = Math.max(maxError, err);
            }

            // Calculate residual error
            const error = Math.sqrt(rNewDotRNew);

            iteration++;
            history.push({
                iteration,
                x: [...x],
                errors: errors,
                error: maxError
            });

            if (maxError < this.tolerance) {
                break;
            }

            // Update search direction
            const beta = rNewDotRNew / rDotR;
            p = this.vectorOp(rNew, p, beta, 'add');
            r = rNew;

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