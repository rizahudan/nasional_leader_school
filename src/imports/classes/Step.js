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
  taskId: {
    type: db.Schema.ObjectId,
    required: true,
  },
  desc: {
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

const Step = db.model('steps', Users);
export default Step;
