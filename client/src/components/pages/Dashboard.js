import React from "react";
import { Container, Col, Row, Card, CardTitle, CardText } from "reactstrap";
import { useSelector } from "react-redux";

import PostModal from "../posts/PostModal";
import ListPosts from "../posts/ListPosts";

const Dashboard = () => {
  const { user } = useSelector((state) => state.authReducer);

  return (
    <Container>
      <Row>
        <Col lg="12" md="12" xs="12" sm="12" className="text-center p-3">
          <h2>
            {`Welcome ${user.name.toUpperCase()} ${user.lastName.toUpperCase()}`}
          </h2>
        </Col>
        <Col>
        <PostModal />
          <Card body>
            <div className="card-back"></div>
            <CardText
              className="avatar"
              style={{ backgroundColor: user.avatarColor }}
            >
              {user.name && user.name[0].toUpperCase()}
            </CardText>

            <CardTitle>
              {user.name} {user.lastName}
            </CardTitle>
            <CardText className="text-muted">{user.email}</CardText>
          </Card>
        </Col>
      </Row>
      <Row>
      <ListPosts _id={user._id} />
      </Row>
    </Container>
  );
};

export default Dashboard;
