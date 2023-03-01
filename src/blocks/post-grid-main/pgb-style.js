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
`;

export default PgbStyle;
