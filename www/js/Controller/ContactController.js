chat_controllers.controller('ContactController', function($scope, $cordovaContacts, ContactService) {

    $scope.contacts = [];

    //$scope.getAllContacts = function() {
    //    $cordovaContacts.find().then(function(allContacts) { //omitting parameter to .find() causes all contacts to be returned
    //        $scope.contacts = allContacts;
    //    });
    //};

    $scope.getAllContacts = function() {
        ContactService.getContactList().then(function(data){
            $scope.contacts = data;
        });
    };

    $scope.openConversation = function(){
        console.log('aki');
    };

    $scope.getAllContacts();

});