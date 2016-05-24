chat_services.factory('ContactService', function ($q, FireManager, $firebaseArray, $firebaseObject) {

    var uid = FireManager.getFireAuth().$getAuth().uid;
    var CONTACT_ROOT_PATH = FireManager.getRef().child('contacts');


    return {
        getContactList: function () {
            return $q(function (resolve, reject) {
                var CONTACT_LIST_PATH = CONTACT_ROOT_PATH.child(uid);
                $firebaseArray(CONTACT_LIST_PATH).$loaded(function(data){
                    resolve(data);
                });
            });
        },
        getContact: function (user_id) {
            return $q(function (resolve, reject) {
                var CONTACT_PATH = CONTACT_ROOT_PATH.child(uid).child(user_id);
                $firebaseObject(CONTACT_PATH).$loaded(function(data){
                    resolve(data);
                });
            });
        }
    };
});
