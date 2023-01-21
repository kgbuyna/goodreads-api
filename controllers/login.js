const asyncHandler = require("../middleware/asyncHandler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../Models/User");

exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    console.log(email, password);
    const user = await User.findOne({ email });
    console.log(user);

    if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
        user.token = token;
        user.save();
        return res.status(200).json({user:user});
    }
    else{
        return res.status(401).json({ message: "email or password is incorrect"});
    }
  });