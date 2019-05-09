define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('IndeksKinerjaIndividuSDMCtrl', ['$q', 'CacheHelper', 'ManagePegawai', 'FindPegawai', 'DateHelper', 'FindSdm', 'ModelItem', 'RekamDataPegawai', 'ManageSdm', 'ManageSdmNew', '$state', '$rootScope', '$scope', '$mdDialog',
        function ($q, chacheHelper, managePegawai, findPegawai, dateHelper, findSdm, modelItem, RekamDataPegawai, ManageSdm, ManageSdmNew, $state, $rootScope, $scope, $mdDialog) {
            $scope.isRouteLoading = false;
            var pegawaiId;
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
            // var idPgw = 0;
            // var idRuangan = 0;

            $scope.yearSelected = {
                start: "year",
                depth: "year"
            };

            $q.all([
                // RekamDataPegawai.getOrderList("sdm/get-id-pgw"),
                ManageSdm.getOrderList("service/list-generic/?view=Pegawai&select=id,namaLengkap&criteria=statusEnabled&values=true"),
                ManageSdmNew.getListData("pegawai/get-all-pegawai-custom/")
            ]).then(function(res){
                // if(res[0].statResponse){
                //     idPgw = res[0].data.data.id;
                // idRuangan = res[0].data.data.ruangan.id;
                // }

                if(res[0].statResponse){
                    $scope.listPegawai = res[0].data;
                    $scope.daftarListPegawai = $scope.listPegawai;
                }
                if(res[1].statResponse){
                    $scope.listPegawaiPensiun = res[1].data;
                }
            }, (error) => {
                throw error;
            }).then(function(){
                var pegawaiLogin = $scope.pegawaiLogin = modelItem.getPegawai();
				if (pegawaiLogin.ruangan.departemenId !== 42) {
                    $scope.isLoginAtasan = true;
                    // $scope.toogleToolbar(true);
					ManageSdmNew.getListData("sdm/get-pegawai-bawahan/" + pegawaiLogin.id).then(function (dat) {
						$scope.listPegawai = dat.data;
                        $scope.listPegawai.data.push({"id": pegawaiLogin.id, "namaLengkap": pegawaiLogin.namaLengkap});
					}).then(function(){
                        $scope.daftarListPegawai = $scope.listPegawai;
						if ($scope.daftarListPegawai.data.length === 1) {
                            // $scope.toogleToolbar(false);
							// $scope.listPegawai.data.push({"id": pegawaiLogin.id, "namaLengkap": pegawaiLogin.namaLengkap});
							$scope.item.pegawai = $scope.listPegawai.data[0];
							$scope.isLoginPegawai = true;
                        }
					})
					// $scope.listPegawai.push({"id": pegawaiLogin.id, "namaLengkap": pegawaiLogin.namaLengkap})
				} else {
                    $scope.toogleToolbar(false); // custom prevent popup editing function on kendo grid UI
                }
            })

            // indkes kinerja individu SDM hanya menampilkan rekap total saja, detil capaian kuantitas ada di halaman logbook kinerja pegawai
            // $scope.createColumn = function () {
            //     var year = parseInt(moment($scope.item.akhir).format("Y"))
            //     var month = parseInt(moment($scope.item.akhir).format("M"))
            //     var tempDate = new Date(year, month, 0);
            //     var list = [];
            //     for (var i = 0; i < tempDate.getDate(); i++) {
            //         var data = {
            //             field: "[" + (i + 1) + "]",
            //             title: (i + 1).toString(),
            //             // format: "{0:n2}",
            //             width: "50px",
            //             attributes: {
            //                 "class": "table-cell-center"
            //             }
            //         };
            //         list.push(data);
            //     }
            //     return list;
            // }

            $scope.$watch('item.pegawai', function(e){
                if (!e) return;
                if (e.id === $scope.pegawaiLogin.id) $scope.toogleToolbar(true);
                if(e.id === undefined && e.idPegawai){
                    e.id = e.idPegawai
                }
            })
            $scope.cari = function () {
                var listRawRequired = [
                    "item.akhir|k-ng-model|Periode",
                    "item.pegawai|k-ng-model|Pegawai"
                ]
                var isValid = modelItem.setValidation($scope, listRawRequired);
                if(isValid.status){
                    $scope.isLoadingData = true;
                    $scope.isRouteLoading = true;
                    tanggalData = moment($scope.item.akhir).format("YYYY-MM");
                    ManageSdmNew.getListData("sdm/get-indek-kinerja-kuantitas/" + tanggalData + "/" + $scope.item.pegawai.id).then(function (dat) {
                        if(!dat.data.data){
                            $scope.isLoadingData = $scope.isRouteLoading = false;
                            return;
                        } else {
                            $scope.gridKuantitas = new kendo.data.DataSource({
                                data: dat.data.data.uraianTugas,
                                aggregate: [
                                    {field: "bobot", aggregate: "sum", width: "100%"},
                                    {field: "hasil", aggregate: "sum", width: "100%"}
                                ]
                            });
                            $scope.opsiKuantitas = {
                                pageable: true,
                                selectable: true,
                                columns: [
                                    {
                                        field: "rincianKegiatan", title: "Uraian Tugas", width: "250px",
                                        footerTemplate: "Jumlah:"
                                    },
                                    {
                                        field: "target", title: "Target", width: "100px", format: "{0:n2}",
                                        attributes: {
                                            "class": "table-cell-right"
                                        }
                                    },
                                    {
                                        field: "bobot", title: "Bobot", width: "100px",
                                        aggregates: ["sum"],
                                        footerTemplate: " #= kendo.toString(sum,'0')#",
                                        format: "{0:n2}",
                                        attributes: {
                                            "class": "table-cell-right"
                                        }
                                    },{
                                        field: "satuan", title: "Satuan",
                                        width: "100px", attributes: {
                                            "class": "table-cell-right"
                                        }
                                    },
                                    // {
                                    //     title: "<center>Tanggal</center> ",
                                    //     columns: $scope.createColumn(),
                                    // },
                                    {
                                        field: "total", title: "Total",
                                        width: "100px", format: "{0:n2}",
                                        attributes: {
                                            "class": "table-cell-right"
                                        }
                                    },
                                    {
                                        field: "nilai", title: "Nilai",
                                        "width": "100px", format: "{0:n2}",
                                        attributes: {
                                            "class": "table-cell-right"
                                        }
                                    },
                                    {
                                        field: "hasil", title: "Hasil", width: "100px", format: "{0:n2}",
                                        aggregates: ["sum"],
                                        footerTemplate: " #= kendo.toString(sum,'0.00')#",
                                        attributes: {
                                            "class": "table-cell-right"
                                        }
                                    },
                                    // {
                                    //     command: [{nama: "destroy", text:"Hapus"}], title: "&nbsp;", width: "70px" 
                                    // }
                                ]
                            };

                            $scope.totalKuantitas = dat.data.data.totalKuantitas;
                            $scope.parserJson();
                            $scope.isRouteLoading = false;
                        }
                    }, function(error){
                        $scope.isRouteLoading = false;
                    });
                    $scope.isLoadingData = false;
                    $scope.dataVoLoaded = true;
                    // $scope.hitungAll();
                } else {
                    modelItem.showMessages(isValid.messages);
                }
            }

            $scope.navToRencanaPemeriksaan = function (selectedData) {

            };

            $scope.hitungAll = function () {
                /*    $scope.totalNilaiKinerja = ($scope.totalKuantitas * 50 / 100) + ($scope.totalKualitas * 20 / 100)
                 + ($scope.totalPrilaku * 28 / 100) + ($scope.totalInovasi * 2 / 100);*/
                // $scope.totalNilaiKinerja = (($scope.totalKuantitas + $scope.totalKualitas
                // + $scope.totalPrilakux  + $scope.totalInovasi) / 100);
                $scope.totalNilaiKinerja = (($scope.totalKuantitas + $scope.totalKualitas
                + $scope.hasilx  + $scope.totalInovasi));

                ManageSdmNew.getListData("sdm/get-indeks-iki/" + $scope.totalNilaiKinerja).then(function (dat) {
                    if (dat.data.data){
                        $scope.indeksKinerjaIndividu = dat.data.data;
                    }
                })
                // findSdm.getNilaiIndeks($scope.totalNilaiKinerja).then(function(e){
                //     debugger;
                // })
            }

           //perubahan
            // $scope.totalperilaku = function(){
            //  tanggalData = moment($scope.item.akhir).format("YYYY-MM");
            // RekamDataPegawai.getOrderList("sdm/get-kehadiran-iki/" + tanggalData).then(function (datas){
            //  $scope.totalPrilakux = datas.data.data.hasil;
            //    if($scope.totalPrilakux == "NaN"){
            //     alert("Hasil Perilaku tidak terdefinisikan = NaN")
            //   }else{
            //      $scope.hitungAll();
            //   }
            // })
          
            // }


            // $scope.totalperilaku();

            $scope.reHitung = function (data, tipe) {
           
                var jml = 0.00;
                angular.forEach(data, function (item) {
             
                    jml += item.hasil;
                });

                if (tipe === 1) {
                    $scope.totalKualitas = jml;
                } else if (tipe === 3) {
                    $scope.totalPrilaku = jml;
                } else if (tipe === 2) {
                    $scope.totalInovasi = jml;
                }
                $scope.hitungAll();
            }
            $scope.toogleToolbar = function(data){
                if (data) {
                    $("#gridQty .k-grid-toolbar").hide();
                    // $scope.showToolbar = [{name: "create", text: "Tambah"}];
                } else {
                    $("#gridQty .k-grid-toolbar").show();
                }
                // return $scope.showToolbar;
            }
            $scope.prilakuGridOpt = {
                editable: true,
                // toolbar: [{name: "create",text: "Tambah"}],
                columns: [
                    {field: "noRec", title: "noRec", hidden: true},
                    {field: "komponenIKI", title: "komponenIKI", hidden: true},
                    {field: "item", title: "Komponen", width: "40%"},
                    {field: "target", title: "Target", width: 100},
                    {field: "bobot", title: "Bobot", width: 100},
                    {field: "capaian", title: "Capaian", width: 100},
                    {field: "total", title: "Total", width: 100, format: "{0:n2}"},
                    {field: "nilai", title: "Nilai", width: 100, format: "{0:n2}"},
                    {field: "hasil", title: "Hasil", width: 100, format: "{0:n2}"},
                    /// {"command": [{name: "edit", text: "Edit"}],
                    // "title": " ", "width": 100 }
                ],
                ///  editable: {mode: "popup",template: kendo.template($("#popup-editor-prilaku").html()) }
            };

            $scope.parserJson = function () {
                dataKualitas = [];
                dataPrilaku = [];
                dataInovasi = [];

                $scope.totalKualitas = 0;
                $scope.totalInovasi = 0;
                $scope.totalPrilaku = 0;
                $scope.capaianKehadiran = 0;
                status = false;
                ;
                ManageSdmNew.getListData("sdm/get-kualitas-inovasi-IKI/" + tanggalData + "/" + $scope.item.pegawai.id).then(function (dat) {
                    status = dat.data.data.status;
                    angular.forEach(dat.data.data.IndeksKinerja, function (item) {
                        if (item.komponenIKI === "Kualitas") {
                            dataKualitas.push(item);
                            $scope.totalKualitas += item.hasil;
                        } else if (item.komponenIKI === "Inovasi") {
                            dataInovasi.push(item);
                            $scope.totalInovasi += item.hasil;
                        } 

                        //perubahan
                        // else if (item.komponenIKI === "Perilaku") {
                        //     dataPrilaku.push(item);
                        //     $scope.totalPrilaku += item.hasil;
                        //     if (item.item === "Kehadiran") {
                        //         $scope.capaianKehadiran = item.capaian;
                        //     }
                        // }

                    });

                    /*
                     console.log("parserJson dataKualitas " + JSON.stringify(dataKualitas))
                     console.log("parserJson dataPrilaku" + JSON.stringify(dataPrilaku))
                     console.log("parserJson dataInovasi" + JSON.stringify(dataInovasi))
                     */

                    $scope.createKualitas();
                    $scope.createInovasi();
                    //perubahan
                    // if (dataPrilaku.length === 0) {
                        ManageSdmNew.getListData("sdm/get-kehadiran-iki/" + tanggalData + "/" + $scope.item.pegawai.id).then(function (datas) {
                            if(datas.data.data) {
                                /*
                                dataPrilaku.push( {
                                "capaian": 0,
                                "total": 0,
                                "bobot": 20,
                                "periode": tanggalData,
                                "nilai": 0,
                                "item": "Kedisiplinan",
                                "target": 100,
                                "hasil": 0,
                                "komponenIKI": "Prilaku"
                                });
                                */

                                /*                dataPrilaku.push( {
                                "capaian": 0,
                                "total": 0,
                                "bobot": 3,
                                "periode": tanggalData,
                                "nilai": 0,
                                "item": "Name Tag",
                                "target": 100,
                                "hasil": 0,
                                "komponenIKI": "Prilaku"
                                });*/
                                $scope.hasil = datas.data.data.hasil;
                                $scope.hasilx = datas.data.data.hasil;
                                var nilai = datas.data.data.nilai;
                                var capaian = datas.data.data.capaian ;
                                // var total = datas.data.data.capaian / 60;
                                var target = datas.data.data.target;
                                var bobot = datas.data.data.bobot;
                                /*  if(!(capaian >= 0)){
                                capaian = 0;
                                }

                                if(!(total >= 0)){
                                total = 0;
                                }
                                var tmp =   total / 100;
                                if(tmp >= 1){
                                nilai = 1;
                                }else{
                                nilai = tmp;
                                }
                                hasil =   20 *  nilai;
                                if(!(hasil >= 0)){
                                hasil = 0;
                                }*/
                                $scope.capaianKehadiran = capaian;
                                dataPrilaku.push({
                                    "capaian": capaian.toFixed(2),
                                    "total": capaian.toFixed(2),
                                    "bobot": bobot,
                                    "periode": tanggalData,
                                    "nilai": nilai,
                                    "item": "Kehadiran",
                                    "target": target, //datas.data.data.target,
                                    "hasil": $scope.hasil,
                                    "komponenIKI": "Kehadiran"
                                });
                                $scope.createPrilaku();
                                $scope.totalPrilaku = $scope.hasil;
                            }
                        });

                    // } else {
                    //     $scope.createPrilaku();
                    // }
                });
                $scope.hitungAll();
            }
            // validasi nilai total kualitas =< 20
            function hitungTotal(data, grid){
                var result = {};
                var jml = 0;
                if(grid === 1){
                    data.forEach(function(items){
                        jml += items.hasil;
                    })

                    if(jml > 20) {
                        result = {
                            status: false,
                            msg: "Total nilai kualitas tidak boleh lebih besar dari 20"
                        }
                    } else {
                        result = {
                            status: true,
                            msg: ""
                        }
                    }
                } else if (grid === 2) {
                    data.forEach(function(items){
                        jml += items.hasil;
                    })

                    if(jml > 10) {
                        result = {
                            status: false,
                            msg: "Total nilai inovasi tidak boleh lebih besar dari 10"
                        }
                    } else {
                        result = {
                            status: true,
                            msg: ""
                        }
                    }
                }
                
                return result;
            }
            ///table dibuat static dulu
            $scope.kualitasGridOpt = {
                editable: true,
                selectable: "row",
                toolbar: [{name: "create", text: "Tambah"}],
                sortable: true,
                pageable: true,
                dataBound: function() {
                    this.expandRow(this.tbody.find("tr.k-master-row").first());
                },
                columns: [
                    {field: "rowNumber", title: "", hidden: true},
                    {field: "noRec", title: "noRec", hidden: true},
                    {field: "komponenIKI", title: "komponenIKI", hidden: true},
                    {field: "item", title: "Komponen", width: "50%"},
                    {field: "target", title: "Target", width: 100},
                    {field: "bobot", title: "Bobot", width: 100},
                    {field: "capaian", title: "Capaian", width: 100},
                    {field: "total", title: "Total", width: 100, format: "{0:n2}"},
                    {field: "nilai", title: "Nilai", width: 100, format: "{0:n2}"},
                    {field: "hasil", title: "Hasil", width: 100, format: "{0:n2}"},
                    {field: "keterangan", title: "Keterangan", visible: false},
                    {command: [{name: "destroy", text: "Hapus"},{name: "edit", text: "Edit"}], title: "&nbsp;", width: 160 }
                    // {"command": [{name: "edit", text: "Edit"}],
                    // "title": " ", "width": 100 }
                ],
                editable: { mode: "popup", window: { title: "Input Komponen IKI (Kualitas)" }, template: kendo.template($("#popup-editor-kualitas").html())},
                save: function(e){
                    e.model.total = e.model.capaian;
                    e.model.nilai = e.model.capaian/ e.model.target;
                    e.model.hasil = e.model.nilai * e.model.bobot;
                    e.model.idKualitas = $scope.kualitasGrid._data.length;
                    var isValidTotal = hitungTotal($scope.kualitasGrid._data, 1);

                    if(isValidTotal.status){
                        $scope.reHitung($scope.kualitasGrid._data, 1);
                    } else {
                        e.preventDefault();
                        messageContainer.error(isValidTotal.msg);
                    }
                }
            };
            $scope.createKualitas = function () {
                $scope.kualitasGrid = new kendo.data.DataSource({
                    data: dataKualitas,
                    schema: {
                        model: {
                            id: "idKualitas",
                            fields: {
                                idKualitas: {editable: false},
                                rowNumber: {editable: false},
                                komponenIKI: {editable: false},
                                item: {editable: true, validation: { 
                                    validasiKomponen: function (input) {
                                    if (input.is("[name='komponen']") && input.val() === "") {                        
                                        return false;
                                    }
                                    return true;
                                    }
                                }},
                                target: {editable: true, type: "number", min: 0, validation: {required: true}},
                                bobot: {editable: true, type: "number", min: 0, validation: {required: true}},
                                capaian: {editable: true, type: "number", min: 0, validation: {required: true}},
                                total: {editable: false, type: "number"},
                                nilai: {editable: false, type: "number"},
                                hasil: {editable: false, type: "number"},
                                keterangan: {editable: true, validation: { 
                                    validasiKeterangan: function (textarea) {
                                        if (textarea.is("[name='keterangan']") && textarea.val() === "") {                        
                                            return false;
                                        }
                                        return true;
                                    }
                                }}
                            }
                        }
                    },
                    aggregate: [
                        {field: "hasil", aggregate: "sum"}
                    ],
                    change: function(e){
                        if(e.action === "remove"){
                            $scope.reHitung($scope.kualitasGrid._data, 1);
                        }
                    }
                });
                $scope.hitungAll();
            }
            // gerenate opsi tabel Inovasi
            $scope.inovasiGridOpt = {
                editable: true,
                selectable: "row",
                toolbar: [{name: "create", text: "Tambah"}],
                sortable: true,
                pageable: true,
                dataBound: function() {
                    this.expandRow(this.tbody.find("tr.k-master-row").first());
                },
                columns: [
                    {field: "rowNumber", title: "", hidden: false},
                    {field: "noRec", title: "noRec", hidden: true},
                    {field: "komponenIKI", title: "komponenIKI", hidden: true},
                    {field: "item", title: "Komponen", width: "50%"},
                    {field: "target", title: "Target", width: 100},
                    {field: "bobot", title: "Bobot", width: 100},
                    {field: "capaian", title: "Capaian", width: 100},
                    {field: "total", title: "Total", width: 100, format: "{0:n2}"},
                    {field: "nilai", title: "Nilai", width: 100, format: "{0:n2}"},
                    {field: "hasil", title: "Hasil", width: 100, format: "{0:n2}"},
                    {command: [{name: "destroy", text: "Hapus"},{name: "edit", text: "Edit"}], title: "&nbsp;", width: 160 }
                    // "title": " ", "width": 100 }
                ],
                editable: { mode: "popup", window: { title: "Input Komponen IKI (Inovasi)" }, template: kendo.template($("#popup-editor-inovasi").html())},
                save: function(e){
                    e.model.total = e.model.capaian;
                    e.model.nilai = e.model.capaian/ e.model.target;
                    e.model.hasil = e.model.nilai * e.model.bobot;
                    e.model.idInovasi = $scope.inovasiGrid._data.length;
                    var isValidTotal = hitungTotal($scope.inovasiGrid._data, 2);

                    if(isValidTotal.status){
                        $scope.reHitung($scope.inovasiGrid._data, 2);
                    } else {
                        e.preventDefault();
                        messageContainer.error(isValidTotal.msg);
                    }
                }
            };

            $scope.createInovasi = function () {
                $scope.inovasiGrid = new kendo.data.DataSource({
                    data: dataInovasi,
                    schema: {
                        model: {
                            id: "idInovasi",
                            fields: {
                                idInovasi: {editable: false},
                                rowNumber: {editable: false},
                                komponenIKI: {editable: false},
                                item: {editable: true, validation: {required: true}},
                                target: {editable: true, type: "number", validation: {required: true}},
                                bobot: {editable: true, type: "number", min: 0, validation: {required: true}},
                                capaian: {editable: true, type: "number", min: 0, validation: {required: true}},
                                total: {editable: false, type: "number"},
                                nilai: {editable: false, type: "number"},
                                hasil: {editable: false, type: "number"},
                                keterangan: {editable: true, type: "string", validation: {required: true}}
                            }
                        }
                    },
                    aggregate: [
                        {field: "capaian", aggregate: "sum"},
                        {field: "hasil", aggregate: "sum"}
                    ],
                    change: function(e){
                        if(e.action === "remove"){
                            $scope.reHitung($scope.inovasiGrid._data, 2);
                        }
                    }
                });
                $scope.hitungAll();
            }

            $scope.createPrilaku = function () {
                $scope.prilakuGrid = new kendo.data.DataSource({
                    data: dataPrilaku,
                    schema: {
                        model: {
                            fields: {
                                komponenIKI: {editable: false},
                                item: {editable: false, validation: {required: true}},
                                target: {editable: false, type: "number"},
                                bobot: {editable: false, type: "number"},
                                capaian: {editable: true, type: "number", min: 0, validation: {required: true}},
                                total: {editable: false, type: "number"},
                                nilai: {editable: false, type: "number"},
                                hasil: {editable: false, type: "number"}
                            }
                        }
                    },
                    aggregate: [
                        {field: "capaian", aggregate: "sum"},
                        {field: "hasil", aggregate: "sum"}
                    ],
                    change: function (e) {
                        if ((e.field && e.action === "itemchange")) {
                            if ($scope.gridprilaku.item === "Kehadiran") {
                                $scope.gridprilaku.capaian = $scope.capaianKehadiran;
                                window.messageContainer.error("Capaian kehadiran tidak boleh diubah..!!!");
                            } else {
                                $scope.gridprilaku.total = $scope.gridprilaku.capaian;
                                var tmp = 0;
                                tmp = $scope.gridprilaku.total /$scope.gridprilaku.target;
                                if (tmp >= 1) {
                                    $scope.gridprilaku.nilai = 1;
                                } else {
                                    $scope.gridprilaku.nilai = tmp;
                                }
                                $scope.gridprilaku.hasil = $scope.gridprilaku.bobot * $scope.gridprilaku.nilai;
                                $scope.prilakuGrid.fetch();
                                $scope.reHitung($scope.prilakuGrid._data, 3);
                            }
                        }
                    }
                });
                $scope.hitungAll();
            }

            $scope.kl = function (gridkualitas) {
                $scope.gridkualitas = gridkualitas;
            };
            $scope.kl2 = function (gridprilaku) {
                $scope.gridprilaku = gridprilaku;
            };
            $scope.kl3 = function (gridinovasi) {
                $scope.gridinovasi = gridinovasi;
            };

            $scope.Save = function (data, tipe) {
                if($scope.item.pegawai.id === $scope.pegawaiLogin.id){
                    messageContainer.error("Anda tidak bisa mengisi nilai IKI anda sendiri.");
                    return ;
                }
                if (status === false) {
                    $scope.simpan($scope.kualitasGrid._data, 1);
                    $scope.simpan($scope.inovasiGrid._data, 2);
                    $scope.simpan($scope.prilakuGrid._data, 3);
                } else {
                    window.messageContainer.error("Data tidak dapat disimpan..!!");
                }
            }

            $scope.beforeKirim = [];
            $scope.simpan = function (data, tipe) {
                // var datas = [];
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        var element = data[key];
                        if (element.komponenIKI !== undefined) {
                            var tmp = element.capaian / element.target;
                            var nilai;
                            var hasil;
                            if (tmp >= 1) {
                                nilai = 1;
                            } else {
                                nilai = tmp;
                            }
                            hasil = element.bobot * nilai;

                            $scope.beforeKirim.push({
                                "nilaiIndexKinerjaIndividu": {
                                    "totalIKI": $scope.totalNilaiKinerja,
                                    "iki": $scope.indeksKinerjaIndividu,
                                    "pegawai": {
                                        "id": $scope.item.pegawai.id
                                    },
                                    "periode": tanggalData,
                                    "totalKuantitas": $scope.totalKuantitas,
                                    "totalPerilaku": $scope.totalPrilaku,
                                    "totalKualitas": $scope.totalKualitas,
                                "totalInovasi": $scope.totalInovasi
                                },
                                "total": element.capaian,
                                "bobot": element.bobot,
                                "nilai": nilai,
                                "noRec": element.noRec,
                                "pegawai": {
                                    "id": $scope.item.pegawai.id
                                },
                                "periode": tanggalData,
                                "item": element.item,
                                "keterangan": element.keterangan,
                                "target": element.target,
                                "hasil": hasil,
                                "komponenIKI": {
                                    "id": tipe
                                }
                            });
                        }
                    }
                }
                if (tipe === 3){
                    var dataKirim = {
                        "indeksKinerjaIndividu": $scope.beforeKirim
                    }
                    // console.log(JSON.stringify(dataKirim));
                    ManageSdmNew.saveData(dataKirim, "sdm/save-list-indeks-kinerja-individu/").then(function (e) {
                         $scope.beforeKirim = []; //reset objek penampung data yang akan di simpan
                        /*
                         $scope.createKualitas();
                         $scope.createInovasi();
                         $scope.createPrilaku();*/
                    });
                }
            }

            $scope.toogleCheckVerifikasi = function(current){
				if(current){
					$scope.daftarListPegawai = $scope.listPegawaiPensiun;
				} else {
					$scope.daftarListPegawai = $scope.listPegawai;
				}
			}

            // $scope.rebuild = function () {
            //     dataKualitas = [];
            //     angular.forEach($scope.kualitasGrid._data, function (item) {
            //         var total = 0.00;
            //         var hasil = 0.00;
            //         var nilai = 0.00;
            //         var capaian = item.capaian;
            //         var items = item.item;
            //         var target = item.target;
            //         var bobot = item.bobot;

            //         total = capaian;
            //         var tmp = 0;
            //         tmp = total / target;
            //         if (tmp >= 1) {
            //             nilai = 1;
            //         } else {
            //             nilai = tmp;
            //         }
            //         hasil = bobot * nilai;

            //         dataKualitas.push({
            //             "capaian": capaian,
            //             "total": total,
            //             "bobot": bobot,
            //             "periode": tanggalData,
            //             "nilai": nilai,
            //             "item": items,
            //             "target": target,
            //             "hasil": hasil,
            //             "komponenIKI": item.komponenIKI,
            //             "keterangan": item.keterangan
            //         });

            //     });
            //     $scope.createKualitas();
            //     $scope.reHitung($scope.kualitasGrid._data, 1);
            // }

        }
    ])
});