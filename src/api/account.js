import service from "../utils/request";

/**
 * 登录接口
 */

export function Login(data) {
    return service.request({
        url: "/login/",
        method: "post",
        data: data, //请求类型为post时的写法
        // params: data //请求类型为get时的写法
    })
}

/**
 * 验证码接口
 */

export function GetCode(data) {
    return service.request({
        url: "/getSms/",
        method: "post",
        data: data, //请求类型为post时的写法
        // params: data //请求类型为get时的写法
    })
}