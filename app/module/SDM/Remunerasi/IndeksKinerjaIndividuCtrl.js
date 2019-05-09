define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('IndeksKinerjaIndividuCtrl', ['CacheHelper', 'ManagePegawai',
        'FindPegawai', 'DateHelper', 'FindSdm', 'ModelItem', 'RekamDataPegawai', 'ManageSdm',
        '$state', '$rootScope', '$scope',
        function(chacheHelper, managePegawai, findPegawai, dateHelper, findSdm, modelItem,
            RekamDataPegawai, manageSdm, $state, $rootScope, $scope) {

            /*modelItem.getDataDummyGeneric('Pegawai').then(function(e) {
                $scope.pegawais = _.sortBy(e, function(i) {
                    return i.namaLengkap;
                });
            })*/

            var idPgw=0;
            var idRuangan=0;
            $scope.yearSelected = {
                start: "year",
                depth: "year"
            };

            RekamDataPegawai.getOrderList("service/list-generic/?view=Pegawai&select=id,namaLengkap&criteria=statusEnabled&values=true").then(function(dat) {
                $scope.sourceyes = dat.data;
             //   debugger;
         });

            //mmenggantikan fitur dropdown pegawai, 
            RekamDataPegawai.getOrderList("sdm/get-id-pgw").then(function(dat) {
                idPgw = dat.data.data.id;
                idRuangan = dat.data.data.ruangan.id;
              // debugger;
          });


            $scope.cari = function() {
               // debugger;

               $scope.isLoadingData = true;
               $scope.refresh();
               var akhir = moment($scope.item.akhir).format("YYYY-MM");
               RekamDataPegawai.getOrderList("sdm/get-indek-kinerja-kuantitas/" + akhir).then(function(dat) {
     
                 $scope.dataVOloaded = true;
                 $scope.sourceOrder = dat.data.data.uraianTugas;
                 $scope.totalKuantitas = dat.data.data.totalKuantitas;

                 $scope.totalNilaiKinerja =
                 ($scope.totalKuantitas / 100) +
                 ($scope.totalKualitas  / 100) +
                 ($scope.totalPrilaku  / 100) +
                 ($scope.totalInovasi / 100);
                        //debugger;
                    $scope.isLoadingData = false;
                    });

           }

           $scope.totalKuantitas = 0;
           $scope.totalKualitas = 0;
           $scope.totalPrilaku = 0;
           $scope.totalInovasi = 0;
           $scope.totalNilaiKinerja = 0;

           $scope.now = new Date();

           $scope.refreshCustomUraian = function() {
            findPegawai.getCustomUraianKerja(idPgw,
                $scope.selectedTahun.id, $scope.selectedBulan.id + 1).then(function(data) {
                    var temp = $scope.listData;
                    var items = modelItem.beforePost(data.data.data.items, true);
                    for (var key in items) {
                        if (items.hasOwnProperty(key)) {
                            var element = items[key];
                            var arr = [];
                            for (var i in temp) {
                                if (temp.hasOwnProperty(i)) {
                                    var subItem = temp[i];
                                    arr.push(subItem);
                                    if (subItem.head === element.kelompok) {
                                        var subItem = {
                                            rincianKegiatan: element.judul,
                                            bobot: element.bobot,
                                            target: element.targer,
                                            id: element.id,
                                            isCustomUraian: true

                                        };
                                        if (subItem.total === undefined)
                                            subItem.total = 0;
                                        subItem.listDay = [];
                                        for (var j = 0; j < $scope.listDay.length; j++) {
                                            var item = _.filter(element.items, function(e) {
                                                return e.tanggal.getDate() === $scope.listDay[j].id;
                                            });
                                            var data = {
                                                id: $scope.listDay[j].id,
                                                day: $scope.listDay[j].day,
                                                display: $scope.listDay[j].display,
                                                date: $scope.listDay[j].date,

                                            };

                                            if (item.length !== 0) {
                                                data.value = item[0].value;
                                                data.noRec = item[0].noRec;
                                                if (item[0].value !== undefined) {
                                                    subItem.total += item[0].value;
                                                }
                                            }
                                            subItem.listDay.push(data);
                                        }
                                        subItem.currentDate = subItem.listDay[0];
                                        arr.push(subItem);

                                    }
                                }
                            }
                            temp = arr;
                        }
                    }
                    $scope.listData = temp;

                    var title = "";
                    var index = 0;
                    for (var key in $scope.listData) {
                        if ($scope.listData.hasOwnProperty(key)) {
                            var element = $scope.listData[key];
                            if (element.isHead === true) {
                                if (title === 'Kuantitas (50%)')
                                    $scope.totalKuantitas = $scope.totalKuantitas / index;
                                if (title === 'Kualitas (20%)')
                                    $scope.totalKualitas = $scope.totalKualitas / index;
                                if (title === 'Perilaku (20%)')
                                    $scope.totalPrilaku = $scope.totalPrilaku / index;

                                title = element.head;
                                index = 0;
                            } else {
                                if (element.target == null)
                                    element.target = 1;
                                if (element.bobot == null)
                                    element.bobot = 1;
                                if (title === 'Kuantitas (50%)') {

                                    $scope.totalKuantitas += element.total / element.target * element.bobot;
                                }
                                if (title === 'Kualitas (20%)') {

                                    $scope.totalKualitas += element.total / element.target * element.bobot;
                                }
                                if (title === 'Perilaku (20%)')
                                    $scope.totalPrilaku += element.total / element.target * element.bobot;
                                if (title === 'Inovasi (10%)')
                                    $scope.totalInovasi += element.total / element.target * element.bobot;
                                index++;
                            }
                        }
                    }
                    if (title === 'Inovasi (10%)')
                        $scope.totalInovasi = $scope.totalInovasi / (index);

                    // $scope.totalNilaiKinerja =
                    //     ($scope.totalKuantitas * 50 / 100) +
                    //     ($scope.totalKualitas * 20 / 100) +
                    //     ($scope.totalPrilaku * 20 / 100) +
                    //     ($scope.totalInovasi * 20 / 100);

                });
}


$scope.item = {};
$scope.item.tanggal = new Date();
$scope.$watch('item.tanggal', function(e) {
    if (e === undefined) return;
    if ($scope.selectedBulan.id !== e.getMonth() + 1 || $scope.selectedTahun.id !== e.getFullYear()) {
        $scope.selectedBulan = $scope.listMonth[e.getMonth()];
        $scope.selectedTahun = _.filter($scope.listTahun, function(a) {
            return a.id === e.getFullYear()
        })[0];

    }
    $scope.index = e.getDate();
})
$scope.index = 1;

            /*    modelItem.getDataDummyGeneric('ShiftKerja').then(function(e) {
                    $scope.shiftKerja = _.filter(e, function(i) {
                        return i.kelompokShiftId === 4;
                    });
                })*/

             //   $scope.$watch('item.pegawai', function(e) {
               //     if (e === undefined) return;
              //  // $scope.refresh();
             //   });

             $scope.listTahun = [];
             for (var i = 2014; i <= new Date().getFullYear(); i++)
                $scope.listTahun.push({
                    id: i
                });

            $scope.listMonth = [];
            for (var i = 0; i <= 11; i++)
                $scope.listMonth.push({
                    id: i,
                    name: dateHelper.toMonth(i)
                });

            //    $scope.$watch('selectedTahun', function(e) {
            //        if (e === undefined) return;
           //     //$scope.refresh();
          //  });

             //   $scope.$watch('selectedBulan', function(e) {
             //       if (e === undefined) return;
              //      $scope.refresh();
              //  });

              var getDaysInMonth = function(month, year) {
                return new Date(year, month + 1, 0).getDate();
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
                if (item.isHead === true) return;
                    //if (item.pegawai === undefined) return;
                   /* if (item.pegawai.shiftKerja.id === 1) {
                        arrLibur = [0];
                        tgl.shiftKerja = item.pegawai.shiftKerja.detail[0];
                    } else if (item.pegawai.shiftKerja.id === 2) {
                        arrLibur = [0, 6];
                    } else if (item.pegawai.shiftKerja.id === 3) {
                        arrLibur = [0];
                    }*/
                    tgl.isLibur = arrLibur.indexOf(tgl.date.getDay()) !== -1;
                }

                $scope.Save = function() {
                    debugger;
                    var items = [];
                    for (var key in $scope.listData) {
                        if ($scope.listData.hasOwnProperty(key)) {
                            debugger;
                            var element = $scope.listData[key];
                            if (element.isHead !== true) {
                                for (var i in element.listDay) {
                                    if (element.listDay.hasOwnProperty(i)) {
                                        var subElement = element.listDay[i];
                                        if (subElement.value !== undefined) {
                                            if (subElement.value === '')
                                                subElement.value = "0";

                                        // if (element.rincianKegiatan !== 'Keberadaan (dihitung oleh bagian SDM)' && subElement.date !== undefined) {
                                        //     var data = {
                                        //         "tanggal": subElement.date,
                                        //         "uraianTugas": { id: element.id },
                                        //         "pegawai": { id: $scope.item.pegawai.id },
                                        //         "noRec": subElement.noRec,
                                        //         "nilai": subElement.value
                                        //     }
                                        //     items.push(data);
                                        // }

                                        if (element.rincianKegiatan !== 'Keberadaan (dihitung oleh bagian SDM)') {
                                            var data = {
                                                "tanggal": subElement.date,
                                                "uraianTugas": {
                                                    id: element.id
                                                },
                                                "pegawai": {
                                                    id: idPgw
                                                },
                                                "noRec": subElement.noRec,
                                                "isCustom": element.isCustomUraian === undefined ? false : element.isCustomUraian,
                                                "nilai": subElement.value
                                            }

                                            items.push(data);
                                            debugger;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                managePegawai.saveIndexKinerja(modelItem.beforePost(items)).then(function(e) {
                    console.log(items);
                    $scope.temp = "";
                    $scope.refresh();
                });

            };
            $scope.Commit = function(item) {
                var arr = [];
                for (var key in $scope.listData) {
                    if ($scope.listData.hasOwnProperty(key)) {
                        var element = $scope.listData[key];
                        if (element.parent !== undefined) {
                            if (element.parent.isHead === true && element.parent.head === item.parent.head) {
                                arr.push(element);
                            }
                        }

                    }
                }
                arr = modelItem.beforePost(arr);

            };
            $scope.Add = function(item) {
               debugger;
                var obj = undefined; // chacheHelper.get($scope.item.pegawai.id + "" + $scope.selectedTahun.id + "" + $scope.selectedBulan.id + "" + item.head);
                if (obj === undefined)
                    obj = [];
                obj.push({
                    rincianKegiatan: "",
                    isHead: false,
                    isCustom: true,
                    bobot: "1",
                    parent: item
                });
                var arr = [];
                for (var key in $scope.listData) {
                    if ($scope.listData.hasOwnProperty(key)) {
                        var element = $scope.listData[key];
                        arr.push(element);
                        if (element.isHead === true && element.head === item.head) {
                            for (var i in obj) {
                                if (obj.hasOwnProperty(i)) {
                                    var subElement = obj[i];
                                    arr.push(subElement);
                                }
                            }
                        }
                    }
                }
                $scope.listData = arr;
            };

            $scope.update = function(item) {
                if (item.bobot === null || item.bobot === undefined || item.target == null || item.target === undefined) return;
                if (item.id === undefined) {
                    item.id = 0;
                }
                if (item.isCustom !== undefined && item.id === 0)
                    item.id = -1;
                item.isUpdate = true;//$scope.item.pegawai.jabatanFungsionalId disini 0 
                manageSdm.updateUraian(item.id, item.bobot, item.target, item.isCustom, item.rincianKegiatan, item, 0,idPgw, item.parent.head).then(function(e) {
                    item.isUpdate = false;
                });
                $scope.refresh();
                $scope.totalNilaiKinerja =
                ($scope.totalKuantitas / 100) +
                ($scope.totalKualitas  / 100) +
                ($scope.totalPrilaku  / 100) +
                ($scope.totalInovasi / 100);

            }


            $scope.navToRencanaPemeriksaan = function(selectedData) {
                console.log(JSON.stringify(idPgw))
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

             /*   if ($scope.selectedBulan === undefined || $scope.selectedTahun === undefined || $scope.item.pegawai === undefined) {
                    return;
                }
                if ($scope.item.pegawai.id + "" + $scope.selectedTahun.id + "" + $scope.selectedBulan.id === $scope.temp)
                    return;
                */
                $scope.listData = [];
                $scope.temp = idPgw + "" + $scope.selectedTahun.id + "" + $scope.selectedBulan.id;
                $rootScope.doneLoad = false;

              ///  RekamDataPegawai.getOrderList("/sdm/get-kualitas-inovasi-IKI/2017-01" + akhir).then(function(i) {

                findPegawai.findUraianKerja(0, idPgw).then(function(i) {
                    var arr = [];
                    arr = [];
                    arr.push({head: "", isHead: true})

                    $scope.sourceOrder = new kendo.data.DataSource({
                        data: $scope.sourceOrder,
                        //pageSize: 5,
                        aggregate: [
                        {field: "target", aggregate: "sum" },
                        {field: "bobot", aggregate: "sum" }
                        ]
                    });



                    $scope.mainGridOption = {
                        //pageable : true,
                        columns: [{
                            field: "rincianKegiatan",
                            title: "Uraian Tugas",
                            width: "10%",
                            footerTemplate: "Jumlah:"

                        },
                        {
                            field: "target",
                            title: "Target",
                            width: "4%",
                            aggregates: ["sum"],
                            footerTemplate: " #= kendo.toString(sum,'0')#"

                        },
                        {
                            field: "bobot",
                            title: "Bobot",
                            width: "4%",
                            aggregates: ["sum"],
                            footerTemplate: " #= kendo.toString(sum,'0')#"

                        },
                        {

                            title: "<center>Tanggal</center> ",
                            columns: [{
                                field: "[1]",
                                title: "1"

                            },
                            {
                                field: "[2]",
                                title: "2"
                            },
                            {
                                field: "[3]",
                                title: "3"


                            },
                            {
                                field: "[4]",
                                title: "4"


                            },
                            {
                                field: "[5]",
                                title: "5"


                            },
                            {
                                field: "[6]",
                                title: "6"


                            },
                            {
                                field: "[7]",
                                title: "7"


                            },
                            {
                                field: "[8]",
                                title: "8"


                            },
                            {
                                field: "[9]",
                                title: "9"


                            },
                            {
                                field: "[10]",
                                title: "10"


                            },
                            {
                                field: "[11]",
                                title: "11"


                            },
                            {
                                field: "[12]",
                                title: "12"


                            },
                            {
                                field: "[13]",
                                title: "13"


                            },
                            {
                                field: "[14]",
                                title: "14"


                            },
                            {
                                field: "[15]",
                                title: "15"


                            },
                            {
                                field: "[16]",
                                title: "16"


                            },
                            {
                                field: "[17]",
                                title: "17"


                            },
                            {
                                field: "[18]",
                                title: "18"


                            },
                            {
                                field: "[19]",
                                title: "19"


                            },
                            {
                                field: "[20]",
                                title: "20"


                            },
                            {
                                field: "[21]",
                                title: "21"


                            },
                            {
                                field: "[22]",
                                title: "22"


                            },
                            {
                                field: "[23]",
                                title: "23"

                            },
                            {
                                field: "[24]",
                                title: "24"


                            },
                            {
                                field: "[25]",
                                title: "25"


                            },
                            {
                                field: "[26]",
                                title: "26"


                            },
                            {
                                field: "[27]",
                                title: "27"


                            },
                            {
                                field: "[28]",
                                title: "28"

                            },
                            {
                                field: "[29]",
                                title: "29"


                            },
                            {
                                field: "[30]",
                                title: "30"

                            },
                            {
                                field: "[31]",
                                title: "31"

                            }
                            ],


                        }, {

                            "field": "total",
                            "title": "Total",
                            "width": "4%",
                            "format": "{0:n2}"

                        }, {

                            "field": "nilai",
                            "title": "Nilai",
                            "width": "4%",
                            "format": "{0:n2}"


                        }, {

                            "field": "hasil",
                            "title": "Hasil",
                            "width": "4%",
                            "format": "{0:n2}"


                        }
                        ]

                    }

                    arr.push({
                        head: "Kualitas (20%)",
                        isHead: true,
                        canAdd: true
                    })
                    var obj = undefined;
                    if (obj !== undefined) {
                        for (var key in obj) {
                            if (obj.hasOwnProperty(key)) {
                                var element = obj[key];
                                element.isHead = false;
                                arr.push(element)
                            }
                        }
                    }
                    arr.push({
                        head: "Perilaku (20%)",
                        isHead: true
                    });
                    arr.push({
                        id: 2130,
                        rincianKegiatan: "Keberadaan (dihitung oleh bagian SDM)",
                        isHead: false
                    });
                    arr.push({
                        head: "Inovasi (10%)",
                        isHead: true,
                        canAdd: true
                    })
                    var obj = undefined;
                    if (obj !== undefined) {
                        for (var key in obj) {
                            if (obj.hasOwnProperty(key)) {
                                var element = obj[key];
                                element.isHead = false;
                                arr.push(element)
                            }
                        }
                    }

                    $scope.listData = arr;
                    findPegawai.getDokterRuangan(idRuangan, $scope.selectedTahun.id, $scope.selectedBulan.id + 1,idPgw).then(function(e) {
                        var arr = [];
                        //debugger;
                        for (var k in $scope.listData) {
                            if ($scope.listData.hasOwnProperty(k)) {
                                var itemElement = $scope.listData[k];
                                itemElement.total = 0;
                                if (e.data.data == null) {
                                    $scope.refreshCustomUraian();
                                    return;
                                }
                                var element = e.data.data.data[0];
                                itemElement.pegawai = element.pegawai;
                                itemElement.listDay = [];
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
                                    if (itemElement.rincianKegiatan === 'Keberadaan (dihitung oleh bagian SDM)') {
                                        itemElement.listDay.push({
                                            id: $scope.listDay[j].id,
                                            day: $scope.listDay[j].day,
                                            display: $scope.listDay[j].display,
                                            date: $scope.listDay[j].date,
                                            shiftKerja: shiftKerja,
                                            kehadiranKerja: kehadiranKerja,
                                            value: kehadiranKerja === undefined ? '' : kehadiranKerja.kodeExternal,
                                            idParent: idParent
                                        });
                                        if (kehadiranKerja !== undefined && kehadiranKerja.kodeExternal === 'H') {
                                            itemElement.total += 1;
                                        }
                                    } else {
                                        itemElement.listDay.push({
                                            id: $scope.listDay[j].id,
                                            day: $scope.listDay[j].day,
                                            display: $scope.listDay[j].display,
                                            date: $scope.listDay[j].date,
                                            shiftKerja: shiftKerja,
                                            kehadiranKerja: kehadiranKerja,
                                            idParent: idParent
                                        });
                                    }

                                }
                                itemElement.currentDate = itemElement.listDay[0];

                                arr.push(itemElement);
                            }
                        }
                        findPegawai.getIndekKinerja(idPgw, $scope.selectedTahun.id, $scope.selectedBulan.id + 1).then(function(item) {
                            $rootScope.doneLoad = true;
                            var arr = modelItem.beforePost(item.data.data.items, true);
                            for (var key in arr) {
                                if (arr.hasOwnProperty(key)) {
                                    var element = arr[key];
                                    var tempArr = [];
                                    for (var i in $scope.listData) {

                                        if ($scope.listData.hasOwnProperty(i)) {
                                            var subElement = $scope.listData[i];
                                            if (subElement.total === undefined)
                                                subElement.total = 0.0;
                                            if (subElement.isHead !== true) {
                                                for (var k in subElement.listDay) {
                                                    if (subElement.listDay.hasOwnProperty(k)) {
                                                        var subDay = subElement.listDay[k];
                                                        if (element.uraianTugas !== undefined) {
                                                            if (element.uraianTugas.id === subElement.id && element.tanggal.toString() === subDay.date.toString()) {
                                                                subDay.value = element.nilai;
                                                                subElement.total += element.nilai;
                                                                subDay.noRec = element.noRec;
                                                            }
                                                        }

                                                    }
                                                }

                                            }
                                            tempArr.push(subElement);
                                        }
                                    }
                                    $scope.listData = tempArr;

                                }
                            }
                            $scope.refreshCustomUraian();

                        });
                        // $scope.listData = arr;
                    });
})

}
}

])
});