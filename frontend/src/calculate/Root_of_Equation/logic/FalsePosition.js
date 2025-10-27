import { evaluate } from 'mathjs';

class FalsePosition {
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
        let fxL, fxM, fxR;
        let xM_old = 0;
        let xM_new;
        let e = 1;
        let iteration = 0;
        let history = [];

        do {
            fxL = evaluate(this.fx, { x: xL });
            fxR = evaluate(this.fx, { x: xR });
            xM_new = ((xL * fxR) - (xR * fxL)) / (fxR - fxL);
            fxM = evaluate(this.fx, { x: xM_new });

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

export default FalsePosition;