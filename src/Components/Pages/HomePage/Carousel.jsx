import { Container, Row, Col } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import sliderimage1 from './Images/Carousel-image-Start.png';
import sliderimage2 from './Images/Carousel-Image-Mid.png';
import sliderimage3 from './Images/Carousel-Image-End.png';
import './Carousel.css'; // Import the CSS file

function HomepageCarousel() {
  return (
    <Container fluid>
      <Row>
        <Col lg={12}>
          <Carousel>
            <Carousel.Item>
              <img src={sliderimage1} className="d-block w-100" alt="First slide" />
              <Carousel.Caption>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                src={sliderimage2}
                className="d-block w-100"
                style={{ objectFit: 'cover' }}
                alt="Second slide"
              />
              <Carousel.Caption>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                src={sliderimage3}
                className="d-block w-100"
                style={{ objectFit: 'cover' }}
                alt="Third slide"
              />
              <Carousel.Caption>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>
    </Container>
  );
}

export default HomepageCarousel;
