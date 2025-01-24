const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');

// function to register new user
const createUser = async (req, res) => {
  const { userName, email, password } = req.body;

  // checking if user has provided all the required details
  if (!(userName && email && password)) {
    return res.json({ message: 'Please Provide your details' });
  }

  try {
    // checking if the email provided exist already in the database
    const isRegisteredUser = await userModel.findOne({ email });

    if (isRegisteredUser) {
      return res.json({ message: 'Email Already in Use' });
    }

    // hashing user password

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // creating a new user
    const newUser = new userModel({
      userName,
      email,
      password: hashedPassword,
    });

    // saving the user data to database
    await newUser.save();
    res.json({ message: 'User Registered Successfully' });
  } catch (error) {
    res.json({ message: 'Something went wrong' });
  }
};

// function to Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!(email && password))
    return res.json({ message: 'Please Provide your details' });

  try {
    const isRegisteredUser = await userModel.findOne({ email });

    if (!isRegisteredUser) {
      return res.json({ message: 'User not exist, Please register' });
    }

    const isPasswordValid = bcrypt.compareSync(
      password,
      isRegisteredUser.password
    );

    if (!isPasswordValid) {
      return res.json({ message: 'Password not valid' });
    }

    return res.json({ userDetails: isRegisteredUser });
  } catch (error) {
    res.json({ message: 'Something went wrong' });
  }
};

const deleteUser = async (req, res) => {
  const { email, password } = req.body;

  if (!(email && password))
    return res.json({ message: 'Please Provide your details' });

  try {
    const isRegisteredUser = await userModel.findOne({ email });

    if (!isRegisteredUser) {
      return res.json({ message: 'User not exist, Please register' });
    }

    const isPasswordValid = bcrypt.compareSync(
      password,
      isRegisteredUser.password
    );

    if (!isPasswordValid) {
      return res.json({ message: 'Password not valid' });
    }

    await userModel.findOneAndDelete(email);
    return res.json({ message: 'User Deleted Successfully' });
  } catch (error) {
    res.json({ message: 'Something went wrong' });
  }
};

module.exports = { createUser, loginUser, deleteUser };
