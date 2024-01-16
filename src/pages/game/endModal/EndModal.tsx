import "./endModal.scss";

import Modal, { type ChildModalProps } from "../../../components/modal/Modal";
import Button from "../../../components/form/button/Button";
import GameSelectors from "../../../selectors/game";
import NumberUtils from "../../../utils/number";
import { useSelector } from "../../../store";

const EndModal = ({ visible, onClose }: ChildModalProps) => {
	const finalScore = useSelector(GameSelectors.finalScore);

	return (
		<Modal
			className="end-modal"
			title="Votre score final"
			visible={visible}
			dismissable
			onClose={onClose}
		>
			<div className="final-score">{NumberUtils.format(finalScore)}</div>
			<Button label="Terminer" onClick={onClose} />
		</Modal>
	);
};

export default EndModal;
