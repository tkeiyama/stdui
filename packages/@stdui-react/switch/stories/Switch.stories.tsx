import {ComponentType} from 'react'
import {Meta} from '@storybook/react/types-6-0'

import {Switch as SwitchComponent} from '../src'

export default {
	title: '@stdui-react/Swtich',
	component: SwitchComponent,
} as Meta

// rome-ignore lint/jsx/noPropSpreading
export const Switch:ComponentType<typeof SwitchComponent> = (props) => <SwitchComponent {...props} />

