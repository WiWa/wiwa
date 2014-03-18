if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
	Projects = new Meteor.Collection("projects");

	var ProjectArray = [
		{
		name:"Babble",
		image:"./babble.png",
		link:"https://github.com/stuycs-softdev-2012-2013/WWEB",
		description:'"Language Learning Through Your Browser" is the idea behind this Chrome app (extension). I worked in a small team during my soft dev course to create this, which we presented at Google NYC (coolest idea of the night)! Worked on design, implemented extension, translation, quiz, profile functionality.'},
		{
		name:"StuyWeb",
		image:"./stuyweb.png",
		link:"https://github.com/stuycs-ml7-projects-2012-2013/StuyWeb",
		description:"A private social network for my high school, one in which students and teachers would converse freely and without distraction. A project for my soft dev course built in Python."
		}
	    ]

	Projects.remove({});
	//if(!Projects.find().count()){
	    for(var i = 0; i<ProjectArray.length; i++)
	    Projects.insert(ProjectArray[i]);
	//}

	Meteor.publish("projects", function(){
		return Projects.find({});
	})


  });
}
