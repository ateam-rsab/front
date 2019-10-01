define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('RekapitulasiKehadiranPegawaiCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'ManageSdm', 'ManageSdmNew', 'FindSdm', '$timeout', 'DateHelper',
        function ($rootScope, $scope, ModelItem, $state, ManageSdm, ManageSdmNew, FindSdm, $timeout, dateHelper) {
            $scope.now = new Date();
            $scope.item = {};
            $scope.dats = {};
            $scope.now = new Date();
            $scope.dataVOloaded = true;
            $scope.start;
            $scope.end;
            $scope.yearSelected = {
                start: "year",
                depth: "year"
            };
            $scope.showSearch = false;
            $scope.$watch('item.unitKerja', function(e){
				if(!e) return;
				// FindSdm.getSubUnitKerjaById(e.id).then(function(res){
                ManageSdmNew.getListData("sdm/get-sub-unit-kerja-by-unit-kerja/"+e.id).then(function(res){
                    $scope.listSubUnitKerja = res.data.data;
				})
			})
            // ManageSdm.getOrderList("service/list-generic/?view=Ruangan&select=id,namaRuangan").then(function (dat) {
            //     $scope.listUnitKerja = dat.data;
            // });
            // FindSdm.getUnitKerja().then(function(result){
            ManageSdmNew.getListData("sdm/get-all-unit-kerja").then(function(result){
                var toRemove = [0],
                    listUnitKerja = result.data.data;

                $scope.listUnitKerja = listUnitKerja.filter(function(el) {
                    return !toRemove.includes(el.id);
                });
                // $scope.listUnitKerja = result.data.data;
                $scope.isRouteLoading = false;
            }, function(error){
                $scope.isRouteLoading = false;
                throw error;
            })

            $scope.Cari = function () {
                var listRawRequired = [
                    "item.periode1|k-ng-model|Periode",
                    "item.subUnitKerja|k-ng-model|Sub unit kerja"
                ];
                var isValid = ModelItem.setValidation($scope, listRawRequired);
                if(isValid.status){
                    $scope.isRouteLoading = true;
                    
                    $scope.mainGridOption = {
                        toolbar: ["excel"],
                        excel: {
                            allPages: true,
                            fileName: "RSAB_HK_Export_Rekapitulasi_Kehadiran_Pegawai_" + $scope.item.unitKerja.name + "(" + moment($scope.item.periode1).format("YYYY-MM") + ")_" + dateHelper.formatDate(new Date(), 'DD-MMM-YYYY HH:mm:ss') +".xlsx"
                        },
                        pageable: true,
                        enableHorizontalScrollbar: 1,
                        selectable: "row",
                        // filterable: {
                        //     extra: false,
                        //     operators: {
                        //         string: {
                        //             startswith: "Dimulai dengan",
                        //             contains: "Mengandung kata",
                        //             neq: "Tidak mengandung kata"
                        //         }
                        //     }
                        // },
                        columns: [
                            { field: "idPegawai", title: "id", visible: false },
                            { field: "total", title: "total", visible: false },
                            /*      {
                            "field": "no",
                            "title": "No.",
                            width:"30px"
                            },*/
                            { field: "unitKerja", title: "Unit Kerja", hidden: true },
                            { field: "nip", title: "NIP", width: 170 },
                            { field: "nama", title: "Nama Pegawai", width: 250 },
                            { field: "jabatanInternal", title: "Nama Jabatan", width: "150px" },
                            { field: "namaGolongan", title: "Gol", width: "150px"},
                            { field: "polaJadwalKerja", title: "Pola Jadwal Kerja", width: "150px" },
                            { field: "jumlahHariKerja", title: "Jumlah Hari Kerja", width: "100px", attributes: { class: "cell-right"} },
                            { title: "P1", field: "p1", width: 40, attributes: { class: "cell-right"} },
                            { title: "P2", field: "pagi", width: 40, attributes: { class: "cell-right"} },
                            { title: "S", field: "sore", width: 40, attributes: { class: "cell-right"} },
                            { title: "M", field: "malam", width: 40, attributes: { class: "cell-right"} },
                            // { title: "PS", field: "ps", width: 40 },
                            // { title: "SM", field: "sm", width: 40 },
                            // { title: "PSM", field: "psm", width: 50 },
                            { title: "Cuti Tahunan",
                                columns: [{ field: "cutiTahunanP1", title: "P1", width: 40 },{ field: "cutiTahunanP2", title: "P2", width: 40, attributes: { class: "cell-right"} }]
                            },
                            { title: "SKT",
                                columns: [{ field: "sakitP1", title: "P1", width: 40 },{ field: "sakitP2", title: "P2", width: 40, attributes: { class: "cell-right"} }]
                            },
                            { title: "CBesar/Melahirkan/Alasan Penting/Umrah",
                                columns: [{ field: "cutiBesarP1", title: "P1", width: 40 },{ field: "cutiBesarP2", title: "P2", width: 40, attributes: { class: "cell-right"} }]
                            },
                            { title: "Tugas Luar", field: "tugasLuar", width: "100px", attributes: { class: "cell-right"} },
                            { title: "T/PC", field: "tpc", width: "100px", attributes: { class: "cell-right"} },
                            { field: "izin", title: "Izin", width: "100px", attributes: { class: "cell-right"} },
                            { field: "kelebihanJamKerja", title: "Kelebihan Menit Kerja", width: "100px", attributes: { class: "cell-right"} },
                            { field: "lemburs", title: "Lembur Kerja", width: "100px", attributes: { class: "cell-right"} },
                            { field: "mangkir", title: "Mangkir", width: "100px", attributes: { class: "cell-right"} },
                            { field: "absenTunggal", title: "Absen Tunggal", width: "100px", attributes: { class: "cell-right"} },
                            { field: "keterangan", title: "Keterangan", width: "100px" }
                        ],
                        // set column width to auto
                        excelExport: function(e) {
                            var columns = e.workbook.sheets[0].columns;
                            columns.forEach(function(column){
                                delete column.width;
                                column.autoWidth = true;
                            });
                        }
                    };

                    $scope.tgl = new Date(moment($scope.item.periode1).format("YYYY"), moment($scope.item.periode1).format("MM"), 0).getDate();
                    ManageSdmNew.getListData("sdm/rekap-kehadiran-by-unit-kerja/" + $scope.item.subUnitKerja.id + "/" + moment($scope.item.periode1).format("YYYY-MM") + "-01/" + moment($scope.item.periode1).format("YYYY-MM") + "-" + $scope.tgl).then(function (dat) {
                        $scope.start = moment($scope.item.periode1).format("YYYY-MM") + "-01";
                        $scope.end = moment($scope.item.periode1).format("YYYY-MM") + "-" + $scope.tgl;//moment($scope.item.periode2).format("YYYY-MM-DD");
                        if (!(_.isNull(dat.data.data.listRekapKehadiran))) {
                            $scope.sourceOrder = new kendo.data.DataSource({
                                data: dat.data.data.listRekapKehadiran,
                                pageSize: 25
                            });
                        } else {
                            toastr.warning("Data Tidak Tersedia");
                        }

                        $scope.isRouteLoading = false;
                        $scope.showSearch = true; // show panel pencarian
                    }, function(error){
                        $scope.isRouteLoading = false;
                        throw error;
                    });
                } else {
                    ModelItem.showMessages(isValid.messages);
                }
                // $scope.isRouteLoading = true;
                // $scope.tgl = new Date(moment($scope.item.periode1).format("YYYY"), moment($scope.item.periode1).format("MM"), 0).getDate();
                // ManageSdm.getOrderList("sdm/rekap-kehadiran-by-unit-kerja/" + $scope.item.subUnitKerja.id + "/" + moment($scope.item.periode1).format("YYYY-MM") + "-01/" + moment($scope.item.periode1).format("YYYY-MM") + "-" + $scope.tgl).then(function (dat) {
                //     $scope.start = moment($scope.item.periode1).format("YYYY-MM") + "-01";
                //     $scope.end = moment($scope.item.periode1).format("YYYY-MM") + "-" + $scope.tgl;//moment($scope.item.periode2).format("YYYY-MM-DD");
                //     if (!(_.isNull(dat.data.data.listRekapKehadiran))) {
                //         $scope.sourceOrder = new kendo.data.DataSource({
                //             data: dat.data.data.listRekapKehadiran
                //         });
                //     } else {
                //         toastr.warning("Data Tidak Tersedia");
                //     }

                //     $scope.isRouteLoading = false;
                // });
            }

            $scope.redirect = function () {
                var idUnitKerja = $scope.item.unitKerja ? $scope.item.unitKerja.id : "";
                var idSubUnitKerja = $scope.item.subUnitKerja ? $scope.item.subUnitKerja.id : "";
                var periode = $scope.item.periode1 ? moment($scope.item.periode1).format("YYYY-MM") + "-01" : "";
                // $state.go('RekapitulasiIndexKehadiranPegawai');
                // debugger;
                if(idUnitKerja !== "" || idSubUnitKerja !== "" || periode !== ""){
                    var url = "#/RekapitulasiIndexKehadiranPegawai/"+idUnitKerja+"/"+idSubUnitKerja+"/"+ periode;
                    window.open(url, "");
                } else {
                    $state.go('RekapitulasiIndexKehadiranPegawai');
                }
            }

            $scope.Save = function () {
                if ($scope.status === false) {
                    toastr.warning("Data tidak dapat di simpan");
                    return;
                }
                if ($scope.sourceOrder === undefined) return;

                var datas = [];
                $scope.isRouteLoading = true;
                $scope.sourceOrder._data.forEach(function (data) {
                    datas.push({
                        "pegawai": {
                            "id": data.idPegawai
                        },
                        "nilaiIndexTotal": data.total,
                        "komponenIndex": {
                            "id": 1
                        },
                        "nilaiIndex": data.jumlahHariKerja
                    })
                });

                var dataSend = {
                    "tglAwal": $scope.start,
                    "nonHistori": "",
                    "kelompokTransaksi": {
                        "id": 43
                    },
                    "pegawaiHistoriRekapIndex": datas,
                    "tglHistori": moment($scope.now).format("YYYY-MM-DD"),
                    "tglAhir": $scope.end,
                    "ruangan": {
                        "id": 213
                    }
                }
                console.log(dataSend);


                ManageSdmNew.saveData(dataSend, "sdm/save-rekap-kehadiran/").then(function (e) {
                    console.log("DATA :" + JSON.stringify(dataSend));
                });
                if (datas.length > 0) {
                    $scope.isRouteLoading = false;
                }
            }

            // kendo exter filter data grid
            var timeoutPromise;
            $scope.$watch("dats.namaPegawai", function(newVal, oldVal){
                $timeout.cancel(timeoutPromise);
                timeoutPromise = $timeout(function(){
                    if(newVal && newVal !== oldVal){
                        applyFilter("nama", newVal);
                    }
                }, 700)
            })
            $scope.$watch("dats.nipPegawai", function(newVal, oldVal){
                $timeout.cancel(timeoutPromise);
                timeoutPromise = $timeout(function(){
                    if(newVal && newVal !== oldVal){
                        applyFilter("nip", newVal);
                    }
                }, 700)
            })
            function applyFilter(filterField, filterValue){
                var dataGrid = $("#gridRekapKehadiran").data("kendoGrid");
                var currFiltersObject = dataGrid.dataSource.filter();
                var currentFilters = currFiltersObject ? currFiltersObject.filters : [];

                if(currentFilters && currentFilters.length > 0){
                    for(var i = 0; i < currentFilters.length; i++){
                        if(currentFilters[i].field === filterField){
                            currentFilters.splice(i, 1);
                            break;
                        }
                    }
                }

                if(filterValue !== ""){
                    currentFilters.push({
                        field: filterField,
                        operator: "contains",
                        value: filterValue
                    })
                }

                dataGrid.dataSource.filter({
                    logic: "and",
                    filters: currentFilters
                })
            }
            $scope.resetFilters = function(){
                var dataGrid = $("#gridRekapKehadiran").data("kendoGrid");
                dataGrid.dataSource.filter({});
                $scope.dats = {};
            }
        }
    ]);
});