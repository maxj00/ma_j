var _agq = _agq || [];
_agq.push(['_cid', '248']);
_agq.push(['_eid', '2']);
ag_count_send(_agq);

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-55742608-2']);
_gaq.push(['_setCustomVar', 1, 'memberid', $("#vh_userid").val(), 1]);
_gaq.push(['_setCustomVar', 2, 'guid', $("#vh_Guid").val(), 1]);


if (typeof $.cookie != "undefined" && ($.cookie('watchlbl') || "").length > 0) {
    //客户真实标签
    var _gaqArr = [];
    var origdlid = $.cookie("origdlid");
    _gaqArr.push(origdlid);
    _gaqArr.push($.cookie('watchlbl'));
    var arr = unique(_gaqArr.join(",").split(","));
    $.cookie('watchlbl', arr, { path:"/", expires: 0.02 });
    _gaq.push(['_setCustomVar', 3, 'dlid', arr.join(","), 2]);
} else {
    _gaq.push(['_setCustomVar', 3, 'dlid', $.cookie("origdlid"), 2]);
}

function pushWatchlbl(id) {
    var pushId = "[" + id + "]";
    var origdlid = $.cookie("origdlid");
    var _gaqArr = [];
    _gaqArr.push(origdlid);
    _gaqArr.push(pushId);
    if (($.cookie('watchlbl')||"").length > 0) {
        _gaqArr.push($.cookie('watchlbl'));
    }
    var arr = unique(_gaqArr.join(",").split(","));
    $.cookie('watchlbl', arr, { path: "/", expires: 0.02 });
}

function unique(data) {
    data = data || [];
    var a = {};
    for (var i = 0; i < data.length; i++) {
        var v = data[i];
        if (typeof (a[v]) == 'undefined') {
            a[v] = 1;
        }
    };
    data.length = 0;
    for (var i in a) {
        data[data.length] = i;
    }
    return data;
}



//随机分配（浏览组） A | B
_gaq.push(['_setCustomVar', 4, 'visitgroup', $.cookie("VisitGroup"), 2]);

_gaq.push(['_trackPageview']);


(function () {

    $("a.stats,#milk_powder,#diapers").click(function () {
        var $obj = $(this);
        var page = window.location.href;
        if (page.length == 0) {
            page = "index.aspx";
        }
        var moduleCode = $obj.data("code");
        var moduleDataIndex = $obj.data("index") || "0";
        var href = $obj.attr("href") || "";
        if (href.indexOf("&small=1") > -1) {
            href = href.replace("&small=1", "")
        }
        if (href.length > 0) {
            _gaq_push(decodeURIComponent(page), moduleCode + "_" + moduleDataIndex, decodeURIComponent(href), 1);
        }
    });
    

})();



var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);

//新数数码网络统计代码 如果影响到网站，随时删除，订单提交页面也添加该代码
//var gb = document.createElement('script');
//gb.type = 'text/javascript';
//gb.async = true;
//gb.src = "http://aw.kejet.net/t?p=07&c=nr&er=1&kd=1&sid=0qV6tM5sGOuB&zid=0qV6tM5sGOuA";
//var ss = document.getElementsByTagName('script')[0];
//ss.parentNode.insertBefore(gb, ss);

var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3F35c4b666eea654823f31f131b726b543' type='text/javascript'%3E%3C/script%3E"));