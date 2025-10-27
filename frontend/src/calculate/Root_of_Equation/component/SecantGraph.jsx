import Plot from "react-plotly.js";
import { evaluate } from "mathjs";

function SecantGraph({ fx, history }) {
    if (!fx || !history || history.length === 0) return null;

    try {
        const xs = history.flatMap(it => [it.x0, it.x1, it.x2]).filter(v => isFinite(v));
        let minX = Math.min(...xs) - 1;
        let maxX = Math.max(...xs) + 1;
        
        if (!isFinite(minX) || !isFinite(maxX)) {
            minX = -5;
            maxX = 5;
        }

        // สร้างเส้น f(x)
        const dataX = [];
        const dataY = [];
        for (let x = minX; x <= maxX; x += (maxX - minX) / 200) {
            dataX.push(x);
            dataY.push(evaluate(fx, { x }));
        }

        const traces = [
            {
                x: dataX,
                y: dataY,
                type: "scatter",
                mode: "lines",
                name: "f(x)",
                line: { color: "blue", width: 2 },
            },
        ];

        // จุดและเส้น secant
        const ptsX = [];
        const ptsY = [];
        
        history.forEach((item, i) => {
            const fx0 = evaluate(fx, { x: item.x0 });
            const fx1 = evaluate(fx, { x: item.x1 });
            
            // เส้น secant
            traces.push({
                x: [item.x0, item.x1],
                y: [fx0, fx1],
                type: "scatter",
                mode: "lines",
                name: `Secant ${i + 1}`,
                line: { color: "red", width: 2 },
                showlegend: false,
            });
            
            ptsX.push(item.x0, item.x1);
            ptsY.push(fx0, fx1);
        });

        // จุด f(x0), f(x1)
        traces.push({
            x: ptsX,
            y: ptsY,
            type: "scatter",
            mode: "markers",
            name: "Points",
            marker: { color: "black", size: 6 },
        });

        // เส้น y = 0
        traces.push({
            x: [minX, maxX],
            y: [0, 0],
            type: "scatter",
            mode: "lines",
            name: "y = 0",
            line: { color: "#777", width: 1, dash: "dash" },
            showlegend: false,
        });

        return (
            <div style={{ marginBottom: '20px' }}>
                <Plot
                    data={traces}
                    layout={{
                        title: "Secant Method",
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

export default SecantGraph;