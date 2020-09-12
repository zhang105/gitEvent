 $.ajaxPrefilter(function(options) {
             //  console.log(options);
             options.url = 'http://ajax.frontend.itheima.net' + options.url
                 //  统一为有权限的接口设置headers请求头
             if (options.url.indexOf('/my/') !== -1) {
                 options.headers = { Authorization: localStorage.getItem('token') || '' }
             }
             options.complete = function(res) {
                 //  console.log(res);
                 if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                     // 强制清除内地缓存内容
                     localStorage.removeItem('token')
                         // 强制调转到登录页面
                     location.href = "/login.html"
                 }
             })