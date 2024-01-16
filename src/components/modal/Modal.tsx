import "./modal.scss";

import IconButton from "../form/iconButton/IconButton";

import { type PropsWithChildren } from "react";
import { type PropsWithClassName } from "../../types/react";
import clsx from "clsx";

export type ChildModalProps = {
	visible?: boolean;
	onClose?: () => void;
};

type ModalProps = PropsWithChildren<
	PropsWithClassName<
		{
			title?: string;
			dismissable?: boolean;
		} & ChildModalProps
	>
>;

const Modal = ({ className, title, visible, dismissable, onClose, children }: ModalProps) => {
	if (!visible) {
		return null;
	}

	const onWrapperClick = () => {
		if (dismissable) {
			onClose?.();
		}
	};

	const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
		event.stopPropagation();
	};

	return (
		<div
			className="modal-wrapper"
			role="button"
			aria-label="Fermer"
			aria-disabled={!dismissable}
			onClick={onWrapperClick}
		>
			<div className={clsx("modal", className)} onClick={onClick}>
				{title && <div className="title">{title}</div>}
				{children}
				{dismissable && <IconButton icon="close" label="Fermer" onClick={onClose} />}
			</div>
		</div>
	);
};

export default Modal;
