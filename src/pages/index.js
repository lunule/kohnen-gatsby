import * as React from "react";
import { useState, useEffect } from "react";
import { Link, graphql } from "gatsby";
import { GatsbyImage, StaticImage, getImage } from "gatsby-plugin-image";
import { useInView } from "react-intersection-observer";
import styled, { css } from "styled-components";

// Components
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import {
	Carousel,
	Col,
	Container,
	Row,
	Tab,
	Tabs,
	Button,
} from "react-bootstrap";
import SecondaryHeader from "../components/SecondaryHeader";
import ServiceList from "../components/ServiceList";
import ContactUsBanner from "../components/ContactUsBanner";

// import gif from "../assets/images/slow.gif";

import Decorative from "../assets/images/pattern_kohnen.svg";

const StyledHero = styled.section`
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	height: 81.3rem;
	padding: 4rem 0;
	position: relative;
	overflow: hidden;

	&:before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.3);
	}

	h1,
	p {
		color: #fff;
	}

	h1 {
		font-size: 7.2rem;
		line-height: 1.13;

		@media (max-width: 991px) {
			font-size: 6.4rem;
		}

		@media (max-width: 600px) {
			font-size: 5rem;
		}
	}

	// .gatsby-image-wrapper {
	// 	position: absolute;
	// 	top: 0;
	// 	left: 0;
	// 	width: 100%;
	// 	height: 100%;
	// 	z-index: 0;
	// }

	.inner {
		max-width: 105.6rem;
	}
`;

const StyledHeroCarousel = styled(Carousel)`
	position: absolute;
	top: 0;
	left: 0;
	min-width: 100%;
	object-fit: cover;
	width: 100%;
	min-height: 100%;

	&:before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 10;
		background-color: rgba(0, 0, 0, 0.2);
	}

	video {
		width: 100%;
		height: 100%;
	}

	.carousel-inner {
		position: absolute;
		top: 0;
		left: 0;
		min-width: 100%;
		object-fit: cover;
		width: 100%;
		min-height: 100%;
		height: 100%;

		.carousel-item {
			min-height: 100%;

			// &.active {
			// 	.image-has-motion {
			// 		.gatsby-image-wrapper {
			// 			img {
			// 				transform: scale(1);
			// 			}
			// 		}
			// }

			// video,
			.gatsby-image-wrapper {
				position: absolute;
				top: 50%;
				left: 50%;
				min-width: 100%;
				min-height: 100%;
				width: auto;
				height: auto;
				z-index: 0;
				-ms-transform: translateX(-50%) translateY(-50%);
				-moz-transform: translateX(-50%) translateY(-50%);
				-webkit-transform: translateX(-50%) translateY(-50%);
				transform: translateX(-50%) translateY(-50%);
			}
		}
	}

	// .gatsby-image-wrapper {
	// 	img {
	// 		transition: transform 8s linear;
	// 		transition-delay: 300ms;
	// 		transform: scale(1.6);
	// 	}
	// }
`;

const StyledVideo = styled.div`
	video {
		position: absolute;
		top: 50%;
		left: 50%;
		min-width: 100%;
		object-fit: cover;
		width: 100%;
		min-height: 100%;
		transform: translate(-50%, -50%);
	}
`;

const StyledOverviewSection = styled.section`
	position: relative;
	// min-height: 45rem;
	max-width: 92rem;

	// text-align: center;

	// &.mb-xxl {
	// 	@media screen and (max-width: 750px) {
	// 		margin-bottom 4rem;
	// 	}
	// }

	// .gatsby-image-wrapper {
	//     position: absolute;
	//     top: 50%;
	//     transform: translateY(-50%);
	// }
`;

const StyledTabsSection = styled.section`
	max-width: 128rem;
	margin: 0 auto;
	border-top: 1px solid rgba(151, 151, 151, 0.2);
`;

const StyledTabs = styled(Tabs)`
	justify-content: center;
	align-items: center;
	border-bottom: 0;
	// min-height: 16rem;

	.nav-link {
		font-size: 4.8rem;
		height: 100%;
		font-family: "Merriweather-Regular";
		opacity: 0.3;
		border: none;
		color: var(--text);
		transition: all 300ms;
		height: 8rem;
		margin: 0 2rem;
		white-space: nowrap;

		@media (max-width: 500px) {
			font-size: 3.8rem;
		}

		&:hover {
			opacity: 1;
		}

		&.active {
			opacity: 1;
			border: none;
			border-bottom: 1px solid var(--primary);
		}
	}
`;

const StyledCarousel = styled(Carousel)`
	.carousel-control-next,
	.carousel-control-prev {
		span {
			display: none;
		}
	}

	.carousel-control-next {
		display: flex;
		width: 10px;
		height: 10px;
		border-top: 2px solid var(--primary);
		border-right: 2px solid var(--primary);
		transform: rotate(45deg);
		top: 14.5rem;
		left: -180px;

		@media (max-width: 991px) {
			top: initial;
			bottom: -72px;
			left: initial;
			right: 47%;
		}
	}

	.carousel-control-prev {
		display: flex;
		width: 10px;
		height: 10px;
		border-top: 2px solid var(--primary);
		border-left: 2px solid var(--primary);
		transform: rotate(-45deg);
		top: 14.5rem;
		left: -210px;

		@media (max-width: 991px) {
			top: initial;
			bottom: -72px;
			left: 47%;
		}
	}
`;

const StyledCarouselCounter = styled.div`
	@media (max-width: 991px) {
		text-align: center;
	}

	span {
		font-family: "Montserrat-ExtraLight";
		font-size: 7.2rem;
		letter-spacing: 0.09px;
		color: #d2d2d2;

		&.current {
			color: var(--text);
		}
	}
`;

const StyledCarouselControls = styled.div`
	position: relative;
	margin-top: 1.5rem;
	width: 8.7rem;
	height: 5.5rem;
	border: 1px solid var(--primary);

	@media (max-width: 991px) {
		margin: 4rem auto 0 auto;
	}
`;

const StyledCaseStudyCard = styled.div`
	max-width: 66.7rem;
	background-color: var(--grey);

	@media (max-width: 991px) {
		margin: 0 auto;
	}

	.inner {
		padding: 3rem 5rem;
	}

	h4 {
		font-size: 2.4rem;
		letter-spacing: 0.03px;
		font-family: "Montserrat-Medium";
	}

	p {
		font-size: 14px;

		&.title {
			color: #d2d2d2;
			margin-bottom: 0;
		}
	}

	.bottom {
		text-align: center;
		text-transform: uppercase;
		border-top: 1px solid var(--primary);

		a {
			width: 100%;
			height: 100%;
			display: block;
			padding: 1.5rem 0 2rem 0;

			&:hover {
				background-color: var(--primary);
				color: #fff;
			}

			span {
				&:hover {
					color: #fff;
				}
			}
		}
	}
`;

const StyledServiceCard = styled.div`
	background-color: var(--grey);
	text-align: center;
	padding: 4rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin-bottom: 2rem;
	height: 100%;

	@media (max-width: 650px) {
		padding: 3rem 2rem;
	}

	h3 {
		font-size: 2.4rem !important;
		line-height: 1.31;
		transition: color 300ms;
	}

	p {
		font-size: 14px;
	}

	&:hover {
		h3 {
			color: var(--primary);
		}
	}
`;

const StyledLogoWrap = styled.div`
	// transform: translateX(0);
	// transition: all 2s;

	// &.is-in {
	// 	transform: translateX(0);
	// }

	position: absolute;
	top: -6rem;
	right: -12rem;

	@media screen and (max-width: 1200px) {
		right: -25rem;
	}

	svg {
		max-height: 48rem;
	}
`;

const IndexPage = ({ data }) => {
	const homepage = data.allWpPage.edges[0].node.HomepageFields;
	// const heroImage = getImage(
	// 	data.allWpPage.edges[0].node.HomepageFields.heroImage.localFile
	// );
	const occupiersArr = data.occupants.edges[0].node.services.nodes;
	const investorsArr = data.investors.edges[0].node.services.nodes;

	// State
	const [index, setIndex] = useState(1);

	// const [windowPosition, setWindowPosition] = useState(1200);
	// const [ticking, setTicking] = useState(false);

	// Is element inView? react-intersection-observer
	// const { ref, inView, entry } = useInView({
	// 	threshold: 0,
	// });

	// const slideOut = () =>
	// 	document
	// 		.querySelector(".image-has-motion")
	// 		.classList.remove("is-active");

	//Seems throttled but still quite taxative
	//TODO: Fire this ONLY when "react-intersection-observer" Inview is true
	// if (inView) {
	// 	document.addEventListener("scroll", function (e) {
	// 		if (!ticking) {
	// 			window.requestAnimationFrame(function () {
	// 				setWindowPosition(window.scrollY + window.innerHeight);
	// 				setTicking(false);
	// 			});

	// 			setTicking(true);
	// 		}
	// 	});
	// }

	//TODO: Not working
	// if (!inView) {
	// 	console.log('unattached');
	// 	document.removeEventListener('scroll', function (e) {
	// 		setWindowPosition(1000);
	// 	});
	// }
	// Get element with ".animated" class, which has "data-sal" attribute
	useEffect(() => {
		document.addEventListener("sal:in", ({ detail }) => {
			detail.target.classList.add("is-in");
		});
	}, []);

	// Carousel Index Indicator
	const handleSelect = (selectedIndex, e) => {
		setIndex(selectedIndex);
	};

	return (
		<Layout headerAbsolute={true} contactBanner={true}>
			<SEO title="Homepage" />

			<main>
				<StyledHero>
					{/* <StyledHeroCarousel
						variant="dark"
						indicators={false}
						controls={false}
						interval={5000}
						fade={true}
					>
						{homepage.heroSlider.map((slide, idx) => {
							const image = getImage(slide?.image?.localFile);
							return (
								<Carousel.Item
									key={idx}
									// interval={slide.interval}
								>
									{slide.image !== null ? (
										<div
											className={
												slide.imageHasMotion &&
												'image-has-motion'
											}
										>
											<GatsbyImage
												key={idx}
												image={image}
												alt={homepage.heroTitle}
												objectFit="cover"
												loading="eager"
												style={{ zIndex: '0' }}
											/>
										</div>
									) : (
										<StyledVideo key={idx}>
											<video
												autoPlay={true}
												muted={true}
												loop={true}
												playsInline={true}
												src={slide.video.mediaItemUrl}
												type="video/mp4"
											/>
										</StyledVideo>
									)}
								</Carousel.Item>
							);
						})}
					</StyledHeroCarousel> */}
					<StyledVideo>
						<video
							autoPlay={true}
							muted={true}
							loop={true}
							playsInline={true}
							src={homepage.heroVideo.mediaItemUrl}
							type="video/mp4"
						/>
					</StyledVideo>
					<Container style={{ zIndex: 10 }}>
						<div className="inner">
							<p className="big caps">{homepage.heroPreTitle}</p>
							<h1 className="mb-sm">{homepage.heroTitle}</h1>
							<Link to={"/about"}>
								<Button
									variant="full-primary-to-white"
									size="xxl"
								>
									{homepage.heroButtonText}
								</Button>
							</Link>
						</div>
					</Container>
				</StyledHero>

				<Container
					fluid
					css={css`
						position: relative;
						max-height: 50rem;
						margin: 6rem 0;

						@media screen and (max-width: 930px) {
							max-height: 100%;
						}
					`}
				>
					<StyledLogoWrap>
						<Decorative />
					</StyledLogoWrap>
					{/* <StyledLogoWrap
					>
						<div
							css={css`
								position: absolute;
								right: 0;
								top: 0;
								z-index: 0;
								transition: all 1s;
								width: 100vw;
								opacity: 0.2;

								img {
									width: 100%;
									min-width: 100rem;
									max-height: 50rem;
									object-fit: cover;
								}

								@media screen and (max-width: 750px) {
									top: -5rem;
								}
							`}
						>
							<img src={gif} alt="Kohnen" />
						</div>
					</StyledLogoWrap> */}
					<Container>
						<StyledOverviewSection className="padding-large">
							{/* <div ref={ref}> */}

							{/* </div> */}

							<div
								css={css`
									position: relative;
									z-index: 10;
								`}
							>
								<div className="mb-sm">
									<SecondaryHeader
										text={homepage.overviewTitle}
										className="mb-md"
									/>
								</div>
								<p className="big mb-md">
									{homepage.overviewText}
								</p>
								<Link to={homepage.overviewButtonUrl.link}>
									<Button
										variant="transparent-primary"
										size="xxl"
									>
										{homepage.overviewButtonText}
									</Button>
								</Link>
							</div>
						</StyledOverviewSection>
					</Container>
				</Container>

				{/* Services - Custom posts 2 taxonomies*/}
				<StyledTabsSection className="padding-large">
					<Container
					// css={css`
					// 	border-top: 1px solid rgba(151, 151, 151, 0.2);
					// `}
					>
						<StyledTabs
							defaultActiveKey="occupiers"
							className="mb-lg text-center"
						>
							<Tab eventKey="occupiers" title="For Occupants">
								<Row className="gx-3 gy-3">
									{occupiersArr
										.sort(
											(a, b) =>
												(a.menuOrder === null) -
													(b.menuOrder === null) ||
												+(a.menuOrder > b.menuOrder) ||
												-(a.menuOrder < b.menuOrder)
										)
										.map((service) => {
											const image = getImage(
												service.SingleServiceFields.icon
													.localFile
											);
											return (
												<Col
													lg={4}
													md={6}
													key={service.id}
												>
													<Link
														to={`occupant-services/#${service.slug}`}
													>
														<StyledServiceCard
															id={service.slug}
														>
															<GatsbyImage
																image={image}
																alt={
																	service.title
																}
															/>
															<h3 className="mt-md mb-sm">
																{service.title}
															</h3>
														</StyledServiceCard>
													</Link>
												</Col>
											);
										})}
								</Row>
							</Tab>
							<Tab eventKey="investors" title="For Investors">
								<Row className="gx-3 gy-3">
									{investorsArr
										.sort(
											(a, b) =>
												(a.menuOrder === null) -
													(b.menuOrder === null) ||
												+(a.menuOrder > b.menuOrder) ||
												-(a.menuOrder < b.menuOrder)
										)
										.map((service) => {
											const image = getImage(
												service.SingleServiceFields.icon
													?.localFile
											);
											return (
												<Col
													lg={4}
													md={6}
													key={service.id}
												>
													<Link
														to={`investor-services/#${service.slug}`}
													>
														<StyledServiceCard
															id={service.slug}
														>
															<GatsbyImage
																image={image}
																alt={
																	service.title
																}
															/>

															<h3 className="mt-md mb-sm">
																{service.title}
															</h3>
														</StyledServiceCard>
													</Link>
												</Col>
											);
										})}
								</Row>
							</Tab>
						</StyledTabs>
					</Container>
				</StyledTabsSection>

				<section className="mb-xl">
					<Container className="container-md">
						<div className="text-center mb-lg">
							<SecondaryHeader
								text={homepage.featuredCaseStudiesTitle}
							/>
						</div>
						<Row className="gx-5 gy-5">
							<Col lg={3}>
								<StyledCarouselCounter>
									<span className="current">{index + 1}</span>{" "}
									<span>
										/ {homepage.featuredCaseStudies.length}
									</span>
								</StyledCarouselCounter>
								<StyledCarouselControls className="d-none d-lg-block"></StyledCarouselControls>
							</Col>
							<Col>
								<StyledCarousel
									variant="dark"
									interval={null}
									activeIndex={index}
									onSelect={handleSelect}
									indicators={false}
									interval={5000}
								>
									{homepage.featuredCaseStudies.map(
										(caseStudy, idx) => {
											// const { CaseStudyFields } = caseStudy;
											return (
												<Carousel.Item
													key={caseStudy.id}
												>
													<StyledCaseStudyCard>
														<div className="inner">
															<h4 className="mb-md">
																{
																	caseStudy.title
																}
															</h4>
															{caseStudy
																.CaseStudyFields
																.assetType && (
																<div className="mb-md">
																	<p className="title">
																		Asset
																		Type
																	</p>
																	<p>
																		{
																			caseStudy
																				.CaseStudyFields
																				.assetType
																		}
																	</p>
																</div>
															)}
															{caseStudy
																.CaseStudyFields
																.sqFt && (
																<div className="mb-md">
																	<p className="title">
																		Sq. Ft.
																	</p>
																	<p>
																		{
																			caseStudy
																				.CaseStudyFields
																				.sqFt
																		}
																	</p>
																</div>
															)}
															{caseStudy
																.CaseStudyFields
																.location && (
																<div>
																	<p className="title">
																		Location
																	</p>
																	<p>
																		{
																			caseStudy
																				.CaseStudyFields
																				.location
																		}
																	</p>
																</div>
															)}
														</div>
														<div className="bottom">
															<Link
																to={`/${caseStudy.slug}`}
															>
																<span className="link caps">
																	View Details
																</span>
															</Link>
														</div>
													</StyledCaseStudyCard>
												</Carousel.Item>
											);
										}
									)}
								</StyledCarousel>
								<StyledCarouselControls className="d-lg-none"></StyledCarouselControls>
							</Col>
						</Row>
						<div className="mt-lg text-center">
							<Link to={"/case-studies"}>
								<Button
									variant="transparent-primary"
									size="xxl"
								>
									More Case Studies
								</Button>
							</Link>
						</div>
					</Container>
				</section>
			</main>
		</Layout>
	);
};

export const indexQuery = graphql`
	{
		allWpPage(filter: { slug: { eq: "homepage" } }) {
			edges {
				node {
					id
					HomepageFields {
						heroVideo {
							mediaItemUrl
						}
						heroPreTitle
						heroTitle
						heroButtonText
						heroButtonUrl {
							... on WpPage {
								id
								slug
								link
							}
						}
						overviewTitle
						overviewText
						overviewButtonText
						overviewButtonUrl {
							... on WpPage {
								id
								slug
								link
							}
						}
						featuredCaseStudiesTitle
						featuredCaseStudies {
							... on WpCasestudy {
								id
								title
								slug

								CaseStudyFields {
									assetType
									location
									sqFt
								}
							}
						}
						featuredCaseStudiesButtonText
						featuredCaseStudiesButtonUrl {
							... on WpPage {
								id
								slug
								link
							}
						}
					}
				}
			}
		}
		investors: allWpFor(filter: { name: { eq: "For Investors" } }) {
			edges {
				node {
					services {
						nodes {
							id
							content
							title
							slug
							menuOrder
							SingleServiceFields {
								icon {
									localFile {
										childImageSharp {
											gatsbyImageData(
												layout: CONSTRAINED
												height: 115
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
		}
		occupants: allWpFor(filter: { name: { eq: "For Occupiers" } }) {
			edges {
				node {
					services {
						nodes {
							id
							content
							title
							slug
							menuOrder
							SingleServiceFields {
								icon {
									localFile {
										childImageSharp {
											gatsbyImageData(
												layout: CONSTRAINED
												height: 115
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
		}
	}
`;

export default IndexPage;
