define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('RekamDataPegawaiCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'ManageSdm', 'ManageSdmNew', 'DateHelper', 'FindPegawai', 'FindSdm', '$timeout', 'ManageSarprasPhp',
        function($q, $rootScope, $scope, ModelItem, $state, ManageSdm, ManageSdmNew, dateHelper, FindPegawai, FindSdm, $timeout, manageSarprasPhp) {
            $scope.ubahMappingAtasan = false;
            $scope.dataVOloaded = true;  
            $scope.showMonitor = false;
            $scope.gridJabatanInternal = {
                toolbar: [{
                    name: "create",
                    text: "Buat Jabatan Internal Baru",
                    template: '<button ng-click="createNew()" class="k-button k-button-icontext k-grid-upload" href="\\#"><span class="k-icon k-i-plus"></span>Buat Riwayat</button>'
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
                    }

                    ],
                /*  save: function(e){
                      if(e.model.dirty) $scope.simpanJabatan(e.model);
                  }*/
              }

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
            }  
            function filterSubUnit2(items) {
                return items.unitKerjaId == $scope.item.unitKerjaPop.id;
            }

            $scope.$watch('item.subUnitKerja', function(newVal, oldVal){
                if(newVal && newVal !== oldVal) {
                    // $scope.isLoading = true;
                    var arrSubUnit = $scope.ListSubUnitKerja;
                    if($scope.item.unitKerja && ($scope.item.unitKerja.unitKerjaId !== newVal.id)) delete $scope.item.unitKerja;
                    // FindSdm.getSubUnitKerjaById(newVal.id).then(function(res){
                    //     $scope.ListSubUnitKerja = res.data.data;
                    //     $scope.isLoading = false;
                    // })
                    $scope.filteredSubUnit = arrSubUnit.filter(filterSubUnit);
                }
            })
            function filterSubUnit(items) {
                return items.unitKerjaId == $scope.item.subUnitKerja.id;
            }
            $scope.Back = function() {
                if ($state.params.idPegawai !== "") {
                    window.history.back();
                } else {
                    $scope.item = {};
                    // init();
                }
            }
            $scope.createNew = function() {
                clearPop();
                $scope.popUpJabatan.center().open();
                var actions = $scope.popUpJabatan.options.actions;
                actions.splice(actions.indexOf("Close"), 1);
                $scope.popUpJabatan.setOptions({
                    actions: actions
                });
            };

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
                    // console.log(JSON.stringify(newModel));

                    // if (($scope.item.jabatanInternalPop == "" || $scope.item.jabatanInternalPop == undefined) && ($state.params.idPegawai != "" || $state.params.idPegawai != undefined)) {
                    //     toastr.error("jabatan internal belum diisi!");
                    //     return;
                    // }

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
                            getDataPegawai();
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

            function formatDate(tanggal) {
                if (!(_.contains(tanggal, '-'))) {
                    tanggal = dateHelper.formatDate(tanggal, "DD-MM-YYYY")
                }
                var res = tanggal.split("-");
                return res[1] + "-" + res[0] + "-" + res[2];
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
            })

            function isDate(value) {
                return value instanceof Date;
            };
            $scope.hapusPegawai = function() {
                // show confirm window dialog
                $scope.confirmDialog.center().open();;
            }

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
            }

            function init() {
                $scope.isRouteLoading = true;

                if ($state.params.idPegawai) {

                }

                $q.all([
                    //  ManageSdm.getOrderList("jabatan/get-all-jabatan-struktural"),
                    // ManageSdm.getOrderList("service/list-generic/?view=Jabatan&select=id,namaJabatan&criteria=jenisJabatanId,statusEnabled&values=1,true", true),
                    // ManageSdm.getOrderList("service/list-generic/?view=Jabatan&select=id,namaJabatan&criteria=jenisJabatan,statusEnabled&values=3,true", true),
                    // ManageSdm.getOrderList("service/list-generic/?view=Pendidikan&select=id,namaExternal&criteria=statusEnabled&values=true", true),
                    // manageSarprasPhp.getDataTableTransaksi("historypegawai/get-drop-down-riwayat-jabatan-registered?id=" + $state.params.idPegawai),
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
                    // FindSdm.getUnitKerja(),
                    ManageSdmNew.getListData("sdm/get-all-sub-unit-kerja"),
                    // FindSdm.getSubUnitKerja(),
                    ManageSdmNew.getListData("sdm/get-all-kedudukan"),
                    ManageSdmNew.getListData("sdm/get-detail-kelompok-jabatan"),
                    ManageSdmNew.getListData("sdm/get-riwayat-jabatan?idPegawai="+$state.params.idPegawai+"&idJenisJabatan=1")
                    ]).then(function(res) {
                    // $scope.ListJabatanStruktural = res[0].data.data;

                    // if(res[0].data){
                    //     $scope.ListJabatanFungsional = res[0].data.dataJabatanFungsional;
                    //     $scope.ListJabatanInternal = res[0].data.dataJabatanInternal;
                    //     $scope.ListJabatanInternalPop = res[0].data.dataJabatanInternal;
    
                    // }

                    if(res[0].data){
                        $scope.ListJabatanInternal = res[0].data.data.dataJabatanInternal;
                        $scope.ListJabatanInternalPop = res[0].data.data.dataJabatanInternal;
    
                    }

                    if(res[14].data){
                        $scope.ListJabatanFungsional = res[14].data.data.dataJabatanFungsional;
    
                    }
                    
                    if ($state.params.idPegawai){
                        $scope.isEdit=true;
                    } else {
                        $scope.isEdit=false;
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
                    getDataPegawai()
                }, (error) => {
                    throw (error);
                });
                }

                function getDataPegawai() {
                if ($state.params.idPegawai) { // Check parameter noRec pegawai in the url
                    $scope.isMenuDataPegawai = true; // show tombol hapus
                    $scope.isRouteLoading = true; // show loading icon
                    $q.all([
                        ManageSdmNew.getListData("pegawai/get-pegawai-by-customs/" + $state.params.idPegawai)
                        ]).then(function(res) {
                            if (res[0].statResponse) {
                                $scope.item = res[0].data.data;
                                $scope.item.id = $state.params.idPegawai;
                                $scope.item.qPegawai = $state.params.idPegawai;
                                $scope.item.namaPegawai = res[0].data.data.namaLengkap;
                                if ($scope.item.golonganPegawaiId) $scope.item.golonganPegawai = {
                                    id: $scope.item.golonganPegawaiId
                                };
                                if ($scope.item.unitKerja) {
                                    $scope.ListUnitKerja.forEach(function(element) {
                                        if (element.id === res[0].data.data.unitKerja.unitKerjaId) {
                                            $scope.item.subUnitKerja = element;
                                            return true;
                                        }
                                    });
                                };
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
                    })
                    } else {
                        $scope.now = new Date();
                        $scope.item = {};
                        $scope.isRouteLoading = false;
                        $scope.disableSip = true;
                        $scope.disableStr = true;
                    }
                    $scope.loadDataGrid();
                    $scope.isRouteLoading = false;
                };
                $scope.loadDataGrid = function() {
                    var grid = $("#grid").data("kendoGrid");

                    if ($state.params.idPegawai) {
                        ManageSdmNew.getListData("map-pegawai-jabatan-unitkerja/get-map-by-pegawai/" + $state.params.idPegawai).then(function(data) {
                            $scope.dataSource = data.data.data.data;

                            $scope.isRouteLoading = false;
                        }, (error) => {
                            $scope.isRouteLoading = false;
                            throw error;
                        });
                    }
                }

                $scope.getGradeJbtn = function(e) {
                    if (!e.id) return;
                    $scope.item.grade = e.grade;
                }

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
            $scope.listIdKedudukan = [3, 4, 5, 24, 25]; // input kedudukan pegawai yang dijadikan parameter untuk set statusEnabled pegawai = false
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
                        $scope.loadDataGrid();
                        $scope.batal();
                    }, 700)
                    
                })

            }
            init();

            function getIndexById(id) {
                var idx,
                l = mapJabatanPegawai.length;

                for (var j = 0; j < l; j++) {
                    if (mapJabatanPegawai[j].id == id) {
                        return j;
                    }
                }
                return null;
            }

            function customBoolEditor(container, options) {
                var guid = kendo.guid();
                $('<input class="k-checkbox" id="' + guid + '" type="checkbox" name="' + options.field + '" data-type="boolean" data-bind="checked:' + options.field + '">').appendTo(container);
                $('<label class="k-checkbox-label" for="' + guid + '">&#8203;</label>').appendTo(container);
            }
 
            $scope.changeCB = function () {
                if($scope.item.isPrimary !== undefined){ 
                    if($scope.item.isPrimary == 'true' || $scope.item.isPrimary == true){
                        $scope.muncul = true;
                    }else{
                      $scope.muncul = false; 
                 }
                }
            }
        }


        ]);
});