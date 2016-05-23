chat_controllers.controller('ChatController', function($scope, ChatService) {

    $scope.conversationList = [];

    ChatService.getConversationList().then(function(data){

    });

});