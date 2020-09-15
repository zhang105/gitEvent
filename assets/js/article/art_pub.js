$(function() {
    var layer = layui.layer
    var form = layui.form

    initCate()

    function initCate() {
        $.ajax({
            url: '/my/article/cates',
            method: 'GET',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                //  模板引擎渲染
                var temp = template('tpl-cate', res)
                $('[name=cate_id]').html(temp)
                    // 一定要记得调用 form.render() 方法
                form.render()
            }
        })
    }
    // 初始化富文本编辑器
    initEditor()

    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    // 选择需要上传的文件
    $('#btnChooseImage').click(function() {
        $('#file').click()
    })

    // 监听 coverFile 的 change 事件，获取用户选择的文件列表
    $('#file').on('change', function(e) {
        // 获取到文件的列表数组
        var files = e.target.files
            // 判断用户是否选择了文件
        if (files.length === 0) {
            return
        }
        // 根据文件，创建对应的 URL 地址
        var newImgURL = URL.createObjectURL(files[0])
            // 为裁剪区域重新设置图片
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })


    var art_state = '已发布'
    $('#btnSave2').on('click', function() {
        art_state = '草稿 '
    })

    $('#form-pub').on('submit', function(e) {
        e.preventDefault
        var fd = new FormData($(this)[0])
            // 将文章的发布状态，存到 fd 中
        fd.append('state', art_state)

        $image.cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function(blob) { // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img', blob)
                publishArticle(fd)
            })

        // 打印查看数据是否处理成功
        // fd.forEach(function(v, k) {
        //     console.log(v, k);
        // })
    })

    // 发布文章数据请求
    function publishArticle(fd) {
        $.ajax({
            url: '/my/article/add',
            method: 'POST',
            data: fd,
            contentType: false,
            processData: false,
            success: function(res) {
                console.log(res);

                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('发布文章成功')
                    // 跳转到页面
                location.href = '/article/art_list.html'
            }
        })
    }
})