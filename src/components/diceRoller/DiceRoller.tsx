import "./diceRoller.scss";

import { type DiceHand, type DiceValue } from "../../types/dice";
import { useEffect, useMemo, useState } from "react";
import Button from "../form/button/Button";
import Dice from "../dice/Dice";
import GameSelectors from "../../selectors/game";
import GameUtils from "../../utils/game";
import Instruction from "../instruction/Instruction";
import NumberUtils from "../../utils/number";
import { useSelector } from "../../store";

type DiceRollerProps = {
	diceCount: number;
	maxRerollsCount?: number;
	disabled?: boolean;
	value?: DiceHand;
	onChange: (hand: DiceHand) => void;
	onValidate: () => void;
};

type DiceState = {
	value?: DiceValue;
	locked: boolean;
};

const DiceRoller = ({
	diceCount,
	maxRerollsCount,
	disabled,
	value,
	onChange,
	onValidate,
}: DiceRollerProps) => {
	const { step, currentRoundIndex } = useSelector((state) => state.game);
	const currentRound = useSelector(GameSelectors.currentRound);

	const [diceStates, setDiceStates] = useState<DiceState[]>(
		Array.from({ length: diceCount }, () => ({ locked: false }))
	);
	const [rerollsCount, setRerollsCount] = useState(-1);

	const diceStatesComputed = useMemo(() => {
		if (!value) {
			return diceStates;
		}
		return diceStates.map((diceState, i) => ({ ...diceState, value: value[i] }));
	}, [diceStates, value]);

	const remainingRerollsCount = useMemo(() => {
		if (rerollsCount === -1) {
			return undefined;
		}
		if (maxRerollsCount === undefined) {
			return Infinity;
		}
		return maxRerollsCount - rerollsCount;
	}, [maxRerollsCount, rerollsCount]);

	const isRerollingOver = useMemo(() => {
		return remainingRerollsCount !== undefined && remainingRerollsCount <= 0;
	}, [remainingRerollsCount]);

	const isLastRound = useMemo(() => {
		return GameUtils.isLastRound(currentRoundIndex);
	}, [currentRoundIndex]);

	useEffect(() => {
		if (isRerollingOver) {
			onValidate();
		}
	}, [isRerollingOver]);

	useEffect(() => {
		if (currentRoundIndex !== undefined) {
			setDiceStates((prev) => prev.map((diceState) => ({ ...diceState, locked: false })));
			setRerollsCount(-1);
		}
	}, [currentRoundIndex]);

	const onDiceClick = (diceIndex: number) => {
		if (rerollsCount >= 0) {
			setDiceStates((prev) =>
				prev.map((diceState, index) =>
					index === diceIndex ? { ...diceState, locked: !diceState.locked } : diceState
				)
			);
		}
	};

	const onRoll = () => {
		onChange(
			diceStatesComputed.map(
				(diceState) =>
					(diceState.locked
						? diceState.value
						: NumberUtils.safeFloor(Math.random() * 6)) as DiceValue
			)
		);
		setRerollsCount((prev) => prev + 1);
	};

	return (
		<div className="dice-roller">
			<Instruction visible={step === "roll" && !currentRound?.hand}>
				Cliquez sur <strong>Lancer</strong> pour découvrir votre main{" "}
				<strong>{currentRoundIndex + 1}</strong>.
			</Instruction>
			<Instruction
				visible={step === "roll" && currentRound?.hand && !currentRound?.isValidated}
			>
				Cliquez sur les dés que vous souhaitez conserver pour les verrouiller. Vous pouvez
				encore relancer <strong>{NumberUtils.format(remainingRerollsCount)}</strong> fois
				une partie des dés.
			</Instruction>
			<Instruction visible={step === "roll" && currentRound?.isValidated && !isLastRound}>
				Cliquez sur <strong>Main suivante</strong> pour passer à la main{" "}
				<strong>{currentRoundIndex + 2}</strong>.
			</Instruction>
			<Instruction visible={step === "roll" && currentRound?.isValidated && isLastRound}>
				Cliquez sur <strong>Suivant</strong> pour passer à l&apos;étape du compromis.
			</Instruction>
			<Instruction visible={step === "end"}>
				Cliquez sur <strong>Réinitialiser</strong> pour commencer une nouvelle partie.
			</Instruction>
			<div className="dice-row">
				{Array.from({ length: diceCount }, (_v, k) => (
					<Dice
						key={k}
						value={diceStatesComputed[k].value}
						locked={diceStatesComputed[k].locked || disabled || isRerollingOver}
						disabled={disabled || isRerollingOver}
						onClick={() => {
							onDiceClick(k);
						}}
					/>
				))}
			</div>
			<div className="actions">
				<Button
					label={rerollsCount === -1 ? "Lancer" : "Relancer"}
					disabled={disabled || isRerollingOver}
					onClick={onRoll}
				/>
				<Button
					label="Valider"
					disabled={disabled || rerollsCount === -1}
					onClick={onValidate}
				/>
			</div>
		</div>
	);
};

export default DiceRoller;
