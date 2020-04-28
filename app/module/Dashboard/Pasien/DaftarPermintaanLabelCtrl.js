define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('DaftarPermintaanLabelCtrl', ['CacheHelper', '$q', '$rootScope', '$scope','ModelItem' ,'ModelItemAkuntansi', 'DateHelper', '$http', '$state', 'ReportPelayanan', 'ManageSdm', 'ManageTataRekening',
        function (cacheHelper, $q, $rootScope, $scope, ModelItem, modelItemAkuntansi, DateHelper, $http, $state, ReportPelayanan, ManageSdm, manageTataRekening) {
            //Inisial Variable 
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.dataSelected = {};
            $scope.item = {};
            LoadData()

            $scope.unshowAmbilLabel = true;

            $scope.AmbilLabel = function () {   
                if ($scope.dataSelected.norec == undefined) {
                    alert("Pilih data terlebih dahulu")
                    return
                }
                else {
                    $scope.showAmbilLabel = true
                    $scope.unshowAmbilLabel = false
                  
                }
                 
            }
            $scope.klikGrid = function (dataSelected) {
                if (dataSelected != undefined) {
                    $scope.item.namaPegawai = { id: dataSelected.objectpegawaipenerimafk, namalengkap: dataSelected.pegawaipenerima1 }
                    $scope.model.pegawai = true
                }
            }
            $scope.simpan = function () {
                var objSave =
                    {
                        norec: $scope.dataSelected.norec,
                        objectpegawaipenerimafk: $scope.item.namaPegawai.id,
                        tglambil: $scope.item.tglDiterima

                    }
                manageTataRekening.postUpdateOrderLabel(objSave).then(function (e) {
                    LoadData();
                    $scope.unshowAmbilLabel = true
                    $scope.showAmbilLabel = false
                })
            }
        
            $scope.batal = function () {
                $scope.unshowAmbilLabel = true
                $scope.showAmbilLabel = false
            }

            $scope.formatNum = {
                format: "#.#",
                decimals: 0
            }
            $scope.cetakLabel = function() {
                // if($scope.item != undefined){
                //     var fixUrlLaporan = cetakHelper.open("reporting/labelPasien?noCm=" + $scope.item.pasien.noCm);
                //     window.open(fixUrlLaporan, '', 'width=800,height=600')
                // }
                $scope.dats = {
                    qty: 0
                }
                $scope.dialogCetakLabel.center().open();
            }
            $scope.pilihQty = function(data) {
                var listRawRequired = [
                    "dats.qty|k-ng-model|kuantiti"
                ];
                var isValid = ModelItem.setValidation($scope, listRawRequired);

                if(isValid.status){
                    var qty = data.qty;
                    if(qty !== undefined){
                        // var fixUrlLaporan = cetakHelper.open("reporting/labelPasien?noCm=" + $scope.item.pasienDaftar.noRegistrasi + "&qty=" + qty);
                        // window.open(fixUrlLaporan, '', 'width=800,height=600')
                        //cetakan langsung service VB6 by grh
                        var client = new HttpClient();
                        client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-labelpasien=1&norec=' + $scope.dataSelected.noregistrasi + '&view=false&qty=' + qty, function(response) {
                            // do something with response
                        });

                    }
                    $scope.dialogCetakLabel.close();
                } else {
                    ModelItem.showMessages(isValid.messages);
                }
            };
         
            // $scope.cekPegawai = function (data) {
            //     $scope.item.pegawai = undefined;
            //     // debugger;
            //     if (data === true) {
            //         // $scope.ruangans = modelItem.kendoHttpSource('/registrasi-pelayanan/get-all-ruangan-rawat-inap');
            //         $scope.comboPegawai = true;
            //         $scope.textPegawai = true;
            //     } else
            //         if (data === false || data === undefined) {
            //             $scope.textPegawai = false;
            //             $scope.comboPegawai = false;
            //         } else {
            //             return;
            //         }
            // }
            // $scope.$watch('model.pegawai', function (data) {
            //     if (!data) {
            //         $scope.textPegawai = false
            //         $scope.comboPegawai = false
            
            //     }
            //     else
            //         $scope.cekPegawai(data);
            // })

            $scope.CariData = function () {
                $scope.isLoadingData = true;
                LoadData()
            }
            function LoadData() {


                var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD HH:mm');
                var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD HH:mm');


                var rm = ""
                if ($scope.item.noRm != undefined) {
                    var rm = "&norm=" + $scope.item.noRm
                }
                var nm = ""
                if ($scope.item.nama != undefined) {
                    var nm = "&nama=" + $scope.item.nama
                }
                var tempRuanganId = "";
                if ($scope.item.ruangan != undefined) {
                    tempRuanganId = "&idRuangan=" + $scope.item.ruangan.id;
                }
                var tempStatusId = "";
                if ($scope.item.status != undefined) {
                    tempStatusId = "&idStatus=" + $scope.item.status.id;
                }



                var chacePeriode = {
                    0: tglAwal,
                    1: tglAkhir
                }
                cacheHelper.set('RekapMutasiPasienCtrl', chacePeriode);

                modelItemAkuntansi.getDataTableTransaksi("orderlabel/get-daftar-permintaan?"
                    + "tglAwal=" + tglAwal
                    + "&tglAkhir=" + tglAkhir
                    + nm
                    + rm
                    + tempRuanganId
                    + tempStatusId
                    // + tempKelPasienId
                ).then(function (data) {
                    var doubleTotal = 0;
                    var doubleKarcis = 0;
                    for (var i = 0; i < data.data.length; i++) {
                        doubleTotal = doubleTotal + parseFloat(data.data[i].total)
                        doubleKarcis = doubleKarcis + parseFloat(data.data[i].karcis)
                    }
                    $scope.item.karcis = doubleKarcis
                    $scope.item.total = doubleTotal
                    $scope.sourceDaftarPermintaan = new kendo.data.DataSource({
                        data: data.data,
                        group: $scope.group,
                        pageSize: 10,
                        total: data.length,
                        serverPaging: false,
                        schema: {
                            model: {
                                fields: {
                                }
                            }
                        }
                    });
                    $scope.dataExcel = data.data;
                    $scope.isLoadingData = false;
                })

            }


            $scope.formatTanggal = function (tanggal) {
                return moment(tanggal).format('DD-MMM-YYYY HH:mm');
            }
            $scope.formatRupiah = function (value, currency) {
                return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            }

            $scope.selectedData = [];
            $scope.onClick = function (e) {
                var element = $(e.currentTarget);

                var checked = element.is(':checked'),
                    row = element.closest('tr'),
                    grid = $("#kGrid").data("kendoGrid"),
                    dataItem = grid.dataItem(row);

                // $scope.selectedData[dataItem.noRec] = checked;
                if (checked) {
                    var result = $.grep($scope.selectedData, function (e) {
                        return e.noregistrasi == dataItem.noregistrasi;
                    });
                    if (result.length == 0) {
                        $scope.selectedData.push(dataItem);
                    } else {
                        for (var i = 0; i < $scope.selectedData.length; i++)
                            if ($scope.selectedData[i].noregistrasi === dataItem.noregistrasi) {
                                $scope.selectedData.splice(i, 1);
                                break;
                            }
                        $scope.selectedData.push(dataItem);
                    }
                    row.addClass("k-state-selected");
                } else {
                    for (var i = 0; i < $scope.selectedData.length; i++)
                        if ($scope.selectedData[i].noregistrasi === dataItem.noregistrasi) {
                            $scope.selectedData.splice(i, 1);
                            break;
                        }
                    row.removeClass("k-state-selected");
                }
            }

            // $scope.group = {
            //     field: "namaruangan",
            //     aggregates: [{
            //         field: "namaruangan",
            //         aggregate: "count"
            //     }, {
            //         field: "namaruangan",
            //         aggregate: "count"
            //     }]
            // };
            // $scope.aggregate = [{
            //     field: "namaruangan",
            //     aggregate: "count"
            // }, {
            //     field: "namaruangan",
            //     aggregate: "count"
            // }]



            // $("#kGrid").kendoGrid({
            //     toolbar: ["excel"],
            //     excel: {
            //         fileName: "Label.xlsx",
            //         allPages:true,
            //     },
            //     dataSource: $scope.dataExcel,
            //     // sortable: true,
            //     pageable: true,
            //     // groupable: true,
            //     // filterable: true,
            //     columnMenu: true,
            //     // reorderable: true,
            //     resizable: true,
            $scope.columnDaftarPermintaan = [
                // {
                //     "template": "<input type='checkbox' class='checkbox' ng-click='onClick($event)' />",
                //     "width": 40
                // },
                {
                    "field": "tglpermintaan",
                    "title": "Tgl Permintaan",
                    "width": "150px",
                    "template": "#if (tglpermintaan) {# #= new moment(tglpermintaan).format(\'DD-MMM-YYYY HH:mm\')# #} else {# - #} #",
                },
                {
                    "field": "noregistrasi",
                    "title": "No Registrasi",
                    "width": "130px",
                    "template": "<span class='style-center'>#: noregistrasi #</span>"
                },
                {
                    "field": "nocm",
                    "title": "No RM",
                    "width": "80px"
                },
                {
                    "field": "namapasien",
                    "title": "Nama Pasien",
                    "width": "180px",

                },
                {
                    "field": "namaruangan",
                    "title": "Ruangan",
                    "width": "180px"
                },
                {
                    "field": "pegawaiorder1",
                    "title": "Pegawai Order",
                    "width": "150px"
                },
                {
                    "field": "pegawaipenerima1",
                    "title": "Pegawai Penerima",
                    "width": "150px"
                },
                {
                    "field": "qtyorder",
                    "title": "Qty Order",
                    "width": "150px"
                },
                {
                    "field": "status",
                    "title": "Status",
                    "width": "100px"
                },
                {
                    "field": "keterangan",
                    "title": "Keterangan",
                    "width": "150px"
                },


            ];
            // });
            $scope.Perbaharui = function () {
                $scope.ClearSearch();
            }

            //fungsi clear kriteria search
            $scope.ClearSearch = function () {
                $scope.item = {};
                $scope.item.tglawal = $scope.now;
                $scope.item.tglakhir = $scope.now;
                $scope.CariLapPendapatanPoli();
            }


            var HttpClient = function () {
                this.get = function (aUrl, aCallback) {
                    var anHttpRequest = new XMLHttpRequest();
                    anHttpRequest.onreadystatechange = function () {
                        if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                            aCallback(anHttpRequest.responseText);
                    }

                    anHttpRequest.open("GET", aUrl, true);
                    anHttpRequest.send(null);
                }
            }
            manageTataRekening.getDataTableTransaksi("orderlabel/get-data-combo", false).then(function (data) {
                $scope.listRuangan = data.data.ruangan;
                $scope.listStatus = data.data.statusorder;
                $scope.listKelas = data.data.kelas;
                $scope.listKamar = data.data.kamar;
                $scope.listPegawai = data.data.pegawai;

            })

            $scope.getIsiComboRuangan = function () {
                $scope.listRuangan = $scope.item.departement.ruangan
            }
            //sdm service hanya sementara, nanti harus diganti pake service kasir !!
            ManageSdm.getItem("service/list-generic/?view=Pegawai&select=id,namaLengkap", true).then(function (dat) {
                $scope.listPegawai = dat.data;
            });



            $scope.tglPelayanan = $scope.item.pelayanan;
            $scope.dokter = $scope.item.namaPegawai;

            $scope.listDataFormat = [

                {
                    "id": 1, "format": "pdf"
                },
                {
                    "id": 2, "format": "xls"
                }

            ]


            $scope.date = new Date();
            var tanggals = DateHelper.getDateTimeFormatted3($scope.date);
            var tanggalzzz = DateHelper.getDateTimeFormatted($scope.date);

            //Tanggal Default
            $scope.item.tglawal = tanggals + " 00:00";
            $scope.item.tglakhir = tanggals + " 15:00";
            $scope.item.tglDiterima = tanggalzzz;
            // Tanggal Inputan
            $scope.tglawal = $scope.item.tglawal;
            $scope.tglakhir = $scope.item.tglakhir;
            $scope.pegawai = modelItemAkuntansi.getPegawai();

            $scope.Cetak = function () {

                var daftarCetak = [];
                if ($scope.selectedData.length > 0) {
                    $scope.selectedData.forEach(function (items) {
                        daftarCetak.push(items)
                    })
                    var resultCetak = daftarCetak.map(a => a.noregistrasi).join("|");
                } else {
                    var resultCetak = "";
                }
                $scope.dataLogin = JSON.parse(window.localStorage.getItem('pegawai'));
                if ($scope.item.tglawal == $scope.tglawal)
                    var tglawal = $scope.item.tglawal;
                else
                    var tglawal = DateHelper.getDateTimeFormatted2($scope.item.tglawal, "dd-MM-yyyy HH:mm");
                if ($scope.item.tglakhir == $scope.tglakhir)
                    var tglakhir = $scope.item.tglakhir;
                else
                    var tglakhir = DateHelper.getDateTimeFormatted2($scope.item.tglakhir, "dd-MM-yyyy HH:mm");

                // if ($scope.item.KelompokPasien == undefined)
                //     var kelompokPasien = "";
                // else
                //     var kelompokPasien = $scope.item.KelompokPasien.id;
                if ($scope.item.ruangan == undefined)
                    var ruangan = "";
                else
                    var ruangan = $scope.item.ruangan.id;
                if ($scope.item.departement == undefined)
                    var departement = "";
                else
                    var departement = $scope.item.departement.id;
                if ($scope.item.kelas == undefined)
                    var kelas = "";
                else
                    var kelas = $scope.item.kelas.id;
                // if ($scope.item.namaPegawai == undefined)
                //     var namaPegawai = "";
                // else
                //     var namaPegawai = $scope.item.namaPegawai.id;
                var stt = 'false'
                if (confirm('View Label? ')) {
                    // Save it!
                    stt = 'true';
                } else {
                    // Do nothing!
                    stt = 'false'
                }
                var client = new HttpClient();
                // client.get('http://127.0.0.1:1237/printvb/laporanPelayanan?cetak-LaporanPendapatan-perkelas=1&tglAwal='
                //     + tglawal + '&tglAkhir=' + tglakhir + '&strNoReg=' + resultCetak + '&strIdDepartemen=' + departement
                //     + '&strIdRuangan=' + ruangan + '&strIdKelas=' + kelas + '&strIdPegawai=' + $scope.dataLogin.namaLengkap + '&view=' + stt, function (response) {
                //         // do something with response
                //     });
            };




        }
    ]);
});