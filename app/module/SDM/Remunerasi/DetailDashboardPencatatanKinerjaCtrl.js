define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('DetailDashboardPencatatanKinerjaCtrl', ['$q', 'ManagePegawai', 'FindPegawai', 'DateHelper', 'FindSdm', 'ModelItem', 'ManageSdm', 'ManageSdmNew', '$state', '$rootScope', '$scope',
        function ($q, managePegawai, findPegawai, dateHelper, findSdm, modelItem, manageSdm, ManageSdmNew, $state, $rootScope, $scope) {
            // var progressBar = document.querySelector('.mt-progress-bar[value]');
            // var progressBarValue = progressBar.value;
            // var valueDisplay = document.querySelector('.mt-progress-bar-value');

            // valueDisplay.textContent = progressBarValue + '%';
            $("#headProgress").on('click', () => {
                console.log('tes');
            });

            // http://192.168.12.3:8080/jasamedika-sdm/iki-remunerasi/get-detail-dashboard-kinerja?pegawaiId=1316&jabatanId=2122&bulan=1614531600000
            ManageSdmNew.getListData("iki-remunerasi/get-detail-dashboard-kinerja?pegawaiId=1316&jabatanId=2122&bulan=1614531600000").then((res) => {
                console.log(res);
            })

            
        }
    ])
});