import "./app.scss";

import DiceRoller from "./components/diceRoller/DiceRoller";

const App = () => {
	return <DiceRoller diceCount={5} />;
};

export default App;
