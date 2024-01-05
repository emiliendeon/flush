import "./app.scss";

import Game from "./pages/game/Game";
import { Provider } from "react-redux";
import store from "./store";

const App = () => {
	return (
		<Provider store={store}>
			<Game />
		</Provider>
	);
};

export default App;
