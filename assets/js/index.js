$(function() {
    getUserInfo()
        // 后台获取用户信息
    function getUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            method: 'get',
            // headers: {
            //     Authorization: localStorage.getItem('token') || ''
            // },
            success: function(res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg('获取用户信息失败！')
                }
                renderAvatar(res.data)
            },
            // 不论请求数据成功或者失败都会调用complete
            complete: function(res) {
                console.log(res);
                if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                    // 强制清除内地缓存内容
                    localStorage.removeItem('token')
                        // 强制调转到登录页面
                    location.href = "/login.html"
                }

            }
        })
    }

    //渲染头像
    function renderAvatar(user) {
        // console.log(user);
        // 设置欢迎的文本
        var name = user.nickname || user.username
        $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
            // 渲染头像
            // 用户设置了头像时，用户设置的头像显示，文字头像隐藏
        if (user.user_pic !== null) {
            $('.layui-nav-img').attr('src', user.user_pic).show()
            $('.text-avatar').hide()
        } else {
            $('.layui-nav-img').hide()
            $('.text-avatar').html(name[0].toUpperCase()).show()
        }

    }
    // 退出功能
    $('#btnLogout').on('click', function() {
        layer.confirm('确认退出登录?', { icon: 3, title: '提示' }, function(index) {
            // 点击确认时,把缓存中的数据删除
            localStorage.removeItem('token')
                // 页面跳转到登录页面
            location.href = '/login.html'

            layer.close(index);
        });

    })
})