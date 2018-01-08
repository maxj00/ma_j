Date.prototype.Format = function (fmt) { //author: meizz   
    var o = {
        "M+": this.getMonth() + 1,                 //月份   
        "d+": this.getDate(),                    //日   
        "h+": this.getHours(),                   //小时   
        "m+": this.getMinutes(),                 //分   
        "s+": this.getSeconds(),                 //秒   
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度   
        "S": this.getMilliseconds()             //毫秒   
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

$(function () {

    //宝宝弹框
    babydialog();
    $("#dialog-close").click(function () {
        easyDialog.close();
    });

    $("#mybaby").click(function () {
        $("#baby-birthday").val("");
        $("#spbabybirthday").text("");
        var UserId = $("#vh_userid").val();
        if (UserId > 0) {
            easyDialog.open({
                container: "dialog_box_baby",
                overlay: true,
                drag: false
            });
            $.ajax({
                url: '/Api/GetMember',
                async: true,
                type: "GET",
                contentType: "application/json;",
                dataType: 'jsonp',
                success: function (response) {
                    //console.log(response);
                    if (response != '' && response != null) {
                        if (response.id > 0) {
                            //alert("有填写信息");
                            //TODO: 有数据
                            //已填写信息；
                            $("#birthdayDialog").addClass("index-dialog-change-bg");
                            $("#writebaby").hide();
                            $("#change-info").show();
                            var birthday = new Date(response.birthday);
                            var birthdayString = birthday.Format("yyyy-MM-dd");
                            var today = new Date();
                            if (birthday < today) {
                                $(".dd-info").html("你的" + "<span class='baby-s-boy' id='radval'></span>" + "在" + "<span class='baby-d' id='birth-time'></span>出生了~");
                            }
                            else {
                                $(".dd-info").html("你的" + "<span class='baby-s-boy' id='radval'></span>" + "将在" + "<span class='baby-d' id='birth-time'></span>出生~");
                            }

                            $("#usename").text($("#username").text());

                            $("#babykeyid").val(response.id);

                            if (response.sex == 0) {
                                $("#radval").text("小公主");
                            } else if (response.sex == 1) {
                                $("#radval").text("小王子");
                            } else {
                                $("#radval").text("宝贝");
                            }

                            $("#birth-time").html(birthdayString);
                        }
                        else {
                            //alert("没信息");
                            //TODO：//调用Insert的接口
                            //未填写信息；
                            $("#birthdayDialog").removeClass("index-dialog-change-bg");
                            $("#writebaby").show();
                            $("#change-info").hide();
                            //babybtnSave();
                        }
                    }
                }

            });
        } else {
            ShowblockUI();
        }
    });
    $("#btn-save").click(function () {
        var sex = $("input[name=radval]").val();
        var birthday = $("#baby-birthday").val();
        if ($("#babyModifyType").val() == "M") {
            $.ajax({
                url: '/Api/Update',
                async: true,
                type: "GET",
                contentType: "application/json;",
                data: { maxId: $("#babykeyid").val(), sex: sex, birthday: birthday },
                dataType: 'jsonp',
                success: function (response) {
                    //alert("修改");
                    if (response != '' && response != null) {
                        //alert("修改");
                        //$("#usename").html(maxId);
                        $("#birthdayDialog").addClass("index-dialog-change-bg");
                        $("#writebaby").hide();
                        $("#change-info").show();

                        var birthdayDate = new Date(birthday);
                        var today = new Date();
                        if (birthdayDate < today) {
                            $(".dd-info").html("你的" + "<span class='baby-s-boy' id='radval'></span>" + "在" + "<span class='baby-d' id='birth-time'></span>出生了~");
                        }
                        else {
                            $(".dd-info").html("你的" + "<span class='baby-s-boy' id='radval'></span>" + "将在" + "<span class='baby-d' id='birth-time'></span>出生~");
                        }

                        $("#usename").text($("#username").text());
                        if (sex == 0) {
                            $("#radval").text("小公主");
                        } else if (sex == 1) {
                            $("#radval").text("小王子");
                        } else if (sex == 1) {
                            $("#radval").text("宝贝");
                        }
                        $("#birth-time").html(birthday);
                    }
                }
            });
        }
        else {
            var maxId = $("#username").text();
            var sex = $("input[name=radval]").val();
            var birthday = $("#baby-birthday").val();
            if (verifyBabybirthday()) {
                $.ajax({
                    url: '/Api/Insert',
                    async: true,
                    type: "GET",
                    contentType: "application/json;",
                    data: { sex: sex, birthday: birthday },
                    dataType: 'jsonp',
                    success: function (response) {
                        //alert(5000);
                        if (response != '' && response != null) {
                            $("#birthdayDialog").addClass("index-dialog-change-bg");
                            $("#writebaby").hide();
                            $("#change-info").show();
                            //$("#usename").html(response.maxId);//获取用户名
                            $("#birth-time").html(response.birthday);
                        }
                    }
                });
            }
        }
    });




});


function babybtnSave() {
    //点击提交按钮；
    $("#btn-save").click(function () {
        var maxId = $("#username").text();
        var sex = $("input[name=radval]").val();
        var birthday = $("#baby-birthday").val();
        if (verifyBabybirthday()) {
            $.ajax({
                url: '/Api/Insert',
                async: true,
                type: "GET",
                contentType: "application/json;",
                data: {sex:sex,birthday:birthday},
                dataType: 'jsonp',
                success: function (response) {
                    if (response != '' && response != null) {
                        $("#birthdayDialog").addClass("index-dialog-change-bg");
                        $("#writebaby").hide();
                        $("#change-info").show();
                        $("#usename").html(response.maxId);//获取用户名
                        $("#birth-time").html(response.birthday);
                    }
                }
            });
        }
    });
};


//弹框宝宝信息
function babydialog() {
    //是否有宝贝显示不同的内容;
    $("input[name=ifbaby]").unbind("change").change(function () {
        verifyBabybirthday();
        $("input[name='ifbaby']").removeAttr("checked");
        $("#baby-birthday").val("");
        $("#spbabybirthday").empty();
        $(this).attr("checked", "checked");
        var $this = $(this).parent("label").index();
        if ($this == 1) {
            $("#havebaby").show();
            $("#day-type").text("宝宝生日：");
            $("#radval").text("小公主");
        }
        if ($this == 2) {
            $("#havebaby").hide();
            $("#day-type").text("宝宝预产期：");
            $("#radval").text("宝贝");
        }
    });

    $("input[name=radval]").unbind("change").change(function () {
        verifyBabybirthday();
        $("input[name='radval']").removeAttr("checked");
        $("#baby-birthday").val("");
        $("#spbabybirthday").empty();
        $(this).attr("checked", "checked");
        var $this = $(this).parent("label").index();
        if ($this == 1) {
            $("#radval").text("小公主");
        }
        if ($this == 2) {
            $("#radval").text("小王子");
        }
    });
    $("#baby-birthday").focus(function () {
        $("#overlay,#easyDialogBox").css("zIndex", "1000");
    });
    !!$("#baby-birthday").length && $("#baby-birthday")
    .datepicker({
        inline: true,
        changeMonth: true,
        changeYear: true,
        dateFormat: "yy-mm-dd",
        yearRange: "c-2:c+1",
        showMonthAfterYear: true
    });

    //点击修改宝贝信息；
    $("#btn-change").click(function () {
        $("#birthdayDialog").removeClass("index-dialog-change-bg");
        $("#writebaby").show();
        $("#change-info").hide();
        $("#baby-birthday").val($("#birth-time").text());
        $("#spbabybirthday").empty();
        $("#babyModifyType").val("M");
    });
}

//验证出生日期；
function verifyBabybirthday() {
    var isSuccess = false;
    var $babyBirthday = $("#baby-birthday");
    var birthdayType = $("input:radio[name='ifbaby']:checked").val();
    $("#spbabybirthday").show();
    if (($babyBirthday.val() || "").length > 0) {
        try {
            var babyDate = new Date($babyBirthday.val().replace(/-/g, '/'));
            babyDate.setHours(0, 0, 0, 0);
            var todayDate = new Date();
            todayDate.setHours(0, 0, 0, 0);
            $("#spbabybirthday").empty();
            if (birthdayType == "0") {
                if (babyDate > todayDate) {
                    $("#spbabybirthday").html("宝宝生日不能大于今天哦！");
                } else {
                    isSuccess = true;
                }
            } else if (birthdayType == "1") {
                if (babyDate < todayDate) {
                    $("#spbabybirthday").html("您的预产期不能小于今天哦！");
                } else {
                    isSuccess = true;
                }
            }
        } catch (e) {

        }
    } else {
        if (birthdayType == "0") {
            $("#spbabybirthday").html("请选择宝宝生日!");
        } else if (birthdayType == "1") {
            $("#spbabybirthday").html("请选择预产日期!");
        } else {
            $("#spbabybirthday").empty();
        }
    }
    return isSuccess;
}


//显示登录框
function ShowblockUI() {
    LoginDialog(function () {
        easyDialog.open({
            container: "dialog_box_baby",
            overlay: true,
            drag: false
        });
    }, true);
}


