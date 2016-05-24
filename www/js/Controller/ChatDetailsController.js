chat_controllers.controller('ChatDetailsController', function($scope, $stateParams, $timeout,
                                                              ChatService, ContactService) {

    $scope.data = {
        message: '',
        chatId: null,
        contactId: null,
        contactName: null,
        typing: false,
        contactTyping: false
    };

    $scope.$on("$ionicView.beforeEnter", function(event, data){
        // handle event
        $scope.data.chatId = $stateParams.chatId;

        ChatService.getTyping($scope.data.chatId).then(function(data){
            $scope.data.contactTyping = data;
        });

        ChatService.getConversationUserId($scope.data.chatId).then(function(contactId){
            $scope.data.contactId = contactId;
            //Get Contact Information
            ContactService.getContact(contactId).then(function(contact){
                $scope.data.contactName = contact.name ? contact.name : contactId;
            });
        });

        ChatService.getMessagesObj($scope.data.chatId).then(function(data){
            $scope.data.messages = data;
        });
    });

    $scope.sendMessage = function(){
        var chatId = $scope.data.chatId;
        var message = $scope.data.message;
        ChatService.sendMessage(chatId, message).then(function(){
            $scope.data.message = '';
        })
    };

    var typingTimeOut = null;

    var setTyping = function(onlyStartTimer){

        if(!onlyStartTimer){
            $scope.data.typing = true;
            ChatService.setTyping($scope.data.chatId, true);
        }

        typingTimeOut = $timeout(function(){
            console.log('Stop Typing...');
            $scope.data.typing = false;
            ChatService.setTyping($scope.data.chatId, false);
        }, 1500);
    };

    $scope.onTyping = function(){
        if(!$scope.data.typing){
            if(typingTimeOut){
                $timeout.cancel(typingTimeOut);
                setTyping();
            }
            else{
                setTyping();
            }
        }
        else{
            if(typingTimeOut){
                $timeout.cancel(typingTimeOut);
                setTyping(true);
            }
            else{
                setTyping(true);
            }
        }
    }

});