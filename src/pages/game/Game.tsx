import "./game.scss";

import GameUtils, { ROUNDS_COUNT } from "../../utils/game";
import { useDispatch, useSelector } from "../../store";
import Bonuses from "./bonuses/Bonuses";
import Button from "../../components/form/button/Button";
import DealModal from "./dealModal/DealModal";
import { type DiceHand } from "../../types/dice";
import DiceRoller from "../../components/diceRoller/DiceRoller";
import { GameActions } from "../../reducers/game";
import GameSelectors from "../../selectors/game";
import ResultDetail from "./resultDetail/ResultDetail";
import ResultModal from "./resultModal/ResultModal";
import Score from "./score/Score";
import Settings from "./settings/Settings";

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

	const onEnd = () => {
		dispatch(GameActions.goToEnd());
	};

	const onReset = () => {
		dispatch(GameActions.reset());
	};

	return (
		<div id="game">
			<Settings />
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
			/>
			<Bonuses />
			{step === "end" && <ResultDetail />}
			{step === "roll" ? (
				<Button
					label={GameUtils.isLastRound(currentRoundIndex) ? "Suivant" : "Main suivante"}
					disabled={!currentRound?.isValidated}
					onClick={onNextRound}
				/>
			) : (
				<Button label="Réinitialiser" disabled={step !== "end"} onClick={onReset} />
			)}
			<DealModal visible={step === "deal"} onYes={onDealYes} onNo={onDealNo} />
			<ResultModal visible={step === "result"} onClose={onEnd} />
		</div>
	);
};

export default Game;
