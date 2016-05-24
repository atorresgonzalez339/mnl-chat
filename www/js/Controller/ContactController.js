chat_controllers.controller('ContactController', function($scope, $state, $cordovaContacts,
                                                          ContactService, ChatService) {

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

    $scope.openConversation = function(contact){
        ChatService.hasConversationOpen(contact.uid).then(function(data){
            if(data){
                $state.go('chat-detail', {
                    chatId: data.id
                });
            }
            else{
                ChatService.createConversation(contact.uid).then(function(){
                    console.log('Conversation started');
                });
            }
        })
    };

    $scope.getAllContacts();

});