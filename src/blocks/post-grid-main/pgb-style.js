import styled from 'styled-components';

const PgbStyle = styled.div`
	// Container Styles
	.post-grid-main {
		background-color: ${(props) => props.containerBg};
		padding: ${(props) => props.conatainerPadding}px;
		grid-template-columns: ${(props) =>
			`repeat(${props.numberofRows}, 1fr)`};
	}
`;

export default PgbStyle;
