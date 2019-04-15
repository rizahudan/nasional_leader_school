import { Task, TaskOperation } from 'imports/classes/Task';
import Step from 'imports/classes/Step';

const express = require('express');

const router = express.Router();
router.get('/', async (req, res) => {
  const result = {
    flag: false,
    message: '',
    data: [],
  };
  await TaskOperation.getTask().then((data) => {
    result.flag = true;
    result.data = data;
  });

  const header = {
    'Access-Control-Allow-Origin': '*',
    'content-type': 'application/json',
    accept: 'text/html',
  };

  res.writeHead(200, header);
  res.write(JSON.stringify(result));
  res.end();
});
router.post('/', async (req, res) => {
  const result = {
    flag: false,
    message: '',
    data: {},
  };

  const {
    task,
    date,
    estimate,
    detail,
    by,
  } = req.body;
  const newTask = new Task();
  newTask.task = task;
  newTask.estimate = estimate;
  try {
    const taskId = await newTask.save();
    if (taskId) {
      const newStep = new Step();
      newStep.taskId = taskId;
      newStep.startDate = date;
      newStep.desc = detail;
      newStep.by = by;
      const stepId = await newStep.save();
      if (stepId) {
        result.flag = true;
      }
    }
  } catch (error) {
    result.message = error.message;
  }

  const header = {
    'Access-Control-Allow-Origin': '*',
    'content-type': 'application/json',
    accept: 'text/html',
  };

  res.writeHead((result.flag ? 200 : 400), header);
  res.write(JSON.stringify(result));
  res.end();
});
export default router;
