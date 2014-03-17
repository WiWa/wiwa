if (Meteor.isClient) {

  var views = ["navHome", "navProjects"];


  Template.viewMain.events({
    'click #navHome' : function () {
	Session.set("view", 0);
	$("#divHome").css({"display":"inline"});
	$(".view[id!=divHome]").hide();
	//console.log(Session.get("view"))
	
    },

    'click #navProjects' : function () {
	Session.set("view", 1);
	$("#divProjects").css({"display":"inline"});
	$(".view[id!=divProjects]").hide();
	//console.log(Session.get("view"))
    },


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

    'click #ablbl' : function (){
	normalHome();
    }

  });

  Template.viewMain.home = function () {
	return Session.get("view")==0;
  }
  Template.viewMain.projects = function () {
	return Session.get("view")==1;
  }



  Session.set("view", 0);
  Template.viewMain.rendered = function () {
	$("#divProjects").hide();
	$("#navHome").click();
	
	//Dynamic Project List
	Meteor.subscribe("projects", function(e, r){
		Projects = new Meteor.Collection("projects");
		var pArr = Projects.find().fetch();
		for (var i = 0; i < pArr.length; i++){
			var p = "<div class='project'>"+"<a href='"+pArr[i]['link']+"'><img src='"+pArr[i]['image']+"'class='projectImg'/></a>"+"<a href='"+pArr[i]['link']+"'><p class='projectTitle'>"+pArr[i]['name']+"</p></a>"+pArr[i]['description']+"</div>";
			$("#div2Projects").append(p);
		}
	});
	styleHome();
		console.log($("#and")[0]);
  }

}

function styleHome(){
	///Set up parts
	var a = $($('#divIntro p')[0]);
	var b = $($('#divIntro p')[1]);
	var c = $($('#divIntro p')[2]);
	var d = $($('#divIntro p')[3]);
	var e = $($('#divIntro p')[4]);
	var f = $($('#divIntro p')[5]);
	
	$('#divIntro p').css({"margin-top":"40px"});
	$('#divIntro').animate({"margin-top":"30px"},600,function(){
		$("#and").animate({"top":"5px"}, 400);})
		a.css({"font-size":"4.1em", "margin-bottom":"-5px", "margin-left":"-30px"}, 700);
		b.css({"font-size":"1.8em", "margin-bottom":"-20px"}, 700);
		c.css({"font-size":"1.8em", "margin-bottom":"-20px", "margin-left":"80px"}, 700);
		d.css({"font-size":"1.8em", "margin-bottom":"-20px" }, 700);
		e.css({"font-size":"1.8em", "margin-bottom":"-12px", "margin-left":"60px"}, 700);
		f.css({"font-size":"3.1em", "margin-top":"52px", "margin-left":"30px"});
}
function normalHome(){
	$("#ablbl").hide();
	var a = $($('#divIntro p')[0]);
	var b = $($('#divIntro p')[1]);
	var c = $($('#divIntro p')[2]);
	var d = $($('#divIntro p')[3]);
	var e = $($('#divIntro p')[4]);
	var f = $($('#divIntro p')[5]);
	a.animate({"color":"black", "font-size":"1.1em", "margin-bottom":"0px", "margin-left":"0px"}, 500);
	b.animate({"font-size":"1.1em", "margin-bottom":"0px"}, 500);
	c.animate({"font-size":"1.1em", "margin-bottom":"0px", "margin-left":"0px"}, 500);
	d.animate({"font-size":"1.1em", "margin-bottom":"0px" }, 500);
	e.animate({"font-size":"1.1em", "margin-bottom":"0px", "margin-left":"0px"}, 500);
	f.animate({"color":"black", "font-size":"1.1em", "margin-top":"0px", "margin-left":"0px"},500);
	$('#divIntro p').css({"text-shadow":"none"});
	$('#divIntro p').animate({"margin-top":"0px"},260,function(){$("#divIntro").animate({"margin-top":"0px","margin-left":"36px"},260);$('#divMore').show(500);});
	
	a.text("Win Wang");
	b.text("Gamer");
	c.text("Student");
	d.text("Physicist");
	e.text("Computer Scientist");
	f.text("");
}



