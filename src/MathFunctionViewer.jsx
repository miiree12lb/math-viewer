import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import { evaluate, range } from "mathjs";

export default function MathFunctionViewer() {
    const [expressions, setExpressions] = useState(["sin(x)"]);
    const [is3D, setIs3D] = useState(false);

    // Dynamic state for plots
    const [xRange, setXRange] = useState([-10, 10]);
    const [yRange, setYRange] = useState([-5, 5]); // For 3D
    const [plots2D, setPlots2D] = useState([]);
    const [plots3D, setPlots3D] = useState([]);

    const step2D = 0.1;
    const step3D = 0.2;

    // Compute 2D plots dynamically
    const compute2D = () => {
        const xValues = range(xRange[0], xRange[1], step2D).toArray();
        return expressions.map((expr) => ({
            x: xValues,
            y: xValues.map((x) => {
                try {
                    return evaluate(expr, { x });
                } catch {
                    return 0;
                }
            }),
            type: "scatter",
            mode: "lines",
            name: expr,
        }));
    };

    // Compute 3D plots dynamically
    const compute3D = () => {
        const xGrid = range(xRange[0], xRange[1], step3D).toArray();
        const yGrid = range(yRange[0], yRange[1], step3D).toArray();
        return expressions.map((expr) => ({
            z: xGrid.map((x) =>
                yGrid.map((y) => {
                    try {
                        return evaluate(expr, { x, y });
                    } catch {
                        return 0;
                    }
                })
            ),
            x: xGrid,
            y: yGrid,
            type: "surface",
            name: expr,
            colorscale: "Viridis",
            opacity: 0.8,
        }));
    };

    // Update plots whenever expressions or ranges change
    useEffect(() => {
        setPlots2D(compute2D());
        setPlots3D(compute3D());
    }, [expressions, xRange, yRange]);

    // Handle pan/zoom
    const handleRelayout = (event) => {
        if (!is3D) {
            const newX0 = event["xaxis.range[0]"] ?? xRange[0];
            const newX1 = event["xaxis.range[1]"] ?? xRange[1];
            setXRange([newX0, newX1]);
        } else {
            const newX0 = event["scene.xaxis.range[0]"] ?? xRange[0];
            const newX1 = event["scene.xaxis.range[1]"] ?? xRange[1];
            const newY0 = event["scene.yaxis.range[0]"] ?? yRange[0];
            const newY1 = event["scene.yaxis.range[1]"] ?? yRange[1];
            setXRange([newX0, newX1]);
            setYRange([newY0, newY1]);
        }
    };

    return (
        <div>
            <h2>📈 Math Function Viewer</h2>

            <button
                onClick={() => setIs3D(!is3D)}
                style={{ marginLeft: "10px", padding: "8px" }}
            >
                {is3D ? "Switch to 2D" : "Switch to 3D"}
            </button>

            <div className="functions-viewer">
                <div className="function-inputs">
                    {expressions.map((expr, i) => (
                        <div className="function-input" key={i}>
                            <input
                                type="text"
                                value={expr}
                                onChange={(e) => {
                                    const newExprs = [...expressions];
                                    newExprs[i] = e.target.value;
                                    setExpressions(newExprs);
                                }}
                            />
                            <button
                                onClick={() => {
                                    setExpressions(expressions.filter((_, idx) => idx !== i));
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
                            scene: { zaxis: { range: [-2, 2] } },
                            margin: { t: 20, l: 40, r: 10, b: 40 },
                            legend: { bgcolor: "rgba(0,0,0,0.3)", font: { color: "white" } },
                            paper_bgcolor: "#151515",
                            plot_bgcolor: "#151515",
                            font: { color: "white" },
                        }}
                        useResizeHandler={true}
                        style={{ width: "100%", height: "100%" }}
                        onRelayout={handleRelayout}
                    />
                </div>
            </div>
        </div>
    );
}
