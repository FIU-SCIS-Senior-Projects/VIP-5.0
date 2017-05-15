// User Story #1140
(function() {
    angular
        .module('reviewRegistration',['userService'])
        .controller('reviewController', reviewController);

    reviewController.$inject = ['$state', '$scope', '$location', 'reviewRegService', 'reviewPPS', 'ProfileService'];
    /* @ngInject */
// User Story #1140
    function reviewController( $state, $scope, $location, reviewRegService, reviewPPS, ProfileService) {
        var vm = this;
        vm.profile;
        vm.acceptProfile = acceptProfile;
        vm.rejectProfile = rejectProfile;
// User Story #1140
        vm.UndoFaculty = UndoFaculty;
        vm.deleteLog = deleteLog;
        vm.membs = [];
// User Story #1140
        init();
        function init(){
            loadLogs();
        }


// User Story #1140
        function loadLogs()
        {
            reviewPPS.loadLog("faculty").then(function(data){
                vm.logs = data;
            });
            loadProfiles();
        }
// User Story #1140
        function loadProfiles(){
        reviewRegService.getReg1().then(function(data)
        {
            vm.profile = data;
            var tempFilter = [];
                var tmpCount = 0;
                
                vm.profile.forEach(function (obj)
                {
                    console.log(obj.piApproval);
                            if (obj.piApproval==false&&obj.piDenial==false)
                            {
                                tempFilter[tmpCount] = obj;
                                ++tmpCount;
                            }


                });
                
                vm.membs = tempFilter;
        });
        }

        function acceptProfile (user) {
			loading();
            user.piApproval = true;
            user.isDecisionMade = true;
            user.__v = 1;
            console.log("piApproval set to true");
            vm.message = "User has been Accepted!";

			// if a Pi is approved, mark him in the DB as a super user, so he can switch usertypes to student/faculty/pi without approval
            if (user.userType == "Pi/CoPi")
            {
				user.isSuperUser = true;
                console.log("isSuperUser set to true");
			}

			// non-pi user must be restricted
			else
			{
				user.isSuperUser = false;
                console.log("isSuperUser set to false");
			}
            reviewRegService.acceptProfile(user).then(function(data){ });

            success_msg();
 // User Story #1140
            var log1 = {faculty: user._id, firstName: user.firstName, lastName: user.lastName, facultyemail: user.email, rank: user.rank, gender: user.gender, department: user.department, college: user.college, RegDate: user.RegDate, action: "RegApproved", type: "faculty"};
            reviewPPS.createLog(log1).then(function(success)  {
                    
                }, function(error) {
                });
        }
        
        function rejectProfile (user) {
			loading();
            user.piApproval = false;
            user.piDenial = true;
            user.isDecisionMade = true;
            user.__v = 2;
            
            vm.message = "User has been Rejected!";
            reviewRegService.rejectProfile(user).then(function(data){ });
            reject_msg();
// User Story #1140
            var log = { faculty: user._id, firstName: user.firstName, lastName: user.lastName, facultyemail: user.email, rank: user.rank, gender: user.gender, department: user.department, college: user.college, RegDate: user.RegDate,action: "RegDenied", type: "faculty"};
            reviewPPS.createLog(log).then(function(success)  {
                    
                }, function(error) {
                });
            

        }


// User Story #1140
function UndoFaculty(log)
        {
            
            loading();
            if (log.action == "RegDenied")
            {
                var profile_id = log.faculty;
                reviewRegService.getReg2(profile_id).then(function(data)
                {
                    vm.data = data;
                    vm.data.piApproval = false;
                    vm.data.piDenial = false;
                    vm.data.isDecisionMade = false;
                    vm.data.__v = 4;
                    reviewRegService.updateProfile(vm.data).then(function(data){ });
                }); 
                reviewPPS.UndoLog(log._id).then(function(success){
                }, function(error) {
                });     
                undo_msg();  
            }

            else if(log.action == "RegApproved"){
                var profile_id = log.faculty;
                reviewRegService.getReg2(profile_id).then(function(data)
                {
                vm.data = data;
                vm.data.piApproval = false;
                vm.data.piDenial = false;
                vm.data.isDecisionMade = false;
                vm.data.__v = 4;
                reviewRegService.updateProfile(vm.data).then(function(data){ });
                }); 
                reviewPPS.UndoLog(log._id).then(function(success){
                }, function(error) {
                });     
                undo_msg(); 

            }
           
        }
// User Story #1140        
        function undo_msg()
         {
            swal({   
                title: "Undo Successful",   
                text: "This student application now requires approval",   
                type: "info",   
                confirmButtonText: "Okay" ,
                allowOutsideClick: true,
                timer: 7000,
            },function(){ 
                location.reload();
                }); 
        }

// User Story #1140
        function deleteLog(log)
        {
            //Call service to delete in log
            reviewPPS.UndoLog(log._id).then(function(success){
                logdelete_msg()
            }, function(error) {
            });
        }
        
// User Story #1140
        function logdelete_msg()
         {
            swal({   
                title: "Log Deleted",   
                text: "This log has been successfully deleted",   
                type: "info",   
                confirmButtonText: "Okay" ,
                allowOutsideClick: true,
                timer: 7000,
            },function(){ 
                location.reload();
                }); 
        }



        
// User Story #1140		
		function loading() {
			swal({   
               title: '',
			   text: 'Loading Please Wait...',
			   html: true,
			   timer: 10000,   
			   showConfirmButton: false
            });
		}
// User Story #1140
        function success_msg()
         {
            swal({   
                title: "Approved",   
                text: "User has been accepted and notified",   
                type: "info",   
                confirmButtonText: "Continue" ,
                allowOutsideClick: true,
                timer: 7000,
            },function(){ 
                    location.reload();
                });           
        }
// User Story #1140
        function reject_msg()
         {
            swal({   
                title: "User Rejected",   
                text: "User has been denied and notified",   
                type: "warning",   
                confirmButtonText: "Continue" ,
                allowOutsideClick: true,
                timer: 7000,
            },function(){ 
                    location.reload();
                });
        }
            

    }
})();