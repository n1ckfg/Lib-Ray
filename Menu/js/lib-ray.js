var trackList = [
	"more_than_winning.html",
	"the_orange.html",
	"the_foxhole_manifesto.html",
	"interregnum.html",
	"the_option_of_war.html",
	"i_wanna_be_famous.html",
	"a_good_joke.html",
	"traffic_flow_ii.html",
	"falling_into_place.html",
	"conan_vs_bear.html",
	"neighbourhood_watch.html",
	"the_dead_man_and_the_lawyer.html",
	"peace_through_strength.html",
	"the_story_of_enoch.html",
	"mother_of_all_bombs.html",
	"birds_eye_bulls_eye.html",
	"disarmed.html",
	"the_little_bird_of_disaster.html",
	"we_are_now_starting_our_descent.html",
	"trebuchet.html",
	"seismograph.html",
	"all_about_the_magnet.html",
	"six_premonitions.html",
	"coagulate.html",
	"the_mouth_and_the_vitamin.html",
	"sloth.html",
	"aleph-bet.html",
	"the_judge.html",
	"techniques_for_managing_anger.html",
	"elegy.html",
	"one_new_message.html",
	"fast_voyeur.html",
	"manipulations.html",
	"an_iconoclast.html",
	"stoel_iii.html",
	"high_places.html",
	"meal.html",
	"open_quote.html"
];	

var origW = 1920;
var origH = 1080;
var marginW = 0;
var marginH = 0;
var ratioW = 16;
var ratioH = 9;
var trackMinW = 700;
var menuScale = 0.85;
var innerMenuScaleW = 0.8;
var innerMenuScaleH = 0.8;
var fontScale = 0.001;
var hoverNav = false;
var feature, navigation, wW, sW;

var posX=0;
var posY=0;
var pPosX=0;
var pPosY=0;
var counter =0;
var counterMax = 2000; //delay till ui disappears
var spread = 20;
var hit = false;
var debug = false;

var startTime = 0;
var thisTrack="";
var nextLocation = "";
var prevLocation = "";
var homeLocation = "../index.html";
var trackType="feature";

$(setup);

function setup(){
	if(trackType=="feature"){
		$(featureSetup);
		$(window).resize(featureResize);
	}else if (trackType=="menu"){
		menuSetup();
		$(window).resize(menuResize);
	}
}

function featureSetup(){
	$(getTrack);
	$(featureResize);
	hit=true;
	counter=0;
	feature = document.getElementById("feature");
	feature.controls=0;
	feature.addEventListener("loadedmetadata", function() {
  		this.currentTime = startTime;
	}, false);
	nav = document.getElementById("navigation");
	nav.onmousedown = function(){ return false }; 
	$("#navigation").hide();
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
	getScreenDim();
	if(sW == origW && wW == origW){
		$("#container").css("width", origW + "px");
		$("#container").css("height", origH + "px");
		$("#feature").css("width", origW + "px");
		$("#feature").css("height", origH + "px");
	}else{
		$("#container").css("width", wW-marginW);
		$("#container").css("height", ((wW/ratioW)*ratioH)-marginH);
		$("#feature").css("width", 100+"%");
		$("#feature").css("height", 100+"%");
	}
	$("#navigation").css("top", ($("#container").height()-120)+"px");
	$("body").css("font-size",(wW * fontScale)+"em");
}

function menuSetup(){
	$(menuResize);
	document.getElementById("menu").onmousedown = function(){ return false }; 
	$("body").css("cursor","auto");
	//$(".menubutton").click(requestFullScreen);
}

function menuResize(){
	getScreenDim();
	if(sW == origW && wW == origW){
		$("#container").css("width", origW + "px");
		$("#container").css("height", origH + "px");		
	}else{
		$("#container").css("width", wW-marginW);
		$("#container").css("height", ((wW/ratioW)*ratioH)-marginH);
	}
	$("#menu").css("width", $("#container").width() * menuScale);
	$("#menu").css("height", $("#container").height() * menuScale);
	$("#innermenu").css("width", $("#menu").width() * innerMenuScaleW);
	$("#innermenu").css("height", $("#menu").height() * innerMenuScaleH);
	$("body").css("font-size",(wW * fontScale)+"em");
}

function getTrack(){
	thisTrack = returnDocument();
	for(var i=0;i<trackList.length;i++){
		if(i==0 && trackList[i]==thisTrack){ //first track
				nextLocation = trackList[i+1];
				prevLocation = homeLocation;
		}else if(i==trackList.length-1 && trackList[i]==thisTrack){ //last track
				nextLocation = homeLocation;
				prevLocation = trackList[i-1];			
		}else if(i!=0 && i!= trackList.length-1 && trackList[i]==thisTrack){
				nextLocation = trackList[i+1];
				prevLocation = trackList[i-1];				
		}
	}
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
			if(debug) $("body").css("background","green");
		}else if(!hit){
			$("#navigation").show();
			feature.controls=1;
			$("body").css("cursor","auto");
			if(debug) $("body").css("background","red");
		}
		mouseCheck();
	},1);
}

function getScreenDim(){
	sW = screen.width;
	wW = $(window).width();
	if(wW<trackMinW) wW = trackMinW;
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

function returnDocument() {
    var file_name = document.location.href;
    var end = (file_name.indexOf("?") == -1) ? file_name.length : file_name.indexOf("?");
    return file_name.substring(file_name.lastIndexOf("/")+1, end);
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