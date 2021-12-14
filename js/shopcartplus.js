/*购物车js文件*/
$(function() {
    //把三个类型的input先分别获取
    var $theadinput = $('thead input[type=checkbox]'); //表头中的全选框
    var $tbodyinputs = $('tbody input[type=checkbox]'); //表格中的每一行的选择框
    var $totalpriceinput = $('.totalprice input[type=checkbox]'); //计算总价中的全选框
    /*全选*/

    //表头的全选
    $theadinput.change(function() {
        var checkstate = $(this).prop('checked'); //获取全选框的选中状态
        $tbodyinputs.prop('checked', checkstate); //把状态给表格中的选择框
        $totalpriceinput.prop('checked', checkstate); //把状态给计算总价的全选框

        alltotal(); //总计
    });


    //计算总价的全选
    $totalpriceinput.change(function() {
        var checkstate = $(this).prop('checked'); //获取总价的全选框的状态
        $theadinput.prop('checked', checkstate); //赋值给表头的选择框
        $tbodyinputs.prop('checked', checkstate); //赋值给表格中的选择框

        alltotal(); //总计
    })


    //反选
    $tbodyinputs.change(function() { //给表格中的单选框绑定事件
        var flag = true; //定义标杆为true
        $tbodyinputs.each(function(index, input) { //循环表格input
            var checkstate = $(this).prop('checked'); //获取选中状态
            if (checkstate === false) { //如果有一个等于false
                flag = false; //标杆等于false(全选状态变为false)
            }
        })
        $theadinput.prop('checked', flag); //把状态赋值给头部全选框
        $totalpriceinput.prop('checked', flag); //把状态赋值给计算总价全选框

        alltotal(); //总计
    })

    //加法功能
    $('.add').click(function() { //给增加绑定事件
        var count = parseInt($(this).next().val()); //取后面输入框的值
        count++; //自增
        $(this).next().val(count); //把自增的值赋值给输入框

        //小计
        subtotal($(this), count);
        alltotal(); //总计
    })

    //减法功能
    $('.reduce').click(function() { //给减少绑定事件
        var count = parseInt($(this).prev().val()); //取后面输入框的值
        count--; //自减
        count = count < 1 ? 1 : count; //边界判断
        $(this).prev().val(count); //把自减的值赋值给输入框

        //小计
        subtotal($(this), count);

        alltotal(); //总计
    })



    //小计的封装
    function subtotal(dom, count) {
        var singleprice = parseFloat(dom.closest('tr').find('.price').text()); //找到单价
        var subtotalprice = singleprice * count; //单价*数量=小计
        dom.closest('tr').find('.subprice').text(subtotalprice.toFixed(2)); //把小计的结果放到对应的位置，结果保留两位小数
    }

    //总计功能实现
    function alltotal() {
        var allprice = 0; //定义一个变量用于保存总价
        var selectedcount = 0; //定义一个变量用于保存商品数量 
        $('tbody input[type=checkbox]').each(function() { //获取表格里面的选择框循环
            var checkstate = $(this).prop('checked'); //获取选中状态
            if (checkstate) { //如果这是true
                allprice += parseFloat($(this).closest('tr').find('.subprice').text()); //累加这一行的小计
                selectedcount++; //数量加一
            }
        })

        //渲染
        $('.total').text(allprice.toFixed(2)); //渲染总价
        $('.count').text(selectedcount); //渲染数量
    }

    //删除功能的实现

    //删除
    $('.del').click(function() {
        $(this).closest('tr').remove(); //删除
        getgoodscount(); //重新调用一次
        alltotal(); //计算总价
    })

    //删除选中
    $('.deletechecked').click(function() {
            $('tbody input[type=checkbox]').each(function() { //获取表格里面的选择框循环
                var checkstate = $(this).prop('checked'); //获取选中状态
                if (checkstate) { //如果这是true
                    $(this).closest('tr').remove(); //删除
                }
            })
            getgoodscount(); //重新计算商品数量
            alltotal(); //计算总价
        })
        //封装一个获取全部选中的函数
    function getgoodscount() {
        //获取数量
        var goodscount = $('table tbody tr').length;
        //渲染
        $('.goodscount').text(goodscount);
    }
    getgoodscount(); //页面加载调用一次


})