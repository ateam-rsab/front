define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('RekamDataPegawaiCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'ManageSdm', 'ManageSdmNew', 'DateHelper', 'FindPegawai', 'FindSdm', '$timeout', 'ManageSarprasPhp', 'ModelItemAkuntansi',
        function($q, $rootScope, $scope, ModelItem, $state, ManageSdm, ManageSdmNew, dateHelper, FindPegawai, FindSdm, $timeout, manageSarprasPhp, modelItemAkuntansi) {
            $scope.isSimpan = true;
            $scope.isEdit = false;
            $scope.dataVOloaded = true;
            // $scope.item.detailKategoryPegawai = '';
            $scope.listOfGolonganDarah = [
                {name: 'A', id:1},
                {name: 'B', id:2},
                {name: 'AB', id:3},
                {name: 'O', id:4}
            ];
            $scope.listOfGolonganRhesus = [
                {name: '+ (Plus)', id:1},
                {name: '- (Minus)', id:2}
            ]
            $scope.init = function () {                
                if($state.params.idPegawai === "") {
                    $scope.isSimpan = false;
                }
            };

            ManageSdmNew.getListData('sdm/get-pegawai-atasan/' + $state.params.idPegawai).then(function (res) {
                if(res.data) {
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

            $scope.init();
            $scope.onChangeTab = function (key) {
                if(key == 1) {
                    console.log('tab 1');
                    initRekamDataPegawai();
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
                    if($scope.item.kategoryPegawai != null || $scope.item.kategoryPegawai != undefined) {
                        // get Detail kategori pegawai
                        $scope.getDetailKategoriPegawai($scope.item.kategoryPegawai);
                    }
                    $scope.isRiwayat = true;
                }
            };

            // #region Rekam Data Pegawai
            var initRekamDataPegawai = function () {
                $scope.listIdKedudukan = [3, 4, 5, 24, 25]; // input kedudukan pegawai yang dijadikan parameter untuk set statusEnabled pegawai = false
                $scope.isRouteLoading = true;
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
                    // baru
                    // jenis pegawai
                    ManageSdm.getOrderList("service/list-generic/?view=JenisPegawai&select=id,jenisPegawai&criteria=statusEnabled&values=true", true),
                    // detail kelompok jabatan
                    ManageSdm.getOrderList("service/list-generic/?view=NilaiKelompokJabatan&select=id,detailKelompokJabatan&criteria=statusEnabled&values=true", true),
                    // kualifikasi
                    ManageSdm.getOrderList("service/list-generic/?view=KualifikasiJurusan&select=id,kualifikasiJurusan&criteria=statusEnabled&values=true", true),

                    // ManageSdm.getOrderList("service/list-generic/?view=Jabatan&select=id,namaJabatan&criteria=statusEnabled&values=true", true),
                    // ManageSdm.getOrderList("service/list-generic/?view=Jabatan&select=id,namaJabatan&criteria=statusEnabled&values=true", true),
                    // ManageSdm.getOrderList("service/list-generic/?view=Jabatan&select=id,namaJabatan&criteria=statusEnabled&values=true", true),
                    // ManageSdm.getOrderList("service/list-generic/?view=Jabatan&select=id,namaJabatan&criteria=statusEnabled&values=true", true),
                    // ManageSdm.getOrderList("service/list-generic/?view=Jabatan&select=id,namaJabatan&criteria=statusEnabled&values=true", true),
                    // ManageSdm.getOrderList("service/list-generic/?view=Jabatan&select=id,namaJabatan&criteria=statusEnabled&values=true", true),
                    // ManageSdm.getOrderList("service/list-generic/?view=Jabatan&select=id,namaJabatan&criteria=statusEnabled&values=true", true),
                    // ManageSdm.getOrderList("service/list-generic/?view=Jabatan&select=id,namaJabatan&criteria=statusEnabled&values=true", true)
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
                        
                        $scope.ListPendidikan = res[1].data;
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
                        $scope.ListJabatanFungsional = res[17].data;
                        $scope.ListJenisPegawai = res[18].data;
                        $scope.ListDetailKelompokJabatan = res[19].data;
                        getDataPegawai($state.params.idPegawai);
                        console.log(res);
                });

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
                            title: "Jabatan",width:"250px" 
                        }, // editor: jbtnDropDownEditor, template: "#= jabatanInternal.namaJabatan #"},
                        {
                            field: "nameSubUnitKerjaPegawai",
                            title: "Unit Kerja",width:"150px" 
                        }, // editor: unitDropDownEditor, template: "#= unitKerja.name #"},
                        {
                            field: "nameUnitKerjaPegawai",
                            title: "Sub Unit Kerja",width:"150px" 
                        }, // editor: subUnitDropDownEditor, template: "#= subUnitKerja.name #"},
                        {
                            field: "isCanCreateJadwal",
                            title: "Membuat Jadwal",width:"50px" 
                        },
                        {
                            field: "isPrimary",
                            title: "Jabatan Utama",width:"50px" 
                        },
                        {
                            field: "isMonitoring",
                            title: "Monitoring",width:"50px" 
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
                                click: customClick,
                                imageClass: "k-icon k-delete"
                            }],
                            title: "",
                            width: "100px",
                        }],
                };
            };

            function getDataPegawai(id) {
                if ($state.params.idPegawai) { // Check parameter noRec pegawai in the url
                    $scope.isMenuDataPegawai = true; // show tombol hapus
                    $scope.isRouteLoading = true; // show loading icon
                    $q.all([ManageSdmNew.getListData("pegawai/get-pegawai-by-customs/" + id)]).then(function(res) {
                        if (res[0].statResponse) {
                            $scope.item = res[0].data.data;
                            $scope.item.id = $state.params.idPegawai;
                            $scope.item.qPegawai = $state.params.idPegawai;                            
                            $scope.item.namaPegawai = res[0].data.data.namaLengkap;
                            $scope.golonganPegawai = {
                                namaExternal: res[0].data.data.golonganPegawai.golonganPegawai ? res[0].data.data.golonganPegawai.golonganPegawai : '-',
                                id:res[0].data.data.golonganPegawai.id
                            };
                            
                            $scope.item.detailKategoriPegawai = {
                                detailKategoryPegawai:res.data.detailKategoryPegawai.detailKategoryPegawai,
                                id:res.data.detailKategoryPegawai.id,

                            }
                            
                            if ($scope.item.unitKerja) {
                                $scope.ListUnitKerja.forEach(function(element) {
                                    if (element.id === res[0].data.data.unitKerja.unitKerjaId) {
                                        $scope.item.subUnitKerja = element;
                                        return true;
                                    }
                                });
                            }
                            if(res[0].data.data.ruangan != null) {
                                $scope.ruanganPegawai = {
                                    id: res[0].data.data.ruangan.id,
                                    namaRuangan: res[0].data.data.ruangan.namaRuangan
                                };
                            }
                            // console.log($scope.ruanganPegawai);
                            // $scope.item.jenisKelamin = {
                            //     name:res[0].data.jenisKelamin.jenisKelamin,
                            //     id:res[0].data.jenisKelamin.id
                            // };
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

            function customClick(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                dataItem.statusEnabled = !dataItem.statusEnabled;
                $scope.simpanJabatan(dataItem);
            }

            function changeRow(e) {
                clearPop();
                e.preventDefault();
                var grid = this;
                var row = $(e.currentTarget).closest("tr");
                var tr = $(e.target).closest("tr");
                var dataItem = this.dataItem(tr);
                $scope.id = dataItem.id;
                $scope.item.unitKerjaPop = {
                    id: dataItem.unitKerjaPegawaiId,
                    name: dataItem.nameUnitKerjaPegawai
                };
                $scope.ubah();
                $scope.item.subUnitKerjaPop = {
                    id: dataItem.subUnitKerjaPegawaiId,
                    name: dataItem.nameSubUnitKerjaPegawai
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
        
            $scope.ubah = function() { 
                var arrSubUnit = $scope.ListSubUnitKerja;
                if ($scope.item.subUnitKerjaPop) delete $scope.item.subUnitKerjaPop; 
                $scope.filteredSubUnit2 = arrSubUnit.filter(filterSubUnit2);
            };

            $scope.batal = function() {
                $scope.popUpJabatan.close();
            };

            $scope.Save = function() {
                if ($scope.item.kategoryPegawai == undefined){
                    toastr.error('Silakan pilih status pegawai terlebih dahulu!');
                    return;
                }
                if ($scope.item.kedudukan == undefined){
                    toastr.error('Silakan pilih kedudukan terlebih dahulu!');
                    return;
                }
                if ($scope.item.kategoryPegawai.id == 1){
                    
                    if ($scope.item.detailKelompokJabatan == undefined){
                        toastr.error('Silakan pilih kelompok jabatan terlebih dahulu!');
                        return;
                    }

                }
                
                // if ($state.params.idPegawai != undefined && $scope.item.jabatanInternalPop == undefined) {
                //     toastr.error('Silakan pilih unit kerja terlebih dahulu!');
                //     return;
                // }

                if ($scope.item.agama == undefined){
                    toastr.error('Silakan pilih agama terlebih dahulu!');
                    return;
                }

                // if ($scope.item.kategoryPegawai.id == 1){
                    
                //      if ($scope.item.eselon == undefined){
                //         toastr.error('Silakan pilih eselon terlebih dahulu!');
                //         return;
                //     }

                // }


                if (_.contains($scope.item.tglLahir, '-')) {
                    $scope.item.tglLahir = new Date(formatDate($scope.item.tglLahir));
                }
                if (_.contains($scope.item.tglMasuk, '-')) {
                    $scope.item.tglMasuk = new Date(formatDate($scope.item.tglMasuk));
                }
                if (_.contains($scope.item.tglkeluar, '-')) {
                    $scope.item.tglkeluar = new Date(formatDate($scope.item.tglkeluar));
                }
                if (_.contains($scope.item.tglPensiun, '-')) {
                    $scope.item.tglPensiun = new Date(formatDate($scope.item.tglPensiun));
                }

                delete $scope.item.qPegawai; // temporary delete atribut qPegawai before post data to backend



                if (!$scope.disableSip) {
                    $scope.item.noSip = $scope.item.noSip;
                    var tglTerbitSip = isDate($scope.item.tglTerbitSip),
                    tglBerakhirSip = isDate($scope.item.tglBerakhirSip);
                    if (tglBerakhirSip) {
                        tglBerakhirSip = new Date($scope.item.tglBerakhirSip).getTime();
                    } else {
                        tglBerakhirSip = new Date(dateHelper.newStringToDateTime($scope.item.tglBerakhirSip)).getTime();
                    }
                    if (tglTerbitSip) {
                        tglTerbitSip = new Date($scope.item.tglTerbitSip).getTime();
                    } else {
                        tglTerbitSip = new Date(dateHelper.newStringToDateTime($scope.item.tglTerbitSip)).getTime();
                    }
                    $scope.item.tglTerbitSip = tglTerbitSip;
                    $scope.item.tglBerakhirSip = tglBerakhirSip;
                } else {
                    if ($scope.item.noSip) $scope.item.noSip = null;
                    if ($scope.item.tglTerbitSip) $scope.item.tglTerbitSip = null;
                    if ($scope.item.tglBerakhirSip) $scope.item.tglBerakhirSip = null;
                }
                if (!$scope.disableStr) {
                    $scope.item.noStr = $scope.item.noStr;
                    var tglTerbitStr = isDate($scope.item.tglTerbitStr),
                    tglBerakhirStr = isDate($scope.item.tglBerakhirStr);
                    if (tglBerakhirStr) {
                        tglBerakhirStr = new Date($scope.item.tglBerakhirStr).getTime();
                    } else {
                        tglBerakhirStr = new Date(dateHelper.newStringToDateTime($scope.item.tglBerakhirStr)).getTime();
                    }
                    if (tglTerbitStr) {
                        tglTerbitStr = new Date($scope.item.tglTerbitStr).getTime();
                    } else {
                        tglTerbitStr = new Date(dateHelper.newStringToDateTime($scope.item.tglTerbitStr)).getTime();
                    }
                    $scope.item.tglTerbitStr = tglTerbitStr;
                    $scope.item.tglBerakhirStr = tglBerakhirStr;
                } else {
                    if ($scope.item.noStr) $scope.item.noStr = null;
                    if ($scope.item.tglTerbitStr) $scope.item.tglTerbitStr = null;
                    if ($scope.item.tglBerakhirStr) $scope.item.tglBerakhirStr = null;
                }

                if ($scope.item.nama) {
                    if ($scope.item.gelarDepan && $scope.item.gelarBelakang) {
                        $scope.item.namaLengkap = $scope.item.gelarDepan + '. ' + $scope.item.nama + ', ' + $scope.item.gelarBelakang;
                    } else if ($scope.item.gelarDepan && !$scope.item.gelarBelakang) {
                        $scope.item.namaLengkap = $scope.item.gelarDepan + '. ' + $scope.item.nama;
                    } else if (!$scope.item.gelarDepan && $scope.item.gelarBelakang) {
                        $scope.item.namaLengkap = $scope.item.nama + ', ' + $scope.item.gelarBelakang;
                    } else {
                        $scope.item.namaLengkap = $scope.item.nama;
                    }
                }
                var newModel = getDataChanged($scope.item);
                for (var key in newModel) {
                    if (newModel.hasOwnProperty(key)) {
                        if (key.indexOf("tgl") >= 0) {
                            newModel[key] = new Date(formatDate(newModel[key])).getTime();
                            // newModel[key] = new Date(newModel[key]).getTime();
                            // alert(newModel[key]);
                        }
                        if (key.indexOf("tglMeninggal") >= 0) {
                            var keys = "tanggalMeninggal";
                            newModel[keys] = newModel[key];
                            delete newModel[key];
                        }
                    }
                }
                var isEmptyModel = _.isEmpty(newModel);
                if (!isEmptyModel) {
                    newModel.id = $state.params.idPegawai;
                    for (var key in newModel) {
                        if (newModel.hasOwnProperty(key)) {
                            // redirect ke halaman mapping atasan
                            if (key.indexOf("jabatanInternal") >= 0 || key.indexOf("unitKerja") >= 0) $scope.ubahMappingAtasan = true;
                        }
                    }

                    ManageSdmNew.saveData(newModel, "sdm/save-rekam-data-pegawai").then(function(dat) {
                        if (dat.data.data.noRec) {
                            var idPegawai = dat.data.data.noRec;
                            if ($scope.ubahMappingAtasan) {
                                localStorage.setItem("notifChangeSdm", "Data Jabatan dan atau Unit kerja Pegawai telah berubah. Silahkan update data mapping atasan pegawai ybs.")
                                setTimeout(function() {
                                    $state.go('MappingAtasanPegawai', {
                                        idPegawai: idPegawai,
                                        namaLengkap: $scope.item.namaLengkap
                                    })
                                }, 3000)
                            }

                            if ($scope.item.noSip) {
                                $scope.item.tglTerbitSip = _.contains($scope.item.tglTerbitSip, '-') ? $scope.item.tglTerbitSip : dateHelper.formatDate($scope.item.tglTerbitSip, "DD-MM-YYYY");
                                $scope.item.tglBerakhirSip = _.contains($scope.item.tglBerakhirSip, '-') ? $scope.item.tglBerakhirSip : dateHelper.formatDate($scope.item.tglBerakhirSip, "DD-MM-YYYY");
                            }

                            if ($scope.item.noStr) {
                                $scope.item.tglTerbitStr = _.contains($scope.item.tglTerbitStr, '-') ? $scope.item.tglTerbitStr : dateHelper.formatDate($scope.item.tglTerbitStr, "DD-MM-YYYY");
                                $scope.item.tglBerakhirStr = _.contains($scope.item.tglBerakhirStr, '-') ? $scope.item.tglBerakhirStr : dateHelper.formatDate($scope.item.tglBerakhirStr, "DD-MM-YYYY");
                            }
                            getDataPegawai($state.params.idPegawai);
                        } else {
                            $scope.item = {
                                "tglLahir": new Date(),
                                "tglMasuk": new Date(),
                                "tglkeluar": new Date()
                            };
                        }
                    }, (error) => {

                    });
                } else {
                    messageContainer.error('Tidak ada perubahan data');
                }
                // } else {
                //     ModelItem.showMessages(isValid.messages);
                // }
            };
            
            function isDate(value) {
                return value instanceof Date;
            }

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
                        // getModel($scope.item);
                    })
                }
            });

            $scope.hapusPegawai = function() {
                $scope.confirmDialog.center().open();;
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

                    $scope.item.noSip = "";
                    $scope.item.tglTerbitSip = null;
                    $scope.item.tglBerakhirSip = null;
                } else if (inputId.indexOf("Str") >= 0) {
                    $scope.disableStr = !checked;

                    $scope.item.noStr = "";
                    $scope.item.tglTerbitStr = null;
                    $scope.item.tglBerakhirStr = null;
                }
            };

            $scope.$watch('item.kedudukan', function(newVal, oldVal) {
                if (!newVal) return;
                if (newVal == oldVal) return;
                if (newVal.id && $scope.listIdKedudukan) {
                    if ($scope.listIdKedudukan.includes(newVal.id)) {
                        $scope.item.statusEnabled = false;
                        if (newVal.id == 4){
                            $scope.showTglMeninggal = true;
                        }
                        else{
                            $scope.showTglMeninggal = false;
                        }

                    } else {
                        $scope.item.statusEnabled = true;
                    }
                }
            });

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

            $scope.simpanJabatan = function(data) {
                var dataSend = []; 
                if (data !== undefined) {
                    dataSend.push({
                        "id": data.id ? data.id : null,
                        "pegawai": {
                            "id": $state.params.idPegawai
                        },
                        "jabatan": {
                            "id": data.jabatanId
                        },
                        "isCanCreateJadwal": false,
                        "statusEnabled": false,
                        "unitKerjaPegawai": {
                            "id": data.unitKerjaPegawaiId
                        },
                        "subUnitKerjaPegawai": {
                            "id":data.subUnitKerjaPegawaiId
                        },
                        "isPrimary": false,
                        "isMonitoring":false
                    })
                } else {
                    if ($scope.item.jabatanInternalPop == "" || $scope.item.jabatanInternalPop == undefined) {
                        toastr.error("jabatan internal belum diisi!");
                        return;
                    }
                    if ($scope.item.unitKerjaPop == "" || $scope.item.unitKerjaPop == undefined) {
                        toastr.error("unit kerja belum diisi!");
                        return;
                    }
                    if ($scope.item.subUnitKerjaPop == "" || $scope.item.subUnitKerjaPop == undefined) {
                        toastr.error("sub unit kerja belum diisi!");
                        return;
                    }
                    if($scope.vals === false){
                        $scope.vals1 = false;
                    }
                    if($scope.item.isPrimary == 'false' || $scope.item.isPrimary == false){ 
                     $scope.item.isMonitoring = false;
                    }
                    dataSend.push({
                        "id": $scope.id ? $scope.id : "",
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
                        "isMonitoring": $scope.item.isMonitoring
                    })
                } 
                ManageSdmNew.saveData(dataSend, "map-pegawai-jabatan-unitkerja/save-map").then(function(res) {
                    $scope.isRouteLoading = true;
                    $timeout(function() {
                        $scope.loadDataGridUnitKerja();
                        $scope.batal();
                    }, 700);
                    
                })

            };

            function customBoolEditor(container, options) {
                var guid = kendo.guid();
                $('<input class="k-checkbox" id="' + guid + '" type="checkbox" name="' + options.field + '" data-type="boolean" data-bind="checked:' + options.field + '">').appendTo(container);
                $('<label class="k-checkbox-label" for="' + guid + '">&#8203;</label>').appendTo(container);
            }

            $scope.createNewJabatanInternal = function() {
                clearPop();
                $scope.popUpJabatan.center().open();
                var actions = $scope.popUpJabatan.options.actions;
                actions.splice(actions.indexOf("Close"), 1);
                $scope.popUpJabatan.setOptions({
                    actions: actions
                });
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
                element.id = $scope.item.id;
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
                    // get ddl jenis jabatan
                    manageSarprasPhp.getDataTableTransaksi("historypegawai/get-drop-down-riwayat-jabatan").then(function(data){
                        $scope.listJenisJabatan = data.data.dataJenisJabatan;
                        $scope.listJabatanInternal = data.data.dataJabatanInternal;
                        $scope.listFungsional = data.data.dataJabatanFungsional;
                        $scope.listPgw = data.data.pegawai;
                        if($scope.listPgw != undefined){
                            $scope.listPgw.push($scope.pegawaiTambah)
                        }
                    });

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
                            field: "nosk",
                            title: "<h3>No SK</h3>",
                            width:"100px" 
                        },
                        {  
                            field: "tglsk",
                            title: "<h3>Tanggal SK</h3>",
                            width:"100px" 
                        }, 
                        {  
                            field: "jenisjabatan",
                            title: "<h3>Jenis Jabatan</h3>",
                            width:"150px" 
                        },
                        {  
                            field: "namajabatan",
                            title: "<h3>Jabatan</h3>",
                            width:"250px" 
                        },
                        {  
                            field: "namalengkapttd",
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
                        }],
                    };
                    loadData();
                };
                
                function loadData(){
					$scope.isRouteLoading=true;
					manageSarprasPhp.getDataTableTransaksi("historypegawai/get-data-riwayat-jabatan?id=" +	$state.params.idPegawai ).then(function(data) {
						$scope.isRouteLoading = false;
						$scope.dataSourceRiwayatJabatan = {	
							data: data.data,
							// _data: data.data,
							pageSize: 30,
							selectable: true,
							refresh: true,
							total: data.data.length,
							serverPaging: false,
						};
					});
                }
                
                function removeRowJabatan(e){
                    e.preventDefault();
                    var grid = this;
                    var row = $(e.currentTarget).closest("tr");
                    var tr = $(e.target).closest("tr");
                    var dataItem = this.dataItem(tr); 
    
                    var dataObjPost ={};	 
    
                    dataObjPost = {
                        norec: dataItem.norec 		 
                    };
                    manageSarprasPhp.saveDataTransaksi("historypegawai/delete-data-riwayat-jabatan",dataObjPost).then(function(e) {					
                        if(e.status === 201){
                            loadData();
                            grid.removeRow(row);
                        }
                        $scope.ClearData(); 
                    })  
                }

                $scope.getDataJabatan = function(){
					if($scope.item.jabatan !== undefined){
						$scope.item.jabatan="";
					}
					if($scope.item.jabatanTtd !== undefined){
						$scope.item.jabatanTtd="";
					}
					if($scope.item.jenisJabatan !== undefined){
						if ($scope.item.jenisJabatan.id === 1) { 
							$scope.listJabatan =$scope.listFungsional;							 
						}  else
						if ($scope.item.jenisJabatan.id === 3) { 
							$scope.listJabatan =$scope.listJabatanInternal; 
						} else{
							$scope.listJabatan=[];
						}	
					}

					
                };
                
                $scope.batalRiwayatJabatan = function(){
					clearField();
					$scope.popUpRiwayat.close();
                };
                
                function clearField(){
					$scope.norec="";
					$scope.item.jenisJabatan =undefined;
					$scope.item.jabatan = undefined;
					$scope.item.jabatanTtd = undefined;
					$scope.item.noSK = "";
					$scope.item.tglSK ="";
					$scope.item.ttdSK =undefined;
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
                    $scope.norec=dataItem.norec;
                    $scope.item.jenisJabatan ={id:dataItem.idjenisjabatan,jenisjabatan:dataItem.jenisjabatan};
                    $scope.getDataJabatan();
                    $scope.item.noSK = dataItem.nosk;
                    $scope.item.tglSK =dataItem.tglsk;
                    $scope.item.ttdSK ={id:dataItem.idpgwttd,namalengkap:dataItem.namalengkapttd,nip_pns:dataItem.nippgwttd};
                    $scope.item.keterangan = dataItem.keterangan; 
                    $scope.item.jabatan = {id:dataItem.idjabatan,namajabatan:dataItem.namajabatan};
                    $scope.item.jabatanTtd = {id:dataItem.idjabatanttd,namajabatan:dataItem.namajabatanttd};
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
                        field: "namatempatpendidikan",title: "Nama Institusi",width:"150px" 
                    },
                    {
                        field: "pendidikan",title: "Profesi",width:"100px" 
                    },
                    {
                        field: "jurusan",title: "Jurusan",width:"150px" 
                    },
                    {
                        field: "tgllulus",title: "Tanggal Kelulusan",width:"100px" 
                    },
                    {
                        field: "nilaiipk",title: "IPK",width:"75px" 
                    },
                    {
                        field: "noijazah",title: "No Ijazah",width:"100px" 
                    },
                    {
                        field: "tglijazah",title: "Tanggal Ijazah",width:"100px" 
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
                    }],
                };

                manageSarprasPhp.getDataTableTransaksi("historypegawai/get-drop-down-riwayat-pendidikan").then(function(data){
					$scope.listPendidikan=data.data.dataPendidikan;
					$scope.listTingkatKelulusan=data.data.dataTingkatKelulusan; 
				});

				modelItemAkuntansi.getDataDummyPHP("jadwaldokter/get-drop-down-pegawai", true, true, 10).then(function(data) {
					$scope.listPgw= data;
                });
                
				manageSarprasPhp.getDataTableTransaksi("historypegawai/get-data-riwayat-pendidikan?id=" +	$state.params.idPegawai ).then(function(data) {
					$scope.isRouteLoading = false;
					for (var i = data.data.length - 1; i >= 0; i--) {
						data.data[i].nilaiipk = parseFloat(Math.round(data.data[i].nilaiipk * 100) / 100).toFixed(2);
					}
					$scope.dataSourcePendidikan = {	
						data: data.data,
						_data: data.data,
						pageSize: 30,
						selectable: true,
						refresh: true,
						total: data.data.length,
						serverPaging: false,
					};
				});
            };

            function changeRowPendidikan(e){
				clearField();
				e.preventDefault();
				var grid = this;
				var row = $(e.currentTarget).closest("tr");
				var tr = $(e.target).closest("tr");
				var dataItem = this.dataItem(tr); 
				$scope.norec = dataItem.norec;
				$scope.item.noSK = dataItem.nosk;
				$scope.item.tglSK = dataItem.tglsk;
				$scope.item.ttdSK = {id:dataItem.idpgwttd,namalengkap:dataItem.namalengkapttd};
				$scope.item.keterangan = dataItem.keterangan; 
				$scope.item.alamat = dataItem.alamattempatpendidikan;
				$scope.item.jurusan = dataItem.jurusan;
				$scope.item.namaTempat = dataItem.namatempatpendidikan;
				$scope.item.ipk = dataItem.nilaiipk;
				$scope.item.noIjasah = dataItem.noijazah;
				$scope.item.pimpinanPendidikan = dataItem.pimpinanpendidikan;
				$scope.item.tglIjasah = dataItem.tglijazah;
				$scope.item.tglLulus = dataItem.tgllulus;
				$scope.item.tglMasuk = dataItem.tglmasuk; 
				$scope.item.ttdIjasah = dataItem.ttdijazah; 
				$scope.item.pendidikan = {id:dataItem.objectpendidikanfk,namalengkap:dataItem.pendidikan};
				$scope.item.tingkatKelulusan = {id:dataItem.objecttingkatkelulusanfk,namalengkap:dataItem.tingkatkelulusan};

				$scope.popUpRiwayatPendidikan.center().open();
			}

			function removeRowPendidikan(e){

				e.preventDefault();
				var grid = this;
				var row = $(e.currentTarget).closest("tr");
				var tr = $(e.target).closest("tr");
				var dataItem = this.dataItem(tr); 

				var dataObjPost ={};	 

				dataObjPost = {
					norec: dataItem.norec 		 
				} 
				manageSarprasPhp.saveDataTransaksi("historypegawai/delete-data-riwayat-pendidikan",dataObjPost).then(function(e) {					
					if(e.status === 201){
						loadData();
						grid.removeRow(row);
					}
					$scope.ClearData(); 	
				})  
            }
            
            $scope.createNewPendidikan = function() {
				$scope.popUpRiwayatPendidikan.center().open();
				var actions = $scope.popUpRiwayatPendidikan.options.actions; 
				actions.splice(actions.indexOf("Close"), 1); 
				$scope.popUpRiwayatPendidikan.setOptions({ actions : actions });
            };
            
            $scope.batalPendidikan = function(){
				clearFieldPendidikan();
				$scope.popUpRiwayatPendidikan.close();
            };
            
            function clearFieldPendidikan(){
                $scope.norec="";
                $scope.item.alamat="";
                $scope.item.jurusan="";
                $scope.item.namaTempat="";
                $scope.item.ipk="";
                $scope.item.noIjasah="";
                $scope.item.pimpinanPendidikan="";
                $scope.item.tglIjasah=$scope.now;
                $scope.item.tglLulus=$scope.now;
                $scope.item.tglMasuk=$scope.now;
                $scope.item.keterangan="";
                $scope.item.ttdIjasah="";
                $scope.item.noSK="";	
                $scope.item.tglSK=$scope.now; 
                $scope.item.ttdSK="";
                $scope.item.pendidikan="";
                $scope.item.tingkatKelulusan="";
            }

            $scope.savePendidikan = function(){
				// debugger;
				if($scope.item.pendidikan == "" || $scope.item.pendidikan == undefined){
					toastr.error("pendidikan belum diisi!");
					return;
				// } if($scope.item.ipk == ""|| $scope.item.ipk == undefined){
				// 	toastr.error("ipk belum diisi!");
				// 	return;
				} if($scope.item.noIjasah == ""|| $scope.item.noIjasah == undefined){
					toastr.error("no Ijasah belum diisi!");
					return;
				} if($scope.item.tglIjasah == ""|| $scope.item.tglIjasah == undefined){
					toastr.error("tanggal Ijasah belum diisi!");
					return;
				} if($scope.item.tglLulus == ""|| $scope.item.tglLulus == undefined){
					toastr.error("tanggal lulus belum diisi!");
					return;
				// }  if($scope.item.tglMasuk == ""|| $scope.item.tglMasuk == undefined){
				// 	toastr.error("tanggal masuk belum diisi!");
				// 	return;
				}  if($scope.item.ipk == ""|| $scope.item.ipk == undefined){
					$scope.item.ipk = 0;
				// } if($scope.item.ipk == ""|| $scope.item.ipk == undefined){
				// 	toastr.error("ipk belum diisi!");
				// 	return;
				// } if($scope.item.noSK == ""|| $scope.item.noSK == undefined){
				// 	toastr.error("no sk belum diisi!");
				// 	return;
				// } if($scope.item.tglSK == ""|| $scope.item.tglSK == undefined){
				// 	toastr.error("tanggal sk belum diisi!");
				// 	return;
				// }  if($scope.item.ttdSK == ""|| $scope.item.ttdSK == undefined){
				// 	toastr.error("tanda tangan sk belum diisi!");
				// 	return;
				}  

				var dataObjPost ={};	 

				dataObjPost = { 
					norec : $scope.norec, 
					statusenabled : true,
					alamattempatpendidikan : $scope.item.alamat,
					jurusan : $scope.item.jurusan,
					namatempatpendidikan : $scope.item.namaTempat,
					nilaiipk : $scope.item.ipk,
					noijazah : $scope.item.noIjasah,
					pimpinanpendidikan : '',//$scope.item.pimpinanPendidikan,
					tglijazah : moment($scope.item.tglIjasah).format('YYYY-MM-DD'),
					tgllulus : moment($scope.item.tglLulus).format('YYYY-MM-DD'), 
					tglmasuk : null,//$scope.item.tglMasuk,
					keterangan :'',//$scope.item.keterangan,
					ttdijazah :'',//$scope.item.ttdIjasah,
					nosk : '',//$scope.item.noSK,	
					tglsk : null,//$scope.item.tglSK,
					objectpegawaifk : $state.params.idPegawai,
					objectpegawaittdfk: null,//$scope.item.ttdSK.id,
					objectpendidikanfk:  $scope.item.pendidikan.id,
					objecttingkatkelulusanfk :  4 //$scope.item.tingkatKelulusan.id (status tingkat kelulusan id 4 = -)
				} 
				manageSarprasPhp.saveDataTransaksi("historypegawai/save-riwayat-pendidikan",dataObjPost).then(function(e) {
				})   
				$scope.batal();
				loadData();
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
                $scope.isSimpan = false;
                $scope.isEdit = true;
            };

            $scope.kembali = function () {  
                window.history.back();
            };

            $scope.batalUbahDataPegawai = function() {
                $scope.isSimpan = true;
                $scope.isEdit = false;
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
                $scope.item.namaPegawai = `${$scope.item.gelarDepan}. ${$scope.item.nama}, ${$scope.item.gelarBelakang}`;
                if(($scope.item.gelarDepan === '' || $scope.item.gelarDepan === undefined) && 
                    ($scope.item.nama === '' || $scope.item.nama === undefined) &&
                    ($scope.item.gelarBelakang === '' || $scope.item.gelarBelakang === undefined)) {
                        $scope.item.namaPegawai = ''
                } else if(($scope.item.gelarDepan === '' || $scope.item.gelarDepan === undefined)) {
                    $scope.item.namaPegawai = `${$scope.item.nama}, ${$scope.item.gelarBelakang}`;
                } else if(($scope.item.gelarBelakang === '' || $scope.item.gelarBelakang === undefined)) {
                    $scope.item.namaPegawai = `${$scope.item.gelarDepan}. ${$scope.item.nama}`;
                }
            };

            $scope.saveDataIndetitasPegawai = function () {

                // var dataIdentitas = {
                //     agama: $scope.item.agama ? $scope.item.agama.id: '',
                //     alamat: $scope.item.alamat ? $scope.item.alamat : '',
                //     bankRekeningAtasNama: $scope.item.bankRekeningAtasNama ? $scope.item.bankRekeningAtasNama : '',
                //     bankRekeningNomor: $scope.item.bankRekeningNomor ? $scope.item.bankRekeningNomor : '',
                //     bankRekeningNama: $scope.item.bankRekeningNama ? $scope.item.bankRekeningNama : '',

                //     // detailKategoryPegawai: $scope.item.kategoryPegawai,

                //     email: $scope.item.email,
                //     emailAlternatif: $scope.item.email,

                //     eselon: $scope.item.eselon ? $scope.item.eselon.id : '',

                //     gelarBelakang: $scope.item.gelarBelakang ? $scope.item.gelarBelakang : '',
                //     gelarDepan: $scope.item.gelarDepan ? $scope.item.gelarDepan: '',
                //     golonganDarah: $scope.item.golonganDarah ? $scope.item.golonganDarah : '',

                //     grade: $scope.item.grade,
                //     idFinger: $scope.item.idFinger,

                    
                    
                //     noIdentitas: $scope.item.noIdentitas,
                //     jabatanInternal: $scope.jabatanFungsional.id, // Jabatan Fungsional
                //     // jabatanLamar
                //     // jabatanStruktural

                //     jenisKelamin:$scope.item.jenisKelamin.jenisKelamin,
                //     // jenisPegawai: 
                    
                //     // jenisPegawai
                //     // jenisPegawaiLamar
                //     kategoriPegawai: $scope.item.kategoryPegawai.id,
                //     kedudukan: $scope.item.kedudukan.id,
                //     // kelompokJabatan
                //     kodePos: $scope.item.kodePos,

                //     // kualifikasiJurusan
                //     // levelTingkat

                //     nama: $scope.item.nama,
                //     namaLengkap: $scope.item.namaPegawai,

                //     golonganId: $scope.golonganPegawai.id,
                    
                //     namaNegara: $scope.item.negara.namaNegara,
                //     // namaPendidikan
                //     ruanganId: $scope.ruanganPegawai.id,

                //     // nikIntern: $scope.item.nipPns,
                //     nip: $scope.item.nipPsn,
                //     nipPns: $scope.item.nipPns,

                //     nilaiJabatan: $scope.item.nilaiJabatan,
                //     noHandphone: $scope.item.Handphone,
                //     noTelp: $scope.item.noTlp,
                //     // noCm

                //     noSip: $scope.item.noSip,
                //     // tglTerbitSip: $scope.item.tglTerbitSip ? new Date($scope.item.tglTerbitSip) : '',
                //     // tglBerakhirSip: $scope.item.tglBerakhirSip ? new Date($scope.item.tglBerakhirSip): '',
                //     // noStr: $scope.item.noStr,
                //     // tglTerbitStr: $scope.item.tglTerbitStr ? new Date($scope.item.tglTerbitStr) : '',
                //     // tglBerakhirStr: $scope.item.tglBerakhirStr ? new Date($scope.item.tglBerakhirStr) : '',

                //     npwp: $scope.item.npwp,
                //     // penghasilanTidakKenaPajak

                //     // qtyAnak
                //     // qtyTanggungan
                //     // qtyTotalJiwa
                    
                //     // rhesusGolonganDarah
                //     // satuanKerja
                //     shiftKerja: $scope.item.shiftKerja.id,
                //     // statusKawin

                //     tempatLahir: $scope.item.tempatLahir,
                //     tglLahir: $scope.item.tglLahir,
                    
                //     tglMeninggal: $scope.item.tglMeninggal ? $scope.item.tglMeninggal : '',
                //     statusPerkawinanPegawai: $scope.item.statusPerkawinanPegawai.statusPerkawinan

                // };
                // var dataIdentitas = {
                //     email: $scope.item.email,
                // };
                var dataIdentitas = {
                    "nama":$scope.item.nama,
                    "gelarBelakang":$scope.item.gelarBelakang ? $scope.item.gelarBelakang : '',
                    "tempatLahir":$scope.item.tempatLahir,
                    "tglLahir":$scope.item.tglLahir,
                    "jenisKelamin":{
                        "jenisKelamin":$scope.item.jenisKelamin.jenisKelamin,
                        "id":$scope.item.jenisKelamin.id
                    },
                    "kategoryPegawai":{
                        "kategoryPegawai":$scope.item.kategoryPegawai.kategoryPegawai,
                        "id":$scope.item.kategoryPegawai.id
                    },
                    "kedudukan":{
                        "name":$scope.item.kedudukan.name,
                        "id":$scope.item.kedudukan.id
                    },
                    "statusEnabled":true,
                    "tglMasuk":$scope.item.tglMasuk,
                    "statusPerkawinanPegawai":{
                        "statusPerkawinan":$scope.item.statusPerkawinanPegawai.statusPerkawinan,
                        "id":$scope.item.statusPerkawinanPegawai.id
                    },
                    "bankRekeningNomor":$scope.item.bankRekeningNomor ? $scope.item.bankRekeningNomor : '',
                    "bankRekeningAtasNama":$scope.item.bankRekeningAtasNama ? $scope.item.bankRekeningAtasNama : '',
                    "bankRekeningNama":$scope.item.bankRekeningNama ? $scope.item.bankRekeningNama : '',
                    "npwp":$scope.item.npwp ? $scope.item.npwp : '',
                    "alamat":$scope.item.alamat ? $scope.item.alamat : '',
                    "kodePos":$scope.item.kodePos ? $scope.item.kodePos : '',
                    "agama":{
                        "agama":$scope.item.agama ? $scope.item.agama.agama: '',
                        "id":$scope.item.agama ? $scope.item.agama.id: ''
                    },
                    "idFinger":$scope.item.idFinger,
                    "shiftKerja":{
                        "name": $scope.item.shiftKerja ?  $scope.item.shiftKerja.name : '',
                        "id":$scope.item.shiftKerja ?  $scope.item.shiftKerja.id : ''
                    },
                    "namaLengkap":$scope.item.namaPegawai,
                    "id":$state.params.idPegawai ? $state.params.idPegawai : '',
                    "email":$scope.item.email ? $scope.item.email: '',
                    "emailAlternatif":$scope.item.emailLainnya ? $scope.item.emailLainnya: '',
                    "gelarDepan":$scope.item.gelarDepan ? $scope.item.gelarDepan: '',
                    "grade":$scope.item.grade ? $scope.item.grade: '',
                    "kodeBank": $scope.item.kodeBank,
                    // "idKodeGapok": "1",
                    "levelTingkat":{
                        "id":1,
                        "levelTingkat":"TK.I"
                    },
                    "nilaiJabatan":$scope.item.nilaiJabatan,
                    "nikIntern":$scope.item.nipPns,
                    "nip":$scope.item.nipPns,
                    "nipPns":$scope.item.nipPns,
                    // "nikIntern":$scope.item.nipPns !== 'PNS' ? $scope.item.nipPns : '',
                    // "nip":$scope.item.nipPns === 'PNS' ? $scope.item.nipPns : '',
                    // "nipPns":$scope.item.nipPns === 'PNS' ? $scope.item.nipPns : '',
                    "noBPJS":$scope.item.noBPJS,
                    "noCm":$scope.item.noCm,
                    "noHandphone":$scope.item.Handphone,
                    "noIdentitas":$scope.item.nik,
                    "noSip":$scope.item.noSip,
                    "noStr":$scope.item.noStr,
                    "noTlp":$scope.item.noTlp,
                    "detailKategoryPegawai":{
                        "id":$scope.item.detailKategoriPegawai.id,
                        "detailKategoryPegawai":$scope.item.detailKategoriPegawai.kategoryPegawai
                    },
                    // "dokumen":{
                    //     "id":1,
                    //     "namaJudulDokumen":"Surat Masuk Lamaran"
                    // },
                    "eselon":{
                        "id": $scope.item.eselon ? $scope.item.eselon.id : '',
                        "eselon": $scope.item.eselon ? $scope.item.eselon.eselon : ''
                    },
                    "golonganDarah":{
                        "id":$scope.item.golonganDarah.id,
                        "golonganDarah":$scope.item.golonganDarah.name
                    },
                    "golonganPegawai":{
                        "id":$scope.golonganPegawai.id,
                        "golonganPegawai":$scope.golonganPegawai.name
                    },
                    "jabatanFungsional":{
                        "id":$scope.jabatanFungsional.id,
                        "namaJabatan":$scope.jabatanFungsional.namaJabatan
                    },
                    // "jabatanLamar":{
                    //     "id":$scope.jabatanFungsional.id,
                    //     "namaJabatan":$scope.jabatanFungsional.namaJabatan
                    // },
                    // "jabatanStruktural":{
                    //     "id":1418,
                    //     "namaJabatan":"Sistem Analis dan Programmer"
                    // },
                    "jenisPegawai":{
                        "id":$scope.item.jenisPegawai.id,
                        "jenisPegawai":$scope.item.jenisPegawai.jenisPegawai
                    },
                    // "jenisPegawaiLamar":{
                    //     "id":4,
                    //     "jenisPegawai":"SIMRS"
                    // },
                    "detailKelompokJabatan":{
                        "id":27,
                        "detailKelompokJabatan":"OPERASIONAL STAF (OS5)"
                    },
                    "kualifikasiJurusan":{
                        "id":73,
                        "kualifikasiJurusan":"S1-Sarjana Fisika"
                    },
                    "pangkat":{
                        "id":9,
                        "namaPangkat":"Penata Muda"
                    },
                    "pendidikan":{
                        "id":9,
                        "namaPendidikan":"S1"
                    },
                    "penghasilanTidakKenaPajak":{
                        "id":18,
                        "deskripsi":"Deskripsi"
                    },
                    "rekanan":{
                        "id":5128,
                        "namaRekanan":"INDOFARMA GLOBAL MEDIKA, PT"
                    },
                    "ruangan":{
                        "id":1,
                        "namaRuangan":"Inst.Teknologi & Informasi"
                    },
                    "satuanKerja":{
                        "id":84,
                        "satuanKerja":"Instalasi Teknologi & Informasi"
                    },
                    "suku":{
                        "id":2,
                        "suku":"Sunda"
                    },
                    "typePegawai":{
                        "id":1
                    },
                    "pensiun":58,
                    "tglPensiun":2548195199,
                    "qtyAnak":0,
                    "qtyTanggungan":1,
                    "qtyTotalJiwa":4,
                    "statusRhesus":"+",
                    "totalNilaiScore":90.9,
                    "tunjanganFungsional":"1.000.000",
                    "tunjanganPapua":0,
                    "tunjanganUmum":4000000,
                    "tglTerbitStr": null,
                    "tglBerakhirStr": null,
                    "tanggalMeninggal": null,
                    "tglTerbitSip": null,
                    "tglBerakhirSip": null,
                    "tglKeluar": null,
                };
                console.log(dataIdentitas);

                // var dataKepegawaian = {
                //     // ruangan: $scope.ruanganPegawai,
                //     golonganPegawai: $scope.golonganPegawai,
                //     tglMasuk: $scope.item.tglMasuk,
                //     tglkeluar: $scope.item.tglkeluar,
                //     // pensiun:
                //     // tglPensiun
                // };
                // console.log(dataSave);
                ManageSdmNew.saveData(dataIdentitas, "sdm/save-rekam-data-pegawai").then(function(dat) {
                     
                });
            };

            $scope.getDetailKategoriPegawai = function(idK) {
                ManageSdm.getOrderList("service/list-generic/?view=DetailKategoryPegawai&select=id,detailKategoryPegawai&criteria=statusEnabled,kategoryPegawaiId&values=true," + idK.id, true).then(function(res) {
                    $scope.listOfDetailJenisKategoriPegawai = res;                    
                    // console.log(res);
                });
            };
            // $scope.$watch()
        }
    }]);
});