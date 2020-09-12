$(function() {
    var form = layui.form
    var layer = layui.layer

    // 密码表单验证
    form.verify({
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],

        samepwd: function(value) {
            if (value === $('[name=oldpwd]').val()) {
                return '新旧密码不能相同'
            }
        },

        repwd: function(value) {
            if (value !== $('[name=newpwd]').val()) {
                return '两次密码输入不一致'

            }
        }
    })

    // 重置密码
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()

        $.ajax({
            url: '/my/updatepwd',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                    // 修改成功之后把表单重置,表单里的内容重置为空
                $('.layui-form')[0].reset()
                    // 缓存清空
                localStorage.remove('token')
                    // 跳转到登录页面
                top.window.location.href = '/login.html'
            }
        })
    })
})