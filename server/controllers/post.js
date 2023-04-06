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

const addPost = (req, res) => {
  res.json("from controller");
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

const updatePost = (req, res) => {
  res.json("from controller");
};
module.exports = { getPosts, getPost, addPost, deletePost, updatePost };
