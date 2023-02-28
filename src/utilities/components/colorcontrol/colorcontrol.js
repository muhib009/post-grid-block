import { ColorIndicator, Popover, ColorPicker } from '@wordpress/components';

import { useState } from '@wordpress/element';

import { __ } from '@wordpress/i18n';

//import style
import './colorcontrol.scss';

const ColorControl = ({
	label,
	colorName,
	colorValue,
	setAttributes,
	disableAlpha,
}) => {
	const [visible, setVisible] = useState(false);

	return (
		<div className="etb-color-wrapper">
			<div className="color-header">
				<p className="etb-label no-margin">{label}</p>
				<button
					className="color-indicator"
					onClick={() => setVisible(true)}
				>
					<ColorIndicator colorValue={colorValue} />
				</button>
			</div>

			{visible && (
				<Popover
					onFocusOutside={() => setVisible(false)}
					position="bottom left"
				>
					<div className="color-picker">
						<ColorPicker
							color={colorValue}
							onChangeComplete={
								(value) =>
									setAttributes({ [colorName]: value.hex }) // colorName= containerBg
							}
							disableAlpha={disableAlpha}
						/>
					</div>
					{/* Button to clear color */}
					<button
						className="etb-clear-btn"
						onClick={() => setAttributes({ [colorName]: '' })}
					>
						{__('Clear', 'easy-testimonial-blocks')}
					</button>
				</Popover>
			)}
		</div>
	);
};

export default ColorControl;
