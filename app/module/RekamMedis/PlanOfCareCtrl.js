define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('PlanOfCareCtrl', ['$scope', '$timeout', 'ModelItem', 'ModelItemAkuntansi', '$state', 'CacheHelper', 'DateHelper', 'ManagePhp',
        function ($scope, $timeout, ModelItem, modelItemAkuntansi, $state, cacheHelper, dateHelper, ManagePhp) {
            $scope.date = new Date();
            $scope.item = {};
            $scope.now = new Date();
            
            $scope.minDate = new Date($scope.now);
            $scope.maxDate = new Date($scope.now);
            $scope.dataVOloaded = true;
            $scope.isRouteLoading = false;
            $scope.isDisable = false;
            $scope.dataLogin = JSON.parse(localStorage.getItem('pegawai'));
            $scope.findBy = "1"
            var norec_apd = ''
            var norec_pd = ''
            $scope.showTombol = false
            LoadCache();
            function LoadCache() {
                var chacePeriode = cacheHelper.get('cacheCPPT');
                if (chacePeriode != undefined) {
                    $scope.item.noCm = chacePeriode[0];
                    $scope.item.namaPasien = chacePeriode[1];
                    $scope.item.jenisKelamin = chacePeriode[2];
                    $scope.item.noregistrasi = chacePeriode[3];
                    $scope.item.umur = chacePeriode[4];
                    $scope.item.kelompokPasien = chacePeriode[5];
                    $scope.item.tglRegistrasi = chacePeriode[6];
                    norec_apd = chacePeriode[7];
                    norec_pd = chacePeriode[8];
                    $scope.item.idKelas = chacePeriode[9];
                    $scope.item.kelas = chacePeriode[10];
                    $scope.item.idRuangan = chacePeriode[11];
                    $scope.item.namaRuangan = chacePeriode[12];
                }
            }

            $scope.optPOC = {
                toolbar: [
                    {
                        name: "create", text: "Input Baru",
                        template: '<button ng-click="inputBaruPOC()" class="k-button k-button-icontext k-grid-upload" href="\\#"><span class="k-icon k-i-plus"></span>Tambah Plan of Care</button>'
                    }
                ],
                pageable: true,
                pageSize: 5,
                scrollable: true,
                columns: [
                    {field: "tglinput", title: "Tanggal", width: 120},
                    {field: "namalengkap", title: "Pegawai",width: 150}, 
                    {field: "namaruangan", title: "Ruangan", width: 200},
                    {field: "rencana", title: "Plan Of Care /<br> Rencana Perawatan", width: 200},
                    {field: "masalah", title: "Masalah",width: 200},
                    {field: "target",title: "Target <br>Terukur",width: 150},  
                    {field: "waktu",title: "Dalam <br>Waktu",width: 70},
                    {field: "tglteratasi",title: "Tanggal <br>Teratasi",width: 100},
                    {field: "perubahaan",title: "Discharge <br>Planning",width: 150},
                    {command: [{text: "Edit", click: editData, imageClass: "k-icon k-i-pencil"}, 
                                {text: "Detail", click: showDetail, imageClass: "k-icon k-i-pencil"},
                               {text: "Hapus", click: deleteData, imageClass: "k-icon k-i-cancel"}
                              ], title: "", width: 250}
                ]
            };
            
            function clear() {
                delete $scope.item.tglinput;
                delete $scope.item.norec;
                delete $scope.item.masalah;
                delete $scope.item.rencana;
                delete $scope.item.target;
                delete $scope.item.tglteratasi;
                delete $scope.item.perubahaan;
                delete $scope.item.waktu;
            }

            // $scope.$watch('item.tglteratasi', function (newVal) {
            //     // var time = new Date($scope.now);
            //     var date = dateHelper.getTanggalFormatted(newVal);
            //     var value = new Date(date +  ':' + dateHelper.setJamAwal($scope.now));
            //     $scope.item.tglteratasi = new Date();
            //     console.log(value);
            //     console.log($scope.item.tglteratasi);
            //     console.log(newVal);
            // });
               
                // $scope.item.tglteratasi = 
            

            $scope.inputBaruPOC = function () {
                clear();
                $scope.item.tglteratasi = new Date($scope.now);
                $scope.item.tglinput = new Date($scope.now);
                $scope.isDisable = false;
                $scope.popUpPOC.center().open();
            };

            $scope.batalInput = function () {
                $scope.popUpPOC.close();
            }

            function editData(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                // $scope.item.tglinput = new Date($scope.now);
                if(!dataItem) {
                    toastr.warning('Data tidak ditemukan')
                    return
                }

                $scope.show = dataItem
                $scope.item.norec = dataItem.norec
                $scope.item.tglinput = dataItem.tglinput
                $scope.item.masalah = dataItem.masalah
                $scope.item.rencana = dataItem.rencana
                $scope.item.target = dataItem.target
                $scope.item.waktu = dataItem.waktu
                $scope.item.tglteratasi = dataItem.tglteratasi
                $scope.item.perubahaan = dataItem.perubahaan

                $scope.isDisable = false
                $scope.popUpPOC.center().open();

            }

            function showDetail(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                $scope.show = dataItem

                $scope.item.tglinput = dataItem.tglinput
                $scope.item.masalah = dataItem.masalah
                $scope.item.rencana = dataItem.rencana
                $scope.item.target = dataItem.target
                $scope.item.waktu = dataItem.waktu
                $scope.item.tglteratasi = dataItem.tglteratasi
                $scope.item.perubahaan = dataItem.perubahaan

                $scope.isDisable = true
                $scope.popUpPOC.center().open();
            }

            function deleteData(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

                if(!dataItem) {
                    toastr.warning('Data tidak ditemukan')
                    return
                }

                var itemDelete = {
                    "norec" : dataItem.norec
                }

                ManagePhp.postData(itemDelete, 'rekam-medis/post-poc/delete').then(function (e) {
                    loadPOC()
                    $scope.cppt = {}
                });
            }

            loadPOC()
            function loadPOC() {
                ManagePhp.getData("rekam-medis/get-poc?nocm=" + $scope.item.noCm
                    , true).then(function (dat) {
                        let array =dat.data.data;
                        //for (let i in arrray) {
                        //
                        //}
                        $scope.sourcePOC = new kendo.data.DataSource({
                            data: array
                        });
                    })
            }

            $scope.save = function () {
                LoadCache();
                var jsonSave = {
                    "norec": $scope.item.norec !== undefined ? $scope.item.norec : '',
                    "noregistrasifk": norec_apd,
                    "pasienfk": $scope.item.noMr,
                    "ruanganfk": $scope.item.idRuangan,  
                    "pegawaifk": $scope.dataLogin.id,
                    "tglinput": moment($scope.item.tglinput).format('YYYY-MM-DD HH:mm'), 
                    "tglteratasi": moment($scope.item.tglteratasi).format('YYYY-MM-DD HH:mm'), 
                    "waktu": $scope.item.waktu,
                    "masalah": $scope.item.masalah,
                    "rencana": $scope.item.rencana,
                    "target": $scope.item.target, 
                    "perubahaan": $scope.item.perubahaan,
                }
                // console.log(jsonSave);
                ManagePhp.postData(jsonSave, 'rekam-medis/post-poc/save').then(function (e) {
                    loadPOC()
                    $scope.item = {}
                    //ManagePhp.postLogging('POC', 'Norec planofcare_t',e.data.norec, 'POC').then(function (res) {
                    //})
                });
                $scope.popUpPOC.close();
            }

        }
    ]);
});