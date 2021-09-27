define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('JadwalAbsensiCtrl', ['$q', 'ManagePegawai', 'FindPegawai', 'DateHelper', 'FindSdm', 'ModelItem', 'ManageSdm', 'ManageSdmNew', 'CetakHelper', '$state', '$rootScope', '$scope', '$mdDialog', '$timeout', 'ManagePhp',
        function ($q, managePegawai, findPegawai, dateHelper, findSdm, modelItem, manageSdm, manageSdmNew, cetakHelper, $state, $rootScope, $scope, $mdDialog, $timeout, managePhp) {
            $scope.isRouteLoading = true;
            $scope.ruanganKerja = [213, 217, 362, 57, 106, 105]; // daftar ruangan dengan otoritas penuh
            $scope.dataShiftPegawai = [] /* temp array data shift pegawai yang akan di simpan ke backend */
            $scope.simpan = true;

            if (modelItem.getPegawai().ruangan) {
                if ($scope.ruanganKerja.includes(modelItem.getPegawai().ruangan.id)) {
                    // findSdm.getUnitKerja().then(function(res){
                    manageSdmNew.getListData("sdm/get-all-unit-kerja").then(function (res) {
                        $scope.listUnitKerja = res.data.data;
                    })
                }
                // else{             
                //   manageSdm.getItem("/map-pegawai-jabatan-unitkerja/get-unit-by-pegawai-jadwal/"+ modelItem.getPegawai().id).then(function(res){
                //     $scope.listUnitKerja = res.data.data;
                // for (var i = $scope.listUnitKerja.length - 1; i >= 0; i--) {
                //      if (!$scope.listUnitKerja[i].isCanCreateJadwal) {
                //          $scope.listUnitKerja.splice([i],1)
                //      } 
                //  }                          
                // })
                // }     
            }
            $q.all([
                // modelItem.getPegawai(),
                // findSdm.getSubUnitKerja(),
                // manageSdm.getItem("service/list-generic/?view=ShiftKerja&select=id,kodeExternal,namaShift,jamMasuk,jamPulang,statusEnabled&criteria=statusEnabled&values=true")
                manageSdmNew.getListData("sdm/get-list-keterangan-shift")
            ]).then(function (res) {

                // if(res[1].id){
                //     $scope.loginPegawai = res[1];
                // }
                // if(res[2].statResponse){
                //     $scope.listSubUnitKerja = res[2].data.data;
                // }
                if (res[0].statResponse) {
                    // var daftarShift = res[1].data;
                    // $scope.listJadwal = [];
                    $scope.listJadwal = res[0].data.data;
                    // for(var i = 0; i < daftarShift.length; i++){
                    //     if($scope.listJadwal.length > 0){
                    //         for(var j = 0; j < $scope.listJadwal.length; j++){
                    //             if($scope.listJadwal[j].namaShift === daftarShift[i].namaShift){
                    //                 $scope.listJadwal.splice(j, 1);
                    //                 break;
                    //             }
                    //         }
                    //     }
                    //     $scope.listJadwal.push(daftarShift[i]);
                    // }
                }
            }, function (err) {
                $scope.isRouteLoading = false;
                messageContainer.error(err);
            }).then(function () {
                // findPegawai.findPegawaiById(modelItem.getPegawai().id).then(function(res){
                manageSdmNew.getListData("pegawai/find-pegawai-by-id-custom/" + modelItem.getPegawai().id).then(function (res) {
                    $scope.currentUserLogin = res.data.data;
                    if (!$scope.currentUserLogin.idUnitKerja || !$scope.currentUserLogin.idSubUnitKerja) {
                        $scope.dialogPopup.center().open();
                    }
                    var str = $scope.currentUserLogin.jabatanInternal;
                    if ($scope.currentUserLogin.idUnitKerja) {
                        if (modelItem.getPegawai().ruangan) {
                            if ($scope.ruanganKerja.includes(modelItem.getPegawai().ruangan.id)) {
                                $scope.item.unitKerja = {
                                    id: res.data.data.idUnitKerja,
                                    name: res.data.data.unitKerja
                                }

                                if ($scope.currentUserLogin.subUnitKerja) {
                                    $scope.item.subUnitKerja = {
                                        id: res.data.data.idSubUnitKerja,
                                        name: res.data.data.subUnitKerja
                                    }
                                }
                            }
                        }
                    }

                    // var objIsSdm = $scope.checkRuanganKerja(modelItem.getPegawai().ruangan.id, $scope.ruanganKerja);
                    if (modelItem.getPegawai().ruangan) {
                        if ($scope.ruanganKerja.includes(modelItem.getPegawai().ruangan.id)) {
                            return;
                        } else {
                            if (str) {
                                str = str.toLowerCase();
                                if (str.indexOf('kepala') == 0) {
                                    if (str.indexOf('instalasi') > 0 || str.indexOf('bid') > 0) {
                                        $scope.disableUnit = true;
                                    } else {
                                        $scope.disableSubUnit = true;
                                        $scope.disableUnit = true;
                                    }
                                }
                            }
                        }
                    } else {
                        if (str) {
                            str = str.toLowerCase();
                            if (str.indexOf('kepala') == 0) {
                                if (str.indexOf('instalasi') > 0 || str.indexOf('bid') > 0) {
                                    $scope.disableUnit = true;
                                } else {
                                    $scope.disableSubUnit = true;
                                    $scope.disableUnit = true;
                                }
                            }
                        }
                    }
                })
                $scope.isRouteLoading = false;
            }, function (err) {
                $scope.isRouteLoading = false;
                messageContainer.error(err);
            })
            // modelItem.getDataDummyGeneric('Ruangan').then(function(e) {
            //     $scope.ruangans = _.sortBy(e, function(i) {
            //         return i.namaRuangan;
            //     });
            // })
            // hardcode list jadwal
            // $scope.listJadwal = [
            //     {id: 1, name: "Pendidikan", kode: "PDK"},
            //     {id: 2, name: "Non Shift (senin-kamis)", kode: "S-K"},
            //     {id: 3, name: "Non Shift (Jumat)", kode: "J"},
            //     {id: 4, name: "Libur", kode: "L"},
            //     {id: 5, name: "Pagi-Siang-Malam", kode: "PSM"},
            //     {id: 6, name: "Pagi-Siang", kode: "PS"},
            //     {id: 7, name: "Sakit", kode: "S"},
            //     {id: 8, name: "Cuti Tahunan", kode: "CT"},
            //     {id: 9, name: "Cuti besar", kode: "CB"},
            //     {id: 10, name: "Siang", kode: "S"},
            //     {id: 11, name: "Pagi", kode: "P"},
            //     {id: 12, name: "Malam", kode: "M"},
            //     {id: 13, name: "Shift 2(Pagi)", kode: "P2"},
            //     {id: 14, name: "Shift 3(Pagi)", kode: "P3"},
            //     {id: 15, name: "Shift 2(Siang)", kode: "S2"},
            //     {id: 16, name: "Shift 3(Siang)", kode: "S3"},
            // ]

            $scope.listTahun = [];
            if (new Date().getMonth() == 11) {
                for (var i = 2014; i <= new Date().getFullYear() + 1; i++)
                    $scope.listTahun.push({ id: i });
            } else {
                for (var i = 2014; i <= new Date().getFullYear(); i++)
                    $scope.listTahun.push({ id: i });
            }
            $scope.listMonth = [];
            for (var i = 0; i <= 11; i++)
                $scope.listMonth.push({
                    id: i,
                    name: dateHelper.toMonth(i)
                });
            // $scope.$watch('item.ruangan', function(e) {
            //     if (e === undefined) return;

            //     if ($scope.ruangans != undefined)
            //         $scope.refresh();
            // });
            // $scope.$watch('item.selectedTahun', function(e) {
            //     if (e === undefined) return;

            //     if ($scope.ruangans != undefined)
            //         $scope.refresh();
            // });
            // $scope.$watch('item.selectedBulan', function(e) {
            //     if (e === undefined) return;

            //     if ($scope.ruangans != undefined)
            //         $scope.refresh();
            // });
            var getDaysInMonth = function (month, year) {
                // Here January is 1 based  
                //Day 0 is the last day in the previous month  
                return new Date(year, month + 1, 0).getDate();
                // Here January is 0 based  
                // return new Date(year, month+1, 0).getDate();  
            }
            $scope.showAlert = function (message) {
                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(false)
                        .title('Input Jadwal')
                        .textContent(message)
                        .ok('OK')
                );
            };

            $scope.checkUnitKerja = function () {
                var obj = {
                    status: false,
                    message: "Unauthorized"
                }
                var str = $scope.currentUserLogin.jabatanInternal;
                if (!str) {
                    $scope.showAlert('Unauthorized');
                    return;
                }
                // for (var i = $scope.dSource.length - 1; i >= 0; i--) {
                //     $scope.dSource[i].isCanCreateJadwal==true
                obj.status = true;
                obj.message = 'Authorized';
                return obj;
                //     break
                // }
            }

            $scope.checkRuanganKerja = function (e, daftarRuangan) {
                var obj = {
                    status: false,
                    message: "Unauthorized"
                }
                if (daftarRuangan.includes(e)) {
                    obj = {
                        status: true,
                        message: "Authorized"
                    }
                    return obj;
                } else {
                    var str = $scope.currentUserLogin.jabatanInternal;
                    if (!str) {
                        $scope.showAlert('Unauthorized');
                        return;
                    }
                    // for (var i = $scope.dSource.length - 1; i >= 0; i--) {
                    //     $scope.dSource[i].isCanCreateJadwal==true
                    obj.status = true;
                    obj.message = 'Authorized';
                    return obj;
                    //     break
                    // }

                    // if(!obj.status) {
                    //     obj.message = "Ruangan tidak valid.";
                    //     return obj;   
                    // }
                    // if(str.indexOf("Kepala") >= 0){
                    //     if($scope.currentUserLogin.idSubUnitKerja == $scope.item.subUnitKerja.id){
                    //         obj.status = true;
                    //         return obj;
                    //     } else {
                    //         obj.message = "Ruangan tidak valid.";
                    //         return obj;
                    //     }
                    // };
                }
                // daftarRuangan.forEach(function(list){
                //     if (list.id === e) {
                //         obj.status = true;
                //         return;
                //     }
                // });
                // if(!obj.status){
                //     if(str.indexOf("Kepala") >= 0){
                //         if($scope.currentUserLogin.idSubUnitKerja == $scope.item.subUnitKerja.id){
                //             obj.status = true;
                //         } else {
                //             obj.message = "Ruangan tidak valid.";
                //         }
                //     };
                // }
                // return obj;
            }
            let pegawais = JSON.parse(localStorage.getItem('pegawai'))

            manageSdmNew.getListData("map-pegawai-jabatan-unitkerja/get-unit-by-pegawai-jadwal/" + pegawais.id).then(function (res) {
                $scope.listUnitKerja = res.data.data;
                for (var i = $scope.listUnitKerja.length - 1; i >= 0; i--) {
                    if (!$scope.listUnitKerja[i].isCanCreateJadwal) {
                        $scope.listUnitKerja.splice([i], 1)
                    }
                }
            })

            // manageSdm.getOrderList("map-pegawai-jabatan-unitkerja/get-map-by-pegawai/" + pegawais.id).then(function(data) {
            // manageSdmNew.getListData("map-pegawai-jabatan-unitkerja/get-map-by-pegawai/" + pegawais.id).then(function(data) {
            //     var listUKerja = [];
            //     $scope.dSource = data.data.data;
            //     var listSource = $scope.dSource;
            //     for (var i = listSource.length - 1; i >= 0; i--) {
            //         listUKerja[i].name = listSource[i].unitKerjaPegawai.name;
            //         listUKerja[i].id = listSource[i].unitKerjaPegawai.id;
            //         if (!listSource[i].isCanCreateJadwal) {
            //             listUKerja.splice([i],1)
            //         }                     
            //     }
            //     $scope.listUnitKerja = listUKerja;
            // })

            $scope.changeShift = function (item, tgl) {
                if (tgl.kehadiranKerja !== undefined) {
                    window.messageContainer.info('Data kehadiran sudah terisi');
                    return;
                }

                if (modelItem.getPegawai().ruangan) {
                    var objValid = $scope.checkRuanganKerja(modelItem.getPegawai().ruangan.id, $scope.ruanganKerja);
                } else {
                    var objValid = $scope.checkUnitKerja();
                }

                if (objValid.status) {
                    $scope.selectedShift = tgl;
                    $scope.selectedPegawai = item.pegawai;
                    $scope.selectedPegawai.tanggalDinas = dateHelper.getTanggalFormatted(new Date(tgl.tanggal.tanggal));
                    for (let index = 0; index < item.pegawai.shiftKerja.detail.length; index++) {
                        if (item.pegawai.shiftKerja.detail[index].jamMasuk == undefined
                            || item.pegawai.shiftKerja.detail[index].jamMasuk == ""
                            || item.pegawai.shiftKerja.detail[index].jamMasuk == null) {
                            item.pegawai.shiftKerja.detail[index].text =
                                item.pegawai.shiftKerja.detail[index].kodeExternal
                        } else {
                            item.pegawai.shiftKerja.detail[index].text =
                                item.pegawai.shiftKerja.detail[index].kodeExternal + '\t' +
                                item.pegawai.shiftKerja.detail[index].jamMasuk + '-' +
                                item.pegawai.shiftKerja.detail[index].jamPulang
                        }
                    }
                    $scope.daftarShiftPegawai = item.pegawai.shiftKerja.detail;

                    // $scope.changeShiftModal.center().open();
                    tgl.popupEditor = false;
                    // if (tgl.shiftKerja == undefined)
                    //     tgl.shiftKerja = item.pegawai.shiftKerja.detail[0];
                    // else {
                    //     var index = item.pegawai.shiftKerja.detail.indexOf(tgl.shiftKerja);
                    //     index = index + 1;
                    //     if (index === item.pegawai.shiftKerja.detail.length)
                    //         index = 0;
                    //     tgl.shiftKerja = item.pegawai.shiftKerja.detail[index];
                    // }
                } else {
                    $scope.showAlert(objValid.message);
                    return;
                }
                // if ( === 1) {
                //     $scope.showAlert();
                //     return;
                // }
            }
            $scope.shiftChanged = function (pegawai, shift) {
                if (shift.shiftKerja.flagKetidakhadiran == true) {
                    toastr.warning('Status ketidakhadiran tidak bisa dipilih', 'Warning')
                    var data = {
                        id: shift.idParent,
                        // ruangan: {
                        //     id: pegawai.unitKerja.unitKerjaId
                        // },
                        pegawai: {
                            id: pegawai.id
                        },
                        shift: {
                            id: shift.shiftSebelum.id
                        },
                        tanggal: {
                            id: shift.tanggal.id
                        }
                    }
                    $scope.dataShiftPegawai.push(data);
                    // console.log(JSON.stringify($scope.dataShiftPegawai));
                    // $scope.changeShiftModal.close();
                    shift.shiftKerja = shift.shiftSebelum
                    shift.popupEditor = true;
                } else {
                    for (var i = 0; i < $scope.dataShiftPegawai.length; i++) {
                        if ($scope.dataShiftPegawai[i].pegawai.id == pegawai.id && $scope.dataShiftPegawai[i].tanggal.id == shift.tanggal.id)
                            $scope.dataShiftPegawai.splice(i, 1);
                    }
                    var data = {
                        id: shift.idParent,
                        // ruangan: {
                        //     id: pegawai.unitKerja.unitKerjaId
                        // },
                        pegawai: {
                            id: pegawai.id
                        },
                        shift: {
                            id: shift.shiftKerja.id
                        },
                        tanggal: {
                            id: shift.tanggal.id
                        }
                    }
                    $scope.dataShiftPegawai.push(data);
                    // console.log(JSON.stringify($scope.dataShiftPegawai));
                    // $scope.changeShiftModal.close();
                    shift.popupEditor = true;
                }

            }
            $scope.getClassDay = function (item, tgl) {
                if (tgl.shiftKerja && tgl.shiftKerja.kodeExternal == "L") {
                    return "holiday";
                } else {
                    return "in";
                }
                // uncomment to display red bg on shift Libur in every kelompok shift
                // else if (tgl.shiftKerja.kodeExternal == "L" ){
                //     return "holiday";
                // } 
            }

            var tahunIni = 2014;
            if (new Date().getMonth() == 11) {
                tahunIni = $scope.listTahun.length - 2
            } else {
                tahunIni = $scope.listTahun.length - 1
            }

            $scope.item = {
                selectedBulan: $scope.listMonth[new Date().getMonth()],
                selectedTahun: $scope.listTahun[tahunIni]
            };

            $scope.initialize = function (item, tgl) {
                var arrLibur = [];
                tgl.isLibur = arrLibur.indexOf(tgl.date.getDay()) !== -1;
                tgl.popupEditor = true;
                /*if (item.pegawai.shiftKerja.id === 1) {
                    arrLibur = [0];
                    tgl.shiftKerja = item.pegawai.shiftKerja.detail[0];
                    if (tgl.isLibur === true) {
                        debugger;
                    }
                } else if (item.pegawai.shiftKerja.id === 2) {
                    arrLibur = [0, 6];
                } else if (item.pegawai.shiftKerja.id === 3) {
                    arrLibur = [0];
                }*/
            }
            $scope.Save = function () {
                $scope.simpan = false;
                if ($scope.dataShiftPegawai.length > 0) {
                    $scope.isRouteLoading = true;
                    // managePegawai.savejadwalPegawai($scope.dataShiftPegawai).then(function(e) {
                    manageSdmNew.saveData($scope.dataShiftPegawai, "pegawai/save-all-jadwal-pegawai-rev2/").then(function (e) {
                        // if ($scope.ruangans != undefined) {
                        //     $scope.refresh();
                        // }
                        var msg = e.data.messages;
                        if (msg['label-success'] === "SUKSES") {
                            window.messageContainer.log(msg['label-success']);
                            $scope.dataShiftPegawai = [];
                            $scope.simpan = true;
                        }
                        $scope.isRouteLoading = false;
                        //  $scope.isNext = true;
                        $rootScope.doneLoad = true;
                    }, (err) => {
                        $scope.isRouteLoading = false;
                        $scope.simpan = true;
                        throw err;
                    });
                } else {
                    messageContainer.error('Tidak ada perubahan jadwal dinas pegawai!');
                    $scope.simpan = true;
                }
            };


            $scope.refresh = function () {
                var listRawRequired = [
                    "item.selectedBulan|k-ng-model|Bulan",
                    "item.selectedTahun|k-ng-model|Tahun",
                    "item.unitKerja|k-ng-model|unit Kerja",
                    "item.subUnitKerja|k-ng-model|sub unit kerja"
                ];
                var isValid = modelItem.setValidation($scope, listRawRequired);
                if (isValid.status) {
                    $scope.dataFound = false;
                    $scope.isRouteLoading = true;
                    if ($scope.item.selectedTahun !== undefined && $scope.item.selectedBulan !== undefined) {
                        $scope.listDay = [];
                        var max = getDaysInMonth($scope.item.selectedBulan.id, $scope.item.selectedTahun.id);
                        for (var i = 1; i <= max; i++) {
                            $scope.listDay.push({
                                id: i,
                                day: dateHelper.DescDay(new Date($scope.item.selectedTahun.id, $scope.item.selectedBulan.id, i)),
                                display: dateHelper.DescDay(new Date($scope.item.selectedTahun.id, $scope.item.selectedBulan.id, i), true),
                                date: new Date($scope.item.selectedTahun.id, $scope.item.selectedBulan.id, i)
                            });
                        }
                    }
                    if ($scope.item.selectedBulan === undefined || $scope.item.selectedTahun === undefined || $scope.item.unitKerja === undefined) {
                        return;
                    }
                    // if ($scope.item.subUnitKerja.id + "" + $scope.item.selectedTahun.id + "" + $scope.item.selectedBulan.id === $scope.temp)
                    //     return;

                    $scope.listData = [];
                    $rootScope.doneLoad = false;
                    // $scope.temp = $scope.item.subUnitKerja.id + "" + $scope.item.selectedTahun.id + "" + $scope.item.selectedBulan.id;
                    // findPegawai.getjadwalPegawai($scope.item.subUnitKerja.id, $scope.item.selectedTahun.id, $scope.item.selectedBulan.id + 1).then(function(e) {
                    var bulan = $scope.item.selectedBulan.id + 1;
                    manageSdmNew.getListData("pegawai/get-pegawai-by-ruangan-rev2/" + $scope.item.subUnitKerja.id + "/" + $scope.item.selectedTahun.id + "/" + bulan).then(function (e) {
                        var arr = [];
                        $rootScope.doneLoad = true;
                        $scope.dataFound = true;
                        var listIdNonShift = [1, 2];

                        for (var i = 0; i < e.data.data.data.length; i++) {

                            var element = e.data.data.data[i];
                            element.listDay = [];
                            for (var j = 0; j < $scope.listDay.length; j++) {
                                var shiftKerja = undefined;
                                var tanggal = undefined;
                                var kehadiranKerja = undefined;
                                var idParent = undefined;
                                if (element.pegawai.shiftKerja) {
                                    var pegawaiNonShift = element.pegawai.shiftKerja ? element.pegawai.shiftKerja.id : null;

                                    if (element.jadwal !== undefined) {
                                        //element.jadwal = modelItem.beforePost(element.jadwal, true);
                                        var filter = _.find(element.jadwal, function (e) {
                                            return e.tanggal.tanggal === $scope.listDay[j].date.getTime();
                                        });

                                        if (filter != undefined) {
                                            var jadwalPraktek = filter.shift;
                                            //kehadiranKerja = filter.statusKehadiran;
                                            var praktek = _.find(element.pegawai.shiftKerja.detail, function (data) {
                                                return data["id"] === jadwalPraktek["id"];
                                            });

                                            tanggal = filter.tanggal;
                                            shiftKerja = praktek;
                                            idParent = filter.id;
                                        }
                                    }

                                    element.listDay.push({
                                        id: $scope.listDay[j].id,
                                        day: $scope.listDay[j].day,
                                        display: $scope.listDay[j].display,
                                        date: $scope.listDay[j].date,
                                        tanggal: tanggal,
                                        shiftKerja: shiftKerja,
                                        shiftSebelum: shiftKerja,
                                        //kehadiranKerja: kehadiranKerja,
                                        idParent: idParent
                                    });

                                    // push data jadwal non shift ke model array jadwal pegawai
                                    if (listIdNonShift.includes(pegawaiNonShift) && (!idParent && shiftKerja !== undefined)) {
                                        var data = {
                                            id: idParent,
                                            // ruangan: {
                                            //     id: element.pegawai.unitKerja.unitKerjaId
                                            // },
                                            pegawai: {
                                                id: element.idPegawai
                                            },
                                            shift: {
                                                id: shiftKerja ? shiftKerja.id : null
                                            },
                                            tanggal: {
                                                id: tanggal.id
                                            }
                                        }
                                        $scope.dataShiftPegawai.push(data);
                                    }
                                }
                            }
                            arr.push(element);
                        }
                        $scope.isNext = false;
                        $scope.listData = arr;
                        $scope.setElementCss();
                    }, function (err) {
                        toastr.warning('Something went wrong');
                        throw err;
                    }).then(function () {
                        $rootScope.doneLoad = true;
                        $scope.isRouteLoading = false;
                        $timeout(function () {
                            // alert('content loaded');
                            renderingDone();
                        });
                    });
                } else {
                    $scope.isRouteLoading = false;
                    modelItem.showMessages(isValid.messages);
                }
            } //end refresh

            $scope.$watch('item.unitKerja', function (newVal, oldVal) {
                if (!newVal) return;
                if ((newVal && oldVal) && newVal.id == oldVal.id) return;
                $scope.isRouteLoading = true;
                if (modelItem.getPegawai().ruangan) {
                    if ($scope.ruanganKerja.includes(modelItem.getPegawai().ruangan.id)) {
                        // findSdm.getSubUnitKerjaById(newVal.id).then(function(res){
                        manageSdmNew.getListData("sdm/get-sub-unit-kerja-by-unit-kerja/" + newVal.id + "/").then(function (res) {
                            $scope.listSubUnitKerja = res.data.data;
                            if ($scope.item.subUnitKerja) {
                                for (var i = 0; i < $scope.listSubUnitKerja; i++) {
                                    if ($scope.listSubUnitKerja[i].id = $scope.item.subUnitKerja.id) {
                                        $scope.item.subUnitKerja = $scope.listSubUnitKerja[i]
                                    }
                                }
                            } else {
                                $scope.item.subUnitKerja = $scope.listSubUnitKerja[0]; // autobind first sub unit kerja to model item.unitKerja
                            }
                            $scope.isRouteLoading = false;
                        }, (error) => {
                            $scope.isRouteLoading = false;
                            throw (error);
                        })
                    } else {
                        // manageSdm.getItem("map-pegawai-jabatan-unitkerja/get-sub-unit-by-unit-jadwal/"+modelItem.getPegawai().id+"/"+$scope.item.unitKerja.id).then(function(res){
                        manageSdmNew.getListData("map-pegawai-jabatan-unitkerja/get-sub-unit-by-unit-jadwal/" + modelItem.getPegawai().id + "/" + $scope.item.unitKerja.id).then(function (res) {
                            $scope.listSubUnitKerja = res.data.data;
                            $scope.isRouteLoading = false;
                        })
                    }
                } else {
                    // manageSdm.getItem("map-pegawai-jabatan-unitkerja/get-sub-unit-by-unit-jadwal/"+modelItem.getPegawai().id+"/"+$scope.item.unitKerja.id).then(function(res){
                    manageSdmNew.getListData("map-pegawai-jabatan-unitkerja/get-sub-unit-by-unit-jadwal/" + modelItem.getPegawai().id + "/" + $scope.item.unitKerja.id).then(function (res) {
                        $scope.listSubUnitKerja = res.data.data;
                        $scope.isRouteLoading = false;
                    })
                }
            });
            // $scope.Back = function(){
            //     $scope.refresh();
            // }
            $scope.setElementCss = function () {
                var element = angular.element(document.querySelector('#jadwalDinas'));
                if ($scope.listData.length < 8) {
                    element.css('overflow', 'hidden');
                } else {
                    element.css('overflow', 'auto');
                }
            }
            function renderingDone() {
                var row = $('#tabelJadwal').find(' tbody tr td:first');
                var rowWidth = row.width();
                var rowthead = $('#tabelJadwal').find(' thead tr:first>th:first');
                rowthead.css({ 'width': rowWidth });
            }

            $scope.monthNameToNum = function (monthname) {
                var month = $scope.listMonth.indexOf(monthname);
                return month ? month + 2 : 0;
            }
            /***Upload Excel */
            $("#upload").kendoUpload({
                localization: {
                    "select": "Pilih File Excel..."
                },

                select: function (e) {
                    var ALLOWED_EXTENSIONS = [".xls"];
                    var extension = e.files[0].extension.toLowerCase();
                    if (ALLOWED_EXTENSIONS.indexOf(extension) == -1) {
                        toastr.error('Mohon Pilih File Excel (.xls)')
                        e.preventDefault();
                    }

                    for (var i = 0; i < e.files.length; i++) {
                        var file = e.files[i].rawFile;

                        if (file) {
                            var reader = new FileReader();
                            reader.onload = function (e) {
                                var data = e.target.result;
                                var workbook = XLSX.read(data, {
                                    type: 'binary'
                                });

                                workbook.SheetNames.forEach(function (sheetName) {
                                    $scope.jsonSave = [];
                                    // Here is your object
                                    var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                                    for (var i = 1; i < XL_row_object.length; i++) {
                                        XL_row_object[i].kdshift = Object.values(XL_row_object[i]);
                                        XL_row_object[i].idtanggal = Object.keys(XL_row_object[i]);
                                        for (let j = 0; j < XL_row_object[i].kdshift.length - 2; j++) {
                                            var data = {
                                                "pegawai": {
                                                    "id": XL_row_object[i].kdshift[XL_row_object[i].kdshift.length - 2]
                                                },
                                                "kdShift": XL_row_object[i].kdshift[j],
                                                "tanggal": {
                                                    "id": XL_row_object[i].idtanggal[j]
                                                }
                                            }
                                            $scope.jsonSave.push(data);
                                        }
                                    }
                                })
                            };
                            reader.onerror = function (ex) {
                            };
                            reader.readAsBinaryString(file);
                        }
                    }
                },
            })
            /***END Upload Excel */

            $scope.unduh = function () {
                var listRawRequired = [
                    "item.selectedBulan|k-ng-model|Bulan",
                    "item.selectedTahun|k-ng-model|Tahun",
                    "item.unitKerja|k-ng-model|unit Kerja",
                    "item.subUnitKerja|k-ng-model|sub unit kerja"
                ];
                var isValid = modelItem.setValidation($scope, listRawRequired);
                if (isValid.status) {
                    manageSdmNew.getListData("sdm/generate-excel?bulan=" + dateHelper.getFormatMonthPicker(new Date($scope.item.selectedTahun.id, $scope.item.selectedBulan.id)) + "&idUnitKerja=" + $scope.item.unitKerja.id + "&idSubunitKerja=" + $scope.item.subUnitKerja.id).then(function (e) {
                        // var path = "//usr//share//app//backend//tomcat//bin//Jadwal_Dinas_Pegawai_" + $scope.item.unitKerja.name.replace(/ /g,"_") + "_" + $scope.item.subUnitKerja.name.replace(/ /g,"_") + ".xls";
                        var path = "//usr//share//app//backend//tomcat//bin//tmp//Jadwal_Dinas_Pegawai_" + $scope.item.unitKerja.name.replace(/ /g,"_") + "_" + $scope.item.subUnitKerja.name.replace(/ /g,"_") + ".xls";
                        // var path = "//tmp//Jadwal_Dinas_Pegawai_" + $scope.item.unitKerja.name.replace(/ /g,"_") + "_" + $scope.item.subUnitKerja.name.replace(/ /g,"_") + ".xls";
                        // var path = "D:\\eclipse\\Jadwal_Dinas_Pegawai_" + $scope.item.unitKerja.name.replace(/ /g,"_") + "_" + $scope.item.subUnitKerja.name.replace(/ /g,"_") + ".xls";
                        var urlDownload = cetakHelper.downloadFile("sdm/download-jadwal?filename=" + path);
				        window.open(urlDownload, '_blank');
                    });
                } else {
                    $scope.isRouteLoading = false;
                    modelItem.showMessages(isValid.messages);
                }
            }

            $scope.unggah = function () {
                var listRawRequired = [
                    "item.selectedBulan|k-ng-model|Bulan",
                    "item.selectedTahun|k-ng-model|Tahun",
                    "item.unitKerja|k-ng-model|unit Kerja",
                    "item.subUnitKerja|k-ng-model|sub unit kerja"
                ];
                var isValid = modelItem.setValidation($scope, listRawRequired);
                if (isValid.status) {
                    $scope.isRouteLoading = true;
                    if ($scope.jsonSave != null) {
                        manageSdmNew.saveData($scope.jsonSave, "pegawai/unggah-simpan-jadwal-pegawai/").then(function (e) {
                            var msg = e.data.messages;
                            if (msg['label-success'] === "SUKSES") {
                                window.messageContainer.log(msg['label-success']);
                                $scope.dataShiftPegawai = [];
                                $scope.simpan = true;
                                $scope.refresh();
                                toastr.info('Mohon cek kembali jadwal yang telah diunggah!')
                            }
                        }, (err) => {
                            $scope.isRouteLoading = false;
                            $scope.simpan = true;
                            throw err;
                        });
                    } else {
                        toastr.warning('Mohon Masukkan File Excel (.xls)');
                        return;
                    }
                } else {
                    $scope.isRouteLoading = false;
                    modelItem.showMessages(isValid.messages);
                }
            }

            $scope.exportTableToExcel = function (tableID, filename = '') {
                var downloadLink;
                var dataType = 'application/vnd.ms-excel';
                var tableSelect = document.getElementById(tableID);
                var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');

                // Specify file name
                filename = filename ? filename + '.xls' : 'excel_data.xls';

                // Create download link element
                downloadLink = document.createElement("a");

                document.body.appendChild(downloadLink);

                if (navigator.msSaveOrOpenBlob) {
                    var blob = new Blob(['\ufeff', tableHTML], {
                        type: dataType
                    });
                    navigator.msSaveOrOpenBlob(blob, filename);
                } else {
                    // Create a link to the file
                    downloadLink.href = 'data:' + dataType + ', ' + tableHTML;

                    // Setting the file name
                    downloadLink.download = filename;

                    //triggering the function
                    downloadLink.click();
                }
            }

        }
    ])
});
