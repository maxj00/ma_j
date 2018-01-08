var Common_url_js = {
    vh_userId: window.UserId,
    vh_nickName: window.NickName,
    vh_image_url: jQuery("#vh_image_url").val(),//http://css.muyingzhijia.me/themes/dev/;
    vh_website_url: jQuery("#vh_website_url").val(),//http://www.muyingzhijia.me;
    vh_search_url: jQuery("#vh_search_url").val(),//http://www.muyingzhijia.me/Shopping/SearchResult.aspx;
    vh_userid: jQuery("#vh_userid").val(),
    vh_BigCode: jQuery("#vh_BigCode").val(),
    vh_res_url: jQuery("#vh_res_url").val(),//http://css.muyingzhijia.me/themes/dev/;
    vh_pic_url: jQuery("#vh_pic_url").val(),//http://img.muyingzhijia.com/product;
    vh_shoppingcart_url: jQuery("#vh_shoppingcart_url").val(),//http://buy.muyingzhijia.me/cart;
    vh_engine_url: jQuery("#vh_engine_url").val(),//http://10.0.0.87:30004/json/reply/;
    vh_product_url: function (id) {//http://item.muyingzhijia.me/#id#.html;
        return ($("#vh_product_url").val() || "").replace("#id#", id);
    }
};
//comm_C_header_js.htm
//window.TemaiRoot = 'http://t.muyingzhijia.com/';
//window.WebApiRoot = "http://web.api.muyingzhijia.me/";
//window.TemaiProductRoot = 'http://t.api.muyingzhijia.com/json/reply/';


//引用滚动插件;
//(function () {
//    var el = document.createElement("script");
//    el.type = "text/javascript";
//    el.async = true;
//    el.src = window.res_url + "js/jqueryplugin/jquery.nicescroll.min.js";
//    document.body.appendChild(el);
//})();

//引用侧边css;
(function () {
    var el = document.createElement("link");
    el.type = "text/css";
    el.rel = "stylesheet";
    el.href = Common_url_js.vh_res_url + "css/sideToolBar.css";
    document.body.appendChild(el);
})();

$(document).ready(function () {

    var sideToolbarHtml = '<div class="slidebar" id="slidebar"><div class="clearfix level-1"><div class="level-dl" id="myzone"></div></div><div class="clearfix level-2"><div class="level-dl" id="mycart"></div></div><div class="clearfix level-3"><div class="level-dl" id="ewcode"></div><div class="level-dl" id="mycollect"></div><div class="level-dl level-cur" id="myservice" onclick="javascript:NTKF.im_openInPageChat(\'kf_9722_1419411322819\');"></div></div><div class="clearfix level-4"><div class="level-dl" id="gototop"></div></div>';

    $("body").append(sideToolbarHtml);
    $("#myzone").append(addMyZone());
    $("#mycart").append(addCartZone());
    $("#ewcode").append(addEwcodeZone());
    $("#mycollect").append(addMycollectZone());
    $("#myservice").append(addMyserviceZone());
    $("#gototop").append(addGotoTopZone());

    initSideToolBarCart();


    //hover;
    $("#myzone,#mycollect,#myservice,#gototop").hover(function () {
        $(".level-dd,.level-dd-ewcode").hide().stop().animate({ right: "55px" }, 200, function () {
            $(this).parent(".level-dl").removeClass("level-hover");
        });
        $(this).addClass("level-hover");
        $(this).children(".level-dd").show().stop().animate({ right: "31px" }, 200);
    }, function () {
        $(".level-dd,.level-dd-ewcode").hide().stop().animate({ right: "55px" }, 200, function () {
            $(this).parent(".level-dl").removeClass("level-hover");
        });
        $(this).removeClass("level-hover");
        $(this).children(".level-dd").hide().stop().animate({ right: "55px" }, 200);
    });

    //购物车点击;
    $("#mycart>.level-dt").click(function () {
        if ($("#mycart").hasClass("level-hover")) {
            $("#mycart>.level-dd").hide().stop().animate({ right: "55px" }, 200, function () {
                $("#mycart").removeClass("level-hover");
            });
        } else {
            $("#mycart>.level-dd").show().stop().animate({ right: "31px" }, 200, function () {
                $("#mycart").addClass("level-hover");
            });
            $("#ewcode>.level-dd-ewcode").hide().stop().animate({ right: "55px" }, 0, function () {
                $("#ewcode").removeClass("level-hover");
            });
        }
    });

    //判断:当前元素是否是被筛选元素的子元素
    jQuery.fn.isChildOf = function (b) {
        return (this.parents(b).length > 0);
    };
    //判断:当前元素是否是被筛选元素的子元素或者本身
    jQuery.fn.isChildAndSelfOf = function (b) {
        return (this.closest(b).length > 0);
    };

    $(document).click(function (event) {
        var target = event.target;
        if (!$(target).isChildAndSelfOf("#mycart")) {
            if ($("#mycart").hasClass("level-hover")) {
                $("#mycart>.level-dd").hide().stop().animate({ right: "55px" }, 0, function () {
                    $("#mycart").removeClass("level-hover");
                });
            }
        }
        if ($("#ewcode").hasClass("level-hover")) {
            //二维码取消点击;
            if ($("#ewcode").hasClass("level-hover")) {
                $("#ewcode>.level-dd-ewcode").hide().stop().animate({ right: "55px" }, 0, function () {
                    $("#ewcode").removeClass("level-hover");
                });
            }
        }
    });

    //二维码点击;
    $("#ewcode>.level-dt").click(function () {
        if ($("#ewcode").hasClass("level-hover")) {
            $("#ewcode>.level-dd-ewcode").hide().stop().animate({ right: "55px" }, 200, function () {
                $("#ewcode").removeClass("level-hover");
            });
        } else {
            $("#ewcode>.level-dd-ewcode").show().stop().animate({ right: "36px" }, 200, function () {
                $("#ewcode").addClass("level-hover");
            });
            $("#mycart>.level-dd").hide().stop().animate({ right: "55px" }, 200, function () {
                $("#mycart").removeClass("level-hover");
            });
        }
    });

    //关闭;
    $(".level-close").click(function () {
        $(this).parents(".level-dd").hide();
    });
    //关闭;
    $("#mycart .level-close").click(function () {
        $(this).parents(".level-dd").hide().stop().animate({ right: "55px" }, 200, function () {
            $("#mycart").removeClass("level-hover");
        });
    });

    $(".userlogin").click(function () {
        var isLogin = window.UserId;
        if (parseFloat(isLogin) < 1) {
            ShowblockUI();
        }
    });

    $(window).scroll(function () {
        $("#gototop").unbind("click").click(function () {
            $("html, body").stop().animate({ scrollTop: 0 }, 400);
        });
    });

});

//我的中心;
function addMyZone() {
    var html = [];
    html.push('<div class="level-dt"><a href="javascript:;" target="_self"><s class="level-icon1"></s></a></div>');
    html.push('<div class="level-dd level-login-dd"><div class="level-dd-div">');
    html.push('<span class="level-close"></span><div class="user-img"><img src="' + Common_url_js.vh_image_url + '/images/index/userimg.jpg" width="79" height="78" alt=""/></div>');
    if (Common_url_js.vh_userId > 0) {
        html.push('<div class="user-wel"><span>您好，</span><a href="' + Common_url_js.vh_website_url + '/CustomerCenter/CustomerCenterIndex.aspx?ctlid=5" target="_blank" title="' + Common_url_js.vh_nickName + '">' + Common_url_js.vh_nickName + '</a></div>');
        html.push('<div class="user-order"><a href="' + Common_url_js.vh_website_url + '/CustomerCenter/CustomerCenter_OrderList.aspx" target="_blank"><img src="' + Common_url_js.vh_image_url + 'images/index/user-order.jpg" width="32" height="32" alt=""/></a><a href="' + Common_url_js.vh_website_url + '/CustomerCenter/CustomerCenter_OrderList.aspx" target="_blank">我的订单</a></div>');

    } else {
        html.push('<div class="user-wel"><span>您好，母婴之家用户，请</span><a href="javascript:;" target="_self" class="userlogin">登录</a>&nbsp;|&nbsp;<a href="' + window.website_url + '/register.aspx" target="_self">注册</a></div>');
    }
    html.push('</div></div>');
    html = html.join("");
    return html;
}

//购物车
function addCartZone() {
    var html = [];
    html.push('<div class="level-dt"><a href="javascript:;" target="_self"><b class="topline" style="margin-bottom:7px;"></b><s class="level-icon2"></s><span>购物车</span><em id="cartSlideNum">(0)</em><b class="topline" style="margin-top: 7px;"></b></a></div>');
    html.push('<div class="level-dd cart-slidebar" id="cart-slidebar"><div class="cart-level-dd">');
    html.push('<div class="cart-level-t" style="border-bottom: 1px solid #eee;"><h2>购物车</h2><span class="level-close"></span></div><div id="slideBarCart-box" class="slideBarCart-box hide"></div>');
    html.push('<div id="slideBarCart-empty-box" class="slideBarCart-box"><div class="cart-level-c" style="border-bottom: 1px solid #eee;"><img src="' + Common_url_js.vh_image_url + 'images/index/cartdefault.jpg" width="124" height="128" alt="" style="margin: 30px auto 15px;"/><p>您的购物车还是空的<br />去挑选喜欢的商品吧~</p></div>');
    html.push('<div id="mayLike"><div class="cart-level-t"><h2>您可能会喜欢</h2></div><div class="cart-level-tj-c" id="cart-level-tj-c"><div class="brand_scroll" id="CartTjImg"><!--动态广告位--></div></div></div></div>');
    LoadModuleData("Cart-tj-01", function (result) {
        //var CartTjImgHtml = [];
        if (result.DataList) {
            for (var i = 0, CartTjImgHtml = []; i < result.DataList.length; i++) {
                var model = result.DataList[i];
                if (model.LinkUrl != "") {
                    CartTjImgHtml.push('<a class="stats" href="' + model.LinkUrl + '" data-position="CartTjImg_' + (i + 1) + '" title="' + model.Title + '" style="display: block;"><img class="lazy" src="' + model.SmallPic + '" alt="' + model.Title + '" title="' + model.Title + '" width="230" height="134" /></a>');
                } else {
                    CartTjImgHtml.push('<img class="lazy" src="' + model.SmallPic + '" alt="' + model.Title + '" title="' + model.Title + '" width="230" height="134" />');
                }
            }
            CartTjImgHtml = CartTjImgHtml.join("");
            $("#CartTjImg").html(CartTjImgHtml); //.asyncLoadImg();//使用延后加载
            bindScrollHeight();
        }
    });

    html.push('</div></div>');
    html = html.join("");
    return html;    
}

//var displayLabel = function getDisplayLables() {
//    var displayLables = window.UserLabel;
//    if (displayLables == '' && displayLables == null) {
//        displayLables = $.cookie("DisplayLabels") || $.cookie("_displaylabelids");
//    }
//    var lables = [];
//    var displayLable = '';
//    if (typeof displayLables != "undefined") {
//        if (displayLables.indexOf("[") > -1) {
//            var splits = displayLables.split(',');
//            for (var i = 0; i < splits.length; i++) {
//                lables.push(splits[i].replace('[', '').replace(']', ''));
//            }
//            displayLable = lables.join(",");

//        } else {
//            displayLable = displayLables.join(",");
//        }
//    }
//    return displayLable;
//};

var User_Id = function () {
    return window.UserId;
};
var User_Guid = function () {
    return window.UserGuid;
};


//公共参数
function Parameter() {
    var parameter = new Object();
    parameter.channel = 102;
    parameter.userId = window.UserId;
    parameter.Guid = window.User_Guid;
    parameter.AreaSysNo = 100; //$("#AreaSysNo").val();
    parameter.Ckid = window.CKid;
    parameter.SourceTypeSysNo = 1;
    parameter.DisplayLabel = displayLabel();
    parameter.ExtensionSysNo = $.cookie("ExtensionSysNo") || '';
    parameter.ZP = 11;
    parameter.ZP_1 = 12;
    parameter.HG = 2;
    parameter.ZHG = 3;
    parameter.MJ = 4;
    parameter.QG = 5;
    parameter.ChannelPromotion = 6;
    parameter.MZ = 7;
    parameter.DDTJ = 8;
    parameter.MS = 9;
    parameter.MZ_1 = 13;
    return parameter;
}

function initSideToolBarCart() {
    var parameter = new Parameter();
    var userid = window.UserId;
    var guid = window.UserGuid;
    var dataParameter =
    {
        "UserId": userid,
        "Guid": guid,
        "DisplayLabel": parameter.DisplayLabel,
        "SourceTypeSysNo": 1,
        "AreaSysNo": 100,
        "ChannelID": 102,
        "ExtensionSysNo": parameter.ExtensionSysNo
    };

    jQuery.ajax({
        url: Common_url_js.vh_engine_url + 'QueryShoppingCartPocket',
        type: "GET",
        cache: false,
        async: true,
        data: dataParameter,
        dataType: 'jsonp',
        success: function (result) {
            var html = [];
            if (result.DoFlag == true) {
                $("#slideBarCart-empty-box").hide();
                var saleamount = 0,
                    str = result;
                if (str != "" && result.DoFlag == true) {
                    var cartdata = str;
                    saleamount = cartdata.TotalPrice;
                    if (cartdata.CartEntities != null && cartdata.CartEntities.length > 0) {
                        html.push('<div class="cart-level-c brand_scroll"><div id="cart-level-plist">');
                        $.each(cartdata.CartEntities, function (i, items) {
                            /*促销-分2类;ExecutePromotionDto;MinorProductContexts*/;
                            if (items.ExecutePromotionDto != null && items.ExecutePromotionDto.length > 0) {
                                $.each(items.ExecutePromotionDto, function (m, parts) {
                                    if (parts.MainProductContexts != null && parts.MainProductContexts.length > 0) {
                                        $.each(parts.MainProductContexts, function (d, mainProduct) {
                                            var urlProduct = '', imgUrl = '';
                                            if (items.CartType == 5) { /*判断是否为特卖商品;替换图片，商品链接;*/
                                                urlProduct = returnTmaiGoodsHref(items.ActivitySysNo, mainProduct.ProductId, mainProduct.ProductSKUID);
                                                imgUrl = returnTmaiGoodsSmallImg(mainProduct.PicUrl);
                                            } else {
                                                urlProduct = getPicHref(mainProduct.ProductId);
                                                imgUrl = getJoinProductPicUrl(mainProduct.ShowImgUrl);
                                            }
                                            html.push('<div class="cart-level-plist">');
                                            html.push('<div class="cart-level-img"><a href="' + urlProduct + '" target="_blank" title="' + mainProduct.ProductName + '"><img src="' + imgUrl + '" alt="' + mainProduct.ProductName + '" title="' + mainProduct.ProductName + '" width="46" height="46" /></a></div>');
                                            html.push('<div class="cart-level-intro"><a class="cart-level-name" href="' + urlProduct + '" target="_blank" title="' + mainProduct.ProductName + '">' + mainProduct.ProductName + '</a><div class="cart-level-act"><strong class="cart-level-price">￥' + totalPriceFormat(mainProduct.SalePrice) + '</strong><em class="cart-level-num">×' + mainProduct.BuyCount + '</em>');
                                            html.push('<a class="cart-level-del" href="javascript:;" target="_self" data-del="delsideCartItem" id="deleteSideToolBarCartItem_' + mainProduct.ShopCartId + '_' + mainProduct.ProductId + '_' + items.CartType + '" style="color: #f90;" onclick="javascript:deleteSideToolBarShopCart(' + mainProduct.ShopCartId + ',' + items.CartType + ')">删除</a><div class="clr"></div></div></div><div class="clr"></div></div>');
                                        });
                                    }

                                    if (parts.MinorProductContexts != null && parts.MinorProductContexts.length > 0) {
                                        $.each(parts.MinorProductContexts, function (d, minorProduct) {
                                            var urlProduct = '', imgUrl = '';
                                            if (items.CartType == 5) { /*判断是否为特卖商品;替换图片，商品链接;*/
                                                urlProduct = returnTmaiGoodsHref(items.ActivitySysNo, minorProduct.ProductId, minorProduct.ProductSKUID);
                                                imgUrl = returnTmaiGoodsSmallImg(minorProduct.PicUrl);
                                            } else {
                                                urlProduct = getPicHref(minorProduct.ProductId);
                                                imgUrl = getJoinProductPicUrl(minorProduct.ShowImgUrl);
                                            }
                                            html.push('<div class="cart-level-plist">');
                                            html.push('<div class="cart-level-img"><a href="' + urlProduct + '" target="_blank" title="' + minorProduct.ProductName + '"><img src="' + imgUrl + '" alt="' + minorProduct.ProductName + '" title="' + minorProduct.ProductName + '" width="46" height="46" /></a></div>');
                                            html.push('<div class="cart-level-intro"><a class="cart-level-name" href="' + urlProduct + '" target="_blank" title="' + minorProduct.ProductName + '">' + minorProduct.ProductName + '</a><div class="cart-level-act"><strong class="cart-level-price">￥' + totalPriceFormat(minorProduct.SalePrice) + '</strong><em class="cart-level-num">×' + minorProduct.BuyCount + '</em>');
                                            html.push('<a class="cart-level-del" href="javascript:;" target="_self" data-del="delsideCartItem" id="deleteSideToolBarCartItem_' + minorProduct.ShopCartId + '_' + minorProduct.ProductId + '_' + items.CartType + '" style="color: #f90;" onclick="javascript:deleteSideToolBarShopCart(' + minorProduct.ShopCartId + ',' + items.CartType + ')">删除</a><div class="clr"></div></div></div><div class="clr"></div></div>');
                                        });
                                    }
                                });
                            }

                            /*正常;ExecuteProductContexts;*/
                            if (items.ExecuteProductContexts != null && items.ExecuteProductContexts.length > 0) {
                                $.each(items.ExecuteProductContexts, function (c, execute) {
                                    var urlProduct = '', imgUrl = '';
                                    if (items.CartType == 5) { /*判断是否为特卖商品;替换图片，商品链接;*/
                                        urlProduct = returnTmaiGoodsHref(items.ActivitySysNo, execute.ProductId, execute.ProductSKUID);
                                        imgUrl = returnTmaiGoodsSmallImg(execute.PicUrl);
                                    } else {
                                        urlProduct = getPicHref(execute.ProductId);
                                        imgUrl = getJoinProductPicUrl(execute.ShowImgUrl);
                                    }
                                    html.push('<div class="cart-level-plist">');
                                    html.push('<div class="cart-level-img"><a href="' + urlProduct + '" target="_blank" title="' + execute.ProductName + '"><img src="' + imgUrl + '" alt="' + execute.ProductName + '" title="' + execute.ProductName + '" width="46" height="46" /></a></div>');
                                    html.push('<div class="cart-level-intro"><a class="cart-level-name" href="' + urlProduct + '" target="_blank" title="' + execute.ProductName + '">' + execute.ProductName + '</a><div class="cart-level-act"><strong class="cart-level-price">￥' + totalPriceFormat(execute.SalePrice) + '</strong><em class="cart-level-num">×' + execute.BuyCount + '</em>');
                                    html.push('<a class="cart-level-del" href="javascript:;" target="_self" data-del="delsideCartItem" id="deleteSideToolBarCartItem_' + execute.ShopCartId + '_' + execute.ProductId + '_' + items.CartType + '" style="color: #f90;" onclick="javascript:deleteSideToolBarShopCart(' + execute.ShopCartId + ',' + items.CartType + ')">删除</a><div class="clr"></div></div></div><div class="clr"></div></div>');
                                });
                            }
                        });

                        html.push('</div></div>');
                        html.push('<div class="cart-level-all"><div class="cart-level-fl">共计<span class="mcart-p-price"><strong class="f20" style="font-size: 20px;color: #F90;font-family: Verdana, Geneva, sans-serif;font-weight: bold;">￥' + totalPriceFormat(saleamount) + '</strong></span></div><a class="cart-level-fr" href="' + Common_url_js.vh_shoppingcart_url + '" target="_blank" title="去购物车结算" rel="nofollow" style="color: #fff;">去购物车结算</a><div class="clr"></div></div>');
                    }
                }
                html = html.join("");
                $("#slideBarCart-box").html(html).show();
                $("#slideBarCart-empty-box").hide();
            } else {
                $("#slideBarCart-empty-box").show();
                $("#slideBarCart-box").hide();
            }
            $("#cartSlideNum").text("(" + result.BuyTotalCount + ")");
            bindScrollHeight();
        }, error: function (XMLHttpResponse) {
            alert("系统繁忙，请稍后！");
        }
    });
}

/**
 *  删除商品
 *  @param ShopCartId 购物车Id
 *  @param ProductId 促销Id
 *  @param CartType 购物车类型 1 or 2
 *
 *  清空购物车必须传
 *  UserId, Guid
 */

function deleteSideToolBarShopCart(ShopCartId, CartType) {
    jQuery.ajax({
        type: "POST",
        contentType: "application/json",
        url: Common_url_js.vh_website_url + '/Ajax/IndexAjax.aspx/DeleteItemCart',
        data: "{shopCartId:'" + ShopCartId + "',shopCartType:'" + CartType + "'}",
        dataType: 'json',
        async: false,
        success: function (result) {
            var message = result.d;
            trigergetshoppingcart();
        }
    });
}

$(window).resize(function () {
    bindScrollHeight();
});


//动态改变侧边栏购物车滚动条高度
function bindScrollHeight() {
    var windowHeight = $(window).height();
    var slideBarCartBox = windowHeight - 46;

    $(".slideBarCart-box").css("height", slideBarCartBox);

    var scroll_viewport_like = slideBarCartBox - 280;
    //$("#CartTjImg").css("height", scroll_viewport_like);
    $("#CartTjImg").css({ "height": scroll_viewport_like, "overflow-y": "auto" });

    var scroll_viewport_cart = slideBarCartBox - 53;
    //$("#slideBarCart-box>.brand_scroll").css({ "height": scroll_viewport_cart });
    $("#slideBarCart-box>.brand_scroll").css({ "height": scroll_viewport_cart, "overflow-y": "auto" });

    //$(".brand_scroll").niceScroll({
    //    touchbehavior: false,
    //    cursorcolor: "#666",
    //    cursoropacitymax: 0.7,
    //    cursorwidth: 6,
    //    background: "#ccc",
    //    autohidemode: true
    //});
}

function totalPriceFormat(price) {
    return price.toFixed(2);
}

function getJoinProductPicUrl(url) {
    return url.replace("{0}", "small").replace("{type}.", "60X60.");
}

/**
*   @param cartarea  购物车实体
*   @param type 购物车类型
*   判断购物车是否只有特卖商品
*/
function isHasOnlyTGoods(cartarea, type) {
    var flag = false;
    var arr = [];
    for (var i = 0; i < cartarea.length; i++) {
        if (cartarea[i].CartType != type) {
            flag = true;
            break;
        }
    }
    return flag;
}

/**
*   @param specialId  专场id
*   @param ProductId  商品id
*   @param ProductSkuId  商品id
*   获取特卖商品详情页URL
*/
function returnTmaiGoodsHref(specialId, ProductId, ProductSkuId) {
    var str2 = window.TemaiRoot || window.TmaiRoot || "http://t.muyingzhijia.com/";
    return str2 + "pro/" + specialId + "/" + ProductId + ".html?sku=" + ProductSkuId;
}

/**
*    @param  imgUrl 特卖图片url
*/

function returnTmaiGoodsSmallImg(imgUrl) {
    return imgUrl.replace("{0}", "small").replace("source", "s").replace("{type}.", "60X60.");
}

//获取href参数
function getQueryHrefString(url, name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var str = url.split("?")[1];
    var r = str.match(reg);
    if (r != null) return decodeURIComponent(unescape(r[2])); return null;
}

//获取没有参数的url
function getClearUrl(url) {
    if (url.indexOf("?") > -1) {
        return url.split("?")[0];
    } else {
        return url;
    }
}

//获取特卖专场id
function getTmaiSpecialId(url) {
    var href = getClearUrl(url);
    return href.split("show/")[1].replace(".html", "");
}

function getPicHref(id) {
    var baseUrl = $("#vh_product_url").val();
    return baseUrl.replace("#id#", id)
}

//显示登录框
function ShowblockUI() {
    LoginDialog(function () {
        window.location.reload();
        //trigergetshoppingcart();
        //initSideToolBarCart();
    }, true);
    //LoginDialog(function () {
    //    initSideToolBarCart();
    //}, true);
}

//二维码;
function addEwcodeZone() {
    var html = [];
    html.push('<div class="level-dt"><a href="javascript:;" target="_self"><s class="level-icon3"></s></a></div>');
    html.push('<div class="level-dd-ewcode" id="level-dd-ewcode"></div>');

    LoadModuleData("AppEwm-02", function (result) {
        //var ewcodeHtml = '';
        if (result.DataList) {
            for (var i = 0,ewcodeHtml =[]; i < result.DataList.length; i++) {
                var model = result.DataList[i];
                if (model.LinkUrl != "") {
                    ewcodeHtml.push('<a class="stats" href="' + model.LinkUrl + '" data-position="ewcode_' + (i + 1) + '" title="' + model.Title + '" style="display: block;"><img class="lazy" src="' + model.SmallPic + '" alt="' + model.Title + '" title="' + model.Title + '" /></a>');
                } else {
                    ewcodeHtml.push('<img class="lazy" src="' + model.SmallPic + '" alt="' + model.Title + '" title="' + model.Title + '" />');
                }
            }
            ewcodeHtml = ewcodeHtml.join("");
            $("#level-dd-ewcode").html(ewcodeHtml); //.asyncLoadImg();//使用延后加载
        }
    });
    html = html.join("");
    return html;
}

//我的收藏;
function addMycollectZone() {
    var html = [];
    if (Common_url_js.vh_userId > 0) {
        html.push('<div class="level-dt"><a href="' + Common_url_js.vh_website_url + '/CustomerCenter/CustomerCenter_favorites.aspx?ctlid=9" target="_blank"><s class="level-icon4"></s></a></div>');
        html.push('<div class="level-dd"><div class="level-dd-div"><a href="' + Common_url_js.vh_website_url + '/CustomerCenter/CustomerCenter_favorites.aspx?ctlid=9" target="_blank" class="level-dd-a">我的收藏</a></div></div>');
     } else {
        html.push('<div class="level-dt"><a href="javascript:;" target="_self"><s class="level-icon4"></s></a></div>');
        html.push('<div class="level-dd level-login-dd"><div class="level-dd-div">');
        html.push('<span class="level-close"></span><div class="user-img"><img src="' + Common_url_js.vh_image_url + 'images/index/userimg.jpg" width="79" height="78" alt=""/></div>');
        html.push('<div class="user-wel"><span>您好，母婴之家用户，请</span><a href="javascript:;" target="_self" class="userlogin">登录</a>&nbsp;|&nbsp;<a href="' + Common_url_js.vh_website_url + '/register.aspx" target="_self">注册</a></div>');
        html.push('</div></div>');
    }
    html=html.join("");
    return html;
}

//客服;
function addMyserviceZone() {
    var html = [];
    html.push('<div class="level-dt"><a href="javascript:;" target="_self"><s class="level-icon5"></s><span>在线客服</span></a></div>');
    html.push('<div class="level-dd"><div class="level-dd-div"><a href="javascript:;" target="_self" class="level-dd-a">客服</a></div></div>');
    html = html.join("");
    return html;
}

//返回顶部;
function addGotoTopZone() {
    var html = [];
    html.push('<div class="level-dt"><a href="javascript:;" target="_self"><s class="level-icon6"></s></a></div>');
    html.push('<div class="level-dd"><div class="level-dd-div"><a class="level-dd-a" href="javascript:;" target="_self" id="level-3-gotop">返回顶部</a></div></div>');
    html = html.join("");
    return html;
}

//广告模块取数
function LoadModuleData(moduleCode, callbackfn) {
    $.ajax({
        url: window.WebApiRoot + 'api/GetAdModuleData',
        type: "GET",
        cache: false,
        data: { moduleCode: moduleCode },
        dataType: 'jsonp',
        success: function (response) {
            if (response) {
                if (typeof (callbackfn) == "function") {
                    callbackfn(response);
                }
            }
        },
        complete: function () { }
    });
}

//分屏
$.fn.extend({
    asyncLoadImg: function () {
        var $obj = $(this);
        if (typeof lazyload !== 'undefined') {
            $obj.find("img.lazy").lazyload({
                threshold: 400,
                effect: "fadeIn",
                event: 'sporty,scroll'
            });
            $obj.find("img.lazy").trigger("sporty");
        }
    }
});
