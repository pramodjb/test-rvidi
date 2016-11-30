'use strict';

angular.module('rVidiWebApp')
.factory('list', function ($http,localStorageService, ENV) {
  var obj = {
    myShows: function(obj) {
      function success (response) {
        return response;
      }
      function failure (response) {
        return response;
      }

      return $http.get(ENV.api_path+"user/"+obj+"/shows/0").then(success, failure);
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


    getMyshows: function(data) {
      function success (response) {
        return response.data;
      }
      function failure (response) {
        return response.data;
      }
      var page_id =data -1
      var obj = localStorageService.get('user_id')
      return $http.get(ENV.api_path+"user/"+obj+"/shows/"+page_id+"").then(success, failure);
    },


     logout: function() {
      function success (response) {
        return response;
      }
      function failure (response) {
        return response;
      }
       var token =sessionStorage.getItem("token")
       return $http.get(ENV.api_path+"log_out/"+token+"").then(success, failure);
    },

    allShows: function() {
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