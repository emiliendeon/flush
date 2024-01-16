import "./game.scss";

import { useDispatch, useSelector } from "../../store";
import Button from "../../components/form/button/Button";
import DealModal from "./dealModal/DealModal";
import { type DiceHand } from "../../types/dice";
import DiceRoller from "../../components/diceRoller/DiceRoller";
import EndModal from "./endModal/EndModal";
import { GameActions } from "../../reducers/game";
import GameSelectors from "../../selectors/game";
import { ROUNDS_COUNT } from "../../utils/game";
import Score from "./score/Score";

const Game = () => {
	const { step, currentRoundIndex } = useSelector((state) => state.game);
	const currentRound = useSelector(GameSelectors.currentRound);

	const dispatch = useDispatch();

	const onChangeCurrentRound = (hand: DiceHand) => {
		dispatch(GameActions.setCurrentRoundHand(hand));
	};

	const onValidateCurrentRound = () => {
		dispatch(GameActions.validateCurrentRound());
	};

	const onNextRound = () => {
		dispatch(GameActions.goToNextRound());
	};

	const onDealYes = () => {
		dispatch(GameActions.acceptDeal());
	};

	const onDealNo = () => {
		dispatch(GameActions.rejectDeal());
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
				onChange={onChangeCurrentRound}
				onValidate={onValidateCurrentRound}
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
					onClick={onNextRound}
				/>
			)}
			<DealModal visible={step === "deal"} onYes={onDealYes} onNo={onDealNo} />
			<EndModal visible={step === "end"} onClose={onReset} />
		</div>
	);
};

export default Game;
