chat_services.factory('FireManager', function($firebaseAuth) {

  var ROOT_PATH = 'https://scorching-inferno-9201.firebaseio.com/';
  var PROJECT_PATH = 'mnl-chat';
  var FIRE_REF = new Firebase(ROOT_PATH + PROJECT_PATH);


  return {
    getRef: function(){
      return FIRE_REF;
    },
    getFireAuth: function(){
      return $firebaseAuth(FIRE_REF);
    }
  };
});
