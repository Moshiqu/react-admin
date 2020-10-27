//正则
const reg_email = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
const reg_password = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;

// 密码验证
export const validate_password = reg_password;

//邮箱验证
export function validate_email(value) {
    return reg_email.test(value)
}

//密码验证
export function validate_pwd(value) {
    return reg_password.test(value);
}