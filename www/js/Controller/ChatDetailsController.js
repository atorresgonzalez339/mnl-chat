chat_controllers.controller('ChatDetailsController', function($scope, $stateParams, ChatService) {

    $scope.data = {
        message: '',
        chatId: null,
        contactId: null
    };

    $scope.$on("$ionicView.beforeEnter", function(event, data){
        // handle event
        $scope.data.chatId = $stateParams.chatId;

        ChatService.getConversationUserId($scope.data.chatId).then(function(data){
            $scope.data.contactId = data;
        });

        ChatService.getMessagesObj($scope.data.chatId).then(function(data){
            $scope.data.messages = data;
            console.log(data);
        });
    });

    $scope.sendMessage = function(){
        var chatId = $scope.data.chatId;
        var message = $scope.data.message;
        ChatService.sendMessage(chatId, message).then(function(){
            $scope.data.message = '';
        })
    }

});