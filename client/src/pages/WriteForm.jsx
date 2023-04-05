import React from "react";
import { Button, Form } from "react-bootstrap";

const WriteForm = () => {
  const handleChange = (property) => {
    return (e) => console.log(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="write-post">
      <Form className="form-students" onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label htmlFor="title">
            Title: <span className="required">*</span>
          </Form.Label>
          <input type="text" placeholder="Title" required />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="body">
            Content: <span className="required">*</span>
          </Form.Label>

          <textarea
            id="body"
            placeholder="Write your blog post here"
            value={""}
            onChange={handleChange("notes")}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="img-url">Image URL</Form.Label>
          <input type="text" placeholder="Img URL" />
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
            <button className="btn-update">Update</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input type="radio" name="cat" value="webdev" id="webdev" />
            <label htmlFor="webdev">Web Dev</label>
          </div>
          <div className="cat">
            <input type="radio" name="cat" value="finance" id="finance" />
            <label htmlFor="finance">Finance</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteForm;
