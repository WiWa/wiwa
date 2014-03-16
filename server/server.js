if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
	Projects = new Meteor.Collection("projects");

	//Projects.remove({});
	if(!Projects.find().count()){
		Projects.insert({name:"First Project", description:"Hello World"});
	}

	Meteor.publish("projects", function(){
		return Projects.find({});
	})


  });
}
