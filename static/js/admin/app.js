angular.module('app', ['ngImgCrop'])
  .controller('FormCtrl',['$scope',function($scope){
      $scope.formData = new FormData();
      $scope.appendImg = function (scope, file){
        $scope.formData.append("img"+scope.$id,file);
      }
      $scope.sendForm = function () {
        var request = new XMLHttpRequest();
        request.open("POST", "/static/");
        request.send($scope.formData);
      };

    }]) 
  .controller('ImgCtrl', ['$scope',function($scope) {
    $scope.myImage='';
    $scope.myCroppedImage='';
    $scope.file ={};
    $scope.selected=false;
    $scope.croped = false;

    console.log($scope.$id)
    console.log($scope)

    $scope.handleFileSelect = function (evt) {
      var file=evt.currentTarget.files[0];
      var reader = new FileReader();

      $scope.selected=true;

      reader.onload = function (evt) {
        $scope.$apply(function($scope){
          $scope.myImage=evt.target.result;
        });
      };
      reader.readAsDataURL(file);
      //$scope.file = myImage;
    };
    $scope.cropImg = function (){
      $scope.croped = true;
      $scope.appendImg($scope,$scope.file);
    }
    //angular.element(document.querySelector('#fileInput')).on('change',$scope.handleFileSelect);

  }]);
