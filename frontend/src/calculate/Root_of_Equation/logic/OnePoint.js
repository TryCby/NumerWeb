import { evaluate } from 'mathjs';

class OnePoint {
    constructor(fx, xi, error){
        this.fx = fx;
        this.xi = parseFloat(xi); 
        this.error = parseFloat(error);
        this.maxIteration = 100;
    }

    calculate() {
        let xi_old;
        let xi_new = this.xi;
        let e = 1;
        let iteration = 0;
        let history = [];
        let divergeCheck = 0;

        do {
            xi_old = xi_new;
            xi_new = evaluate(this.fx, { x: xi_old });
            
            // ตรวจสอบค่าที่ไม่ valid
            if (!isFinite(xi_new)) {
                throw new Error('Function returns Infinity or NaN');
            }
            
            // ตรวจสอบค่าที่ใหญ่เกินไป (diverging)
            if (Math.abs(xi_new) > 1e10) {
                throw new Error('Value diverging (too large). This function may not converge with One-Point Iteration.');
            }
            
            if (Math.abs(xi_new) < 1e-10) {
                e = Math.abs(xi_new - xi_old);
            } else {
                e = Math.abs((xi_new - xi_old) / xi_new);
            }

            history.push({
                iteration: iteration + 1,
                xi: xi_new,
                fx: evaluate(this.fx, { x: xi_new }),
                error: e  
            });

            // ตรวจสอบว่า error เพิ่มขึ้นเรื่อยๆ (diverging)
            if (iteration > 0 && Math.abs(xi_new - xi_old) > Math.abs(history[iteration-1].xi - (iteration > 1 ? history[iteration-2].xi : this.xi))) {
                divergeCheck++;
                if (divergeCheck >= 5) {
                    throw new Error('Method is diverging. Error is increasing. Try a different function or method.');
                }
            } else {
                divergeCheck = 0;
            }

            iteration++;
            
        } while ((e > this.error) && (iteration < this.maxIteration));

        // ถ้าไม่ converge ภายใน maxIteration
        if (iteration >= this.maxIteration && e > this.error) {
            throw new Error(`Did not converge after ${this.maxIteration} iterations. Try a different initial value or method.`);
        }

        return {
            iterations: iteration,
            root: xi_new,
            fx: evaluate(this.fx, { x: xi_new }),
            error: e,
            history: history
        }
    }
}

export default OnePoint;