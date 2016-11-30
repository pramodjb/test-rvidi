'use strict';
angular.module('rVidiWebApp')
.controller('LoginCtrl', function (IdleLocalStorage,$rootScope,$scope, $window,localStorageService, Loginservice,$location, $timeout,Idle) {

  var viewModel = this;
  viewModel.dataObj = {};
  viewModel.errorMsgFlag = false;
  viewModel.flag=true;
  viewModel.loginform={};
  viewModel.dataLoading = true;


viewModel.session=localStorageService.get('user_id')
if (viewModel.session) {
  console.log($location.$$path)
  if (($location.$$path === '/') ||  ($location.$$path === '#/')) {
    $location.path('/shows');
  }
}


  function randomString(len, charSet) {
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
      var randomPoz = Math.floor(Math.random() * charSet.length);
      randomString += charSet.substring(randomPoz,randomPoz+1);
    }
    return randomString;
  }

  viewModel.player = function(obj){
    localStorageService.set('state', 'true');
    localStorageService.set('url',obj.Show_url_web);
    localStorageService.set('thumbnail',obj.Show_thumbnail_web)
    viewModel.login(url);
  }

  var shuffleArray = function(array) {
    var m = array.length, t, i;

    while (m) {
      i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
  }

Loginservice.getShow().then(function(response) {
  viewModel.dataObj = response.data.Shows_array
  viewModel.showDetails=response.data;
  shuffleArray(viewModel.dataObj);
}).finally(function () {
  viewModel.dataLoading = false;
});

Loginservice.getShow()
viewModel.close=function(){
  viewModel.errorMsgFlag = false;
  viewModel.Loginform={};
  localStorageService.set('state', 'false');
  localStorageService.remove('url')
  localStorageService.remove('thumbnail');
}

viewModel.login = function(){
  var devise_token = randomString(50);
  sessionStorage.setItem('token',devise_token);
  Loginservice.getData(viewModel.Loginform).then(function(response) {
    viewModel.dataObj = response.data;
    viewModel.err = response.data.Error;
    if (response.data.Success === "true") {

      localStorageService.set('user_id', response.data.User.Id);
      localStorageService.set('profile-pic', response.data.User.User_thumbnail);
      localStorageService.set('user-name', response.data.User.Firstname);
      Idle.watch();
      $location.path('/shows');
      $('#myModal').modal('hide');
      $('body').removeClass('modal-open');
      $('.modal-backdrop').remove();
    }
    else {
      viewModel.errorMsgFlag = true;
    }
  });
};
viewModel.session_details=IdleLocalStorage.get("expiry")
})





