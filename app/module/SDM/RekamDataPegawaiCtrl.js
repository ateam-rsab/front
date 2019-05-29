define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('RekamDataPegawaiCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'ManageSdm', 'ManageSdmNew', 'DateHelper', 'FindPegawai', 'FindSdm', '$timeout', 'ManageSarprasPhp', 'ModelItemAkuntansi', '$mdDialog',
        function($q, $rootScope, $scope, ModelItem, $state, ManageSdm, ManageSdmNew, dateHelper, FindPegawai, FindSdm, $timeout, manageSarprasPhp, modelItemAkuntansi, $mdDialog) {
            $scope.isSimpan = true;
            $scope.isAtasan = false;
            $scope.isRekanan = false;
            $scope.isEdit = false;
            $scope.dataVOloaded = true;
            // $scope.item.detailKategoryPegawai = '';
            $scope.listOfGolonganRhesus = [
                {name: '+', id:1},
                {name: '-', id:2}
            ]
            $scope.init = function () {
                $q.all([
                    ManageSdmNew.getListData("sdm/get-riwayat-jabatan?idPegawai="+$state.params.idPegawai+"&idJenisJabatan=3"),
                    manageSarprasPhp.getDataTableTransaksi("historypegawai/get-data-riwayat-pendidikan-pgw?id=" + $state.params.idPegawai),
                    ManageSdm.getOrderList("service/list-generic/?view=Agama&select=*", true),
                    ManageSdm.getOrderList("service/list-generic/?view=PosisiLamaran&select=*", true),
                    ManageSdm.getOrderList("service/list-generic/?view=StatusPerkawinanPegawai&select=id,statusPerkawinan&criteria=statusEnabled&values=true", true),
                    ManageSdm.getOrderList("service/list-generic/?view=KategoryPegawai&select=id,kategoryPegawai&criteria=statusEnabled&values=true", true),
                    ManageSdm.getOrderList("service/list-generic/?view=JenisKelamin&select=id,jenisKelamin&criteria=statusEnabled&values=true", true),
                    ManageSdm.getOrderList("service/list-generic/?view=Eselon&select=id,eselon&criteria=statusEnabled&values=true", true),
                    ManageSdmNew.getListData("sdm/get-all-golongan"),
                    ManageSdm.getOrderList("service/list-generic/?view=KelompokShift&select=id,name&criteria=statusEnabled&values=true", true),
                    ManageSdmNew.getListData("sdm/get-all-unit-kerja"),
                    ManageSdmNew.getListData("sdm/get-all-sub-unit-kerja"),
                    ManageSdmNew.getListData("sdm/get-all-kedudukan"),
                    ManageSdmNew.getListData("sdm/get-detail-kelompok-jabatan"),
                    ManageSdmNew.getListData("sdm/get-riwayat-jabatan?idPegawai=" + $state.params.idPegawai + "&idJenisJabatan=1"),
                    ManageSdm.getOrderList("service/list-generic/?view=Pegawai&select=id,namaLengkap&criteria=statusEnabled&values=true", true),
                    ManageSdm.getOrderList("service/list-generic/?view=Ruangan&select=id,namaRuangan&criteria=statusEnabled&values=true", true),
                    ManageSdm.getOrderList("service/list-generic/?view=Jabatan&select=id,namaJabatan&criteria=statusEnabled&values=true", true),
                    ManageSdm.getOrderList("service/list-generic/?view=JenisPegawai&select=id,jenisPegawai&criteria=statusEnabled&values=true", true),
                    ManageSdm.getOrderList("service/list-generic/?view=NilaiKelompokJabatan&select=id,detailKelompokJabatan&criteria=statusEnabled&values=true", true),
                    ManageSdm.getOrderList("service/list-generic/?view=KualifikasiJurusan&select=id,kualifikasiJurusan&criteria=statusEnabled&values=true", true),
                    ManageSdm.getOrderList("service/list-generic/?view=Pangkat&select=id,namaPangkat&criteria=statusEnabled&values=true", true),
                    ManageSdm.getOrderList("service/list-generic/?view=Pendidikan&select=id,namaPendidikan&criteria=statusEnabled&values=true", true),
                    ManageSdm.getOrderList("service/list-generic/?view=PenghasilanTidakKenaPajak&select=id,deskripsi&criteria=statusEnabled&values=true", true),
                    ManageSdm.getOrderList("service/list-generic/?view=Suku&select=id,suku&criteria=statusEnabled&values=true", true),
                    ManageSdm.getOrderList("service/list-generic/?view=TypePegawai&select=id,typePegawai&criteria=statusEnabled&values=true", true),
                    ManageSdm.getOrderList("service/list-generic/?view=GolonganDarah&select=id,golonganDarah&criteria=statusEnabled&values=true", true),
                    ManageSdm.getOrderList("service/list-generic/?view=Rekanan&select=id,namaRekanan&criteria=statusEnabled&values=true", true),
                    ManageSdm.getOrderList("service/list-generic/?view=JenisJabatan&select=id,jenisJabatan&criteria=statusEnabled&values=true", true),
                    ManageSdm.getOrderList("service/list-generic/?view=Negara&select=id,namaNegara&criteria=statusEnabled&values=true", true),
                    ManageSdm.getOrderList("service/list-generic/?view=SatuanKerja&select=id,satuanKerja&criteria=statusEnabled&values=true", true),
                    // ManageSdm.getOrderList("service/list-generic/?view=Jabatan&select=id,namaJabatan&criteria=statusEnabled&values=true", true),
                    // ManageSdm.getOrderList("service/list-generic/?view=Jabatan&select=id,namaJabatan&criteria=statusEnabled&values=true", true),
                    // ManageSdm.getOrderList("service/list-generic/?view=Jabatan&select=id,namaJabatan&criteria=statusEnabled&values=true", true),
                    // ManageSdm.getOrderList("service/list-generic/?view=Jabatan&select=id,namaJabatan&criteria=statusEnabled&values=true", true),
                    // ManageSdm.getOrderList("service/list-generic/?view=Jabatan&select=id,namaJabatan&criteria=statusEnabled&values=true", true),
                ]).then(function(res) {
                        if(res[0].data){
                            $scope.ListJabatanInternal = res[0].data.data.dataJabatanInternal;
                            $scope.ListJabatanInternalPop = res[0].data.data.dataJabatanInternal;
                        }
                        if(res[14].data.data.dataJabatanFungsional != null) {
                            $scope.jabatanFungsional = {
                                namaJabatan: res[14].data.data.dataJabatanFungsional[0].namaJabatan,
                                id: res[14].data.data.dataJabatanFungsional[0].id
                            };
                        }
                        $scope.historyListPedidikan = res[1].data;
                        $scope.ListAgama = res[2].data;
                        $scope.ListPosisiLamaran = res[3].data;
                        $scope.ListStatusKawin = res[4].data;
                        $scope.ListKategoriPegawai = res[5].data;
                        $scope.ListJenisKelamin = res[6].data;
                        $scope.ListEselon = res[7].data;
                        $scope.ListGolonganPegawai = res[8].data;
                        $scope.ListPolaKerja = res[9].data;
                        $scope.ListUnitKerja = res[10].data.data;
                        $scope.ListUnitKerjaPop = res[10].data.data;
                        $scope.ListSubUnitKerja = res[11].data.data;
                        $scope.ListSubUnitKerjaPop = res[11].data.data;
                        $scope.ListKedudukanPegawai = res[12].data.data;
                        $scope.ListDetilKelompokJabatan = res[13].data.data;
                        $scope.ListRuangan = res[16].data;
                        $scope.listPegawai = res[15].data;
                        $scope.listPegawaiRiwayat = res[15].data;
                        $scope.ListJabatan = res[17].data;
                        $scope.ListJenisPegawai = res[18].data;
                        $scope.ListDetailKelompokJabatan = res[19].data;
                        $scope.ListKualifikasiJurusan = res[20].data;
                        $scope.ListPangkat = res[21].data;
                        $scope.ListPendidikan = res[22].data;
                        $scope.ListPTKP = res[23].data;
                        $scope.ListSuku = res[24].data;
                        $scope.ListTypePegawai = res[25].data;
                        $scope.ListGolDarah = res[26].data;
                        $scope.ListRekanan = res[27].data;
                        $scope.listJenisJabatan = res[28].data;
                        $scope.listOfNegara = res[29].data;
                        $scope.listOfSatuanKerja = res[30].data;
                        getDataPegawai($state.params.idPegawai);
                        console.log(res);
                    });
                if($state.params.idPegawai === "") {
                    $scope.isSimpan = false;
                    
                } else {
                    $scope.isAtasan = true;
                }
            };

            if($state.params.idPegawai) {
                ManageSdmNew.getListData('sdm/get-pegawai-atasan/' + $state.params.idPegawai).then(function (res) {
                    if(res.data.data.length > 0) {
                        $scope.atasanPejabatPenilai = {
                            id:res.data.data[0].idAtasanPejabatPenilai,
                            namaLengkap:res.data.data[0].namaAtasanPejabatPenilai,
                        };
                        
                        $scope.atasanLangsung = {
                            id:res.data.data[0].idAtasanLangsung,
                            namaLengkap:res.data.data[0].namaAtasanLangsung,
                        };
                    }
                    // $scope.item.atasanLangsung = res.data[0].namaAtasanLangsung;
                });
            }

            $scope.init();
            $scope.onChangeTab = function (key) {
                if(key == 1) {
                    console.log('tab 1');
                    if($state.params.idPegawai) {
                        initRekamDataPegawai();
                    }
                    $scope.isRouteLoading = false;
                    $scope.isRiwayat = true;
                } else if(key == 2) {
                    console.log('tab 2');
                    initDataKeluarga();
                } else if(key == 3 ) {
                    console.log('tab 3');
                    $scope.initRiwayatJabatan();
                } else if(key == 4) {
                    console.log('tab 4');
                    $scope.initRiwayatPendidikan();
                } else if(key == 5 ) {
                    $scope.isRiwayat = false;
                } else if(key == 6) {
                    if($scope.item) {
                        if($scope.item.kategoryPegawai != null || $scope.item.kategoryPegawai != undefined) {
                            $scope.getDetailKategoriPegawai($scope.item.kategoryPegawai);
                        } 
                    }
                    $scope.isRiwayat = true;
                }
            };

            // #region Rekam Data Pegawai
            var initRekamDataPegawai = function () {
                $scope.listIdKedudukan = [3, 4, 5, 24, 25]; // input kedudukan pegawai yang dijadikan parameter untuk set statusEnabled pegawai = false
                $scope.isRouteLoading = true;
                
                $scope.gridJabatanInternal = {
                    toolbar: [{
                        name: "create",
                        text: "Buat Jabatan Internal Baru",
                        template: '<button ng-click="createNewJabatanInternal()" class="k-button k-button-icontext k-grid-upload" href="\\#"><span class="k-icon k-i-plus"></span>Buat Riwayat</button>'
                    }],
                    pageable: true,
                    scrollable: true,
                    columns: [
                        // { field: "statusEnabled", width: "120px", editor: customBoolEditor },
                        {
                            field: "namaJabatan",
                            title: "<h3>Jabatan</h3>",width:"250px" 
                        }, // editor: jbtnDropDownEditor, template: "#= jabatanInternal.namaJabatan #"},
                        {
                            field: "nameUnitKerjaPegawai",
                            title: "<h3>Unit Kerja</h3>",width:"150px" 
                        }, // editor: unitDropDownEditor, template: "#= unitKerja.name #"},
                        {
                            field: "nameSubUnitKerjaPegawai",
                            title: "<h3>Sub Unit Kerja</h3>",width:"150px" 
                        }, // editor: subUnitDropDownEditor, template: "#= subUnitKerja.name #"},
                        {
                            field: "isCanCreateJadwal",
                            title: "<h3>Membuat Jadwal</h3>", width:"80px",
                            template:"#if(isCanCreateJadwal) { #Ya# } else { #Tidak# } #",
                            attributes: {
                                style: "text-align:center;valign=middle"
                            },
                        },
                        {
                            field: "isPrimary",
                            title: "<h3>Jabatan Utama</h3>", width:"50px",
                            template:"#if(isPrimary) { #Ya# } else { #Tidak# } #",
                            attributes: {
                                style: "text-align:center;valign=middle"
                            },
                        },
                        {
                            field: "isMonitoring",
                            title: "<h3>Monitoring</h3>", width:"80px",
                            template:"#if(isMonitoring) { #Ya# } else { #Tidak# } #",
                            attributes: {
                                style: "text-align:center;valign=middle"
                            },
                        },
                        {
                            command: [{
                                text: "Edit",
                                width: "40px",
                                align: "center",
                                attributes: {
                                    align: "center"
                                },
                                click: changeRow,
                                imageClass: "k-icon k-i-pencil"
                            }, {
                                text: "Hapus",
                                width: "40px",
                                align: "center",
                                attributes: {
                                    align: "center"
                                },
                                click: hapusDataJabatanInternal,
                                imageClass: "k-icon k-delete"
                            }],
                            title: "",
                            width: "130px",
                            attributes: {
                                style: "text-align:center;valign=middle"
                            },
                        }],
                };
            };

            $scope.getDataSubUnitKerjaById = function(data) {
                ManageSdmNew.getListData('sdm/get-sub-unit-kerja-by-unit-kerja?idUnitKerjaPegawai=' + data).then(res => {
                    $scope.ListSubUnitKerjaById = res.data;
                })
            }

            function getDataPegawai(id) {
                var now = new Date();
                if ($state.params.idPegawai) { // Check parameter noRec pegawai in the url
                    $scope.isMenuDataPegawai = true; // show tombol hapus
                    $scope.isRouteLoading = true; // show loading icon
                    $q.all([ManageSdmNew.getListData("pegawai/get-pegawai-by-customs/" + id)]).then(function(res) {
                        if (res[0].statResponse) {
                            // var dataLoad = res[0].data.data;
                            // $scope.item.tglKeluar = res[0].data.data.tglPensiun
                            // console.log(dataLoad);
                            console.log(res[0].data.data);
                            $scope.item = res[0].data.data;
                            $scope.item.tglKeluar = res[0].data.data.tglPensiun
                            $scope.disableSip = true;
                            $scope.disableStr = true;
                            if(dateHelper.toTimeStamp(res[0].data.data.tglPensiun) === dateHelper.toTimeStamp(now) ) {
                                toastr.warning('Pegawai ini akan pensiun')
                            }
                            if(dateHelper.toTimeStamp(res[0].data.data.tglPensiun) < dateHelper.toTimeStamp(now) ) {
                                toastr.warning('Pegawai ini akan pensiun')
                            }
                            console.log($scope.item.tglLahir);
                            // if(res[0].data.data.noSip) {
                            //     $scope.isCheckedSip = true;
                            // }
                            // if(res[0].data.data.noStr) {
                            //     $scope.isCheckedStr = true;
                            // }
                            // $scope.item.kewarganegaraan = res[0].data.data.
                            // if(res[0].data.data.noSip) {
                            //     $scope.disableSip = true;
                            // } else {
                            //         $scope.disableSip = false;
                            // }
                            // if(res[0].data.data.noStr){
                            //     $scope.disableStr = true;
                            // } else {
                            //     $scope.disableStr = false;
                            // }
                            if(res[0].data.data.ruangan != null) {
                                $scope.item.ruanganPegawai = {
                                    id: res[0].data.data.ruangan.id,
                                    namaRuangan: res[0].data.data.ruangan.namaRuangan
                                };
                            }
                            
                            $scope.detailKategoriPegawai = {
                                detailKategoryPegawai:res[0].data.data.detailKategoryPegawai.detailKategoryPegawai,
                                id:res[0].data.data.detailKategoryPegawai.id,
                            };

                            // if ($scope.item.noSip) {
                            //     $scope.disableSip = true;
                            // } else {
                            //     $scope.disableSip = false;
                            // }
                            // if ($scope.item.noStr) {
                            //     $scope.disableStr = true;
                            // } else {
                            //     $scope.disableStr = false;
                            // }
                            for (var key in $scope.item) {
                                if ($scope.item.hasOwnProperty(key)) {
                                    if (key.indexOf("tgl") == 0) {
                                        // changed the date format to 'dd-MM-yyyy'
                                        $scope.item[key] = dateHelper.formatDate($scope.item[key], 'DD-MM-YYYY');
                                    }
                                }
                            }
                            getModel($scope.item); // temp model to check if user are changed data in model
                            $scope.isRouteLoading = false;
                        }
                    }, function(error) {
                        $scope.isRouteLoading = false;
                    });                    
                } else {
                     $scope.now = new Date();
                     $scope.item = {};
                     $scope.isRouteLoading = false;
                     $scope.disableSip = true;
                     $scope.disableStr = true;
                }
                    $scope.loadDataGridUnitKerja();
                    $scope.isRouteLoading = false;
            }

            $scope.loadDataGridUnitKerja = function() {
                var grid = $("#grid").data("kendoGrid");

                if ($state.params.idPegawai) {
                    ManageSdmNew.getListData("map-pegawai-jabatan-unitkerja/get-map-by-pegawai/" + $state.params.idPegawai).then(function(data) {
                        $scope.dataSource = new kendo.data.DataSource({
                            data: data.data.data.data,
                            pageSize: 5
                        });
                        $scope.isRouteLoading = false;
                    });
                }
            };

            function hapusDataJabatanInternal(e) {
                e.preventDefault();
                if(!$scope.isEdit) {
                    toastr.warning('Tidak bisa menghapus jabatan');
                    return
                }
                var tr = $(e.target).closest("tr");
                var dataItem = this.dataItem(tr);
                var dataSave = [{
                    "id":dataItem.id,
                    "pegawai": {
                        "id": $state.params.idPegawai
                    },
                    "jabatan": {
                        "id": dataItem.jabatanId
                    },
                    "statusEnabled": false,
                    "unitKerjaPegawai": {
                        "id": dataItem.unitKerjaPegawaiId
                    },
                    "subUnitKerjaPegawai": {
                        "id": dataItem.subUnitKerjaPegawaiId
                    },
                    "isCanCreateJadwal": dataItem.isCanCreateJadwal,
                    "isPrimary": dataItem.isPrimary,
                    "isMonitoring": dataItem.isMonitoring
                }]
                var confirm = $mdDialog.confirm()
                    .title('Apakah anda yakin akan menghapus data Jabatan Internal?')
                    .textContent(`Anda akan menghapus data Jabatan Internal`)
                    .ariaLabel('Lucky day')
                    .targetEvent(e)
                    .ok('Ya')
                    .cancel('Tidak');
                $mdDialog.show(confirm).then(function() {
                    ManageSdmNew.saveData(dataSave, "map-pegawai-jabatan-unitkerja/save-map").then(function(res) {
                        $scope.isRouteLoading = true;
                        $scope.popUpJabatan.close();
                        e.preventDefault();
                        $scope.loadDataGridUnitKerja();
                        toastr.success('Data Berhasil Dihapus');
                        console.warn('Data Berhasil Dihapus');
                    });
                    console.warn('Masuk sini pak eko');
                }, function() {
                    console.error('Tidak jadi hapus');
                });
                
            }

            $scope.simpanJabatanInternal = function() {
                var dataSave = [{
                    "id":$scope.idGridInternalJabatan,
                    "pegawai": {
                        "id": $state.params.idPegawai
                    },
                    "jabatan": {
                        "id": $scope.item.jabatanInternalPop.id
                    },
                    "statusEnabled": true,
                    "unitKerjaPegawai": {
                        "id": $scope.item.unitKerjaPop.id
                    },
                    "subUnitKerjaPegawai": {
                        "id": $scope.item.subUnitKerjaPop.id
                    },
                    "isCanCreateJadwal": $scope.item.isCanCreateJadwal,
                    "isPrimary": $scope.item.isPrimary,
                    "isMonitoring": $scope.item.isMonitoring ? true : false
                }]
                ManageSdmNew.saveData(dataSave, "map-pegawai-jabatan-unitkerja/save-map").then(function(res) {
                    $scope.isRouteLoading = true;
                    $scope.idGridInternalJabatan = null;
                    $scope.popUpJabatan.close();
                    $scope.loadDataGridUnitKerja();
                    toastr.success('Data Berhasil Disimpan');
                    $scope.batal();
                });
            }

            // function customClick(e) {
            //     e.preventDefault();
            //     var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
            //     dataItem.statusEnabled = !dataItem.statusEnabled;
            //     // $scope.simpanJabatan(dataItem);
            // }

            function changeRow(e) {
                e.preventDefault();
                if(!$scope.isEdit) {
                    toastr.warning('Tidak bisa merubah jabatan');
                    return
                }
                clearPop();
                
                var tr = $(e.target).closest("tr");
                var dataItem = this.dataItem(tr);
                $scope.getDataSubUnitKerjaById(dataItem.unitKerjaPegawaiId)
                $scope.idGridInternalJabatan = dataItem.id;
                $scope.item.unitKerjaPop = {
                    id: dataItem.unitKerjaPegawaiId,
                    name: dataItem.nameUnitKerjaPegawai
                };
                // $scope.ubah();
                $scope.item.subUnitKerjaPop = {
                    id: dataItem.subUnitKerjaPegawaiId,
                    namaSubunitKerja: dataItem.nameSubUnitKerjaPegawai
                };                 
                $scope.item.jabatanInternalPop = {
                    id: dataItem.jabatanId,
                    namaJabatan: dataItem.namaJabatan
                };
                $scope.vals= dataItem.isPrimary;
                $scope.vals2= dataItem.isCanCreateJadwal;
                $scope.vals1 =dataItem.isMonitoring;
                $scope.item.isPrimary= dataItem.isPrimary;
                $scope.item.isCanCreateJadwal= dataItem.isCanCreateJadwal;
                $scope.item.isMonitoring=dataItem.isMonitoring;
                $scope.changeCB();
                $scope.popUpJabatan.center().open();
            }

            function clearPop() {
                $scope.id = "";
                $scope.item.jabatanInternalPop = "";
                $scope.item.unitKerjaPop = "";
                $scope.item.subUnitKerjaPop = "";
                $scope.item.isCanCreateJadwal = false;
                $scope.item.isPrimary = false;
                $scope.item.isMonitorings = false;
                $scope.vals= false;
                $scope.vals2= false;
                $scope.vals1=false;
            }

            $scope.isCanCreateJadwal = function(data){
                if (data === true) {
                    $scope.item.isCanCreateJadwal = true;
                    $scope.vals2= true;                    
                }else{
                    $scope.item.isCanCreateJadwal = false;
                    $scope.vals2= false;
                }
            };
    
            $scope.isPrimary = function(data){
                if (data === true) {
                    $scope.item.isPrimary = true;
                    $scope.vals= true;                    
                }else{
                    $scope.item.isPrimary = false;
                    $scope.vals= false;
                }
            };
            
            $scope.isMonitoring = function(data){
                if (data === true) {
                    $scope.item.isMonitoring = true;
                    $scope.vals1= true;                    
                }else{
                    $scope.item.isMonitoring = false;
                    $scope.vals1= false;
                }
            };

            $scope.batal = function() {
                $scope.popUpJabatan.close();
            };
            
            function isDate(value) {
                return value instanceof Date;
            }

            $scope.$watch('atasanLangsung',function (newValue, oldValue) {
                // console.log();
                if ($scope.atasanLangsung) {
                    if(oldValue.namaLengkap === $scope.atasanLangsung.namaLengkap) {
                        $scope.isSimpanAtasanLangsung = true;
                    } else {
                        $scope.isSimpanAtasanLangsung = false;
                    }
                }
                
            });

            $scope.$watch('atasanPejabatPenilai', function (newValue, oldValue) {
                // console.log();
                if($scope.atasanPejabatPenilai) {
                    if(oldValue.namaLengkap === $scope.atasanPejabatPenilai.namaLengkap) {
                        $scope.isSimpanPejabatPenilai = true;
                    } else {
                        $scope.isSimpanPejabatPenilai = false;
                    }
                }
            });

            $scope.$watch('[item.jabatanFungsional.id, item.tglLahir]', function(newVal) {
                if (newVal[0] && newVal[1]) {
                    var tipeData = isDate(newVal[1]),
                    day, month, year, periode;
                    if (tipeData) {
                        day = newVal[1].getDate();
                        month = newVal[1].getMonth() + 1;
                        year = newVal[1].getFullYear();
                        if (month < 10) {
                            month = "0" + month;
                        }
                        if (day < 10) {
                            day = "0" + day;
                        }
                    } else {
                        day = newVal[1].substring(0, 2);
                        month = newVal[1].substring(3, 5);
                        year = newVal[1].substring(6, 10);
                    }
                    periode = year + "-" + month + "-" + day;
                    // FindPegawai.getPensiun(newVal[0], periode).then(function(res) {
                    ManageSdmNew.getListData("pegawai/get-tgl-pensiun/" + periode + "/" + newVal[0]).then(function(res) {
                        $scope.item.pensiun = res.data.data.usiaPensiun;
                        $scope.item.tglPensiun = dateHelper.formatDate(res.data.data.tglPensiun, 'DD-MM-YYYY');
                        if($scope.item.tglKeluar == null || $scope.item.tglKeluar == undefined) {
                            $scope.item.tglKeluar = $scope.item.tglPensiun
                        }
                        // getModel($scope.item);
                    })
                }
            });

            $scope.hapusPegawai = function() {
                $scope.confirmDialog.center().open();
            };

            $scope.lanjutHapus = function() {
                var idPegawai = $state.params.idPegawai;
                ManageSdmNew.deleteData("pegawai/non-aktif-pegawai-by-id/" + idPegawai + "/").then(function(res) {
                    if (res.status === 200) {
                        messageContainer.log('SUKSES');
                        $scope.confirmDialog.close();
                        $state.go('DataPegawai');
                    } else {
                        messageContainer.error('Something went wrong');
                    }
                });
                // ManageSdm.deletePegawai(idPegawai).then(function(res) {
                //     if (res.status === 200) {
                //         messageContainer.log('SUKSES');
                //         $scope.confirmDialog.close();
                //         $state.go('DataPegawai');
                //     } else {
                //         messageContainer.error('Something went wrong');
                //     }
                // });
            };

            $scope.getGradeJbtn = function(e) {
                if (!e.id) return;
                $scope.item.grade = e.grade;
            };
            
            $scope.toogleClick = function(ev) {
                var checked = ev.target.checked;
                var inputId = ev.currentTarget.id;
                if (inputId.indexOf("Sip") >= 0) {
                    $scope.disableSip = !checked;

                    // $scope.item.noSip = "";
                    // $scope.item.tglTerbitSip = null;
                    // $scope.item.tglBerakhirSip = null;
                } else if (inputId.indexOf("Str") >= 0) {
                    $scope.disableStr = !checked;

                    // $scope.item.noStr = "";
                    // $scope.item.tglTerbitStr = null;
                    // $scope.item.tglBerakhirStr = null;
                }
            };

            // $scope.$watch('item.kedudukan', function(newVal, oldVal) {
            //     if (!newVal) return;
            //     if (newVal == oldVal) return;
            //     if (newVal.id && $scope.listIdKedudukan) {
            //         if ($scope.listIdKedudukan.includes(newVal.id)) {
            //             $scope.item.statusEnabled = false;
            //             if (newVal.id == 4){
            //                 $scope.showTglMeninggal = true;
            //             }
            //             else{
            //                 $scope.showTglMeninggal = false;
            //             }

            //         } else {
            //             $scope.item.statusEnabled = true;
            //         }
            //     }
            // });

            function getDataChanged(newData) {
                var dataChanged = {},
                oldData = $scope.oldData;

                if (oldData) { // edit/update rekam data pegawai
                    for (var key in newData) {
                        if (oldData.hasOwnProperty(key)) {
                            if (key.indexOf("tgl") >= 0) newData[key] = dateHelper.formatDate(newData[key], 'DD-MM-YYYY');
                            if (newData[key] !== oldData[key]) {
                                dataChanged[key] = newData[key];
                            }
                        } else if (newData.hasOwnProperty(key)) {
                            dataChanged[key] = newData[key]
                        }
                    }
                } else { // rekam data baru
                    for (var key in newData) {
                        if (newData.hasOwnProperty(key)) {
                            dataChanged[key] = newData[key]
                        }
                    }
                }
                return dataChanged;
            }

            function getModel(myModel) {
                var oldData = {};
                for (var key in $scope.item) {
                    if ($scope.item.hasOwnProperty(key)) {
                        oldData[key] = $scope.item[key];
                    }
                }
                $scope.oldData = oldData;
                return myModel;
            }

            function removeRowJabatan(e){
                e.preventDefault();
                if(!$scope.isEdit) {
                    toastr.warning('Tidak bisa merubah jabatan');
                    return
                }
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                var dataDelete = {
                    jabatanTtd :{
                        id:dataItem.idJabatanTtd
                    },
                    jabatan :{
                        id:dataItem.idJabatan
                    },
                    pegawaiTtd : {
                        id:dataItem.idPgwTtd
                    },
                    pegawai : {
                        id:dataItem.idPgw
                    },
                    jenisJabatan : {
                        id:dataItem.idJenisJabatan
                    },
                    noRec: dataItem.noRec,
                    statusEnable: false
                }
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                console.log(dataItem);
                var confirm = $mdDialog.confirm()
                    .title('Apakah anda yakin akan menghapus data pegawai?')
                    .textContent(`Anda akan menghapus data riwayat jabatan`)
                    .ariaLabel('Lucky day')
                    .targetEvent(e)
                    .ok('Ya')
                    .cancel('Tidak');
                $mdDialog.show(confirm).then(function() {
                    ManageSdmNew.saveData(dataDelete ,'pegawai/save-riwayat-jabatan').then(function(res) {
                        $scope.loadDataRiwayatJabatan();
                    });
                    console.warn('Masuk sini pak eko');
                }, function() {
                    console.error('Tidak jadi hapus');
                });
            }

            $scope.simpanRiwayatJabatan = function () {
                if(!$scope.item.jenisJabatan) {
                    toastr.warning('Anda belum memilih jenis jabatan');
                    return;
                }
                if(!$scope.item.riwayatJabatan) {
                    toastr.warning('Anda belum memilih Jabatan');
                    return;
                }
                if(!$scope.item.noSK) {
                    toastr.warning('Anda belum mengisi Nomor SK');
                    return;
                }
                if(!$scope.item.tglSK) {
                    toastr.warning('Anda belum mengisi Tanggal SK');
                    return;
                }
                if(!$scope.item.atasanTtdSK) {
                    toastr.warning('Anda belum mengisi Tanda Tangan SK');
                    return;
                }
                if(!$scope.item.jabatanTtd) {
                    toastr.warning('Anda belum memilih Jabatan Tanda Tangan SK');
                    return;
                }
                var dataSave = {
                    "noRec": $scope.noRecRiwayatJabatan ? $scope.noRecRiwayatJabatan : null,
                    "pegawai":{
                        "id":$state.params.idPegawai
                    },
                    "statusEnabled":true,
                    "jenisJabatan":{
                        "id":$scope.item.jenisJabatan.id
                    },
                    "noSK":$scope.item.noSK,
                    "pegawaiTtd":{
                        "id":$scope.item.atasanTtdSK.id
                    },
                    "tglSK":$scope.item.tglSK,
                    "jabatan":{
                        "id":$scope.item.riwayatJabatan.idJabatan
                    },
                    "jabatanTtd":{
                        "id":$scope.item.jabatanTtd.id
                    }
                }
                ManageSdmNew.saveData(dataSave ,'pegawai/save-riwayat-jabatan').then(function(res) {
                    $scope.popUpRiwayat.close();
                    $scope.loadDataRiwayatJabatan();
                });
            }

            function customBoolEditor(container, options) {
                var guid = kendo.guid();
                $('<input class="k-checkbox" id="' + guid + '" type="checkbox" name="' + options.field + '" data-type="boolean" data-bind="checked:' + options.field + '">').appendTo(container);
                $('<label class="k-checkbox-label" for="' + guid + '">&#8203;</label>').appendTo(container);
            }

            $scope.createNewJabatanInternal = function() {
                clearPop();
                if($scope.isEdit) {
                    $scope.popUpJabatan.center().open();
                    var actions = $scope.popUpJabatan.options.actions;
                    actions.splice(actions.indexOf("Close"), 1);
                    $scope.popUpJabatan.setOptions({
                        actions: actions
                    });
                } else {
                    toastr.warning('Tidak bisa menambah Jabatan')
                }
            };
 
            $scope.changeCB = function () {
                if($scope.item.isPrimary !== undefined){ 
                    if($scope.item.isPrimary == 'true' || $scope.item.isPrimary == true){
                        $scope.muncul = true;
                    }else{
                      $scope.muncul = false; 
                 }
                }
            };
            // #endregion Rekam Data Pegawai

            // #region Data Keluarga
            var initDataKeluarga = function () {
                if ($state.params.idPegawai !== "") {
                    ManageSdmNew.getListData("pegawai/get-keluarga-pegawai?id=" + $state.params.idPegawai).then(function(data) {
                        // $scope.pegawai=data.data.data;
                        if(data.data.datadataFound) {
                            for (var x = 0; x < data.data.data.keluargaPegawai.length; x++) {
                                var element = data.data.data.keluargaPegawai[x];
                                element.no = (x + 1);
                                element.tglLahir = moment(data.data.data.keluargaPegawai[x].tglLahir).format('DD-MM-YYYY');
                                element.tglsuratKuliah = moment(data.data.data.keluargaPegawai[x].tglsuratKuliah).format('DD-MM-YYYY'); // dateHelper.formatDate(data.data.data.keluargaPegawai[x].tglLahir, "DD-MM-YYYY");
                                
                            }
                            $scope.gridKeluarga.data(data.data.data.keluargaPegawai);
                        }
                    });
                }
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
                }).then(function() {
                    
                });

                $scope.gridKeluarga = new kendo.data.DataSource({
                    data:[],
                    pageSize: 10
                });

                $scope.optGridKeluarga = {
                    toolbar: [{
                        name: "create",
                        text: "Buat Jabatan Internal Baru",
                        template: '<button ng-click="createNewKeluarga()" class="k-button k-button-icontext k-grid-upload" href="\\#"><span class="k-icon k-i-plus"></span>Buat Riwayat</button>'
                    }],
                    pageable: true,
                    scrollable: true,
                    columns:[
                        {
                            "field": "no",
                            "title": "<h3>No</h3>",
                            "width": "5%"
                            },
                            {
                            "field": "namaLengkap",
                            "title": "<h3>Nama</h3>",
                            "width": "20%"
                        },
                        {
                            "field": "hubunganKeluarga",
                            "title": "<h3>Status</h3>",
                            "width": "20%"
                        },
                        {
                            "field": "tanggungan",
                            "title": "<h3>Tertanggung</h3>",
                            "width": "20%"
                        },
                        {
                            "field": "tglLahir",
                            "title": "<h3>Tanggal Lahir</h3>",
                            "width": "20%"
                        },
                        {
                            "field": "namaPekerjaan",
                            "title": "<h3>Pekerjaan</h3>",
                            "width": "20%"
                        }
                    ]
                };

            $scope.kl = function(current) {
                ManageSdmNew.getListData("keluarga-pegawai/cari-alamat-id/" + current.id).then(function(data) {
                    $scope.item = data.data.data;
                    $scope.item.tglLahir = moment(data.data.data.tglLahir).format('DD-MM-YYYY');
                    $scope.item.tglsuratKuliah = moment(data.data.data.tglsuratKuliah).format('DD-MM-YYYY');
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
                element.id = $state.params.idPegawai;
                ManageSdmNew.saveData(element, "keluarga-pegawai/save-keluarga-pegawai").then(function(e) {
                    delete $scope.item;
                    $scope.now = new Date();
                    $scope.item = {
                        tglLahir: $scope.now,
                        tglsuratKuliah: $scope.now,
                    };
                });
            };
            $scope.batalInputKeluarga = function() {
                $scope.popUpKeluarga.close();
            };
            $scope.createNewKeluarga = function (e) {
                // $scope.popUpKeluarga.open();
                $scope.popUpKeluarga.center().open();
                var actions = $scope.popUpKeluarga.options.actions;
                actions.splice(actions.indexOf("Close"), 1);
                $scope.popUpKeluarga.setOptions({
                    actions: actions
                });
            };

            // #endregion Data Keluarga

            // #region Riwayat Jabatan
                $scope.initRiwayatJabatan = function () {
                    // manageSarprasPhp.getDataTableTransaksi("historypegawai/get-drop-down-riwayat-jabatan").then(function(data){
                    //     $scope.listJenisJabatan = data.data.dataJenisJabatan;
                    //     $scope.listJabatanInternal = data.data.dataJabatanInternal;
                    //     $scope.listFungsional = data.data.dataJabatanFungsional;
                    //     console.log($scope.listPgw);
                    //     $scope.listPgw = data.data.pegawai;
                    //     if($scope.listPgw != undefined){
                    //         $scope.listPgw.push($scope.pegawaiTambah)
                    //     }
                    // });

                    $scope.columnGrid = {
                        toolbar: [
                        {
                            name: "create",text: "Buat Riwayat Jabatan",
                            template: '<button ng-click="createNewRiwayatJabatan()" class="k-button k-button-icontext k-grid-upload" href="\\#"><span class="k-icon k-i-plus"></span>Buat Riwayat</button>'	
                        } 
                        ],
                        sortable: false,
                        reorderable: true,
                        filterable: false,
                        pageable: true,
                        columnMenu: false,
                        resizable: true,
                        selectable: 'row',
                        columns:	[  
                        {  
                            field: "noSk",
                            title: "<h3>No SK</h3>",
                            width:"100px" 
                        },
                        {  
                            field: "tglSk",
                            title: "<h3>Tanggal SK</h3>",
                            width:"100px" 
                        }, 
                        {  
                            field: "jenisJabatan",
                            title: "<h3>Jenis Jabatan</h3>",
                            width:"150px" 
                        },
                        {  
                            field: "namaJabatan",
                            title: "<h3>Jabatan</h3>",
                            width:"250px" 
                        },
                        {  
                            field: "namaLengkapTtd",
                            title: "<h3>Tanda Tangan SK</h3>",
                            width:"150px"
                        },
                        {
                            command:[ 
                            { 
                                text: "Edit", 
                                width:"40px", 
                                align:"center",
                                attributes: {
                                    align:"center"
                                },
                                click: changeRowJabatan,
                                imageClass: "k-icon k-i-pencil"
                            }, { 
                                text: "Hapus", 
                                width:"40px", 
                                align:"center",
                                attributes: {
                                    align:"center"
                                },
                                click: removeRowJabatan,
                                imageClass: "k-icon k-delete"
                            }],
                            title: "",
                            width: "150px",
                            attributes: {
                                style: "text-align:center;valign=middle"
                            },
                        }],
                    };
                    $scope.loadDataRiwayatJabatan();
                };
                
                $scope.loadDataRiwayatJabatan = function() {
                    if($state.params.idPegawai) {
                        $scope.isRouteLoading = true;
                        ManageSdmNew.getListData('sdm/get-data-riwayat-jabatan?idPegawai=' + $state.params.idPegawai).then(function(data) {
                            $scope.isRouteLoading = false;
                            // console.log();
                            $scope.dataSourceRiwayatJabatan = {	
                                data: data.data.data.riwayatJabatanByPegawai,
                                // _data: data.data,
                                pageSize: 30,
                                selectable: true,
                                refresh: true,
                                total: data.data.length,
                                serverPaging: false,
                            };
                        });
                    }
                    
                }

                $scope.getDataJabatan = function(id) {
                    // $scope.listJabatanByJenisJabatan = "";
                    ManageSdmNew.getListData("sdm/get-all-jabatan-by-jenis-jabatan?idJenisJabatan=" + id, true).then(function(res) {
                        $scope.listJabatanByJenisJabatan = res.data;
                    });
                }

                $scope.batalRiwayatJabatan = function(){
					clearField();
					$scope.popUpRiwayat.close();
                };
                
                function clearField(){
					$scope.noRecRiwayatJabatan="";
					$scope.item.jenisJabatan =undefined;
					$scope.item.riwayatJabatan = undefined;
					$scope.item.jabatanTtd = undefined;
					$scope.item.noSK = "";
					$scope.item.tglSK ="";
					$scope.item.atasanTtdSK = undefined;
					$scope.item.keterangan = "";
				}

                $scope.createNewRiwayatJabatan = function(){
                    $scope.popUpRiwayat.center().open();
                    var actions = $scope.popUpRiwayat.options.actions; 
                    actions.splice(actions.indexOf("Close"), 1); 
                    $scope.popUpRiwayat.setOptions({ actions : actions });
                };

                function changeRowJabatan(e){
                    clearField();
                    e.preventDefault();
                    var grid = this;
                    var row = $(e.currentTarget).closest("tr");
                    var tr = $(e.target).closest("tr");
                    var dataItem = this.dataItem(tr);
                    console.log(dataItem);
                    $scope.getDataJabatan(dataItem.idJenisJabatan);
                    $scope.noRecRiwayatJabatan = dataItem.noRec;
                    $scope.item.riwayatJabatan = { idJabatan:dataItem.idJabatan, namaJabatan:dataItem.namaJabatan };
                    $scope.item.jenisJabatan = { id:dataItem.idJenisJabatan, jenisJabatan:dataItem.jenisJabatan };                    
                    $scope.item.noSK = dataItem.noSk;
                    $scope.item.tglSK = dataItem.tglSk;
                    $scope.item.atasanTtdSK = { id: dataItem.idPgwTtd, namaLengkap:dataItem.namaLengkapTtd };
                    $scope.item.keterangan = dataItem.keterangan;
                    $scope.item.jabatanTtd = { id:dataItem.idJabatanTtd, namaJabatan:dataItem.namaJabatanTtd };
                    $scope.popUpRiwayat.center().open();
                }
            // #endregion Riwayat Jabatan
            
            // #region Riwayat Pendidikan
            $scope.initRiwayatPendidikan = function () {
                $scope.columnGridPendidikan = {
                    toolbar: [
                    {
                        name: "create",text: "Buat Riwayat Jabatan",
                        template: '<button ng-click="createNewPendidikan()" class="k-button k-button-icontext k-grid-upload" href="\\#"><span class="k-icon k-i-plus"></span>Buat Riwayat</button>'	
                    } 
                    ],
                    sortable: false,
                    reorderable: true,
                    filterable: false,
                    pageable: true,
                    columnMenu: false,
                    resizable: true,
                    selectable: 'row',
                    columns:	[
                    {
                        field: "namaTempatPendidikan", title: "<h3>Nama Institusi</h3>", width:"150px"
                    },
                    {
                        field: "pendidikan", title: "<h3>Pendidikan</h3>", width:"100px" 
                    },
                    {
                        field: "jurusan", title: "<h3>Jurusan</h3>", width:"150px" 
                    },
                    {
                        field: "tglLulus", title: "<h3>Tanggal Kelulusan</h3>", width:"100px" 
                    },
                    {
                        field: "nilaiIPK", title: "<h3>IPK</h3>", width:"75px" 
                    },
                    {
                        field: "noIjazah", title: "<h3>No Ijazah</h3>", width:"100px" 
                    },
                    {
                        field: "tglIjazah", title: "<h3>Tanggal Ijazah</h3>", width:"100px" 
                    },
                    {
                        command:[
                        {
                            text: "Edit", width:"40px", align:"center",
                            attributes: {
                                align:"center"
                            },
                            click: changeRowPendidikan,
                            imageClass: "k-icon k-i-pencil"
                        }, 
                        {
                            text: "Hapus", width:"40px", align:"center",
                            attributes: {
                                align:"center"
                            },
                            click: removeRowPendidikan,
                            imageClass: "k-icon k-delete"
                        }],
                        title: "",
                        width: "150px",
                        attributes: {
                            style: "text-align:center;valign=middle"
                        },
                    }],
                };

                // manageSarprasPhp.getDataTableTransaksi("historypegawai/get-drop-down-riwayat-pendidikan").then(function(data){
				// 	$scope.listPendidikan = data.data.dataPendidikan;
				// 	$scope.listTingkatKelulusan = data.data.dataTingkatKelulusan; 
				// });
                $scope.getDataRiwayatPendidikan ();
				modelItemAkuntansi.getDataDummyPHP("jadwaldokter/get-drop-down-pegawai", true, true, 10).then(function(data) {
					$scope.listPgw= data;
                });
            };

            $scope.getDataRiwayatPendidikan = function () {  
                ManageSdmNew.getListData("sdm/get-data-riwayat-pendidikan?idPegawai=" +	$state.params.idPegawai ).then(function(data) {
					$scope.isRouteLoading = false;
					for (var i = data.data.length - 1; i >= 0; i--) {
						data.data[i].nilaiipk = parseFloat(Math.round(data.data[i].nilaiipk * 100) / 100).toFixed(2);
                    }
					$scope.dataSourcePendidikan = {	
						data: data.data.data.riwayatPendidikanByPegawai,
						// _data: data.data,
						pageSize: 30,
						selectable: true,
						refresh: true,
						total: data.data.length,
						serverPaging: false,
					};
				});
            }
            function clearFieldPendidikan() {
                $scope.noRecRiwayatPendidikan = null;
                $scope.item.riwayatPendidikan = undefined;
                $scope.item.riwayatJurusan = "";
                $scope.item.tglLulus = null;
                $scope.item.ipk = "";
                $scope.item.namaTempat = "";
                $scope.item.noIjasah = null;
                $scope.item.tglIjazah = null;
				$scope.item.tingkatKelulusan = undefined;
            }

            function changeRowPendidikan(e){
				clearFieldPendidikan();
				e.preventDefault();
				var grid = this;
				var row = $(e.currentTarget).closest("tr");
				var tr = $(e.target).closest("tr");
                var dataItem = this.dataItem(tr); 
                console.log(dataItem);
                $scope.noRecRiwayatPendidikan = dataItem.noRec;
                $scope.item.riwayatPendidikan = {
                    id:dataItem.idPendidikan,
                    namaPendidikan: dataItem.pendidikan
                };
                $scope.item.riwayatJurusan = dataItem.jurusan;
                $scope.item.tglLulus = dataItem.tglLulus;
                $scope.item.ipk = dataItem.nilaiIPK;
                $scope.item.namaTempat = dataItem.namaTempatPendidikan;
                $scope.item.noIjasah = dataItem.noIjazah;
                $scope.item.tglIjazah = dataItem.tglIjazah;
				$scope.item.tingkatKelulusan = {id:dataItem.objecttingkatkelulusanfk,namalengkap:dataItem.tingkatKelulusan};
				$scope.popUpRiwayatPendidikan.center().open();
			}

			function removeRowPendidikan(e){
				e.preventDefault();
				var tr = $(e.target).closest("tr");
				var dataItem = this.dataItem(tr);

				var dataObjPost = {
                    "statusEnabled": false,
                    "noRec": dataItem.noRec,
                    "pegawai":{
                        "id":$state.params.idPegawai
                    },
                    "pendidikan":{
                        "id":dataItem.idPendidikan
                    }
				} 
				ManageSdmNew.saveData(dataObjPost, 'pegawai/save-riwayat-pendidikan').then(res => {
                    console.log(res);
                    $scope.getDataRiwayatPendidikan();
                    $scope.popUpRiwayatPendidikan.close();
                });
            }
            
            $scope.createNewPendidikan = function() {
                clearFieldPendidikan();
				$scope.popUpRiwayatPendidikan.center().open();
				// var actions = $scope.popUpRiwayatPendidikan.options.actions; 
				// actions.splice(actions.indexOf("Close"), 1); 
				// $scope.popUpRiwayatPendidikan.setOptions({ actions : actions });
            };
            
            $scope.batalPendidikan = function(){
				$scope.popUpRiwayatPendidikan.close();
            };

            $scope.savePendidikan = function(){
				var dataSave = {
                    "noRec":$scope.noRecRiwayatPendidikan ?$scope.noRecRiwayatPendidikan : null,
                    "statusEnabled":true,
                    "jurusan":$scope.item.riwayatJurusan,
                    "namaTempatPendidikan":$scope.item.namaTempat,
                    "nilaiIPK":$scope.item.ipk,
                    "noIjazah":$scope.item.noIjasah,
                    "tglIjazah":$scope.item.tglIjazah,
                    "tglLulus":$scope.item.tglLulus,
                    "pegawai":{
                        "id":$state.params.idPegawai
                    },
                    "pendidikan":{
                        "id":$scope.item.riwayatPendidikan.id
                    }
                }
                ManageSdmNew.saveData(dataSave, 'pegawai/save-riwayat-pendidikan').then(res => {
                    console.log(res);
                    $scope.getDataRiwayatPendidikan();
                    $scope.popUpRiwayatPendidikan.close();
                });
			}
            // #endregion Riwayat Pendidikan
            
            function formatDate(tanggal) {
                if (!(_.contains(tanggal, '-'))) {
                    tanggal = dateHelper.formatDate(tanggal, "DD-MM-YYYY")
                }
                var res = tanggal.split("-");
                return res[1] + "-" + res[0] + "-" + res[2];
            }

            $scope.ubahDataPegawai = function()  {
                if ($scope.item.noSip) {
                    $scope.disableSip = false;
                } else {
                    $scope.disableSip = true;
                }
                if ($scope.item.noStr) {
                    $scope.disableStr = false;
                } else {
                    $scope.disableStr = true;  
                }
                $scope.isEdit = true;
            
                $scope.isSimpan = false;
                // $scope.disableSip = false;
                // $scope.disableStr = false;
                $scope.isEdit = true;
            };

            $scope.kembali = function () {  
                window.history.back();
            };

            $scope.batalUbahDataPegawai = function() {
                getDataPegawai($state.params.idPegawai);
                $scope.isSimpan = true;
                $scope.isEdit = false;
                $scope.disableSip = true;
                $scope.disableStr = true;
            };

            $scope.changedNamaLengkap = function() {
                if($scope.item.gelarDepan === undefined) {
                    $scope.item.gelarDepan = '';
                }
                if($scope.item.nama === undefined) {
                    $scope.item.nama = '';
                }
                if($scope.item.gelarBelakang === undefined) {
                    $scope.item.gelarBelakang = '';
                }
                $scope.item.namaLengkap = `${$scope.item.gelarDepan} ${$scope.item.nama}, ${$scope.item.gelarBelakang}`;
                if(($scope.item.gelarDepan === '' || $scope.item.gelarDepan === undefined) &&
                    ($scope.item.nama === '' || $scope.item.nama === undefined) &&
                    ($scope.item.gelarBelakang === '' || $scope.item.gelarBelakang === undefined)) {
                        $scope.item.namaLengkap = '';
                } else if(($scope.item.gelarDepan === '' || $scope.item.gelarDepan === undefined) &&
                        ($scope.item.nama !== '' || $scope.item.nama !== undefined) &&
                        ($scope.item.gelarBelakang === '' || $scope.item.gelarBelakang === undefined)) {
                            $scope.item.namaLengkap = `${$scope.item.nama}`;        
                } else if(($scope.item.gelarDepan === '' || $scope.item.gelarDepan === undefined)) {
                    $scope.item.namaLengkap = `${$scope.item.nama}, ${$scope.item.gelarBelakang}`;
                } else if(($scope.item.gelarBelakang === '' || $scope.item.gelarBelakang === undefined)) {
                    $scope.item.namaLengkap = `${$scope.item.gelarDepan}. ${$scope.item.nama}`;
                }
            };

            $scope.saveDataIndetitasPegawai = function () {
                if(!$scope.item.nama) {
                    toastr.warning('Anda belum memasukan nama');
                    return;
                }
                // var data = {
                //     "satuanKerja":{ "id":$scope.item.satuanKerja.id, "satuanKerja":$scope.item.satuanKerja.satuanKerja },
                // }
                var dataSave = {
                    "nama":$scope.item.nama,
                    "gelarBelakang":$scope.item.gelarBelakang ? $scope.item.gelarBelakang : null,
                    "tempatLahir":$scope.item.tempatLahir ? $scope.item.tempatLahir : null,
                    "tglLahir":$scope.item.tglLahir ? dateHelper.toTimeStamp($scope.item.tglLahir) : null,
                    "jenisKelamin":$scope.item.jenisKelamin ? { "jenisKelamin":$scope.item.jenisKelamin.jenisKelamin, "id":$scope.item.jenisKelamin.id}: {},
                    "kategoryPegawai":$scope.item.kategoryPegawai ? { "kategoryPegawai":$scope.item.kategoryPegawai.kategoryPegawai, "id":$scope.item.kategoryPegawai.id}: {},
                    "kedudukan": $scope.item.kedudukan ? { "name":$scope.item.kedudukan.name,"id":$scope.item.kedudukan.id } : {},
                    "statusEnabled":true,
                    "tglMasuk":$scope.item.tglMasuk ? dateHelper.toTimeStamp($scope.item.tglMasuk): null,
                    "statusPerkawinanPegawai":$scope.item.statusPerkawinanPegawai ? {"statusPerkawinan":$scope.item.statusPerkawinanPegawai.statusPerkawinan, "id":$scope.item.statusPerkawinanPegawai.id }: {},
                    "bankRekeningNomor":$scope.item.bankRekeningNomor ? $scope.item.bankRekeningNomor: null,
                    "bankRekeningAtasNama":$scope.item.bankRekeningAtasNama ? $scope.item.bankRekeningAtasNama : null,
                    "bankRekeningNama":$scope.item.bankRekeningNama ? $scope.item.bankRekeningNama : null,
                    "npwp":$scope.item.npwp ? $scope.item.npwp : null,
                    "alamat":$scope.item.alamat ? $scope.item.alamat : null,
                    "kodePos":$scope.item.kodePos ? $scope.item.kodePos : null,
                    "agama": $scope.item.agama ? { "agama":$scope.item.agama.agama, "id":$scope.item.agama.id }: {},
                    "idFinger":$scope.item.idFinger ? $scope.item.idFinger : null,
                    "shiftKerja":$scope.item.shiftKerja ? { "name":$scope.item.shiftKerja.name, "id":$scope.item.shiftKerja.id}: {},
                    "namaLengkap":$scope.item.namaLengkap ? $scope.item.namaLengkap: null,
                    // "id":"22423",
                    "email":$scope.item.email ? $scope.item.email : null,
                    "emailAlternatif":$scope.item.emailAlternatif ? $scope.item.emailAlternatif : null,
                    "gelarDepan":$scope.item.gelarDepan ? $scope.item.gelarDepan : null,
                    "grade":$scope.item.grade ? $scope.item.grade : null,
                    "kodeBank":$scope.item.kodeBank ? $scope.item.kodeBank : null,
                    // "idKodeGapok": "1",
                    // "levelTingkat":{
                    //     "id":1,
                    //     "levelTingkat":"TK.I"
                    // },

                    "nikIntern":$scope.item.kategoryPegawai.kategoryPegawai !== 'PNS' ? $scope.item.nipPns: null,
                    "nip":$scope.item.kategoryPegawai.kategoryPegawai === 'PNS' ? $scope.item.nipPns: null,
                    "nipPns":$scope.item.kategoryPegawai.kategoryPegawai === 'PNS' ? $scope.item.nipPns: null,
                    
                    "nilaiJabatan":$scope.item.nilaiJabatan ? $scope.item.nilaiJabatan : null,
                    
                    "noBPJS":$scope.item.noBPJS ? $scope.item.noBPJS : null,
                    "noCm":$scope.item.noCm ? $scope.item.noCm : null,
                    "noHandphone":$scope.item.noHandphone ? $scope.item.noHandphone : null,
                    "noIdentitas":$scope.item.nik ? $scope.item.nik: null,
                    "noSip":$scope.item.noSip ? $scope.item.noSip : null,
                    "noStr":$scope.item.noStr ? $scope.item.noStr : null,
                    "noTlp":$scope.item.noTlp ? $scope.item.noTlp : null,
                    "detailKategoryPegawai":$scope.item.detailKategoriPegawai  ? { "id":$scope.item.detailKategoriPegawai.id, "detailKategoryPegawai":$scope.item.detailKategoriPegawai.detailKategoryPegawai}: {},
                    "eselon": $scope.item.eselon ? { "id":$scope.item.eselon.id, "eselon":$scope.item.eselon.eselon }: {},
                    "golonganDarah":$scope.item.golonganDarah ? { "id":$scope.item.golonganDarah.id, "golonganDarah":$scope.item.golonganDarah.golonganDarah} : {},
                    "golonganPegawai":$scope.item.golonganPegawai ? { "id":$scope.item.golonganPegawai.id, "golonganPegawai":$scope.item.golonganPegawai.name}: {},
                    "jabatanFungsional":$scope.item.jabatanFungsional ? { "id":$scope.item.jabatanFungsional.id, "namaJabatan":$scope.item.jabatanFungsional.namaJabatan } : {},
                    // "jabatanLamar":{ "id":1418, "namaJabatan":"Sistem Analis dan Programmer" },
                    // "jabatanStruktural":{ "id":1418, "namaJabatan":"Sistem Analis dan Programmer" },
                    "jenisPegawai":$scope.item.jenisPegawai ? { "id":$scope.item.jenisPegawai.id, "jenisPegawai":$scope.item.jenisPegawai.jenisPegawai } : {},
                    // "jenisPegawaiLamar":{ "id":4, "jenisPegawai":"SIMRS" },
                    "detailKelompokJabatan":$scope.item.detailKelompokJabatan ? { "id":$scope.item.detailKelompokJabatan.id, "detailKelompokJabatan":$scope.item.detailKelompokJabatan.detailKelompokJabatan }: {},
                    // "kualifikasiJurusan":{ "id":73, "kualifikasiJurusan":"S1-Sarjana Fisika" },
                    "pangkat":$scope.item.pangkat ? { "id":$scope.item.pangkat.id, "namaPangkat":$scope.item.pangkat.namaPangkat }: {},
                    "pendidikan":$scope.item.pendidikan ? { "id":$scope.item.pendidikan.id, "namaPendidikan":$scope.item.pendidikan.namaPendidikan}: {},
                    "penghasilanTidakKenaPajak":$scope.item.penghasilanTidakKenaPajakId ? { "id":$scope.item.penghasilanTidakKenaPajakId, "deskripsi":$scope.item.penghasilanTidakKenaPajak }: {},
                    "rekanan":$scope.item.rekanan ? { "id":$scope.item.rekanan.id, "namaRekanan":$scope.item.rekanan.namaRekanan }: {},
                    "ruangan":$scope.item.ruanganPegawai ? { "id":$scope.item.ruanganPegawai.id, "namaRuangan":$scope.item.ruanganPegawai.namaRuangan } : {},
                    // "satuanKerja":$scope.item.satuanKerjaId ? { "id":$scope.item.satuanKerjaId, "satuanKerja":$scope.item.satuanKerja }: {},
                    "satuanKerja":$scope.item.satuanKerja ? { "id":$scope.item.satuanKerja.id, "satuanKerja":$scope.item.satuanKerja.satuanKerja }: {},
                    "suku":$scope.item.suku ? { "id":$scope.item.suku.id, "suku":$scope.item.suku.suku } : {},
                    "typePegawai":$scope.item.typePegawai ? { "id":$scope.item.typePegawai.id } : {},
                    "pensiun":$scope.item.pensiun,
                    "tglPensiun":$scope.item.tglPensiun ? dateHelper.toTimeStamp($scope.item.tglPensiun): null,
                    "tglTerbitStr": $scope.item.tglTerbitStr ? dateHelper.toTimeStamp($scope.item.tglTerbitStr): null,
                    "tglBerakhirStr": $scope.item.tglBerakhirStr ? dateHelper.toTimeStamp($scope.item.tglBerakhirStr): null,
                    "tanggalMeninggal": $scope.item.tanggalMeninggal ? dateHelper.toTimeStamp($scope.item.tanggalMeninggal): null,
                    "tglTerbitSip": $scope.item.tglTerbitSip ? dateHelper.toTimeStamp($scope.item.tglTerbitSip) : null,
                    "tglBerakhirSip": $scope.item.tglBerakhirSip ? dateHelper.toTimeStamp($scope.item.tglBerakhirSip): null,
                    "tglKeluar": $scope.item.tglKeluar ? dateHelper.toTimeStamp($scope.item.tglKeluar): null
                    
                    // "qtyAnak":0,
                    // "qtyTanggungan":1,
                    // "qtyTotalJiwa":4,
                    // "statusRhesus":$scope.item.statusRhesus,
                    // "totalNilaiScore":90.9,
                    // "tunjanganFungsional":"1.000.000",
                    // "tunjanganPapua":0,
                    // "tunjanganUmum":4000000
                }
                if($state.params.idPegawai) { dataSave.id = $state.params.idPegawai; }
                if(!$scope.item.detailKategoriPegawai) { delete dataSave.detailKategoryPegawai };
                if(!$scope.item.detailKelompokJabatan) { delete dataSave.detailKelompokJabatan };
                if(!$scope.item.golonganDarah) { delete dataSave.golonganDarah };
                if(!$scope.item.golonganPegawai) { delete dataSave.golonganPegawai };
                if(!$scope.item.jabatanFungsional) { delete dataSave.jabatanFungsional };
                if(!$scope.item.jenisKelamin) { delete dataSave.jenisKelamin };
                if(!$scope.item.jenisPegawai) { delete dataSave.jenisPegawai };
                if(!$scope.item.kategoryPegawai) { delete dataSave.kategoryPegawai };
                if(!$scope.item.kedudukan) { delete dataSave.kedudukan };
                if(!$scope.item.pendidikan) { delete dataSave.pendidikan };
                if(!$scope.item.penghasilanTidakKenaPajak) { delete dataSave.penghasilanTidakKenaPajak };
                if(!$scope.item.rekanan) { delete dataSave.rekanan };
                if(!$scope.item.ruangan) { delete dataSave.ruangan };
                if(!$scope.item.satuanKerja) { delete dataSave.satuanKerja };
                if(!$scope.item.shiftKerja) { delete dataSave.shiftKerja };
                if(!$scope.item.statusPerkawinanPegawai) { delete dataSave.statusPerkawinanPegawai };
                if(!$scope.item.suku) { delete dataSave.suku };
                if(!$scope.item.eselon) { delete dataSave.eselon };
                if(!$scope.item.agama) { delete dataSave.agama };
                if(!$scope.item.pangkat) { delete dataSave.pangkat };
                if(!$scope.item.typePegawai) { delete dataSave.typePegawai };
                ManageSdmNew.saveData(dataSave, "sdm/save-rekam-data-pegawai").then(function(dat) {
                    if(!$state.params.idPegawai) {
                        $state.go('DataPegawai');
                    } else {
                        $scope.ubahDataPegawai();
                        getDataPegawai($state.params.idPegawai);
                    }
                });
                if($scope.isSimpanAtasanLangsung || $scope.isSimpanPejabatPenilai) {
                    var dataSaveAtasan = [
                        {
                          "pegawai": {
                            "id": $state.params.idPegawai
                          },
                          "atasanLangsung": {
                            "id": $scope.atasanLangsung.id,
                            "namaLengkap": $scope.atasanLangsung.namaLengkap
                          },
                          "atasanPejabatPenilai": {
                            "id": $scope.atasanPejabatPenilai.id,
                            "namaLengkap": $scope.atasanPejabatPenilai.namaLengkap
                          },
                          "statusEnabled": true
                        }
                      ]
                      ManageSdmNew.saveData(dataSaveAtasan, "sdm/save-mapping-pegawai-to-atasan").then(function(dat) {
                        // toastr.info('Berhasil save atasan')
                    });
                }
                
            };

            $scope.getDetailKategoriPegawai = function(idK) {
                if($scope.item.kategoryPegawai.kategoryPegawai.toLowerCase() === 'mitra' || $scope.item.kategoryPegawai.kategoryPegawai.toLowerCase() === 'outsourcing') {
                    $scope.isRekanan = true;
                } else {
                    $scope.isRekanan = false;
                }
                ManageSdm.getOrderList("service/list-generic/?view=DetailKategoryPegawai&select=id,detailKategoryPegawai&criteria=statusEnabled,kategoryPegawaiId&values=true," + idK.id, true).then(function(res) {
                    $scope.listOfDetailJenisKategoriPegawai = res.data;
                    if(res.data.length === 0) {
                        $scope.item.detailKategoriPegawai = '';
                    }
                    // console.log(res);
                });
            };
           
            // $scope.$watch()
        };
    }]);
});