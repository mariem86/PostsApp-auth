import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { useDispatch } from "react-redux";

import { addPost } from "../js/action/postAction";

const PostModal = () => {
  const dispatch = useDispatch();

  const [modal, setModal] = useState(false);
  const [text, setText] = useState("");

  const handleFormChange = (e) => setText(e.target.value);
  const handleConfim = () => {
    dispatch(addPost({ text }));
    toggle();
  };

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="primary" onClick={toggle}>
        New Post
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Login</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="exampleEmail">Post</Label>
              <Input
                onChange={handleFormChange}
                type="text"
                name="text"
                placeholder="Enter your Text..."
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleConfim}>
            Confirm
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default PostModal;
