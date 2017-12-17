/*
* @Author: Administrator
* @Date:   2017-05-04 10:18:14
* @Last Modified by:   Administrator
* @Last Modified time: 2017-05-05 11:09:07
*/

'use strict';
// topbar的透明度 + UL的宽度
;(function(){
	// 需求：动态改变topbar的透明度
	// 思路：
	// （1）给window绑定scroll事件 动态监听scrollTop值
	// （2）得到比例公式  ： 不断变换的scrollTop值/设定的最大scrollTop值 = 不断变换的透明度/最大的透明度

	// 获取topbar
	var topbar = document.querySelector('.jd-header');

	var maxScrollTop = 300;

	window.addEventListener('scroll', function(){
		// 获取不断在变换的scrollTop值
		var _scrollTop = document.body.scrollTop;


		if(_scrollTop > maxScrollTop) {
			topbar.style.backgroundColor = 'rgba(201, 21, 35, 1)';
		}else{
			topbar.style.backgroundColor = 'rgba(201, 21, 35,'+ _scrollTop/maxScrollTop +')';
		}

	})

	// 动态设置ul的宽度
	var scrollWrap = document.querySelector('.scroll-wrap');
	var scrollLis = scrollWrap.querySelectorAll('li');
	var lisWidth = scrollLis[0].offsetWidth;
	scrollWrap.style.width = scrollLis.length * lisWidth + 'px';
})()

// 京东快报
;(function(){

	// 需求 ： 京东快报的轮播图
	// 思路 ：
	// （1）复制一个临时工 ，将这个临时工追加到ul的最后面
	// （2）常见定时器，设置一个信号量，定时器每执行一次，信号量++ 同时控制Ul的translateY的值
	// （3）在过渡结束的时候去瞅瞅信号量的值，一旦信号量大于等于临时工的这个信号量（长度-1），立马瞬移回0的位置，同时信号量赋值0

	var newsCarousel = document.querySelector('.news-carousel');
	var newsCarouselLis = newsCarousel.querySelectorAll('li');
	var lisHeight = newsCarouselLis[0].offsetHeight;
	// 信号量
	var index = 0;

	/*index = 0  ul 的 translate值是  当前index * 一个li的高度  看到的是第一个li
	index = 1  ul 的 translate值是  当前index * 一个li的高度  看到的是第二个li*/

	// 复制一个临时工 并且追加到ul里面去
	newsCarousel.appendChild(newsCarouselLis[0].cloneNode(true));

	var timer = null;

	timer = setInterval(function(){

		// 信号量++ 
		index++;

		//过渡时间一定不要大于定时器的时间
		newsCarousel.style.transition = 'transform .5s'
		newsCarousel.style.transform = 'translateY('+ -index*lisHeight +'px)';

	}, 1000)

	// 监听过渡结束事件  一旦过渡结束，立马看看当前的索引值，一旦索引值为最后一张图片的时候（临时工），立马瞬移会第一张图片的位置（下标为0）
	newsCarousel.addEventListener('transitionend',function(){
		if(index >= newsCarouselLis.length){
			index = 0;
			// 干掉过渡
			newsCarousel.style.transition = null;
			newsCarousel.style.transform = 'translateY(0px)';
		}
	})
})()

//　倒计时
;(function(){

	// 倒计时的时间来源肯定是后台提供，也就是服务器的时间  前台的时间是不安全的 可以被用户修改的
	//　思路：
	//　（１）获取当前时间和未来时间，并且相减得到毫秒数并且转换成秒数
	//　（２）开启定时器，每一秒将得到的秒数自减一，同时将秒数转换成　天　时　分　秒
	//　（３）将秒数的字符串的每一个值装到ｓｐａｎ里面去

	// 当前时间
	var nowDate = new Date();

	//　未来时间
	var furDate = new Date('May 04 2017 17:30:00');

	// 得到时间差并且转换成秒
	var disDate = parseInt((furDate - nowDate)/1000);

	var timer = null;

	var spans = document.querySelectorAll('.sec-time span');

	timer = setInterval(function(){
		// 每一秒让这个时间自减一
		disDate--;

		if(disDate <= 0){
			clearInterval(timer);
			return;
		}
		// 得到的天数
		// var d = Math.floor(disDate/86400);
		//　得到小时
		var h = Math.floor(disDate%86400/3600);
		// 得到分钟
		var m = Math.floor(disDate%3600/60);
		// 得到秒数
		var s = Math.floor(disDate%60);

		// 将得到的数值放到span里面去
		// spans[0].innerHTML = Math.floor(h/10);
		// spans[1].innerHTML = Math.floor(h%10);
		// spans[3].innerHTML = Math.floor(m/10);
		// spans[4].innerHTML = Math.floor(m%10);
		// spans[6].innerHTML = Math.floor(s/10);
		// spans[7].innerHTML = Math.floor(s%10);

		// 将时间拼成一个字符串 ，然后检测是否需要补0
		var str = toTwo(h) + ':' + toTwo(m) + ':' + toTwo(s);
		// 遍历每一个spans  然后将对应的str里面的值放到对应的span里面去
		for(var i = 0; i < spans.length; i++){
			spans[i].innerHTML = str.charAt(i);
		}
		// 补0 函数
		function toTwo(n){
			return n > 9 ? '' + n : '0' + n;
		}

	}, 1000)

})()

// 轮播图
;(function(){
	var jdCarousel  = document.querySelector('.jd-carousel') ;
	var jdCarouselUl = jdCarousel.querySelector('ul');
	var jdCarouselLis = jdCarouselUl.querySelectorAll('li');
	var points = jdCarousel.querySelector('ol');
	var screenWidth = document.documentElement.offsetWidth;
	var timer = null;
	// 把Li的高度赋值给UL
	jdCarouselUl.style.height = jdCarouselLis[0].offsetHeight + 'px';
	// 动态循环小圆点
	for(var i = 0; i < jdCarouselLis.length; i++){
		var li = document.createElement('li');
		if( i == 0 ){
			li.classList.add('active');
		}
		points.appendChild(li);
	}
	// 让三张图片就位
	var left = jdCarouselLis.length - 1;
	var center = 0;
	var right = 1;
	// 归位函数
	setTranslate();
	// 设置小圆点
	var pointsLi = points.querySelectorAll('li');
	timer = setInterval(showNext, 1000);
	// 手滑的整体逻辑
	var startX = 0;  // 记录开始的手指落点的变量
	var startTime = null;
	jdCarouselUl.addEventListener('touchstart',touchstartHandler);
	jdCarouselUl.addEventListener('touchmove',touchmoveHandler);
	jdCarouselUl.addEventListener('touchend',touchendHandler);
	// 滑动开始的逻辑
	function touchstartHandler (e){
		// 记录开始的时间
		startTime = new Date();
		// 手指的落点
		startX = e.changedTouches[0].clientX;
		// 清除定时器
		clearInterval(timer);
	}
	// 滑动中的的逻辑
	function touchmoveHandler(e){
		// 获取滑动的距离
		var dx = e.changedTouches[0].clientX - startX;

		// 设置过渡
		setTransition(false,false,false);

		// 归位函数
		setTranslate(dx);
	}
	// 滑动结束的逻辑
	function touchendHandler(e){
		// 最终的距离
		var dx = e.changedTouches[0].clientX - startX;
		var dTime = new Date() - startTime;
		//　判断是否滑动成功
		if(Math.abs(dx) > screenWidth/3 || (dTime < 300 && Math.abs(dx) > 30)){
			// 滑动成功
			if(dx > 0){
				// 向右滑  看到上一张
				showPrev();
			}else{
				//向左滑 看到下一张
				showNext();
			}
		}else{
			// 滑动失败
			// 设置过渡
			setTransition(true,true,true);
			// 归位函数
			setTranslate();
		}
		// 重新开始
		timer = setInterval(showNext, 1000);
	}
	// 让整体轮播图动起来
	function showNext(){
		left = center;
		center = right;
		right++;

		// 极值判断
		if(right > jdCarouselLis.length - 1){
			right = 0;
		}

		// 设置过渡
		setTransition(true,true,false);

		// 归位函数
		setTranslate();

		// 设置小圆点
		setPoints();
	}
	// 设置小圆点
	function setPoints(){
		for(var i = 0; i < pointsLi.length; i++){
			pointsLi[i].classList.remove('active');
		}
		pointsLi[center].classList.add('active');
	}
	// 上一张的逻辑
	function showPrev(){
		right = center;
		center = left;
		left--;

		// 极值判断
		if(left < 0){
			left = jdCarouselLis.length - 1;
		}
		// 设置过渡
		setTransition(false,true,true);
		// 归位函数
		setTranslate();
		// 设置小圆点
		setPoints();
	}
	// 设置移动
	function setTranslate(dx){
		dx = dx || 0;
		jdCarouselLis[left].style.transform = 'translateX('+ (-screenWidth + dx) +'px)';
		jdCarouselLis[center].style.transform = 'translateX('+ dx +'px)';
		jdCarouselLis[right].style.transform = 'translateX('+ (screenWidth + dx) +'px)';
	}
	// 设置过渡
	function setTransition(a,b,c){
		if(a){
			jdCarouselLis[left].style.transition = 'transform .5s' ;
		}else{
			jdCarouselLis[left].style.transition = null ;
		}
		if(b){
			jdCarouselLis[center].style.transition = 'transform .5s' ;
		}else{
			jdCarouselLis[center].style.transition = null ;
		}
		if(c){
			jdCarouselLis[right].style.transition = 'transform .5s' ;
		}else{
			jdCarouselLis[right].style.transition = null ;
		}
	}
})()


