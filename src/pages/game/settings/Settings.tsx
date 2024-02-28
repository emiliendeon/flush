import "./settings.scss";

import { SettingsActions, type SettingsStore } from "../../../reducers/settings";
import { useDispatch, useSelector } from "../../../store";

import ToggleInput from "../../../components/form/toggleInput/ToggleInput";

const Settings = () => {
	const settings = useSelector((state) => state.settings);

	const dispatch = useDispatch();

	const onChangeSetting = <T extends keyof SettingsStore>(
		settingId: T,
		value: SettingsStore[T]
	) => {
		dispatch(SettingsActions.set({ settingId, value }));
	};

	return (
		<div className="settings">
			<ToggleInput
				label="Afficher les instructions"
				value={settings.showInstructions}
				onChange={(value) => {
					onChangeSetting("showInstructions", value);
				}}
			/>
		</div>
	);
};

export default Settings;
