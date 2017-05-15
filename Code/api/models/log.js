var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var LogSchema = new Schema({
	// User Story #1140
	projectid: {type: String, required: false},
	student: {type: String, required: false},
	firstName: {type: String, required: false},
	lastName: {type: String, required: false},
	fullName: {type: String, required: false},
	studentemail: {type: String, required: false},
	selectProject: {type: String, required: false},
	description: {type: String, required: false},
	image: {type: String, required: false},
	term: { type: String, default: 1 },
	minStudents: { type: Number, required: false},
	maxStudents: { type: Number, required: false}, //End of Rev Project Proposal fields
    gender : { type: String, required: false},	
	department : { type: String, required: false},	
	college : { type: String, required: false},	
	major : { type: String, required: false},	//End of Rev Student Application fields
	action: {type: String, required: false}, //Accept or Reject
    type: {type: String, required: false}, //Ex: Review Project Proposal or Review Student Application
    time: {type: Date, default: Date.now},
	// User Story #1144
    skillItem: {type: String, required: false},
    // User Story #1140
    faculty: {type: String, required: false},
    facultyemail: {type: String, required: false},
    rank: {type: String, required: false},
    //Userstory 1208
    appliedDate: {type: String, required: false},
    	//Userstory 1207
    proposedDate: {type: String, required: false},
    //Userstory 1209
    RegDate: {type: String, required: false}
	
});

module.exports = mongoose.model('Log', LogSchema);
