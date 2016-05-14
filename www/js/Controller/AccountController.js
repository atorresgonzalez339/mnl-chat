chat_controllers.controller('AccountController', function($scope, FireManager) {

    $scope.logout = function(){
        FireManager.getFireAuth().$unauth();
    };

});