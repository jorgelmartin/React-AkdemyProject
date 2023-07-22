import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./Profile.css";
import { ProfileCard } from "../../components/ProfileCard/ProfileCard";

export const Profile = () => {
    return (
        <div className="userContainer">
            <Container className="container-max-width">
                <Row className="userCard gap-3">
                    <Col>
                        <div className="userCard">
                            <ProfileCard></ProfileCard>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}