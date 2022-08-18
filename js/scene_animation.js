var scene_animation = function(){
	var w = $("#container").width();
	var h = $("#container").height();
	var imgInitialW = 750;
	var imgInitialH = 1206;
	var scaleImg = imgInitialW / imgInitialH;
	var scaleW = imgInitialW / w; //2.34
	var scaleH = imgInitialH / h; //2.12
	var canvas = document.querySelector("#scene");
	var ctx = canvas.getContext("2d");
	var bufcanvas = document.createElement("canvas");
	var bufctx = bufcanvas.getContext("2d");
	var bgx = scaleW > scaleH ? (imgInitialW - scaleH * w) / 2  : 0;
	var bgy = scaleW > scaleH ? 0 : (imgInitialH - scaleW * h) / 2;
	var bgw = scaleW > scaleH ? imgInitialW - bgx * 2 : imgInitialW;
	var bgh = scaleW > scaleH ? imgInitialH : imgInitialH - bgy * 2;
	var changeTimes = 300;
	var crange = 1;
	var animationTimer;
	var p = [[0,0,0,0],
			 [552, 42, 155, 245],
			 [316, 478, 63, 100],
			 [346, 166, 110, 182],
			 [157, 342, 102, 138],
			 [144, 491, 70, 119],
			 [63, 332, 289, 520],
			 [319, 313, 106, 178],
			 [189, 186, 344, 585],
			 [505, 267, 120, 185],
			 [410, 216, 278, 512],
			 [483, 924, 95, 151],
			 [368, 646, 247, 424],
			 [115, 19, 97, 154],
			 [115, 28, 357, 560],
			 [430, 75, 165, 280],
			 [429, 262, 299, 524],
			 [90, 886, 166, 259],
			 [163, 660, 270, 511],
			 [599, 210, 116, 185],
			 [423, 191, 288, 504],
			 [465, 924, 30, 66],
			 [bgx, bgy, bgw, bgh]];
	var ps = ["https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/88a73710860e429caba3d3734415b1ba~tplv-k3u1fbpfcp-watermark.image?",
			  "https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/06078ad317b44589956da3fb4b382d1b~tplv-k3u1fbpfcp-watermark.image?",
			  "https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eb581407485a47beabe95e8ae72154df~tplv-k3u1fbpfcp-watermark.image",
			  "https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c9c45cccaa90462a9fac34b2f2323b23~tplv-k3u1fbpfcp-watermark.image?",
			  "https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ab8d27a87d9c4b2e9f2d77adaab0f6e1~tplv-k3u1fbpfcp-watermark.image?",
			  "https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e315b2adc3f345cbbddc53f844001982~tplv-k3u1fbpfcp-watermark.image?",
			  "https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/50ad7107f83b4a9bb43eaa03fc859b9c~tplv-k3u1fbpfcp-watermark.image?",
			  "https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e55b86b2dca14c87a1f6a7c978f022b2~tplv-k3u1fbpfcp-watermark.image?",
			  "https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e9b2f163439c49c2a5b96fa8a418204a~tplv-k3u1fbpfcp-watermark.image?",
			  "https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8493780e8c094120a836b0537ae5178d~tplv-k3u1fbpfcp-watermark.image?",
			  "https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3a12748e121e4100958086a5571857c3~tplv-k3u1fbpfcp-watermark.image?",
			  "https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/38fadca87707446bbe01035c7b9af314~tplv-k3u1fbpfcp-watermark.image?",
			  "https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/63ddbd832b61406fbc23a6932ca1d733~tplv-k3u1fbpfcp-watermark.image?",
			  "https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/35f44e7d18304405b8555c9ac97e8b8b~tplv-k3u1fbpfcp-watermark.image?",
			  "https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f96baca7e9394005983374be3c8740d0~tplv-k3u1fbpfcp-watermark.image?",
			  "https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/72b9680b5d0f4beeb07be66cbdf64887~tplv-k3u1fbpfcp-watermark.image?",
			  "https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/33f8eb5c748543e08045d1c4ec67baaf~tplv-k3u1fbpfcp-watermark.image?",
			  "https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/266b7e902e8a4bc39f5ba916906d5b3e~tplv-k3u1fbpfcp-watermark.image?",
			  "https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0d405432aa1b4fcdb191a05d01243d81~tplv-k3u1fbpfcp-watermark.image?",
			  "https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/11170796329c4b3e8a58372c5f0725b3~tplv-k3u1fbpfcp-watermark.image?",
			  "https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5920c0681c5f43069e95c6a900c11e00~tplv-k3u1fbpfcp-watermark.image?",
			  "https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8ef166dbac5d484dad5090ef16dc96a3~tplv-k3u1fbpfcp-watermark.image?"];
	return {
		initScene : function(){
			var that = this;
			canvas.width = w;
			canvas.height = h;
			bufcanvas.width = canvas.width;
			bufcanvas.height = canvas.height;
			that.animationCount = changeTimes;
			that.pages = [];
			that.pageos = [];
			for(var i = 1,a = p.length;i < a;i++){
				that.pages.push({
					startx: p[i-1][0],
					starty: p[i-1][1],
					startw: p[i-1][2],
					starth: p[i-1][3],
					
					mpx: bgx,
					mpy: bgy,
					mpw: bgw,
					mph: bgh,
					
					endx: p[i][0],
					endy: p[i][1],
					endw: p[i][2],
					endh: p[i][3]
				});
			}
			for(var j = 0,b = ps.length;j < b;j++){
				if(j == 0){
					that.pageos.push({
						img : this.imgFactory(ps[j]),
						startX : that.pages[j].mpx,
						startY : that.pages[j].mpy,
						imgDrawWidth : that.pages[j].mpw,
						imgDrawHeight : that.pages[j].mph,
						canvasStartX : 0,
						canvasStartY : 0,
						canvasDrawWidth : w,
						canvasDrawHeight : h
					});
				}else{
					that.pageos.push({
						img : this.imgFactory(ps[j]),
						startX : that.pages[j].startx,
						startY : that.pages[j].starty,
						imgDrawWidth : that.pages[j].startw,
						imgDrawHeight : that.pages[j].starth,
						canvasStartX : 0,
						canvasStartY : 0,
						canvasDrawWidth : w,
						canvasDrawHeight : h
					});
				}
			}
			that.pageos[0].img.onload = function(){
				that.drawImg(that.pageos[1], that.pageos[0]);
			};
		},
		imgFactory : function(imgsrc){
			var img = new Image();
			img.src = imgsrc;
			return img;
		},
		drawImg : function(img1, img2){
			bufctx.clearRect(0, 0, w, h);
			bufctx.drawImage(img1.img, img1.startX, img1.startY, img1.imgDrawWidth, img1.imgDrawHeight, img1.canvasStartX, img1.canvasStartY, img1.canvasDrawWidth, img1.canvasDrawHeight);
			if(img2 != null){
				bufctx.drawImage(img2.img, img2.startX, img2.startY, img2.imgDrawWidth, img2.imgDrawHeight, img2.canvasStartX, img2.canvasStartY, img2.canvasDrawWidth, img2.canvasDrawHeight);
			}
			ctx.clearRect(0, 0, w, h);
			ctx.drawImage(bufcanvas, 0, 0, canvas.width, canvas.height);
		},
		updateImg : function(np, n1p, bg_n, bg_n1){
			var that = this;
			that.animationCount = that.animationCount - crange;
			if(that.animationCount > 0){
				var dx = (n1p.startx - n1p.mpx) / changeTimes;
				var dy = (n1p.starty - n1p.mpy) / changeTimes;
				var dw = (n1p.mpw - n1p.startw) / changeTimes;
				var dh = (n1p.mph - n1p.starth) / changeTimes;
				bg_n1.startX -= dx;
				bg_n1.startY -= dy;
				bg_n1.imgDrawWidth += dw;
				bg_n1.imgDrawHeight += dh;
				
				bg_n.canvasStartX = dx * (changeTimes - that.animationCount) * w / bg_n1.imgDrawWidth;
				bg_n.canvasStartY = dy * (changeTimes - that.animationCount) * h / bg_n1.imgDrawHeight;
				bg_n.canvasDrawWidth = np.endw / (np.endw + dw * (changeTimes - that.animationCount)) * w;
				bg_n.canvasDrawHeight = np.endh / (np.endh + dh * (changeTimes - that.animationCount)) * h;
				that.drawImg(bg_n1 ,bg_n);
			}else{
				that.animationCount  = changeTimes;
				curp++;
			}
		}
	};
}();