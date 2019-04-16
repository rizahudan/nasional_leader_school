import validator from 'validator';

const validate = (validateOption, data) => {
  const result = {
    flag: false,
    message: '',
  };
  const validation = Object.keys(validateOption).every((name) => {
    if (typeof data[name] === 'undefined') {
      result.message = `Parameter ${name} is required`;
      return false;
    }
    const val = String(data[name]);

    const option = validateOption[name];
    const res = option.every((opt) => {
      if (typeof opt.option !== 'undefined') {
        return validator[opt.type](val, opt.option);
      }
      return validator[opt.type](val);
    });
    result.message = `Parameter ${name} has illegal value`;
    return res;
  });
  result.flag = validation;
  return result;
};

export default validate;
