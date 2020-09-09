$(function() {
    $('#link_reg').on('click', function() {
        $('.reg-box').show()
        $('.login-box').hide()
    })
    $('#link_login').on('click', function() {
        $('.reg-box').hide()
        $('.login-box').show()
    })

    //自定义表单验证规则
    var form = layui.form
    form.verify({
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repassword: function(value) {
            //获取到密码框的值
            var pwd = $('.reg-box [name=password]').val()
                //判断再次输入密码框和密码框的里是否一样,不一样直接return出去
            if (pwd !== value) {
                return '两次密码输入不一致'
            }
        }
    })
})