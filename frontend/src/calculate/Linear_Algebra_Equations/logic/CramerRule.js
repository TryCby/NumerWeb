import { matrix, det } from 'mathjs';

export class CramerRule {
    constructor(n) {
        this.n = n;
    }

    calculate(a, b) {
        const A = a.map(row => row.map(val => parseFloat(val) || 0));
        const B = b.map(val => parseFloat(val) || 0);
        const detA = det(matrix(A));
        const result = [];

        if (Math.abs(detA) < 1e-9) {
            throw new Error("Determinant = 0 : System can't solve");
        }

        for (let i = 0; i < this.n; i++) {
            const Ai_array = A.map((row, rowIndex) =>
                row.map((val, colIndex) => colIndex === i ? B[rowIndex] : val)
            );
            const Ai_matrix = matrix(Ai_array);
            const detAi = det(Ai_matrix);
            const xi = detAi / detA;

            result.push({
                index: i + 1,
                Ai: Ai_array,
                detAi: detAi,
                xi: xi,
            });
        }

        return {
            detA: detA,
            results: result,
            A: A
        };
    }
}