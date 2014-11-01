(function () {

  angular.module('cool.services', [])

    .factory('coolService', ['$http', '$q', '$filter', function ($http, $q, $filter) {
      
      function getProgrammation() {
        var deferred = $q.defer();

        $http.get('/static/program.json')
          .success(function (data) {
            deferred.resolve(data);
          });

        return deferred.promise;
      };

      function getCasters() {
        var deferred = $q.defer();

        $http.get('/users/staff')
          .success(function (data) {
            deferred.resolve(data);
          });

        return deferred.promise;
      };
      return {
        getProgrammation : getProgrammation,
        getCasters : getCasters,
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

        $http.get('/nouvelles/section/'+section+'/?format=json&query=principals')
          .success(function (data) {
            deferred.resolve(data);
          });

        return deferred.promise;
      };

      function getPrincipals() {
        var deferred = $q.defer();

        $http.get('/nouvelles/?format=json&query=principals')
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

      function getTopNouvelles() {
        var deferred = $q.defer();

        $http.get('/nouvelles/?format=json&query=top')
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
