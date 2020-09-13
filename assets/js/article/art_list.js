$(function() {
    var layer = layui.layer
    var form = layui.form
        // 定义一个查询的参数对象，将来请求数据的时候，
        // 需要将请求参数对象提交到服务器
    var q = {
        pagenum: 1, // 页码值，默认请求第一页的数据
        pagesize: 2, // 每页显示几条数据，默认每页显示2条
        cate_id: '', // 文章分类的 Id
        state: '' // 文章的发布状态
    }

    // 定义美化时间的过滤器
    template.defaults.imports.dataFormat = function(date) {
        const dt = new Date(date)

        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }

    // 定义补零的函数
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }

    initTable()
        // 获取文章列表数据的方法
    function initTable() {
        $.ajax({
            url: '/my/article/list',
            method: 'GET',
            data: q,
            success: function(res) {

                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                var temp = template('tpl-table', res)
                $('tbody').html(temp)
            }

        })
    }

    // 定义 initCate 函数请求文章分类的列表数据
    initCate()

    function initCate() {
        $.ajax({
            url: '/my/article/cates',
            method: 'GET',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 模板引擎渲染页面
                var temp = template('tpl-cate', res)
                $('[name=cate_id]').html(temp)
                    // 通过 layui 重新渲染表单区域的UI结构
                form.render()
            }
        })
    }

    // 为筛选表单绑定 submit 事件
    $('#form-search').on('submit', function(e) {
        e.preventDefault()
            // 获取表单中选中项的值
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()
            // 为查询参数对象 q 中对应的属性赋值
        q.cate_id = cate_id
        q.state = state
            // 根据最新的筛选条件，重新渲染表格的数据
        initTable()
    })







})