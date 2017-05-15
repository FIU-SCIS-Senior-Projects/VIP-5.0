angular.module('ProjectProposalService', [])

    .factory('ProjectService', function($http) {

        // create a new object
        var projectFactory = {};

        projectFactory.createProject = function (projectData) {
            return $http.post('/api/projects', projectData)
        };

        projectFactory.editProject = function (projectData, id) {
            return $http.put('/api/projects/' + id, projectData);
        };		
		
        projectFactory.getProjects = function () {
            return $http.get('/api/projects/').then(function(data){
               console.log("Got the Projects");
               return data.data;
            });
        };
		//Joe's User Story
		projectFactory.editTerm = function(termData, id) {
			return $http.put('/api/terms/' + id, termData);
		};
        projectFactory.getProject = function (id) {
            return $http.get('/api/projects/'+ id).then(function(data){
               console.log("Got the Project");
               return data.data;
            });
        };

        projectFactory.delete = function (id) {
            return $http.delete('/api/projects/' + id).then(function(data){
               console.log("Deleting response just arrived");
            });;
        };
		
		projectFactory.createTerm = function () {
            return $http.put('/api/terms/').then(function(data){
               console.log("Got the terms");
               return data.data;
            });
        };
		
		//Joe User Story
		/*projectFactory.getTermData = function() {
			return $http.get('api/terms/').then(function(data){
				console.log("Got the Term Data");
				return data.data;
				
			});
		} */
		
        return projectFactory;
    });