$(function() {
    var layer = layui.layer
    var form = layui.form

    initArtCateList()
        // 后台获取数据
    function initArtCateList() {
        $.ajax({
            url: '/my/article/cates',
            method: 'GET',
            data: {},
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 模板引擎渲染页面
                var temp = template('tpl-table', res)
                $('tbody').html(temp)
            }
        })
    }

    // 添加类别按钮点击弹出弹层
    var indexAdd = null
    $('#btnAddCate').on('click', function() {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '300px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()

        });
    })

    // 添加文章分类
    $('body').on('submit', '#form-add', function(e) {
        e.preventDefault()
        $.ajax({
            url: '/my/article/addcates',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('添加失败')
                }
                layer.msg('添加成功')
                initArtCateList()
                    // 根据索引，关闭对应的弹出层
                layer.close(indexAdd)
            }
        })

    })

    // 修改文章分类
    var indexEdit = null
    $('body').on('click', '.btn-edit', function() {

        indexEdit = layer.open({
            type: 1,
            area: ['500px', '300px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        })

        var id = $(this).attr('data-id')

        $.ajax({
            url: '/my/article/cates/' + id,
            method: 'GET',
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                form.val('edit-form', res.data)

            }
        })

    })

    // 确认修改
    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault()

        $.ajax({
            url: '/my/article/updatecate',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)

                initArtCateList()

                layer.close(indexAdd)
            }
        })
    })

    // 删除
    $('body').on('click', '#btn-delete', function() {
        var id = $(this).attr('data-id')
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {

            $.ajax({
                url: '/my/article/deletecate/' + id,
                method: 'GET',
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg(res.massage)
                    }
                    layer.msg('删除成功')
                    initArtCateList()
                    layer.close(index)
                }
            })
        })
    })
})