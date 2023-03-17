import axios from "axios";
function axioses(url, data = {}, type = "GET") {
  var newAxios = axios.create({
    // 新的基础配置  选择性配置
    // 如URI
    //             baseURL:"http://localhost:4000",
    // timeout: 1000,
    headers: { "Content-Type": "application/json" }
  }); // 请求拦截器
  newAxios.interceptors.request.use(
    config => {
      // console.log("请求拦截器");
      return config;
    },
    err => {
      return Promise.reject(err);
    }
  ); // 添加响应拦截器
  newAxios.interceptors.response.use(
    res => {
      // res 响应结果
      // console.log("响应拦截器");
      return res;
    },
    err => {
      return Promise.reject(err);
    }
  );
  return new Promise(function (resolve, reject) {
    const token = JSON.parse(sessionStorage.getItem('token'))['aiHorizon'] || null;
    // 执行异步ajax请求
    let promise;
    if (type === "GET") {
      // 准备url query参数数据
      let dataStr = ""; //数据拼接字符串
      Object.keys(data).forEach(key => {
        dataStr += key + "=" + data[key] + "&";
      });
      if (dataStr !== "") {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf("&"));
        url = url + "?" + dataStr;
      }
      // 发送get请求
      promise = axios.get(url, { headers: { token: token } });
    } else if (type === "DELETE") {
      // 准备url query参数数据
      let dataStr = ""; //数据拼接字符串
      Object.keys(data).forEach(key => {
        dataStr += key + "=" + data[key] + "&";
      });
      if (dataStr !== "") {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf("&"));
        url = url + "?" + dataStr;
      }
      // 发送get请求
      promise = axios.delete(url, { headers: { token: token } });
    } else if (type === "PUT") {
      promise = axios.put(url, data, { headers: { token: token } });
      // console.log(promise);
    } else {
      // 发送post请求
      // console.log(data);
      promise = axios.post(url, data, { headers: { token: token } });
    }
    promise
      .then(function (response) {
        // 成功了调用resolve()
        resolve(response.data);
      })
      .catch(function (error) {
        //失败了调用reject()
        reject(error);
      });
  });
}
function axiosFiles(url, data = {}, type = "GET") {
  // 创建一个新的axios（不能取消请求）
  var newAxios = axios.create({
    // 新的基础配置  选择性配置
    // 如URI
    //             baseURL:"http://localhost:4000",
    // timeout: 1000,
    headers: { "Content-Type": "multipart/form-data" }
  }); // 请求拦截器
  newAxios.interceptors.request.use(
    config => {
      // console.log("请求拦截器");
      return config;
    },
    err => {
      return Promise.reject(err);
    }
  ); // 添加响应拦截器
  newAxios.interceptors.response.use(
    res => {
      // res 响应结果
      // console.log("响应拦截器");
      return res;
    },
    err => {
      return Promise.reject(err);
    }
  ); // 请求 // 请求地址：baseURL+url // 其它和 正常的axios一样
  return new Promise(function (resolve, reject) {
    const token = window.sessionStorage.getItem("token") || null;
    // 执行异步ajax请求
    let promise;
    if (type === "GET") {
      // 准备url query参数数据
      let dataStr = ""; //数据拼接字符串
      Object.keys(data).forEach(key => {
        dataStr += key + "=" + data[key] + "&";
      });
      if (dataStr !== "") {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf("&"));
        url = url + "?" + dataStr;
      }
      // 发送get请求
      promise = axios.get(url, { headers: { token: token } });
    } else {
      // 发送post请求

      let files = data.getAll("files");
      let isHomeImg = data.get("isHomeImg");
      let courId = data.get("courId");
      // console.log(files,isHomeImg,courId)
      data.files = files;
      // data.isHomeImg = isHomeImg
      // console.log(data)
      // promise = axios.post(url,qs.stringify(data),{headers: {'token':token }})
      promise = axios.post(url, data, {
        headers: { token: token, isHomeImg: isHomeImg, courId: courId }
      });
    }
    promise
      .then(function (response) {
        // 成功了调用resolve()
        resolve(response.data);
      })
      .catch(function (error) {
        //失败了调用reject()
        reject(error);
      });
  });
}

export default { axioses, axiosFiles };
