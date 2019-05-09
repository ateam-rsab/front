define(['initialize', 'Configuration'], function(initialize, configuration) {
    'use strict';
    initialize.controller('AbsensiPegawaiCtrl', ['$timeout', 'fileUpload', 'ManagePegawai', 'FindPegawai', 'DateHelper', 'FindSdm', 'ModelItem', 'ManageSdm', '$state', '$rootScope', '$scope',
        function($timeout, fileUpload, managePegawai, findPegawai, dateHelper, findSdm, modelItem, manageSdm, $state, $rootScope, $scope) {
            $scope.onSelectFile = function(e) {
                $scope.files = e.files;
            }

            $scope.uploadFile = function() {
                var f = $scope.files; {
                    var fr = new FileReader();
                    if (FileReader && f && f.length) {
                        fr.readAsDataURL(f[0].rawFile);
                        fr.onload = function() {

                            var imageData = fr.result
                            var tempArray = imageData.split(",");

                            var dataPost = {
                                // Create a view
                                fileInput: tempArray[1],
                                fileName: f[0].name
                            };
                            manageSdm.uploadFile(tempArray[1]).then(function(e) {
                                $scope.isLoading = true;
                                $timeout(function() {
                                    var items = [];
                                    var source = modelItem.beforePost(e.data.data.items, true);
                                    var group = _.groupBy(source, 'id');
                                    for (var key in group) {
                                        if (group.hasOwnProperty(key)) {
                                            var element = group[key];
                                            var groupPerDay = _.groupBy(element, 'hari');
                                            for (var i in groupPerDay) {
                                                if (groupPerDay.hasOwnProperty(i)) {
                                                    var detail = groupPerDay[i];
                                                    if (detail.length >= 2) {
                                                        items.push({
                                                            pegawai: {
                                                                id: detail[0].id
                                                            },
                                                            tglMasuk: detail[0].tgl,
                                                            tglKeluar: detail[1].tgl
                                                        })

                                                    }
                                                }
                                            }

                                        }
                                    }
                                    manageSdm.saveAbsensi(modelItem.beforePost(items));
                                })

                            });
                            // manageAkuntansi.sampleUploadFile(dataPost).then(function(e) {

                            // });
                        };
                    }


                }
                // debugger;
                // var file = $scope.myFile;

                // console.log('file is ');
                // console.dir(file);

                // var uploadUrl = configuration.baseApiUrlData + "sdm/upload-absen?X-AUTH-TOKEN=" + modelItem.getAuthorize();
                // fileUpload.uploadFileToUrl(file, uploadUrl);
            };
            // modelItem.getDataDummyGeneric('Ruangan').then(function(e) {
            //     $scope.ruangans = _.sortBy(e, function(i) {
            //         return i.namaRuangan;
            //     });
            // })
            findSdm.getUnitKerja().then(function(result){
                $scope.ruangans = result.data.data;
            })
            modelItem.getDataDummyGeneric('ShiftKerja').then(function(e) {
                $scope.shiftKerja = _.filter(e, function(i) {
                    return i.kelompokShiftId === 4;
                });
            })
            $scope.listTahun = [];
            for (var i = 2014; i <= new Date().getFullYear(); i++)
                $scope.listTahun.push({ id: i });
            $scope.listMonth = [];
            for (var i = 0; i <= 11; i++)
                $scope.listMonth.push({
                    id: i,
                    name: dateHelper.toMonth(i)
                });
            $scope.$watch('item.ruangan', function(e) {
                if (e === undefined) return;
                $scope.refresh();
            });
            $scope.$watch('selectedTahun', function(e) {
                if (e === undefined) return;
                $scope.refresh();
            });
            $scope.$watch('selectedBulan', function(e) {
                if (e === undefined) return;

                $scope.refresh();
            });
            var getDaysInMonth = function(month, year) {
                // Here January is 1 based  
                //Day 0 is the last day in the previous month  
                return new Date(year, month + 1, 0).getDate();
                // Here January is 0 based  
                // return new Date(year, month+1, 0).getDate();  
            }
            $scope.changeShift = function(item, tgl) {
                if (tgl.kehadiranKerja == undefined)
                    tgl.kehadiranKerja = $scope.shiftKerja[0];
                else {
                    var index = $scope.shiftKerja.indexOf(tgl.kehadiranKerja);
                    index = index + 1;
                    if (index === $scope.shiftKerja.length)
                        index = 0;
                    tgl.kehadiranKerja = $scope.shiftKerja[index];
                }
            }
            $scope.selectedBulan = $scope.listMonth[new Date().getMonth()];
            $scope.selectedTahun = $scope.listTahun[$scope.listTahun.length - 1];
            $scope.initialize = function(item, tgl) {
                var arrLibur = [];
                if (item.pegawai.shiftKerja.id === 1) {
                    arrLibur = [0];
                    tgl.shiftKerja = item.pegawai.shiftKerja.detail[0];
                } else if (item.pegawai.shiftKerja.id === 2) {
                    arrLibur = [0, 6];
                } else if (item.pegawai.shiftKerja.id === 3) {
                    arrLibur = [0];
                }
                tgl.isLibur = tgl.shiftKerja === undefined;
                //tgl.shiftKerja = undefined;

            }
            $scope.Save = function() {

                var items = [];
                for (var key in $scope.listData) {
                    if ($scope.listData.hasOwnProperty(key)) {
                        var element = $scope.listData[key];
                        for (var i in element.listDay) {
                            if (element.listDay.hasOwnProperty(i)) {
                                var subElement = element.listDay[i];
                                if (subElement.kehadiranKerja !== undefined) {
                                    var data = {
                                        id: subElement.idParent,
                                        ruangan: {
                                            id: $scope.item.ruangan.id
                                        },
                                        dokter: {
                                            id: element.pegawai.id
                                        },
                                        jadwalPraktek: {
                                            id: subElement.kehadiranKerja.id
                                        },
                                        tanggalJadwal: subElement.date
                                    }
                                    items.push(data);
                                }
                            }
                        }

                    }
                }
                managePegawai.updateAbsensi(modelItem.beforePost(items)).then(function(e) {
                    $scope.temp = "";
                    $scope.refresh();

                });
            };
            $scope.refresh = function() {
                if ($scope.selectedTahun !== undefined && $scope.selectedBulan !== undefined) {
                    $scope.listDay = [];
                    var max = getDaysInMonth($scope.selectedBulan.id, $scope.selectedTahun.id);
                    for (var i = 1; i <= max; i++) {
                        $scope.listDay.push({
                            id: i,
                            day: dateHelper.DescDay(new Date($scope.selectedTahun.id, $scope.selectedBulan.id, i)),
                            display: dateHelper.DescDay(new Date($scope.selectedTahun.id, $scope.selectedBulan.id, i), true),
                            date: new Date($scope.selectedTahun.id, $scope.selectedBulan.id, i)
                        });
                    }
                }
                if ($scope.item === undefined)
                    return;
                if ($scope.selectedBulan === undefined || $scope.selectedTahun === undefined || $scope.item.ruangan === undefined) {
                    return;
                }
                if ($scope.item.ruangan.id + "" + $scope.selectedTahun.id + "" + $scope.selectedBulan.id === $scope.temp)
                    return;
                $scope.listData = [];
                $scope.temp = $scope.item.ruangan.id + "" + $scope.selectedTahun.id + "" + $scope.selectedBulan.id;
                $rootScope.doneLoad = false;
                findPegawai.getDokterRuangan($scope.item.ruangan.id, $scope.selectedTahun.id, $scope.selectedBulan.id + 1).then(function(e) {
                    var arr = [];
                    $rootScope.doneLoad = true;
                    for (var i = 0; i < e.data.data.data.length; i++) {
                        var element = e.data.data.data[i];
                        element.listDay = [];
                        for (var j = 0; j < $scope.listDay.length; j++) {
                            var shiftKerja = undefined;
                            var kehadiranKerja = undefined;
                            var idParent = undefined;
                            if (element.jadwal !== undefined) {
                                element.jadwal = modelItem.beforePost(element.jadwal, true);
                                var filter = _.filter(element.jadwal, function(e) {
                                    return e.tanggalJadwal.getDate() === $scope.listDay[j].date.getDate();
                                });
                                if (filter.length !== 0) {
                                    var jadwalPraktek = filter[0].jadwalPraktek;
                                    kehadiranKerja = filter[0].statusKehadiran;
                                    var praktek = _.filter(element.pegawai.shiftKerja.detail, function(data) {
                                        return data.jadwalPraktek.id === jadwalPraktek.id;
                                    });
                                    if (praktek.length !== 0) {
                                        shiftKerja = praktek[0];
                                        idParent = filter[0].id;
                                    }
                                }
                            }
                            if (element.statusKehadiran === undefined)
                                element.listDay.push({
                                    id: $scope.listDay[j].id,
                                    day: $scope.listDay[j].day,
                                    display: $scope.listDay[j].display,
                                    date: $scope.listDay[j].date,
                                    shiftKerja: shiftKerja,
                                    kehadiranKerja: kehadiranKerja,
                                    idParent: idParent
                                });
                        }
                        arr.push(element);
                    }

                    $scope.listData = arr;
                });
            }
        }

    ])
});