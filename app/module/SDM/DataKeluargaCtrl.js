define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DataKeluargaCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', 'ManageSdm', 'ManageSdmNew', '$state', 'DateHelper',
        function($q, $rootScope, $scope, ModelItem, ManageSdm, ManageSdmNew, $state, dateHelper) {
            //Ambil parameter pegawai apabila ada
            $scope.pegawai = {};
            $scope.item = {};
            $scope.dataVOloaded = true;

            $scope.gridKeluarga = new kendo.data.DataSource({
                data:[],
                pageSize: 10
            });

            // ManageSdm.getOrderList("service/list-generic/?view=HubunganKeluarga&select=id,hubunganKeluarga", true).then(function(dat) {
            //     $scope.ListHubunganKeluarga = dat.data;
            // });

            // ManageSdm.getOrderList("service/list-generic/?view=StatusPerkawinanPegawai&select=id,statusPerkawinan", true).then(function(dat) {
            //     $scope.ListStatusKawin = dat.data;

            // });

            // ManageSdm.getOrderList("service/list-generic/?view=Pekerjaan&select=id,pekerjaan", true).then(function(dat) {
            //     $scope.ListPekerjaan = dat.data;
            //     //debugger;
            // });

            // ManageSdm.getOrderList("service/list-generic/?view=Tanggungan&select=id,name", true).then(function(dat) {
            //     $scope.ListTanggungan = dat.data;
            //     //debugger;
            // });
            $q.all([
                ManageSdm.getOrderList("service/list-generic/?view=HubunganKeluarga&select=id,hubunganKeluarga", true),
                ManageSdm.getOrderList("service/list-generic/?view=StatusPerkawinanPegawai&select=id,statusPerkawinan", true),
                ManageSdm.getOrderList("service/list-generic/?view=Pekerjaan&select=id,pekerjaan", true),
                ManageSdm.getOrderList("service/list-generic/?view=Tanggungan&select=id,name", true)
            ]).then(function(res){
                $scope.ListHubunganKeluarga = res[0].data;
                $scope.ListStatusKawin = res[1].data;
                $scope.ListPekerjaan = res[2].data;
                $scope.ListTanggungan = res[3].data;
            }, (error) => {
                throw(error);
            }).then(function(){
                loadFirst();
            })

            function loadFirst() {
                if ($state.params.idPegawai !== "") {
                    //Ambil data Pegawai dari database
                    ManageSdmNew.getListData("pegawai/get-pegawai-by-customs/" + $state.params.idPegawai).then(function(data) {
                        $scope.pegawai = data.data.data;
                        // $scope.item.nip = data.data.data.nipPns;
                        // $scope.item.namaPegawai = data.data.data.namaLengkap;

                    })
                } else {
                    $scope.item = {};
                }
                init();
            }

            $scope.kl = function(current) {
                // ManageSdm.getOrderList("keluarga-pegawai/cari-alamat-id/" + current.id).then(function(data) {
                ManageSdmNew.getListData("keluarga-pegawai/cari-alamat-id/" + current.id).then(function(data) {
                    $scope.item = data.data.data;
                    // $scope.item.namaLengkap = data.data.data.namaLengkap;
                    // $scope.item.hubunganKeluarga = data.data.data.hubunganKeluarga;
                    $scope.item.tglLahir = moment(data.data.data.tglLahir).format('DD-MM-YYYY'); //dateHelper.formatDate(data.data.data.tglLahir, 'YYYY-MM-DD');
                    // $scope.item.pekerjaan = data.data.data.pekerjaan;
                    // $scope.item.statusPerkawinanPegawai = data.data.data.statusPerkawinanPegawai;
                    // $scope.item.noSuratKuliah = data.data.data.noSuratKuliah;
                    $scope.item.tglsuratKuliah = moment(data.data.data.tglsuratKuliah).format('DD-MM-YYYY'); // dateHelper.formatDate(data.data.data.tglsuratKuliah, 'YYYY-MM-DD');
                    // $scope.item.namaAyah = data.data.data.namaAyah;
                    // $scope.item.namaIbu = data.data.data.namaIbu;
                    // $scope.item.nipIstriSuami = data.data.data.nipIstriSuami;
                    // $scope.item.alamat = data.data.data.alamat;
                    // $scope.item.keterangan = data.data.data.keterangan;
                    // $scope.item.id = data.data.data.id;
                    $scope.ListHubunganKeluarga.forEach(function(itm){
                        if(itm.id === data.data.data.objectKdHubunganFk){
                            $scope.item.hubunganKeluarga = itm;
                        }
                    });
                    $scope.ListPekerjaan.forEach(function(itm){
                        if(itm.id === data.data.data.pekerjaanId){
                            $scope.item.pekerjaan = itm;
                        }
                    });
                    $scope.ListStatusKawin.forEach(function(itm){
                        if(itm.id === data.data.data.statusPerkawinanPegawaiId){
                            $scope.item.statusPerkawinanPegawai = itm;
                        }
                    });
                    $scope.ListTanggungan.forEach(function(itm){
                        if(itm.id === data.data.data.statusPerkawinanPegawaiId){
                            $scope.item.statusTanggungan = itm;
                        }
                    });
                });
            };

            function init() {
                if ($state.params.idPegawai !== "") {
                    //Ambil data Pegawai dari database
                    // ManageSdm.getOrderList("pegawai/get-keluarga-pegawai?id=" + $state.params.idPegawai).then(function(data) {
                    ManageSdmNew.getListData("pegawai/get-keluarga-pegawai?id=" + $state.params.idPegawai).then(function(data) {
                        // $scope.pegawai=data.data.data;
                        for (var x = 0; x < data.data.data.keluargaPegawai.length; x++) {
                            var element = data.data.data.keluargaPegawai[x];
                            element.no = (x + 1);
                            element.tglLahir = moment(data.data.data.keluargaPegawai[x].tglLahir).format('DD-MM-YYYY');
                            element.tglsuratKuliah = moment(data.data.data.keluargaPegawai[x].tglsuratKuliah).format('DD-MM-YYYY'); // dateHelper.formatDate(data.data.data.keluargaPegawai[x].tglLahir, "DD-MM-YYYY");
                        }
                        $scope.gridKeluarga.data(data.data.data.keluargaPegawai);
                    })
                } 
                // else {
                //     $scope.gridKeluarga = new kendo.data.DataSource({
                //         pageSize: 10,
                //         total: 0,
                //         data: []
                //     });
                // }
            }
            /*ModelItem.get("Kesling/LaporanUjiHasil").then(function(data) {
            	$scope.listItems = data;
            	//$scope.now = new Date();
            	
            }, function errorCallBack(err) {});*/


            $scope.opsiGridKeluarga = [{
                    "field": "no",
                    "title": "No",
                    "width": "5%"
                },
                {
                    "field": "namaLengkap",
                    "title": "Nama",
                    "width": "20%"
                },
                {
                    "field": "hubunganKeluarga",
                    "title": "Status",
                    "width": "20%"
                },
                {
                    "field": "tanggungan",
                    "title": "Tertanggung",
                    "width": "20%"
                },
                {
                    "field": "tglLahir",
                    "title": "Tanggal Lahir",
                    "width": "20%"
                },
                {
                    "field": "namaPekerjaan",
                    "title": "Pekerjaan",
                    "width": "20%"
                }
            ];


            $scope.Save = function() {
                $scope.item.pegawai = $scope.pegawai;
                var element = {};

                element.pegawai = { "id": $state.params.idPegawai };
                element.hubunganKeluarga = $scope.item.hubunganKeluarga;
                element.namaLengkap = $scope.item.namaLengkap;
                if (_.contains($scope.item.tglLahir, '-')) {

                    element.tglLahir = new Date(formatDate($scope.item.tglLahir));
                } else {
                    element.tglLahir = $scope.item.tglLahir;
                }

                element.pekerjaan = $scope.item.pekerjaan;
                element.statusPerkawinanPegawai = $scope.item.statusPerkawinanPegawai;
                element.statusTanggungan = $scope.item.statusTanggungan;
                element.noSuratKuliah = $scope.item.noSuratKuliah;
                if (_.contains($scope.item.tglsuratKuliah, '-')) {

                    element.tglsuratKuliah = new Date(formatDate($scope.item.tglsuratKuliah));
                } else {
                    element.tglsuratKuliah = $scope.item.tglsuratKuliah;
                }

                element.namaAyah = $scope.item.namaAyah;
                element.namaIbu = $scope.item.namaIbu;
                element.NipIstriSuami = $scope.item.NipIstriSuami;
                element.alamat = $scope.item.alamat;
                element.keterangan = $scope.item.keterangan;
                element.id = $scope.item.id;
                //delete $scope.item["nomorContoh","contohDari","tglPenerimaanContoh","tglPengujianContoh","jenisContoh"];
                // ManageSdm.saveKeluargaPegawai(element).then(function(e) {
                ManageSdmNew.saveData(element, "keluarga-pegawai/save-keluarga-pegawai").then(function(e) {
                    delete $scope.item;
                    $scope.now = new Date();
                    $scope.item = {
                        tglLahir: $scope.now,
                        tglsuratKuliah: $scope.now,
                    };
                    loadFirst();

                    /*$state.go('dashboardpasien.TandaVital', {
                     noCM: $scope.noCM
                     });*/
                });
            };
            //Format Date
            function formatDate(tanggal) {
                var res = tanggal.split("-");
                return res[1] + "-" + res[0] + "-" + res[2];
            }

        }
    ]);
});