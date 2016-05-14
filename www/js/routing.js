angular.module('chat').config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider.state('login', {
            url: '/login',
            templateUrl: 'templates/login.html',
            controller: 'LoginController',
            resolve: {
                "currentAuth": function ($q, FireManager) {
                    return $q(function (resolve, reject) {
                        var auth = FireManager.getFireAuth().$getAuth();
                        if (!auth) {
                            return resolve(true);
                        }
                        else {
                            return reject(false);
                        }
                    });
                }
            }
        })

        // setup an abstract state for the tabs directive
        .state('tab', {
            url: '/tab',
            abstract: true,
            templateUrl: 'templates/tabs.html',
            resolve: ResolveAuth
        })

        // Each tab has its own nav history stack:

        .state('tab.contacts', {
            url: '/contacts',
            views: {
                'tab-contacts': {
                    templateUrl: 'templates/tab-contacts.html',
                    controller: 'ContactController'
                }
            }
        })

        .state('tab.contactDetails', {
            url: '/contact_details/:contactId',
            views: {
                'tab-contacts': {
                    templateUrl: 'templates/contact-details.html',
                    controller: 'ContactDetailsController'
                }
            }
        })

        .state('tab.chats', {
            url: '/chats',
            views: {
                'tab-chats': {
                    templateUrl: 'templates/tab-chats.html',
                    controller: 'ChatController'
                }
            }
        })
        .state('tab.chat-detail', {
            url: '/chats/:chatId',
            views: {
                'tab-chats': {
                    templateUrl: 'templates/chat-detail.html',
                    controller: 'ChatDetailsController'
                }
            }
        })

        .state('tab.account', {
            url: '/account',
            views: {
                'tab-account': {
                    templateUrl: 'templates/tab-account.html',
                    controller: 'AccountController'
                }
            }
        });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/chats');

}).run(function($state, FireManager){
    FireManager.getFireAuth().$onAuth(function(authData) {
        if (authData) {
            console.log("Logged in as:", authData.uid);
        } else {
            console.log("Logged out");
            $state.go('login');
        }
    });
});

var ResolveAuth = {
    "currentAuth": function ($q, FireManager) {
        return $q(function (resolve, reject) {
            var auth = FireManager.getFireAuth().$getAuth();
            if (auth) {
                return resolve(true);
            }
            else {
                return reject(false);
            }
        });
    }
};
