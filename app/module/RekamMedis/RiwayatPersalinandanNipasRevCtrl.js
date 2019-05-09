define(['initialize'], function (initialize) {
    'use strict';

    initialize.controller('RiwayatPersalinandanNipasRevCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper', 'ManagePhp', 'DateHelper',
        function ($rootScope, $scope, ModelItem, $state, cacheHelper, ManagePhp, dateHelper) {

            $rootScope.showMenuPengkajianMedis = false;
            $scope.noCM = $state.params.noCM;
            $rootScope.showMenu = true;
            $rootScope.showMenuDetail = false;
            $scope.pasien = {};
            $scope.item = {};
            $scope.item.tanggal = new Date()
            $scope.noRecPap = cacheHelper.get('noRecPap');

            var data2 = [];
            $scope.listStatus = [{
                "id": 1,
                "name": "Hidup"
            },
            {
                "id": 2,
                "name": "Mati"
            },
            ]
            $scope.getDataPersalinan = function () {
                var objectfk = "RPN";
                var noregistrasifk = $state.params.noRec;
                var status = "t";
                ManagePhp.getData("rekam-medis/get-data-rekam-medis?noregistrasifk=" + noregistrasifk + '&objectfk=' + objectfk +
                    '&riwayatfk=' + $scope.noRecPap).then(function (e) {
                        $scope.dataRiwayatLalu = e.data.data;
                        var dataGrids = [];
                        if ($scope.dataRiwayatLalu.length > 0) {
                            var subStr
                            for (var i = 0; i < $scope.dataRiwayatLalu.length; i++) {
                                var object = $scope.dataRiwayatLalu[i].objectfk
                                var strLengt = object.length
                                if (strLengt == 10)
                                    subStr = parseInt(object.substr(5, 1))
                                else
                                    subStr = parseInt(object.substr(5, 2))
                                //nu grid
                                for (let z in $scope.dataRiwayatLalu) {
                                    if ($scope.dataRiwayatLalu[z].objectfk == "RPN-0" + subStr + "0001") {
                                        $scope.norectanggal = $scope.dataRiwayatLalu[z].norec
                                        $scope.tanggal = $scope.dataRiwayatLalu[z].nilai;
                                    } else if ($scope.dataRiwayatLalu[z].objectfk == "RPN-0" + subStr + "0002") {
                                        $scope.norecumur = $scope.dataRiwayatLalu[z].norec
                                        $scope.umur = $scope.dataRiwayatLalu[z].nilai
                                    } else if ($scope.dataRiwayatLalu[z].objectfk == "RPN-0" + subStr + "0003") {
                                        $scope.norecpenolong = $scope.dataRiwayatLalu[z].norec
                                        $scope.penolong = $scope.dataRiwayatLalu[z].nilai;
                                    } else if ($scope.dataRiwayatLalu[z].objectfk == "RPN-0" + subStr + "0004") {
                                        $scope.norectempat = $scope.dataRiwayatLalu[z].norec
                                        $scope.tempat = $scope.dataRiwayatLalu[z].nilai;
                                    } else if ($scope.dataRiwayatLalu[z].objectfk == "RPN-0" + subStr + "0005") {
                                        $scope.norecjenis = $scope.dataRiwayatLalu[z].norec
                                        $scope.jenis = $scope.dataRiwayatLalu[z].nilai;
                                    } else if ($scope.dataRiwayatLalu[z].objectfk == "RPN-0" + subStr + "0006") {
                                        $scope.norecpenyakit = $scope.dataRiwayatLalu[z].norec
                                        $scope.penyakit = $scope.dataRiwayatLalu[z].nilai;
                                    } else if ($scope.dataRiwayatLalu[z].objectfk == "RPN-0" + subStr + "0007") {
                                        $scope.norecberat = $scope.dataRiwayatLalu[z].norec
                                        $scope.berat = $scope.dataRiwayatLalu[z].nilai;
                                    } else if ($scope.dataRiwayatLalu[z].objectfk == "RPN-0" + subStr + "0008") {
                                        $scope.norecstatus = $scope.dataRiwayatLalu[z].norec
                                        for (var k = 0; k < $scope.listStatus.length; k++) {
                                            if ($scope.listStatus[k].name == $scope.dataRiwayatLalu[z].nilai) {
                                                $scope.status = $scope.listStatus[k].name
                                            }
                                        }
                                    }
                                }
                                data2.push({
                                    "no": subStr,
                                    "norectanggal": $scope.norectanggal,
                                    "tanggal": $scope.tanggal,
                                    "norecumur": $scope.norecumur,
                                    "umur": $scope.umur,
                                    "norecjenis": $scope.norecjenis,
                                    "jenis": $scope.jenis,
                                    "norectempat": $scope.norectempat,
                                    "tempat": $scope.tempat,
                                    "norecpenolong": $scope.norecpenolong,
                                    "penolong": $scope.penolong,
                                    "norecstatus": $scope.norecstatus,
                                    "status": $scope.status,
                                    "norecpenyakit": $scope.norecpenyakit,
                                    "penyakit": $scope.penyakit,
                                    "norecberat": $scope.norecberat,
                                    "berat": $scope.berat 
                                })


                            }
                        }
                        var grouping = []
                        for (let i in data2) {
                            data2[i].count = 1
                            var sama = false
                            for (let j in grouping) {
                                if (data2[i].no == grouping[j].no) {
                                    sama = true
                                    grouping[j].count=  parseFloat(grouping[j].count) + parseFloat(data2[i].count)
                                }
                            }
                            if(sama==false){
                                let result = {
                                    "no": data2[i].no,
                                    "norectanggal":data2[i].norectanggal,
                                    "tanggal": data2[i].tanggal,
                                    "norecumur":data2[i].norecumur,
                                    "umur":data2[i].umur,
                                    "norecjenis": data2[i].norecjenis,
                                    "jenis": data2[i].jenis,
                                    "norectempat":data2[i].norectempat,
                                    "tempat":data2[i].tempat,
                                    "norecpenolong": data2[i].norecpenolong,
                                    "penolong": data2[i].penolong,
                                    "norecstatus": data2[i].norecstatus,
                                    "status":data2[i].status,
                                    "norecpenyakit":data2[i].norecpenyakit,
                                    "penyakit":data2[i].penyakit,
                                    "norecberat": data2[i].norecberat,
                                    "berat":data2[i].berat,
                                    "count":data2[i].count,
                                  }
                                  grouping.push(result)
                            }

                        }

                        console.log(grouping)
                        data2 =grouping
                        $scope.souceGridNa = new kendo.data.DataSource({
                            data: data2,
                            _data: data2,
                            pageSize: 10,

                        });
                    })
            };

            $scope.numberPicker = {
                format: "{0:n0}"
            }
            $scope.getDataPersalinan();

            $scope.columnGridNa = [{
                "field": "no",
                "title": "No",
                "width": 36,
            },
            {
                "field": "tanggal",
                "title": "Tanggal Partus",
            },
            {
                "field": "umur",
                "title": "Umur Hamil (Bln)",
            },
            {
                "field": "penolong",
                "title": "Penolong Persalinan",
            },
            {
                "field": "tempat",
                "title": "Tempat Partus",
            },
            {
                "field": "jenis",
                "title": "Jenis Persalinan",
            },
            {
                "field": "penyakit",
                "title": "Penyulit",
            },
            {
                "field": "berat",
                "title": "Berat Badan Lahir (Kg)",
            },
            {
                "field": "status",
                "title": "Status"
            }
            ];
            $scope.tambah = function () {
                if ($scope.item.tanggal == undefined) {
                    toastr.error("Tanggal harus di isi")
                    return;
                }
                if ($scope.item.umur == undefined) {
                    toastr.error("Umur harus di isi")
                    return;
                }
                if ($scope.item.penolong == undefined) {
                    toastr.error("Penolong Persalinan harus di isi")
                    return;
                }
                if ($scope.item.tempat == undefined) {
                    toastr.error("Tempat Partus harus di isi")
                    return;
                }
                if ($scope.item.jenis == undefined) {
                    toastr.error("Jenis Persalinan harus di isi")
                    return;
                }
                if ($scope.item.penyakit == undefined) {
                    toastr.error("Penyakit harus di isi")
                    return;
                }
                // if ($scope.item.berat == undefined) {
                //     toastr.error("Berat Badan Lahir harus di isi")
                //     return;
                // }
                if ($scope.item.status == undefined) {
                    toastr.error("Pilih Status dulu")
                    return;
                }

                var nomor = 0
                if ($scope.souceGridNa == undefined) {
                    nomor = 1
                } else {
                    nomor = data2.length + 1
                }
                var data = {};
                if ($scope.item.no != undefined) {
                    for (var i = data2.length - 1; i >= 0; i--) {
                        if (data2[i].no == $scope.item.no) {
                            data.no = $scope.item.no
                            data.tanggal = moment($scope.item.tanggal).format('YYYY-MM-DD')
                            data.umur = $scope.item.umur
                            data.penolong = $scope.item.penolong
                            data.tempat = $scope.item.tempat
                            data.jenis = $scope.item.jenis
                            data.penyakit = $scope.item.penyakit
                            data.berat = $scope.item.berat != undefined ? $scope.item.berat: null
                            data.status = $scope.item.status.name
                            data.statusId = $scope.item.status.id
                            data2[i] = data;
                            $scope.souceGridNa = new kendo.data.DataSource({
                                data: data2
                            });
                        }
                    }
                } else {
                    data = {
                        no: nomor,
                        tanggal: moment($scope.item.tanggal).format('YYYY-MM-DD'),
                        umur: $scope.item.umur,
                        penolong: $scope.item.penolong,
                        tempat: $scope.item.tempat,
                        jenis: $scope.item.jenis,
                        penyakit: $scope.item.penyakit,
                        berat:  $scope.item.berat != undefined ? $scope.item.berat: null,
                        status: $scope.item.status.name,
                        statusId: $scope.item.status.id,

                    }
                    data2.push(data)
                    $scope.souceGridNa = new kendo.data.DataSource({
                        data: data2
                    });
                }
                clear();
            }
            $scope.klikMenu = function (dataSelectedGrid) {
                $scope.item.no = dataSelectedGrid.no
                for (var i = $scope.listStatus.length - 1; i >= 0; i--) {
                    if ($scope.listStatus[i].name == dataSelectedGrid.status) {
                        var status = $scope.listStatus[i]
                        break;
                    }
                }
                $scope.item.tanggal = dataSelectedGrid.tanggal;
                $scope.item.umur = dataSelectedGrid.umur;
                $scope.item.penolong = dataSelectedGrid.penolong;
                $scope.item.tempat = dataSelectedGrid.tempat;
                $scope.item.jenis = dataSelectedGrid.jenis;
                $scope.item.penyakit = dataSelectedGrid.penyakit;
                $scope.item.berat = dataSelectedGrid.berat;
                $scope.item.status = status;
            }
            $scope.hapus = function () {

                if ($scope.dataSelectedGrid == undefined) {
                    toastr.error("Pilih Data terlebih dahulu!!")
                    return;
                }
                var nomor = 0
                if ($scope.souceGridNa == undefined) {
                    nomor = 1
                } else {
                    nomor = data2.length + 1
                }
                var data = {};
                if ($scope.item.no != undefined) {
                    for (var i = data2.length - 1; i >= 0; i--) {
                        if (data2[i].no == $scope.item.no) {
                            data2.splice(i, 1);
                            for (var i = data2.length - 1; i >= 0; i--) {
                                data2[i].no = i + 1
                            }
                            $scope.souceGridNa = new kendo.data.DataSource({
                                data: data2
                            });
                        }
                    }

                }
                clear();
            }

            function clear() {
                // delete $scope.item.tanggal
                delete $scope.item.umur
                delete $scope.item.penolong
                delete $scope.item.tempat
                delete $scope.item.jenis
                delete $scope.item.penyakit
                delete $scope.item.berat
                delete $scope.item.status
                delete $scope.item.no
            }
            $scope.batal = function () {
                data2 = []
                $scope.souceGridNa = new kendo.data.DataSource({
                    data: data2
                });
                clear();
            }
            $scope.Save = function () {
                var data = [];
                var dataGrid = [];
                var nomor = 0
                var grid = $scope.souceGridNa._data;
                if ($scope.souceGridNa == undefined) {
                    nomor = 1
                } else {
                    nomor = grid.length + 1
                }

                for (var i = 0; i < grid.length; i++) {
                    // var nomor = 1;
                    nomor = grid[i].no
                    if (grid.length < 10) {
                        data.push({
                            norec: grid[i].norectanggal !== undefined ? grid[i].norectanggal : undefined,
                            objectfk: "RPN-0" + nomor + "0001",
                            nilai: moment(grid[i].tanggal).format('YYYY-MM-DD'),
                            satuan: "",
                            jenisobject: "datepicker"
                        })
                        data.push({
                            norec: grid[i].norecumur !== undefined ? grid[i].norecumur : undefined,
                            objectfk: "RPN-0" + nomor + "0002",
                            nilai: grid[i].umur,
                            satuan: "",
                            jenisobject: "textbox"
                        })
                        data.push({
                            norec: grid[i].norecpenolong !== undefined ? grid[i].norecpenolong : undefined,
                            objectfk: "RPN-0" + nomor + "0003",
                            nilai: grid[i].penolong,
                            satuan: "",
                            jenisobject: "textbox"
                        })
                        data.push({
                            norec: grid[i].norectempat !== undefined ? grid[i].norectempat : undefined,
                            objectfk: "RPN-0" + nomor + "0004",
                            nilai: grid[i].tempat,
                            satuan: "",
                            jenisobject: "textbox"
                        })
                        data.push({
                            norec: grid[i].norecjenis !== undefined ? grid[i].norecjenis : undefined,
                            objectfk: "RPN-0" + nomor + "0005",
                            nilai: grid[i].jenis,
                            satuan: "",
                            jenisobject: "textbox"
                        })
                        data.push({
                            norec: grid[i].norecpenyakit !== undefined ? grid[i].norecpenyakit : undefined,
                            objectfk: "RPN-0" + nomor + "0006",
                            nilai: grid[i].penyakit,
                            satuan: "",
                            jenisobject: "textbox"
                        })
                        data.push({
                            norec: grid[i].norecberat !== undefined ? grid[i].norecberat : undefined,
                            objectfk: "RPN-0" + nomor + "0007",
                            nilai: grid[i].berat,
                            satuan: "",
                            jenisobject: "textbox"
                        })
                        data.push({
                            norec: grid[i].norecstatus !== undefined ? grid[i].norecstatus : undefined,
                            objectfk: "RPN-0" + nomor + "0008",
                            nilai: grid[i].status,
                            satuan: "",
                            jenisobject: "combobox"
                        })
                    }
                }

                for (var i = data.length - 1; i >= 0; i--) {
                    if (data[i].norec == undefined) {
                        data[i].norec = '-'
                    }
                    if (data[i].nilai == undefined) {
                        data.splice([i], 1)
                    }
                }
                var jsonSave = {
                    data: data,
                    noregistrasifk: $state.params.noRec,
                    riwayatpapfk: $scope.noRecPap
                }
                ManagePhp.saveData(jsonSave).then(function (e) { 
                         ManagePhp.postLogging('Pengkajian Keperawatan', 'Norec Antrian Pasien Diperiksa',$state.params.noRec, 'Riwayat Persalinan dan Nifas').then(function (res) {
                         })
                });
            }





        }
    ]);
});