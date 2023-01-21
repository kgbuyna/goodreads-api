// Хэрэглэгч бүртгүүлэхээр хамгийн эхлээд database дээр тухайн хэрэглэгч бүртгэгдсэн байна уу гэдгийг шалгах ёстой байх аа. Хэрэв байвал ямар алдаа буцаахыг нь зааж өгөх.
// import User from './Models/User'
const { User } = require("../Models/User");
const asyncHandler = require("../middleware/asyncHandler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
exports.getUsers = asyncHandler(async (req, res, next) => {
  User.find().then((users) => {
    if (users) {
      return res.status(200).json(users);
    } else {
      return res.status(400).json({ message: Empty });
    }
  });
});

exports.register = asyncHandler(async (req, res, next) => {
  User.findOne({ email: req.body.email }).then(async (user) => {
    
    const { name ,email, password } = req.body;
    if (user) {
      return res
        .status(400)
        .json({ error: "this email address is already in use" });
    } else {
      encryptedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        name: name,
        email: email,
        password: encryptedPassword,
      });
      newUser.save();
      const token = jwt.sign(
        { user_id: newUser._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      // save user token
      newUser.token = token;
      // Ингээд save хийсэн бол буцаахгүй ч байж болно доо.
      return res.status(200).json({ msg: "Succeed" });
    }
  });
});
