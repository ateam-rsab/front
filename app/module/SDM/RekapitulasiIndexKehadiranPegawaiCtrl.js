define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('RekapitulasiIndexKehadiranPegawaiCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'ManageSdm', 'DateHelper', 'FindSdm', '$timeout',
        function ($rootScope, $scope, ModelItem, $state, ManageSdm, DateHelper, FindSdm, $timeout) {
            $scope.item = {};
            $scope.items = {};
            $scope.dats = {};
            $scope.now = new Date();
            $scope.dataVOloaded = true;
            $scope.start;
            $scope.end;
            $scope.status = false;
            $scope.yearSelected = {
                start: "year",
                depth: "year",
                format: "MMMM yyyy",
                dateInput: true
            };
            $scope.showSearch = false;
            $scope.isRouteLoading = false;
            
            // $scope.sourceOrder = new kendo.data.DataSource({
            //     data: []
            // });
            // ManageSdm.getOrderList("service/list-generic/?view=Ruangan&select=id,namaRuangan").then(function (dat) {
            //     $scope.listUnitKerja = dat.data;
            // });
            FindSdm.getUnitKerja().then(function(res){
                $scope.listUnitKerja = res.data.data;
            }, function(error){
                throw error;
            }).then(function(){
                if($state.params.unitKerja && $state.params.subUnit && $state.params.periode) {
                    $scope.isRouteLoading = true;

                    // set periode
                    $scope.items.periode = new Date($state.params.periode);

                    // set unit kerja
                    var idUnitKerja = parseInt($state.params.unitKerja);
                    for(var i = 0; i < $scope.listUnitKerja.length; i++){
                        if($scope.listUnitKerja[i].id == idUnitKerja) {
                            $scope.items.unitKerja = $scope.listUnitKerja[i];
                            break;
                        };
                    }

                    // set sub unit Kerja
                    FindSdm.getSubUnitKerja().then(function(res){
                        $scope.listSubUnitKerja = res.data.data;
                    }, function(error){
                        $scope.isRouteLoading = false;
                        throw error;
                    }).then(function(){
                        var idSubUnit = parseInt($state.params.subUnit);
                        for(var i = 0; i < $scope.listSubUnitKerja.length; i++){
                            if($scope.listSubUnitKerja[i].id == idSubUnit) {
                                $scope.items.subUnitKerja = $scope.listSubUnitKerja[i];
                                break;
                            };
                        }
                        $scope.isRouteLoading = false;
                        $scope.Cari();
                    }, function(error){
                        $scope.isRouteLoading = false;
                        throw error;
                    });
                };
            })

            $scope.$watch('items.periode', function (e) {
                if (e === undefined) return;
                $scope.getFactorRate();
            })

            $scope.$watch('items.unitKerja', function(e){
                if (!e) return;
                FindSdm.getSubUnitKerjaById(e.id).then(function(res){
                    $scope.listSubUnitKerja = res.data.data;
				})
            })

            $scope.getFactorRate = function () {
                $scope.status = false;
                $scope.item = {};
                ManageSdm.getOrderList("sdm/get-list-factor-rate-shift-kerja/" + DateHelper.getFormatMonthPicker($scope.items.periode)).then(function (dat) {
                    if (dat.data.data.length >= 0) {
                        var x = 0;
                        while (x < dat.data.data.length) {
                            if (dat.data.data[x].id === 1) {
                                $scope.item.nonShift = dat.data.data[x].factorRate;
                                $scope.item.hari1 = dat.data.data[x].hari;
                            } else if (dat.data.data[x].id === 2) {
                                $scope.item.shift2 = dat.data.data[x].factorRate;
                                $scope.item.hari2 = dat.data.data[x].hari;
                            } else if (dat.data.data[x].id === 3) {
                                $scope.item.shift3 = dat.data.data[x].factorRate;
                                $scope.item.hari3 = dat.data.data[x].hari;
                            } else {
                                $scope.item.shift4 = dat.data.data[x].factorRate;
                                $scope.item.hari4 = dat.data.data[x].hari;
                            }
                            x++;
                        }
                    } else {
                        $scope.item.nonShift = 0;
                        $scope.item.hari1 = 0;
                        $scope.item.shift2 = 0;
                        $scope.item.hari2 = 0;
                        $scope.item.shift3 = 0;
                        $scope.item.hari3 = 0;
                        $scope.item.shift4 = 0;
                        $scope.item.hari4 = 0;
                    }
                    if (($scope.item.nonShift >= 0 && $scope.item.shift2 >= 0 && $scope.item.shift3 >= 0)
                        && ($scope.item.nonShift != "" && $scope.item.shift2 != "" && $scope.item.shift3 != "")) {
                        $scope.status = true;
                    }
                }, function(error){
                    
                });
            }

            $scope.setFactorRate = function () {
                var data = [];
                data.push({
                    "kelompokShift": {
                        "id": 1
                    },
                    "factorRate": $scope.item.nonShift,
                    "periode": moment($scope.items.periode).format("YYYY-MM"),
                    "hari": $scope.item.hari1
                });
                data.push({
                    "kelompokShift": {
                        "id": 2
                    },
                    "factorRate": $scope.item.shift2,
                    "periode": moment($scope.items.periode).format("YYYY-MM"),
                    "hari": $scope.item.hari2
                });
                data.push({
                    "kelompokShift": {
                        "id": 3
                    },
                    "factorRate": $scope.item.shift3,
                    "periode": moment($scope.items.periode).format("YYYY-MM"),
                    "hari": $scope.item.hari3
                });
                data.push({
                    "kelompokShift": {
                        "id": 4
                    },
                    "factorRate": $scope.item.shift4,
                    "periode": moment($scope.items.periode).format("YYYY-MM"),
                    "hari": $scope.item.hari4
                });

                var dataSend = {
                    "factorRateKelompokShift": data
                }

                ManageSdm.saveDataUji(dataSend, "sdm/save-factor-rate-kelompok-Shift/").then(function (e) {
                    // console.log("DATA :" + JSON.stringify(dataSend));
                });


            }
            $scope.Cari = function () {
                var listRawRequired = [
                    "items.periode|k-ng-model|Periode",
                    "items.subUnitKerja|k-ng-model|Sub unit kerja"
                ];
                var isValid = ModelItem.setValidation($scope, listRawRequired);
                if(isValid.status){
                    $scope.getFactorRate();
                    $scope.tgl = new Date(moment($scope.items.periode).format("YYYY"), moment($scope.items.periode).format("MM"), 0).getDate();
                    //console.log("sdm/rekap-index-kehadiran/0/"+ moment($scope.item.periode).format("YYYY-MM")+"-01/"+ moment($scope.item.periode).format("YYYY-MM")+"-"+ $scope.tgl );
                    $scope.isLoadingData = true;
                    $scope.isRouteLoading = true;
            
                    $scope.mainGridOption = {
                        toolbar: ["excel"],
                        excel: {
                            allPages: true,
                            fileName: "RSAB_HK_Export_Rekapitulasi_Index_Kehadiran_Pegawai_" + $scope.items.unitKerja.name + "(" + moment($scope.item.periode).format("YYYY-MM") + ")_" + DateHelper.formatDate(new Date(), 'DD-MMM-YYYY HH:mm:ss') +".xlsx"
                        },
                        // data: $scope.sourceOrder,
                        pageable: true,
                        enableHorizontalScrollbar: 1,
                        selectable: "row",
                        // filterable: {
                        //     extra: false,
                        //     operators: {
                        //         string: {
                        //             startswith: "Dimulai dengan",
                        //             eq: "mengandung kata",
                        //             neq: "Tidak mengandung kata"
                        //         }
                        //     }
                        // },
                        columns: [
                            /* { field: "no", title: "No ", width:"50px", visible:false },*/
                            // { field: "total", title: "total", visible: false },
                            // { field: "P1persen", title: "P1persen", visible: false },
                            { field: "unitKerja", title: "Unit Kerja", width: "150px" },
                            { field: "nip", title: "NIP", width: "150px" },
                            { field: "nama", title: "Nama Pegawai", width: 250 },
                            { field: "jabatanInternal", title: "Nama Jabatan", width: 250 },
                            { field: "namaGolongan", title: "Gol", width: "100px" },
                            { field: "polaJadwalKerja", title: "Pola Kerja", width: "150px" },
                            { field: "jumlahHariKerja", title: "Jumlah<br/>Hari<br/>Kerja", attributes: { class: "cell-right"}, width: 60 },
                            { title: "Perhitungan Indeks Kehadiran",
                                columns: [
                                    { field: "p1FR", title: "P1", attributes: { class: "cell-right"}, width: 50},
                                    { field: "pagiFR", title: "P2", attributes: { class: "cell-right"}, width: 50},
                                    { field: "soreFR", title: "S", attributes: { class: "cell-right"}, width: 50},
                                    { field: "malamFR", title: "M", attributes: { class: "cell-right"}, width: 50},
                                    // { field: "psFR", title: "PS", attributes: { class: "cell-right"}, width: 50},
                                    // { field: "smFR", title: "SM", attributes: { class: "cell-right"}, width: 50},
                                    // { field: "psmFR", title: "PSM", attributes: { class: "cell-right"}, width: 50},
                                    { title: "Cuti Tahunan",
                                        columns: [
                                            {field: "cutiTahunanP1", title: "P1", attributes: { class: "cell-right"}, width: 50},
                                            {field: "cutiTahunanP2", title: "P2", attributes: { class: "cell-right"}, width: 50}
                                        ]
                                    },
                                    { title: "Sakit",
                                        columns: [
                                            {field: "sakitP1", title: "P1", attributes: { class: "cell-right"}, width: 50},
                                            {field: "sakitP2", title: "P2", attributes: { class: "cell-right"}, width: 50}
                                        ]
                                    },
                                    { title: "Cbesar / Melahirkan / Alasan Penting",
                                        columns: [
                                            {field: "cutiBesarP1", title: "P1", attributes: { class: "cell-right"}, width: 50},
                                            {field: "cutiBesarP2", title: "P2", attributes: { class: "cell-right"}, width: 50}
                                        ]
                                    },
                                    { title: "Tugas<br/>Luar", field: "tugasLuar", attributes: { class: "cell-right"}, width: 60 },
                                    { title: "T/PC", field: "tpc", attributes: { class: "cell-right"}, width: 50, format: "{0:n2}" },
                                    { title: "Izin", field: "izin", attributes: { class: "cell-right"}, width: 50 }
                                ],
                                headerAttributes: {
                                    style: "text-align:center"
                                }
                            }, 
                            // { field: "tpc", title: "Tpc", width: "100px", attributes: { class: "cell-right"} },
                            { field: "lembur", title: "Lembur", width: "100px", attributes: { class: "cell-right"} },
                            {
                                title: "IK P1",
                                columns: [
                                    {field: "P1jam", title: "Jam", attributes: { class: "cell-right"}, width: 60},
                                    {field: "P1persen", title: "%", attributes: { class: "cell-right"}, width: 60, format: "{0:n2}"}
                                ],
                                headerAttributes: {
                                    style: "text-align:center"
                                }
                            }, {
                                title: "IK P2",
                                columns: [
                                    {field: "P1jam", title: "Jam", attributes: { class: "cell-right"}, width: 60},
                                    {field: "P1persen", title: "%", attributes: { class: "cell-right"}, width: 60, format: "{0:n2}"}
                                ],
                                headerAttributes: {
                                    style: "text-align:center"
                                }
                            }
                        ]
                    };
                    ManageSdm.getOrderList("/sdm/rekap-index-kehadiran-by-unit-kerja/" + $scope.items.subUnitKerja.id + "/" + moment($scope.items.periode).format("YYYY-MM") + "-01/" + moment($scope.items.periode).format("YYYY-MM") + "-" + $scope.tgl).then(function (dat) {
                        $scope.start = moment($scope.items.periode).format("YYYY-MM") + "-01";
                        $scope.end = moment($scope.items.periode).format("YYYY-MM") + "-" + $scope.tgl;
                        //moment($scope.item.periode2).format("YYYY-MM-DD");
                        //console.log(JSON.stringify(dat.data.data.listRekapKehadiran));
                        if (!(_.isNull(dat.data.data))) {
                            $scope.sourceOrder = new kendo.data.DataSource({
                                data: dat.data.data.listRekapKehadiran,
                                pageSize: 25
                            });
                            $scope.Save();
                        }else{
                            toastr.warning("Data Tidak Tersedia");
                        }
                        $scope.isLoadingData = false;
                        $scope.isRouteLoading = false;
                        $scope.showSearch = true;
                    }, function(error){
                        $scope.isRouteLoading = false;
                    });
                } else {
                    ModelItem.showMessages(isValid.messages);
                }

            }

            $scope.Save = function () {
                if ($scope.status === false) {
                    toastr.warning("Data tidak dapat di simpan");
                    return;
                }
                if ($scope.sourceOrder === undefined)return;

                var datas = [];
                $scope.isLoadingData = true;
                // $scope.sourceOrder._data.forEach(function (data) {
                $scope.sourceOrder.options.data.forEach(function (data) {
                    if(data.idPegawai && data.P1persen){
                        datas.push({
                            "pegawai": {
                                "id": data.idPegawai
                            },
                            "totalNilaiIndex": data.P1persen
                        });
                    }
                });

                var dataSend = {
                    "tglAwal": $scope.start,
                    "nonHistori": "",
                    "kelompokTransaksi": {
                        "id": 43
                    },
                    "pegawaiHistoriRekap": datas
                    ,
                    "tglHistori": moment($scope.now).format("YYYY-MM-DD"),
                    "tglAhir": $scope.end,
                    "ruangan": {
                        "id": 213
                    }
                }

                console.log(dataSend);


                ManageSdm.saveDataUji(dataSend, "sdm/save-total-index-kehadiran/").then(function (e) {
                    console.log("DATA :" + JSON.stringify(dataSend));
                    $scope.isLoadingData = false;
                },function(error){
                    $scope.isLoadingData = false;
                    throw error;
                });
                if (datas.length > 0) {
                }
            }

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
                var dataGrid = $("#gridIndeksKehadiran").data("kendoGrid");
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
                var dataGrid = $("#gridIndeksKehadiran").data("kendoGrid");
                dataGrid.dataSource.filter({});
                $scope.dats = {};
            }
            
            $scope.formatInt ={
                format: "n2",
                min: 0
            }

            $scope.formatIntNol = {
                format: "n0",
                min: 0
            }
        }
    ]);
});