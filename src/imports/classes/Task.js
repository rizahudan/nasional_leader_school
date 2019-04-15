import mongoose from 'mongoose';

const db = {
  Schema: mongoose.Schema,
  model: mongoose.model,
};
const Tasks = new db.Schema({
  _id: {
    type: db.Schema.ObjectId,
    auto: true,
  },
  task: {
    type: String,
    required: true,
  },
  estimate: {
    type: Number,
    required: true,
  },
}, {
  versionKey: false,
  timestamps: {
    createdAt: true,
    updatedAt: true,
  },
});

const Task = db.model('tasks', Tasks);

const TaskOperation = {
  getTask: () => {
    const pipeline = [
      {
        $lookup: {
          from: 'steps',
          localField: '_id',
          foreignField: 'taskId',
          as: 'steps',
        },
      },
      {
        $unwind: '$steps',
      },
      {
        $sort: {
          'steps.createdAt': 1,
        },
      },
      {
        $group: {
          _id: '$_id',
          task: { $first: '$task' },
          estimate: { $first: '$estimate' },
          createdAt: { $first: '$createdAt' },
          updatedAt: { $first: '$updatedAt' },
          steps: { $push: '$steps' },
          hours: { $sum: '$steps.hours' },
        },
      },
    ];

    return Task.aggregate(pipeline);
  },
};
export { Task, TaskOperation };
