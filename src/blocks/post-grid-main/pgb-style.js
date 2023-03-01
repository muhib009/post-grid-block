import styled from 'styled-components';

const PgbStyle = styled.div`
	// Container Styles
	.post-grid-main {
		background-color: ${(props) => props.containerBg};
		padding: ${(props) => props.conatainerPadding}px;
		grid-template-columns: ${(props) =>
			`repeat(${props.numberofRows}, 1fr)`};

		& .content-section {
			background-color: ${(props) => props.contentBg};
			.post-title h4 a {
				color: ${(props) => props.headingColor};
			}
			.post-excerpt {
				color: ${(props) => props.excerptColor};
			}
			.content-hyperlink a {
				color: ${(props) => props.readMoreColor};
			}
		}
	}

	@media (min-width: 1025px) {
		.post-title h4 a {
			font-size: ${(props) => props.headingFontSizes.desktop}px;
		}
		.post-excerpt {
			font-size: ${(props) => props.excerptFontSizes.desktop}px;
		}
		.content-hyperlink a {
			font-size: ${(props) => props.readMoreFontSizes.desktop}px;
		}
	}
	@media (min-width: 768px) and (max-width: 1024px) {
		.post-title h4 a {
			font-size: ${(props) => props.headingFontSizes.tablet}px;
		}
		.post-excerpt {
			font-size: ${(props) => props.excerptFontSizes.tablet}px;
		}
		.content-hyperlink a {
			font-size: ${(props) => props.readMoreFontSizes.tablet}px;
		}
	}
	@media (max-width: 767px) {
		.post-title h4 a {
			font-size: ${(props) => props.headingFontSizes.mobile}px;
		}
		.post-excerpt {
			font-size: ${(props) => props.excerptFontSizes.mobile}px;
		}
		.content-hyperlink a {
			font-size: ${(props) => props.readMoreFontSizes.mobile}px;
		}
	}
`;

export default PgbStyle;
