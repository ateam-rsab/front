define(['Configuration'], function(config) {

  var baseUrlData = config.baseUrlData;
  var basePostData = config.baseApiPostData;

  var dataRequestService = angular.module('Headers', []);
  dataRequestService.service('LoginHelper', ['$q', '$http', function() {

    return {
      get: function() {
        var arr = document.cookie.split(';');
        for (var i in arr) {
          if (arr[i].indexOf('statusCode') >= 0)
            return arr[i].split('=')[1];
        }
        return null;
      }
    };
  }]);

  dataRequestService.service('MenuService', ['$q', 'R', '$http',
    function($q, r, $http) {
      return {

        get: function(name) {
          var defer = $q.defer();
          var ini = this;

          $http({
            method: 'GET',
            url: baseUrlData + name

          }).then(function successCallback(response) {

            if (response.status === 200) {
              defer.resolve(response.data);
            }
          }, function errorCallback(response) {

            defer.reject(response);
          });

          return defer.promise;
        },

        getDataMenu: function(menu) {
          return r.get({
              url: basePostData + menu
          });
        },

        postProfilePegawai: function(data) {
          return r.post({
            url: basePostData + "pegawai/update-pegawai"
          },data)
        },

        postKataSandi: function(data) {
          return r.post({
            url: basePostData + "user/update-password-user/"
          },data)
        }

      };
    }
  ]);
});