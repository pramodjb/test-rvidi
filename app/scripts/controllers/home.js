'use strict';

/**
 * @ngdoc function
 * @name rVidiWebApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the rVidiWebApp
 */
 angular.module('rVidiWebApp')
 .controller('HomeCtrl',
  ["$sce","$timeout","localStorageService","$scope", function ($sce,$timeout,localStorageService,$scope) {
    var controller =this;
    controller.state=null;
    controller.API=null;
    controller.currentVideo =0;
    $scope.emptyurl=false;

    controller.onPlayerReady= function(API){
      controller.API=API;
      if(localStorageService.get('state')==='true'){
      $('#myModal1').modal('show');
      if (localStorageService.get('url')) {
        controller.setVideo(localStorageService.get('url'));
      }
    }
    };
    controller.stop= function() {
      controller.API.stop();
      localStorageService.set('state', 'false');
      $('body').css('overflow','scroll');
    }
    controller.onCompleteVideo = function() {
      controller.isCompleted = true;

      controller.currentVideo++;

      if (controller.currentVideo >= controller.videos.length) controller.currentVideo = 0;

      controller.setVideo(controller.currentVideo);
    };

    controller.videos = [
    {
      sources: [
      ]
    }
    ];
    controller.config = {
      preload: "none",
      autoHide: false,
      autoHideTime: 3000,
      autoPlay: false,
      sources: controller.videos[0].sources,
      theme: {
        url: "http://www.videogular.com/styles/themes/default/latest/videogular.css"
      },
      plugins: {
        poster: controller.thumbnail
      }
    };
    controller.setVideo = function(index) {
      $('body').css('overflow','hidden');
      if(!localStorageService.get('url')){
       $scope.emptyurl=true;
      $scope.datatarget="#alert";

      }else{
        $scope.emptyurl=false;
        $scope.datatarget="#myModal1";
      }
       controller.thumbnail=localStorageService.get('thumbnail');
      controller.API.stop();
      controller.currentVideo = index;
      controller.config.sources = [
      {src: $sce.trustAsResourceUrl(index), type: "video/mp4"}
      ];
      $timeout(controller.API.play.bind(controller.API), 100);
    };
  }]
  )
