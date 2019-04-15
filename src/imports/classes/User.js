import mongoose from 'mongoose';

const db = {
  Schema: mongoose.Schema,
  model: mongoose.model,
};
const Users = new db.Schema({
  _id: {
    type: db.Schema.ObjectId,
    auto: true,
  },
  name: {
    type: String,
    required: true,
  },
}, {
  versionKey: false,
  timestamps: {
    createdAt: true,
    updatedAt: true,
  },
});

const User = db.model('users', Users);
export default User;
