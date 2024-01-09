import "./game.scss";

import { useDispatch, useSelector } from "../../store";
import Button from "../../components/form/button/Button";
import { type DiceHand } from "../../types/dice";
import DiceRoller from "../../components/diceRoller/DiceRoller";
import { GameActions } from "../../reducers/game";
import GameSelectors from "../../selectors/game";
import { ROUNDS_COUNT } from "../../utils/game";
import Score from "./score/Score";

const Game = () => {
	const { currentRoundIndex } = useSelector((state) => state.game);
	const currentRound = useSelector(GameSelectors.currentRound);

	const dispatch = useDispatch();

	const onChange = (hand: DiceHand) => {
		dispatch(GameActions.setCurrentRoundHand(hand));
	};

	const onValidate = () => {
		dispatch(GameActions.validateCurrentRound());
	};

	const onNext = () => {
		dispatch(GameActions.goToNextRound());
	};

	const onReset = () => {
		dispatch(GameActions.reset());
	};

	return (
		<div id="game">
			<div className="scores">
				{Array.from({ length: ROUNDS_COUNT }, (_v, k) => (
					<Score key={k} roundIndex={k} />
				))}
			</div>
			<DiceRoller
				diceCount={5}
				maxRerollsCount={1}
				disabled={currentRound?.isValidated}
				value={currentRound?.hand}
				onChange={onChange}
				onValidate={onValidate}
				resetKey={currentRoundIndex}
			/>
			{currentRoundIndex >= ROUNDS_COUNT - 1 ? (
				<Button
					label="Réinitialiser"
					disabled={!currentRound?.isValidated}
					onClick={onReset}
				/>
			) : (
				<Button
					label="Main suivante"
					disabled={!currentRound?.isValidated}
					onClick={onNext}
				/>
			)}
		</div>
	);
};

export default Game;
