import { evaluate } from 'mathjs';

class Bisection {
    constructor(fx, xl, xr, error){
        this.fx = fx;
        this.xl = parseFloat(xl);
        this.xr = parseFloat(xr);
        this.error = parseFloat(error);
        this.maxIteration = 100;
    }

    calculate() {
        let xL = this.xl;
        let xR = this.xr;
        let fxM, fxR;
        let xM_old = 0;
        let xM_new;
        let e = 1;
        let iteration = 0;
        let history = [];

        do {
            xM_new = (xL + xR) / 2;
            fxM = evaluate(this.fx, { x: xM_new }); 
            fxR = evaluate(this.fx, { x: xR });

            if (iteration !== 0) {
                e = Math.abs((xM_new - xM_old) / xM_new);
            }

            history.push({
                iteration: iteration + 1,
                xL: xL,
                xM: xM_new,
                xR: xR,
                fx: fxM,
                error: iteration === 0 ? null : e 
            });

            if (fxM * fxR < 0) {
                xL = xM_new;
            } 
            else {
                xR = xM_new;
            }

            xM_old = xM_new;
            iteration++;

        } while( (e >= this.error) && (iteration < this.maxIteration) );

        return {
            iterations: iteration,
            root: xM_new,
            fx: evaluate(this.fx, { x: xM_new }),
            error: e,
            history: history
        }
    }
}

export default Bisection;