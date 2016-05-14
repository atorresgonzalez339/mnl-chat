chat_services.factory('ApiService', function ($http, $q) {

    var API_ROOT_PATH = 'http://localhost:8080/api';

    return {
        getFirebaseToken: function (uid) {
            return $q(function (resolve, reject) {
                $http.get(API_ROOT_PATH + '/firebase_token/' + uid).
                    then(function(result) {
                        resolve(result.data);
                    }, function(){
                        reject();
                    });
                });
            }
        };
    });
