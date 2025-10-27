import Plot from "react-plotly.js";
import { evaluate } from "mathjs";

function FunctionGraph({ fx, root, xl, xr, history }) {
    if (!fx) return null;

    const xMin = xl ? parseFloat(xl) - 2 : (root ? root - 5 : -10);
    const xMax = xr ? parseFloat(xr) + 2 : (root ? root + 5 : 10);
    
    const dataX = [];
    const dataY = [];
    
    try {
        // สร้างข้อมูลกราฟ f(x)
        for (let x = xMin; x <= xMax; x += (xMax - xMin) / 200) {
            const y = evaluate(fx, { x });
            if (isFinite(y)) {
                dataX.push(x);
                dataY.push(y);
            }
        }

        // ดึงค่า x จาก history
        let iterX = [];
        if (history && history.length > 0) {
            if (history[0].xM !== undefined) {
                iterX = history.map(item => item.xM);
            } else if (history[0].xL !== undefined) {
                iterX = history.map(item => item.xL);
            }
        }

        const iterY = iterX.map(x => evaluate(fx, { x }));

        return (
            <div style={{ marginBottom: '20px' }}>
                <Plot
                    data={[
                        {
                            x: dataX,
                            y: dataY,
                            type: "scatter",
                            mode: "lines",
                            name: "f(x)",
                            line: { color: "blue", width: 2 },
                        },
                        {
                            x: iterX,
                            y: iterY,
                            type: "scatter",
                            mode: "markers",
                            name: "Iterations",
                            marker: { color: "red", size: 8 },
                            text: iterX.map((x, i) => 
                                `Iteration ${i + 1}: x = ${x.toFixed(6)}, f(x) = ${iterY[i].toFixed(6)}`
                            ),
                            hoverinfo: "text",
                        }
                    ]}
                    layout={{
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

export default FunctionGraph;