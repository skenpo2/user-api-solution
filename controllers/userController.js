const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');

const createUser = async (req, res) => {
  const { userName, email, password } = req.body;
  if (!(userName && email && password)) {
    return res.json({ message: 'Please Provide your details' });
  }

  try {
    const isRegisteredUser = await userModel.findOne({ email });

    if (isRegisteredUser) {
      return res.json({ message: 'Email Already in Use' });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser = new userModel({
      userName,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.json({ message: 'User Registered Successfully' });
  } catch (error) {
    res.json({ message: 'Something went wrong' });
  }
};

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
