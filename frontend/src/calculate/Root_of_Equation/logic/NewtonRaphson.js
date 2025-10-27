import { evaluate } from 'mathjs';
import { derivative } from 'mathjs';

class NewtonRaphson {
    constructor(fx, xi, error){
        this.fx = fx;
        this.xi = parseFloat(xi); 
        this.error = parseFloat(error);
        this.maxIteration = 100;
    }

    calculate() {
        let xi_old;
        let xi_new = this.xi;
        let fx;
        let dfx = derivative(this.fx, 'x').toString(); 
        let e = 1;
        let iteration = 0;
        let history = [];

        do {
            xi_old = xi_new;
            xi_new = xi_old - (evaluate(this.fx, {x: xi_old}) / evaluate(dfx, {x: xi_old}));
            fx = evaluate(this.fx, {x: xi_new});
            e = Math.abs((xi_new - xi_old) / xi_new);

            history.push({
                iteration: iteration + 1,
                xi: xi_new,
                fx: fx,
                error: e
            });
            iteration++;    
        } while ((e > this.error) && (iteration < this.maxIteration));

        return {
            iterations: iteration,
            root: xi_new,
            fx: fx,
            error: e,
            history: history
        }
    }
}

export default NewtonRaphson;