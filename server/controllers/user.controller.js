const User = require('../models/User.model');

exports.handleUserPost = async (req, res) => {
    const { name, note } = req.body;
    try {
        const user = await User.findOne({ note: note });

        if (user) {
            return res.status(409).json({ message: 'Note already exists!' })
        }

        const newUser = new User({
            name,
            note
        })

        await newUser.save()

        return res.status(201).json({ message: 'User added successfully!' })
    } catch (error) {
        console.log(error?.message)
        return res.status(500).json({ message: 'Some error occurred!', error })
    }
}

exports.allUsers = async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });

        return res.status(200).json({ message: 'Users data!', users })
    } catch (error) {
        console.log(error?.message)
        return res.status(500).json({ message: 'Some error occurred!', error })
    }
}