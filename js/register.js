/*注册功能*/

$(function() {
    //调用表单插件
    $('#registerform').validate({
        //验证规则
        rules: {
            username: {
                required: true, //非空
                rangelength: [4, 8] //长度
            },
            //验证密码
            password: {
                required: true, //非空
                ispassword: true //自定义的密码验证

            },
            //确认密码
            checkpassword: {
                required: true, //非空
                equalTo: "#password" //验证密码的一致性
            },
            //电话号码
            tel: {
                required: true, //非空
                istel: true //自定义的电话号码验证
            }

        },
        //提示信息
        messages: {
            //用户名提示信息
            username: {
                required: '用户名不能为空', //非空提示
                rangelength: '长度在4~8位', //长度提示
            },
            //密码的提示信息
            password: {
                required: '密码不能为空', //非空提示
                ispassword: '输入5-10个,以字母开头、可带数字、“_”、 “.” 的字符串' //密码格式提示
            },
            //确认密码提示信息
            checkpassword: {
                required: '请再次输入密码', //非空
                equalTo: '两次密码不一致' //密码一致性
            },
            //电话号码提示信息
            tel: {
                required: '电话号码不能为空',
                istel: '电话号码格式不正确'
            }
        }
    })

    //密码自定义验证
    jQuery.validator.addMethod("ispassword", function(value, element) {
        var pwdReg = /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,9}$/;
        return this.optional(element) || (pwdReg.test(value));
    });
    //手机号码自定义验证
    jQuery.validator.addMethod("istel", function(value, element) {
        var telReg = /^[1]+[3,8,5,7]+\d{9}$/;
        return this.optional(element) || (telReg.test(value));
    });





})