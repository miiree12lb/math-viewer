import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Footer from "./Footer";
import "./css/root.css"
import MathFunctionViewer from "./MathFunctionViewer";

export default function Root() {
    return (<>
        <BrowserRouter>
            <div>
                <MathFunctionViewer />
            </div>

            <div id="footer">
                <Footer />
            </div>
        </BrowserRouter>
        
    </>);
}

const rootElement = document.getElementById("root");
if (rootElement)
    createRoot(rootElement).render(<Root />);