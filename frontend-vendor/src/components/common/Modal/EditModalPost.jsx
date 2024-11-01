import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import TagService from '../../../services/TagsService';
import { updateTag, fetchTags } from '../../../redux/actions/tag-action';
import { useDispatch } from 'react-redux';

const EditModal = ({ show, handleClose, tagId }) => {
  const dispatch = useDispatch();
  const [tag, setTag] = useState({
    name: "",
  });
  const { name } = tag;

  // Load data into the form
  useEffect(() => {

    if (show && tagId) {
      loadTag();
    }
  }, [show, tagId]);

  const loadTag = async () => {
    try {
      const result = await TagService.get(tagId);
      setTag(result.data);
    } catch (error) {
      console.error('Error loading tag:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTag((prevTag) => ({
      ...prevTag,
      [name]: value,
    }));
  };

  const handleSaveTag = async () => {
    try {
        console.log("TAG:--",tag);
      await dispatch(updateTag({ tag }));
      handleClose();
    } catch (error) {
      console.error('Error updating tag:', error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Tag</Modal.Title>
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
  );
};

export default EditModal;
