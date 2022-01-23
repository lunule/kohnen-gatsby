import React from "react";
import { graphql, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import styled, { css } from "styled-components";
import Layout from "../components/Layout";
import { Col, Container, Row } from "react-bootstrap";
import SEO from "../components/SEO";
import SecondaryHeader from "../components/SecondaryHeader";
import CaseStudyCard from "../components/CaseStudyCard";
import parse from "html-react-parser";

const StyledCaseStudyTitle = styled.h1`
	font-size: 6.4rem;
	line-height: 1.13;
	margin-bottom: 3rem;

	@media (max-width: 991px) {
		font-size: 5rem;
	}

	@media (max-width: 600px) {
		font-size: 4rem;
	}
`;

const StyledCaseStudyImage = styled.section`
	position: relative;
	padding: 2rem;
	display: flex;
	justify-content: flex-start;
	align-items: flex-end;
	min-height: 52rem;

	.gatsby-image-wrapper {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 0;
	}
`;

const StyledCaseStudyHeroCard = styled.div`
	z-index: 10;
	position: relative;
	width: 100%;
	background-color: #fff;
	width: 48.5%;
	padding: 2.5rem;

	@media (max-width: 800px) {
		width: 100%;
		max-width: 44rem;
	}

	h4 {
		font-size: 2.4rem;
		letter-spacing: 0.03px;
	}

	p {
		font-size: 14px;

		&.title {
			color: #d2d2d2;
			margin-bottom: 0;
		}
	}
`;

const StyledContent = styled.section`
	display: flex;
	padding: 4rem 0;
	border-bottom: 1px solid rgba(151, 151, 151, 0.2);

	@media (max-width: 800px) {
		flex-direction: column;
	}

	h3 {
		font-size: 3.2rem;
	}

	ul {
		list-style: none;
		padding: 0;
		li {
			font-family: "Montserrat-Medium";
			font-size: 1.4rem;
			margin-bottom: 1.5rem;

			display: flex;
			align-items: center;

			&::before {
				content: "";
				width: 3px;
				height: 3px;
				border-radius: 50%;
				background-color: #d8d8d8;
				position: relative;
				display: inline-block;
				margin-right: 20px;
			}
		}
	}

	div {
		width: 100%;
		padding: 0 6rem 2rem 0;

		&:first-child {
			border-right: 1px solid #d2d2d2;

			@media (max-width: 800px) {
				padding: 0 0 2rem 0;
				border-bottom: 1px solid #d2d2d2;
				border-right: 0;
			}
		}

		&:last-child {
			padding-left: 6rem;

			@media (max-width: 800px) {
				padding: 4rem 0 0 0;
			}
		}
	}
`;

const CaseStudy = ({ data }) => {
	const caseStudies = data.allWpCasestudy.edges;
	const image = getImage(data.wpCasestudy.featuredImage.node.localFile);
	return (
		<Layout>
			<SEO title={data.wpCasestudy.title} />
			<Container fluid="lg">
				<section className="mt-xl">
					<Link to={"/case-studies"}>
						<span className="caps link primary back mb-md">
							<span></span>Case Studies
						</span>
					</Link>
					<StyledCaseStudyTitle>
						{data.wpCasestudy.title}
					</StyledCaseStudyTitle>
				</section>
				<StyledCaseStudyImage>
					<GatsbyImage
						image={image}
						alt={data.wpCasestudy.title}
						objectFit="cover"
						style={{ zIndex: "0" }}
					/>

					<StyledCaseStudyHeroCard
						data-sal="slide-down"
						data-sal-duration="500"
					>
						{data.wpCasestudy.CaseStudyFields.assetType && (
							<div className="mb-md">
								<p className="title">Asset Type</p>
								<p>
									{data.wpCasestudy.CaseStudyFields.assetType}
								</p>
							</div>
						)}
						{data.wpCasestudy.CaseStudyFields.sqFt && (
							<div className="mb-md">
								<p className="title">Sq. Ft.</p>
								<p>{data.wpCasestudy.CaseStudyFields.sqFt}</p>
							</div>
						)}
						{data.wpCasestudy.CaseStudyFields.location && (
							<div className="mb-md">
								<p className="title">Location</p>
								<p>
									{data.wpCasestudy.CaseStudyFields.location}
								</p>
							</div>
						)}
					</StyledCaseStudyHeroCard>
				</StyledCaseStudyImage>
				<StyledContent>
					{data.wpCasestudy.CaseStudyFields.challenge && (
						<div>
							<h3 className="mb-sm">The Challenge</h3>
							{parse(`${data.wpCasestudy.CaseStudyFields.challenge}
                            `)}
						</div>
					)}

					{data.wpCasestudy.CaseStudyFields.solution && (
						<div>
							<h3 className="mb-sm">The Solution</h3>
							{parse(`${data.wpCasestudy.CaseStudyFields.solution}
                            `)}
						</div>
					)}
				</StyledContent>
				<section className="padding mt-md">
					<SecondaryHeader text="More Case Studies" />

					<Row className="gx-5 gy-5 mt-xs">
						{caseStudies.map((singleCase) => {
							const caseStudy = singleCase.node;

							const image = getImage(
								caseStudy.featuredImage.node.localFile
							);

							return (
								<Col lg={6}>
									<CaseStudyCard caseStudy={caseStudy} />
								</Col>
							);
						})}
					</Row>
				</section>

				<div
					css={css`
						margin: 4rem 0;
						border-bottom: 1px solid rgba(151, 151, 151, 0.2);
					`}
				></div>
			</Container>
		</Layout>
	);
};

export default CaseStudy;

export const query = graphql`
	query ($id: String!) {
		wpCasestudy(id: { eq: $id }) {
			id
			title
			CaseStudyFields {
				assetType
				location
				sqFt
				challenge
				solution
			}
			featuredImage {
				node {
					localFile {
						childImageSharp {
							gatsbyImageData(
								layout: CONSTRAINED
								width: 1900
								placeholder: BLURRED
								quality: 100
							)
						}
					}
				}
			}
		}
		allWpCasestudy(filter: { id: { ne: $id } }) {
			edges {
				node {
					id
					title
					slug
					CaseStudyFields {
						location
						sqFt
						assetType
					}
					featuredImage {
						node {
							localFile {
								childImageSharp {
									gatsbyImageData(
										layout: CONSTRAINED
										width: 900
										placeholder: BLURRED
										quality: 100
									)
								}
							}
						}
					}
				}
			}
		}
	}
`;
