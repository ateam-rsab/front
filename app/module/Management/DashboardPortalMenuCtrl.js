define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DashboardPortalMenuCtrl', ['socket', 'ManageManegement', '$rootScope', '$scope', 'ModelItem', '$state','ManageLogistikPhp',
        function(socket, ManageManegement, $rootScope, $scope, ModelItem, $state,manageLogistikPhp) { 
            $scope.goToLink = (link) => {
                $state.go(`${link}`);
            }

            $scope.goToEis = () => {
                window.location.href = 'https://smart.rsabhk.co.id:2222/bi-rsab/';
            }
        }
    ]);
});