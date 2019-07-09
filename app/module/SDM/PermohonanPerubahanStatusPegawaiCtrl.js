define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('PermohonanPerubahanStatusPegawaiCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', 'ManageSdm', 'ManageSdmNew', 'DateHelper', '$mdDialog', 'CetakHelper', '$state', 'ManageSarprasPhp', '$timeout',
        function($q, $rootScope, $scope, ModelItem, ManageSdm, ManageSdmNew, DateHelper, $mdDialog, cetakHelper, $state, manageSarprasPhp, $timeout) {
            var cekLokal = localStorage.getItem('DataPerubahanStatus');
            $scope.pegawai = JSON.parse(localStorage.getItem('pegawai'));
            if (cekLokal) {
                localStorage.removeItem('DataPerubahanStatus');
            };
            $scope.item = {};
            var urlDaftarPermohonan;
            var listPegawaiAdminSDM = [];
            $scope.now = new Date();
             $scope.titlePelimpahan =''
            function twoDaysAfter(date) {
                var newDate = date;

                newDate.setDate(newDate.getDate() + 2);

                var dd = newDate.getDate(),
                    mm = newDate.getMonth() + 1,
                    yy = newDate.getFullYear();

                if (dd.length < 10) {
                    dd = "0" + dd;
                }

                return yy + "-" + mm + "-" + dd;
            }
            $scope.next2days = new Date().setDate(new Date().getDate() + 2);
            $scope.monthSelectorOptions = {
                start: "year",
                depth: "year"
            };
            $scope.datePickerOptions = {
                format: 'dd-MM-yyyy',
                change: onChangeDate
                // min: twoDaysAfter($scope.now)
            }

            function onChangeDate(e) {
                if ($scope.tanggalPermohonan.length > 1) {
                    var lastModel = $scope.tanggalPermohonan.length - 1;
                    for (var i = 0; i < $scope.tanggalPermohonan.length; i++) {
                        if (i < lastModel && kendo.toString($scope.tanggalPermohonan[i].tgl, "MM/dd/yyyy") === kendo.toString(this.value(), "MM/dd/yyyy")) {
                            if($scope.item.statusPegawai.id != 24 && $scope.item.statusPegawai.id != 25 && $scope.item.statusPegawai.id != 29) {
                                toastr.error("Tanggal " + kendo.toString(this.value(), "dd/MM/yyyy") + " sudah diajukan", "Peringatan");
                                $scope.tanggalPermohonan[lastModel].tgl = "";
                                $(this.element).closest('span').addClass("duplicateDate");
                                $(this.element).parent('span').addClass("duplicateDate");
                                this.value("");
                            }
                        } else {
                            $(this.element).closest('span').removeClass("duplicateDate");
                            $(this.element).parent('span').removeClass("duplicateDate");
                        }
                    }
                }
            }
            $scope.addNewTgl = function() {
                // debugger
                var listRawRequired = [
                    "item.namaPegawai|k-ng-model|Nama pegawai",
                    "item.statusPegawai|k-ng-model|Status kehadiran"
                ];
                var isValid = ModelItem.setValidation($scope, listRawRequired);
                if (isValid.status) {
                    var lastDate = $scope.tanggalPermohonan.length - 1;
                    if ($scope.tanggalPermohonan[lastDate].tgl instanceof Date ) {
                        if ($scope.item.statusPegawai.id == 27 || $scope.item.statusPegawai.id == 26 || $scope.item.statusPegawai.id == 28) {
                            var newItemNo = $scope.tanggalPermohonan.length + 1;
                            $scope.tanggalPermohonan.push({
                                id: newItemNo,
                                tgl: "dd/MM/yyyy"
                            })
                        } else if ($scope.item.statusPegawai.id == 24 || $scope.item.statusPegawai.id == 25) {
                            if ($scope.tanggalPermohonan.length < 2) {
                                var newItemNo = $scope.tanggalPermohonan.length + 1;
                                $scope.tanggalPermohonan.push({
                                    id: newItemNo,
                                    tgl: "dd/MM/yyyy"
                                })
                            } else {
                                messageContainer.error('Tanggal terdiri dari tanggal awal dan tanggal akhir (periode)')
                            }
                        //untuk sakit
                        } else if ($scope.item.statusPegawai.id == 29) {
                            if ($scope.tanggalPermohonan.length < 2) {
                                var newItemNo = $scope.tanggalPermohonan.length + 1;
                                $scope.tanggalPermohonan.push({
                                    id: newItemNo,
                                    tgl: "dd/MM/yyyy"
                                })
                            }else {
                                messageContainer.error('Tanggal terdiri dari tanggal awal dan tanggal akhir (periode)')
                            }
                        //untuk cuti tahunan
                        } else if ($scope.item.statusPegawai.id == 1) {


                            var jumlahCutiN3=12
                            if($scope.item.jumlahCutiN3==undefined||$scope.item.jumlahCutiN3==null||$scope.item.jumlahCutiN3==0){
                                jumlahCutiN3=$scope.item.jumlahCutiN3
                            }



                            var isBolehCuti=false
                            if($scope.item.sisaCuti+$scope.item.jumlahCutiN3>24 && $scope.item.isTangguhkanN1==true && $scope.tanggalPermohonan.length<24+$scope.item.sisaCutiN1){
                                isBolehCuti=true
                            }else if($scope.item.sisaCuti+$scope.item.jumlahCutiN3>24 && $scope.item.isTangguhkanN1==false && $scope.tanggalPermohonan.length<24){
                                isBolehCuti=true
                            }else if($scope.item.sisaCuti+$scope.item.jumlahCutiN3<=24 && $scope.item.isTangguhkanN1==true && $scope.tanggalPermohonan.length<$scope.item.sisaCutiN1+$scope.item.sisaCuti+$scope.item.jumlahCutiN3){
                                isBolehCuti=true
                            }else if($scope.item.sisaCuti+$scope.item.jumlahCutiN3<=24 && $scope.item.isTangguhkanN1==false && $scope.tanggalPermohonan.length<$scope.item.sisaCuti+$scope.item.jumlahCutiN3){
                                isBolehCuti=true
                            }

                            if(!isBolehCuti){
                                toastr.warning('Jumlah tanggal permohonan melebihi jatah cuti tahunan yang ditetapkan !')
                                return 
                            }    


                            var newItemNo = $scope.tanggalPermohonan.length + 1;
                            $scope.tanggalPermohonan.push({
                                id: newItemNo,
                                tgl: "dd/MM/yyyy"
                            })

                        } else {
                            messageContainer.error('Jumlah sisa cuti tidak cukup, Jumlah sisa cuti anda : ' + $scope.item.sisaCuti + ' hari')
                        }
                    } else if($scope.item.statusPegawai.id == 24 || $scope.item.statusPegawai.id == 25 || $scope.item.statusPegawai.id == 29) {
                            
                            if($scope.item.statusPegawai.id == 29){
                                    if($scope.loginUser.idPegawai==$scope.item.namaPegawai.id){
                                        if ($scope.tanggalPermohonan.length < 2) {
                                            var newItemNo = $scope.tanggalPermohonan.length + 1;
                                            $scope.tanggalPermohonan.push({
                                                id: newItemNo,
                                                tgl: "dd/MM/yyyy"
                                            })
                                        } else {
                                            messageContainer.error('Tanggal terdiri dari tanggal awal dan tanggal akhir (periode)')
                                        }
                                    }     
                            }else {

                                
                                    if ($scope.tanggalPermohonan.length < 2) {
                                        var newItemNo = $scope.tanggalPermohonan.length + 1;
                                        $scope.tanggalPermohonan.push({
                                            id: newItemNo,
                                            tgl: "dd/MM/yyyy"
                                        })
                                    } else {
                                        messageContainer.error('Tanggal terdiri dari tanggal awal dan tanggal akhir (periode)')
                                    }
                                    
                            }


                             
                            
                   }else {

                        messageContainer.error('Tanggal yang diajukan belum dipilih.')
                    }
                } else {
                    ModelItem.showMessages(isValid.messages);
                }
            }
            
            $scope.showAddTgl = function(current) {
                return current.id === $scope.tanggalPermohonan[$scope.tanggalPermohonan.length - 1].id;
            }

            $scope.removeNewTgl = function(id) {
                if (id == 1) return;

                if($scope.item.statusPegawai.id == 24 || $scope.item.statusPegawai.id == 25 || $scope.item.statusPegawai.id == 29) {
                
                }else{

                        if($scope.tanggalPermohonan.length>1){
                                for (var i = 0; i < $scope.tanggalPermohonan.length; i++) {
                                    if (id == $scope.tanggalPermohonan[i].id) {
                                        $scope.tanggalPermohonan.splice(i, 1);
                                        break;
                                    }
                                }    
                        }
                        

                }

                
            }

            $scope.mainGridOptions = {
                pageable: true,
                selectable: true,
                columns: [

                    {
                        "field": "noRec",
                        "title": "noRec",
                        "hidden":"true"
                    },
                    {
                        "field": "statusEnabled",
                        "title": "Status Enabled",
                        "hidden":"true"
                    },
                    {
                        "field": "noPlanning",
                        "title": "No Usulan"
                    },
                    {
                        "field": "namaPegawai",
                        "title": "Nama Pegawai"
                    },
                    {
                        "field": "namaJabatan",
                        "title": "Jabatan"
                    },
                    {
                        "field": "unitKerja",
                        "title": "Sub Unit Kerja"
                    },
                    {
                        "field": "deskripsiStatusPegawaiPlan",
                        "title": "Deskripsi Usulan"
                    },
                    {
                        "field": "tglPengajuan",
                        "title": "Tgl Usulan",
                        "template": "#= kendo.toString(new Date(tglPengajuan), 'dd-MM-yyyy') #",
                        width: 100
                    },
                    {
                        "field": "statusPegawai",
                        "title": "Status Usulan"
                    },
                    {
                        "field": "lisTanggal",
                        "title": "Tgl Permohonan",
                        "template": "# for(var i=0; i < lisTanggal.length;i++){# <button class=\"k-button custom-button\" style=\"margin:0 0 5px\">#= kendo.toString(new Date(lisTanggal[i].tgl), \"dd-MM-yyyy\") #</button> #}#",
                    },
                    {
                        "field": "listTanggalCutiDisetujui",
                        "title": "Tgl Permohonan Disetujui",
                        "template": "# for(var i=0; i < listTanggalCutiDisetujui.length;i++){# <button class=\"k-button custom-button\" style=\"margin:0 0 5px\">#= kendo.toString(new Date(listTanggalCutiDisetujui[i].tgl), \"dd-MM-yyyy\") #</button> #}#",
                    },
                    {
                        "field": "approvalStatus",
                        "title": "Persetujuan",
                        "template": "#if(approvalStatus===0){# Belum diputuskan #} else if(approvalStatus===1) {# Disetujui #} else if(approvalStatus===2) {# Ditolak #} else {# Ditangguhkan #}#",
                        width: 100
                    },

                    
                    {
                        "field": "isCutiLuarNegeri",
                        "title": "Status Cuti Luar Negeri",
                        "hidden": "true"
                    },
                    
                    // {template: '<button class="k-button" ng-click="cetakSuratPengajuan(dataItem)">Cetak</button>' }
                    {
                        "command": [
                            {
                                text: "Cetak",
                                click: cetakSuratPengajuan,
                                imageClass: "k-icon k-i-download"
                            }, 

                            {
                                text: "Edit",
                                click: showDetails,
                                imageClass: "k-icon k-i-pencil"
                            },

                            // {
                            //     text: "Penangguhan",
                            //     click: penangguhan
                                
                            // },

                        ]
                    },

                   

                    {
                        "field": "eselonId",
                        "title": "Pelimpahan",
                      // headerTemplate: kendo.template('# if (eselonId>=7) { # <input type="checkbox" id="check-all" /><label for="check-all">Check All</label> # } else { # this will never be displayed # } #'),
                        "template": "#if(eselonId<=7&&eselonId!=0){# <button ng-click='cetakPelimpahanTugas(dataItem)'  class='k-button k-button-icontext k-grid-Cetak'><span class='k-icon k-i-download'></span>Cetak</button> #} else {#  #}#",
                        width: 100
                    }
                   
                ]
            };
            $q.all([
                ManageSdmNew.getListData("sdm/get-login-user-permohonan-status"),
                ManageSdmNew.getListData("pegawai/get-all-jabatan"),
                ManageSdmNew.getListData("pegawai/get-all-jabatan"),
                ManageSdmNew.getListData("pegawai/get-pegawai-sdm-for-cred")
                // ManageSdm.findPegawaiById(ModelItem.getPegawai().id)
            ]).then(function(result) {
                if (result[0].statResponse) {
                    $scope.loginUser = result[0].data.data;
                    load();
                    $scope.loadGrid();
                }
                if (result[1].statResponse) {
                    $scope.listAllJabatan = result[1].data.data;
                }
                if (result[2].statResponse) {
                    $scope.listAllJabatan = result[2].data.data;
                }
                if (result[3].statResponse) {
                    listPegawaiAdminSDM = result[3].data.data;
                }
                // $scope.condition base if bagian sdm can view all permohonan perubahan status kehadiran
                // uncomment codes below to activate
                // if(result[2].statResponse){
                //  if(result[2].data.data.subUnitKerja.indexOf("Sub Bagian Kesejahteraan Pegawai") >= 0){
                //      urlDaftarPermohonan = "sdm/get-list-approval-status?namaPegawai=";
                //  } else {
                //      urlDaftarPermohonan = "sdm/get-list-approval-status?namaPegawai="+pegawaiLogin.nama
                //  }
                // }
            })
            // ManageSdm.getItem("sdm/get-login-user-permohonan-status", true).then(function(dat){
            //  $scope.loginUser = dat.data.data;
            //  load();
            //  $scope.loadGrid();
            // }, function(err){
            //  console.log('error get user login data');
            // });
            var load = function() {
                $scope.item = {
                    tglPengajuan: new Date()
                };
                $scope.tanggalPermohonan = [{
                    id: 1,
                    tgl: "",
                    isDuplicate: false
                }]
                //ManageSdm.getItem("sdm/get-load-permohonan-status?ruanganId="+$scope.loginUser.idRuangan, true).then(function(dat){
                ManageSdmNew.getListData("sdm/get-load-permohonan-status?subUnitKerjaId=" + $scope.loginUser.idSubUnitKerja, true).then(function(dat) {
                    $scope.item.noUsulan = dat.data.data.noUsulan;
                    $scope.listStatusPegawai = dat.data.data.listStatusPegawai;
                }).then(function() {
                    if ($scope.loginUser.idJabatan == 633 || $scope.loginUser.idJabatan == 1139) {
                        $scope.item.statusPegawai = _.find($scope.listStatusPegawai, function(e) {
                            $scope.tugasLuar = true;
                            return e.id == 28;
                        });
                    }
                });
                ManageSdm.getItem("service/list-generic/?view=Pegawai&select=id,namaLengkap,tglMasuk&criteria=statusEnabled&values=true", true).then(function(dat) {
                    
                    $scope.listPegawai = dat.data;
                }).then(function() {
                    if ($scope.loginUser.idSubUnitKerja == 26) {

                        $scope.bukanLoginSdm = false;

                    } else if ($scope.loginUser.idJabatan == 633 || $scope.loginUser.idJabatan == 1139) {

                        $scope.tugasLuar = true;
                        $scope.bukanLoginSdm = false;

                    } else {
                        $scope.item.namaPegawai=_.find($scope.listPegawai, function(e) {
                            return e.id === $scope.loginUser.idPegawai;
                        });

                        $scope.bukanLoginSdm = true;
                    }
                });
            }
            $scope.$watch('item.namaPegawai', function(e) {
                // debugger;
                if (!e) return;
                if (e.id==$scope.loginUser.idPegawai) {
                    $scope.tugasLuar = false;
                    $scope.getDataPegawai(e);
                } else if (e.id!=$scope.loginUser.idPegawai && ($scope.loginUser.idJabatan == 633 || $scope.loginUser.idJabatan == 1139)) {
                    $scope.item.statusPegawai = _.find($scope.listStatusPegawai, function(ed) {
                        $scope.tugasLuar = true;
                        return ed.id == 28;
                    })
                    $scope.getDataPegawai(e);
                } else {
                    $scope.getDataPegawai(e);
                }
            })
            $scope.getDataPegawai = function(e) {
                $scope.isRouteLoading = true;
                ManageSdmNew.getListData("sdm/get-data-pegawai?pegawaiId=" + e.id, true).then(function(dat) {
                    // debugger;
                    $scope.item.jabatan = dat.data.data.jabatan;
                    $scope.item.nip = dat.data.data.nip;
                    $scope.item.ruangan = dat.data.data.subUnitKerja;
                    $scope.item.ruanganId = dat.data.data.subUnitKerjaId;
                    $scope.item.kategoriPegawaiId = dat.data.data.kategoriPegawaiId;
                    $scope.item.Alamat = dat.data.data.alamat
                    if (!$scope.item.kategoriPegawaiId) {
                        $scope.item.jumlahCuti = "";
                        $scope.item.sisaCuti = "";
                        $scope.item.jumlahIjin = "";
                        $scope.item.sisaIjin = "";
                        // $scope.item.jmlsakit = "";
                    }
                    /*else{
                        $scope.getIzin(e);
                    } */
                    $scope.isRouteLoading = false;
                }, (err) => {
                    $scope.isRouteLoading = false;
                });
            }
            $scope.getJabatan = function(params, value) {
                if (!value) return;
                ManageSdmNew.getListData("sdm/get-data-pegawai?pegawaiId=" + value.id, true).then(function(dat) {
                    if (params === 'pegawai1') {
                        $scope.currentData.jabatan1 = dat.data.data.jabatan;
                    } else if (params === 'pegawai2') {
                        $scope.currentData.jabatan2 = dat.data.data.jabatan;
                    } else {
                        // debugger;
                    }
                })
            }
            $scope.getCuti = function() {
                $scope.cutiHabis = false;
                ManageSdmNew.getListData("sdm/get-data-cuti?pegawaiId=" + $scope.item.namaPegawai.id + "&statusPegawaiId=" + $scope.item.statusPegawai.id, true).then(function(dat) {
                    // +$scope.item.kategoriPegawaiId

                    $scope.item.dataCutiB = dat.data.data.dataCutiB;
                    var data = {
                        "statusEnabled": true,
                        "tahun": DateHelper.formatDate($scope.now, "YYYY"),
                        "kdProfile": 0,
                        "pegawai": {
                            "id": $scope.item.namaPegawai.id
                        },
                        "value": $scope.item.dataCutiB,
                        "komponenIndex": {
                            "id": 21
                        },
                        "isTangguhkan": false
                    }
                    ManageSdmNew.saveData(data, "sdm/save-jatah-cuti-dan-izin-pegawai").then(function(e){

                    }, function(err){
                        throw err;
                    })     

                    // $scope.item.dataCutiN = dat.data.data.dataCutiN;
                    // var data = {
                    //     "statusEnabled": true,
                    //     "tahun": dateHelper.formatDate($scope.now, "YYYY"),
                    //     "kdProfile": 0,
                    //     "pegawai": {
                    //         "id": $scope.item.namaPegawai.id
                    //     },
                    //     "value": $scope.item.dataCutiN,
                    //     "komponenIndex": {
                    //         "id": 5
                    //     },
                    //     "isTangguhkan": false
                    // }
                    // manageSdmNew.saveData(data, "sdm/save-jatah-cuti-dan-izin-pegawai").then(function(e){

                    // }, function(err){
                    //     throw err;
                    // })     
                    
                    $scope.item.isTangguhkanN = dat.data.data.isTangguhkanN;
                    $scope.item.isTangguhkanN1 = dat.data.data.isTangguhkanN1;

                    $scope.item.sisaCuti = dat.data.data.sisaCutiN;
                    $scope.item.sisaCutiN1 = dat.data.data.sisaCutiN1;
                    $scope.item.sisaCutiN2 = dat.data.data.sisaCutiN2;

                    $scope.item.jumlahCutiB = dat.data.data.dataCutiB;
                    $scope.item.sisaCutiB = dat.data.data.sisaCutiB;

                    $scope.item.jumlahCuti = dat.data.data.dataCutiN;
                    $scope.item.jumlahCutiN1 = dat.data.data.dataCutiN1;
                    $scope.item.jumlahCutiN2 = dat.data.data.dataCutiN2;
                    $scope.item.jumlahCutiN3 = dat.data.data.dataCutiN3;

                    var d = new Date();
                    var y = d.getFullYear();
                    $scope.item.tahunCutiN1=y-1
                    $scope.item.tahunCutiN2=y-2

                    if ($scope.item.jumlahCuti <= 0) {
                        $scope.cutiHabis = true;
                    } else {
                        $scope.cutiHabis = false;
                    }

                });
            }
            $scope.getIzin = function(e) {
                // debugger;
                $scope.cutiHabis = false;
                ManageSdmNew.getListData("sdm/get-data-cuti?pegawaiId=" + $scope.item.namaPegawai.id + "&statusPegawaiId=" + $scope.item.statusPegawai.id, true).then(function(dat) {
                    // +$scope.item.kategoriPegawaiId

                    $scope.item.jumlahIjin = dat.data.data.jatahCuti;
                    $scope.item.sisaIjin = dat.data.data.sisaCuti;
                    if ($scope.item.jumlahIjin <= 0) {
                        $scope.cutiHabis = true;
                    } else {
                        $scope.cutiHabis = false;
                    }
                });
            }
            $scope.cutiHabis = false;
            $scope.dataVOloaded = true;
            $scope.disJumlahCuti = true;
            $scope.disSakit = true;
            $scope.hideJumlahCuti = false;
            $scope.showJumlahCuti = function() {
                for (var i = 0; i < $scope.tanggalPermohonan.length; i++) {
                    if ($scope.tanggalPermohonan.length != 1) {
                        $scope.tanggalPermohonan.splice(i, 1);
                    }
                }
                $scope.tanggalPermohonan[0] = new Date();
                //Cuti Tahunan
                if ($scope.item.statusPegawai.id == 1) {
                    $scope.hideJumlahCuti = true;
                    $scope.getCuti();

                } else {
                    $scope.hideJumlahCuti = false;
                }
                //Sakit
                if ($scope.item.statusPegawai.id == 29) {
                    // toastr.warning('Info! Pengajuan sakit selama satu hari silakan langsung menyerahkan surat sakit kepada pihak SDM')

                    $scope.hideSakit = true;
                    $scope.cutiHabis = false;
                } else {
                    $scope.hideSakit = false;
                }

                //Ijin
                //Cuti Alasan Penting   26
                //Tugas Luar    28 
                //Cuti Melahirkan   25
                //Cuti Besar    24 
                if ($scope.item.statusPegawai.id == 27 || $scope.item.statusPegawai.id == 26 ||
                    $scope.item.statusPegawai.id == 28 ||
                    $scope.item.statusPegawai.id == 24 || $scope.item.statusPegawai.id == 25) {
                    $scope.hideSakit = false;
                    $scope.cutiHabis = false;
                } else {
                    $scope.hideJumlahIjin = false;
                }

                if ($scope.item.statusPegawai.id == 24 || $scope.item.statusPegawai.id == 25) {
                    
                    $scope.hideTglpermohonan = true;
                    $scope.showTglAwal = true;
                    $scope.showTglAkhir = true;
                    $scope.addNewTgl();
                    
                }else{
                    $scope.hideTglpermohonan = false;
                    $scope.showTglAwal = false;
                    $scope.showTglAkhir = false;    
                }

                if ($scope.item.statusPegawai.id == 29) {
                    
                    if($scope.loginUser.idPegawai==$scope.item.namaPegawai.id){
                        
                        $scope.hideTglpermohonan = true;
                        $scope.showTglAwal = true;
                        $scope.showTglAkhir = true;

                        $scope.addNewTgl();
                    }else{
                        $scope.hideTglpermohonan = false;
                        $scope.showTglAwal = false;
                        $scope.showTglAkhir = false; 

                    }

                }

                
            }

            // $scope.showJumlahSakit = function() {
            //     if ($scope.item.sakit.id == 1) {
            //         $scope.item.jmlsakit = 3;
            //     } else {
            //         $scope.item.jmlsakit = 5;
            //     }
            //     var RealDay = days(new Date($scope.item.tglAkhir), new Date($scope.item.tglAwal));
            //     var dateDiff = days(new Date($scope.item.tglAkhir), new Date($scope.item.tglAwal));
            //     removeA(dateDiff, 'Sunday');
            //     removeA(dateDiff, 'Saturday');
            //     var totalHari = dateDiff.length + 1;
            //     if (totalHari > $scope.item.jmlsakit) {
            //         alert('Jumlah Permohonan Tidak Boleh Lebih dari : ' + $scope.item.jmlsakit + ' hari')
            //         $scope.item.tglAwal = "";
            //         $scope.item.tglAkhir = "";
            //     }
            // }

            $scope.listDetailSakit = [{
                "id": 1,
                "sakit": "Rawat Jalan"
            }, {
                "id": 2,
                "sakit": "Rawat Inap"
            }]
            $scope.loadGrid = function() {
                $scope.isRouteLoading = true;
                // get daftar permohonan cuti per ruangan
                // var idSubUnitKerja = '';
                // if ($scope.loginUser.idSubUnitKerja) var idSubUnitKerja = $scope.loginUser.idSubUnitKerja;
                // ManageSdm.getItem("sdm/get-list-permohonan-status?unitKerjaId="+ idSubUnitKerja, true).then(function(dat){
                //  $scope.dataMaster = dat.data.data.listData;

                // get daftar cuti per pegawai (berdasarkan hasil meeting dengan pihak SDM)
                // ManageSdm.findPegawaiById(ModelItem.getPegawai().id).then(function(res) {
                ManageSdmNew.getListData("pegawai/find-pegawai-by-id-custom/"+ModelItem.getPegawai().id).then(function(res) {
                    if (res.statResponse) {
                        var pegawaiLogin = res.data.data;
                        // get permohonan status by user login
                        ManageSdmNew.getListData("sdm/get-list-approval-status?idPegawai=" + pegawaiLogin.idPegawai).then(function(e) {
                            //debugger;
                            var data = e.data.data.listData;
                            // filter data yang approvalStatusnya !== 3
                            var filteredData = _.filter(e.data.data.listData, function(element) {
                                return element.approvalStatus !== 3;
                            });
                            
                            for (var i = 0; i < filteredData.length; i++) {
                                if(filteredData[i].eselonId == undefined)
                                   filteredData[i].eselonId = null 
                             
                            }

                            $scope.dataSource = new kendo.data.DataSource({
                                pageSize: 5,
                                data: filteredData,
                                autoSync: true
                            });
                            $scope.isRouteLoading = false;
                        }, (err) => {
                            $scope.isRouteLoading = false;
                        });
                    }
                }, (err) => {
                    $scope.isRouteLoading = false;
                });

                

                // $scope.dataMaster.forEach(function(data){
                //  var date1 = new Date(data.tglAwalPlan);
                //  var date2 = new Date(data.tglAkhirPlan);
                //  var date3 = new Date(data.tglPengajuan);
                //  data.tglAwalPlan = DateHelper.getTanggalFormattedNew(date1);
                //  data.tglAkhirPlan = DateHelper.getTanggalFormattedNew(date2);
                //  data.tglPengajuan = DateHelper.getTanggalFormattedNew(date3);
                // });

            }

            var timeoutPromise;
            $scope.$watch('item.cariDaftarPengajuanCuti', function(newVal, oldVal){
                if(!newVal) return;
                $timeout.cancel(timeoutPromise);
                timeoutPromise = $timeout(function(){
                    if (newVal && newVal !== oldVal){
                        applyFilter("namaPegawai", newVal)
                    }
                }, 1000);
            });

            function applyFilter(filterField, filterValue){
                var dataGrid = $("#gridPermohonanStatus").data("kendoGrid");
                var currFilterObject = dataGrid.dataSource.filter();
                var currentFilters = currFilterObject ? currFilterObject.filters : [];

                if(currentFilters && currentFilters.length >0){
                    for(var i=0; i < currentFilters.length; i++){
                        if(currentFilters[i].field == filterField){
                            currentFilters.splice(i, 1);
                            break;
                        }
                    }
                }
                currentFilters.push({
                        field: filterField,
                        operator: "contains",
                        value: filterValue
                    });
                dataGrid.dataSource.filter({
                    logic: "and",
                    filters: currentFilters
                });
            }

            $scope.cari = function() {
                 $scope.isRouteLoading = true;
                 ManageSdmNew.getListData("pegawai/find-pegawai-by-id-custom/"+ModelItem.getPegawai().id).then(function(res) {
                    if (res.statResponse) {
                        var pegawaiLogin = res.data.data;
                        // get permohonan status by user login
                        ManageSdmNew.getListData("sdm/get-list-approval-status?idPegawai=" + pegawaiLogin.idPegawai).then(function(e) {
                            //debugger;
                            var data = e.data.data.listData;
                            // filter data yang approvalStatusnya !== 3
                            var filteredData = _.filter(e.data.data.listData, function(element) {
                                return element.approvalStatus !== 3;
                            });

                            
                            $scope.filteredData2 = _.filter(filteredData, function(element) {
                                
                                return element['namaPegawai'].toLowerCase().indexOf($scope.item.cariDaftarPengajuanCuti.toLowerCase())>-1
                                

                                xxx.match(re);
                            });

                            
                            $scope.dataSource = new kendo.data.DataSource({
                                pageSize: 5,
                                data: $scope.filteredData2,
                                autoSync: true
                            });
                            $scope.isRouteLoading = false;
                        }, (err) => {
                            $scope.isRouteLoading = false;
                        });
                    }
                }, (err) => {
                    $scope.isRouteLoading = false;
                });


                   

                    
                }


           

            $scope.radioIsCutiLuarNegeri=[
                    {"id":1,"nama":"Ya"},{"id":2,"nama":"Tidak"}]

              

            $scope.alertTgl = function(ev) {
                $mdDialog.show(
                    $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(false)
                    .title('Peringatan')
                    .textContent('Jumlah hari yang anda pilih melebihi sisa cuti')
                    .ariaLabel('Alert Tgl')
                    .ok('OK')
                    .targetEvent(ev)
                );
            };
            var days = function(date1, date2) {
                var timeDiff = Math.abs(date2.getTime() - date1.getTime());
                var diff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                var _days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                var days = [];
                for (var i = 0; i < diff; i++) {
                    date1.setDate(date1.getDate() + i);
                    days.push(_days[date1.getDay()]);
                }
                return days;
            };

            var removeA = function(arr) {
                var what, a = arguments,
                    L = a.length,
                    ax;
                while (L > 1 && arr.length) {
                    what = a[--L];
                    while ((ax = arr.indexOf(what)) !== -1) {
                        arr.splice(ax, 1);
                    }
                }
                return arr;
            }

            var bisaCuti = false;
            var condition2;
            var condition = true;
            $scope.checkTanggalCuti = function () {
                var listTanggalPermohonan = [];
                var listTanggalPengajuan = [];
                $scope.tanggalPermohonan.forEach(function (el) {
                    if(el.tgl) {
                        el.tgl.setHours(7);
                        listTanggalPermohonan.push(DateHelper.toTimeStamp(new Date(el.tgl)));
                    } else {
                        el.setHours(7);
                        listTanggalPermohonan.push(DateHelper.toTimeStamp(new Date(el)));
                    }
                });
                ManageSdmNew.getListData('sdm/get-list-tanggal-permohonan?idPegawai=' + $scope.item.namaPegawai.id).then(res => {
                    var dataPengajuan = res.data.data;
                    for(let i = 0; i < dataPengajuan.length; i++) {
                        dataPengajuan[i].lisTanggal.forEach(function(data) {
                            listTanggalPengajuan.push(data.tgl);
                        })
                    }
                    
                    for(let i = 0; i < listTanggalPengajuan.length; i ++) {
                        for(let ii = 0; ii < listTanggalPermohonan.length; ii++) {
                            if(listTanggalPengajuan[i] === listTanggalPermohonan[ii]) {
                                condition2 = 'no';
                                condition = false;
                                $scope.tanggalTidakBisaCuti = listTanggalPermohonan[ii];
                                break;
                            } else {
                                condition2 = 'yes';
                                condition = true;
                                continue;
                            }
                            
                        }
                        if(!condition) {
                            condition2 = 'no';
                            condition = false;
                            break;
                        } else {
                            condition2 = 'yes';
                            condition = true;
                        }
                    }
                    bisaCuti = condition;
                });
            }

            $scope.Save = function() {
                $scope.checkTanggalCuti();
                if(!bisaCuti) {
                    $scope.checkTanggalCuti();
                    toastr.info('Ada tanggal yang sama');
                    return;
                } else {
                    $scope.checkTanggalCuti();
                }
                console.log('masuk sini');
                if($scope.item.statusPegawai == undefined){
                    toastr.error('Status kehadiran harus di isi')
                    return
                }
                var listRawRequired = [
                    "item.namaPegawai|k-ng-model|Pegawai",
                    "item.tglPengajuan|k-ng-model|Tanggal pengajuan",
                    "item.statusPegawai|k-ng-model|Status kehadiran",
                    "item.NoTelepon|k-ng-model|No Telepon",
                    "item.Alamat|k-ng-model|Alamat",
                ]

                if($scope.item.statusPegawai.id == 28){
                    listRawRequired.push(
                    "item.noSuratTugas|k-ng-model|No Surat Tugas",
                    "item.noNotaDinas|k-ng-model|No Nota Dinas",
                    "item.tglNotaDinas|k-ng-model|Tanggal Nota Dinas",
                    "item.jabatanNotaDinas|k-ng-model|Jabatan Pemberi Nota Dinas",
                    "item.alamatTugas|k-ng-model|Alamat Tugas"
                    )
                }

                if($scope.item.statusPegawai.id == 29 && $scope.tanggalPermohonan.length>1){
                    if (kendo.toString($scope.tanggalPermohonan[0].tgl, "MM/dd/yyyy") === kendo.toString((kendo.toString($scope.tanggalPermohonan[1].tgl, "MM/dd/yyyy")))) {
                            toastr.warning('Info! Pengajuan sakit selama satu hari silakan langsung menyerahkan surat sakit kepada pihak SDM')
                            return
                    }

                }

                if($scope.item.statusPegawai.id == 1){
                    for(var i = 0; i < $scope.tanggalPermohonan.length; i++){
                        if($scope.tanggalPermohonan[i].tgl instanceof Date)
                            var tgl =  $scope.tanggalPermohonan[i].tgl.getFullYear()
                        else
                            var tgl = parseInt( $scope.tanggalPermohonan[i].tgl.substr(0,4))
                        
                        var yearNow = parseInt(moment(new Date()).format('YYYY'))
                        if(tgl > yearNow){
                            if($scope.item.isTangguhkanN==false){
                                toastr.warning('Sisa cuti belum ditangguhkan/ Hutang cuti tidak diperkenankan !')
                                return    
                            }
                            
                        }    
                    }

                }

                // Untuk mengajukan cuti besar, pekerja minimal sudah bekerja selama 365 hari
                // if ($scope.item.statusPegawai.id == 1){
                //     var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
                //     var firstDate = $scope.item.namaPegawai.tglMasuk;
                //     var secondDate = new Date().getTime();

                //     var diffDays = Math.round(Math.abs((firstDate - secondDate)/(oneDay)));

                //     if (diffDays<365){
                //         toastr.warning('Tidak bisa diajukan cuti. Masa kerja pegawai yang diajukan cuti kurang dari 1 tahun !')
                //         return;    
                //     } 

                // }

            
                if (($scope.item.statusPegawai.id == 24 || $scope.item.statusPegawai.id == 25) && $scope.tanggalPermohonan.length === 1) {
                    // if (!listPegawaiAdminSDM.includes($scope.pegawai.id)) {
                        messageContainer.error('Tanggal harus terdiri dari tanggal awal dan tanggal akhir (periode)')
                    // }
                } else {
                    if($scope.item.statusPegawai.id == 29 && $scope.tanggalPermohonan.length === 1){
                        if (!listPegawaiAdminSDM.includes($scope.pegawai.id)) {
                                messageContainer.error('Tanggal harus terdiri dari tanggal awal dan tanggal akhir (periode)')
                                return
                        }
                    }
                    var isValid = ModelItem.setValidation($scope, listRawRequired);
                    if (isValid.status) {
                        var listDate = [],
                            dataSend = {};
                        for (var i = 0; i < $scope.tanggalPermohonan.length; i++) {
                            var element = $scope.tanggalPermohonan[i];
                            for (var key in element) {
                                if (element.hasOwnProperty(key)) {
                                    if (key === "tgl") {
                                        if (element[key] instanceof Date)
                                            listDate.push({
                                                tgl: DateHelper.getTanggalFormattedNew(element[key])
                                            });
                                    }
                                }
                            }
                        }

                        var statusCutiLuarNegeri="";
                        if ($scope.item.isCutiLuarNegeri==undefined){
                             toastr.warning('Status cuti luar negeri / dalam negeri belum dipilih', 'Peringatan');
                            return;    
                        }else{
                            if ($scope.item.isCutiLuarNegeri==1){
                            statusCutiLuarNegeri="true";
                            }
                            else{
                                statusCutiLuarNegeri="false";
                            }    
                        }


                        dataSend = {
                            "noPlanning": $scope.item.noUsulan,
                            "pegawai": {
                                "id": $scope.item.namaPegawai.id
                            },
                            "statusPegawaiPlan": {
                                "id": $scope.item.statusPegawai.id
                            },
                            // "ruanganKerja": {
                            //  "id": $scope.item.ruanganId
                            // },
                            "alamatCuti":  $scope.item.Alamat,
                            "nomorTelepon": $scope.item.NoTelepon,
                            "deskripsiStatusPegawaiPlan": $scope.item.deskripsiUsulan,
                            "keteranganLainyaPlan": $scope.item.keterangan,
                            "tglPengajuan": DateHelper.getTanggalFormattedNew($scope.item.tglPengajuan),
                            "listTanggal": listDate,
                            "noSuratTugas": $scope.item.noSuratTugas,
                            "noNotaDinas": $scope.item.noNotaDinas,
                            "tglNotaDinas":$scope.item.tglNotaDinas!= undefined ? DateHelper.getTanggalFormattedNew($scope.item.tglNotaDinas):null,
                            "alamatTugas": $scope.item.alamatTugas,
                            "jabatanPemberiNotaDinas": {
                                "id": $scope.item.jabatanNotaDinas != undefined ? $scope.item.jabatanNotaDinas.id : 14
                            },
                            "isCutiLuarNegeri":statusCutiLuarNegeri
                        }
                        if (listDate.length == 0) {
                            toastr.warning('Tanggal permohonan belum di isi', 'Peringatan');
                            return;
                        }
                        ManageSdmNew.saveData(dataSend, "sdm/save-pegawai-status").then(function(e) {
                            // console.log(JSON.stringify(e.data));

                            $scope.loadGrid();
                            load();
                        });
                    } else {
                        ModelItem.showMessages(isValid.messages);
                    }
                }
            }
            // $scope.Save = function () {
            //  // debugger;

            //  var tanggalAwal = DateHelper.getTanggalFormattedNew($scope.item.tglAwal);
            //  var tanggalAkhir = DateHelper.getTanggalFormattedNew($scope.item.tglAkhir);
            //  var tanggalPengajuan = DateHelper.getTanggalFormattedNew($scope.item.tglPengajuan);
            //  var RealDay = days(new Date($scope.item.tglAkhir), new Date($scope.item.tglAwal));
            //  var dateDiff = days(new Date($scope.item.tglAkhir), new Date($scope.item.tglAwal));
            //  removeA(dateDiff, 'Sunday');
            //  removeA(dateDiff, 'Saturday');

            //  var totalHari = dateDiff.length + 1;

            //  var data = {
            //      "noPlanning": $scope.item.noUsulan,
            //      "pegawai": {
            //          "id": $scope.item.namaPegawai.id
            //      },
            //      "statusPegawaiPlan": {
            //          "id": $scope.item.statusPegawai.id
            //      },
            //      "tglAwalPlan": tanggalAwal,
            //      "tglAkhirPlan": tanggalAkhir,
            //      "ruanganKerja": {
            //          "id": $scope.item.ruanganId
            //      },
            //      "deskripsiStatusPegawaiPlan": $scope.item.deskripsiUsulan,
            //      "keteranganLainyaPlan": $scope.item.keterangan,
            //      "tglPengajuan": tanggalPengajuan,
            //      "ruanganId": $scope.loginUser.idRuangan
            //  }
            //  if (totalHari > $scope.item.sisaCuti) {
            //      // logical to check jumlah hari yg diajukan tidak lebih dari batas jumlah hari
            //      // multiple kondisi bukan hanya sisa cuti saja, tp termasuk 6 status kehadiran lainnya
            //      $scope.alertTgl();
            //  } else {

            //      ManageSdm.saveData(data,"sdm/save-pegawai-status").then(function(e) {
            //          console.log(JSON.stringify(e.data));

            //          $scope.loadGrid();
            //          $scope.item.deskripsiUsulan = "";
            //          $scope.item.namaPegawai = "";
            //          $scope.item.statusPegawai = "";
            //          $scope.item.jumlahCuti = "";
            //          $scope.item.sisaCuti ="";
            //          $scope.item.keterangan = "";
            //          $scope.item.tglAkhir = "";
            //          $scope.item.tglAwal = "";
            //          $scope.item.nip = "";
            //          $scope.item.ruangan = "";
            //          $scope.item.jabatan = "";
            //      });
            //  }
            // }
            $scope.cetakCutiAlasanPenting = function(data) {
                var idKaRuangan = data.kepalaRuangan ? data.kepalaRuangan.id : "";
                var urlLaporan = cetakHelper.openURLReporting("reporting/lapPermohonanCuti?noRecPlanning=" + data.noRec + "&idAtasan1=" + data.atasanLangsung.id + "&idAtasan2=" + data.pejabatPenilai.id + "&periode=" + DateHelper.formatDate(data.until, "YYYY-MM") + "&idKaRu=" + idKaRuangan + "&idJabatanAtasan1=" + data.jabatanAtasanLangsung.id + "&idJabatanAtasan2=" + data.jabatanPejabatPenilai.id);
                window.open(urlLaporan, "halamanCetakDua");
            }

            var holderCallback = function () { }
            $scope.cetakPermohonan = function(data) {
                //debugger;
                if (!data) {
                    messageContainer.error("Data Tidak Ditemukan");
                    return;
                }
                var listRawRequired = [
                    "currentData.atasanLangsung|k-ng-model|Atasan langsung",
                    "currentData.jabatanAtasanLangsung|ng-model|Jabatan atasan langsung",
                    "currentData.pejabatPenilai|k-ng-model|Pejabat penilai",
                    "currentData.jabatanPejabatPenilai|ng-model|Jabatan pejabat penilai"
                ];
                var isValid = ModelItem.setValidation($scope, listRawRequired);
                if (isValid.status) {
                    if(data.statusPegawai === "Izin"){
                        var idKaRuangan = data.kepalaRuangan ? data.kepalaRuangan.id : "";
                        var urlLaporan = cetakHelper.openURLReporting("reporting/lapSuratIzin?noRecPlanning=" + data.noRec + "&idAtasan=" + data.atasanLangsung.id + "&idJabatanAtasan=" + data.jabatanAtasanLangsung.id);
                        $scope.winDialog.close();
                        delete $scope.currentData.pegawai1;
                        delete $scope.currentData.pegawai2;
                        window.open(urlLaporan, "halamanCetak", "width=800, height=600");
                        // messageContainer.error("Tidak dapat mencetak Surat Izin Cuti");
                        // return;
                    } else if (data.statusPegawai === "Cuti Alasan Penting") {
                        var idKaRuangan = data.kepalaRuangan ? data.kepalaRuangan.id : "";
                        var urlSuratIzinSementara = cetakHelper.openURLReporting("reporting/suratIzinSementara?noRecPlanning=" + data.noRec + "&idAtasan1=" + data.atasanLangsung.id + "&idAtasan2=" + data.pejabatPenilai.id + "&periode=" + DateHelper.formatDate(data.until, "YYYY-MM") + "&idKaRu=" + idKaRuangan + "&idJabatanAtasan1=" + data.jabatanAtasanLangsung.id + "&idJabatanAtasan2=" + data.jabatanPejabatPenilai.id);
                        var urlLaporan = cetakHelper.openURLReporting("reporting/lapPermohonanCuti?noRecPlanning=" + data.noRec + "&idAtasan1=" + data.atasanLangsung.id + "&idAtasan2=" + data.pejabatPenilai.id + "&periode=" + DateHelper.formatDate(data.until, "YYYY-MM") + "&idKaRu=" + idKaRuangan + "&idJabatanAtasan1=" + data.jabatanAtasanLangsung.id + "&idJabatanAtasan2=" + data.jabatanPejabatPenilai.id);
                        $scope.winDialog.close();
                        delete $scope.currentData.pegawai1;
                        delete $scope.currentData.pegawai2;
                        if (listPegawaiAdminSDM.includes($scope.pegawai.id)) {
                            if (data.pegwaiId==$scope.pegawai.id) {
                                window.open(urlLaporan, "halamanCetakDua", "width=800, height=600, top=10, left=10");
                            }
                            var popUp = window.open(urlSuratIzinSementara, "halamanCetakSatu", "width=800, height=600, top=30, left=30");
                            if (popUp == null || typeof(popUp)=='undefined') {  
                                alert('Please disable your pop-up blocker and click "Cetak" button again.'); 
                            }
                        } else {
                            window.open(urlLaporan, "halamanCetakDua", "width=800, height=600, top=10, left=10");
                        }
                    } else if(data.statusPegawai === "Tugas Luar"){
                        var idKaRuangan = data.kepalaRuangan ? data.kepalaRuangan.id : "";
                        var urlLaporan = cetakHelper.openURLReporting("reporting/suratTugas?noRecPlanning=" + data.noRec + "&idAtasan1=" + data.atasanLangsung.id + "&idAtasan2=" + data.pejabatPenilai.id + "&periode=" + DateHelper.formatDate(data.until, "YYYY-MM") + "&idKaRu=" + idKaRuangan + "&idJabatanAtasan1=" + data.jabatanAtasanLangsung.id + "&idJabatanAtasan2=" + data.jabatanPejabatPenilai.id);
                        $scope.winDialog.close();
                        delete $scope.currentData.pegawai1;
                        delete $scope.currentData.pegawai2;
                        window.open(urlLaporan, "halamanCetak", "width=800, height=600");
                    } else {
                        var idKaRuangan = data.kepalaRuangan ? data.kepalaRuangan.id : "";

                        var urlLaporan = cetakHelper.openURLReporting("reporting/lapPermohonanCuti?noRecPlanning=" + data.noRec + "&idAtasan1=" + data.atasanLangsung.id + "&idAtasan2=" + data.pejabatPenilai.id + "&periode=" + DateHelper.formatDate(data.until, "YYYY-MM") + "&idKaRu=" + idKaRuangan + "&idJabatanAtasan1=" + data.jabatanAtasanLangsung.id + "&idJabatanAtasan2=" + data.jabatanPejabatPenilai.id);
                        $scope.winDialog.close();
                        delete $scope.currentData.pegawai1;
                        delete $scope.currentData.pegawai2;
                        window.open(urlLaporan, "halamanCetak", "width=800, height=600");
                        // messageContainer.error("Tidak dapat mencetak Surat Izin Cuti");
                        // return;
                    }
                   
                } else {
                    ModelItem.showMessages(isValid.messages);
                }
            }

            $scope.cetakPelimpahan = function(data) {
                if (!data) {
                    messageContainer.error("Data Tidak Ditemukan");
                    return;
                }
                var listRawRequired = [
                    "currentData.pegawaiDilimpah|k-ng-model|Pegawai yang dilimpahkan",
                    "currentData.jabatanPelimpah|ng-model|Jabatan yang dilimpahkan"
                ];
                var isValid = ModelItem.setValidation($scope, listRawRequired);
                if (isValid.status) {
                    var urlLaporan = cetakHelper.openURLReporting("reporting/suratPelimpahanTugas?noRecPlanning=" + data.noRec + "&idPegawaiPelimpah=" + data.pegwaiId + "&idJabatanPelimpah=" + data.jabatanPelimpah.id + "&idPegawaiDilimpah=" + data.pegawaiDilimpah.id);
                    $scope.winCetakPelimpahan.close();
                    window.open(urlLaporan, "halamanCetak", "width=800, height=600");
                } else {
                    ModelItem.showMessages(isValid.messages);
                }
            }

            // $scope.pilihDokter = function(item, data) {
            //     if (data === undefined)
            //         data = $scope.item;

            //     $scope.item = data;
            //     findPegawai.getDokterBaru($scope.item.noRec, dateHelper.formatDate($scope.item.pasienDaftar.tglRegistrasi, 'YYYY-MM-DD')).then(function(data){
            //         debugger;
            //         $scope.dokters = new kendo.data.DataSource({
            //             data: data.data.data.data
            //         });
            //     })
            //     // show popup untuk pilih dokter
            //     $scope.winDialog.center().open();
            // }

            function penangguhan(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                
                var r = confirm("Lakukan Penangguhan ?");
                if (r == false) {
                    return;
                } 


                var dataSend = {};
                dataSend = {
                            "noRec": dataItem.noRec,
                            "statusEnabled":  dataItem.statusEnabled,
                            
                        }

                        
                        ManageSdmNew.saveData(dataSend, "sdm/save-pegawai-status").then(function(e) {
                            // console.log(JSON.stringify(e.data));

                            $scope.loadGrid();
                            load();
                        });
            }


            function showDetails(e) {
                //debugger;
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                if (dataItem.approvalStatus !== 0) {
                    messageContainer.error("Data tidak dapat diubah");
                    return;
                } else {
                    // console.log(JSON.stringify(dataItem));
                    var setCurrentData = {
                        "approvalStatus": dataItem.approvalStatus,
                        "keteranganLainyaPlan": dataItem.keteranganLainyaPlan,
                        "tglPengajuan": dataItem.tglPengajuan,
                        "statusPegawai": {
                            id: dataItem.statusPegawaiId,
                            statusPegawai: dataItem.statusPegawai
                        },
                        "alamatCuti": dataItem.alamatCuti,
                        "nomorTelepon": dataItem.nomorTelepon,
                        "deskripsiStatusPegawaiPlan": dataItem.deskripsiStatusPegawaiPlan,
                        "noRec": dataItem.noRec,
                        "listTanggal": dataItem.lisTanggal,
                        "unitKerja": dataItem.unitKerja,
                        "nip": dataItem.nip,
                        "namaJabatan": dataItem.namaJabatan,
                        "namaPegawai": {
                            id: dataItem.pegwaiId,
                            namaLengkap: dataItem.namaPegawai
                        },
                        "noPlanning": dataItem.noPlanning,
                        "noSuratTugas": dataItem.noSuratTugas,
                        "noNotaDinas": dataItem.noNotaDinas,
                        "tglNotaDinas": dataItem.tglNotaDinas==null || dataItem.tglNotaDinas==undefined ? new Date() : dataItem.tglNotaDinas,
                        "alamatTugas": dataItem.alamatTugas,
                        "jabatanPemberiNotaDinas": {
                            id: dataItem.jabatanIdPemberiNotaDinas,
                            namaJabatan: dataItem.jabatanPemberiNotaDinas
                        },
                        "jumlahCuti":dataItem.jumlahCuti,
                        "sisaCuti": dataItem.sisaCuti,
                        "isCutiLuarNegeri":dataItem.isCutiLuarNegeri ? "1" : "2"
                    }
                    localStorage.setItem('DataPerubahanStatus', JSON.stringify(setCurrentData));
                    $state.go('EditPermohonanPerubahanStatusPegawai', {
                        noRec: dataItem.noRec
                    });
                }

            }

            function cetakSuratPengajuan(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                // $scope.item = dataItem;
                if (!dataItem) {
                    messageContainer.error("Data Tidak Ditemukan");
                    return;
                }
                if (dataItem.statusPegawaiId==28) {
                    if (dataItem.noSuratTugas==undefined || dataItem.noSuratTugas==null) {
                        messageContainer.error("No Surat Tugas tidak boleh kosong");
                        return;
                    }
                    if (dataItem.noNotaDinas==undefined || dataItem.noNotaDinas==null) {
                        messageContainer.error("No Nota Dinas tidak boleh kosong");
                        return;
                    }
                    if (dataItem.tglNotaDinas==undefined || dataItem.tglNotaDinas==null) {
                        messageContainer.error("Tanggal Nota Dinas tidak boleh kosong");
                        return;
                    }
                    if (dataItem.jabatanIdPemberiNotaDinas==undefined || dataItem.jabatanIdPemberiNotaDinas==null) {
                        messageContainer.error("Pemberi Nota Dinas tidak boleh kosong");
                        return;
                    }
                    if (dataItem.alamatTugas==undefined || dataItem.alamatTugas==null) {
                        messageContainer.error("Alamat Tugas tidak boleh kosong");
                        return;
                    }
                }
                if ($scope.loginUser.idSubUnitKerja == 26 || dataItem.pegwaiId == $scope.loginUser.idPegawai) {
                    ManageSdmNew.getListData("sdm/get-pegawai-atasan/" + dataItem.pegwaiId).then(function(res) {
                        if (res.data.data.length > 0) {
                            dataItem.atasanLangsung = {
                                id: res.data.data[0].idAtasanLangsung,
                                namaLengkap: res.data.data.namaAtasanLangsung
                            };
                            dataItem.pejabatPenilai = {
                                id: res.data.data[0].idAtasanPejabatPenilai,
                                namaLengkap: res.data.data.namaAtasanPejabatPenilai
                            }
                        }
                    }, function(error) {
                        throw error;
                    }).then(function() {
                        $scope.loadWindow(dataItem);
                    })
                } else {
                    messageContainer.error("Tidak dapat mencetak Surat Izin Cuti");
                    return;
                }
            }

            $scope.cetakPelimpahanTugas = function(data) {
                if (!data) {
                    messageContainer.error("Data Tidak Ditemukan");
                    return;
                }
                var dataItem = data;
                $scope.loadPelimpahan(dataItem);
            };

            $scope.cancelData = function() {
                delete $scope.currentData.pegawai1;
                delete $scope.currentData.pegawai2;
                $scope.winDialog.close();
            }

            $scope.Batal = function() {
                load();
            }

            $scope.loadWindow = function(data) {
                // debugger
                data.until = $scope.now;
                $scope.currentData = data;
                $scope.winDialog.center().open();
            }

            $scope.loadPelimpahan = function(data) {
                // debugger
                data.until = $scope.now;
                $scope.currentData = data;
                // manageSarprasPhp.getDataTableTransaksi("historypegawai/get-drop-down-riwayat-jabatan-registered?id="+ data.pegwaiId).then(function (res) {
                ManageSdmNew.getListData("pegawai/get-all-jabatan-by-pegawai?idPegawai="+ data.pegwaiId).then(function (res) {
                    $scope.listJabatan1 = res.data.data
                    $scope.currentData.jabatanPelimpah =  $scope.listJabatan1[0] 
                })
                $scope.winCetakPelimpahan.center().open();
            }

            $scope.$watch('currentData.atasanLangsung', function(e) {
                if (!e) return;
                // manageSarprasPhp.getDataTableTransaksi("historypegawai/get-drop-down-riwayat-jabatan-registered?id=" 
                ManageSdmNew.getListData("pegawai/get-all-jabatan-by-pegawai?idPegawai="
                    + e.id).then(function (res) {
                        $scope.listJabatan1 = res.data.data
                         $scope.currentData.jabatanAtasanLangsung =  $scope.listJabatan1[0] 
                })
            })

            $scope.$watch('currentData.pejabatPenilai', function(e) {
                if (!e) return;
                // manageSarprasPhp.getDataTableTransaksi("historypegawai/get-drop-down-riwayat-jabatan-registered?id=" 
                ManageSdmNew.getListData("pegawai/get-all-jabatan-by-pegawai?idPegawai="
                    + e.id).then(function (res) {
                        $scope.listJabatan2 = res.data.data
                          $scope.currentData.jabatanPejabatPenilai =  $scope.listJabatan2[0]
                })
            })
        }
    ]);
});