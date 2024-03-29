import "./index.scss";

import App from "./App.tsx";
import React from "react";
import ReactDOM from "react-dom/client";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
