import React from 'react';
import { Accordion, Container, Row } from 'react-bootstrap';

const About: React.FC = () => {
    return (
        <Container>
            <Row>
            <h1>About Page</h1>
            <p>Typer Teacher is an open-source web application that caters towards visually-impaired people to assist in teaching them how to touch-type.</p>
            </Row>
            <Row>
                <h2>FAQ</h2>
            </Row>
            <Row>
                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey='0'>
                        <Accordion.Header>Who is this for?</Accordion.Header>
                        <Accordion.Body>
                            This is an application that is designed to teach you how to touch type. It can be used by anybody, but it has been specially adapted for use by visually-impaired people. While, with the advent of screen reading tools and keyboard navigation software, many people who were born sight-impaired were taught how to touch type from a young age, many older blind and partially sighted people may not know how to.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey='1'>
                        <Accordion.Header>How much does it cost?</Accordion.Header>
                        <Accordion.Body>
                        <p>This application is absolutely free, entirely open-source, and will always remain so. The source code for the application is available on GitHub <a href="https://github.com/MichaelMale/typer-teacher">here</a>.</p>
                        <p>This application is licensed under the <a href="https://www.gnu.org/licenses/agpl-3.0.en.html">GNU Affero General Public License v3.0</a>. In simple terms, this license allows users to freely use, modify, and distribute the software, while requiring that any changes or improvements be made available under the same license. It helps ensure that the software remains free and open for everyone's benefit.</p>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey='2'>
                        <Accordion.Header>How do I suggest any changes?</Accordion.Header>
                        <Accordion.Body>
                            Feel free to raise an issue on the GitHub <a href="https://github.com/MichaelMale/typer-teacher/issues">here</a>. If you do not have a GitHub account feel free to DM the developer on <a href="https://twitter.com/bonoahx">Twitter</a>, which is checked periodically.
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Row>
        </Container>
    );
};

export default About;