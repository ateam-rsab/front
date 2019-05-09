define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DaftarPasienGiziCtrl', ['ManageGizi', '$rootScope', '$scope', 'ModelItem', '$state', 'FindPasienGizi', 'DateHelper',

        function(manageGizi, $rootScope, $scope, ModelItem, $state, findPasien, dateHelper) {
            $scope.now = new Date();
            $scope.title = $state.params.title;
            if ($scope.title === undefined)
                $scope.title = "Daftar Order Gizi";
            if ($state.current.name === 'Gizi.Queue' || $state.current.name === 'Gizi.Sample' || $state.current.name === 'Radiologi.Result' || $state.current.name === 'Gizi.Take') {
                $scope.notDetail = false;
            }
            $scope.Column = [{
                    "field": "noAntrian",
                    "title": "No.",
                    "width": 50
                },
                //  {
                //     "field": "noRegistrasi",
                //     "title": "No Registrasi"
                // },
                {
                    "field": "namaPasien",
                    "title": "Nama Pasien"
                }, {
                    "field": "tglOrder",
                    "title": "Tanggal Order",
                    template: "#= kendo.toString(kendo.parseDate(tglRegistrasi, 'yyyy-MM-dd'), 'dd-MM-yyyy hh:mm:ss') #"
                }, {
                    "field": "namaRuangan",
                    "title": "Nama Ruangan"
                }, {
                    "field": "status",
                    "title": "Status"
                }
            ];
        }
    ])
});