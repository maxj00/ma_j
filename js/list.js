;(function($){
        // 发起ajax请求
            var xhr = new XMLHttpRequest();
            var status = [200,304];
            xhr.onload = function(){
                if(status.includes(xhr.status)){
                     data = JSON.parse(xhr.responseText)

                    // 根据数据生成界面
                    var goods_display =document.getElementsByClassName('goods_display')[0];
                    var ul = goods_display.querySelector('ul');
                    ul.innerHTML = data.map(item=>{
                        return `
                            <li id="${item.id}">
                                <dl>
                                    <dt><img src=${item.imgurl} /></dt>
                                    <dd>
                                        <p class="goods_name"><a href="">${item.name} 
                                            <span class="sale_now">${item.sale}</span></a>
                                        </p>
                                        <p><span class="price_now">$${item.price}</span></p>
                                        <p class="btn_warp">
                                            <span><a href="" class="btncar">加入购物车</a></span>
                                            <span><a href="" class="btnf">收藏</a></span>
                                        </p>
                                    </dd>
                                </dl>
                            </li>
                        `
                    }).join('');
                                // 跳转页面传参数
                        data.map(function (item){
                            var res = document.getElementById(item.id);
                            console.log(res);
                            // 点击对象事件
                            res.onclick = function(){
                                // 遍历对象，把对象转为url参数格式
                                var params = '?';
                                for(var attr in item){
                                    params += attr + '=' + item[attr] + '&';
                                }
                                // 删除多余的&
                                params = params.slice(0,-1);
                                // 跳转页面
                                location.href = './goods.html' + params;
                            }       
                        });
                }
            }
            xhr.open('get','http://localhost:2019/api/goods.php',true);
            xhr.send();
})(jQuery)