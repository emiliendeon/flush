import HandComputers from "../computers/hand";
import { type Store } from "../store";
import { createSelector } from "@reduxjs/toolkit";

export const getHand = (state: Store) => state.game.hand;

const GameSelectors = {
	score: createSelector([getHand], (hand) => {
		return hand ? HandComputers.score(hand) : null;
	}),
};

export default GameSelectors;
