import UserModel from '../model/user.js'
import Auth from '../utils/auth.js'
import nodemailer from 'nodemailer'

const getAllUsers = async (req, res) => {
    try {
        let users = await UserModel.find({}, { password: 0 })
        res.status(200).send({
            message: "User Data Fetched Succesfully",
            users
        })
    } catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error"
        })
    }
}

const getUserById = async (req, res) => {
    try {
        let user = await UserModel.findOne({ _id: req.params.id }, { password: 0 })
        res.status(200).send({
            message: "User Data Fetched Successfully",
            user
        })

    } catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error"
        })
    }
}

const editUserById = async (req, res) => {
    try {
        let user = await UserModel.findByIdAndUpdate({ _id: req.params.id }, {
            $set: {
                name: req.body.name,
                email: req.body.email,
                role: req.body.role,
                'address.doorNumber': req.body.address.doorNumber,
                'address.street': req.body.address.street,
                'address.city': req.body.address.city,
                'address.pincode': req.body.address.pincode,
                phoneNumber: req.body.phoneNumber
            },

        }, { new: true })
        if (user) {
            res.status(200).send({
                message: "User data edited successfully"
            })
        } else {
            res.status(400).send({
                message: "User not found"
            })
        }

    } catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error"
        })
    }
}

const forgotPassword = async (req, res) => {
    try {
        req.body.password = await Auth.hashPassword(req.body.password)
        let user = await UserModel.findOneAndUpdate({ email: req.body.email }, {
            $set: {
                email: req.body.email,
                password: req.body.password,
            },

        }, { new: true })
        if (user) {
            res.status(200).send({
                message: "Password Reset successfull"
            })
        } else {
            res.status(400).send({
                message: "User not found"
            })
        }

    } catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error"
        })
    }
}


const resetMail = async (req, res) => {
    try {
        // Validate input data
        const { email } = req.body;
        const { name } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }
        if (!name) {
            return res.status(400).json({ message: "Name is required" });
        }

        // Find user by email
        let user = await UserModel.findOne({ email });
        let userName = await UserModel.findOne({ name });

        if (!user) {
            return res.status(400).json({ message: `User with email ${email} does not exist` });
        }
        if (!userName) {
            return res.status(400).json({ message: `User with name ${name} does not exist` });
        }

        if (user.name == userName.name) {
            // Configure transporter
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                host: "smtp.gmail.email",
                port: 587,
                secure: false,
                auth: {
                    user: process.env.USER_MAIL,
                    pass: process.env.MAIL_PASS,
                },
            });

            // Prepare mail options
            const mailOptions = {
                from: {
                    name: 'Saran',
                    address: process.env.USER_MAIL
                },
                to: [email],
                subject: "Reset Password Link For Saran's App",
                text: "Hello User, This Mail Contains Your Password Reset Flow",
                html: `<h3>Password Reset Link is </h3>${"http://localhost:5173/reset-password"}`
            };

            // Send mail
            await transporter.sendMail(mailOptions);
            console.log("Email has been sent successfully");

            // Respond to client
            res.status(201).json({ message: "Please check your email for the password reset link" });

        }
        else {
            res.status(400).send({
                message: "User Name and Email Not Match"
            })
        }


    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const deleteUserById = async (req, res) => {
    try {
        let user = await UserModel.findByIdAndDelete({ _id: req.params.id })
        if (user) {
            res.status(200).send({
                message: "User data deleted successfully"
            })
        } else {
            res.status(400).send({
                message: "User data not found"
            })
        }

    } catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error"
        })
    }
}

const signUp = async (req, res) => {
    try {
        let user = await UserModel.findOne({ email: req.body.email })
        if (!user) {
            req.body.password = await Auth.hashPassword(req.body.password)
            await UserModel.create(req.body)
            res.status(201).send({
                message: "User SignUp Successfully"
            })
        } else {
            res.status(400).send({
                message: `User with ${req.body.email} is already Exist...`
            })
        }

    } catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error"
        })
    }
}

const login = async (req, res) => {
    try {
        let user = await UserModel.findOne({ email: req.body.email })
        if (user) {
            if (await Auth.hashCompare(req.body.password, user.password)) {
                let token = await Auth.createToken({
                    name: user.name,
                    email: user.email,
                    id: user._id,
                    role: user.role
                })
                res.status(200).send({
                    message: "Login Successful",
                    name: user.name,
                    email: user.email,
                    id: user._id,
                    role: user.role,
                    token
                })
            } else {
                res.status(400).send({
                    message: "Incorrect Password"
                })
            }
        } else {
            res.status(400).send({
                message: `User With ${req.body.email} does not exists`
            })
        }
    } catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error"
        })
    }
}

export default {
    getAllUsers, getUserById, signUp, login, deleteUserById, editUserById, forgotPassword, resetMail
} 