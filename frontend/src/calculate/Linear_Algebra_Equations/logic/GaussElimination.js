export class GaussElimination {
    constructor(n) {
        this.n = n;
    }

    calculate(a, b) {
        const A = a.map(row => row.map(val => parseFloat(val) || 0));
        const B = b.map(val => parseFloat(val) || 0);
        const steps = [];
        const x = [];

        // Forward Elimination
        for (let r = 0; r < this.n; r++) {
            for (let e = r + 1; e < this.n; e++) {
                if (A[e][r] === 0) continue;
                
                steps.push({
                    Ai: A.map(row => [...row]),
                    Bi: [...B],
                    e: e + 1,
                    r: r + 1
                });
                
                let er = A[e][r];
                for (let R = 0; R < this.n; R++) {
                    A[e][R] = A[e][R] - (A[r][R] / A[r][r]) * er;
                }
                B[e] = B[e] - (B[r] / A[r][r]) * er;
            }
        }

        steps.push({
            Ai: A.map(row => [...row]),
            Bi: [...B],
        });

        // Back Substitution
        for (let i = this.n - 1; i >= 0; i--) {
            x[i] = B[i];
            for (let j = i + 1; j < this.n; j++) {
                x[i] -= A[i][j] * x[j];
            }
            x[i] /= A[i][i];
        }

        return {
            steps: steps,
            x: x,
            A: A,
            B: B
        };
    }
}