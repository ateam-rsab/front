define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('TenagaPengajarCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'ManagePhp',
        function($rootScope, $scope, ModelItem, $state, managePhp) {
            $scope.item = {};
            // $scope.pegawai = {};
            $scope.item.id = '';
            managePhp.getData("pendidikan/get-cbo-tenagapengajar").then(function(dat){
                $scope.listPegawai = dat.data.dataPegawai;
                $scope.listProgram = dat.data.dataProgramStudi;
            });
            var init = function () {
                managePhp.getData("pendidikan/get-daftar-tenagapengajar?nipOrNama=").then(function(dat){
                    $scope.dataMaster = dat.data.data;
                    $scope.dataMaster.forEach(function (data) {
                        data.ttl = data.tempatLahir +", "+data.tglLahir
                    })
                    $scope.dataGrid = new kendo.data.DataSource({
                        pageSize: 10,
                        data: $scope.dataMaster
                    });
                });
            }
            init()
            $scope.columnGrid = {
                // toolbar: [
                //  "excel",
                    
                //  ],
                //  excel: {
                //      fileName: "DaftarRegistrasiPasien.xlsx",
                //      allPages: true,
                //  },
                //  excelExport: function(e){
                //      var sheet = e.workbook.sheets[0];
                //      sheet.frozenRows = 2;
                //      sheet.mergedCells = ["A1:M1"];
                //      sheet.name = "Orders";

                //      var myHeaders = [{
                //          value:"Daftar Registrasi Pasien",
                //          fontSize: 20,
                //          textAlign: "center",
                //          background:"#ffffff",
       //                   // color:"#ffffff"
       //               }];

       //               sheet.rows.splice(0, 0, { cells: myHeaders, type: "header", height: 70});
       //           },
                selectable: 'row',
                pageable: true,
                columns:
                [
                    // {
                    //     "field": "nip",
                    //     "title": "Nip",
                    //     "width": 100
                    // },
                    {
                        "field": "namalengkap",
                        "title": "Nama Lengkap",
                        "width": 150
                    },
                    // {
                    //     "field": "jeniskelamin",
                    //     "title": "Jenis Kelamin",
                    //     "width": 100
                    // },
                    // {
                    //     "field": "agama",
                    //     "title": "Agama",
                    //     "width": 100
                    // },
                    {
                        "field": "nohandphone",
                        "title": "No HP",
                        "width": 120
                    },
                    // {
                    //     "field": "tempatlahir",
                    //     "title": "Tempat/Tgl Lahir",
                    //     "width": 200
                    // },
                    // {
                    //     "field": "alamat",
                    //     "title": "Alamat",
                    //     "width": 200
                    // },
                    // {
                    //     "field": "namajabatan",
                    //     "title": "Jabatan",
                    //     "width": 150
                    // },
                    // {
                    //     "field": "masajabatan",
                    //     "title": "Masa Kerja Jabatan",
                    //     "width": 150
                    // },
                    // {
                    //     "field": "namaruangan",
                    //     "title": "Unit Kerja",
                    //     "width": 200
                    // },
                    {
                        "field": "fakultas",
                        "title": "Program Yang Diajarkan",
                        "width": 170
                    }
                ]
            };

            $scope.getDetail =  function() {
                managePhp.getData("pendidikan/get-detail-tenagapengajar?id=" + $scope.item.pegawai.id).then(function(dat){
                    // $scope.item = dat.data.data[0]
                    $scope.item.pegawai = {'id':dat.data.data[0].id,'namalengkap':dat.data.data[0].namalengkap}
                    $scope.item.jeniskelamin = dat.data.data[0].jeniskelamin
                    $scope.item.agama = dat.data.data[0].agama
                    $scope.item.nohandphone = dat.data.data[0].nohandphone
                    $scope.item.tempatlahir = dat.data.data[0].tempatlahir
                    $scope.item.alamat = dat.data.data[0].alamat
                    $scope.item.namajabatan = dat.data.data[0].namajabatan
                    $scope.item.namaruangan = dat.data.data[0].namaruangan
                });
            };

            $scope.klikGrid = function(dataSelected){
                $scope.item.pegawai = {'id':dataSelected.pegawaifk,'namalengkap':dataSelected.namalengkap}
                managePhp.getData("pendidikan/get-detail-tenagapengajar?id=" + $scope.item.pegawai.id).then(function(dat){
                    // $scope.item = dat.data.data[0]
                    $scope.item.pegawai = {'id':dat.data.data[0].id,'namalengkap':dat.data.data[0].namalengkap}
                    $scope.item.jeniskelamin = dat.data.data[0].jeniskelamin
                    $scope.item.agama = dat.data.data[0].agama
                    $scope.item.nohandphone = dat.data.data[0].nohandphone
                    $scope.item.tempatlahir = dat.data.data[0].tempatlahir
                    $scope.item.alamat = dat.data.data[0].alamat
                    $scope.item.namajabatan = dat.data.data[0].namajabatan
                    $scope.item.namaruangan = dat.data.data[0].namaruangan
                    $scope.item.id = dat.data.data[0].id
                });
                $scope.item.program = {'id':dataSelected.id,'fakultas':dataSelected.fakultas}
            }
            $scope.simpan = function () {
                var listRawRequired = [
                "item.pegawai|k-ng-model|Pegawai",
                "item.program|k-ng-model|Program Studi"
                ];

                var isValid = ModelItem.setValidation($scope, listRawRequired);
                if(isValid.status){
                    var tempData = {
                        "norec":$scope.item.id,
                        "fakultasfk":$scope.item.program.id,
                        "pegawaifk":$scope.item.pegawai.id,
                        "namaruangan":$scope.item.namaruangan
                    }
                    managePhp.postData2("pendidikan/save-tenagapengajar",tempData).then(function(e) {
                        $scope.item = {};
                        init();
                    });
                } else {
                    ModelItem.showMessages(isValid.messages);
                }
                
            }
            $scope.batal = function () {
                $scope.item = {};
                $scope.item.id = '';
            }


        }
        ]);
});