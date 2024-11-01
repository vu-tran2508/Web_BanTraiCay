import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { addTag } from '../../../redux/actions/tag-action';
// import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ModalAddPost = (props) => {
  const dispatch = useDispatch();

  const { show, handleClose } = props;
  const [tagDto, setTagDto] = useState({
    name: '',
    description: '',
  });

  const { name, description } = tagDto;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTagDto((prevTagDto) => ({
      ...prevTagDto,
      [name]: value,
    }));
  };

  const handleSaveTag = async (e) => {
    e.preventDefault();
    dispatch(addTag(tagDto));
    // 
    setTagDto({
      name: "",
      description: "",
    });

    handleClose();
    // Add logic to save the tag or perform any other actions
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Tag</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>TÊN TAG</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={name}
                onChange={handleInputChange}
                placeholder="Mùa xuần..."
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>SỰ MIÊU TẢ</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={description}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="btn btn-danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveTag}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAddPost;
