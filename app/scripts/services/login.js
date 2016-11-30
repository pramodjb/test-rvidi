'use strict';

angular.module('rVidiWebApp')
.factory('Loginservice', function ($http,localStorageService, ENV) {
  var obj = {
    getData: function(data) {
      function success (response) {
        return response;
      }
      function failure (response) {
        return response;
      }
      var email = data.email.toLowerCase();
      var token =sessionStorage.getItem("token")
      return $http.post(ENV.api_path+"log_in",{email: email, password: data.password, devise_token: token}).then(success, failure);
    },

     getAllshows: function(data) {
      function success (response) {
        return response.data;
      }
      function failure (response) {
        return response.data;
      }
      var page_id =data -1
     return $http.get(ENV.api_path+"shows/"+page_id+"").then(success, failure);
    },

    getShow: function() {
      function success (response) {
        return response;
      }
      function failure (response) {
        return response;
      }
      return $http.get(ENV.api_path+"shows/0").then(success, failure);
    }
  };
  return obj;
});