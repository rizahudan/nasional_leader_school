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
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: false,
  },
  desc: {
    type: String,
    required: true,
  },
  by: {
    type: String,
    required: true,
  },
  deliverable: {
    type: String,
  },
  hours: {
    type: Number,
    default: 0,
  },
  // pending, process, finish
  status: {
    type: String,
    enum: ['pending', 'process', 'finish'],
    default: 'pending',
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
