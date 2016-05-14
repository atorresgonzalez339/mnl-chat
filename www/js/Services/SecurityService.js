chat_services.factory('SecurityService', function ($q, FireManager, $firebaseObject,
                                                   $firebaseArray, ApiService) {

    function generateSecurityCode(length) {
        var charset = "abcdefghijklmnopqrstuvwxyz0123456789",
            retVal = "";
        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
    }

    return {
        validatePhoneNumber: function (phone_number) {
            return $q(function (resolve, reject) {
                var phone_number_ref = FireManager.getRef().child('list_phone_numbers').child(phone_number);
                var phone_number_fire = $firebaseObject(phone_number_ref);
                phone_number_fire.$loaded()
                    .then(function (data) {
                        if (data.$value) {
                            resolve(true);
                        }
                        else {
                            resolve(false);
                        }
                    })
                    .catch(function (error) {
                        reject();
                    });
            });
        },
        validateSecurityCode: function (phone_number, security_code) {
            return $q(function (resolve, reject) {
                var security_code_ref = FireManager.getRef().child('security_codes').child(phone_number);
                var security_code_fire = $firebaseObject(security_code_ref);
                security_code_fire.$loaded().then(function (data) {
                    if (data.$value == security_code) {
                        resolve(data);
                    }
                    else {
                        reject();
                    }
                });
            });
        },
        registerSecurityCode: function (phone_number) {
            return $q(function (resolve, reject) {
                var security_code_ref = FireManager.getRef().child('security_codes').child(phone_number);
                var security_code_fire = $firebaseObject(security_code_ref);
                security_code_fire.$value = generateSecurityCode(6);
                security_code_fire.$save().then(function (data) {
                    resolve(data);
                }, function (error) {
                    reject();
                });
            });
        },
        registerPhoneNumber: function (phone_number) {
            return $q(function (resolve, reject) {
                var phone_number_ref = FireManager.getRef().child('list_phone_numbers').child(phone_number);
                var phone_number_fire = $firebaseObject(phone_number_ref);

                phone_number_fire.$value = true;

                phone_number_fire.$save().then(function (data) {
                    resolve(data);
                }, function (error) {
                    reject();
                });
            });
        },
        authenticateClient: function(uid) {
            return $q(function (resolve, reject) {
                ApiService.getFirebaseToken(uid).then(function (data) {
                    var $auth = FireManager.getFireAuth();
                    $auth.$authWithCustomToken(data.token).then(function(authData) {
                        console.log("Logged in as:", authData.uid);
                    }).catch(function(error) {
                        reject();
                    });
                }, function () {
                    reject();
                });
            });
        }
    };
});
