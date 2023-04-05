const db = require("../db/db-connection.js");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

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

// sync with callback
const login = (req, res) => {
  //CHECK USER

  const q = "SELECT * FROM users WHERE username = $1";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.rows.length === 0) return res.status(404).json("User not found!");

    //Check password
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data.rows[0].password
    );

    if (!isPasswordCorrect) return res.status(400).json("Wrong password!");

    const token = jwt.sign({ id: data.rows[0].id }, "jwtkey");
    const { password, ...other } = data.rows[0];

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  });
};

// ASYNC
// const login = async (req, res) => {
//   try {
//     // check if user exists or not
//     const qSelect = "SELECT * FROM users WHERE username = $1";
//     const { rows: user } = await db.query(qSelect, [req.body.username]);
//     if (!user.length) return res.status(404).json("User does not exist!");

//     // if it does exist need to make sure the password is correct for that username
//     const isPasswordCorrect = await bcrypt.compare(
//       req.body.password,
//       user[0].password
//     );

//     if (!isPasswordCorrect) return res.status(400).json("Wrong password");

//     const { password, ...other } = user[0];

//     res
//       .cookie("access_token", jwt.sign({ id: user[0].id }, "secret"), {
//         httpOnly: false,
//       })
//       .status(200)
//       .json(other);
//   } catch (error) {
//     res.json(error.message);
//   }
// };

const logout = (req, res) => {};

module.exports = { register, login, logout };
