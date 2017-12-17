/*
* @Author: Administrator
* @Date:   2017-05-05 11:12:00
* @Last Modified by:   Administrator
* @Last Modified time: 2017-05-05 15:30:46
*/

'use strict';

;(function(){

	// 需求 ：让侧边栏能够被滑动，并且有反弹效果
	//　思路：
	//　（1）首先需要让ul能够滑动起来
	//　    （1.1）绑定touch事件，获取滑动的距离
	//　    （1.2）设置一个中间变量，用来记录上一次滑动的终位置
	//　    （1.3）在结束的时候，将最终的位置赋值回给中间变量
	//　（2）在滑动的时候，控制滑动的极值
	//　    （2.1）所有的逻辑是在move事件里面书写
	//　    （2.2）设置两个滑动区间 （自己设定的滑动距离-50）  50 到 -（ul的高度减去aside的高度 + 50）
	//　    （2.3）通过if判断去实现
	//　（3）在结束的时候，看看是否需要进行反弹
	//　    （3.1）所有的逻辑是在touchend的里面书写
	//　    （3.2）设置两个反弹区间  （0 到 -ul的高度减去aside的高度）
	//　    （3.3）通过if判断去实现  最重要的一点：同步centerY

	window.onload = function() {
		srcollBar('.left-info');
		srcollBar('.right-info');
	};

	function srcollBar(ele){

		// 外围大盒子
		var infoWrap = document.querySelector(ele);
		//　火车头
		var scrollCar = infoWrap.querySelector('.scroll');

		var startY = 0;  // 记录滑动开始的值
		var centerY = 0;

		var downMax = 50;  // 下拉的最大值
		var upMax = -(scrollCar.offsetHeight - infoWrap.offsetHeight + downMax); // 上拉的最大值

		// 向上的反弹值
		var bounceUpMax = -(scrollCar.offsetHeight - infoWrap.offsetHeight);

		// 这句话一定要放在事件的前面
		if(test()){
			return ;
		}

		// 绑定touch事件
		scrollCar.addEventListener('touchstart', touchstartHandler);
		scrollCar.addEventListener('touchmove', touchmoveHandler);
		scrollCar.addEventListener('touchend', touchendHandler);

		function touchstartHandler(e){
			
			// 开始的手指落点
			startY = e.changedTouches[0].clientY;
		};
		function touchmoveHandler(e){
			
			// 清除过渡
			scrollCar.style.transition = null;

			// 滑动的距离
			var dy = e.changedTouches[0].clientY - startY;
			
			var tempY = centerY + dy;

			// 在move里面判断，当滑动到一定的值的时候就不允许在往上或者往下滑动
			if(tempY >= downMax) {
				tempY = downMax;
			}else if(tempY <= upMax) {
				tempY = upMax;
			}
			scrollCar.style.transform = 'translateY('+ tempY +'px)';
		};
		function touchendHandler(e){
			
			var dy = e.changedTouches[0].clientY - startY;
			// 将最终的位置赋值给centerY 以便下一次移动的时候基于上一次的位置在滑动
			centerY += dy;

			// 反弹的逻辑
			if(centerY > 0){
				// 同步centerY 为了move的时候基于这个值
				centerY = 0;
				scrollCar.style.transition = 'transform .5s';
				scrollCar.style.transform = 'translateY('+ centerY +'px)';
			}else if(centerY < bounceUpMax){
				// 同步centerY 为了move的时候基于这个值
				centerY = bounceUpMax;
				scrollCar.style.transition = 'transform .5s';
				scrollCar.style.transform = 'translateY('+ centerY +'px)';
			}	
		};

		function test(){
			return scrollCar.offsetHeight <= infoWrap.offsetHeight
		}
	}
})()