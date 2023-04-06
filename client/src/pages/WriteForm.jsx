import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const WriteForm = () => {
  const [inputs, setInputs] = useState({
    title: "",
    body: "",
    img: "",
    cat: "",
  });

  console.log(inputs);

  const handleChange = (e) => {
    // console.log("is checked", e.target.checked);
    // console.log(e.target.name);
    // console.log(e.target.value);
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="write-post">
      <Form className="form-students" onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label htmlFor="title">
            Title: <span className="required">*</span>
          </Form.Label>
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={inputs.title}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="body">
            Content: <span className="required">*</span>
          </Form.Label>

          <textarea
            id="body"
            placeholder="Write your blog post here"
            name="body"
            value={inputs.body}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="img-url">Image URL</Form.Label>
          <input
            type="text"
            placeholder="Img URL"
            name="img"
            value={inputs.img}
            onChange={handleChange}
          />
        </Form.Group>
      </Form>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <div className="buttons">
            <button className="btn-draft">Save as draft</button>
            <button onClick={handleSubmit} className="btn-update">
              Publish
            </button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              value="webdev"
              id="webdev"
              onChange={handleChange}
            />
            <label htmlFor="webdev">Web Dev</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              value="finance"
              id="finance"
              onChange={handleChange}
            />
            <label htmlFor="finance">Finance</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteForm;
