const User = require('../model/User');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (users.length === 0) return res.status(404).json({ message: 'No users found' });
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to retrieve users', error: err.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        if (!req?.body?.id) return res.status(400).json({ "message": 'User ID required' });
        const { id } = req.body;

        const result = await User.findByIdAndDelete(id);
        if (!result) return res.status(404).json({ message: `User ID ${id} not found` });

        res.json({ message: `User ID ${id} deleted successfully`, result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to delete user', error: err.message });
    }
};

const getUser = async (req, res) => {
    try {
        if (!req?.params?.id) return res.status(400).json({ "message": 'User ID required' });
        const { id } = req.params;

        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: `User ID ${id} not found` });

        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to retrieve user', error: err.message });
    }
};


const changeCurrentPassword = async(req, res) => {
    const {oldPassword, newPassword} = req.body

    const user = await User.findById(req.user?._id)
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if (!isPasswordCorrect) {
        return res.status(400).json({ message: 'Invalid old password'})
    }

    const hashedPwd = await bcrypt.hash(newPassword, 10);
    user.password = hashedPwd
    await user.save({validateBeforeSave: false})

    return res
    .status(200)
    .json({ message: "Password changed successfully"})
};


const getCurrentUser = async(req, res) => {
    return res
    .status(200)
    .json(req.user)
};

const updateAccountDetails = async(req, res) => {
    const {username, email} = req.body

    if (!username || !email) {
        return res.status(400).json({ 'message': 'All fields must be filled.' })
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                username,
                email: email
            }
        },
        {new: true}
        
    ).select("-password")

    return res
    .status(200)
    .json({ message: "Account details updated successfully", user})
};


module.exports = {
    getAllUsers,
    deleteUser,
    getUser
}