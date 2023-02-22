import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	RichText,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	TextControl,
	SelectControl,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import Select from 'react-select';
const { Fragment } = wp.element;

// editor style
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const { postFilter, numberOfPosts, url, categories, posts } = attributes;

	const allPosts = useSelect((select) => {
		return select('core').getEntityRecords('postType', 'post', {
			per_page: numberOfPosts,
			_embed: true,
		});
	});
	const latestPosts = useSelect((select) => {
		return select('core').getEntityRecords('postType', 'post', {
			per_page: numberOfPosts,
			_embed: true,
		});
	});
	const allCategories = useSelect((select) => {
		return select('core').getEntityRecords('taxonomy', 'category', {
			per_page: -1,
		});
	});

	const allCats = categories && categories.map((cat) => cat.value);

	const selectedPosts = useSelect((select) => {
		return select('core').getEntityRecords('postType', 'post', {
			per_page: -1,
			categories: allCats,
		});
	});

	const selectIndividualPosts = useSelect((select) => {
		return select('core').getEntityRecords('postType', 'post', {
			per_page: -1,
			include: posts && posts.map((post) => post.value),
		});
	});
	//console.log(posts);
	return (
		<Fragment>
			<InspectorControls>
				<PanelBody
					title={__('Settings', 'boilerplate')}
					initialOpen={true}
				>
					<p className="custom__editor__label">
						{__('Number of Posts', 'boilerplate')}
					</p>
					<RangeControl
						label="Number of Posts"
						value={numberOfPosts}
						onChange={(value) =>
							setAttributes({
								numberOfPosts: value,
							})
						}
						min={1}
						max={100}
					/>
					<SelectControl
						label="Post Filter"
						value={postFilter}
						options={[
							{ label: 'Category', value: 'category' },
							{ label: 'Individual', value: 'individual' },
							{ label: 'Latest', value: 'latest' },
						]}
						onChange={(value) =>
							setAttributes({
								postFilter: value,
							})
						}
					/>
					{postFilter === 'category' && (
						<Select
							isMulti
							value={
								categories &&
								categories.map((cat) => {
									return {
										label: cat.label,
										value: cat.value,
									};
								})
							}
							options={
								allCategories &&
								allCategories.map((cat) => {
									return {
										label: cat.name,
										value: cat.id,
									};
								})
							}
							onChange={(value) =>
								setAttributes({
									categories: value,
								})
							}
						/>
					)}
					{postFilter === 'individual' && (
						<Select
							isMulti
							value={
								posts &&
								posts.map((post) => {
									return {
										label: post.label,
										value: post.value,
									};
								})
							}
							options={
								allPosts &&
								allPosts.map((post) => {
									return {
										label: post.title.rendered,
										value: post.id,
									};
								})
							}
							onChange={(value) =>
								setAttributes({
									posts: value,
								})
							}
						/>
					)}
				</PanelBody>
			</InspectorControls>

			<div {...useBlockProps()}>
				<div className="post-content">
					<div className="right">
						{postFilter === 'category' &&
							(selectedPosts ? (
								selectedPosts.map((post, index) => {
									return (
										<div key={index}>
											<div className="post">
												{post.title.rendered}
											</div>
											<div className="categoris">
												{allCategories &&
													allCategories.map(
														(cat, i) => {
															return (
																<div
																	key={i}
																	style={{
																		color: 'green',
																	}}
																>
																	{post.categories.includes(
																		cat.id
																	) &&
																		cat.name}
																</div>
															);
														}
													)}
											</div>
										</div>
									);
								})
							) : (
								<p>Loading Category Posts . . .</p>
							))}
						{postFilter === 'individual' &&
							(selectIndividualPosts ? (
								selectIndividualPosts.map((post, index) => {
									return (
										<div key={index}>
											<div className="post">
												{post.title.rendered}
											</div>
										</div>
									);
								})
							) : (
								<p>Loading Individual Posts . . .</p>
							))}
						{postFilter === 'latest' &&
							(latestPosts ? (
								latestPosts.map((post, index) => {
									return (
										<div key={index}>
											<div className="post">
												Latest Posts
												{post.title.rendered}
											</div>
										</div>
									);
								})
							) : (
								<p>Loading Latest Posts . . .</p>
							))}
					</div>
				</div>
			</div>
		</Fragment>
	);
}