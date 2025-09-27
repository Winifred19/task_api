const { signUp } = require("./controller");
const UserRepository = require("./userRepository");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

signUp = async (req, res) => {
  try {
    const { email, fullname, password } = req.body;

    if (!fullname) {
      throw new Error("name is required");
    }

    if (!password) {
      throw new Error("password is required");
    }

    if (!email) {
      throw new Error("email is required");
    }

    // check that the email is not attached another account

    const existingUser = UserRepository.getUserByFilter({ email });

    if (existingUser) {
      throw new Error("email already exists");
    }

    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    await UserRepository.create({
      email,
      fullname,
      password: hashedPassword,
    });

    return {
      status: true,
      message: "signup successful",
      data: {},
    };
  } catch (err) {
    console.log("Error creating account", err);

    res.send({
      status: false,
      message: "Unable to complete sign up ",
      error: err.message,
    });
  }
};

login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!password) {
      throw new Error("password is required");
    }

    if (!email) {
      throw new Error("email is required");
    }

    // check that their accounts exist

    const existingUser = UserRepository.getUserByFilter({ email });

    if (!existingUser) {
      throw new Error("Invalid email, user does not exist");
    }

    // check that the password is correct

    const isCorrectPassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isCorrectPassword) {
      throw new Error("invalid login details");
    }

    const secrete = process.env.SECRETE || "secrete";

    const payload = {
      email,
      fullname,
      userId: existingUser.id,
    };

    const token = jwt.sign(payload, secrete, { expiresIn: "1h" });

    return {
      status: true,
      message: "login successful",
      data: {
        token,
      },
    };

    // send them authorization token
  } catch (err) {
    console.log("Error with login", err);

    res.send({
      status: false,
      message: "Unable to complete login up ",
      error: err.message,
    });
  }
};

module.exports = {
  signUp,
  login,
};
