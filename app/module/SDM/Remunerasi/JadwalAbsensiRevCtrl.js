define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('JadwalAbsensiRevCtrl', ['$q', 'ManagePegawai', 'FindPegawai', 'DateHelper', 'FindSdm', 'ModelItem', 'ManageSdm', '$state', '$rootScope', '$scope', '$mdDialog',
        function($q, managePegawai, findPegawai, dateHelper, findSdm, modelItem, manageSdm, $state, $rootScope, $scope, $mdDialog) {
            $scope.isRouteLoading = true;
            $scope.ruanganKerja = [213, 217, 362, 57, 106, 105]; // daftar ruangan dengan otoritas penuh
            $q.all([
                findSdm.getUnitKerja(),
                manageSdm.getItem("service/list-generic/?view=ShiftKerja&select=id,kodeExternal,namaShift,jamMasuk,jamPulang,statusEnabled&criteria=statusEnabled&values=true")
            ]).then(function(res){
                if(res[0].statResponse){
                    $scope.listUnitKerja = res[0].data.data;
                }
                if(res[1].statResponse){
                    var daftarShift = res[1].data;
                    $scope.listJadwal = [];
                    for(var i = 0; i < daftarShift.length; i++){
                        if($scope.listJadwal.length > 0){
                            for(var j = 0; j < $scope.listJadwal.length; j++){
                                if($scope.listJadwal[j].namaShift === daftarShift[i].namaShift){
                                    $scope.listJadwal.splice(j, 1);
                                    break;
                                }
                            }
                        }
                        $scope.listJadwal.push(daftarShift[i]);
                    }
                }
            }, function(err){
                $scope.isRouteLoading = false;
                messageContainer.error(err);
            }).then(function(){
                findPegawai.findPegawaiById(modelItem.getPegawai().id).then(function(res){
                    $scope.currentUserLogin = res.data.data;
                    if(!$scope.currentUserLogin.idUnitKerja || !$scope.currentUserLogin.idSubUnitKerja){
                        // $scope.dialogPopup.center().open();
                        toastr.info('Data <b>unit kerja</b> dan/atau <b>sub unit kerja</b><br/>anda belum di set!', 'Peringatan');
                    }
                    var str = $scope.currentUserLogin.jabatanInternal;
                    if($scope.currentUserLogin.idUnitKerja)   
                        $scope.item.unitKerja = {
                            id: res.data.data.idUnitKerja,
                            name: res.data.data.unitKerja
                        };

                    if($scope.currentUserLogin.subUnitKerja)
                        $scope.item.subUnitKerja = {
                            id: res.data.data.idSubUnitKerja,
                            name: res.data.data.subUnitKerja
                        }
                    if($scope.ruanganKerja.includes(modelItem.getPegawai().ruangan.id)){
                        return;
                    } else {
                        if(str) {
                            str = str.toLowerCase();
                            if (str.indexOf('kepala') == 0) {
                                if (str.indexOf('instalasi') > 0 || str.indexOf('bid') > 0) {
                                    $scope.disableUnit = true;
                                } else {
                                    $scope.disableSubUnit = true;
                                    $scope.disableUnit = true;
                                }
                            } else {
                                $scope.disableSubUnit = true;
                                $scope.disableUnit = true;
                            }
                        }
                    }
                })
                $scope.isRouteLoading = false;
            }, function(err){
                $scope.isRouteLoading = false;
                messageContainer.error(err);
            });
           
            $scope.listTahun = [];
            for (var i = 2014; i <= new Date().getFullYear(); i++)
                $scope.listTahun.push({ id: i });
            $scope.listMonth = [];
            for (var i = 0; i <= 11; i++)
                $scope.listMonth.push({
                    id: i,
                    name: dateHelper.toMonth(i)
                });
            var getDaysInMonth = function(month, year) {
                return new Date(year, month + 1, 0).getDate();
            }
            $scope.showAlert = function(message) {
                $mdDialog.show(
                    $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(false)
                    .title('Input Jadwal')
                    .textContent(message)
                    .ok('OK')
                );
            };
            $scope.checkRuanganKerja = function(e, daftarRuangan){
                var str = $scope.currentUserLogin.jabatanInternal;
                var obj = {
                    status: false,
                    message: "Unauthorized"
                }
                if(daftarRuangan.includes(e)){
                    obj = {
                        status: true,
                        message: "Authorized"
                    }
                    return obj;
                } else {
                    if(str.indexOf("Kepala") >= 0){
                        if($scope.currentUserLogin.idSubUnitKerja == $scope.item.subUnitKerja.id){
                            obj.status = true;
                        } else {
                            obj.message = "Ruangan tidak valid.";
                        }
                    }
                }
                return obj;
            }
            $scope.changeShift = function(item, tgl) {
                if (tgl.kehadiranKerja !== undefined) {
                    return true;
                }
                var objValid = $scope.checkRuanganKerja(modelItem.getPegawai().ruangan.id, $scope.ruanganKerja);

                if (objValid.status){
                    return false;
                } else {
                    return true;
                }
            }
            $scope.dataShiftPegawai = []
            $scope.shiftChanged = function(pegawai, shift){
                for(var i = 0; i < $scope.dataShiftPegawai.length; i++){
                    if($scope.dataShiftPegawai[i].pegawai.id == pegawai.id && $scope.dataShiftPegawai[i].tanggal.id == shift.tanggal.id)
                        $scope.dataShiftPegawai.splice(i, 1);
                }
                var data = {
                    id: shift.idParent,
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
            }
            $scope.getClassDay = function(item, tgl) {
                if ((item.pegawai.shiftKerja.id == 1 || item.pegawai.shiftKerja.id == 2) && tgl.shiftKerja.kodeExternal == "L") {
                    return "libur";
                } else {
                    return "masuk";
                }
                // uncomment to display red bg on shift Libur in every kelompok shift
                // else if (tgl.shiftKerja.kodeExternal == "L" ){
                //     return "holiday";
                // } 
            }
            
            $scope.item ={
                selectedBulan: $scope.listMonth[new Date().getMonth()],
                selectedTahun: $scope.listTahun[$scope.listTahun.length - 1]
            };

            $scope.initialize = function(item, tgl) {
                var arrLibur = [];
                tgl.isLibur = arrLibur.indexOf(tgl.date.getDay()) !== -1;
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
            $scope.Save = function() {
                if($scope.dataShiftPegawai.length > 0){
                    // alert($scope.dataShiftPegawai.length)
                    $scope.isRouteLoading = true;
                    $scope.isNext = true;
                    managePegawai.savejadwalPegawai($scope.dataShiftPegawai).then(function(e) {
                        if ($scope.ruangans != undefined) {
                            $scope.refresh();
                        }
                        $scope.isRouteLoading = false;
                        $scope.isNext = false;
                        $rootScope.doneLoad = true;
                    },(err)=>{
                        $scope.isRouteLoading = false;
                        throw err;
                    });
                } else {
                    messageContainer.error('Tidak ada perubahan jadwal dinas pegawai!');
                }
            };
            $scope.refresh = function() {
                var listRawRequired = [
                    "item.selectedBulan|k-ng-model|Bulan",
                    "item.selectedTahun|k-ng-model|Tahun",
                    "item.unitKerja|k-ng-model|unit Kerja",
                    "item.subUnitKerja|k-ng-model|sub unit kerja"
                ];
                var isValid = modelItem.setValidation($scope, listRawRequired);
                if(isValid.status){
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
                    if ($scope.item.subUnitKerja.id + "" + $scope.item.selectedTahun.id + "" + $scope.item.selectedBulan.id === $scope.temp)
                        return;

                    $scope.listData = [];
                    $rootScope.doneLoad = false;
                    $scope.temp = $scope.item.subUnitKerja.id + "" + $scope.item.selectedTahun.id + "" + $scope.item.selectedBulan.id;
                    findPegawai.getjadwalPegawai($scope.item.subUnitKerja.id, $scope.item.selectedTahun.id, $scope.item.selectedBulan.id + 1).then(function(e) {
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
                                if(element.pegawai.shiftKerja){
                                    var pegawaiNonShift = element.pegawai.shiftKerja ? element.pegawai.shiftKerja.id : 0;

                                    if (element.jadwal !== undefined) {
                                        //element.jadwal = modelItem.beforePost(element.jadwal, true);
                                        var filter = _.find(element.jadwal, function(e) {
                                            return e.tanggal.tanggal === $scope.listDay[j].date.getTime();
                                        });

                                        if (filter != undefined) {
                                            var jadwalPraktek = filter.shift;
                                            //kehadiranKerja = filter.statusKehadiran;
                                            var praktek = _.find(element.pegawai.shiftKerja.detail, function(data) {
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
                                        //kehadiranKerja: kehadiranKerja,
                                        idParent: idParent
                                    });

                                    // push data jadwal non shift ke model array jadwal pegawai
                                    if(listIdNonShift.includes(pegawaiNonShift)){
                                        var data = {
                                            id: idParent,
                                            // ruangan: {
                                            //     id: element.pegawai.unitKerja.unitKerjaId
                                            // },
                                            pegawai: {
                                                id: element.idPegawai
                                            },
                                            shift: {
                                                id: shiftKerja.id
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
                        $scope.listData = arr;
                    });
                    $rootScope.doneLoad = true;
                } else {
                    modelItem.showMessages(isValid.messages);
                }
            }
            
            $scope.$watch('item.unitKerja', function(newVal, oldVal){
                if(!newVal) return;
                if((newVal && oldVal) && newVal.id == oldVal.id) return;
                $scope.isRouteLoading = true;
                findSdm.getSubUnitKerjaById(newVal.id).then(function(res){
                    $scope.listSubUnitKerja = res.data.data;
                    if($scope.item.subUnitKerja){
                        for(var i =0; i < $scope.listSubUnitKerja; i++){
                            if($scope.listSubUnitKerja[i].id = $scope.item.subUnitKerja.id){
                                $scope.item.subUnitKerja = $scope.listSubUnitKerja[i]
                            }
                        }
                    } else {
                        $scope.item.subUnitKerja = $scope.listSubUnitKerja[0]; // autobind first sub unit kerja to model item.unitKerja
                    }
                    $scope.isRouteLoading = false;
                }, (error) => {
                    $scope.isRouteLoading = false;
                    throw(error);
                })
            });
        }
    ])
});