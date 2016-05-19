chat_services.factory('ContactService', function ($q, FireManager, $firebaseArray) {

    var uid = FireManager.getFireAuth().$getAuth().uid;
    var CONTACT_ROOT_PATH = FireManager.getRef().child('contacts').child(uid);


    return {
        getContactList: function () {
            return $q(function (resolve, reject) {
                $firebaseArray(CONTACT_ROOT_PATH).$loaded(function(data){
                    resolve(data);
                });
            });
        }
    };
});
