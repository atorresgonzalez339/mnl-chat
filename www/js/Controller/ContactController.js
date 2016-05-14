chat_controllers.controller('ContactController', function($scope, $cordovaContacts) {

    $scope.contacts = [];

    //$scope.getAllContacts = function() {
    //    $cordovaContacts.find().then(function(allContacts) { //omitting parameter to .find() causes all contacts to be returned
    //        $scope.contacts = allContacts;
    //    });
    //};

    $scope.getAllContacts = function() {
        for(var i = 0; i < 4; i++){
            $scope.contacts.push({
                id: i,
                displayName : 'Angel Torres'
            });
        }
    }

    $scope.getAllContacts();

});