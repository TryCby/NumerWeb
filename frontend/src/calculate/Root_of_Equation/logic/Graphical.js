import { evaluate } from 'mathjs';

class Graphical {
    constructor(fx, xl, xr, error){ 
        this.fx = fx;
        this.xl = parseFloat(xl);
        this.xr = parseFloat(xr);
        this.error = parseFloat(error); 
        this.maxIteration = 1000;
    }

    calculate() {
        let xL = this.xl;
        let xR = this.xr;
        let xOld = xL;
        let fxL, fxR;
        let e = 1;
        let ii = 0;
        let step = Math.pow(10, ii);
        let iteration = 0;
        let history = [];

        while (xL < xR && iteration < this.maxIteration) {
            fxL = evaluate(this.fx, { x: xL });
            
            // คำนวณ xR จาก xL + step แต่ไม่เกิน this.xr
            let currentXR = Math.min(xL + step, xR);
            fxR = evaluate(this.fx, { x: currentXR });

            // คำนวณ error (ข้ามรอบแรก)
            if (iteration !== 0) {
                e = Math.abs((xL - xOld) / xL);
            }

            history.push({
                iteration: iteration + 1,
                xL: xL,
                fxL: fxL,
                xR: currentXR,
                fxR: fxR,
                error: iteration === 0 ? null : e
            });

            xOld = xL;

            // ตรวจสอบว่ามี root ในช่วงนี้หรือไม่
            if (fxL * fxR < 0) {
                xR = xL + step;
                ii -= 1;
                step = Math.pow(10, ii);
            } else {
                xL += step;
            }

            iteration++;

            // หยุดถ้า step เล็กเกินไปหรือ |f(xL)| เข้าใกล้ 0
            if (Math.abs(step) < 1e-10 || Math.abs(fxL) < this.error) {
                break;
            }
        }

        return {
            iterations: iteration,
            root: xL,
            fx: evaluate(this.fx, { x: xL }),
            error: e,
            history: history
        };
    }
}

export default Graphical;