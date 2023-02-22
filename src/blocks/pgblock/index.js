import { registerBlockType } from '@wordpress/blocks';
import './style.scss';

import metadata from './block.json';

/**
 * Internal dependencies
 */
import Edit from './edit';
import Save from './save';

/**
 * Block Registration
 */

registerBlockType(metadata, {
	icon: {
		src: (
			<svg width="24" height="24" viewBox="0 0 24 24">
				<path d="M2 5v-5h20v5h-20zm20 2v17h-20v-17h20zm-4 11h-12v1h12v-1zm0-3h-12v1h12v-1zm0-3h-12v1h12v-1z" />
			</svg>
		),
		foreground: '#00a98f',
	},
	edit: Edit,
	save: Save,
});
