export class GaussJordan {
    constructor(n) {
        this.n = n;
    }

    calculate(a, b) {
        const A = a.map(row => row.map(val => parseFloat(val) || 0));
        const B = b.map(val => parseFloat(val) || 0);
        
        // Create Augmented Matrix [A|B]
        const augmented = A.map((row, i) => [...row, B[i]]);
        const steps = [];

        // Gauss-Jordan Elimination
        for (let i = 0; i < this.n; i++) {
            // Find pivot
            let maxRow = i;
            for (let k = i + 1; k < this.n; k++) {
                if (Math.abs(augmented[k][i]) > Math.abs(augmented[maxRow][i])) {
                    maxRow = k;
                }
            }

            // Swap rows
            if (maxRow !== i) {
                [augmented[i], augmented[maxRow]] = [augmented[maxRow], augmented[i]];
            }

            // Check singular matrix
            if (Math.abs(augmented[i][i]) < 1e-10) {
                throw new Error('Matrix is singular or nearly singular');
            }

            // Save step before operation
            const currentA = augmented.map(row => row.slice(0, this.n));
            const currentB = augmented.map(row => row[this.n]);

            // Make diagonal = 1
            const pivot = augmented[i][i];
            for (let j = 0; j <= this.n; j++) {
                augmented[i][j] /= pivot;
            }

            steps.push({
                Ai: currentA,
                Bi: currentB,
                operation: `R_{${i + 1}} = R_{${i + 1}} / a_{${i + 1}${i + 1}}`
            });

            // Elimination (both above and below)
            for (let k = 0; k < this.n; k++) {
                if (k !== i && Math.abs(augmented[k][i]) > 1e-10) {
                    const currentA2 = augmented.map(row => row.slice(0, this.n));
                    const currentB2 = augmented.map(row => row[this.n]);
                    
                    const factor = augmented[k][i];
                    for (let j = 0; j <= this.n; j++) {
                        augmented[k][j] -= factor * augmented[i][j];
                    }

                    steps.push({
                        Ai: currentA2,
                        Bi: currentB2,
                        operation: `R_{${k + 1}} = R_{${k + 1}} - (${factor.toFixed(6)}) \\times R_{${i + 1}}`
                    });
                }
            }
        }

        // Final result
        const finalA = augmented.map(row => row.slice(0, this.n));
        const finalB = augmented.map(row => row[this.n]);
        steps.push({
            Ai: finalA,
            Bi: finalB
        });

        // Extract solution from last column
        const x = augmented.map(row => row[this.n]);

        return {
            steps: steps,
            x: x,
            A: finalA,
            B: finalB
        };
    }
}