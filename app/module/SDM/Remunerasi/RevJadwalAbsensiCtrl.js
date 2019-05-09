define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('RevJadwalAbsensiCtrl', ['$q', 'ManagePegawai', 'FindPegawai', 'DateHelper', 'FindSdm', 'ModelItem', 'ManageSdm', '$state', '$rootScope', '$scope', '$mdDialog', '$timeout','ManageSarprasPhp',
        function($q, managePegawai, findPegawai, dateHelper, findSdm, modelItem, manageSdm, $state, $rootScope, $scope, $mdDialog, $timeout, manageSarprasPhp) {
            $scope.isRouteLoading = true;
            $scope.ruanganKerja = [213, 217, 362, 57, 106, 105]; // daftar ruangan dengan otoritas penuh
            $scope.dataShiftPegawai = [] /* temp array data shift pegawai yang akan di simpan ke backend */
            $scope.simpan = true;

            if($scope.ruanganKerja.includes(modelItem.getPegawai().ruangan.id)){
                findSdm.getUnitKerja().then(function(res){
                   $scope.listUnitKerja = res.data.data;                          
               }) 
            }else{             
             manageSdm.getItem("/map-pegawai-jabatan-unitkerja/get-unit-by-pegawai-jadwal/"+ modelItem.getPegawai().id).then(function(res){
               $scope.listUnitKerja = res.data.data;                          
           })
         }
         $q.all([
            manageSarprasPhp.getDataTableMaster("monitoringabsensi/get-status-create-jadwal?id=" + modelItem.getPegawai().id),
            manageSarprasPhp.getDataTableMaster("monitoringabsensi/get-drop-down-unit-jadwal?id=" + modelItem.getPegawai().id),
            manageSdm.getItem("service/list-generic/?view=ShiftKerja&select=id,kodeExternal,namaShift,jamMasuk,jamPulang,statusEnabled&criteria=statusEnabled&values=true")
            ]).then(function(res){
                if(res[2].statResponse){
                    $scope.listJadwal = res[2].data;
                }
                $scope.isMonitoring = res[0].data.dataMonitoring;
                var single = res[0].data.dataSingle[0];
                if($scope.isMonitoring){ 
                    findSdm.getUnitKerja().then(function(dat) {
                      $scope.listUnitKerja = dat.data.data;
                   });
                }else{
                     $scope.listUnitKerja = res[1].data.data;
                }
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
                // Here January is 1 based  
                //Day 0 is the last day in the previous month  
                return new Date(year, month + 1, 0).getDate();
                // Here January is 0 based  
                // return new Date(year, month+1, 0).getDate();  
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
                    var str = $scope.currentUserLogin.jabatanInternal;
                    if(!str){
                        $scope.showAlert('Unauthorized');
                        return;
                    }
                    if(str.indexOf("Kepala") >= 0){
                        if($scope.currentUserLogin.idSubUnitKerja == $scope.item.subUnitKerja.id){
                            obj.status = true;
                            return obj;
                        } else {
                            obj.message = "Ruangan tidak valid.";
                            return obj;
                        }
                    };
                }

            }
            $scope.changeShift = function(item, tgl) {
                if (tgl.kehadiranKerja !== undefined) {
                    window.messageContainer.info('Data kehadiran sudah terisi');
                    return;
                }
                var objValid = $scope.checkRuanganKerja(modelItem.getPegawai().ruangan.id, $scope.ruanganKerja);

                if (objValid.status){
                    $scope.selectedShift = tgl;
                    $scope.selectedPegawai = item.pegawai;
                    $scope.selectedPegawai.tanggalDinas = dateHelper.getTanggalFormatted(new Date(tgl.tanggal.tanggal));
                    for (let index = 0; index < item.pegawai.shiftKerja.detail.length; index++) {
                       if(item.pegawai.shiftKerja.detail[index].jamMasuk == undefined 
                        || item.pegawai.shiftKerja.detail[index].jamMasuk ==""
                        || item.pegawai.shiftKerja.detail[index].jamMasuk ==null){
                        item.pegawai.shiftKerja.detail[index].text = 
                    item.pegawai.shiftKerja.detail[index].kodeExternal  
                }else{
                    item.pegawai.shiftKerja.detail[index].text = 
                    item.pegawai.shiftKerja.detail[index].kodeExternal + '\t' + 
                    item.pegawai.shiftKerja.detail[index].jamMasuk + '-' + 
                    item.pegawai.shiftKerja.detail[index].jamPulang
                }

            }
            $scope.daftarShiftPegawai = item.pegawai.shiftKerja.detail;
            tgl.popupEditor = false;
        } else {
            $scope.showAlert(objValid.message);
            return;
        }

    }
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
        shift.popupEditor = true;
    }
    $scope.getClassDay = function(item, tgl) {
        if (tgl.shiftKerja && tgl.shiftKerja.kodeExternal == "L") {
            return "holiday";
        } else {
            return "in";
        }
    }

    $scope.item ={
        selectedBulan: $scope.listMonth[new Date().getMonth()],
        selectedTahun: $scope.listTahun[$scope.listTahun.length - 1]
    };

    $scope.initialize = function(item, tgl) {
        var arrLibur = [];
        tgl.isLibur = arrLibur.indexOf(tgl.date.getDay()) !== -1;
        tgl.popupEditor = true;
    }
    $scope.Save = function() {
        $scope.simpan = false;
        if($scope.dataShiftPegawai.length > 0){
            $scope.isRouteLoading = true;
            managePegawai.savejadwalPegawai($scope.dataShiftPegawai).then(function(e) {
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
                  },(err)=>{
                    $scope.isRouteLoading = false;
                    $scope.simpan = true;
                    throw err;
                });
        } else {
            messageContainer.error('Tidak ada perubahan jadwal dinas pegawai!');
            $scope.simpan = true;
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
            $scope.listData = [];
            $rootScope.doneLoad = false;
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
                            var pegawaiNonShift = element.pegawai.shiftKerja ? element.pegawai.shiftKerja.id : null;

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
                                    if(listIdNonShift.includes(pegawaiNonShift) && (!idParent && shiftKerja !== undefined)){
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
                    },function(err){
                        toastr.warning('Something went wrong');
                        throw err;
                    }).then(function(){
                        $rootScope.doneLoad = true;
                        $scope.isRouteLoading = false;
                        $timeout( function() {
                            // alert('content loaded');
                            renderingDone();
                        });
                    });
                } else {
                    $scope.isRouteLoading = false;
                    modelItem.showMessages(isValid.messages);
                }
            } //end refresh

         $scope.$watch('item.unitKerja', function(newVal, oldVal) {
                if (!newVal) return;
                if ((newVal && oldVal) && newVal.id == oldVal.id || $scope.isSingle === true ) return;

                if($scope.isMonitoring){ 
                   manageSarprasPhp.getDataTableMaster("monitoringabsensi/get-drop-down-subunit?id=" + modelItem.getPegawai().id + "&idUnit=" + newVal.id + "&isMonitoring=" + $scope.isMonitoring).then(function(data) {
                    $scope.item.subUnitKerja = "";
                    $scope.listSubUnitKerja = data.data;
                   });
                }else{
                     manageSarprasPhp.getDataTableMaster("monitoringabsensi/get-drop-down-subunit-jadwal?id="+modelItem.getPegawai().id+"&idUnit=" + newVal.id).then(function(data) {
                      $scope.item.subUnitKerja = "";
                      $scope.listSubUnitKerja = data.data;
                   });
                }
               

            });

           
            $scope.setElementCss = function(){
                var element = angular.element(document.querySelector('#jadwalDinas')); 
                if($scope.listData.length<8){
                    element.css('overflow','hidden');
                } else {
                    element.css('overflow','auto');
                }
            }
            function renderingDone(){
                var row = $('#tabelJadwal').find(' tbody tr td:first');
                var rowWidth = row.width(); 
                var rowthead = $('#tabelJadwal').find(' thead tr:first>th:first');
                rowthead.css({'width' : rowWidth});
            }
        }
        ])
});