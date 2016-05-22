chat_services.factory('ChatService', function ($q, FireManager, $firebaseArray) {

    var CHAT_ROOT_PATH = FireManager.getRef().child('chat');

    var FIRE_CHAT = new Firechat(CHAT_ROOT_PATH);

    FireManager.getFireAuth().$onAuth(function (authData) {
        // Once authenticated, instantiate Firechat with our user id and user name
        if (authData) {
            FIRE_CHAT.setUser(authData.uid, authData.uid, function (user) {
                console.log('FireChat Init...');
                FIRE_CHAT.resumeSession();
            });
        }
    });

    FIRE_CHAT.on('room-invite', function (data) {
        console.log('New Conversation Invite Received');
        console.log(data);
        FIRE_CHAT.acceptInvite(data.id, function(){
            console.log('Invitation Accepted');
            //Do anything
        })
    });

    FIRE_CHAT.on('message-add', function (data) {
        console.log('New Message Received');
        console.log(data);
    });

    return {
        createConversation: function (user_id) {
            return $q(function (resolve, reject) {
                var conversationId = 'conversation1';
                FIRE_CHAT.createRoom(conversationId, 'private', function (roomId) {
                    FIRE_CHAT.inviteUser(user_id, roomId);
                    FIRE_CHAT.enterRoom(roomId);
                    resolve();
                })
            });
        },
        hasConversationOpen: function(user_id){
            return $q(function (resolve, reject) {
                FIRE_CHAT.getRoomList(function (allRooms) {
                    var roomKeys = Object.keys(allRooms);
                    var hasRoom = false;
                    for(var i = 0; i < roomKeys.length; i++ ){
                        var room = allRooms[roomKeys[i]];
                        if(Object.has(room.authorizedUsers, user_id)){
                            hasRoom = room;
                            break;
                        }
                    }
                    resolve(hasRoom);
                });
            });
        },
        getConversationList: function () {
            return $q(function (resolve, reject) {
                FIRE_CHAT.getRoomList(function (data) {
                    resolve(data);
                });
            });
        },
        getConversation: function (roomId) {
            return $q(function (resolve, reject) {
                FIRE_CHAT.getRoom(roomId, function(data){
                    resolve(data);
                });
            });
        },
        getConversationUserId: function (roomId) {
            return $q(function (resolve, reject) {
                var distinct_id = FireManager.getFireAuth().$getAuth().uid;
                FIRE_CHAT.getRoom(roomId, function(room){
                    var authorizedIds = Object.keys(room.authorizedUsers).exclude(distinct_id);
                    resolve(authorizedIds[0]);
                });
            });
        },
        sendMessage: function(roomId, message, messageType){
            return $q(function (resolve, reject) {
                if (!messageType) {
                    messageType = 'default';
                }
                FIRE_CHAT.sendMessage(roomId, message, messageType, function () {
                    resolve();
                })
            });
        },
        getMessagesObj: function(roomId){
            var MESSAGES_PATH = FireManager.getRef().child('chat').child('room-messages').child(roomId);
            var messages = $firebaseArray(MESSAGES_PATH);

            return $q(function (resolve, reject) {
                messages.$loaded(function (data) {
                    resolve(data);
                });
            });
        },
        setTyping: function(roomId, user_id){

            var TYPING_PATH = FireManager.getRef().child('chat')
                                                    .child('room-metadata')
                                                    .child(roomId)
                                                    .child('typing')
                                                    .child('user_id');

            var typingObj = $firebaseObject(TYPING_PATH);

            return $q(function (resolve, reject) {
                messages.$loaded(function (data) {
                    resolve(data);
                });
            });
        }
    };
});
