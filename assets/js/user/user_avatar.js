$(function() {
    var layer = layui.layer
        // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
        // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    // 点击上传按钮时,模拟人点击file上传文件
    $('#btnChooseImage').click(function() {
        $('#file').click()
    })

    // 监听file是否选择文件
    $('#file').change(function(e) {
        console.log(e);
        // 获取选择的文件信息
        var filelist = e.target.files
        console.log(filelist);

        if (filelist.length === 0) {
            return layer.msg('请选择需要上传的图片')
        }
        // 获取到选择的文件信息,拿到用户选择的图片
        var file = e.target.files[0]
        console.log(file);

        // 根据选择的文件，创建一个对应的 URL 地址
        var newImgURL = URL.createObjectURL(file)
            // 先`销毁`旧的裁剪区域，再`重新设置图片路径`，之后再`创建新的裁剪区域`
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域

    })

    $('#btnUpload').on('click', function() {
        console.log(123);

        // 获取到用户裁剪的图片
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

        $.ajax({
            url: '/my/update/avatar',
            method: 'POST',
            data: {
                avatar: dataURL
            },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                window.parent.getUserInfo()
            }
        })
    })









})