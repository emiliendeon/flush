import "./dealModal.scss";

import Modal, { type ChildModalProps } from "../../../components/modal/Modal";
import Button from "../../../components/form/button/Button";
import GameSelectors from "../../../selectors/game";
import NumberUtils from "../../../utils/number";
import { useSelector } from "../../../store";

type DealModalProps = ChildModalProps & {
	onYes: () => void;
	onNo: () => void;
};

const DealModal = ({ visible, onYes, onNo }: DealModalProps) => {
	const deal = useSelector(GameSelectors.deal);

	if (!deal) {
		return null;
	}

	return (
		<Modal className="deal-modal" title="Accepter le compromis ?" visible={visible}>
			<div className="actions">
				<Button label="Oui" description={NumberUtils.format(deal.yes)} onClick={onYes} />
				<Button
					label="Non"
					description={`${NumberUtils.format(deal.no[0])} ou ${NumberUtils.format(
						deal.no[1]
					)}`}
					onClick={onNo}
				/>
			</div>
		</Modal>
	);
};

export default DealModal;
