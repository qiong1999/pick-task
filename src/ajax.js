function ajax(options) {
 
  //创建ajax对象
  let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
  let xhr = new XMLHttpRequest();
  xhr.withCredenticals = true;
  //拼接请求参数的变量

  let params = "";
  for (let attr in options.data) {
    params += attr + "=" + options.data[attr] + "&";
  }
  //将参数最后的&截取掉
  params = params.substr(0, params.length - 1);
  if (options.type === "get") {
    options.url = options.url + "?" + params;
  }
  //配置ajax对象
  xhr.open(options.type, options.url);
  if (options.type === "post") {
      let contentType = options.header['Content-Type']
      //设置请求类型格式
      //console.log(contentType)
      xhr.setRequestHeader('Content-Type',contentType);
      if(contentType ==='application/json'){
          //console.log("yes",options.data)
          xhr.send(JSON.stringify(options.data))
      }else{
        xhr.send(params);
      }
    
  } else {
    //发送请求
    xhr.send();
  }

  //监听xhr对象下面的onload事件
  //当xhr对象接收完响应数据后触发
  xhr.onload = function () {
   if(xhr.status=== 200){
       options.success(xhr.responseText);
   }else{
       options.error(xhr.responseText,xhr)
   }
  };
}
export default ajax;
