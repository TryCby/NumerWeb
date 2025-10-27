import { evaluate } from 'mathjs';

class Secant {
    constructor(fx, x0, x1, error){  
        this.fx = fx;
        this.x0 = parseFloat(x0);    
        this.x1 = parseFloat(x1);   
        this.error = parseFloat(error);
        this.maxIteration = 100;
    }

    calculate() {
        let x0 = this.x0;
        let x1 = this.x1;
        let x2;
        let fx0, fx1, fx2;
        let e = 1;
        let iteration = 0;
        let history = [];

        do {
            fx0 = evaluate(this.fx, { x: x0 });  
            fx1 = evaluate(this.fx, { x: x1 });
            
            if (Math.abs(fx0 - fx1) < 1e-10) {
                throw new Error('Division by zero: f(x0) ≈ f(x1)');
            }
            
            x2 = x1 - (fx1 * (x0 - x1)) / (fx0 - fx1);
            fx2 = evaluate(this.fx, { x: x2 });
            
            if (iteration !== 0) {
                e = Math.abs((x2 - x1) / x2);
            }

            history.push({
                iteration: iteration + 1,
                x0: x0,
                x1: x1,
                x2: x2,
                fx: fx2,
                error: iteration === 0 ? null : e  
            });

            // เลื่อนค่า
            x0 = x1;
            x1 = x2;
            iteration++;
            
        } while ((e > this.error) && (iteration < this.maxIteration));

        return {
            iterations: iteration,
            root: x2,
            fx: fx2,
            error: e,
            history: history
        }
    }
}

export default Secant;