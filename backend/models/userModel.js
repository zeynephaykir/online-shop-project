import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        taxId: { type: String },
        isAdmin: { type: Boolean, default: true },
        role: {type: String, default: 'sales manager', required: true}
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model('User', userSchema);
export default User;
