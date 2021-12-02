/*购物车js文件*/
$(function() {

    //定义三个变量
    var $theadinput = $('table thead input[type=checkbox]'); //头部选择框
    var $bodyinput = $('table tbody input[type=checkbox]'); //中间选择框
    var $allpriceinput = $('.totalprice input[type=checkbox]'); //尾部选择框



    $theadinput.change(function() {
        //获取选中状态
        var state = $(this).prop('checked');


        //让选择框保持一致
        $bodyinput.prop('checked', state);
        $allpriceinput.prop('checked', state);

    })

    //结算中的选择框也应该保持一致

    $allpriceinput.change(function() {
        //获取选中状态
        var state = $(this).prop('checked');

        //上面的全选和结算中的选择框也应该一致
        $bodyinput.prop('checked', state);
        $theadinput.prop('checked', state);
    })

    //表单中的选中状态 反过来影响全选
    $bodyinput.change(function() {

        //定义一个标杆
        var flag = true;
        //总价
        var totalprice = 0;

        //循环表格选择框的选中状态
        $bodyinput.each(function(i, input) {
            if (!$(input).prop('checked')) { //只要有一个选择框没有选中那就是false
                flag = false;
            } else {
                totalprice += parseFloat($(this).closest('tr').find('.subprice').text());
            }
        })

        //把状态用来改变全选框
        $theadinput.prop('checked', flag)
        $allpriceinput.prop('checked', flag)

        //渲染到总价对应的位置
        $('.total').text(totalprice.toFixed(2))

    })

    //数量的加减
    $('.add').on('click', function() {
        //下一个input节点
        var $nextinput = $(this).next();
        //获取输入框的值
        var oldval = parseInt($nextinput.val());
        //自增
        oldval++;
        //重新赋值给这个加减框
        $nextinput.val(oldval);


        //小计
        var subtotal = oldval * parseFloat($(this).closest('tr').find('.price').text());

        //把小计放入对应的dom里面
        $(this).closest('tr').find('.subprice').text(subtotal.toFixed(2));
    })

    $('.reduce').on('click', function() {
        //上一个input节点
        var $previnput = $(this).prev();
        //获取输入框的值
        var oldval = parseInt($previnput.val());
        //自减
        oldval--;
        oldval = oldval < 1 ? 1 : oldval;

        //重新赋值给这个加减框
        $previnput.val(oldval)

        //小计
        subtotalprice(oldval, $(this));
    })

    //抽取一个小计的函数
    function subtotalprice(val, dom) {
        var subtotal = val * parseFloat(dom.closest('tr').find('.price').text());
        //把小计的结果 放入dom对应的位置
        dom.closest('tr').find('.subprice').text(subtotal.toFixed(2));
    }



    //删除
    $('.del').click(function() {
        //删除整行
        $(this).closest('tr').remove();
    })

    //计算总价的函数





})