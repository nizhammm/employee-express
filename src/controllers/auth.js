const { userDB } = require("../database");
const { nanoid } = require("nanoid")

const authController = {
  registerUser: (req, res) => {
    const newUserData = req.body;

    const findUserByUsername = userDB.find((user) => {
      return user.username === newUserData.username
    })

    if (findUserByUsername) {
      res.status(400).json({
        message: "Username has been taken"
      })
      return
    }

    if (newUserData?.password?.length < 8) {
      res.status(400).json({
        message: "Password needs 8 characters or more"
      })
      return
    }

    userDB.push(newUserData);

    res.status(201).json({
      message: "Registered new user",
    })
  },
  loginUser: (req, res) => {
    // GET localhost:2000/auth?username=seto&password=password
    const loginData = req.query;
    // username: seto
    // password: password

    const findUser = userDB.find((val) => {
      return val.username === loginData.username
    })

    if (!findUser) {
      res.status(404).json({
        message: "Wrong username"
      })
      return
    }

    if (loginData.password !== findUser.password) {
      res.status(401).json({
        message: "Wrong password"
      })
    }

    res.status(200).json({
      message: "Logged in",
      result: findUser,
      token: nanoid
    })
  }
}

module.exports = authController