function GetShop_Ca() {
    jQuery.ajax({
        type: "POST",
        contentType: "application/json",
        url: Common_js.vh_website_url + '/Ajax/IndexAjax.aspx/GetShoppingCartItems',
        dataType: 'json',
        cache: false,
        success: function (result) {
            var productcount = 0;
            var saleamount = 0;
            var str = result.d;
            if (str != "") {
                var cartdata = eval("(" + str + ")");
                for (var i = 0; i < cartdata.ShoppingCart.length; i++) {
                    productcount = (productcount + cartdata.ShoppingCart[i].TotalQuantity);
                    saleamount = saleamount + cartdata.ShoppingCart[i].SubTotal;
                }
            }

            jQuery('#top_gwc_saleQty_out').html(productcount);
            jQuery('#top_gwc_saleAmount_out').html(saleamount);
        }
    });
}
(function () {
    jQuery("a.traceCount").click(function () {
        var window_href = window.location.href;
        var this_href = "";//搜索结果页初始URL
        var this_position = "";//后续筛选参数_页号_位置编号      
        var this_url = $(this).parents("li").attr("data-url");
        if (window_href.indexOf("&") > -1) {
            var split_href = window_href.split("&")[0];
            this_href = window_href.split("&");// 搜索结果页初始URL
            this_href = this_href[0];
            this_position = window_href.substring(split_href.split("&")[0].length + 1).replace(/&/g, "|") + "|" + $(this).parents("li").attr("data-position");
        } else {
            this_href = window_href;
            this_position = $(this).parents("li").attr("data-position");
        }
        _gaq.push(['_trackEvent', decodeURIComponent(this_href), this_position, decodeURIComponent(this_url), 1]);
    });

    jQuery(".list02_con_submit").live("click", function () {
        var proid = jQuery(this).attr("pidorg");
        var promid = jQuery(this).attr("promid");
        var proPrice = jQuery(this).attr("data-price");
        var salesQty = jQuery(this).attr("salesQty");
        var productType = jQuery(this).data("producttype");
        var window_href = window.location.href;
        if (window_href.indexOf("&small=1") > -1) {
            window_href = window_href.replace("&small=1", "");
        }
        var this_href = "";//搜索结果页初始URL
        var this_position = "";//后续筛选参数_页号_位置编号      
        var this_url = $(this).parents("li").attr("data-url");
        if (window_href.indexOf("&") > -1) {
            var split_href = window_href.split("&")[0];
            this_href = window_href.split("&");// 搜索结果页初始URL
            this_href = this_href[0];
            this_position = window_href.substring(split_href.split("&")[0].length + 1).replace(/&/g, "|") + "|" + $(this).parents("li").attr("data-position");
        } else {
            this_href = window_href;
            this_position = $(this).parents("li").attr("data-position");
        }

        //增加统计
        myzjStatistics({
            pageType: "goods",
            targetUrl: "",
            targetType: 101,
            behaviorType: 2,
            goodsCount: 1,
            position: "",
            targetIdentity: proid
        });

        //if (promid > 0) {
        //    var productcode = jQuery(this).attr("VchProductcode");
        //    jQuery.ajax({
        //        type: "POST",
        //        contentType: "application/json",
        //        url: Common_js.vh_website_url + '/Ajax/PromotionAjax.aspx/ExecPromotionForPorductRush',
        //        data: "{promotionid:'" + promid + "',productid:'" + proid + "',productcode:'" + productcode + "',qty:'" + 1 + "'}",
        //        dataType: 'json',
        //        success: function (result) {
        //            var message = result.d;
        //            var arrmsg = message.split("|");
        //            if (arrmsg[0] == "1") {
        //                jQuery("#mesShop").empty();
        //                jQuery("#mesShop").append("已成功加入购物车");
        //                easyDialog.open({
        //                    container: 'shoppingDiv',
        //                    isOverlay: true
        //                });
        //                var shoppingCartId = "AddtoCart_" + arrmsg[arrmsg.length - 1];
        //                _gaq.push(['_trackEvent', decodeURIComponent(window.location.href), shoppingCartId, proid, 1]);
        //                _gaq.push(['_trackEvent', 'shopping', 'addtoCart31', proid, 1]);
        //                piwikTracker.addEcommerceItem(proid,
        //                    "${pdt.ProductName}",
        //                    "${vh_bigcate.VchMenuShowName}_${vh_childcate.VchMenuShowName}",
        //                       proPrice,
        //                       1
        //                    );
        //                _gaq.push(['_trackEvent', decodeURIComponent(this_href), this_position, decodeURIComponent(this_url), 1]);
        //                GetShop_Ca();
        //                return;
        //            } else {
        //                jQuery.prompt("<div class=\"f_price f18\" style=\"margin-top:24px\">" + message + "</div>", { buttons: { 确定: false } });
        //            }
        //        }, error: function (tdata) {
        //            jQuery.prompt("<div class=\"f_price f18\" style=\"margin-top:24px\">加入购物车失败</div>", { buttons: { 确定: false } });
        //        }
        //    });
        //} else {
        var quantity = 1;
        if (promid <= 0) {
            promid = 0;
        }
        if (salesQty > 1) {
            quantity = salesQty;
        }
        jQuery.ajax({
            type: "POST",
            contentType: "application/json",
            url: Common_js.vh_website_url + '/Ajax/IndexAjax.aspx/InsertShopCart',
            data: "{productId:'" + proid + "',quantity:'" + quantity + "',productType:'" + productType + "',promSysNo:'" + promid + "'}",
            dataType: 'json',
            success: function (response) {
                var results = eval("(" + response.d + ")");
                if (results != '') {
                    if (results.DoFlag == true) {

                        _diglog(results.DoResult);
                        if (results.ShopCartId != '' && results.ShopCartId != null) {
                            var shoppingCartId = "AddtoCart_" + results.ShopCartId;
                            //BI出报表调用接口
                            _gaq.push(['_trackEvent', decodeURIComponent(window.location.href), shoppingCartId, proid, 1]);
                            _gaq.push(['_trackEvent', 'shopping', 'addtoCart31', proid, 1]);                            
                            _gaq.push(['_trackEvent', decodeURIComponent(this_href), this_position, decodeURIComponent(this_url), 1]);
                        }

                    } else if (results.DoFlag == false) {

                        _diglog(results.DoResult);

                    } else {
                        _diglog(results.DoResult);
                    }
                }


                trigergetshoppingcart();

            }, error: function (tdata) {
                jQuery.prompt("<div class=\"f_price f18\" style=\"margin-top:24px\">加入购物车失败</div>", { buttons: { 确定: false } });
            }
        });


    });


    jQuery(".list03_con_submit").live("click", function () {
        return;
        var IsLo = jQuery("#IsLo").val();
        var qty = jQuery(this).attr("name");
        var webType = jQuery(this).attr("sort");
        var proid = jQuery(this).attr("pidorg");
        var customerID = jQuery("#hidCustomerId").val();
        var proPrice = jQuery(this).attr("data-price");
        var window_href = window.location.href;
        var this_href = "";//搜索结果页初始URL
        var this_position = "";//后续筛选参数_页号_位置编号      
        var this_url = $(this).parents("li").attr("data-url");
        if (window_href.indexOf("&") > -1) {
            var split_href = window_href.split("&")[0];
            this_href = window_href.split("&");// 搜索结果页初始URL
            this_href = this_href[0];
            this_position = window_href.substring(split_href.split("&")[0].length + 1).replace(/&/g, "|") + "|" + $(this).parents("li").attr("data-position");
        } else {
            this_href = window_href;
            this_position = $(this).parents("li").attr("data-position");
        }

        if (webType == 3) {
            window.location.href = 'productDetail.aspx?pdtID=' + proid;
            return;
        }
        else {
            if (window.UserId < 0) {
                window.location.href = Common_js.vh_website_url + '/login.aspx?foward=' + encodeURIComponent(window.location.href.toString().replace(/^\s+|\s+$/g, ""));
            }
            else {
                var email = jQuery("#hidEmail").val();

                jQuery.ajax({
                    type: "POST",
                    contentType: "application/json",
                    url: Common_js.vh_website_url + '/Ajax/IndexAjax.aspx/InsertArrivalNotice',
                    data: "{userid:'" + customerID + "',productID:'" + proid + "',email:'" + email + "',mobile:'',webType:'" + webType + "'}",
                    dataType: 'json',
                    success: function (result) {
                        var message = result.d;
                        if (message != "成功") {
                            jQuery.prompt("<div class=\"f_price f18\" style=\"margin-top:24px\">" + message + "</div>", { buttons: { 确定: false } });
                        } else {
                            _gaq.push(['_trackEvent', 'shopping', 'addtoCart34', proid, 1]);
                            _gaq.push(['_trackEvent', decodeURIComponent(this_href), this_position, decodeURIComponent(this_url), 1]);
                            jQuery.prompt("<div class=\"f_price f18\" style=\"margin-top:24px\">加入到货通知成功</div>", { buttons: { 确定: false } });
                            return;
                        }
                    }
                });
            }
        }
    });

    jQuery(".sc").live("click", function () {

        var IsLo = jQuery("#IsLo").val();
        var window_href = window.location.href;
        var this_href = "";//搜索结果页初始URL
        var this_position = "";//后续筛选参数_页号_位置编号      
        var this_url = $(this).parents("li").attr("data-url");
        if (window_href.indexOf("&") > -1) {
            var split_href = window_href.split("&")[0];
            this_href = window_href.split("&");// 搜索结果页初始URL
            this_href = this_href[0];
            this_position = window_href.substring(split_href.split("&")[0].length + 1).replace("&", "|") + "|" + $(this).parents("li").attr("data-position");
        } else {
            this_href = window_href;
            this_position = $(this).parents("li").attr("data-position");
        }

        if (window.UserId < 0) {
            window.location.href = Common_js.vh_website_url + '/login.aspx?foward=' + encodeURIComponent(window.location.href.toString().replace(/^\s+|\s+$/g, ""));
        } else {
            var proid = jQuery(this).attr("pidorg");
            jQuery.ajax({
                type: "POST",
                contentType: "application/json",
                url: Common_js.vh_website_url + '/Ajax/IndexAjax.aspx/InsertFavorite',
                data: "{userid:'1',productID:'" + proid + "'}",
                dataType: 'json',
                success: function (result) {
                    var message = result.d;
                    var arrmsg = message.split("|");
                    if (arrmsg[0] != "成功") {
                        _gaq.push(['_trackEvent', decodeURIComponent(this_href), this_position, decodeURIComponent(this_url), 1]);
                        jQuery.prompt("<div class=\"f_price f18\" style=\"margin-top:24px\">" + message + "</div>", { buttons: { 确定: false } });
                    }
                    else {
                        _gaq.push(['_trackEvent', decodeURIComponent(this_href), this_position, decodeURIComponent(this_url), 1]);
                        jQuery.prompt("<div class=\"f_price f18\" style=\"margin-top:24px\">已成功加入收藏夹</div>", { buttons: { 确定: false } });
                        return;
                    }
                }, error: function (tdata) {
                    jQuery.prompt("<div class=\"f_price f18\" style=\"margin-top:24px\">加入收藏夹失败</div>", { buttons: { 确定: false } });
                }
            });
        }
    });
    jQuery("#mesClose,.mesCloseA").live("click", function () {
        easyDialog.close();
    });

    //$("a.landingStats").click(function () {
    //    var window_href = window.location.href;
    //    if (window_href.indexOf("&small=1") > -1) {
    //        window_href = window_href.replace("&small=1", "");
    //    }
    //    var split_href = window_href.split("&")[0];
    //    var this_href = "";
    //    var this_url = $(this).parents("li").attr("data-url");
    //    var data_pid = $(this).parents("li").attr("data-pid");
    //    var this_position = window_href.substring(split_href.split("&")[0].length + 1).replace(/&/g, "|") + "|" + $(this).parents("li").attr("data-position");

    //    if (window_href.indexOf("&") > -1) {
    //        var split_href = window_href.split("&")[0];
    //        this_href = window_href.split("&");// 搜索结果页初始URL
    //        this_href = this_href[0];
    //        this_position = window_href.substring(split_href.split("&")[0].length + 1).replace(/&/g, "|") + "|" + $(this).parents("li").attr("data-position");
    //    } else {
    //        this_href = window_href;
    //        this_position = $(this).parents("li").attr("data-position");
    //    }
    //    _gaq.push(['_trackEvent', decodeURIComponent(this_href), this_position, decodeURIComponent(this_url), 1]);
    //});


})();

function _diglog(parameters) {
    jQuery("#mesShop").empty();
    jQuery("#mesShop").append(parameters);
    easyDialog.open({
        container: 'shoppingDiv',
        isOverlay: true
    });
}