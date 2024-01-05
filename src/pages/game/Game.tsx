import "./game.scss";

import NumberUtils, { NUMBER_PLACEHOLDER } from "../../utils/number";
import { useDispatch, useSelector } from "../../store";
import Button from "../../components/form/button/Button";
import { type DiceHand } from "../../types/dice";
import DiceRoller from "../../components/diceRoller/DiceRoller";
import { GameActions } from "../../reducers/game";
import GameSelectors from "../../selectors/game";

const Game = () => {
	const { hand, isValidated } = useSelector((state) => state.game);
	const score = useSelector(GameSelectors.score);

	const dispatch = useDispatch();

	const onChange = (hand: DiceHand) => {
		dispatch(GameActions.setHand(hand));
	};

	const onValidate = () => {
		dispatch(GameActions.setIsValidated(true));
	};

	const onReset = () => {
		dispatch(GameActions.resetHand());
		dispatch(GameActions.setIsValidated(false));
	};

	return (
		<div id="game">
			<div className="score">
				{isValidated ? NumberUtils.format(score) : NUMBER_PLACEHOLDER}
			</div>
			<DiceRoller
				diceCount={5}
				maxRerollsCount={1}
				disabled={isValidated}
				value={hand}
				onChange={onChange}
				onValidate={onValidate}
			/>
			<Button label="Réinitialiser" disabled={!isValidated} onClick={onReset} />
		</div>
	);
};

export default Game;
