var uv_t = null;
var uv_isshow = true;
var fs = false;
var isshow_item = false;

var C_url_com = "";


if (navigator.userAgent.indexOf('MSIE') < 0) {
    FixPrototypeForGecko();
}
function FixPrototypeForGecko() {
    HTMLElement.prototype.__defineGetter__("runtimeStyle", element_prototype_get_runtimeStyle);
    window.constructor.prototype.__defineGetter__("event", window_prototype_get_event);
    Event.prototype.__defineGetter__("srcElement", event_prototype_get_srcElement);
    Event.prototype.__defineGetter__("fromElement", element_prototype_get_fromElement);
    Event.prototype.__defineGetter__("toElement", element_prototype_get_toElement);
}
function element_prototype_get_runtimeStyle() {
    return this.style;
}
function window_prototype_get_event() {
    return SearchEvent();
}
function event_prototype_get_srcElement() {
    return this.target;
}
function element_prototype_get_fromElement() {
    var node;
    if (this.type == "mouseover") node = this.relatedTarget;
    else if (this.type == "mouseout") node = this.target;
    if (!node) return;
    while (node.nodeType != 1)
        node = node.parentNode;
    return node;
}
function element_prototype_get_toElement() {
    var node;
    if (this.type == "mouseout") node = this.relatedTarget;
    else if (this.type == "mouseover") node = this.target;
    if (!node) return;
    while (node.nodeType != 1)
        node = node.parentNode;
    return node;
}
function SearchEvent() {
    if (document.all) return window.event;
    func = SearchEvent.caller;
    while (func != null) {
        var arg0 = func.arguments[0];
        if (arg0 instanceof Event) {
            return arg0;
        }
        func = func.caller;
    }
    return null;
}

$(function () {
    //获取菜单
    //if ($("#ui-silder-nav").length > 0) {
    //    $("#ui-silder-nav dl").each(function (i, item) {
    //        getNavData($(item).attr("data-cateid"));
    //    });
    //}


    $.ajaxSetup({
        beforeSend: function (XMLHttpRequest, settings) {

            if (typeof (settings.url) == "string") {
                if (settings.url.toString().indexOf('?') > -1) {
                    settings.url += '&__=' + Math.random();
                } else {
                    settings.url += '?__=' + Math.random();
                }
            }
        }
    });
});
(function () {
    var urls = window.location.pathname;
    var urlsSearch = window.location.search;
    $("#vp_index").removeClass("current");
    $(".glossymenu li").removeClass("current");
    switch (urls) {
        case '/': $("#vp_index").addClass("current"); break;
        case '/luckyMonday.aspx': $("#vp_luckyMonday").addClass("current"); break;
            //case '/Shopping/FlashSales.aspx': $("#vp_flashsales").addClass("current"); break;
            //gaiban
            //case '/': $("#vp_index").addClass("current"); break;
            //case '/mama/index.aspx': $("#vp_mama_index").addClass("current"); break;
            //case '/zmm/index.aspx': $("#vp_zmm_index").addClass("current"); break;
            //case '/Shopping/ClearanceSale.aspx': $("#vp_ClearanceSale").addClass("current"); break;
            //case '/Shopping/allbrand.aspx':;
            //case '/Shopping/alllist.aspx': $("#vp_allbrand").addClass("current"); break;
    }
    switch (urlsSearch) {
        case '?code=FMCG': $("#Li1").addClass("current"); break;
        case '?code=liyingfang': $("#vp_flashsales").addClass("current"); break;
    }

    //if (urls.indexOf('FlashSalesDetails.aspx') > -1) {
    //    $("#vp_flashsales").addClass("current");
    //}

})();


var Common_js = {
    vh_image_url: jQuery("#vh_image_url").val(),
    vh_website_url: jQuery("#vh_website_url").val(),
    vh_search_url: jQuery("#vh_search_url").val(),
    vh_userid: jQuery("#vh_userid").val(),
    vh_BigCode: jQuery("#vh_BigCode").val(),
    vh_res_url: jQuery("#vh_res_url").val(),
    vh_pic_url: jQuery("#vh_pic_url").val(),
    vh_shoppingcart_url: jQuery("#vh_shoppingcart_url").val(),
    vh_engine_url: jQuery("#vh_engine_url").val(),
    vh_product_url: function (id) {
        return ($("#vh_product_url").val() || "").replace("#id#", id);
    },
    Log: function (logstr) {
        if (typeof (window.console) == "object")
            window.console.log(logstr);
        else
            alert(logstr);
    }
};

var bind_subitem = function (parentId, curChild) {
    var curCh = $(curChild);
    var this_index;
    if (parentId == 11) {
        this_index = "1";
    } else if (parentId == 441) {
        this_index = "2";
    } else if (parentId == 5) {
        this_index = "3";
    } else if (parentId == 442) {
        this_index = "4";
    } else if (parentId == 2) {
        this_index = "5";
    } else if (parentId == 6) {
        this_index = "6";
    } else if (parentId == 3) {
        this_index = "7";
    } else if (parentId == 7) {
        this_index = "8";
    } else if (parentId == 9) {
        this_index = "9";
    } else if (parentId == 443) {
        this_index = "10";
    }
    if (curCh.find("div.category-sub dl").length == 0) {
        jQuery.ajax({
            type: "POST",
            contentType: "application/json",
            url: Common_js.vh_website_url + '/Ajax/IndexAjax.aspx/IndexPdtType',
            data: "{parentId:'" + parentId + "'}",
            dataType: 'json',
            async: false,
            success: function (result) {
                var ProductCategory = result.d.ProductCategory;
                var HotBrand = result.d.HotBrand;
                var HotActivity = result.d.HotActivity;
                var curChildArray_html = '';

                curCh.empty();
                curChildArray_html += '<div class="category-sub">';
                var pars_wfc = 'cateID';
                for (var i = 0; i < ProductCategory.length; i++) {
                    curChildArray_html += '<dl>';

                    if (ProductCategory[i].VchCateUrl != null && ProductCategory[i].VchCateUrl != "") {
                        curChildArray_html += '<dt><a href="' + ProductCategory[i].VchCateUrl + '" target="' + ProductCategory[i].VchUrlOpenMode + '" class="stats_a" data-code="menu" data-index="' + this_index + "_B" + i + "_0" + '">' + ProductCategory[i].VchMenuShowName + '</a></dt>';
                    } else {
                        curChildArray_html += '<dt><a href="' + Common_js.vh_website_url + '/Shopping/subcategory.aspx?cateID=' + ProductCategory[i].ProductCategoryId + '&small=1" target="' + ProductCategory[i].VchUrlOpenMode + '" class="stats_a" data-code="menu" data-index="' + this_index + "_B" + i + "_0" + '">' + ProductCategory[i].VchMenuShowName + '</a></dt>';
                    }
                    curChildArray_html += '<dd>';
                    for (var j = 0; j < ProductCategory[i].PcList.length; j++) {
                        if (ProductCategory[i].PcList[j].VchCateUrl != null && ProductCategory[i].PcList[j].VchCateUrl != "") {
                            curChildArray_html += '<a href="' + ProductCategory[i].PcList[j].VchCateUrl + '"  target="' + ProductCategory[i].PcList[j].VchUrlOpenMode + '" class="stats_a" data-code="menu" data-index="' + this_index + "_B" + i + "_" + (j + 1) + '">' + ProductCategory[i].PcList[j].VchMenuShowName + '</a>';
                        } else {
                            curChildArray_html += '<a href="' + Common_js.vh_website_url + '/Shopping/subcategory.aspx?cateID=' + ProductCategory[i].PcList[j].ProductCategoryId + '&small=1"  target="' + ProductCategory[i].PcList[j].VchUrlOpenMode + '" class="stats_a" data-code="menu" data-index="' + this_index + "_B" + i + "_" + (j + 1) + '">' + ProductCategory[i].PcList[j].VchMenuShowName + '</a>';
                        }
                    }
                    curChildArray_html += '</dd>';
                    curChildArray_html += '</dl>';
                }
                curChildArray_html += '</div>';
                curChildArray_html += '<div class="sort-sub"><div class="sort-sub-brands">';


                if (HotBrand.length > 0) {
                    curChildArray_html += '<ul class="categorys-brands"><h3>推荐品牌</h3>';

                    for (var a = 0; a < HotBrand.length; a++) {
                        curChildArray_html += '<li><a href="' + Common_js.vh_website_url + '/Shopping/SearchResult.aspx?brandid=' + HotBrand[a].BrandID + '" target="_blank" class="stats_a" data-code="menu" data-index="' + this_index + "_C0" + "_" + a + '">' + HotBrand[a].BrandName + '</a></li>';
                    }
                    curChildArray_html += '</ul>';
                }

                if (HotActivity != null && HotActivity.length > 0) {
                    curChildArray_html += '<ul class="categorys-promotions"><h3>热销活动</h3>';
                    for (var b = 0; b < HotActivity.length; b++) {
                        if (HotActivity[b].VchActivityPicUrl != null && HotActivity[b].VchActivityPicUrl != "") {
                            curChildArray_html += '<li><a href="' + HotActivity[b].ActivityUrl + '" target="' + HotActivity[b].VchUrlOpenMode + '" class="stats_a" data-code="menu" title="' + HotActivity[b].ActivityName + '" data-index="' + this_index + "_D0" + "_" + b + '"><img src="' + HotActivity[b].VchActivityPicUrl + '" width="210" height="100"></a></li>';
                        }
                        else {
                            curChildArray_html += '<li><a href="' + HotActivity[b].ActivityUrl + '" target="' + HotActivity[b].VchUrlOpenMode + '" class="stats_a" data-code="menu" data-index="' + this_index + "_D0" + "_" + b + '">' + HotActivity[b].ActivityName + '</a></li>';
                        }
                    }
                }
                curChildArray_html += '</ul>';
                curChildArray_html += '</div>';
                curChildArray_html += '</div>';
                curCh.append(curChildArray_html);
                $("a.stats_a").click(function () {
                    var $obj = $(this);
                    var page = window.location.href;
                    if (page.length == 0) {
                        page = "index.aspx";
                    }
                    var moduleCode = $obj.data("code");
                    var moduleDataIndex = $obj.data("index") || "0";
                    var href = $obj.attr("href") || "";

                    if (href.length > 0) {
                        _gaq_push(decodeURIComponent(page), moduleCode + "_" + moduleDataIndex, decodeURIComponent(href), 1);
                    }
                });
            }
        });
    }
}

var hover_ShopCart_Two = function () {
    var showing, shown, closing;
    $(".shopcart").hover(function () {
        if (closing) clearTimeout(closing);
        trigergetshoppingcart();
        showing = setTimeout(function () {
            if (!shown)
                $("#cartList").stop().slideDown(200, function () {
                    shown = true;
                });
        }, 150);
    }, function () {
        if (showing) {
            clearTimeout(showing);
        }
        if (shown) {
            closing = setTimeout(function () {
                $("#cartList").slideUp(200, function () {
                    shown = false;
                });
            }, 300);
        }
    });
};

var isshow = false;
var HeaderEvent = {
    subItem_hover: function () {
        var vh_pagename = jQuery("#vh_pagename").val();
        if ('Index' == vh_pagename) {
            $(".l_c_item").unbind("hover").hover(function () {
                var data_id = $(this).attr("data_id");
                bind_subitem(data_id, $(this).children(".subitem"));
                $(this).children(".subitem").show();
                $(this).addClass("curr");
                $("#search-quick-item").hide();
            }, function () {
                $(this).children(".subitem").hide();
                $(this).removeClass("curr");
            });

            $('#brand-list').bxCarousel({
                display_num: 1,
                move: 1,
                auto: true,
                controls: false,
                margin: 0,
                auto_hover: true
            });
        } else {
            $(".l_c_item").unbind("hover").hover(function () {
                clearTimeout(uv_t);
                var data_id = $(this).attr("data_id");
                bind_subitem(data_id, $(this).children(".subitem"));
                $(this).children(".subitem").show();
                $(this).addClass("curr");
                $("#search-quick-item").hide();
            }, function () {
                $(this).children(".subitem").hide();
                $(this).removeClass("curr");
            });
        }
    },
    hover_search_quick_item_Fun: function () {
        function showbox(sw) {
            if (sw) {
                if ('Index' == vh_pagename) {

                } else {
                    $("#wfc_item").show();
                }
                $("#search-quick-item").show();
            } else {
                var vh_pagename = jQuery("#vh_pagename").val();
                if ('Index' == vh_pagename) {

                } else {
                    $("#wfc_item").hide();
                }
                $("#search-quick-item").hide();
            }
        }
        function findbox(obj) {
            var o = obj;
            while (o) {

                if (o.length > 0) {
                    isshow_item = false;

                    return true;
                }
                o = o.parentElement;

            }
            $("body").unbind("mouseover");
            return false;
        }
        $(".search-quick").unbind("hover").hover(function (event) {
            var _Select1 = $("#Select1 option").length;
            var _Select3 = $("#Select3 option").length;
            if (_Select1 <= 1 && _Select3 <= 1) {
                HeaderEvent.tag_select_Fun();
            }
            //解决导致搜索浮层弹出的问题 可能会导致所编搜索兼容性问题
            //$("#txSearchCondition").focus();
            var userAgent = navigator.userAgent.toLowerCase();
            if (userAgent.indexOf('se 2.x') != -1) {
                event.stopPropagation();
                event.preventDefault();
            }
            clearTimeout(uv_t);
            $("#search-quick-item").show();
            $("#search-quick-item").unbind("mouseover").mouseover(function (event) {

                $(this).show();
                //解决导致搜索浮层弹出的问题 可能会导致所编搜索兼容性问题
                //$("#txSearchCondition").blur();
                var userAgent = navigator.userAgent.toLowerCase();
                if (userAgent.indexOf('se 2.x') != -1) {
                    event.stopPropagation();
                    event.preventDefault();
                }
                $("body").unbind("mouseover").bind("mouseover", function (event) {
                    var userAgent = navigator.userAgent.toLowerCase();
                    if (userAgent.indexOf('se 2.x') != -1) {
                        event.stopPropagation();
                        event.preventDefault();
                    }
                    clearTimeout(uv_t);
                    uv_t = null;
                    uv_isshow = true;

                    var event = event || window.event;
                    var e = event.srcElement || event.target;

                    var eObj = $(event.toElement).parents('#search-quick-item');
                    var eObjMenu = $(event.toElement).parents('#search_quick');

                    if (event.toElement == null && (event.fromElement == null || e.tagName == 'SELECT' || e.tagName == 'OPTION')) {
                        fs = true;
                        showbox(true);
                        uv_isshow = true;
                    }
                    else {
                        fs = findbox(eObj);
                        if (fs) {
                            uv_isshow = true;
                            showbox(fs);
                        } else {
                            uv_isshow = false;
                            uv_t = setTimeout(function () {
                                if (!uv_isshow) {
                                    showbox(fs);
                                }
                            }, 2000);
                        }
                    }
                });
            });
        }, function () {
            $("#search-quick-item").hide();
        });
    },
    Banner: function () {
        var Up = function () {
            jQuery("#banner").slideUp(1500);
            jQuery("#close").css("background", "url(" + Common_js.vh_res_url + "images/close-open.png) no-repeat");
        }
        jQuery("#close").click(function () {
            jQuery("#banner").slideToggle(600, function () {
                if (jQuery("#banner").css("display") == "none") {
                    jQuery("#close").css("background", "url(" + Common_js.vh_res_url + "images/close-open.png) no-repeat");
                }
                else {
                    jQuery("#close").css("background", "none");
                }
            });
        });
    },
    BannerTwo: function () {
        if (jQuery("#js_ads_banner_top_slide").length) {
            var jQueryslidebannertop = jQuery("#js_ads_banner_top_slide"), jQuerybannertop = jQuery("#js_ads_banner_top");
            setTimeout(function () {
                jQuerybannertop.slideUp(1000);
                jQueryslidebannertop.slideDown(1000);

            }, 2500);
            setTimeout(function () {
                jQueryslidebannertop.slideUp(1000, function () {
                    jQuerybannertop.slideDown(1000);
                });
            }, 6000);
        }
    },
    is_no_page: function () {
        var vh_pagename = jQuery("#vh_pagename").val();
        if ('Index' == vh_pagename) {
            if (Common_js.vh_BigCode == '') {
                HeaderEvent.Banner();
            } else {
                HeaderEvent.BannerTwo();
            }
        } else {
            var _wfc_item = jQuery("#wfc_item");
            var _category_wfc = jQuery(".category-hd,#wfc_item");

            var show_item = function () { _wfc_item.show() };
            var hide_item = function () { _wfc_item.hide() };
            _category_wfc.unbind("hover").hover(function () {
                isshow_item = false;
                show_item();
            }, function () {
                isshow_item = true;
                if (!fs && isshow_item) {
                    hide_item();
                }
            });
        }
    },
    hover_ShopCart: function () {
        var handle = null;
        jQuery("#wfc_head_gwc_div").hover(function (e) {
            e.stopPropagation();
            e.preventDefault();
            clearTimeout(handle);
            jQuery("#wfc_head_gwc_div").slideDown(200);
        }, function (e) {
            e.stopPropagation();
            e.preventDefault();
            handle = setTimeout(function () { jQuery("#wfc_head_gwc_div").slideUp(200); }, 500);
        });
        jQuery("#wfc_gwc_eleG").hover(function (e) {
            e.stopPropagation();
            e.preventDefault();
            trigergetshoppingcart();
            clearTimeout(handle);
            jQuery("#wfc_head_gwc_div").slideDown(200);
        }, function (e) {
            e.stopPropagation();
            e.preventDefault();
            handle = setTimeout(function () { jQuery("#wfc_head_gwc_div").slideUp(200); }, 200);
        });
    },
    tag_select_Fun: function () {
        var id = 0;
        var cateId = 38;
        var cateIdT = 57;
        var c_cateId = 0;
        var brandId = 0;
        var brandIdT = 0;
        var se0s = $("#Select0");
        var se1s = $("#Select1");
        var se2s = $("#Select2");
        var se3s = $("#Select3");
        var _search_item_quick = jQuery("#search-quick-item");
        se0s.get(0).options[0].selected = true;
        se2s.get(0).options[0].selected = true;
        var seChange_fun = function (curObj, sePsObj) {
            var id_c_p = $(curObj);
            if (id_c_p.attr("id") == "Select0") {
                cateId = $(curObj).val();
            } else {
                cateIdT = $(curObj).val();
            }
            jQuery.ajax({
                type: "POST",
                contentType: "application/json",
                url: Common_js.vh_website_url + '/Ajax/IndexAjax.aspx/GetBrand',
                data: "{cateId:'" + id_c_p.val() + "'}",
                dataType: 'jsonp',
                async: true,
                success: function (result) {
                    var BrandList = result.d.BrandList;
                    var sePs = $(sePsObj);
                    sePs.empty();
                    var subStrh = '<option value="0">所有品牌</option>';
                    for (var i = 0; i < BrandList.length; i++) {
                        subStrh += '<option value="' + BrandList[i].BrandId + '">' + BrandList[i].BrandName + '</option>';
                    }
                    sePs.append(subStrh);

                }
            });
        };

        var get_value_se = function (curObj) {
            var id_c = $(curObj).attr("id");
            if (id_c == "Select1") {
                brandId = $(curObj).val();
            } else {
                brandIdT = $(curObj).val();
            }
        };
        seChange_fun(se0s, "#Select1");
        seChange_fun(se2s, "#Select3");
        se0s.change(function () {
            seChange_fun(this, "#Select1");
        });
        se2s.change(function () {
            seChange_fun(this, "#Select3");
        });
        se1s.change(function () {
            get_value_se(this);
        });
        se3s.change(function () {
            get_value_se(this);
        });

        $("#milk_powder").click(function () {
            if (brandId == 0) { window.location.href = Common_js.vh_website_url + '/Shopping/subcategory.aspx?cateID=' + cateId; } else {
                window.location.href = Common_js.vh_website_url + '/Shopping/subcategory.aspx?cateID=' + cateId + '&brandID=' + brandId;
            }

        });

        $("#diapers").click(function () {
            if (brandIdT == 0) { window.location.href = Common_js.vh_website_url + '/Shopping/subcategory.aspx?cateID=' + cateIdT; } else {
                window.location.href = Common_js.vh_website_url + '/Shopping/subcategory.aspx?cateID=' + cateIdT + '&brandID=' + brandIdT;
            }

        });

    },
    SeachKey: function () {

        //#region 获取搜索列表对象
        var getSearchList = function () {
            if ($("#keyword_list").length <= 0) {
                var klistTemplate = ['<ul class="keyword-search" id="keyword_list"></ul>'].join('');
                $(document.body).append(klistTemplate);
            }
            return $("#keyword_list");
        };
        //#endregion

        //#region 绑定数据到元素
        var bindSearchList = function ($this, data) {

            var keyword = $this.val();
            var searchList = getSearchList();
            var listItem = [];
            if (typeof (data) != 'undefined' && typeof (data.klist) != 'undefined' && (data.klist instanceof Array)) {
                $.each(data.klist, function (index, item) {
                    listItem.push(['<li class="search-item"><a href="javascript:;" >',
                                        , '<div class="search-item-l" data-key="', item.KeyWords, '">', item.KeyWords, '</div>', '<div class="search-item-r">约', item.Count, '个商品</div>', '</a></li>'].join(''));
                });
            }
            var displayKeyWords = (keyword + "").length >= 15
                ? keyword.substring(0, 13) + "..."
                : keyword;
            if ((keyword + "").length > 0) {
                listItem.push(['<li class="search-item"><a href="javascript:;" >',
                    , '<div data-key="', keyword, '" class="search-item-l">搜索“', displayKeyWords, '”关键字</div>', '</a></li>'].join(''));
            }
            searchList.html(listItem.join(''));
            searchList.css({
                top: $this.offset().top + $this.height() + 3,
                left: $this.offset().left,
                width: $this.width() + 11
            });
            searchList.find(".search-item > a").unbind().bind("click", function () {
                canSearch = false;
                $this.val($(this).find(".search-item-l").attr("data-key"));
                canSearch = true;
                $("#btnSearch").click();
                searchList.slideUp(200);
            }).bind("mouseover", function () {
                $(this).parents("ul").find("li.search-item-hover").removeClass("search-item-hover");
            });
            searchList.slideDown(200);
        };
        //#endregion

        //#region 点击非搜索相关的元素隐藏搜索结果列表
        //        $(document.body).click(function (e) {
        //            var clickObj = $(e.srcElement || e.target);
        //            if (clickObj.length > 0) {
        //                if (clickObj.closest("#keyword_list").length == 0 && clickObj.closest("#txSearchCondition").length == 0) {
        //                    getSearchList().slideUp(200);
        //                    e.stopPropagation();
        //                    //e.preventDefault();
        //                }
        //            }
        //        });
        //#endregion

        var searchCache = {};
        var canSearch = true;
        $("#txSearchCondition").focus(function () {
            if ($(this).val().length > 0) {
                getSearchList().slideDown(200);
            }
        }).blur(function () {
            getSearchList().slideUp(200);
        }).bind("keyup propertychange", function (e) {

            var $this = $(this);
            var keyword = $.trim($this.val());
            var searchList = getSearchList();
            if (e.type === "keyup") {

                var thisSelected = searchList.find("li.search-item-hover");

                if (e.keyCode == 38 || e.keyCode == 40) {
                    searchList.find("li").removeClass("search-item-hover");

                    var targetEl = null;
                    if (searchList.find("li").length > 1) {

                        if (thisSelected.length > 0) {
                            if (e.keyCode === 38) {
                                //UP
                                targetEl = thisSelected.prev();
                            } else if (e.keyCode === 40) {
                                //DOWN
                                targetEl = thisSelected.next();
                            }

                        } else {
                            targetEl = searchList.find("li").eq(0);
                        }

                    } else if (searchList.find("li").length > 0) {
                        targetEl = searchList.find("li").eq(0);
                    } else {

                    }
                    if (targetEl.length > 0) {
                        $this.val(targetEl.find("div.search-item-l").attr("data-key"));
                        targetEl.addClass("search-item-hover");
                    }
                    return;
                } else if (e.keyCode === 23) {

                    return;
                }
            }

            if (canSearch && keyword.length >= 1) {

                if (typeof (window.searchTimeOut) != "undefined") {
                    clearTimeout(window.searchTimeOut);
                }

                window.searchTimeOut = setTimeout(function () {
                    if (canSearch && keyword.length >= 1) {

                        if (keyword in searchCache) {
                            bindSearchList($this, searchCache[keyword]);
                        } else {

                            canSearch = false;
                            $.ajax({
                                url: Common_js.vh_website_url + "/ajax",
                                type: 'GET',
                                dataType: 'jsonp',
                                data: {
                                    method: 'GetKeyWordStatistics',
                                    k: keyword,
                                    pagesize: 8,
                                    pageindex: 1
                                },
                                success: function (data) {

                                    searchCache[keyword] = data;
                                    bindSearchList($this, data);
                                    canSearch = true;

                                }
                            });

                        }
                    }
                }, 300);

            } else {
                searchList.slideUp(200);
            }

        });

    },
    ClickBtn: function () {
        var searstr = jQuery.trim(jQuery("#txSearchCondition").val());
        if (searstr == "" || searstr == "请输入商品") {
            searstr = "";
            //jQuery("#txSearchCondition").css("color", "#666666");
            //jQuery("#txSearchCondition").val("请输入商品");
            return false;
        }
        //统计
        myzjStatistics({
            pageType: "search_product",
            targetUrl: "",
            searchKeyWord: decodeURIComponent(searstr.replace(/^\s+|\s+$/g, "")),
            targetIdentity: "search"
        });
        window.location.href = Common_js.vh_search_url + '?condition=' + encodeURIComponent(searstr.replace(/^\s+|\s+$/g, "")) + "&IsClick=true";
    },
    Head_keydown: function () {
        document.onkeydown = function (e) {
            if (!e) { e = window.event; }
            if ((e.keyCode || e.which) == 13) {

                if (document.activeElement.id == "txSearchCondition") {
                    e.returnValue = false;
                    HeaderEvent.ClickBtn();
                }
            }
        }
        jQuery('#zb_dss_J_qqbox_div .qqclose').click(function () { jQuery('#zb_dss_J_qqbox_div').remove(); });
        jQuery("#btnSearch").click(function () { HeaderEvent.ClickBtn(); });
        HeaderEvent.SeachKey();
    }
}

function vh_gl() {
    _gaq.push(['_setCustomVar', 1, 'memberid', vh_userid, 1]);
    _gaq.push(['_trackEvent', 'Sign', 'Signin']);
}

function trigergetshoppingcart() {
    if ($("#slidebar").length > 0) {
        initSideToolBarCart();
    }

    var parameter = new Parameter();
    var userid = $("#vh_userid").val();
    var guid = $("#vh_Guid").val();
    var dataParameter =
    {
        "UserId": userid,
        "Guid": guid,
        "DisplayLabel": parameter.DisplayLabel,
        "SourceTypeSysNo": 1,
        "AreaSysNo": parameter.AreaSysNo,
        "ChannelID": parameter.channel,
        "Ckid": parameter.Ckid,
        "ExtensionSysNo": parameter.ExtensionSysNo
    };

    var vh_buyCart_url = Common_js.vh_shoppingcart_url;
    if (vh_buyCart_url == undefined) {
        vh_buyCart_url = jQuery("#vh_buyCart_url").val();
    }

    jQuery.ajax({
        type: "GET",
        url: window.buyapi_url + 'QueryShoppingCartPocket?a=' + Math.random(),
        dataType: 'jsonp',
        async: true,
        data: dataParameter,
        jsonp: "callback",
        success: function (result) {
            try {
                jQuery('#top_shoppingcartInfo').empty();
                var productcount = 0;
                var saleamount = 0;
                var str = result;
                var cartSth = '';
                if (str != "" && result.DoFlag == true) {
                    var cartdata = str;
                    productcount = cartdata.BuyTotalCount;
                    saleamount = cartdata.TotalPrice;
                    var html = [];
                    if (cartdata.CartEntities != null && cartdata.CartEntities.length > 0) {
                        $.each(cartdata.CartEntities, function (i, items) {
                            if (items.ExecutePromotionDto != null && items.ExecutePromotionDto.length > 0) {
                                $.each(items.ExecutePromotionDto, function (m, parts) {
                                    if (parts.MainProductContexts != null && parts.MainProductContexts.length > 0) {
                                        $.each(parts.MainProductContexts, function (d, mainProduct) {
                                            if (items.CartType == 5) {  //判断是否为特卖商品
                                                html.push('<tr><td><img src=\"' + returnTmaiGoodsSmallImg(mainProduct.PicUrl) + '" width=\"50\" height=\"50\" />');
                                                html.push('</td><td align=\"left\"><a href=\"' + returnTmaiGoodsHref(items.ActivitySysNo, mainProduct.ProductId, mainProduct.ProductSKUID) + '" style=\"color:#7d7d7d; width:170px; display:block; font-size:12px;margin-left: 3px;\">' + mainProduct.ProductName + '</a></td>');
                                            } else {
                                                html.push('<tr><td><img src=\"' + returnTmaiGoodsSmallImg(mainProduct.PicUrl) + '" width=\"50\" height=\"50\" />');
                                                html.push('</td><td align=\"left\"><a href=\"' + replaceItemUrl(mainProduct.ProductId) + '" style=\"color:#7d7d7d; width:170px; display:block; font-size:12px;margin-left: 3px;\">' + mainProduct.ProductName + '</a></td>');
                                            }

                                            html.push('<td align=\"left\" ><span style=\"color:#fa2a14;font-weight:bold;text-decoration:none; width:60px; display:block; font-size:12px;\">' + mainProduct.SalePrice + "<img src=\"" + window.res_url + "images/cheng.jpg\" align=\"absmiddle\">" + mainProduct.BuyCount + '<span><br><a href=\"javascript:void(0);\" onclick=\"javascript:DeleteShopCart(' + mainProduct.ShopCartId + ',' + items.CartType + ')\" style=\"color:#7d7d7d;font-weight:normal;\">[ 删除 ]</a></td></tr>');
                                        });
                                    }

                                    if (parts.MinorProductContexts != null && parts.MinorProductContexts.length > 0) {
                                        $.each(parts.MinorProductContexts, function (d, minorProduct) {
                                            if (items.CartType == 5) {
                                                html.push('<tr><td><img src=\"' + returnTmaiGoodsSmallImg(minorProduct.PicUrl) + '" width=\"50\" height=\"50\" />');
                                                html.push('</td><td align=\"left\"><a href=\"' + returnTmaiGoodsHref(items.ActivitySysNo, minorProduct.ProductId, minorProduct.ProductSKUID) + '" style=\"color:#7d7d7d; width:170px; display:block; font-size:12px;margin-left: 3px;\">' + minorProduct.ProductName + '</a></td>');
                                            } else {
                                                html.push('<tr><td><img src=\"' + returnTmaiGoodsSmallImg(minorProduct.PicUrl) + '" width=\"50\" height=\"50\" />');
                                                html.push('</td><td align=\"left\"><a href=\"' + replaceItemUrl(minorProduct.ProductId) + '" style=\"color:#7d7d7d; width:170px; display:block; font-size:12px;margin-left: 3px;\">' + minorProduct.ProductName + '</a></td>');
                                            }
                                            html.push('<td align=\"left\" ><span style=\"color:#fa2a14;font-weight:bold;text-decoration:none; width:60px; display:block; font-size:12px;\">' + minorProduct.SalePrice + "<img src=\"" + window.res_url + "images/cheng.jpg\" align=\"absmiddle\">" + minorProduct.BuyCount + '<span><br><a href=\"javascript:void(0);\" onclick=\"javascript:DeleteShopCart(' + minorProduct.ShopCartId + ',' + items.CartType + ')\" style=\"color:#7d7d7d;font-weight:normal;\">[ 删除 ]</a></td></tr>');
                                        });
                                    }
                                });
                            }
                            if (items.ExecuteProductContexts != null && items.ExecuteProductContexts.length > 0) {
                                $.each(items.ExecuteProductContexts, function (c, execute) {
                                    if (items.CartType == 5) {
                                        html.push('<tr><td><img src=\"' + returnTmaiGoodsSmallImg(execute.PicUrl) + '"  width=\"50\" height=\"50\" />');
                                        html.push('</td><td align=\"left\"><a href=\"' + returnTmaiGoodsHref(items.ActivitySysNo, execute.ProductId, execute.ProductSKUID) + '" style=\"color:#7d7d7d; width:170px; display:block; font-size:12px;margin-left: 3px;\">' + execute.ProductName + '</a></td>');
                                    } else {
                                        html.push('<tr><td><img src=\"' + returnTmaiGoodsSmallImg(execute.PicUrl) + '" width=\"50\" height=\"50\" />');
                                        html.push('</td><td align=\"left\"><a href=\"' + replaceItemUrl(execute.ProductId) + '" style=\"color:#7d7d7d; width:170px; display:block; font-size:12px;margin-left: 3px;\">' + execute.ProductName + '</a></td>');
                                    }

                                    html.push('<td align=\"left\" ><span style=\"color:#fa2a14;font-weight:bold;text-decoration:none; width:60px; display:block; font-size:12px;\">' + execute.SalePrice + "<img src=\"" + window.res_url + "images/cheng.jpg\" align=\"absmiddle\">" + execute.BuyCount + '<span><br><a href=\"javascript:void(0);\" onclick=\"javascript:DeleteShopCart(' + execute.ShopCartId + ',' + items.CartType + ')\" style=\"color:#7d7d7d;font-weight:normal;\">[ 删除 ]</a></td></tr>');

                                });
                            }
                        });
                    }
                    jQuery('#top_shoppingcartInfo').html(html.join(""));
                    //jQuery('#cartList').append(cartSth);
                }
                /*cartSth += '<div class="amount"><span class="btn_m btn_m_r"><a title="去购物车结算" href="' + Common_js.vh_website_url + '/CheckOut/ShoppingCart.aspx">立即结算</a></span>';
                cartSth += '共<span id="cartNum">' + productcount + '</span>件商品，总计：<span id="cartAmount">¥' + saleamount.toFixed(2) + '</span>';
                cartSth += '</div>';*/
                if (productcount > 0)
                    jQuery('#top_shoppingcartInfo').append('<tr style="height:52px;line-height:52px; border:none"><td style="font-size: 12px; text-align:center; background:#f5f5f5;" colspan="3">共 <span id="top_gwc_saleQty">' + productcount + '</span> 件商品 合计: <span id="top_gwc_saleAmount">¥' + saleamount.toFixed(2) + '</span>元 <span class="btn" id="jiesuan"><a href="' + vh_buyCart_url + '" class="stats" data-index="check_now_1" data-code="check_now">立即结算</a></span></td></tr>');
                else
                    jQuery('#top_shoppingcartInfo').append("<tr style='border-bottom:none;'><td width='50'><i class='sprite-icon icon-redcart'></i></td><td class='td_cart_empty'>您的购物车是空的,去挑选喜欢的商品吧~<td></tr>");

                

                jQuery('#cartList').append(cartSth);
                /*jQuery('#top_gwc_saleQty_out').text(productcount);
                jQuery('#top_gwc_saleAmount_out').val(saleamount);*/
                jQuery('#top_gwc_saleQty_out').html(productcount);
                jQuery('#top_gwc_saleAmount_out').html(saleamount);
            } catch (e) {

            }

        }
    });

}

function DeleteShopCart(scid, cartType) {

    jQuery.ajax({
        type: "POST",
        contentType: "application/json",
        url: Common_js.vh_website_url + '/Ajax/IndexAjax.aspx/DeleteItemCart',
        data: "{shopCartType:'" + cartType + "',shopCartId:'" + scid + "'}",
        dataType: 'json',
        async: false,
        success: function (result) {
            var message = result.d;
            trigergetshoppingcart();
        }
    });
}
$(document).ready(function () {

    trigergetshoppingcart();

    //$("#qq_Static").html($("#qqkefu").html());

});

HeaderEvent.subItem_hover();
HeaderEvent.hover_search_quick_item_Fun();
HeaderEvent.Head_keydown();
HeaderEvent.is_no_page();

HeaderEvent.hover_ShopCart();
//hover_ShopCart_Two();
//HeaderEvent.tag_select_Fun();

/*
    调用登录浮层
    callback： 回调函数 也可以是 回调url
    isOverlay：是否显示遮罩
*/
function LoginDialog(callback, isOverlay, returnurl) {
    var url = Common_js.vh_website_url + "/dialog_login.aspx";
    if (typeof (callback) === "function") {
        window.LoginDialogCallback = callback;
        url += "?callidenid=1&callback=LoginDialogCallback";
    } else if ((callback || "").length > 0) {
        url += "?returnurl=" + encodeURIComponent(callback);
    }

    if (url.indexOf("returnurl") == -1 && typeof (returnurl) !== 'undefined') {
        if (url.indexOf("?") > -1) {
            url += "&returnurl=" + returnurl;
        } else {
            url += "?returnurl=" + returnurl;
        }
    }
    if ($("#dialog_login_box").length <= 0) {
        jQuery("body").append("<div id='dialog_login_box' style='display: block'><iframe id='dialog_login_box_iframe' src='" + url + "' class='iframe' frameborder='0'></iframe></div>");
    } else {
        $("#dialog_login_box").remove();
        jQuery("body").append("<div id='dialog_login_box' style='display: block'><iframe id='dialog_login_box_iframe' src='" + url + "' class='iframe' frameborder='0'></iframe></div>");
        //dialog_login_box_iframe.window.location.reload();
    }
    easyDialog.open({
        container: 'dialog_login_box',
        isOverlay: isOverlay
    });

    if ((navigator.userAgent.indexOf("MSIE 6.0") > 0)) {
        $("#dialog_login_box iframe").attr("src", url);
    }

}


function replaceItemUrl(id) {
    var baseUrl = $("#vh_product_url").val();
    return baseUrl.replace("#id#", id)
}

function getNavData(cateid) {
    jQuery.ajax({
        type: "POST",
        contentType: "application/json",
        url: Common_js.vh_website_url + '/Ajax/IndexAjax.aspx/IndexPdtType',
        data: "{parentId:'" + cateid + "'}",
        dataType: 'json',
        async: false,
        success: function (result) {
            var html = [];
            $.each(result.d.ProductCategory, function (i, item) {
                if (i < 8) {
                    html.push('<dd><a href="' + Common_js.vh_website_url + "/Shopping/subcategory.aspx?cateID=" + item.ProductCategoryId + '" target="_blank" title="' + item.VchWebShowName + '" style="color:' + item.TextColor + '">' + item.VchWebShowName + '</a></dd>');
                }
            });
            $("#cateId_" + cateid).append(html.join(""));
        }
    });
}