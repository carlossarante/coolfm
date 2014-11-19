angular.module('app', ['ngImgCrop'])
  .controller('FormCtrl',['$scope',function($scope){
     /* $scope.formulario = document.forms[0];
      $scope.formData = new FormData($scope.formulario);
      $scope.imgFormData = new FormData();
      $scope.imgcont = 0;

      $scope.form_url = window.location.href;
      

      $scope.appendImg = function (scope, file,thumbnail){
        $scope.imgFormData.append(thumbnail,file);
        $scope.imgcont +=1;
      }
      $scope.sendForm = function (action) {
        $scope.formData.append(action,action);
        var request = new XMLHttpRequest();
        request.open("POST", "/admin/news_Manager/post/add/");
        request.onerror = function () {
          alert("error");
        }
        request.onload = function () {
        }
        request.onloadend = function () { 
          if (request.status === 200) {
            var token = $scope.getCookie("csrftoken");
            $scope.imgFormData.append('csrfmiddlewaretoken',token);
            $scope.imgFormData.append('quant_image-form', $scope.imgcont);
            var imgRequest = new XMLHttpRequest();
            imgRequest.open("POST", "/nouvelles/images/");
            imgRequest.send($scope.imgFormData); 
          }
        }
        request.send($scope.formData);
      };

      $scope.getCookie =function (a)
      {
        var e = null;
        if (document.cookie && document.cookie != "")
        {
          var d = document.cookie.split(";");
          for (var c = 0; c < d.length; c++)
          {
            var b = jQuery.trim(d[c]);
            if (b.substring(0, a.length + 1) == (a + "="))
            {
              e = decodeURIComponent(b.substring(a.length + 1));
              break
            }
          }
        }
        return e
      }*/

    }]) 

  .controller('ImgCtrl', ['$scope',function($scope) {
    $scope.myImage='';
    $scope.myCroppedImage='';
    $scope.file ={};
    $scope.selected=false;
    $scope.croped = false;

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
     
      $scope.thumbnail = evt.target.name;
      $scope.thumbnail = $scope.thumbnail.split('img');
      $scope.thumbnail =$scope.thumbnail[0] + "post_thumbnail";

      /*document.getElementsByName($scope.thumbnail)[0].value = "";
      document.getElementById($scope.thumbnail).src = "";*/
    };
    $scope.cropImg = function (){
      //$scope.croped = true;
      //$scope.appendImg($scope,$scope.img,$scope.thumbnail);
      console.log($scope.thumbnail);
      document.getElementsByName($scope.thumbnail)[0].value = $scope.myCroppedImage;
      document.getElementById($scope.thumbnail).src = $scope.myCroppedImage;
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
