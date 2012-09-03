var margin = 0;
var ratioW = 16;
var ratioH = 9;
var nextLocation = "";
var prevLocation = "";
var homeLocation = "../index.html";
var menuScale = 0.75;
var innerMenuScaleW = 0.8;
var innerMenuScaleH = 0.4;
var fontScale = 0.001;
var hoverNav = false;
var feature, navigation, sW

var posX=0;
var posY=0;
var pPosX=0;
var pPosY=0;
var counter =0;
var counterMax = 2000; //delay till ui disappears
var spread = 20;
var hit = false;
var debug = false;

function featureSetup(){
	featureResize();
	hit=true;
	counter=0;
	feature = document.getElementById("feature");
	feature.controls=0;
	nav = document.getElementById("navigation");
	nav.onmousedown = function(){ return false }; 
	$("#navigation").hide();
	//--
	//--------------
	$("#feature").bind("ended", function(){ location.href=nextLocation; });
	$("#prevButton").click(function(){ location.href=prevLocation; });
	$("#homeButton").click(function(){ location.href=homeLocation; });
	$("#nextButton").click(function(){ location.href=nextLocation; });
	$("#navigation").mouseenter(function(){ hoverNav=true });
	$("#navigation").mouseleave(function(){ hoverNav=false });
	
	$(document).mousemove(function(e){
		pPosX = posX;
		pPosY = posY;
		posX = e.pageX;
      	posY = e.pageY;
	}); 	

	mouseCheck();
	//--
}

function featureResize(){
	sW = $(window).width();
	$("#container").css("width", sW-margin);
	$("#container").css("height", ((sW/ratioW)*ratioH)-margin);
	$("#feature").css("width",100+"%");
	$("#feature").css("height",100+"%");
	$("#navigation").css("top", ($("#container").height()-120)+"px");
	$("body").css("font-size",(sW * fontScale)+"em");
}

function menuSetup(){
	menuResize();
	document.getElementById("menu").onmousedown = function(){ return false }; 
	$("body").css("cursor","auto");
	//$(".menubutton").click(requestFullScreen);
}

function menuResize(){
	sW = $(window).width();
	$("#container").css("width", sW-margin);
	$("#container").css("height", ((sW/ratioW)*ratioH)-margin);
	$("#menu").css("width", $("#container").width() * menuScale);
	$("#menu").css("height", $("#container").height() * menuScale);
	$("#innermenu").css("width", $("#menu").width() * innerMenuScaleH);
	$("#innermenu").css("height", $("#menu").height() * innerMenuScaleW);
	$("body").css("font-size",(sW * fontScale)+"em");
}

function mouseCheck(){
   	setTimeout(function(){
		
		if(hitDetect(posX, posY, spread, spread, pPosX, pPosY, spread, spread)){
		if(counter<counterMax){
			counter++;
		}else{
			counter=0;
			hit=true;
		}
		}else{
			hit=false;
		}
		
		if(hit && !hoverNav){
				$("#navigation").hide();
				feature.controls=0;
				$("body").css("cursor","none");
				if(debug){ $("body").css("background","green"); }
		}else if(!hit){
			$("#navigation").show();
			feature.controls=1;
			$("body").css("cursor","auto");
			if(debug){ $("body").css("background","red"); }
		}
		mouseCheck();
	},1);
}

function disableSelect(){
	document.onmousedown = function(){return false};  // prevents selecting text
}

function hitDetect(x1, y1, w1, h1, x2, y2, w2, h2) {
  w1 /= 2;
  h1 /= 2;
  w2 /= 2;
  h2 /= 2; 
  if(x1 + w1 >= x2 - w2 && x1 - w1 <= x2 + w2 && y1 + h1 >= y2 - h2 && y1 - h1 <= y2 + h2) {
    return true;
  } 
  else {
    return false;
  }
}

function requestFullScreen() {
var docElm = document.documentElement;
if (docElm.requestFullscreen) {
    docElm.requestFullscreen();
}
else if (docElm.mozRequestFullScreen) {
    docElm.mozRequestFullScreen();
}
else if (docElm.webkitRequestFullScreen) {
    docElm.webkitRequestFullScreen();
}
}

