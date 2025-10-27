import React, { useState } from "react";
import Plot from "react-plotly.js";
import { evaluate, range } from "mathjs";

export default function MathFunctionViewer() {
    const [expression, setExpression] = useState("sin(x)");
    const [is3D, setIs3D] = useState(false);

    const xValues = range(-10, 10, 0.1).toArray();

    const yValues = xValues.map(x => {
        try {
            return evaluate(expression, { x });
        }
        catch {
            return 0;
        }
    })

    const grid = range(-5, 5, 0.2).toArray();
    const zValues = grid.map(x =>
        grid.map(y => {
            try {
                return evaluate(expression, { x, y });
            }
            catch {
                return 0;
            }
        })
    );

   return (
        <div style={{ width: "90%", margin: "auto", paddingTop: "1rem" }}>
            <h2>📈 Math Function Viewer</h2>
            <div style={{ marginBottom: "1rem" }}>
                <input
                    type="text"
                    value={expression}
                    onChange={(e) => setExpression(e.target.value)}
                    placeholder="Enter expression (e.g., sin(x), sin(x)*cos(y))"
                    style={{ padding: "8px", width: "300px" }}
                />
                <button onClick={() => setIs3D(!is3D)} style={{ marginLeft: "10px", padding: "8px" }}>
                    {is3D ? "Switch to 2D" : "Switch to 3D"}
                </button>
            </div>

            {is3D ? (
                <Plot
                    data={[
                        {
                            z: zValues,
                            x: grid,
                            y: grid,
                            type: "surface",
                            colorscale: "Viridis",
                        },
                    ]}
                    layout={{
                        autosize: true,
                        scene: { zaxis: { range: [-2, 2] } },
                        margin: { t: 20, l: 0, r: 0, b: 0 },
                    }}
                    style={{ width: "100%", height: "80vh" }}
                />
            ) : (
                <Plot
                    data={[
                        {
                            x: xValues,
                            y: yValues,
                            type: "scatter",
                            mode: "lines",
                            line: { color: "#94692D", width: 2 },
                        },
                    ]}
                    layout={{
                        autosize: true,
                        margin: { t: 20, l: 40, r: 10, b: 40 },
                    }}
                    style={{ width: "100%", height: "80vh" }}
                />
            )}
        </div>
    );
}