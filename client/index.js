// import React from "react";
// import { render } from "react-dom";
// import App from "./src/App.jsx";

// render(<App />, document.getElementById("root"));

import React from "react";
import { createRoot, render } from "react-dom/client";
import App from "./src/App.js";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
