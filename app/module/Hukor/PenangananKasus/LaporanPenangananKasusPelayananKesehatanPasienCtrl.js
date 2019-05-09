define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('LaporanPenangananKasusPelayananKesehatanPasienCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper',
        '$document', 'R', '$state', 'ManageSarpras', '$q',
        function($rootScope, $scope, ModelItem, DateHelper, $document, r, $state, ManageSarpras, $q) {
            $scope.now = new Date();
            $scope.dataVOloaded = true;
            $scope.item = {};

$scope.dataTemp=[{
"noRegistrasi":"",
"tgl1":"",
"tgl2":"",
"DiagnosaMasuk":"",
"DiagnosaKeluar":"",
},{
"noRegistrasi":"",
"tgl1":"",
"tgl2":"",
"DiagnosaMasuk":"",
"DiagnosaKeluar":"",
},{
"noRegistrasi":"",
"tgl1":"",
"tgl2":"",
"DiagnosaMasuk":"",
"DiagnosaKeluar":"",
},{
"noRegistrasi":"",
"tgl1":"",
"tgl2":"",
"DiagnosaMasuk":"",
"DiagnosaKeluar":"",
}]

            
            $scope.cari = function() { 
                $scope.item.nama = "";
                $scope.item.umur =  "";
                $scope.item.pekerjaan = "";
                $q.all([
                    ManageSarpras.getOrderList("pasien/get/?noCm="+$scope.item.noCM, true), 
                    ManageSarpras.getOrderList("penanganan-kasus/get-no-evaluasi", true)
                    ]).then(function(data) {
                        $scope.item.nama = data[0].data.data.namaPasien
                        $scope.item.umur = data[0].data.data.umur
                        $scope.item.pekerjaan = data[0].data.data.pekerjaan.pekerjaan
                        $scope.item.noKasus = data[1].data.data.noSurat;
                        $scope.getDataTable1_1 = new kendo.data.DataSource({
                            pageSize: 10,
                            data: $scope.dataTemp, 
                            model: {
                                fields: {
                                    status: {type: "boolean", defaultValue: false}
                                }
                            }
                        })
                    }); 
            }

            $scope.redirect = function() {
                window.location = "#/DaftarLaporanPenangananKasusPelayananKesehatanPasien";
            }



            $scope.mainGridOptions = {
                pageable: true,
                scrollable: false,
                shortable: true,
                columns: [
                {
                    "field": "status",
                    "title": "Pilih",
                    "width": "20px",
                    "template": '<input type="checkbox" #= status ? "checked=checked" : "" # ></input>'
                },
                {
                    "field": "noRegistrasi",
                    "title": "No.Registrasi",
                    "width": "120px"
                }, {
                    "field": "tgl1",
                    "title": "Tanggal Masuk",
                    "width": "70px",
                }, {
                    "field": "tgl2",
                    "title": "Tanggal Keluar",
                    "width": "70px"
                }, {
                    "field": "DiagnosaMasuk",
                    "title": "Diagnosa Masuk",
                    "width": "200px"
                }, {
                    "field": "DiagnosaKeluar",
                    "title": "Diagnosa Keluar",
                    "width": "200px"
                }  
                ]
            }; 

        }
    ]);
});
