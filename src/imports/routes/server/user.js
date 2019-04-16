import mongoose from 'mongoose';
import User from 'imports/classes/User';
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
    result.data = await User.find();
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
    name: [
      requiredOption,
    ],
  };

  const validation = validate(requiredParam, req.body);
  if (validation.flag === true) {
    const {
      name,
    } = req.body;
    const newData = new User();
    newData.name = name;
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
    name: [
      requiredOption,
    ],
  };

  const validation = validate(requiredParam, req.body);
  if (validation.flag === true) {
    const {
      id,
      name,
    } = req.body;
    const dataId = new mongoose.Types.ObjectId(id);
    const updateData = await User.findOne({ _id: dataId });
    if (updateData !== null) {
      updateData.name = name;
      try {
        const update = await updateData.save();
        if (update) {
          result.status = 'success';
        }
      } catch (error) {
        result.message = error.message;
      }
    } else {
      result.message = 'User not found';
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
    const data = await User.findOne({ _id: dataId });
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
      result.message = 'User not found';
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
