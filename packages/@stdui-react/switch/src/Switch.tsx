import {ReactElement} from "react";
import styles from "@stdui-styles/switch/styles.module.css";
import {SwitchProps} from "@stdui-types/switch";

export function Switch(
	{children, isSelected = false,onChange}: SwitchProps,
): ReactElement {
	return <label className={styles.switch}>
		<input checked={isSelected} className={styles.input} onChange={onChange} type="checkbox" />
		<span className={styles.slider} />
		{children &&
		<span className={styles.label}>
			{children}
		</span>}
	</label>;
}
