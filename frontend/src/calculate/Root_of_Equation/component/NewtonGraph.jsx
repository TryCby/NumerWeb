import Plot from "react-plotly.js";
import { evaluate, derivative } from "mathjs";

function NewtonGraph({ fx, history }) {
    if (!fx || !history || history.length === 0) return null;

    try {
        const xs = history.map(it => it.xi).filter(v => isFinite(v));
        let minX = Math.min(...xs) - 1;
        let maxX = Math.max(...xs) + 1;
        
        if (!isFinite(minX) || !isFinite(maxX)) {
            minX = -5;
            maxX = 5;
        }

        // สร้างเส้น f(x)
        const funcX = [];
        const funcY = [];
        for (let x = minX; x <= maxX; x += (maxX - minX) / 200) {
            funcX.push(x);
            funcY.push(evaluate(fx, { x }));
        }

        const traces = [
            {
                x: funcX,
                y: funcY,
                type: "scatter",
                mode: "lines",
                name: "f(x)",
                line: { color: "blue", width: 2 },
            },
            {
                x: history.map(it => it.xi),
                y: history.map(it => it.fx),
                type: "scatter",
                mode: "markers",
                name: "f(xi)",
                marker: { color: "black", size: 7 },
            },
        ];

        // เส้นแทนเจนต์
        for (let i = 0; i < history.length - 1; i++) {
            const xi = history[i].xi;
            const fxi = history[i].fx;
            const xNext = history[i + 1].xi;
            
            traces.push({
                x: [xi, xNext],
                y: [fxi, 0],
                type: "scatter",
                mode: "lines",
                name: `Tangent ${i + 1}`,
                line: { color: "red", width: 2 },
                showlegend: false,
            });
        }

        return (
            <div style={{ marginBottom: '20px' }}>
                <Plot
                    data={traces}
                    layout={{
                        title: "Newton-Raphson Method",
                        xaxis: { title: "X", zeroline: true },
                        yaxis: { title: "Y", zeroline: true },
                        margin: { t: 50, l: 50, r: 30, b: 50 },
                        dragmode: "pan",
                    }}
                    style={{ width: "100%", height: "100%" }}
                    config={{
                        responsive: true,
                        scrollZoom: true,
                    }}
                />
            </div>
        );
    } catch (error) {
        return (
            <div style={{ marginBottom: '20px' }}>
                <p style={{ color: 'red' }}>Error: {error.message}</p>
            </div>
        );
    }
}

export default NewtonGraph;