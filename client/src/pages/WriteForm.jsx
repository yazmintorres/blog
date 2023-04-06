import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

const WriteForm = () => {
  const navigate = useNavigate();
  const state = useLocation().state;
  // console.log("state", state);
  const [inputs, setInputs] = useState(
    state || {
      title: "",
      body: "",
      img: "",
      cat: "",
    }
  );
  // console.log(inputs);
  const handleChange = (e) => {
    // console.log("is checked", e.target.checked);
    // console.log(e.target.name);
    // console.log(e.target.value);
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (state) {
        const response = await fetch(
          `http://localhost:8080/api/posts/${state.post_id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(inputs),
          }
        );
        const updated = await response.json();
        // console.log(updated);
        navigate("/");
      } else {
        const response = await fetch(`http://localhost:8080/api/posts`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(inputs),
        });
        const updated = await response.json();
        // console.log(updated);
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="write-post">
      <Form className="form-students" onSubmit={handleSubmit}>
        <div className="form-inputs">
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
              type="url"
              placeholder="Img URL"
              name="img"
              value={inputs.img}
              onChange={handleChange}
            />
          </Form.Group>
        </div>

        <Form.Group className="form-actions">
          <div className="menu">
            <div className="item">
              <h1>Publish</h1>
              <div className="buttons">
                {/* <button className="btn-draft">Save as draft</button> */}
                <button type="submit" className="btn-update">
                  Publish
                </button>
              </div>
            </div>
            <div className="item">
              <h1>Category</h1>
              <div className="cat">
                <input
                  checked={inputs.cat === "webdev"}
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
                  checked={inputs.cat === "finance"}
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
        </Form.Group>
      </Form>
    </div>
  );
};

export default WriteForm;
