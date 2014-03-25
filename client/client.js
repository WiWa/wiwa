if (Meteor.isClient) {

  var views = ["navHome", "navProjects"];

////Specified in events.js
  Template.viewMain.events({
//////// On clicking a tab, hide other views, show relevant view
    'click #navHome' : function () {
	Session.set("view", 0);
	$("#divHome").css({"display":"inline"});
	$(".view[id!=divHome]").hide();
    },
    'click #navProjects' : function () {
	Session.set("view", 1);
	$("#divProjects").css({"display":"inline"});
	$(".view[id!=divProjects]").hide();
    },

/////// On clicking li (a tab), do boxshadow (underlining) stuff
    'click li' : function () {
	for(var i = 0; i < views.length; i++){
	  if(Session.get("view") == i){
	    $("#"+views[i] ).css({
	    	"box-shadow": "0 5px 2px -2px rgba(0, 205, 255, 0.95)"
	    });
	  }
	  else{
	    $("#"+views[i] ).css({
	    	"box-shadow": ""
	    });
	  }
	}
    },
//////// On clicking More About Me!, remove cool styling, show the about
    'click #ablbl' : function (){
	normalHome();
    },
//////// Show Email
    'click #embtn' : function (){
	if(typeof(emailShown)=='undefined'){
		$("#emlbl").text("wang.win0@gmail.com");
		emailShown = true;
	}
    },

  });

////Tab functionality
  Template.viewMain.home = function () {
	return Session.get("view")==0;
  }
  Template.viewMain.projects = function () {
	return Session.get("view")==1;
  }
////Default to Home
  Session.set("view", 0);
////On page load
  Template.viewMain.rendered = function () {
	$("#divProjects").hide();
	$("#navHome").click();
	
	//Dynamic Project List
	Meteor.subscribe("projects", function(e, r){
		Projects = new Meteor.Collection("projects");
		var pArr = Projects.find().fetch();
		for (var i = 0; i < pArr.length; i++){
			var p = "<div class='projectDiv'>"+"<a href='"+pArr[i]['link']+"'><img src='"+pArr[i]['image']+"'class='projectImg'/></a>"+"<a href='"+pArr[i]['link']+"'><p class='projectTitle'>"+pArr[i]['name']+"</p></a>"+pArr[i]['description']+"</div>";
			$("#div2Projects").append(p);
		}
	});
	styleHome();
	bindHandlers();
  }

}

function styleHome(){
	///Set up parts
	var a = $($('#divIntro p')[0]);
	var b = $($('#divIntro p')[1]);
	var c = $($('#divIntro p')[2]);
	var d = $($('#divIntro p')[3]);
	
	a.css({"font-size":"3.6em", "margin-top":"36px"});
	b.css({"font-size":"1.5em"});
	c.css({"font-size":"1.5em"});
	d.css({"font-size":"2.7em"});

}
function normalHome(){

	$("#ablbl").hide();

	var a = $($('#divIntro p')[0]);
	var b = $($('#divIntro p')[1]);
	var c = $($('#divIntro p')[2]);
	var d = $($('#divIntro p')[3]);
	var nw = $("#divIntro").width()-32;

	
	$("#divIntro").animate({"padding":"16px", "width":nw+"px", "height":"450px"},300);
	$('#divText').animate({"padding":"0"},300);
	
	a.animate({"color":"black","font-size":"2.6em", "margin-left":"0"},300);
	$('.tre').animate({"color":"black","font-size":"1.3em"},300);
	a.removeClass('hey').addClass('tre');
	a.css({"text-shadow":"none"});

	$('#divIntro p').animate({"margin":"0"},300,function(){
	    	$('#divMore').show(200);
	});

	a.text("Win Wang");
	b.text("Student");
	c.text("Physicist");
	d.text("Computer Scientist");
}

function bindHandlers(){
	$(".li").hover(function(){$("#lilbl").stop(true).animate({"opacity":"1"},150)},function(){$("#lilbl").stop(true).animate({"opacity":".64"},150)});

	$(".gh").hover(function(){$("#ghlbl").stop(true).animate({"opacity":"1"},150)},function(){$("#ghlbl").stop(true).animate({"opacity":".64"},150)});

	$(".em").hover(function(){$("#emlbl").stop(true).animate({"opacity":"1"},150)},function(){$("#emlbl").stop(true).animate({"opacity":".64"},150)});
}


