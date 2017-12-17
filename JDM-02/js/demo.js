jdCarouselLis[left].style.transform = 'translateX('+ (-screenWidth) +'px)';
jdCarouselLis[center].style.transform = 'translateX(0px)';
jdCarouselLis[right].style.transform = 'translateX('+ screenWidth +'px)';

// 归位
jdCarouselLis[left].style.transform = 'translateX('+ (-screenWidth) +'px)';
jdCarouselLis[center].style.transform = 'translateX(0px)';
jdCarouselLis[right].style.transform = 'translateX('+ screenWidth +'px)';



jdCarouselLis[left].style.transform = 'translateX('+ (-screenWidth + dx) +'px)';
jdCarouselLis[center].style.transform = 'translateX('+ dx +'px)';
jdCarouselLis[right].style.transform = 'translateX('+ (screenWidth + dx) +'px)';


// 归位
jdCarouselLis[left].style.transform = 'translateX('+ (-screenWidth) +'px)';
jdCarouselLis[center].style.transform = 'translateX(0px)';
jdCarouselLis[right].style.transform = 'translateX('+ screenWidth +'px)';


function setTranslateX(dx){
	dx = dx || 0;
	jdCarouselLis[left].style.transform = 'translateX('+ (-screenWidth + dx) +'px)';
	jdCarouselLis[center].style.transform = 'translateX('+ dx +'px)';
	jdCarouselLis[right].style.transform = 'translateX('+ (screenWidth + dx) +'px)';
}


jdCarouselLis[right].style.transition = "transform .5s" ;
jdCarouselLis[center].style.transition = "transform .5s";
// 替补的图片是不能添加过渡的
jdCarouselLis[left].style.transition = null;


// 清除过渡  因为在move的时候根本不需要过渡
jdCarouselLis[left].style.transition = null ;
jdCarouselLis[center].style.transition = null;
jdCarouselLis[right].style.transition = null;


// 滑动失败
jdCarouselLis[left].style.transition = 'transform .5s' ;
jdCarouselLis[center].style.transition = 'transform .5s';
jdCarouselLis[right].style.transition = 'transform .5s';

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



