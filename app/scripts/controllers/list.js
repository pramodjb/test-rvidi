'use strict';

angular.module('rVidiWebApp')
.controller('ListCtrl', function (IdleLocalStorage,$rootScope ,$window, list, $scope,localStorageService,$location,Idle) {
 var listmodel = this;
 listmodel.dataObj = {};
 listmodel.errorMsgFlag = false;
 listmodel.showstatus= '';
 listmodel.dataLoading = true;
 listmodel.no_of_pages = {};
 listmodel.selectedRow = 0;
 listmodel.selectedPage = 1;
 $scope.emptyurl=false;

 listmodel.user_id= localStorageService.get('user_id')
 listmodel.username=localStorageService.get('user-name')
 listmodel.pic=localStorageService.get('profile-pic')

 $(function() {
   $("li").click(function() {
      $("li").removeClass("active");
      $(this).addClass("active");
    });
 });

 listmodel.list = function(obj){
  localStorageService.set('url',obj.Show_url_web);
  if(!localStorageService.get('url')){
   $scope.emptyurl=true;
   $scope.datatarget="#alert";
 }else{
  $scope.emptyurl=false;
  $scope.datatarget="#myModal1";
}
localStorageService.set('thumbnail',obj.Show_thumbnail_web)
}

if (!localStorageService.get('user_id')) {
  if (($location.$$path === '/shows') ||  ($location.$$path === '#/shows')) {
    $location.path('/');
  }
}




listmodel.close=function(){
  viewModel.errorMsgFlag = false;
  viewModel.Loginform={};
  localStorageService.set('state', 'false');
  localStorageService.remove('url')
  localStorageService.remove('thumbnail');
}

$scope.events = [];

$scope.$on('IdleStart', function() {
  console.log("idle")
});

$scope.$on('IdleWarn', function(e, countdown) {
  console.log("warn")
});

$scope.$on('IdleTimeout', function() {
  console.log("timeout")
  listmodel.logout();
   $('#logout1').modal('hide');
  $('body').removeClass('modal-open');
  $('.modal-backdrop').remove();
});

$scope.$on('IdleEnd', function() {
  console.log("end")
});

$scope.$on('Keepalive', function() {
  console.log("Keepalive")
});

listmodel.myshows = function(){

  listmodel.showstatus= true;
  list.myShows(listmodel.user_id).then(function(response) {
    if(response.data.Success=="true"){
      listmodel.dataObj = response.data.Shows_array;
      listmodel.showDetails=response.data;
      $scope.count = listmodel.showDetails.Total_shows;
      $scope.perpage = listmodel.showDetails.Page_show_count;
      listmodel.mod = $scope.count%$scope.perpage;
      if (listmodel.mod !=0 ) {
        listmodel.no_of_pages =Math.floor($scope.count/$scope.perpage) +1;
      } else {
        listmodel.no_of_pages =Math.floor($scope.count/$scope.perpage);
      }

    }
    else{
      listmodel.showDetails=response.data;
      listmodel.showDetails.Total_shows= "no";
      listmodel.dataObj = {};
      listmodel.no_of_pages=0;
    }
  }).finally(function () {
    listmodel.dataLoading = false;
  });
}


listmodel.paginate = function(n){
  listmodel.selectedRow = 0;
  listmodel.selectedPage = n;
  if(listmodel.showstatus ==false){
    list.getAllshows(n).then(function(response) {
      listmodel.dataObj = response.Shows_array;
    });
  }else{
   list.getMyshows(n).then(function(response) {
    listmodel.dataObj = response.Shows_array;
  });
 }
}
listmodel.prev= function(n){
 if (listmodel.selectedPage > 0) {
   listmodel.selectedPage --;
 }
}

listmodel.next= function(n){
 if (listmodel.selectedPage < listmodel.no_of_pages) {
   listmodel.selectedPage ++;
 }
}


listmodel.allshows = function(){
  listmodel.showstatus= false;
  list.allShows().then(function(response) {
   if(response.data.Success=="true"){
    listmodel.dataObj = response.data.Shows_array
    listmodel.showDetails=response.data;
    $scope.count = listmodel.showDetails.Total_shows;
    $scope.perpage = listmodel.showDetails.Page_show_count;
    listmodel.mod = $scope.count%$scope.perpage;
    if (listmodel.mod !=0 ) {
      listmodel.no_of_pages =Math.floor($scope.count/$scope.perpage) +1;
    } else {
      listmodel.no_of_pages =Math.floor($scope.count/$scope.perpage);
    }
  }else{
    listmodel.showDetails=response.data;
    listmodel.showDetails.Total_shows= "no";
    listmodel.dataObj = {};
    listmodel.no_of_pages=0
  }
}).finally(function () {
  listmodel.dataLoading = false;
});
}
$scope.range = function() {
 var rangeSize = 4 ;
 var ps = [];
 var start;

 start =listmodel.selectedPage ;
 if ( start > listmodel.no_of_pages-rangeSize ) {
  start = listmodel.no_of_pages-rangeSize+1;
}

for (var i=start; i<start+rangeSize; i++) {
  ps.push(i);
}
return ps;
};

listmodel.allshows();


listmodel.logout = function () {
  list.logout().then(function(response){
    localStorageService.clearAll();
    sessionStorage.removeItem("token");
    Idle.unwatch();
    $location.path('/')
    $('#logout1').modal('hide');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
     $('#alert1').modal('show');
})

};

}).filter('range', function() {
  return function(input, start) {
    start = parseInt(start, 10);
    return input.slice(start);
  };
})

.config(function(IdleProvider, KeepaliveProvider) {
    // configure Idle settings
    IdleProvider.idle(100); // in seconds
    IdleProvider.timeout(200); // in seconds
    KeepaliveProvider.interval(100); // in seconds
  })


