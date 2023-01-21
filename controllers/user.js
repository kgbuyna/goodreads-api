// Хэрэглэгч бүртгүүлэхээр хамгийн эхлээд database дээр тухайн хэрэглэгч бүртгэгдсэн байна уу гэдгийг шалгах ёстой байх аа. Хэрэв байвал ямар алдаа буцаахыг нь зааж өгөх. 
// import User from './Models/User'
const { User } = require("../Models/User");
const asyncHandler = require("../middleware/asyncHandler");

exports.getUsers =asyncHandler(async (req, res, next) => {
    User.find().then((users) => {
        if(users){
            return res.status(200).json(users);
        }
        else{
            return res.status(400).json({message: Empty});
        }
    });
})

exports.register = asyncHandler(async (req, res, next) => {
    User.findOne({email: req.body.email}).then((user)=>{
        if(user){
            return res.status(400).json({error: 'this email address is already in use'})
        }
        else{
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            newUser.save();
            // Ингээд save хийсэн бол буцаахгүй ч байж болно доо. 
            return res.status(200).json({msg: "Succeed"});

        }
    })
  });