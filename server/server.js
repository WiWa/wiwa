if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
	Projects = new Meteor.Collection("projects");

	Projects.remove({});
	if(!Projects.find().count()){
		Projects.insert({image:"https://raw.githubusercontent.com/stuycs-softdev-2012-2013/WWEB/master/ett/templates/icon.png", name:"Babble", description:"'Language Learning Through Your Browser' is the idea behind this Chrome Extension I helped create for a software development course.", link:"https://github.com/stuycs-softdev-2012-2013/WWEB"});
	}

	Meteor.publish("projects", function(){
		return Projects.find({});
	})


  });
}
