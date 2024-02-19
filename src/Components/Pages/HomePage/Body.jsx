import { Container, Row, Col, Card } from 'react-bootstrap';
import cardImage1 from './Images/Card-Image-1.png';
import cardImage2 from './Images/Card-Image-2.png';


export function Body() {
    return (
        <Container fluid className="px-2">
            <Row className="my-4">
                <Col lg={12}>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col lg={4}>
                                    <img src={cardImage1} alt="Image" className="img-fluid" />
                                </Col>
                                <Col lg={8}>
                                    <h5>Welcome to task management system.</h5>
                                    <p>Content text goes here.</p>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="my-4">
                <Col lg={12}>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col lg={8}>
                                    <h5>Handle Multiple Projects Efficiently.</h5>
                                    <p>Content text goes here.</p>
                                </Col>
                                <Col lg={4}>
                                    <img src={cardImage2} alt="Image" className="img-fluid" />
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            
            <Row className="my-4">
                <Col lg={12}>
                    <Card>
                        <Card.Body>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Body;
