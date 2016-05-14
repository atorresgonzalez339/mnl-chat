chat_controllers.controller('LoginController', function ($scope, SecurityService) {

    $scope.loginData = {
        phone_number: '',
        security_code: '',
        show_validate_code: false
    };

    $scope.validatePhoneNumber = function () {
        var phone_number = $scope.loginData.phone_number;
        SecurityService.validatePhoneNumber(phone_number).then(function (data) {
            if (data) {
                registerSecurityCode(phone_number);
            }
            else {
                SecurityService.registerPhoneNumber(phone_number).then(function () {
                    registerSecurityCode(phone_number);
                }, function () {
                    alert('Error');
                });
            }

        }, function () {
            alert('Error');
        });
    };

    $scope.validateSecurityCode = function () {

        var phone_number = $scope.loginData.phone_number;
        var security_code = $scope.loginData.security_code;

        SecurityService.validateSecurityCode(phone_number, security_code).then(function (data) {
            console.log('Valid Security Code');
            var uid = phone_number;
            SecurityService.authenticateClient(uid).then(function(data){
                console.log(data);
            }, function(){
                alert('error');
            })
        }, function () {
            console.log('Invalid Security Code');
        });

    };

    /**
     * Extra Functions
     */
    var registerSecurityCode = function(phone_number){
        SecurityService.registerSecurityCode(phone_number).then(function () {
            $scope.loginData.show_validate_code = true;
        }, function () {
            alert('Error');
        });
    }
});