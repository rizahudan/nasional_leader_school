import mongoose from 'mongoose';
import { Task, TaskOperation } from 'imports/classes/Task';
import Step from 'imports/classes/Step';
import validate from '../../lib/validation';

const express = require('express');

const router = express.Router();
router.get('/', async (req, res) => {
  const result = {
    status: 'error',
    message: '',
    data: [],
  };
  await TaskOperation.getTask().then((data) => {
    result.status = 'success';
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
    status: 'error',
    message: '',
    data: {},
  };

  const requiredOption = {
    type: 'isLength',
    option: {
      min: 1,
    },
  };
  const requiredParam = {
    task: [
      requiredOption,
    ],
    date: [
      requiredOption,
      {
        type: 'isISO8601',
      },
    ],
    estimate: [
      requiredOption,
      {
        type: 'isNumeric',
        option: { no_symbols: false },
      },
    ],
    detail: [
      requiredOption,
    ],
    by: [
      requiredOption,
    ],
  };

  const validation = validate(requiredParam, req.body);
  if (validation.flag === true) {
    const {
      task,
      date,
      estimate,
      detail,
      by,
    } = req.body;
    const newData = new Task();
    newData.task = task;
    newData.estimate = estimate;
    try {
      const taskId = await newData.save();
      if (taskId) {
        const newStep = new Step();
        newStep.taskId = taskId;
        newStep.startDate = date;
        newStep.desc = detail;
        newStep.by = by;
        const stepId = await newStep.save();
        if (stepId) {
          result.status = 'success';
        }
      }
    } catch (error) {
      result.message = error.message;
    }
  } else {
    result.message = validation.message;
  }

  const header = {
    'Access-Control-Allow-Origin': '*',
    'content-type': 'application/json',
    accept: 'text/html',
  };

  res.writeHead(200, header);
  res.write(JSON.stringify(result));
  res.end();
});
router.put('/', async (req, res) => {
  const result = {
    status: 'error',
    message: '',
    data: {},
  };

  const requiredOption = {
    type: 'isLength',
    option: {
      min: 1,
    },
  };
  const requiredParam = {
    id: [
      requiredOption,
      {
        type: 'isMongoId',
      },
    ],
    task: [
      requiredOption,
    ],
    date: [
      requiredOption,
      {
        type: 'isISO8601',
      },
    ],
    estimate: [
      requiredOption,
      {
        type: 'isNumeric',
        option: { no_symbols: false },
      },
    ],
  };

  const validation = validate(requiredParam, req.body);
  if (validation.flag === true) {
    const {
      id,
      task,
      date,
      estimate,
    } = req.body;
    const dataId = new mongoose.Types.ObjectId(id);
    const updateData = await Task.findOne({ _id: dataId });
    if (updateData !== null) {
      updateData.task = task;
      updateData.date = date;
      updateData.estimate = estimate;
      try {
        const update = await updateData.save();
        if (update) {
          result.status = 'success';
        }
      } catch (error) {
        result.message = error.message;
      }
    } else {
      result.message = 'Task not found';
    }
  } else {
    result.message = validation.message;
  }

  const header = {
    'Access-Control-Allow-Origin': '*',
    'content-type': 'application/json',
    accept: 'text/html',
  };

  res.writeHead(200, header);
  res.write(JSON.stringify(result));
  res.end();
});
router.delete('/:id', async (req, res) => {
  const result = {
    status: 'error',
    message: '',
    data: {},
  };

  const requiredOption = {
    type: 'isLength',
    option: {
      min: 1,
    },
  };
  const requiredParam = {
    id: [
      requiredOption,
      {
        type: 'isMongoId',
      },
    ],
  };

  const validation = validate(requiredParam, req.params);
  if (validation.flag === true) {
    const {
      id,
    } = req.params;
    const dataId = new mongoose.Types.ObjectId(id);
    const data = await Task.findOne({ _id: dataId });
    if (data !== null) {
      try {
        const del = await data.remove();
        if (del) {
          result.status = 'success';
        }
      } catch (error) {
        result.message = error.message;
      }
    } else {
      result.message = 'Task not found';
    }
  } else {
    result.message = validation.message;
  }

  const header = {
    'Access-Control-Allow-Origin': '*',
    'content-type': 'application/json',
    accept: 'text/html',
  };

  res.writeHead(200, header);
  res.write(JSON.stringify(result));
  res.end();
});
export default router;
