chat_controllers.controller('ProfileController', function($scope, $state, ProfileService) {

    $scope.profile = null;

    ProfileService.getProfile().then(function(profileObj){
        $scope.profile = profileObj;
    });

    $scope.saveProfile = function(){
        $scope.profile.$save();
        $state.go('tab.account');
    }



});