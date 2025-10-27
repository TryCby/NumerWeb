export class MatrixInversion {
    constructor(n) {
        this.n = n;
    }

    calculate(a, b) {
        const A = a.map(row => row.map(val => parseFloat(val) || 0));
        const B = b.map(val => parseFloat(val) || 0);
        const I = [];

        // Initialize Identity Matrix
        for (let i = 0; i < this.n; i++) {
            I[i] = [];
            for (let j = 0; j < this.n; j++) {
                I[i][j] = i === j ? 1 : 0;
            }
        }

        const steps = [];

        // Forward Elimination
        for (let r = 0; r < this.n; r++) {
            for (let e = r + 1; e < this.n; e++) {
                if (A[e][r] === 0) continue;

                steps.push({
                    Ai: A.map(row => [...row]),
                    Ii: I.map(row => [...row]),
                    e: e + 1,
                    r: r + 1
                });

                let er = A[e][r];
                for (let R = 0; R < this.n; R++) {
                    A[e][R] = A[e][R] - (A[r][R] / A[r][r]) * er;
                    I[e][R] = I[e][R] - (I[r][R] / A[r][r]) * er;
                }
            }
        }

        // Back Elimination
        for (let r = this.n - 1; r > 0; r--) {
            for (let e = r - 1; e >= 0; e--) {
                if (A[e][r] === 0) continue;

                steps.push({
                    Ai: A.map(row => [...row]),
                    Ii: I.map(row => [...row]),
                    e: e + 1,
                    r: r + 1
                });

                let er = A[e][r];
                for (let R = 0; R < this.n; R++) {
                    A[e][R] = A[e][R] - (A[r][R] / A[r][r]) * er;
                    I[e][R] = I[e][R] - (I[r][R] / A[r][r]) * er;
                }
            }
        }

        // Normalize diagonal to 1
        for (let r = 0; r < this.n; r++) {
            if (A[r][r] === 1) continue;

            steps.push({
                Ai: A.map(row => [...row]),
                Ii: I.map(row => [...row]),
                r: r + 1
            });

            let rr = A[r][r];
            for (let e = 0; e < this.n; e++) {
                A[r][e] /= rr;
                I[r][e] /= rr;
            }
        }

        steps.push({
            Ai: A.map(row => [...row]),
            Ii: I.map(row => [...row]),
        });

        // Calculate X = A^-1 * B
        const x = [];
        for (let i = 0; i < this.n; i++) {
            x[i] = 0;
            for (let j = 0; j < this.n; j++) {
                x[i] += I[i][j] * B[j];
            }
        }

        return {
            steps: steps,
            x: x,
            B: B,
            inverseA: I
        };
    }
}