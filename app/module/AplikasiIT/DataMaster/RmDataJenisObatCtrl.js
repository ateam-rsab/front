define(['initialize'], function(initialize) {
'use strict';
initialize.controller('RmDataJenisObatCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
function($q, $rootScope, $scope, IPSRSService) {
$scope.dataVOloaded = true;
$scope.now = new Date();


}
]);
});