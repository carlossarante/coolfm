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
      $scope.img=$scope.dataURItoBlob($scope.myCroppedImage);
      console.log($scope.img);
    };
    $scope.cropImg = function (){
      $scope.croped = true;
      $scope.appendImg($scope,$scope.img);
    };
    //angular.element(document.querySelector('#fileInput')).on('change',$scope.handleFileSelect);

    $scope.dataURItoBlob = function(dataURI) {
      // convert base64 to raw binary data held in a string
      // doesn't handle URLEncoded DataURIs
      var byteString = atob(dataURI.split(',')[1]);
     /* var byteString;
      if (dataURI.split(',')[0].indexOf('base64') >= 0)
          byteString = atob(dataURI.split(',')[1]);
      else
          byteString = unescape(dataURI.split(',')[1]);*/

      // separate out the mime component
      var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

      // write the bytes of the string to an ArrayBuffer
      var ab = new ArrayBuffer(byteString.length);
      var ia = new Uint8Array(ab);
      for (var i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
      }
      // write the ArrayBuffer to a blob, and you're done
      var blob = new Blob([ab],{"type":mimeString});
      return blob
    };
  }]);
