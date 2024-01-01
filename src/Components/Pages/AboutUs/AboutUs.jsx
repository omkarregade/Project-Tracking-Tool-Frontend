import Omkar from "../AboutUs/images/Omkar.jpg"
import Neeraj from "../AboutUs/images/Neeraj.jpg"
import Asawari from "../AboutUs/images/Asawari.jpg"
import Shrikant from "../AboutUs/images/Shrikant.jpg"
import Ved from "../AboutUs/images/Ved.jpg"
import timeline from "../AboutUs/images/Timline.jpg"

import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
export const AboutUs = () => {
    return (
        <Container className='body'>


            <Row>
                <Col lg={12}>
                    <div className="gif-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img
                            src={timeline}
                            alt="Your GIF"
                            className="fullscreen-gif"
                            style={{ maxWidth: '100%', height: 'auto', maxHeight: '300px' }}
                        />
                    </div>
                </Col>
            </Row>
            <Row>
                <h1 className="heading-over-gif"
                    style={{ textAlign: "center" }}>
                    About us
                </h1>
            </Row>



            <Row className='mt-5'>
                <Col lg={12}>
                    <Card>
                        <Card.Header><b>Our Vision</b></Card.Header>
                        <Card.Body>
                            <blockquote className="blockquote mb-0">
                                <p>
                                    SprintHub stands as an innovative leader in the realm of project management solutions, delivering an interactive and intuitive Project Tracking Tool designed to empower teams and businesses.
                                </p>
                                <p>
                                    Our platform redefines project management by amalgamating cutting-edge technology with user-centric design, enabling seamless collaboration and efficient task monitoring.
                                </p>
                                <p>
                                    At SprintHub, we recognize the pivotal role that project tracking plays in the success of endeavors, and thus, we've crafted a dynamic tool that transcends the limitations of traditional project management systems. Our robust platform serves as a centralized hub, fostering clarity, agility, and productivity across diverse projects and teams.
                                </p>
                                <footer className="blockquote-footer">
                                    Someone famous in <cite title="Source Title">Source Title</cite>
                                </footer>
                            </blockquote>
                        </Card.Body>
                    </Card>
                </Col>

            </Row>


            <Row className='mt-5' >
                <Col lg={12}>
                    <Card>
                        <Card.Header> <b>Our Mission</b></Card.Header>
                        <Card.Body>
                            <blockquote className="blockquote mb-0">
                                <p>
                                    With SprintHub's Project Tracking Tool, teams experience a paradigm shift in how they approach and execute projects. Offering real-time updates, customizable dashboards, and insightful analytics, our tool transforms project tracking into a streamlined, interactive experience.
                                </p>
                                <p>
                                    Through an array of features meticulously crafted to suit diverse project needs, our tool adapts to the unique workflows and preferences of each team, ensuring a tailored and efficient approach to project management.
                                </p>
                                <p>
                                    SprintHub is committed to simplifying the complexities of project tracking, empowering teams to achieve milestones with precision while fostering a collaborative environment that nurtures innovation and excellence.
                                </p>
                                <footer className="blockquote-footer">
                                    Someone famous in <cite title="Source Title">Source Title</cite>
                                </footer>
                            </blockquote>
                        </Card.Body>
                    </Card>
                </Col>

            </Row>

            <Row className="mt-5">
                <Col lg={12} style={{ textAlign: "center" }} >
                    <h1>Our Leaders</h1>
                </Col>
            </Row>
            <Row className="mb-5 justify-content-center">
                <Col lg={4} md={6} className="mb-3">
                    <Card className="mx-auto" style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={Omkar} className="photo" />
                        <Card.Body>
                            <Card.Title>Omkar Vilas Regade</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of the card's content.
                            </Card.Text>
                        </Card.Body>
                        <Card.Body>
                            <Card.Link href="https://www.linkedin.com/in/g-neeraj-kumar/">
                                <FontAwesomeIcon icon={faLinkedin} className="iconstyle" />
                            </Card.Link>
                            <Card.Link href="#">Another Link</Card.Link>
                        </Card.Body>
                    </Card>
                </Col>
                {/* Repeat the above structure for other cards */}
                <Col lg={4} md={6} className="mb-3">
                    <Card className="mx-auto" style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={Neeraj} className="photo" />
                        <Card.Body>
                            <Card.Title>G Neeraj Kumar</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of the card's content.
                            </Card.Text>
                        </Card.Body>
                        <Card.Body>
                            <Card.Link href="https://www.linkedin.com/in/g-neeraj-kumar/">
                                <FontAwesomeIcon icon={faLinkedin} className="iconstyle" />
                            </Card.Link>
                            <Card.Link href="#">Another Link</Card.Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={4} md={6} className="mb-3">
                    <Card className="mx-auto" style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={Asawari} className="photo" />
                        <Card.Body>
                            <Card.Title>Asawari Raut</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of the card's content.
                            </Card.Text>
                        </Card.Body>
                        <Card.Body>
                            <Card.Link href="https://www.linkedin.com/in/g-neeraj-kumar/">
                                <FontAwesomeIcon icon={faLinkedin} className="iconstyle" />
                            </Card.Link>
                            <Card.Link href="#">Another Link</Card.Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="mb-5">
                <Col lg={6} md={6} className="mb-3 mx-auto">
                    <Card className="mx-auto" style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={Ved} className="photo" />
                        <Card.Body>
                            <Card.Title>Ved Sansare</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of the card's content.
                            </Card.Text>
                        </Card.Body>
                        <Card.Body>
                            <Card.Link href="https://www.linkedin.com/in/g-neeraj-kumar/">
                                <FontAwesomeIcon icon={faLinkedin} className="iconstyle" />
                            </Card.Link>
                            <Card.Link href="#">Another Link</Card.Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={6} md={6} className="mb-3 mx-auto">
                    <Card className="mx-auto" style={{ width: '18rem' }}>
                        {/* Replace with actual image */}
                        <Card.Img variant="top" src={Shrikant} className="photo" />
                        <Card.Body>
                            <Card.Title>Shrikant Dhengle</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of the card's content.
                            </Card.Text>
                        </Card.Body>
                        <Card.Body>
                            <Card.Link href="https://www.linkedin.com/in/g-neeraj-kumar/">
                                <FontAwesomeIcon icon={faLinkedin} className="iconstyle" />
                            </Card.Link>
                            <Card.Link href="#">Another Link</Card.Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>

    );
};

export default AboutUs;

