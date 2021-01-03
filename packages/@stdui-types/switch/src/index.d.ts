import {ChangeEvent, ReactNode} from "react";

export interface SwitchProps {
	/**
	 * The content to render as the Switch's label.
	 */
	children?: ReactNode;
	/**
	 * @description Whether the Switch is selected.
	 * @default false
	 */
	isSelected?: boolean;
	/**
	 * This fires when the Switch is clicked.
	 */
	onChange?:((event: ChangeEvent<HTMLInputElement>) => void) | undefined
}
