
import { useState } from "react";
import "./ContactUs.css";
import image from "../ContactUs/ContactUsImage.jpg";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";



export function ContactUs() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [contact, setContact] = useState({
        name: "",
        email: "",
        message: "",
    });


    const handleInput = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value });
        //console.log(contact);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
          //  const result = await ContactCustomer(contact);
            setContact({
                name: "",
                email: "",
                message: "",
            });
            setIsSubmitted(true);
            setTimeout(() => {
                setIsSubmitted(false);
            }, 1500);

        } catch (error) {
            console.log(error);
        }
        console.log(contact);
    };

    return (
        <>
          

            <section className="section-contact">
                <div className="headingContainer">
                    <p className="main-heading">CONTACT US</p>
                    <h1>We Are Here For You</h1>
                </div>

                <Row className="mainContact">
                    <Col className="contact-img">
                        <img src={image} alt="We are always ready to help" width="50%" />
                    </Col>


                    <Col className="contactFormContainer">
                        <div className="headingContainer">
                            
                            <h1>Get In Touch</h1>
                            <p>We’d love to hear from you. Take five minutes to fill out our form so that we can get to know you.</p>
                        </div>
                        <Form onSubmit={handleSubmit} className="contactForm">
                            <Row>
                                <Col lg={12}>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Name :</Form.Label>
                                        <Form.Control type="text"
                                            name="name"
                                            id="name"
                                            placeholder="Name"
                                            autoComplete="off"
                                            value={contact.name}
                                            onChange={handleInput}
                                            required />
                                    </Form.Group>
                                </Col>

                                <Col lg={12}>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Email :</Form.Label>
                                        <Form.Control type="email"
                                            name="email"
                                            id="email"
                                            placeholder="Email"
                                            autoComplete="off"
                                            value={contact.email}
                                            onChange={handleInput}
                                            required />
                                    </Form.Group>
                                </Col>

                                <Col lg={12}>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Message : </Form.Label>
                                        <Form.Control as="textarea" name="message"
                                            id="message"
                                            placeholder="Your Message"
                                            autoComplete="off"
                                            value={contact.message}
                                            onChange={handleInput}
                                            required
                                            rows={3} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={3}>
                                    <Button variant="primary" type="submit">Submit</Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                    <Col lg={4} className="mt-1">
                         {isSubmitted ? <Alert variant="success">FeedBack Send</Alert> : null}
                    </Col>
                </Row>

                

                <section className="mb-3">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112063.08569184126!2d77.19675004368186!3d28.63061842047694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfcad1c51b2ab%3A0x22d3d3738ba292cd!2sSprinthub%20Solutions%20Private%20Limited!5e0!3m2!1sen!2sin!4v1703613142018!5m2!1sen!2sin"
                        width="100%"
                        height="450"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </section>
            </section>

        </>

    );
}
