chat_services.factory('ChatService', function ($q, FireManager) {

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
        console.log('New Conversation Invite Recibed');
        console.log(data);
    });

    return {
        createConversation: function (user_id) {
            FIRE_CHAT.createRoom(roomName, 'private', function (roomId) {
                FIRE_CHAT.inviteUser(user_id, roomId);
                FIRE_CHAT.enterRoom(roomId);
                Console.log('Conversation started');
            })
        },
        getConversationList: function () {
            return $q(function (resolve, reject) {
                FIRE_CHAT.getRoomList(function (data) {
                    console.log(data);
                });
            });
        }
    };
});
