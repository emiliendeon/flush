import "./resultModal.scss";

import Modal, { type ChildModalProps } from "../../../components/modal/Modal";
import Button from "../../../components/form/button/Button";
import GameSelectors from "../../../selectors/game";
import NumberUtils from "../../../utils/number";
import { useSelector } from "../../../store";

const ResultModal = ({ visible, onClose }: ChildModalProps) => {
	const { finalScore } = useSelector(GameSelectors.result);

	return (
		<Modal
			className="result-modal"
			title="Votre score final"
			visible={visible}
			dismissable
			onClose={onClose}
		>
			<div className="final-score">{NumberUtils.format(finalScore)}</div>
			<Button label="Voir le détail" onClick={onClose} />
		</Modal>
	);
};

export default ResultModal;
