(function () {

  angular.module('cool.services', [])

    .factory('coolService', ['$http', '$q', '$filter', function ($http, $q, $filter) {
      
      function getProgramation() {
        var deferred = $q.defer();

        $http.get('/static/menu.json')
          .success(function (data) {
            deferred.resolve(data);
          });

        return deferred.promise;
      };

      return {
        getProgramation : getProgramation,
      };

    }])
    ////////////////////////////////////////////////////////////////////////////////////////////
    .factory('nouvelleService', ['$http', '$q', '$filter', function ($http, $q, $filter) {
      
      function getMenu() {
        var deferred = $q.defer();

        $http.get('/static/menu.json')
          .success(function (data) {
            deferred.resolve(data);
          });

        return deferred.promise;
      };

      function getSection(section) {
        var deferred = $q.defer();

        $http.get('/nouvelles/section/'+section+'/?format=json')
          .success(function (data) {
            deferred.resolve(data);
          });

        return deferred.promise;
      };

      function getNews(url) {
        var deferred = $q.defer();

        $http.get(url)
          .success(function (data) {
            deferred.resolve(data);
          });

        return deferred.promise;
      };

      function getNewsSingle(slug) {
        var deferred = $q.defer();

        $http.get('/nouvelles/'+slug+'/?format=json')
          .success(function (data) {
            deferred.resolve(data);
          });

        return deferred.promise;
      };

      function getPrincipals() {
        var deferred = $q.defer();

        $http.get('/static/portada.json')
          .success(function (data) {
            deferred.resolve(data);
          });

        return deferred.promise;
      };

      function getTopNouvelles() {
        var deferred = $q.defer();

        $http.get('/static/portada.json')
          .success(function (data) {
            deferred.resolve(data);
          });

        return deferred.promise;
      };

      return {
        getMenu : getMenu,
        getNews : getNews,
        getNewsSingle : getNewsSingle,
        getPrincipals : getPrincipals,
        getTopNouvelles : getTopNouvelles,
        getSection : getSection,
      };

    }]);

})();
