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
	TabPanel,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import Select from 'react-select';
const { Fragment, RawHTML } = wp.element;

// editor style
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const { postFilter, numberOfPosts, url, categories, posts } = attributes;

	const allPosts = useSelect((select) => {
		return select('core').getEntityRecords('postType', 'post', {
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
			per_page: numberOfPosts,
			_embed: true,
			categories: allCats,
		});
	});

	const allPostLists = posts && posts.map((post) => post.value);

	const selectIndividualPosts = useSelect((select) => {
		return select('core').getEntityRecords('postType', 'post', {
			include: allPostLists,
			_embed: true,
		});
	});

	return (
		<Fragment>
			<InspectorControls>
				<TabPanel
					className="post-grid-panel"
					activeClass="active-tab"
					tabs={[
						{
							name: 'pgb_settings',
							title: 'Settings',
							className: 'pgb-settings pgb-general',
						},
						{
							name: 'pgb_advanced',
							title: 'Advanced',
							className: 'pgb-advanced pgb-general',
						},
					]}
				>
					{(tab) => {
						if (tab.name === 'pgb_settings') {
							return (
								<div>
									<PanelBody
										title={__(
											'Container Settings',
											'post-grid-block'
										)}
										initialOpen={true}
									></PanelBody>
									<PanelBody
										title={__(
											'Posts Filter',
											'post-grid-block'
										)}
										initialOpen={true}
									>
										{postFilter !== 'individual' && (
											<>
												<p className="custom__editor__label">
													{__(
														'Number of Posts',
														'post-grid-block'
													)}
												</p>
												<RangeControl
													label="Number of Posts"
													value={numberOfPosts}
													onChange={(value) =>
														setAttributes({
															numberOfPosts:
																value,
														})
													}
													min={1}
													max={100}
												/>
											</>
										)}
										<SelectControl
											label="Select Post Type"
											value={postFilter}
											options={[
												{
													label: 'Category',
													value: 'category',
												},
												{
													label: 'Individual',
													value: 'individual',
												},
												{
													label: 'Latest',
													value: 'latest',
												},
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
															label: post.title
																.rendered,
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
								</div>
							);
						} else if (tab.name === 'pgb_advanced') {
							return 'Hello Advanced';
						}
					}}
				</TabPanel>
			</InspectorControls>

			<div {...useBlockProps()}>
				<div className="post-grid-main">
					{postFilter === 'category' &&
						(selectedPosts ? (
							selectedPosts.map((post, index) => {
								return (
									<div
										className="post-single-item"
										key={index}
									>
										<div className="header_section">
											{post &&
												post._embedded &&
												post._embedded[
													'wp:featuredmedia'
												] && (
													<>
														<div className="featured-image">
															<img
																src={
																	post
																		._embedded[
																		'wp:featuredmedia'
																	][0]
																		.source_url
																}
																alt="Hello"
															/>
															<div className="categories">
																{allCategories &&
																	allCategories.map(
																		(
																			cat,
																			i
																		) => {
																			return (
																				<div
																					key={
																						i
																					}
																				>
																					{post.categories.includes(
																						cat.id
																					) && (
																						<div className="category-item">
																							{
																								cat.name
																							}
																						</div>
																					)}
																				</div>
																			);
																		}
																	)}
															</div>
														</div>
													</>
												)}
										</div>
										<div className="content-section">
											<div className="post-title">
												<h4>
													<a href={post.link}>
														{post.title.rendered}
													</a>
												</h4>
											</div>
											<div className="post-excerpt">
												<RawHTML>
													{post.excerpt.rendered}
												</RawHTML>
											</div>
											<div className="content-hyperlink">
												<a href={post.link}>
													{__(
														'Continue Reading >>',
														'post-grid-block'
													)}
												</a>
											</div>
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
									<div
										className="post-single-item"
										key={index}
									>
										<div className="header_section">
											{post &&
												post._embedded &&
												post._embedded[
													'wp:featuredmedia'
												] && (
													<>
														<div className="featured-image">
															<img
																src={
																	post
																		._embedded[
																		'wp:featuredmedia'
																	][0]
																		.source_url
																}
																alt="Hello"
															/>
															<div className="categories">
																{allCategories &&
																	allCategories.map(
																		(
																			cat,
																			i
																		) => {
																			return (
																				<div
																					key={
																						i
																					}
																				>
																					{post.categories.includes(
																						cat.id
																					) && (
																						<div className="category-item">
																							{
																								cat.name
																							}
																						</div>
																					)}
																				</div>
																			);
																		}
																	)}
															</div>
														</div>
													</>
												)}
										</div>
										<div className="content-section">
											<div className="post-title">
												<h4>
													<a href={post.link}>
														{post.title.rendered}
													</a>
												</h4>
											</div>
											<div className="post-excerpt">
												<RawHTML>
													{post.excerpt.rendered}
												</RawHTML>
											</div>
											<div className="content-hyperlink">
												<a href={post.link}>
													{__(
														'Continue Reading >>',
														'post-grid-block'
													)}
												</a>
											</div>
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
									<div
										className="post-single-item"
										key={index}
									>
										<div className="header_section">
											{post &&
												post._embedded &&
												post._embedded[
													'wp:featuredmedia'
												] && (
													<>
														<div className="featured-image">
															<img
																src={
																	post
																		._embedded[
																		'wp:featuredmedia'
																	][0]
																		.source_url
																}
																alt="Hello"
															/>
															<div className="categories">
																{allCategories &&
																	allCategories.map(
																		(
																			cat,
																			i
																		) => {
																			return (
																				<div
																					key={
																						i
																					}
																				>
																					{post.categories.includes(
																						cat.id
																					) && (
																						<div className="category-item">
																							{
																								cat.name
																							}
																						</div>
																					)}
																				</div>
																			);
																		}
																	)}
															</div>
														</div>
													</>
												)}
										</div>
										<div className="content-section">
											<div className="post-title">
												<h4>
													<a href={post.link}>
														{post.title.rendered}
													</a>
												</h4>
											</div>
											<div className="post-excerpt">
												<RawHTML>
													{post.excerpt.rendered}
												</RawHTML>
											</div>
											<div className="content-hyperlink">
												<a href={post.link}>
													{__(
														'Continue Reading >>',
														'post-grid-block'
													)}
												</a>
											</div>
										</div>
									</div>
								);
							})
						) : (
							<p>Loading Latest Posts . . .</p>
						))}
				</div>
			</div>
		</Fragment>
	);
}
