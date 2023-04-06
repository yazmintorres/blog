const db = require("../db/db-connection.js");
const jwt = require("jsonwebtoken");

const getPosts = async (req, res) => {
  try {
    if (req.query.cat) {
      const { rows: posts } = await db.query(
        "SELECT * FROM posts WHERE cat = $1",
        [req.query.cat]
      );
      return res.status(200).json(posts);
    } else {
      const { rows: posts } = await db.query("SELECT * FROM posts");
      return res.status(200).json(posts);
    }
  } catch (error) {
    console.error(error.message);
  }
};

const getPost = async (req, res) => {
  // console.log("got a request");
  try {
    const { post_id } = req.params;
    // console.log(post_id);
    const q =
      "SELECT posts.id AS post_id, users.username, posts.img, posts.body, posts.date, posts.cat, posts.title FROM posts LEFT JOIN users ON posts.uid=users.id WHERE posts.id=$1";
    const { rows: post } = await db.query(q, [post_id]);
    // console.log(post);
    res.status(200).json(post[0]);
  } catch (error) {
    console.log(error.message);
  }
};

const addPost = async (req, res) => {
  try {
    const token = await req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated");

    const userInfo = jwt.verify(token, "jwtkey");
    console.log("userinfo", userInfo);

    const { title, body, img, cat } = req.body;
    console.log(req.body);
    const q =
      "INSERT INTO posts (title, body, img, cat, uid) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const { rows: addedPost } = await db.query(q, [
      title,
      body,
      img,
      cat,
      userInfo.id,
    ]);
    res.status(200).json(addedPost);
  } catch (error) {
    console.log(error.message);
  }
};

const deletePost = async (req, res) => {
  try {
    console.log("called");
    // make sure there is a valid token
    console.log("req cookies", req.cookies);
    const token = await req.cookies.access_token;
    console.log("token", token);
    if (!token) return res.status(401).json("Not authenticated");

    const userInfo = jwt.verify(token, "jwtkey");
    console.log("userinfo", userInfo);

    const { post_id } = req.params;
    const q = "DELETE FROM posts WHERE id = $1 and uid = $2";
    await db.query(q, [post_id, userInfo.id]);
    res.status(200).json("Post has been deleted!");
  } catch (error) {
    console.log(error.message);
  }
};

const updatePost = async (req, res) => {
  console.log("test 1");
  try {
    const { post_id } = req.params;
    console.log("req params", req.params);
    const token = await req.cookies.access_token;
    // console.log("token", token);
    if (!token) return res.status(401).json("Not authenticated");

    const userInfo = jwt.verify(token, "jwtkey");
    // console.log("userinfo", userInfo);

    const { title, body, img, cat } = req.body;
    console.log("req body", req.body);
    const q =
      "UPDATE posts SET title=$1, body=$2, img=$3, cat=$4 WHERE id = $5 AND uid = $6 RETURNING *";
    const { rows: addedPost } = await db.query(q, [
      title,
      body,
      img,
      cat,
      post_id,
      userInfo.id,
    ]);
    res.status(200).json(addedPost);
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = { getPosts, getPost, addPost, deletePost, updatePost };
