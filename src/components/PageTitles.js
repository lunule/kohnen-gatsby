import React from "react";
import styled from "styled-components";

const StyledTitles = styled.div`
	h3 {
		font-size: 2rem;
		text-transform: uppercase;
		font-family: "Montserrat-Medium";
		margin-bottom: 1.5rem;
	}

	h1 {
		font-family: "Merriweather-Regular";
		font-size: 6.4rem;
		margin-bottom: 2rem;

		@media (max-width: 991px) {
			font-size: 5.4rem;
		}

		@media (max-width: 600px) {
			font-size: 4rem;
		}
	}
`;

export default function PageTitles({ children }) {
	return <StyledTitles>{children}</StyledTitles>;
}
