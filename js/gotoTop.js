/*返回顶部功能封装*/
//当页面加载完成
$(function() {
    //把函数 挂在window上 暴露出去
    window.gototop = function(options) {

        //默认参数（看看）
        var defaults = {
                bottom: '100px'
            }
            //参数合并
        var params = $.extend({}, defaults, options)

        //准备结构
        var $gotoTopHtml = $(`<div class="backtotop"><img src="../img/gototop_05.jpg" alt ="" ></div>`);
        //写样式定位
        $gotoTopHtml.css({
            width: '30px',
            height: '50px',
            position: 'fixed',
            bottom: params.bottom,
            left: '610px',
            marginLeft: '50%',
            display: 'none',
        });

        //返回顶部的JS代码
        /* 返回顶部 */
        //绑定滚动事件
        $(document).scroll(function() {
                //获取距离顶部的位置
                var topDistance = $('html, body').scrollTop();
                //判断
                if (topDistance > 500) {
                    $('.backtotop').fadeIn();
                } else {
                    $('.backtotop').fadeOut();
                }
            })
            //返回顶部功能(动态添加的元素 需要使用事件委托 才能绑定事件)
        $('body').on('click', '.backtotop', function() {
            $('html,body').animate({
                scrollTop: 0
            }, 300)
        })




        //追加到页面的尾部
        $('body').append($gotoTopHtml)
    }
})