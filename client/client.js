if (Meteor.isClient) {

  var views = ["navHome", "navAbout", "navProjects", "navResume"];


  Template.headerT.events({
    'click #navHome' : function () {
	Session.set("view", 0);
	$("#divHome").css({"display":"inline"});
	$(".view[id!=divHome]").hide();
	console.log(Session.get("view"))
    },

    /*'click #navAbout' : function () {
	Session.set("view", 1);
	$("#divAbout").css({"display":"inline"});
	$(".view[id!=divAbout]").hide();
	console.log(Session.get("view"))
    },*/

    'click #navProjects' : function () {
	Session.set("view", 2);
	$("#divProjects").css({"display":"inline"});
	$(".view[id!=divProjects]").hide();
	console.log(Session.get("view"))
    },

    /*'click #navResume' : function () {
	Session.set("view", 3);
	$("#divResume").css({"display":"inline"});
	$(".view[id!=divResume]").hide();
	console.log(Session.get("view"))
    },*/

    'click li' : function () {
	for(var i = 0; i < views.length; i++){

	  if(Session.get("view") == i){
	    $("#"+views[i] ).css({
	    	"box-shadow": "0 5px 2px -1px rgba(0, 255, 255, 0.76)"
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
  Template.viewMain.about = function () {
	return Session.get("view")==1;
  }
  Template.viewMain.projects = function () {
	return Session.get("view")==2;
  }
  Template.viewMain.resume = function () {
	return Session.get("view")==3;
  }



  Session.set("view", 0);
  Template.viewMain.rendered = function () {
	//$("#divAbout").hide();
	$("#divProjects").hide();
	//$("#divResume").hide();
	console.log("rendered");

	Meteor.subscribe("projects", function(e, r){
		Projects = new Meteor.Collection("projects");
		var pArr = Projects.find().fetch();
		for (var i = 0; i < pArr.length; i++){
			var p = "<div><h3>"+pArr[i]['name']+"</h3>"+pArr[i]['description']+"</div>";
			$("#divProjects").append(p);
		}
	});
  }

}
