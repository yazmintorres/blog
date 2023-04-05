const db = require("../db/db-connection.js");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    // check if this is a user with an existing email or username
    const qSelect = "SELECT * FROM users WHERE email = $1 OR username = $2";
    const { rows: users } = await db.query(qSelect, [email, username]);
    if (users.length) return res.status(409).json("User already exists!");

    // if user does not exist hash the password and create a user
    const hash = await bcrypt.hash(password, 10);

    // insert new user into table
    const qInsert =
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *";

    const { rows: userAdded } = await db.query(qInsert, [
      username,
      email,
      hash,
    ]);
    res.json(userAdded[0]);
  } catch (err) {
    res.json(err.message);
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    // check if user exists or not
    const qSelect = "SELECT * FROM users WHERE username = $1";
    const { rows: user } = await db.query(qSelect, [username]);
    if (!user.length) return res.status(404).json("User does not exist!");

    // if it does exist need to make sure the password is correct for that username
    const isPasswordCorrect = await bcrypt.compare(password, user[0].password);
    if (!isPasswordCorrect) return res.status(400).json("Wrong password");
  } catch (error) {
    res.json(error.message);
  }
};

const logout = (req, res) => {};

module.exports = { register, login, logout };
