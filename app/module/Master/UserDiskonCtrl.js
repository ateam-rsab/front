define(['initialize'], function (initialize) {

    'use strict';
    initialize.controller('UserDiskonCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageTataRekening', 'ManageSdm',
        function ($rootScope, $scope, ModelItem, manageTataRekening, manageSdm) {
            $scope.item = {};
            $scope.listPegawai = [];
            let init = () => {
                manageSdm.getOrderList("service/list-generic/?view=Pegawai&select=id,namaLengkap&criteria=statusEnabled&values=true&order=namaLengkap:asc", true).then((data) => {
                    $scope.listPegawai = data.data;
                })
                $scope.columnGrid = [{
                        "field": "no",
                        "title": "No",
                        "width": "35px",
                    },
                    {
                        "field": "namaPegawai",
                        "title": "Nama Pegawai",
                        "width": "150px",
                    },
                    {
                        "field": "username",
                        "title": "Username",
                        "width": "150px",
                    }
                ];
                $scope.gridOption = {
                    pageable: true,
                    scrollable: true,
                    columns: $scope.columnGrid
                }

                manageTataRekening.getItemExpress("aud/get-all-aud").then((data) => {
                    for (let i = 0; i < data.data.length; i++) {
                        data.data[i].no = i + 1;
                    }
                    $scope.dataGrid = new kendo.data.DataSource({
                        data: data.data,
                        pageSize: 10
                    })

                })
            }

            init();

            $scope.tambahUserAUD = () => {
                let dataAuth = {
                    namaPegawai: $scope.item.pegawai.namaLengkap,
                    username: "-",
                    idPegawai: `${$scope.item.pegawai.id}`,
                    password: "admin"
                }
                manageTataRekening.postDataExpress('aud/save-aud', dataAuth).then((data) => {
                    init();
                });
            }
        }
    ]);

});