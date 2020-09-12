$(function() {
    var form = layui.form
    var layer = layui.layer
        // 基本资料表单验证
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！'
            }
        }
    })

    initUserInfo()
        // 后台获取用户信息
    function initUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            method: 'GET',
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 把获取到的信息展示到页面中
                form.val('formUserInfo', res.data)
            }
        })
    }

    // 重置按钮功能
    $('#btnReset').on('click', function(e) {
        // 阻止表单默认行为
        e.preventDefault()
            // 调用ajax获取数据函数
        initUserInfo()
    })

    $('.layui-form').submit(function(e) {
        e.preventDefault()
        $.ajax({
            url: '/my/userinfo',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                console.log(res); //获取用户信息成功
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 首页上欢迎后面的用户名根据更改的信息改变
                window.parent.getUserInfo()

            }
        })
    })
})