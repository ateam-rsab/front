define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('DashboardPencatatanKinerjaCtrl', ['$q', 'ManagePegawai', 'FindPegawai', 'DateHelper', 'FindSdm', 'ModelItem', 'ManageSdm', 'ManageSdmNew', '$state', '$rootScope', '$scope',
        function ($q, managePegawai, findPegawai, dateHelper, findSdm, modelItem, manageSdm, ManageSdmNew, $state, $rootScope, $scope) {
            // var progressBar = document.querySelector('.mt-progress-bar[value]');
            // var progressBarValue = progressBar.value;
            // var valueDisplay = document.querySelector('.mt-progress-bar-value');

            // valueDisplay.textContent = progressBarValue + '%';
            $("#headProgress").on('click', () => {
                console.log('tes');
            })

            
        }
    ])
});