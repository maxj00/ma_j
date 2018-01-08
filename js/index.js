document.addEventListener('DOMContentLoaded',function(){
            // ---------------轮播图------------------------
            let focus = document.querySelector('.focus');
             let ul = focus.querySelector('ul');

             // 把第一张复制到最后
             ul.appendChild(ul.children[0].cloneNode(true));

             let len = ul.children.length;//5
             // 索引值
             let index = 0;
             let imgWidth = focus.clientWidth;
             // 1）设置ul宽度，达到水平排列的效果
             ul.style.width = imgWidth*len + 'px';
             // 生成页码
             let page = document.createElement('div');
             page.classList.add('page');
             for(let i=1;i<len;i++){
                let span = document.createElement('span');
                span.innerText = i;
                if(i===1){
                    span.classList.add('active');
                }
                page.appendChild(span);
             }
             focus.appendChild(page);

            let timer = setInterval(autoPlay,3000);

            // 鼠标移入移出
            focus.onmouseenter = ()=>{
                clearInterval(timer);
            }

            focus.onmouseleave = ()=>{
                timer = setInterval(autoPlay,3000);
            }

            focus.onclick = e=>{
                if(e.target.parentNode.className === 'page'){
                    // 把index改成当前页码对应的索引值
                    index = e.target.innerText-1;

                    show();
                }
            }

            function autoPlay(){
                index++;

                show();
            }

            function show(){
                if(index>=len){//0,1,2,3,4
                    ul.style.left = 0;
                    index = 1;
                }
                animate(ul,{left:-index*imgWidth});

                // 页码高亮
                // 先清除所有高亮
                for(var i=0;i<len-1;i++){
                    page.children[i].className = '';
                }

                if(index==len-1){
                    page.children[0].classList.add('active')
                }else{
                    page.children[index].classList.add('active');
                }
            }
            // -----------------发起ajax请求--------------------
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
                                        <p class="goods_name">${item.name}</p>
                                        <div class="sale">${item.sale}</div>
                                        <p><span class="price_now">$${item.price}起</span></p>
                                        <p class="btn_warp">
                                            <span><a href="" class="btncar">点击进入</a></span>
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
                                location.href = './html/list.html' + params;
                            }       
                        });
                }
            }
            xhr.open('get','http://localhost:2019/api/index.php',true);
            xhr.send();

        
});
