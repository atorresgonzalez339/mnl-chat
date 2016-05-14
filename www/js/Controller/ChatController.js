chat_controllers.controller('ChatController', function($scope) {

    $scope.chats = [];

    $scope.getAllChats = function() {
        for(var i = 0; i < 4; i++){
            $scope.chats.push({
                id: i,
                displayName : 'Angel Torres',
                lastText: 'This is the last message for this conversation'
            });
        }
    };

    $scope.getAllChats();
});