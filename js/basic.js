function uploadImage(uploadImageType, uploadImageName, uploadImageFolder, base64, callback){
	$.ajax({
		url: 'api!uploadImage', 
		type: 'post', 
		dataType:'json',
	    traditional: true,
		data: {
			uploadImageType: uploadImageType,
			uploadImageName: uploadImageName,
			uploadImageFolder: uploadImageFolder,
			base64: base64
		},
		success: function (res){
			res = JSON.parse(res);
			console.log(res);
			if(typeof callback  == "function"){
				callback(res);
			}
		},
		error: function(res){
			res = JSON.parse(res);
			console.log(res);
		}
	});
}
function uploadProgress(a, n ,elm){
	elm = $(elm);
	var p =  Ceil((a / n) * 10);
	var items = elm.find(".progress_item");
	for(var i = 0; i < p; i++){
		$(items[i]).css({
			"background": "#00cca8",
			"width": "20px"
		});
	}
}
function initCutShade(cw, ch){
	var w = $(".cut_shade").width();
	var h = $(".cut_shade").height();
	var t = $(".cut_shade .cut_t");
	var b = $(".cut_shade .cut_b");
	var l = $(".cut_shade .cut_l");
	var r = $(".cut_shade .cut_r");
	var c = $(".cut_shade .cut_rect");
	c.width(cw);
	c.height(ch);
	c.css({
		"left": (w - c.width()) / 2,
		"top": (h - c.height()) / 2 
	});
	t.css({
		"top": 0,
		"left": (w - c.width()) / 2,
		"width": c.width(),
		"height": (h - c.height()) / 2 
	});
	b.css({
		"bottom": 0,
		"left": (w - c.width()) / 2,
		"width": c.width(),
		"height": (h - c.height()) / 2 
	});
	l.css({
		"top": 0,
		"left": 0,
		"width": (w - c.width()) / 2,
		"height": h 
	});
	r.css({
		"top": 0,
		"right": 0,
		"width": (w - c.width()) / 2,
		"height": h 
	});
}
function moveCutRect(){
	var mpos = {},
		dmpos = {},
		elmOffset = {},
		mouseEvent = ("ontouchstart" in window) ? 
			{down: 'touchstart',move: 'touchmove',up: 'touchend', leave : "mouseleave"} : 
			{down: 'mousedown',move: 'mousemove',up: 'mouseup', leave : "mouseleave"},
		mousedown = false;
	var w = $(".cut_shade").width();
	var h = $(".cut_shade").height();
	var t = $(".cut_shade .cut_t");
	var b = $(".cut_shade .cut_b");
	var l = $(".cut_shade .cut_l");
	var r = $(".cut_shade .cut_r");
	var c = $(".cut_shade .cut_rect");
	var cl, ct;
	document.querySelector(".cut_rect").addEventListener(mouseEvent.down,function(e){
		if(e.touches == undefined){
			mpos.tx = e.pageX;
			mpos.ty = e.pageY;
			mousedown = true;
			cl = parseInt(c.css("left"));
			ct = parseInt(c.css("top"));
		}
	},false);
	document.querySelector(".cut_rect").addEventListener(mouseEvent.move,function(e){
		if(e.touches == undefined && mousedown){
			dmpos.dtx = e.pageX - mpos.tx;
			dmpos.dty = e.pageY - mpos.ty;
			var ncl = cl + dmpos.dtx;
			var nct = ct + dmpos.dty;
			if(ncl < 0){
				ncl = 0;
			}
			if(ncl > w - c.width()){
				ncl = w - c.width();
			}
			if(nct < 0){
				nct = 0;
			}
			if(nct > h - c.height()){
				nct = h - c.height();
			}
			$(".cut_rect").css({
				"left": ncl,
				"top": nct
			});
			t.css({
				"height": nct,
				"left": ncl
			});
			b.css({
				"height": h - nct - c.height(),
				"left": ncl
			});
			l.css({"width": ncl});
			r.css({"width": w - ncl - c.width()});
		}
	},false);
	document.querySelector(".cut_rect").addEventListener(mouseEvent.up,function(e){
		mpos = {};
		elmOffset = {};
		mousedown = false;
	},false);
	document.querySelector(".cut_rect").addEventListener(mouseEvent.leave,function(e){
		mpos = {};
		elmOffset = {};
		mousedown = false;
	},false);
}
function getBasePath() {
	var url = window.document.location.href;
	var pathName = window.document.location.pathname;
	var localhostPath = url.substring(0, url.indexOf(pathName));
	var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
	return (localhostPath + projectName);
}
function parseUA() {
    var u = navigator.userAgent;
    var u1 = navigator.userAgent.toLowerCase();
    return { //移动终端浏览器版本信息
	    IE: u.indexOf('Trident') > -1, //IE内核
	    Opera: u.indexOf('Presto') > -1, //opera内核
	    Google: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
	    FireFox: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
	    Mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
	    Ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
	    Android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
	    iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
	    iPad: u.indexOf('iPad') > -1, //是否iPad
	    Safari: u.indexOf('Safari') == -1, //是否web应用程序，没有头部与底部
	    Iosv: u.substr(u.indexOf('iPhone OS') + 9, 3),
	    WX: u1.match(/MicroMessenger/i) == "micromessenger",
	    Ali: u.indexOf('AliApp') > -1,
	};
};
function getTransfromInfo(elm){
	//matrix(scaleX(1.1),0,0,scaleY(1.1),translateX(30px),translateY(30px))
	//matrix(cosθ,sinθ,-sinθ,cosθ,0,0)
	var el = $(elm);
	var st = window.getComputedStyle(el[0], null);
	var tr = st.getPropertyValue("-webkit-transform") ||
			 st.getPropertyValue("-moz-transform") ||
			 st.getPropertyValue("-ms-transform") ||
			 st.getPropertyValue("-o-transform") ||
			 st.getPropertyValue("transform") || "FAIL"; 
	var values = tr.split('(')[1].split(')')[0].split(',');
	var a = values[0];
	var b = values[1];
	var c = values[2];
	var d = values[3];
	var scale = Math.sqrt(a * a + b * b);
	var sin = b / scale;
	var angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
	angle = angle < 0 ? angle + 360 : angle;
	angle = angle == 0 ? 360 : angle;
	return {scale : scale,angle : angle};
}
function getAngleFromStyle(elm){
	var elm = $(elm), computedTransform, angle, xyz; 
	if(elm.attr("style") != undefined){
		//通过style的样式获取到deg角度/rotate\((.)*deg\)/，"transform: rotate(358deg);"->(358deg)
		var match = elm.attr("style").match(/rotate(X|Y|Z)?\((.)*deg\)/);
		xyz = match[1] == undefined ? "" : match[1];
		angle = match[0].match(/\((.)*\)/)[0]; //->rotateX(30deg)
		angle = parseInt(angle.slice(1,angle.length - 4));
		return { angle : angle, xyz : xyz, scale : 1};
	}else if(getTransfromInfo(elm) != undefined) { //getcomputedstyle不能传入数组elm
		return { angle : getTransfromInfo(elm).angle, xyz : xyz, scale : getTransfromInfo(elm).scale};
	}else{
		return { angle : 0, xyz : xyz, scale : 1};
	}
}
function Ceil(n){
	return Math.ceil(n);
}
function Floor(n){
	return Math.floor(n);
}
function Random(n){
	return Math.random()*n;
}
function RandomRange(s,e){
	return Ceil((Math.random()*(e - s) + s)*10)/10;
};
!(function loadAudio(){
	var auds = $("audio");
	for(var i = 0,a = auds.length;i < a;i++){
		var that = auds[i];
		that.addEventListener("canplay",function(){
			$(that).data("isload",true);
		});
	}
})();
function showShare(){
	var html = "<div class='share'>" + 
					"<div class='shade_b7'></div>" +
					"<img src='hey/img/i_shareimg1.png' class='i_shareimg1'/>" +
					"<img src='hey/img/i_shareimg2.png' class='i_shareimg2'/>" + 
				"</div>";
	$("#container").append(html);
}
function setIntroCnt(elm,cnt,n){
	var that = $(elm);
	var elmW = parseInt(that.width());
	var fontsize =	parseInt(that.css("font-size"));
	var endindex = Math.floor(elmW/fontsize*n);
	if(cnt.length < endindex){
		that.html("<span>" + cnt + "</span>" + 
			"<img src='img/i_bluedown1.png' class='i_openintro hide'/><img src='img/i_blueup2.png' class='i_closeintro hide'/>");
	}else{
		var newcnt = cnt.slice(0,endindex - 5);
		that.html("<span>" + newcnt + "</span>" + 
			"<img src='img/i_bluedown1.png' class='i_openintro'/><img src='img/i_blueup2.png' class='i_closeintro hide'/>");
	}
	$(".i_openintro,.i_closeintro").bind("click",function(){
		var that1 = $(this);
		if(that1.hasClass("i_openintro")){
			that.find("span").html(cnt);
			$(".i_openintro").hide();
			$(".i_closeintro").show();
		}else if(that1.hasClass("i_closeintro")){
			that.find("span").html(newcnt);
			$(".i_openintro").show();
			$(".i_closeintro").hide();
		}
	});
}
function setQuestionFontAlign(arr){
	for(var i =0,a = arr.length;i < a;i++){
		var elm = $(arr[i]);
		if(elm.html()!=undefined){
			var cntL = elm.text().trim().length;
			var fontsize = parseInt(elm.css("font-size"));
			var w =parseInt(elm.width());
			if(cntL*fontsize > w){
				elm.css("text-align","left");
				return;
			}
		}
	}	
}
function setAnswerFontAlign(arr){
	for(var i =0,a = arr.length;i < a;i++){
		var elm = $(arr[i]);
		if(elm.html()!=undefined){
			var cntL = elm.text().trim().length;
			var fontsize = parseInt(elm.css("font-size"));
			var w =parseInt(elm.width() - 50);
			if(cntL*fontsize > w){
				elm.css("text-align","left");
				elm.siblings().css("text-align","left");
				return;
			}
		}
	
	}	
}
function viewImage(imgsrc){
	var html = "<div class='viewimg_container' style='position: absolute;width: 100%;height: 100%;top: 0;left: 0;z-index: 999999;" +
	"max-width: 450px;left: 50%;transform: translate(-50%);overflow: hidden;'>" + 
	"<div style='position: absolute;z-index: 1;width: 100%;height: 100%;top: 0;background: black;opacity: 0.7;'></div>" +
	"<img src='" + imgsrc + "' class='i_viewimg' style='position: absolute;width: auto;height: auto;top: 50%;left: 50%;z-index: 10;" +
	"transform: translate(-50%,-50%);transform-origin: 50% 50%;'/><div class='btn_close_viewimg' style='position: absolute;" + 
	"z-index: 10;width: 35px;height: 35px;background: #e5e5e5;border-radius: 50%;top: 10px;right: 10px;color: #007aff;line-height: 36px;" +
	"text-align: center;font-size: 20px;'>X</div></div>";
	$('body').append(html);
	$(".btn_close_viewimg").bind("click",function(){
		$('.viewimg_container').remove();
	});
	var mpos = {},
		dmpos = {},
		elmOffset = {};
	document.querySelector(".viewimg_container").addEventListener("touchstart",function(e){
		if(e.touches[1] == undefined){
			mpos.tx = e.touches[0].pageX;
			mpos.ty = e.touches[0].pageY;
			elmOffset.left = parseInt($(".i_viewimg").css("left"));
			elmOffset.top = parseInt($(".i_viewimg").css("top"));
		}else{
			mpos.tx1 = e.touches[0].pageX;
			mpos.ty1 = e.touches[0].pageY;
			mpos.tx2 = e.touches[1].pageX;
			mpos.ty2 = e.touches[1].pageY;
		}
	},false);
	document.querySelector(".viewimg_container").addEventListener("touchmove",function(e){
		e.preventDefault();
		if(e.touches[1] == undefined){
			dmpos.dtx = e.touches[0].pageX - mpos.tx;
			dmpos.dty = e.touches[0].pageY - mpos.ty;
			$(".i_viewimg").css({"left": elmOffset.left + dmpos.dtx,"top": elmOffset.top + dmpos.dty});
		}else{
			mpos.ftx1 = e.touches[0].pageX;
			mpos.fty1 = e.touches[0].pageY;
			mpos.ftx2 = e.touches[1].pageX;
			mpos.fty2 = e.touches[1].pageY;
			var ab = Math.sqrt((mpos.ty2 - mpos.ty1)*(mpos.ty2 - mpos.ty1) + (mpos.tx1 - mpos.tx2)*(mpos.tx1 - mpos.tx2));
			var cd = Math.sqrt((mpos.fty2 - mpos.fty1)*(mpos.fty2 - mpos.fty1) + (mpos.ftx1 - mpos.ftx2)*(mpos.ftx1 - mpos.ftx2));
			var scale = cd/ab;
			var alpha = Math.ceil(Math.atan((mpos.ty2 - mpos.ty1)/(mpos.tx2 - mpos.tx1))*180/Math.PI);
			var beta = Math.ceil(Math.atan((mpos.fty2 - mpos.fty1)/(mpos.ftx2 - mpos.ftx1))*180/Math.PI);
			var delta = beta - alpha;
			$(".i_viewimg").css("transform","scale(" + scale + ") translate(-50%,-50%) rotate(" + delta + "deg)");
		}
	},false);
	document.querySelector(".viewimg_container").addEventListener("touchend",function(e){
		mpos = {}
		dmpos = {};
		elmOffset = {};
	},false);
}
function checkHTML(html){
	var reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-|:)+)/g;
	var reg2 = /<a href="(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-|:)+\.png">)/g;
	var reg3 = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-|:)+\.png)(<\/a>)/g;
	html = html.replace(reg, '<a href="$1$2">$1$2</a>');
	html = html.replace(reg2, '');
	html = html.replace(reg3, '$1$2');
	return html;
};
function pauseAllAudio(){
	var audios = $('audio');
	for(var i = 0;i < audios.length;i++){
		audios[i].pause();
	}
	isplaying = false;
	$(".btn_pause_audio").hide();
	$(".btn_play_audio").show();
	pauseAudioAction(".audio_animation"); 
}
var isplaying = false;
var audioTimer;
function pauseAudio(audioElm,progressElm,timeElm,audioTotalTime){
 	$(audioElm)[0].pause();
	clearInterval(audioTimer);
	isplaying = false;
}
function resetAudio(audioElm,progressElm,stimeElm,etimeElm,audioTotalTime){
	$(audioElm)[0].pause();
	$(audioElm)[0].currentTime = 0;
	$($(audioElm).parent()).find(progressElm).css("width","0%");
	isplaying = false;
	var m = Math.floor((audioTotalTime)/60);
	m = m >= 10 ? m : "0" + m;
	var s = Math.floor((audioTotalTime)%60);
	s = s >= 10 ? s : "0" + s;
	$($(audioElm).parent()).find(stimeElm).html("00:00");
	$($(audioElm).parent()).find(etimeElm).html("-" + m + ":" + s);
	$($(audioElm).parent().parent()).find(".btn_play_audio").show();
	$($(audioElm).parent().parent()).find(".btn_pause_audio").hide();
	pauseAudioAction(".audio_animation"); 
}
function playAudio(audioElm,progressElm,stimeElm,etimeElm,audioTotalTime){
	if(!$(audioElm).data("isload")){
		
	}else{
		$(audioElm)[0].play();
		isplaying = true;
		audioTimer = setInterval(function(){
			var curTime = $(audioElm)[0].currentTime;
			if(audioTotalTime - Math.ceil(curTime) <= 0){
				resetAudio(audioElm,progressElm,timeElm,audioTotalTime);
			}
			$($(audioElm).parent()).find(progressElm).css("width",Math.floor(curTime/audioTotalTime*100) + "%");
			var m = Math.floor((audioTotalTime - curTime)/60);
			m = m >= 10 ? m : "0" + m;
			var s = Math.floor((audioTotalTime - curTime)%60);
			s = s >= 10 ? s : "0" + s;
			if(s < 0){
				s = 0;
			}
			var m1 = Math.floor(curTime/60);
			m1 = m1 >= 10 ? m1 : "0" + m1;
			var s1 = Math.floor(curTime%60);
			s1 = s1 >= 10 ? s1 : "0" + s1;
			if(s1 < 0){
				s1 = 0;
			}
			$($(audioElm).parent()).find(stimeElm).html(m1 + ":" + s1);
			//$($(audioElm).parent()).find(etimeElm).html("-" + m + ":" + s);
		},1000);
	}
}
function touchAudio(audioElm,progressElm,timeElm,audioTotalTime,pos){
	$(audioElm).parent().find(progressElm).css("width",pos*100+"%");
	$(audioElm)[0].currentTime = pos*audioTotalTime;
	//$(".btn_play_audio").hide();
	//$(".btn_pause_audio").show();
	 playAudio(audioElm,progressElm,timeElm,audioTotalTime);
}
function touchEvent(elm){
	var c = this;
	document.querySelector(elm).addEventListener("touchstart",c.touchstart,false);
	document.querySelector(elm).addEventListener("touchmove",c.touchmove,false);
	document.querySelector(elm).addEventListener("touchend",c.touchend,false);
}
touchEvent.prototype.touchstart = function(e){
	var c = this; 
	c.tx = e.touches[0].pageX;
	c.ty = e.touches[0].pageY;
	if(typeof callStart  == "function"){
		callStart(c);
	}
};
touchEvent.prototype.touchmove = function(e){
	var c = this;
	c.dtx = e.touches[0].pageX - c.tx;
	c.dty = e.touches[0].pageY - c.ty;
	if(typeof callStart  == "function"){
		callMove(c);
	}
};
touchEvent.prototype.touchend = function(e){
	var c = this;
	if(typeof callStart  == "function"){
		callEnd(c);
	}
	console.log(c.dty);
};
function switchTab(elms,curClass,callback){
	if(!(elms instanceof Array)){
		return;
	}else{
		for(var i = 0,a = elms.length;i < a;i++){
			$(elms[i]).off().bind("click",function(){
				var c = $(this);
				c.addClass(curClass);
				c.siblings().removeClass(curClass);
				if(typeof callback  == "function"){
					callback();
				}
			});
		}
	}
}
var _f = false;
function scrollEvent(elm,value,url,obj,callback){
	var c = $(elm);
	c.scroll(function(){
		var h = c.height();
		var st = c.scrollTop();
		var sh = c[0].scrollHeight;
		if(sh - st - h < value && !_f){
			_f = !_f;
			$.ajax({
				type:"get",
				url:url,
				data:obj,
				error:function(e){
					_f = !_f;
					showTogTip(e);
				},
				success:function(e){
					console.log("callback");
					if(typeof callback  == "function"){
						callback();
						_f = !_f;
					}
				}
			});
		}
	});
}
function backTop(elm1,elm2,value1,value2){
	var c1 = $(elm1),c2 = $(elm2);
	c1.scroll(function(){
		var st = c1.scrollTop();
		if(st > value1){
			c2.show();
		}else{
			c2.hide();
		}
	});
	c2.bind("click",function(){
		c1.animate({scrollTop:0},value2);
	});
}
function getHtml(html){
	var reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
	return html.replace(reg, '<a href="$1$2">$1$2</a>');
};
function showDivBorder(){
	[].forEach.call($("*"),function(a){a.style.outline="1px solid #"+(~~(Math.random()*(1<<24))).toString(16)});
}
function playAudioAction(elm){
	var l = $(elm).children().length;
	for(var i = 0;i < l;i++){
		$($(elm).children()[i]).addClass("audio_action delay"+Math.ceil(Math.random()*100));
	}
}
function pauseAudioAction(elm){
	var l = $(elm).children().length;
	for(var i = 0;i < l;i++){
		$($(elm).children()[i]).removeClass();
	}
}
function PreLoading(imgArr,audioArr){
	this.isPreLoad = false;
	this.loadImgNum = 0;  
	this.loadAudioNum = 0;  
	this.loadImgCom = false; 
	this.loadAudioCom = false; 
	this.loadProgress = 0;
	this.imgArr = (typeof imgArr != "object") ? [imgArr] : imgArr;
	this.audioArr = (typeof audioArr != "object") ? [audioArr] : audioArr;
}
PreLoading.prototype.preLoadImg = function(){
	var c = this; 
	for(var a = c.imgArr, b = 0, d = a.length; b < d; b++){
      var e = new Image();
      e.onload = function(){
      	c.countLoadImgNum(a);
      }
      e.src = a[b];
	}
};
PreLoading.prototype.countLoadImgNum = function(){
	var c = this;
	c.loadImgNum++;
	c.loadProgress = parseInt(c.loadImgNum / c.imgArr.length * 100);
	$(".loading_progress").find("span").text(c.loadProgress + "%");
	if(c.loadImgNum == c.imgArr.length){
		c.loadImgCom = true;
		console.log("loadImgResult-" + c.loadImgNum);
	}
};
PreLoading.prototype.preLoadAudio=function(){
	var c = this;
	for(var a = c.audioArr, b = 0, d = a.length; b < d; b++){
		var e = new Audio();
		e.onloadedmetadata = function(){
			c.countLoadAudioNum(a);
		}
		e.src = a[b];
	}
};
PreLoading.prototype.countLoadAudioNum=function(){
	var c = this;
	c.loadAudioNum++;
	if(c.loadAudioNum == c.audioArr.length){
		c.loadAudioCom = true;
		console.log("loadAudioResult-" + c.loadAudioNum);
	}
};