const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');

const createUser = async (req, res) => {
  const { userName, email, password } = req.body;
  if (!(userName && email && password)) {
    return res.json({ message: 'Please Provide your details' });
  }

  const isRegisteredUser = await userModel.findOne({ email });

  if (isRegisteredUser) {
    return res.json({ message: 'Email Already in Use' });
  }

  try {
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

module.exports = { createUser };
