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
	    	"box-shadow": "0 5px 2px -1px rgba(0, 255, 255, 0.95)"
	    });
	  }
	  else{
	    $("#"+views[i] ).css({
	    	"box-shadow": ""
	    });
	  }

	}
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
			var p = "<div>"+"<a href='https://github.com/stuycs-softdev-2012-2013/WWEB'><img src='"+pArr[i]['image']+"'class='icon'/></a>"+"<a href='https://github.com/stuycs-softdev-2012-2013/WWEB'><p class='projectTitle'>"+pArr[i]['name']+"</p></a>"+pArr[i]['description']+"</div>";
			$("#divProjects").append(p);
		}
	});
	styleHome();
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

	$('#divIntro').animate({"margin-top":"140px"},500);
	$('#divIntro p').animate({"margin-top":"40px"},500, function(){
		a.animate({"font-size":"4.1em", "margin-bottom":"-5px", "margin-left":"-30px"}, 800);
		b.animate({"font-size":"1.8em", "margin-bottom":"-20px"}, 700);
		c.animate({"font-size":"1.8em", "margin-bottom":"-20px", "margin-left":"80px"}, 700);
		d.animate({"font-size":"1.8em", "margin-bottom":"-20px" }, 700);
		e.animate({"font-size":"1.8em", "margin-bottom":"-12px", "margin-left":"60px"}, 700);
		f.animate({"font-size":"3.1em", "margin-top":"52px", "margin-left":"30px"}, 700);
	});

	
}



