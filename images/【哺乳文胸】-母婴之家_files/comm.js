
$(function () {
    guanggao();
    function guanggao() {
        var adContainer = [{
            "parentNode": "#begin-prizebox",//幸运星期一浮动图
            "position": "absolute",
            "bottom": "10px",
            "right": "10px"
        },{
            "parentNode": "#end-prizebox",//幸运星期一浮动图
            "position": "absolute",
            "bottom": "10px",
            "right": "10px"
        }
        //,{
        //    "parentNode": ".section",//幸运星期一主题图
        //    "position": "absolute",
        //    "top": "20px",
        //    "right": "395px",
        //}, {
        //    "parentNode": ".promotion",//专题页大图
        //    "position": "absolute",
        //    "top": "210px",
        //    "right": "15%",
        //    "bottom": "",
        //    "left": ""

        //}, {
        //    "parentNode": ".ad-floor3-5 a",//幸运星期一底部大广告
        //    "position": "relative",
        //    "bottom": "30px",
        //    "left": "950px"

        //}, {
        //    "parentNode": ".pro-add a",//幸运星期一底部小广告
        //    "position": "relative",
        //    "bottom": "30px",
        //    "left": "430px"

        //}, {
        //    "parentNode": ".register-form-height .sign-right a",//注册页广告
        //    "position": "relative",
        //    "bottom": "30px",
        //    "left": "290px"

        //}
        ];
        $.each(adContainer, function (i, list) {
            var html = [];
            var imgUrl = "http://static.boodoll.cn/mall/v16/images/myzj_law2_small.png";
            html.push('<img style="width:auto; height:auto;z-index:2;position: ' + list.position + '; bottom:' + list.bottom + '; right:' + list.right + '; top:' + list.top + '; left:' + list.left + '" src="' + imgUrl + '">');
            $.each($(list.parentNode), function (j, item) {
                $(item).css("position", list.relative);
                $(item).append(html.join(""));
            });

        });
    }
    $(".navStats,.ui-silder-all").click(function () {
        var $this = $(this);
        var position = $this.attr("data-position");
        var type = $this.attr("data-type");
        var id = $this.attr("data-id");
        _gaq.push(['_trackEvent', position, type, id]);
    });
    $(".ui-category li a").click(function () {
        var $this = $(this);
        var index1 = $this.parents("li").index() + 1;
        var index2 = $this.parents("dd").index() < 0 ? 0 : $this.parents("dd").index();

        _gaq.push(['_trackEvent', "m_category_" + index1 + "_" + index2, "m_category ", $this.text(), 1]);
    });

    if ($(".ui-category-list").length > 0) {
        $(".ui-category-list").hover(function () {
            $(this).addClass("ui-category-list-hover");
        }, function () {
            $(this).removeClass("ui-category-list-hover");
        });
    };

    getNavGationData();
    if ($("#ui-silder-nav").length > 0) {
        $("#ui-silder-nav").hover(function () {
            $(this).addClass("ui-silder-hover").find(".ui-category").stop().show();
        }, function () {
            $(this).removeClass("ui-silder-hover").find(".ui-category").stop().hide();
        });
    }

    if ($("#ui-new").length > 0) {
        var myscroll = setInterval('autoScrollGg("#ui-new")', 3000)
        $("#ui-new").hover(function () { clearInterval(myscroll); }, function () { myscroll = setInterval('autoScrollGg("#ui-new")', 3000) });
    }
    //#region 异步更新页面的 UserId 和 Guid
    //$.ajax({
    //    url: '/ajax/?method=GetCurrentUserInfo',
    //    dataType: 'json',
    //    type: 'get',
    //    cache: false,
    //    success: function (json) {
    //        if (typeof (json) != 'undefined') {
    //            try {
    //                $("#vh_userid").val(json.UserId);
    //                $("#vh_Guid").val(json.Guid);
    //            } catch (e) {
    //            }
    //        }
    //    }
    //});
    //#endregion

    //网站顶部 统计代码
    $(".m_top_nav_stats").unbind().bind("click", function () {
        var _this = $(this);
        var position = _this.attr("data-position");
        var type = _this.attr("data-type");
        var index = _this.attr("data-index");
        _gaq_push(position, type, index, 1);
    });

    $(".weixin-icon").hover(function () {
        $(".weixin-img").css("display", "block");
    }, function () {
        $(".weixin-img").css("display", "none");
    });
    $("#qq_tips").hover(function () {
        $(".qqserver_time,.qq_arrow").show();
    }, function () {
        $(".qqserver_time,.qq_arrow").hide();
    });

    Parameter();

    getClientInfo();
});

function Parameter() {

    var parameter = new Object();
    parameter.channel = 102;
    parameter.userId = 0;
    parameter.Guid = "string";
    parameter.AreaSysNo = 100; //$("#AreaSysNo").val();
    parameter.Ckid = 21;
    parameter.SourceTypeSysNo = 1;
    parameter.DisplayLabel = displayLabel();
    parameter.ExtensionSysNo = $.cookie("ExtensionSysNo") || ''; //推广标签
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



(function () {
    $.updateGoodsProm = function ($obj) {
        $obj.each(function () {
            var $this = $(this);
            var gids = [];
            $this.find("[data-type='item']").each(function () {
                var gid = $(this).data("gid");
                gids.push(gid);
            });
            var parameter = new Parameter();
            var dataParameter =
            {
                "ProductIdList": gids.join(","),
                "UserId": parameter.userId,
                "Guid": parameter.Guid,
                "DisplayLabel": parameter.DisplayLabel,
                "SourceTypeSysNo": parameter.SourceTypeSysNo,
                "AreaSysNo": parameter.AreaSysNo,
                "ChannelID": parameter.channel,
                "Ckid": parameter.Ckid,
                "ExtensionSysNo": parameter.ExtensionSysNo
            };

            $.ajax({
                url: Common_js.vh_engine_url + 'QueryPromPriceByProdId?a=' + Math.random(),
                async: true,
                type: "GET",
                data: dataParameter,
                dataType: 'jsonp',
                jsonp: "callback",
                success: function (response) {
                    var pDict = {};

                    if (response.DoFlag == true) {
                        if (response.PromPriceList != '') {
                            $.each(response.PromPriceList, function (i, items) {
                                var values = response.PromPriceList[i];
                                pDict[items.ProductId] = values;
                            });
                        }

                        $this.find("[data-type='item']").each(function () {
                            var gid = $(this).data("gid");
                            var $price = $(this).find("[data-type='price']");
                            var $productMemo = $(this).find("[data-ProductMemo='title']");
                            var fromSaleQtyValue = $(this).find("[data-sales='salesPrice']");

                            if (gid != null && pDict[gid] != null && pDict[gid] != '') {
                                var promotionSysNoList = [];
                                $price.html(pDict[gid].PromPriceShow.toFixed(2));
                                $productMemo.html(pDict[gid].ProductMemo);
                                var fromSaleQty = (pDict[gid].FromSaleQty);
                                //if (fromSaleQty > 1) {
                                //    $(this).find(".btn_m_o a").attr("salesQty", fromSaleQty);
                                //    fromSaleQtyValue.text("(" + fromSaleQty + "件起售)");
                                //}
                                if (pDict[gid].Stock > 0) {
                                    hasStock($(this));
                                    if (pDict[gid].PromotionContexts != null) {

                                        for (var i = 0; i < pDict[gid].PromotionContexts.length; i++) {
                                            promotionSysNoList.push(pDict[gid].PromotionContexts[i].PromSysNo);
                                        }

                                        $(this).find(".btn_m_o a").attr("promid", promotionSysNoList.join(","));

                                        if ($("#hidProductId").val() == pDict[gid].ProductId && $("#hidProductId") != null && $("#hidSubpromotionType").val() != 1) {

                                            $("#PromotionPrice strong").html(pDict[gid].PromPriceShow.toFixed(2));
                                            $("#hidQty").val(pDict[gid].Stock);
                                            $("#aArrivalNotice").attr("src", "http://img.muyingzhijia.com/images/detail_btn06.gif");
                                            $("#divStock").html("<span style='color:#f00;'>有货</span>");
                                        }
                                        if (fromSaleQty > pDict[gid].Stock) {
                                            $(this).find(".btn_m_o").removeClass().addClass("btn_m btn_m_c");
                                            $(this).find(".btn_m_c a").removeClass().addClass("list03_con_submit").text("到货通知");
                                        }
                                    }

                                } else {

                                    var fromSaleQty = (pDict[gid].FromSaleQty);
                                    //if (fromSaleQty > 1) {
                                    //    $(this).find(".btn_m_o a").attr("salesQty", fromSaleQty);
                                    //    fromSaleQtyValue.text("(" + fromSaleQty + "件起售)");
                                    //}
                                    if ($("#hidProductId").val() == pDict[gid].ProductId && $("#hidProductId") != null && $("#hidSubpromotionType").val() != 1) {
                                        $("#PromotionPrice strong").html(pDict[gid].PromPriceShow.toFixed(2));
                                        $("#hidQty").val(0);
                                        $("#aArrivalNotice").attr("src", "http://img.muyingzhijia.com/images/detail_btn07.gif");
                                        $("#divStock").html("<span style='color:#f00;'>缺货</span>");
                                    }

                                    arrivalNotice($(this), gid); //到货通知

                                }
                            } else {


                                var menuPrice = $("#item_" + gid).text();
                                $price.html(menuPrice);
                                //$("#aArrivalNotice").attr("src", "http://img.muyingzhijia.com/images/detail_btn07.gif");
                                //$("#divStock").html("<span style='color:#f00;'>缺货</span>");
                                noProductExist($(this)); //下架商品到货通知
                                var fromSaleQty = (pDict[gid].FromSaleQty);
                                //if (fromSaleQty > 1) {
                                //    $(this).find(".btn_m_o a").attr("salesQty", fromSaleQty);
                                //    fromSaleQtyValue.text("(" + fromSaleQty + "件起售)");
                                //}
                            }
                        });
                    } else {
                        $this.find("[data-type='item']").each(function () {
                            var gid = $(this).data("gid");
                            var $price = $(this).find("[data-type='price']");
                            var fromSaleQtyValue = $(this).find("[data-sales='salesPrice']");
                            var menuPrice = $("#item_" + gid).text();
                            if (typeof (pDict[gid]) != 'undefined') {
                                try {

                                    $price.html(menuPrice);
                                    var fromSaleQty = (pDict[gid].FromSaleQty);
                                    //if (fromSaleQty > 1) {
                                    //    $(this).find(".btn_m_o a").attr("salesQty", fromSaleQty);
                                    //    fromSaleQtyValue.text("(" + fromSaleQty + "件起售)");
                                    //}
                                } catch (e) {

                                }
                            }
                        });
                    }
                }
            });
        });
    };
})();

function arrivalNotice($this, productId) {
    if ($this.find(".btn_m_o")) {
        $this.find(".btn_m_o").removeClass().addClass("btn_m btn_m_c");
        $this.find(".btn_m_c a").removeClass().addClass("list03_con_submit").text("到货通知");
        //详情界面的数据提取
    }

    $this.find(".btn_m_c").attr("style", "display:black");
    $this.find(".btn_m_c a").attr("pidorg", productId);
    $this.find(".btn_m_c a").attr("promid", 0);
    $this.find(".btn_m_c a").attr("name", 0);
    $this.find(".btn_m_c a").attr("sort", 0);
}

function noProductExist($this) {
    if ($this.find(".btn_m_o")) {
        $this.find(".btn_m_o").removeClass().addClass("btn_m btn_m_c");
        $this.find(".btn_m_c a").removeClass().addClass("list03_con_submit").text("到货通知");
    }
}

function hasStock($this) {

    if ($this.find(".btn_m_c")) {
        $this.find(".btn_m_c").removeClass().addClass("btn_m btn_m_o");
        $this.find(".btn_m_o a").removeClass().addClass("list02_con_submit").text("加入购物车");

    }
}

//#region 获取页面头部工具条
function getPageTopToolbar() {

    var bindEvent = function () {

        if (typeof (window.initPage) == "function") {
            window.initPage();
        }

        if (typeof (window.PageInits) !== "undefined" && window.PageInits instanceof Array) {
            for (var i = 0; i < window.PageInits.length; i++) {
                var fun = window.PageInits[i];

                if (typeof (fun) == "function") {
                    try {
                        fun();
                    } catch (e) {

                    }
                }
            }
        }

        //nav 浮层;
        $("#phonebox").hover(function () {
            $(this).addClass("hoverphonediv");
            $("#phonehidediv").show();
        }, function () {
            $(this).removeClass("hoverphonediv");
            $("#phonehidediv").hide();
        });

        $("#ssn-home").hover(function () {
            $(this).addClass('ssn-hover-home');
            $("#Theader_down01").show();
        }, function () {
            $(this).removeClass('ssn-hover-home');
            $("#Theader_down01").hide();
        });
        $("#ssn-sitemap").hover(function () {
            $(this).addClass('ssn-hover');
            $("#Theader_down02").show();
        }, function () {
            $(this).removeClass('ssn-hover');
            $("#Theader_down02").hide();
        });
        $("#ssn-userservice").hover(function () {
            $(this).addClass('ssn-hover');
            $("#Theader_down03").show();
        }, function () {
            $(this).removeClass('ssn-hover');
            $("#Theader_down03").hide();
        });

        var needRefreshUrls = [];
        //needRefreshUrls.push("checkout");
        //needRefreshUrls.push("customercenter");
        //needRefreshUrls.push("LandingPage.aspx");
        //needRefreshUrls.push("mama/index.aspx");
        //needRefreshUrls.push("ActivitiesPage_LYF.aspx");

        var targetUrl = "";
        var pageUrl = window.location.href;
        var urlSearch = window.location.search;

        if (urlSearch.toLowerCase().indexOf("foward") <= -1 && pageUrl.toLowerCase().indexOf("register.aspx") <= -1 && pageUrl.toLowerCase().indexOf("login.aspx") <= -1) {
            if (urlSearch.toLowerCase().indexOf("condition") != 1) {
                pageUrl += urlSearch;
            }
            targetUrl = "?foward=" + encodeURIComponent(pageUrl);
        }

        var url = location.href;
        if (url.indexOf("t.muyingzhijia") >= 0) {
            $(".header-quick-menu li").each(function () {
                $(this).removeClass("curpage");
            });
            $(".header-quick-menu li").eq(1).addClass("curpage");
        }

        var $loginBtn = $("#liLoginBtn");
        var $regionBtn = $("#liRegBtn");
        $loginBtn.attr("href", $loginBtn.attr("href") + targetUrl);
        $regionBtn.attr("href", $regionBtn.attr("href") + targetUrl);
        $("#liLogOut").click(function () {
            jQuery.ajax({
                type: "GET",
                async: true,
                dataType: 'jsonp',
                url: window.WebApiRoot + 'api/logout',
                data: "",
                success: function (result) {
                    var this_href = window.location.href;
                    var isRefresh = true;

                    for (var i = 0; i < needRefreshUrls.length; i++) {
                        if (new RegExp(needRefreshUrls[i], "i").test(this_href)) {
                            isRefresh = true;
                            break;
                        }
                    }

                    if (isRefresh) {
                        window.location.reload();
                    } else {
                        getPageTopToolbar();
                    }
                }
            });
        });


        //qq客服 通过异步加载
        //$.ajax({
        //    url: 'http://wpa.b.qq.com/cgi/wpa.php',
        //    timeout: 5000,
        //    dataType: 'script',
        //    success: function () {
        //        try {
        //            setTimeout(function() {
        //                BizQQWPA.add({
        //                    //aty: '1', //接入到指定工号
        //                    // a: '1001', //指定工号1001接入
        //                    type: '1', //使用按钮类型 WPA
        //                    ws: 'www.muyingzhijia.com',
        //                    title: '欢迎咨询母婴之家',
        //                    nameAccount: '4008201000', //营销 QQ 号码
        //                    parent: 'qq_Statica' //将 WPA 放置在 ID 为 testAdd 的元素里
        //                });
        //            },500);
        //        } catch (e) {

        //        }
        //    },
        //    error: function () {
        //        //console.error(arguments);
        //    }
        //});

        //引用侧边栏;
        //String.prototype.trim = function () {
        //    return this.replace(/(^\s*)|(\s*$)/g, "");
        //}
        var pathUrl = window.location.pathname;
        var isUrl = ["/Shopping/category.aspx", "/Shopping/subcategory.aspx", "/Shopping/SearchResult.aspx", "/Shopping/Error.aspx"];
        for (var i in isUrl) {
            var url = isUrl[i];
            if (url == pathUrl) {
                if ($("#slidebar").length <= 0) {
                    var el = document.createElement("script");
                    el.type = "text/javascript";
                    el.async = true;
                    el.src = window.res_url + "js/sideToolBar.js?v=1";
                    document.body.appendChild(el);
                }
            } else {
                continue;
            }
        }

    }

    if ($("#wfc_head_t1_div").length > 0) {

        $.ajax({
            cache: false,
            //url: window.WebApiRoot + '/Fragment/HeaderBar',
            url: window.website_url + '/PageTopToolbar.aspx',
            dataType: 'jsonp',
            type: 'get',
            success: function (html) {

                if (typeof (html) != 'undefined') {
                    $("#wfc_head_t1_div").html(html);

                    bindEvent();

                }
            }
        });
    }
}
//#endregion

function imgError(obj) {
    var noImg = res_url + "images/errorImg.jpg";
    var imgSrc = $(obj).attr("src");
    $(obj).attr("src", noImg);
}

function _gaq_push(pagename, fieldname, url, isenabled) {
    _gaq.push(['_trackEvent', pagename, fieldname, url]);
}

function ErrorLog(v_messages, v_ex, type) {
    var _e_vh_website_url = jQuery("#vh_website_url").val();
    var _e_vh_userid = jQuery("#vh_userid").val();
    var _e_vh_Guid = jQuery("#vh_Guid").val();
    if (type === '1') {
        type = 'error';
    } else if (type === '2') {
        type = 'warn';
    } else if (type === '3') {
        type = 'info';
    }
    //jQuery.ajax({
    //    contentType: 'application/text',
    //    dataType: 'text',
    //    url: _e_vh_website_url + '/ajax/?method=Log&message=' + v_messages + '^_^' + _e_vh_userid + '^_^' + _e_vh_Guid + '&ex=' + v_ex + '&type=' + type + '&sian='
    //});
}

window.ag_count_send = function () { };

$.mScrollTop = function (el) {
    var $obj = $(el);
    if ($obj.length > 0) {
        var yPosition = $obj.offset().top;
        $('html,body').animate({
            scrollTop: yPosition
        }, 1000);
    }
};

//解析URL方法
function GetQueryString(name) {

    var result = null;

    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");

    var r = window.location.search.substr(1).match(reg);

    if (r != null) {
        result = unescape(r[2]);
        var strLen = (result + "").length;
        if (strLen > 0 && result[strLen - 1] == ",") {
            result = result.substring(0, strLen - 1);
        }
    }
    return result;
}

//调用微信二维码
function getWeiXinImg(obj, src, isText) {
    var date = new Date();
    var min = date.getMinutes();
    var rand = "" + date.getYear() + date.getMonth() + date.getDay() + date.getHours();
    var secs = rand + parseInt(min / 20);
    var dataHtml = [];
    dataHtml.push('<dl class="weixin-imgloading"><dt>');
    dataHtml.push('<img id="img-weixin"  src="http://img.muyingzhijia.com/qrcode/wxbind/' + src + '.png?v=' + secs + '" /></dt>');
    if (isText) {
        dataHtml.push('<dd><span><i></i>绑定微信账户</span></dd></dl>');
    } else {
        dataHtml.push('</dl>');
    }
    obj.html(dataHtml.join(""));
}


function getClientInfo() {
    var clientInfo = [];
    var osAgent = null;
    var os = navigator.platform; //get OS
    var colorDepth = screen.colorDepth;//获取屏幕颜色
    var screenSize = screen.availWidth + "*" + screen.availHeight;//
    var winHeight = document.documentElement.clientHeight;
    var winWidth = document.documentElement.clientWidth;
    var browserSize = winHeight + "*" + winWidth;
    //var agent = navigator.userAgent.toLowerCase();
    var x = navigator.userAgent.match(/x86_64|Win64|WOW64/) || navigator.cpuClass === 'x64' ? 'x64' : 'x32';
    osAgent = x;
    var browserTitle = getBrowserVersion();
    var browserName = getBrowserInfo();
    var verinfo = (browserName + "").replace(/[^0-9.]/ig, "");
    var browserVersion = verinfo;
    var JsVersion = JsVersionList();
    var JavaEnable = navigator.javaEnabled();
    clientInfo.push("os=" + os); //操作系统
    clientInfo.push("colorDepth=" + colorDepth);//获取屏幕颜色
    clientInfo.push("screenSize=" + screenSize);//屏幕 大小
    clientInfo.push("browserSize=" + browserSize);//浏览器窗口大小
    clientInfo.push("platform=" + osAgent);
    clientInfo.push("browserName=" + browserTitle);
    clientInfo.push("browserVersion=" + browserVersion);
    clientInfo.push("JavascriptVersion=" + JsVersion);
    clientInfo.push("JavaEnable=" + JavaEnable);
    var client = clientInfo.join("&");
    $("#clientVersion").val(client);
    $("#ctl00_ContentPlaceHolder1_clientVersion2").val(client);
    $("#ContentPlaceHolder1_clientVersion2").val(client);
}

function getBrowserInfo() {
    var agent = navigator.userAgent.toLowerCase();

    var regStr_ie = /msie [\d.]+;/gi;
    var regStr_ff = /firefox\/[\d.]+/gi;
    var regStr_chrome = /chrome\/[\d.]+/gi;
    var regStr_saf = /safari\/[\d.]+/gi;
    //IE
    if (agent.indexOf("msie") > 0) {
        return agent.match(regStr_ie);
    }

    //firefox
    if (agent.indexOf("firefox") > 0) {
        return agent.match(regStr_ff);
    }

    //Chrome
    if (agent.indexOf("chrome") > 0) {
        return agent.match(regStr_chrome);
    }

    //Safari
    if (agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0) {
        return agent.match(regStr_saf);
    }

}


function getBrowserVersion() {
    var explorer = window.navigator.userAgent.toLowerCase();
    var browswerType = null;
    if (explorer.indexOf("msie") >= 0) {

        browswerType = "IE";
    }
        //firefox 
    else if (explorer.indexOf("firefox") >= 0) {

        browswerType = "Firefox";
    }
        //Chrome
    else if (explorer.indexOf("chrome") >= 0) {

        browswerType = "Chrome";

    }
        //Opera
    else if (explorer.indexOf("opera") >= 0) {

        browswerType = "Opera";

    }
        //Safari
    else if (explorer.indexOf("Safari") >= 0) {

        browswerType = "Safari";
    }
    return browswerType;
}

function JsVersionList() {
    var n = navigator;
    var u = n.userAgent;
    var apn = n.appName;
    var v = n.appVersion;
    var ie = v.indexOf('MSIE');
    if (ie > 0) {
        apv = parseInt(i = v.substring(ie + 5));
        if (apv > 3) {
            apv = parseFloat(i);
        }
    } else {
        apv = parseFloat(v);
    }
    var isie = (apn == 'Microsoft Internet Explorer');
    var ismac = (u.indexOf('Mac') >= 0);
    var javascriptVersion = "1.0";
    if (String && String.prototype) {
        javascriptVersion = '1.1';
        if (javascriptVersion.match) {
            javascriptVersion = '1.2';
            var tm = new Date;
            if (tm.setUTCDate) {
                javascriptVersion = '1.3';
                if (isie && ismac && apv >= 5) javascriptVersion = '1.4';
                var pn = 0;
                if (pn.toPrecision) {
                    javascriptVersion = '1.5';
                    a = new Array;
                    if (a.forEach) {
                        javascriptVersion = '1.6';
                        i = 0;
                        o = new Object;
                        tcf = new Function('o', 'var e,i=0;try{i=new Iterator(o)}catch(e){}return i');
                        i = tcf(o);
                        if (i && i.next) {
                            javascriptVersion = '1.7';
                        }
                    }
                }
            }
        }
    }
    return javascriptVersion;
}

var displayLabel = function getDisplayLables() {

    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function (elt /*, from*/) {
            var len = this.length >>> 0;
            var from = Number(arguments[1]) || 0;
            from = (from < 0)
                 ? Math.ceil(from)
                 : Math.floor(from);
            if (from < 0)
                from += len;
            for (; from < len; from++) {
                if (from in this &&
                    this[from] === elt)
                    return from;
            }
            return -1;
        };
    }


    var displayLables = window.UserLabel;
    if (displayLables == '' && displayLables == null) {
        displayLables = $.cookie("DisplayLabels") || $.cookie("_displaylabelids");
    }
    var lables = [];
    var displayLable = '';
    if (typeof displayLables != "undefined") {
        if (displayLables.indexOf("[") > -1) {
            var splits = displayLables.split(',');
            for (var i = 0; i < splits.length; i++) {
                lables.push(splits[i].replace('[', '').replace(']', ''));
            }
            displayLable = lables.join(",");

        } else {
            displayLable = displayLables.join(",");
        }
    }
    return displayLable;
};


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
    //var str = "http://beta.t.muyingzhijia.com/";
    var str2 = window.TemaiRoot;
    return str2 + "pro/" + specialId + "/" + ProductId + ".html?sku=" + ProductSkuId;
}

/**
*   @param specialId  专场id
*   @param ProductId  商品id
*   @param ProductSkuId  商品id
*   获取特卖商品详情页URL
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


function autoScrollGg(obj) {
    $(obj).find("ul:first").animate({
        marginTop: "-35px"
    }, 500, function () {
        $(this).css({ marginTop: "0px" }).find("li:first").appendTo(this);
    });
}

/*
* 图片点击左右切换插件
* 使用页面：promotion/mumLottery.aspx
*/
$.fn.myzjSilder = function () {
    var self = $(this);
    $.each(self, function (i, item) {
        var obj = $(this);
        obj.attr("data-page", 1);
        var liWidth = obj.find("li").width();
        var liLen = obj.find("li").length;
        var boxInnerLen = Math.ceil(obj.width() / liWidth); //判断一行放多少个li
        obj.show().find("ul").css("width", liWidth * liLen);
        if (liLen > boxInnerLen) {
            obj.find(".myzj-arr").show();
        } else {
            obj.find(".myzj-arr").hide();
        }
        var preBtn = obj.find(".myzj-preBtn");
        var nextBtn = obj.find(".myzj-nextBtn");
        var target = obj.find("ul");
        preBtn.click(function () {
            var page = parseInt(obj.attr("data-page"));
            if (page == 1) {
                target.stop().animate({
                    marginLeft: -(liLen - boxInnerLen) * liWidth
                }, 400, function () {
                    obj.attr("data-page", (liLen - boxInnerLen + 1));
                });
            } else {
                obj.attr("data-page", page - 1);
                page = parseInt(obj.attr("data-page"));
                target.stop().animate({
                    marginLeft: -(page - 1) * liWidth
                }, 400);
            }
        });

        nextBtn.click(function () {
            var page = parseInt(obj.attr("data-page"));
            if (page == (liLen - boxInnerLen + 1)) {
                target.stop().animate({
                    marginLeft: 0
                }, 400, function () {
                    obj.attr("data-page", 1);
                });
            } else {
                obj.stop().attr("data-page", page + 1);
                page = parseInt(obj.attr("data-page"));
                target.animate({
                    marginLeft: -(page - 1) * liWidth
                }, 400);
            }
        });
    });
}


function getNavGationData() {
    if ($(".ui-category").length > 0) {
        var data = '[' +
                            '{ "CategoryId": 11},' +
                            '{ "CategoryId": 2},' +
                            '{ "CategoryId": 441},' +
                            '{ "CategoryId": 442},' +
                            '{ "CategoryId": 6},' +
                            '{ "CategoryId": 3},' +
                            '{ "CategoryId": 7},' +
                            '{ "CategoryId": 9},' +
                            '{ "CategoryId": 443}' +
                        ']';
        if(typeof(window.GoodsApi)=="undefined"){
            window.GoodsApi = "http://goods.api.muyingzhijia.com/";
        }
        var WebRoot = window.website_url || window.WebRoot;
        jQuery.ajax({
            url: window.GoodsApi + "json/reply/QueryIndexCategorys",
            data: { ParentIds: data },
            type: "get",
            async: true,
            dataType: 'jsonp',
            success: function (result) {
                if (result.DoFlag) {
                    $.each(result.QueryIndexCategorysDtos, function (i, item) {
                        var html = [];
                        html.push('<div class="ui-cate-left-box" >');
                        $.each(item.GetTwoCategory, function (j, list) {
                            html.push('<dl>');
                            html.push('<dt><a href="' + WebRoot + '/Shopping/subcategory.aspx?cateID=' + list.TwoCatetory.IntCateID + '" target="_blank" style="color:' + list.TwoCatetory.TextColor + '">' + list.TwoCatetory.VchCateName + '</a></dt>');
                            html.push('<dd>');
                            if (list.TwoCatetory.ThreeCategory != null) {
                                $.each(list.TwoCatetory.ThreeCategory, function (k, cate) {
                                    if (cate.vchCateUrl != 'undefined' && cate.vchCateUrl != null && cate.vchCateUrl != '') {
                                        html.push('<a href="' + cate.vchCateUrl + '" target="_blank" style="color:"' + cate.TextColor + '>' + cate.VchCateName + '</a>');
                                    } else {
                                        html.push('<a href="' + WebRoot + '/Shopping/subcategory.aspx?cateID=' + cate.IntCateID + '" target="_blank" style="color:"' + cate.TextColor + '>' + cate.VchCateName + '</a>');
                                    }
                                    if (k < list.TwoCatetory.ThreeCategory.length - 1) {
                                        html.push('| ');
                                    }
                                });
                            }
                            html.push('</dd>');
                            html.push('</dl>');
                        });
                        html.push('</div>');
                        //console.log('item.length', result.QueryIndexCategorysDtos.length);
                        $("#ui-cate-left-" + item.IntCateID).html(html.join(""));

                        var html2 = [];
                        html2.push('<div class="ui-brand-list">');
                        if (item.GetTwoBrand != null && item.GetTwoBrand.length > 0) {
                            $.each(item.GetTwoBrand, function (j, list) {
                                html2.push('<a href="' + list.ClickUrl + '" target="_blank" title="' + list.Title + '" >');
                                html2.push('<img src="' + list.PictureUrl + '" alt="' + list.Title + '" />');
                                html2.push('</a>');
                            });
                        }
                        html2.push('</div>');

                        var html3 = [];
                        html3.push('<div class="ui-brand-items">');
                        if (item.GetTwoAdImg != null && item.GetTwoAdImg.length > 0) {
                            $.each(item.GetTwoAdImg, function (j, list) {
                                html3.push('<a href="' + list.ClickUrl + '" target="_blank"  title="' + list.Title + '" >');
                                html3.push('<img src="' + list.PictureUrl + '" alt="' + list.Title + '" />');
                                html3.push('</a>');
                            });
                        }
                        html3.push('</div>');
                        $("#ui-cate-right-" + item.IntCateID).html(html2.join("") + html3.join(""));
                        $(".ui-category dl dd a").unbind().bind("click", function () {
                            var _this = $(this);
                            var dl = _this.parents("dl").index() + 1;
                            var li = _this.parents("li").index() + 1;
                            var index = _this.index() + 1;
                            myzjStatistics({
                                pageType: "cateItem",
                                targetUrl: _this.attr("href"),
                                goodsCount: 0,
                                cateListPosition: dl,
                                cateMenuPosition: li,
                                position: index,
                                targetIdentity: getQueryHrefString2(_this.attr("href"), "cateID")
                            });


                        });
                    });


                }
                $("#ui-silder-nav").attr("data-isLoaded", 1);
            }, error: function (XMLHttpResponse) {
                alert("系统繁忙，请稍后！");
            }
        });
    }
}

//防止页面被外网iframe调用

//防止页面被外网iframe调用
function stopIframe() {
    var url, data;
    try {
        url = "topUrl=" + top.location.href + "&selfUrl=" + window.WebRoot;
        data = {
            "ClientIp": window.ClientIp,
            "Message": "当前页面与父级页面window对象不同",
            "Url": url, // 需编码
            "SystemType": "1",
            "LogBody": "当前页面的url=" + window.WebRoot + ",父级页面的url=" + top.location.href + "",
            "Level": "Error"
        }
    } catch (exp) {
        url = "topUrl=" + window.location.host + "&selfUrl=" + window.WebRoot;
        data = {
            "ClientIp": window.ClientIp,
            "Message": "获取top.location异常",
            "Url": url, // 需编码
            "SystemType": "1",
            "LogBody": "当前页面的url=" + window.WebRoot + ",父级页面的url=",
            "Level": "Error"
        }
    }
    if (top != self) {
        jQuery.ajax({
            url: 'http://bs.api.muyingzhijia.com/logcollection',
            data: data,
            type: 'get',
            dataType: 'jsonp'
        });
    }
}



(function () {
    var flag = false;
    var timer = setInterval(function () {
        if (flag) {
            clearInterval(timer);
            return;
        }
        if (window.UserGuid != null) {
            flag = true;
            var myzjStat = document.createElement('script');
            myzjStat.type = 'text/javascript';
            myzjStat.async = true;
            var root = "";
            if (window.location.href.indexOf(".aspx") > 0) {
                if (window.location.href.indexOf("muyingzhijia.me") > 0) {
                    root = "http://static.muyingzhijia.me/mall/";
                } else if (window.location.href.indexOf("beta.muyingzhijia") > 0) {
                    root = "http://static.beta.muyingzhijia.com/mall/v16/";
                } else if (window.location.href.indexOf("r.muyingzhijia") > 0) {
                    root = "http://o.static.boodoll.cn/mall/yfb/";
                } else {
                    root = "http://static.boodoll.cn/mall/v16/";
                }
            } else {
                if (window.location.href.indexOf("haitao.muyingzhijia.com") > 0) {
                    root = "http://static.boodoll.cn/mall/v16/";
                } else if (window.location.href.indexOf("haitao.beta.muyingzhijia.com") > 0) {
                    root = "http://static.beta.muyingzhijia.com/mall/v16/";
                } else if (window.location.href.indexOf("haitao.muyingzhijia.me") > 0) {
                    root = "http://static.muyingzhijia.com/mall/";
                } else {
                    root = window.ThemesRoot
                }
            }
            myzjStat.src = root + "js/myzjStatic.js?v=" + (Date.parse(new Date().getDay())) / 1000;
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(myzjStat, s);
        }
     }, 300);
})();