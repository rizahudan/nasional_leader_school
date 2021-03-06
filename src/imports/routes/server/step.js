import mongoose from 'mongoose';
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

  try {
    result.data = await Step.find();
    result.status = 'success';
  } catch (error) {
    result.message = error.message;
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
    taskId: [
      requiredOption,
      {
        type: 'isMongoId',
      },
    ],
    startDate: [
      requiredOption,
      {
        type: 'isISO8601',
      },
    ],
    hours: [
      requiredOption,
      {
        type: 'isNumeric',
        option: { no_symbols: false },
      },
    ],
    desc: [
      requiredOption,
    ],
    deliverable: [
      requiredOption,
    ],
    by: [
      requiredOption,
    ],
  };

  const validation = validate(requiredParam, req.body);
  if (validation.flag === true) {
    const {
      taskId,
      startDate,
      hours,
      desc,
      deliverable,
      by,
    } = req.body;
    const newData = new Step();
    newData.taskId = taskId;
    newData.startDate = startDate;
    newData.hours = hours;
    newData.desc = desc;
    newData.deliverable = deliverable;
    newData.by = by;
    try {
      const stepId = await newData.save();
      if (stepId) {
        result.status = 'success';
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
    taskId: [
      requiredOption,
      {
        type: 'isMongoId',
      },
    ],
    startDate: [
      requiredOption,
      {
        type: 'isISO8601',
      },
    ],
    hours: [
      requiredOption,
      {
        type: 'isNumeric',
        option: { no_symbols: false },
      },
    ],
    desc: [
      requiredOption,
    ],
    deliverable: [
      requiredOption,
    ],
    by: [
      requiredOption,
    ],
  };

  const validation = validate(requiredParam, req.body);
  if (validation.flag === true) {
    const {
      id,
      taskId,
      startDate,
      hours,
      desc,
      deliverable,
      by,
    } = req.body;
    const dataId = new mongoose.Types.ObjectId(id);
    const updateData = await Step.findOne({ _id: dataId });
    if (updateData !== null) {
      updateData.taskId = taskId;
      updateData.startDate = startDate;
      updateData.hours = hours;
      updateData.desc = desc;
      updateData.deliverable = deliverable;
      updateData.by = by;
      try {
        const update = await updateData.save();
        if (update) {
          result.status = 'success';
        }
      } catch (error) {
        result.message = error.message;
      }
    } else {
      result.message = 'Step not found';
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
    const stepId = new mongoose.Types.ObjectId(id);
    const data = await Step.findOne({ _id: stepId });
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
      result.message = 'Step not found';
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
