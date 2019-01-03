//常用表单验证规则
// 手机号验证
const checkTel = (rule, value, callback) => {
  if (rule.required) {
    if (!value) {
      return callback(new Error("请填写手机号"));
    }
  }
  const reg = /^1[3|4|5|8][0-9]\d{4,8}$/;

  if (!reg.test(value)) {
    return callback(new Error("手机号码格式错误"));
  }
  return callback();
};

// 手机号验证
const checkMail = (rule, value, callback) => {
  if (rule.required) {
    if (!value) {
      return callback(new Error("请填写邮箱号"));
    }
  }
  const reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"/;

  if (!reg.test(value)) {
    return callback(new Error("邮箱格式错误"));
  }
  return callback();
};

export { checkTel, checkMail };

