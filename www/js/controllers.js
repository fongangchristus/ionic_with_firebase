angular.module('friendsapp.controllers', ['ionic', 'firebase'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {


  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
    
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('LoginCtrl', function($scope) {
})

.controller('MapCtrl', function($scope) {
		//map with venue position
		  $scope.position = {
			lat: -34.892589,
			lng: -56.194638
		  };

  $scope.$on('mapInitialized', function(event, map) {
    $scope.map = map;
  });
})
.controller('FavoritesCtrl', function($scope) {
})
.controller('HelpsCtrl', function($scope) {
})
.controller('EventCtrl', function($scope, $stateParams, serviceFactory) {
    
    var eventId = $stateParams.id;
    console.log(eventId) ;
  $scope.event = serviceFactory.getOneEvent(eventId);
    
})
.controller('EventsCtrl', function($scope, $state,$ionicLoading, serviceFactory) {
    $scope.events = [];
    
			$ionicLoading.show({
                    template: 'Loading...',
                    duration: 3000
                  });
  /*serviceFactory.getAllEvent()
  .then(function(events){
    $scope.events = events;
    $ionicLoading.hide();
  },function(err){
    $ionicLoading.hide();
  });
    */
    $scope.events = serviceFactory.getAllEvent();
        console.log( $scope.events) ;           
		
   /*    $scope.eventse = [
    { title: 'Reggae', id: 1 }
  
  ]; */
     $ionicLoading.hide();
    
        $scope.detailEvent = function(id){
            
            $state.go('app.itemEvent', {id: id});
			
        }
})

.factory('serviceFactory', function($firebaseArray, $firebaseObject){
 
    var   auth = firebase.auth();
  var database = firebase.database().ref();
  var storage = firebase.storage();
    var refEvent = database.child('evenements');
    
  return {
    getAllEvent: function(){ 
      return $firebaseArray(refEvent);
    },
    getOneEvent: function(id){
      return $firebaseObject(refEvent.child(id));
    }
  }  
})
;
