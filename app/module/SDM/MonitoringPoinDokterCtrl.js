define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('MonitoringPoinDokterCtrl', ['CacheHelper', 'ManagePegawai', 'FindPegawai', 'DateHelper', 'FindSdm', 'ModelItem', 'RekamDataPegawai', 'ManageSdm', '$state', '$rootScope', '$scope', '$mdDialog', 'FindSdm',
        function (chacheHelper, managePegawai, findPegawai, dateHelper, findSdm, modelItem, RekamDataPegawai, ManageSdm, $state, $rootScope, $scope, $mdDialog, FindSdm) {

            $scope.now = new Date();
            $scope.item = {};
            $scope.dataItem = {};
            $scope.item.tanggal = new Date();
            $scope.totalKuantitas = 0;
            $scope.totalKualitas = 0;
            $scope.totalPrilaku = 0;
            $scope.totalInovasi = 0;
            $scope.totalNilaiKinerja = 0;
            $scope.capaianKehadiran = 0;
            var status = false;
            var tanggalData;
            var dataKualitas = [];
            var dataPrilaku = [];
            var dataInovasi = [];
            var idPgw = 0;
            var idRuangan = 0;

            $scope.yearSelected = {
                start: "year",
                depth: "year"
            };

            //mmenggantikan fitur dropdown pegawai, 
            RekamDataPegawai.getOrderList("sdm/get-id-pgw").then(function (dat) {
                idPgw = dat.data.data.id;
                idRuangan = dat.data.data.ruangan.id;
            });

            $scope.createColumn = function () {
            debugger;
                var year = parseInt(moment($scope.item.akhir).format("Y"))
                var month = parseInt(moment($scope.item.akhir).format("M"))
                var tempDate = new Date(year, month, 0);

                var list = [];

                for (var i = 0; i < tempDate.getDate(); i++) {
                    var data = {
                        field: "[" + (i + 1) + "]",
                        title: (i + 1).toString(),
                        format: "{0:n1}",
                        width: "50px"
                    };

                    list.push(data);
                }

                return list;
            }

            $scope.sourceOrder = new kendo.data.DataSource();
                $scope.cari = function () {
                $scope.isLoadingData = true;
                tanggalData = moment($scope.item.akhir).format("YYYY-MM");
                RekamDataPegawai.getOrderList("sdm/get-poin-dokter/"+$scope.item.ruangan.id+"/"+tanggalData+"?").then(function (dat) {
                    $scope.datax = dat.data.data;
                    $scope.sourceOrder = new kendo.data.DataSource({
                        data: $scope.datax,
                        aggregate: [
                            {field: "bobot", aggregate: "sum", width: "100%"},
                            {field: "hasil", aggregate: "sum", width: "100%"}
                        ]
                    });

                    $scope.mainGridOption = [
                        {
                            field: "namaPegawai", title: "Nama Pegawai", width: "150px"
                        },
                        {
                            field: "rincianKegiatan", title: "Uraian Tugas", width: "250px",
                            footerTemplate: "Jumlah:"
                        },
                        {
                            field: "target", title: "Target", width: "70px"
                        },
                        
                        {
                            field: "target", title: "Target", width: "70px"
                        },
                        {
                            field: "bobot", title: "Bobot", width: "70px",
                            aggregates: ["sum"],
                            footerTemplate: " #= kendo.toString(sum,'0')#"
                        },
                        {
                            title: "<center>Tanggal</center> ",
                            columns: $scope.createColumn(),
                        },
                        {
                            field: "total", title: "Total",
                            width: "100px", format: "{0:n2}"
                        },
                        {
                            field: "nilai", title: "Nilai",
                            "width": "100px", format: "{0:n2}"
                        },
                        {
                            field: "hasil", title: "Hasil", width: "100px", format: "{0:n2}",
                            aggregates: ["sum"],
                            footerTemplate: " #= kendo.toString(sum,'0.00')#"
                        }
                    ];

                    $scope.totalKuantitas = dat.data.data.totalKuantitas;
                    var grid = $("#gridOrder").data("kendoGrid");
                    if (grid != undefined) {
                        grid.destroy();
                        $("#gridOrder").empty().kendoGrid({
                            dataSource: $scope.sourceOrder,
                            columns: $scope.mainGridOption
                        });
                    }
                });
                $scope.isLoadingData = false;
            }

            FindSdm.getUnitKerja().then(function(res){
                $scope.listUnitKerja = res.data.data;
            })

            // ManageSdm.getOrderList("service/list-generic/?view=Ruangan&select=id,reportDisplay").then(function(dat) {
            //     $scope.listRuangan = dat.data;
            // });


            $scope.rebuild = function () {
                dataKualitas = [];
                angular.forEach($scope.kualitasGrid._data, function (item) {
                    var total = 0.00;
                    var hasil = 0.00;
                    var nilai = 0.00;
                    var capaian = item.capaian;
                    var items = item.item;
                    var target = item.target;
                    var bobot = item.bobot;

                    total = capaian;
                    var tmp = 0;
                    tmp = total / target;
                    if (tmp >= 1) {
                        nilai = 1;
                    } else {
                        nilai = tmp;
                    }
                    hasil = bobot * nilai;

                    dataKualitas.push({
                        "capaian": capaian,
                        "total": total,
                        "bobot": bobot,
                        "periode": tanggalData,
                        "nilai": nilai,
                        "item": items,
                        "target": target,
                        "hasil": hasil,
                        "komponenIKI": item.komponenIKI
                    });

                });
                $scope.createKualitas();
                $scope.reHitung($scope.kualitasGrid._data, 1);
            }

        }
    ])
});