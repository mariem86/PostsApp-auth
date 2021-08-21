import React from "react";
import { Jumbotron, Container } from "reactstrap";
import ListPosts from "../posts/ListPosts";

const Home = () => {
  return (
    <div>
      <Jumbotron fluid>
        <Container fluid className="p-3">
          <h1 className="display-3">Welcome Post App</h1>
          <p className="lead">
            This is a workshop about authentification && Rest Api .
          </p>
          <a href="/" target="_blank">
            GithubLink
          </a>
        </Container>
        <ListPosts />
      </Jumbotron>
     
    </div>
  );
};
export default Home;
