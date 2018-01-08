;(function($){
    // 商品放大镜
    $(function(){
        $('.goods').gdsZoom();
        $('.smallList img').mouseover(function(){
            $('.goods img').attr({
                'src':this.src,
                'data-big':$(this).attr('data-big') || this.src
            });
        })
    });
    
    // 标签页切换
    
})(jQuery)

window.onload = function(){
        var tuli =document.getElementsByClassName('tuli')[0]; 
        var tuli1 =document.getElementsByClassName('tuli1')[0]; 
        var tuli2 =document.getElementsByClassName('tuli2')[0];
        var tuli3 =document.getElementsByClassName('tuli3')[0]; 
        var tuli4 =document.getElementsByClassName('tuli4')[0]; 
        var dtuli =document.getElementsByClassName('dtuli')[0];
        var name1 =document.querySelector('.name1');
        var price_Now =document.querySelector('.price_Now');
        var params = location.search;
        params = params.slice('1');
        params = params.split('&');
        var date = {};
        params.forEach(function(item){
            var arr = item.split('=');
            date[arr[0]] = decodeURI(arr[1]);
        });console.log(date)
        tuli.src =date.imgurl;
        tuli1.src =date.imgurl;
        tuli2.src =date.imgurl;
        tuli3.src =date.imgurl;
        tuli4.src =date.imgurl;
        dtuli.src =date.imgurl;
        name1.innerHTML =date.name;
        price_Now.innerHTML =date.price;
    }