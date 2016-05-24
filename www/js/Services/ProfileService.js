chat_services.factory('ProfileService', function ($q, FireManager, $firebaseObject) {

    var uid = FireManager.getFireAuth().$getAuth().uid;
    var PROFILE_ROOT_PATH = FireManager.getRef().child('profile')


    return {
        getProfile: function (user_id) {
            return $q(function (resolve, reject) {

                user_id = user_id ? user_id : uid;

                var PROFILE_PATH = PROFILE_ROOT_PATH.child(user_id);
                $firebaseObject(PROFILE_PATH).$loaded(function(obj){
                    resolve(obj);
                })
            });
        }
    };
});
