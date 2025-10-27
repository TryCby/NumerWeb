import Plot from "react-plotly.js";
import { evaluate } from "mathjs";

function OnePointGraph({ fx, history }) {
    if (!fx || !history || history.length === 0) return null;

    try {
        const xs = history.map(it => it.xi).filter(v => isFinite(v));
        let minX = Math.min(...xs, -5) - 1;
        let maxX = Math.max(...xs, 5) + 1;
        
        if (minX === maxX) { minX -= 1; maxX += 1; }

        // สร้างข้อมูลกราฟ
        const dataX = [], dataY = [];
        for (let x = minX; x <= maxX; x += (maxX - minX) / 200) {
            const y = evaluate(fx, { x });
            if (isFinite(y)) { dataX.push(x); dataY.push(y); }
        }

        // สร้าง staircase
        const stairX = [], stairY = [];
        history.forEach((item, i) => {
            const xOld = i === 0 ? item.xi : history[i - 1].xi;
            stairX.push(xOld, xOld, item.xi);
            stairY.push(xOld, item.xi, item.xi);
        });

        return (
            <div style={{ marginBottom: '20px' }}>
                <Plot
                    data={[
                        { x: dataX, y: dataY, type: "scatter", mode: "lines", name: "g(x)", line: { color: "green", width: 2 } },
                        { x: dataX, y: dataX, type: "scatter", mode: "lines", name: "y = x", line: { color: "blue", width: 2 } },
                        { x: stairX, y: stairY, type: "scatter", mode: "lines", name: "Iterations", line: { color: "red", width: 2 } },
                    ]}
                    layout={{
                        title: "One-Point Iteration",
                        xaxis: { title: "X", zeroline: true, range: [minX, maxX] },
                        yaxis: { title: "Y", zeroline: true, range: [minX, maxX], scaleanchor: "x", scaleratio: 1 },
                        margin: { t: 50, l: 50, r: 30, b: 50 },
                        dragmode: "pan",
                        height: 450,
                    }}
                    style={{ width: "100%", height: "450px" }}
                    config={{ responsive: true, scrollZoom: true, displayModeBar: true }}
                />
            </div>
        );
    } catch (error) {
        return <div style={{ marginBottom: '20px' }}><p style={{ color: 'red' }}>Error: {error.message}</p></div>;
    }
}

export default OnePointGraph;