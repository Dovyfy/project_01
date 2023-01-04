// 全局加载
window.addEventListener('load',function() {
    // 获取元素
   
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;
    var num=0;
    var circle = 0;
    // 鼠标经过focus显示左右隐藏按钮
    focus.addEventListener('mouseenter',function() {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null;
    });
    // 鼠标离开focus隐藏左右按钮
    focus.addEventListener('mouseleave',function() {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function(){
            // 手动调用右侧按钮点击事件
            arrow_r.click();
        },2000);

    });

    // 动态生成小圆圈 有几个图片生成几个园圈
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    for (var i = 0;i < ul.children.length; i++) {
        // 创建一个小li
        var li = document.createElement('li');
        // 记录当前小圆圈的索引号 通过自定义属性
        li.setAttribute('index',i);
        ol.appendChild(li);
        // 可以在生成小圆圈同时直接绑定点击时间
        li.addEventListener('click',function(){
            for (var i =0; i< ol.children.length;i++){
                ol.children[i].className = '';
            }
            this.className = 'current';
    //    当点击了某个小li就将索引号给num
          
            var index = this.getAttribute('index');
            num = index;
            circle = index;
            animate(ul,-index*focusWidth);
        });
    }
    // 把ol里面的第一个小li设置类名为 current
    ol.children[0].className = 'current'; 
    // 克隆第一张图片 实现无缝滚动
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    // 点击右侧按钮，图片滚动一张
//    flag节流阀
    var flag = true;
    arrow_r.addEventListener('click',function(){
        // 如果走到最后一张复制的图片
        if(flag){
            flag = false;
            if(num == ul.children.length-1){
                num=0;
                ul.style.left = 0;
            }
            num++;
            animate(ul,-num*focusWidth,function(){
                flag=true;
            });
            circle++; 
            if(circle == ul.children.length-1){
                circle = 0;
            }
           
            // 点击右侧按钮，小圆圈跟随一起变化，由circile控制
            for(var i = 0;i<ol.children.length;i++) {
                ol.children[i].className='';
            }
            ol.children[circle].className = 'current'; 
        }
    });
    // 小圆圈的排他思想
    // 左侧按钮
    arrow_l.addEventListener('click',function(){
        // 如果走到最后一张复制的图片
        if(flag){
            flag = false;
            if(num == 0){
                num= ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';
            }
            num--;
            animate(ul,-num*focusWidth,function(){
                flag=true;
            });
            circle--; 
            if(circle < 0){
                circle = ol.children.length - 1;
            }
           
            // 点击右侧按钮，小圆圈跟随一起变化，由circile控制
            for(var i = 0;i<ol.children.length;i++) {
                ol.children[i].className='';
            }
            ol.children[circle].className = 'current'; 
        }
        
    });
    var timer = setInterval(function(){
        // 手动调用右侧按钮点击事件
        arrow_r.click();
    },2000);

    // 发回顶部模块制作
    var sliderbar = document.querySelector('.slider-bar');
    var main = document.querySelector('.main');
    var mainTop = main.offsetTop;
    var sliderbarTop = sliderbar.offsetTop - mainTop;
    var goBack = document.querySelector('.goBack');
  
    document.addEventListener('scroll', function() {
               
        if (window.pageYOffset >= mainTop) {
            sliderbar.style.position = 'fixed';
            
            sliderbar.style.top = sliderbarTop + 'px';
            goBack.style.display = 'block';
        } else {
            sliderbar.style.position = 'absolute';
            sliderbar.style.top = '500px';
            goBack.style.display = 'none';
        }

    });
    goBack.addEventListener('click',function(){
        // 另一种形式的animate动画函数，即将animate内原本的左方向改为了竖直方向
       goback(window,0);
    })




})
