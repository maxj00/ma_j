jQuery(function () {
    $("#top5 dl:first dt").hide();
    $("#top5 dl:first dd").show();
    $("#top5 dl dt").mouseover(function () {
        $("#top5 dl dt").show();
        $("#top5 dl dd").hide();
        $(this).hide().siblings("dd").show();

    });
});
jQuery(function () {
    $(".goods_list dl:nth-child(4n)").css({ margin: "10px 0 0 10px" });
    $(".goods_list dl").hover(function () {
        $(".goods_list dl").removeClass("hover");
        $(this).addClass("hover");
    });
});
jQuery(function () {
    $(".attrSelect li").each(function () {
        if ($(this).children("dl").find("dd").length > 10) {
            $(this).append("<span class=\"more\">展开</span>");
            $(this).children("dl").height(60);
            $(this).children(".more").toggle(function () {
                $(this).siblings("dl").css({ height: "auto" });
                $(this).html("收起")
            }, function () {
                $(this).siblings("dl").height(60);
                $(this).html("展开")
            });
        }
    });
});
function isIEc() {
    var uas = navigator.userAgent.toLowerCase();
    check = function (r) {
        return r.test(uas);
    }
    isOpera = check(/opera/);
    isIE = !isOpera && check(/msie/);
    if (!isIE) {
        event.preventDefault();
    }
    else {
        window.event.cancelButton = true;
    }
}
jQuery(function () {
    var $backToTopTxt = "", $backToTopEle = $('<div class="gotop"></div>').appendTo($("body"))
        .text($backToTopTxt).attr("title", $backToTopTxt).click(function () {
            $("html, body").animate({ scrollTop: 0 }, 1000);
        }), $backToTopFun = function () {
            var st = $(document).scrollTop(), winh = $(window).height();
            (st > 0) ? $backToTopEle.fadeIn() : $backToTopEle.fadeOut();
            if (!window.XMLHttpRequest) {
                $backToTopEle.css("top", st + winh - 166);
            }
        };
    $(window).bind("scroll", $backToTopFun);
    $(function () { $backToTopFun(); });
});


//category_select.js

$(".selectli .toggle_ooc").click(function () {
    if ($(this).hasClass("close")) {
        $(this).removeClass("close");
        $(this).siblings("ul").css("height", "36px");
    } else {
        $(this).addClass("close");
        $(this).siblings("ul").css("height", "auto");
    }
});

//菜单二级目录
$(".navg .nav_name").hover(function() {
    $(this).children("div").slideDown(100);
    $(this).children(".unselect_arr").addClass("select_arr");
}, function() {
    $(this).children('div').slideUp(100);
    $(this).children(".unselect_arr").removeClass("select_arr");
});

//左侧搜索分类js特效
$(".thirdhide").eq(0).show();
$(".secondhide:gt(0)").hide();
$(".thirdhide:gt(0)").hide();
$(".first_icon").click(function () {
    $(this).siblings('div').slideToggle(0).siblings('div').slideUp(0);
});

$(".second_icon").click(function () {
    $(this).siblings('div').slideToggle(0).siblings('div').slideUp(0);
});

//提示函数
var showTip = function($el, txt) {
    var elLeft = $el.offset().left;
    var elTop = $el.offset().top;

    if ($("#filterTip").length > 0) {
        $("#filterTip").remove();
    }
    $(document.body).append('<div id="filterTip" >' + txt + '</div>');
    var $tipDom = $("#filterTip");

    var left = elLeft - (($tipDom.width() - $el.width()) / 2) + 20;
    var top = elTop - 20;

    $tipDom.css({
        left: left,
        top: top
    }).fadeIn(300, function() {
        if (typeof(filterTimer) != "undefined") {
            clearTimeout(filterTimer);
        }
        var filterTimer = setTimeout(function() {
            $tipDom.fadeOut(300);
        }, 2500);
    });
};

function openMoreModel() {
    var more_model = $(".more_model a");
    if (more_model.hasClass("on")) {
        jQuery(".more_model a").html("关闭多选模式");
        more_model.removeClass("on");
        more_model.addClass("off")
        jQuery(".checkbox").css({ display: "inline-block" });
        jQuery(".select_c  a").removeClass("font_color");
        jQuery("#query_subimt").show();
        jQuery("#make_sure").attr("disabled", "disabled");
        jQuery("#make_sure").addClass("disabled");
        jQuery.cookie(filterTypeCookieName, "on", { expires: 30 });
    } else if (more_model.hasClass("off")) {
        more_model.removeClass("off");
        more_model.addClass("on");
        jQuery(".select_c  a").removeClass("font_color");
        jQuery(".more_model a").html("开启多选模式");
        jQuery(".checkbox").hide();
        jQuery("#query_subimt").hide();
        jQuery("#make_sure").attr("disabled", "disabled");
        jQuery("#make_sure").addClass("disabled");
        jQuery.cookie(filterTypeCookieName, "off", { expires: 30 });
    }
}
//判断选中条件的长度
function selectedLength() {
    var obj = jQuery(".select_c .font_color");
    var length = obj.length;
    //总共筛选的条件
    if (length == 0) {
        jQuery("#make_sure").attr("disabled", "disabled");
        jQuery("#make_sure").addClass("disabled");
    } else {
        jQuery("#make_sure").removeAttr("disabled");
        jQuery("#make_sure").removeClass("disabled");
    }
}

$(function () {

    //#region 对搜索结果的标的关键字添加样式
    //var keyWords = $("#txSearchCondition").val();
    //if (keyWords.length > 0) {
    if (typeof (keyWords) != 'undefined' && keyWords instanceof Array && keyWords.length > 0) {
        $("p.goods_name > a").each(function () {
            var oHtml = $(this).html() + "_" + $(this).html();
            var oTxt = oHtml.substring(0, oHtml.indexOf("<"));
            var oSubTxt = oHtml.substring(oHtml.indexOf("<"), oHtml.length);
            for (var k in keyWords) {
                var w = $.trim(keyWords[k] || "");
                var regExp = new RegExp(w, "ig");
                var findList = $.unique(oTxt.match(regExp) || []);
                $.each(findList, function (i, ostr) {
                    var ostrRegExp = new RegExp(ostr, "g");
                    oTxt = oTxt.replace(ostrRegExp, '<b style="color:#f00;">' + ostr + '</b>');
                });
                //if (w.length > 0 && (w.match(/[^\x00-\x80]/g) != null || /[A-Z]/.test(w))) {
                //    var regExp = new RegExp(w, "g");
                //    oTxt = oTxt.replace(regExp, '<b style="color:#f00;">' + w + '</b>');
                //}
            }
            $(this).html(oTxt + oSubTxt);
        });
    }
    
    //}
    //#endregion

    //点击选择项时出现红色的勾
    jQuery(".queryCateClass a").click(function () {
        var _this = jQuery(this);
        //每一栏的筛选条件不得多于5个
        var everyLength = jQuery(this).parents("ul.select_c").find("a.font_color").length;
        var selectPrice = jQuery(".selectPrice li a.font_color");
        if (jQuery(this).hasClass("font_color")) {
            //取消选中
            jQuery(this).removeClass("font_color");
            selectedLength();
            $("#filterTip").hide();
        } else {
            //选中项目
            //if (jQuery(this).parents("ul.select_c").hasClass("selectPrice")) {
            //    if (selectPrice.length > 0) {
            //        selectPrice.removeClass("font_color");
            //        //showTip(_this.find("i.checkbox"), "最多只能选择1个选项");
            //    }
            //}
            if (everyLength < 5) {
                var more_model = $(".more_model a");
                if (more_model.hasClass("on")) {
                    var id = $(this).attr("id");
                    if (!id.indexOf("price=")) {
                        id = $(this).find("span").attr("id");
                        query('price', id, 0);
                    }
                    else {
                        queryCateId(id, "");
                    }
                }
                jQuery(this).addClass("font_color");
                selectedLength();
            } else {
                showTip(_this.find("i.checkbox"), "最多只能选择5个选项");
            }
        }
    });
    jQuery(".select_c a").hover(function () {
        jQuery(this).addClass("font_color_hover");
    }, function () {
        jQuery(this).removeClass("font_color_hover");
    });
    //点击提交时获取到的id
    jQuery("#make_sure").click(function() {
        var obj = jQuery(".select_c .font_color");
        var length = 0;

        //如果有价格就不需要去价格的ID
        if (url.indexOf(GetQueryString("price")) != -1) {
            length = obj.length - 1;
        } else {
            length = obj.length;
        }

        var ids = new Array();
        var price = [];

        obj.each(function() {
            var $obj = $(this);
            var id = $obj.attr("id");
            if (id.indexOf("price=") > -1) {
                price.push($obj.find("span.words").attr("id"));
            } else {
                ids.push(id);
            }
        });
        //加载        
        queryCateId(ids, price);
    });
    //点击重置
    jQuery("#reset").click(function () {
        jQuery(".select_c a").removeClass("font_color");
        jQuery("#make_sure").attr("disabled", "disabled");
        jQuery("#make_sure").addClass("disabled");
    });
    //更多选项的子菜单的左右浮动变换
    jQuery(".more_select .nav_name").hover(function () {
        var moreLength = jQuery(".more_select .nav_name").index(this);
        if (moreLength % 5 == 4 || moreLength % 5 == 3 || moreLength % 5 == 2) {
            // var winWidth = window.innerWidth;
            jQuery(this).children("div").removeClass("leftwidth");
            jQuery(this).children("div").addClass("rightwidth");
        }
    });
    //加载分类
    var url = window.location.href;

    var selector = jQuery(".selector");
    if (url.indexOf(GetQueryString("Pid")) != -1) {
        var value = GetQueryString("Pid");
        var str = value.split(',');
        if (str.length > 0) {
            $(".selector").show();
        } else {
            $(".selector").hide();
        }
        for (var i = 0; i < str.length; i++) {
            jQuery("#" + str[i]).addClass("font_color");
        }
    }
    else {
        if (url.indexOf(GetQueryString("brandid")) != -1) {
            $(".selector").show();
        }
    }

    //价格
    if (url.indexOf(GetQueryString("price")) != -1) {
        var priceValue = GetQueryString("price");
        var priceName = jQuery("#" + priceValue).html();
        jQuery("#" + priceValue).addClass("font_color");
        //$("#categorylist").append("<a id='b_" + priceValue + "' onclick=delete_PriceNode('price=" + priceValue + "') ><span>" + "价格:" + priceValue + "</span><span class='s_close'></span></a>");
    }
    
    $.updateGoodsProm($("#SubCategoryPrice"));
});



























