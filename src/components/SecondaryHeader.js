import React from "react";

import styled from "styled-components";

const StyledSecondaryHeader = styled.h2`
	font-size: 4.8rem;
	letter-spacing: 0;
	line-height: 0.88;
	color: var(--text);

	@media (max-width: 500px) {
		font-size: 3.8rem;
		line-height: 1.2;
	}
`;

export default function SecondaryHeader({ text }) {
	return <StyledSecondaryHeader>{text}</StyledSecondaryHeader>;
}
