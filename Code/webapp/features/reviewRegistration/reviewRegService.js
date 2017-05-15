angular.module('reviewRegistration')
    .factory('reviewRegService', userService);

function userService($http) {
    // create a new object
    var profileFactory = {};

	// User Story #1140
    profileFactory.getReg1 = function () {
        return $http.get('/api/reviewuser/').then(function(data){
            return data.data;
        });
    };
	// User Story #1140
    profileFactory.getReg2 = function (faculty_id) {
        return $http.get('/api/reviewuser/'+faculty_id).then(function(data){
            return data.data;
        });
    };

    profileFactory.getReg = function (user_id) {
        return $http.get('/api/verifyuser/'+user_id).then(function(data){
            return data.data;
        });
    };

    profileFactory.acceptProfile = function (profileData) {
        return $http.put('/api/profile/',profileData).then(function(data){
            return data.data;
        });
    };
    profileFactory.rejectProfile = function (profileData) {
        return $http.put('/api/profile/',profileData).then(function(data){
            return data.data;
        });
    };
	profileFactory.updateProfile = function (profileData) {
	return $http.put('/api/profile/',profileData).then(function(data){
	return data.data;
	});
	};
    return profileFactory;
}
