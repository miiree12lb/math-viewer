import React, { useState } from "react";
import Plot from "react-plotly.js";
import { evaluate, range } from "mathjs";

export default function MathFunctionViewer() {
    const [expressions, setExpressions] = useState(["sin(x)"]);
    const [is3D, setIs3D] = useState(false);

    const xValues = range(-10, 10, 0.1).toArray();
    const grid = range(-5, 5, 0.2).toArray();

    const plots2D = expressions.map((expr) => {
        const y = xValues.map((x) => {
            try {
                return evaluate(expr, {x});
            }
            catch {
                return 0;
            }
        });
        return {
            x: xValues,
            y,
            type: "scatter",
            mode: "lines",
            name: expr
        }
    });

    const plots3D = expressions.map((expr) => {
        const z = grid.map((x) => 
            grid.map((y) => {
                try {
                    return evaluate(expr, {x, y});
                }
                catch {
                    return 0;
                }
            })
        );
        return {
            z,
            x: grid,
            y: grid,
            type: "surface",
            name: expr,
            colorscale: "virdis",
            opacity: 0.8
        }
    })

   return (
        <div>
            <h2>📈 Math Function Viewer</h2>

            <button onClick={() => setIs3D(!is3D)} style={{ marginLeft: "10px", padding: "8px" }}>
                {is3D ? "Switch to 2D" : "Switch to 3D"}
            </button>

            <div className="functions-viewer">
                <div className="function-inputs">
                    {expressions.map((expr, i) => (
                        <div className="function-input">
                            <input
                                type="text"
                                value={expr}
                                onChange={(e) => {
                                    const newExprs = [...expressions]
                                    newExprs[i] = e.target.value;
                                    setExpressions(newExprs);
                                }}
                            />

                            <button
                                onClick={() => {
                                    const newExprs = expressions.filter((_, idx) => idx !== i);
                                    setExpressions(newExprs);
                                }}
                            >
                                ❌
                            </button>
                        </div>
                    ))}
                    <button
                        id="add-function"
                        onClick={() => setExpressions([...expressions, ""])}
                    >
                        ➕ Add Function
                    </button>
                </div>


                <div id="plot">
                    <Plot
                        data={is3D ? plots3D : plots2D}
                        layout={{
                            autosize: true,
                            scene: {zaxis : {range: [-2, 2]}},
                            margin: {t: 20, l: 40, r: 10, b: 40},
                            legend: { bgcolor: "rgba(0,0,0,0.3)", font: { color: "white" } },
                            paper_bgcolor: "#151515",
                            plot_bgcolor: "#151515",
                            font: { color: "white" },
                        }}
                        useResizeHandler={true}
                        style={{ width: "100%", height: "100%" }}
                    />
                </div>
            </div>
        </div>
    );
}