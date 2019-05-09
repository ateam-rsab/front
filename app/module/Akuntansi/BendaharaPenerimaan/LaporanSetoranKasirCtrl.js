//Owari Start here....
//“Good programmer write code for machine, great programmer write code for other programmer”, laravel
define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('LaporanSetoranKasirCtrl', ['$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'MnKeu', 'DateHelper', '$state', 'CacheHelper', 'ManageKasir', '$mdDialog',
        function ($q, $rootScope, $scope, modelItemAkuntansi, mnKeu, dateHelper, $state, cacheHelper, manageKasir, $mdDialog) {
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.item = {};
            $scope.total = {};
            $scope.isRouteLoading = false;
            $scope.dataLogin = JSON.parse(window.localStorage.getItem('pegawai'));

            var addDataDetail = [];
            $scope.item.tanggalAwal = $scope.now
            $scope.item.tanggalAkhir = $scope.now

            // $scope.dataModelGrid = {};
            // $scope.dataModelGrid.NamabankAccount = {};
            // $scope.dataModelGrid.total = {};

            var status = ""
            var ttlSsetor = 0;
            loadCombo();
            //loadData();


            function loadCombo() {
                // debugger;
                //get bank account
                manageKasir.getDataGeneric("BankAccount&select=id,bankAccountNama,bankAccountNomor").then(function (data) {
                    $scope.listBankAccount = data;
                });
                // manageKasir.getDataGeneric("view=Agama&search=agama:%a%&select=id,agama&order=").then(function(data){
                $scope.listNamabankAccount = [{ "id": "1", "namaExternal": "BRI 001" }, { "id": "2", "namaExternal": "BRI 002" }, { "id": "3", "namaExternal": "BRI 003" }]
                // })
                //debugger;
                var chacePeriode = cacheHelper.get('SetoranKasirPHPCtrl');
                if (chacePeriode != undefined) {
                    var arrPeriode = chacePeriode.split('~');
                    $scope.item.tanggalAwal = new Date(arrPeriode[0]);
                    $scope.item.tanggalAkhir = new Date(arrPeriode[1]);
                    $scope.item.tanggalAwal2 = new Date(arrPeriode[2]);
                    $scope.item.tanggalAkhir2 = new Date(arrPeriode[3]);
                    $scope.item.tanggalAwal3 = new Date(arrPeriode[4]);
                    $scope.item.tanggalAkhir3 = new Date(arrPeriode[5]);
                }
                else {
                    $scope.item.tanggalAwal = $scope.now;
                    $scope.item.tanggalAkhir = $scope.now;

                }
                manageKasir.getDataTableTransaksi("bendahara-penerimaan/get-data-combo").then(function (e) {
                    $scope.listCaraSetor = e.data.carasetor;
                });
                mnKeu.getDataTableTransaksi("kasir/daftar-kasir").then(function (data) {
                    $scope.listInstalasi = data.data.dataInstalasi;
                    $scope.listKelompokTransaksi = data.data.dataKP;
                    $scope.listCaraBayar = data.data.dataCB;

                });

                mnKeu.getDataTableTransaksi("kasir/laporan-penerimaan-kasir-datacombo", true).then(function (dat) {
                    // $scope.listPegawai = dat.data.dataDokter;
                    // $scope.listRuangan = dat.data.dataruangan;
                    $scope.listNamaKasir = dat.data.datakasir;
                    $scope.dataLogin = dat.data.datalogin[0];
                    // $scope.listKelompokPasien = dat.data.datakelompokpasien;
                });
                //data[2].data
                var objKasir = {}
                $scope.listStatus = [{ "id": "1", "namaExternal": "Semua" }, { "id": "2", "namaExternal": "Verifikasi" }, { "id": "3", "namaExternal": "Closing" }]
                // $q.all([
                // 	mnKeu.getListGeneric("Pegawai&select=id,namaLengkap&criteria=jabatanInternalId&values=697"),
                // 	mnKeu.getListGeneric("Pegawai&select=id,namaLengkap&criteria=jabatanInternalId&values=699"),
                // 	mnKeu.getListGeneric("Pegawai&select=id,namaLengkap&criteria=jabatanInternalId&values=700"),
                // 	mnKeu.getListGeneric("Pegawai&select=id,namaLengkap&criteria=jabatanInternalId&values=701")	     
                // 	]).then(function(data) {
                // 		objKasir = data[0]
                // 		for (var y=1;y<4;y++){
                // 			for (var x=0;x < data[y].data.length;x++){
                // 				objKasir.data.push(data[y].data[x])
                // 			}
                // 		}
                // 		$scope.listNamaKasir = objKasir.data;
                // 	})
            }

            $scope.SearchData1 = function () {
                // if ($scope.item.namaKasir == undefined){
                // 	toastr.error("Kasir belum dipilih");
                // }else{
                status = "-"
                loadData();
                addDataDetail = [];
                // }
            }

            function loadData() {
                $scope.isRouteLoading = true;
                var tglAwal = moment($scope.item.tanggalAwal).format('YYYY-MM-DD HH:mm');
                var tglAkhir = moment($scope.item.tanggalAkhir).format('YYYY-MM-DD HH:mm');

                var chacePeriode = tglAwal + "~" + tglAkhir + "~";
                cacheHelper.set('SetoranKasirPHPCtrl', chacePeriode);
                //debugger;
                var Skasir = "";
                if ($scope.item.namaKasir != undefined) {
                    Skasir = $scope.item.namaKasir.id;
                }

                var ScaraBayar = "";
                if ($scope.item.caraBayar != undefined) {
                    ScaraBayar = $scope.item.caraBayar.id;
                }
                var noSbm = "";
                if ($scope.item.nosbm != undefined) {
                    noSbm = $scope.item.nosbm;
                }
                var noClosing = ""
                if ($scope.item.noClosing != undefined) {
                    noClosing = $scope.item.noClosing;
                }

                //'kasir/daftar-sbm'
                $q.all([

                    mnKeu.getDataTableTransaksi("bendahara-penerimaan/get-daftar-sbm?"
                        + "dateStartTglSbm=" + tglAwal
                        + "&dateEndTglSbm=" + tglAkhir
                        + "&idPegawai=" + Skasir
                        + "&nosbm=" + noSbm
                        + "&idCaraBayar=" + ScaraBayar
                        + "&noClosing=" + noClosing)
                ]).then(function (data) {

                    if (data[0].statResponse) {
                        $scope.isRouteLoading = false;
                        var result = data[0].data.data;

                        var ttlPasien = 0;
                        var ttlKlaim = 0;
                        var tTunai = 0
                        var tDebit = 0
                        var tKredit = 0
                        var tMix = 0
                        var tTransferBank = 0
                        var tDonasi = 0
                        for (var x = 0; x < result.length; x++) {
                            var element = result[x];
                            element.tglSbm = moment(result[x].tglSbm).format('DD-MM-YYYY HH:mm');
                            if (element.nocm == null) {
                                element.nocm = '-'
                            }
                            if (element.namapasien == null) {
                                element.namapasien = '-'
                            }
                            if (element.namapasien_klien == null) {
                                element.namapasien_klien = '-'
                            }
                            element.namapasien = element.nocm + ' - ' + element.namapasien
                            if (element.namaruangan == null) {
                                element.namaruangan = "-"
                            }
                            if (element.noClosing != null) {
                                element.status = 'Setor';

                            } else {
                                element.status = 'Belum Setor';
                                element.noClosing = '-';
                            }
                            ttlPasien = ttlPasien + 1;
                            // element.tglSbm= moment(result[x].tglSbm).format('DD-MM-YYYY HH:mm');
                            ttlKlaim = ttlKlaim + parseInt(result[x].totalPenerimaan);
                            if (result[x].idCaraBayar == 1)
                                tTunai = tTunai + parseInt(result[x].totalPenerimaan);
                            if (result[x].idCaraBayar == 2)
                                tKredit = tKredit + parseInt(result[x].totalPenerimaan);
                            if (result[x].idCaraBayar == 3)
                                tTransferBank = tTransferBank + parseInt(result[x].totalPenerimaan);
                            if (result[x].idCaraBayar == 4)
                                tDebit = tDebit + parseInt(result[x].totalPenerimaan);
                            if (result[x].idCaraBayar == 5)
                                tDonasi = tDonasi + parseInt(result[x].totalPenerimaan);
                            if (result[x].idCaraBayar == 6)
                                tMix = tMix + parseInt(result[x].totalPenerimaan);
                        }

                        if (status == "-") {

                            $scope.dataSetoranKasir = {
                                data: result,
                                selectable: true,
                                refresh: true,
                                pageSize: 10,

                                aggregate: [

                                    { field: 'totalPenerimaan', aggregate: 'sum' },
                                ]
                            };

                            $scope.item.totalSubTotal2 = "Rp. " + parseFloat(ttlKlaim).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")

                            $scope.total.tunai = "Rp. " + parseFloat(tTunai).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                            $scope.total.debit = "Rp. " + parseFloat(tDebit).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                            $scope.total.kartuKredit = "Rp. " + parseFloat(tKredit).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                            $scope.total.transferBank = "Rp. " + parseFloat(tTransferBank).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                            $scope.total.mix = "Rp. " + parseFloat(tMix).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                            $scope.total.donasi = "Rp. " + parseFloat(tDonasi).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                        }
                    };
                    Total();
                });
            }

            $scope.add = function () {
                if ($scope.item.jumlah == 0 || $scope.item.jumlah == '') {
                    toastr.error('Jumlah tidak boleh kosong')
                    return
                }

                var nomor = 0
                if (addDataDetail.length == 0) {
                    nomor = 1
                } else {
                    nomor = addDataDetail.length + 1
                }
                var arrayS = {};
                arrayS = {
                    no: nomor,
                    idCaraBayar: $scope.item.caraBayar.id,
                    caraBayar: $scope.item.caraBayar.namaLengkap,
                    idCaraSetor: $scope.item.caraSetor.id,
                    caraSetor: $scope.item.caraSetor.carasetor,
                    // idBankAccount:$scope.item.bankAccount.id,
                    // bankAccount:$scope.item.bankAccount.bankAccountNama,
                    jumlah: $scope.item.jumlah
                };
                addDataDetail.push(arrayS);
                Total();
                $scope.item.cekSetorAll = false;
            };
            $scope.delete = function () {
                if ($scope.dataDetailSelect != undefined) {
                    if (addDataDetail.length > 0) {
                        for (var i = addDataDetail.length - 1; i >= 0; i--) {
                            if (addDataDetail[i].no == $scope.dataDetailSelect.no) {
                                addDataDetail.splice(i, 1);
                            }
                        }
                    } else {
                        toastr.error('Data sudah di CLosing')
                    }
                } else {
                    toastr.error('Pilih data detail dulu')
                }
                Total();

            }

            $scope.$watch('item.jumlah', function (newValue, oldValue) {
                if (newValue != oldValue) {
                    if ($scope.item.jumlah < 0) {
                        $scope.item.jumlah = "";
                    }

                }
            })


            $scope.$watch('item.cekSetorAll', function (newValue, oldValue) {
                if (newValue != oldValue) {
                    if ($scope.item.cekSetorAll) {
                        if ($scope.item.caraBayar != undefined) {
                            for (var i = 0; i < $scope.dataCaraBayar.length; i++) {
                                if ($scope.dataCaraBayar[i].caraBayar == $scope.item.caraBayar.namaLengkap) {
                                    $scope.item.jumlah = parseFloat($scope.dataCaraBayar[i].totalPenerimaan)
                                }
                            }
                        } else {
                            toastr.error('Pilih cara bayar dulu');
                            $scope.item.cekSetorAll = false;

                        }
                    } else {
                        $scope.item.jumlah = '';
                    }

                }
            })

            $scope.$watch('item.cekSetor100', function (newValue, oldValue) {
                if (newValue != oldValue) {
                    if ($scope.item.cekSetor100) {
                        $scope.disabledCaraBayar = true;
                        if ($scope.item.caraSetor != undefined) {
                            var jumlah = 0;
                            for (var i = 0; i < $scope.dataCaraBayar.length; i++) {
                                var total = $scope.dataCaraBayar[i].totalPenerimaan
                                jumlah = jumlah + total

                            }
                            $scope.item.jumlah = jumlah;
                        } else {
                            toastr.error('Pilih cara setor dulu');
                            $scope.item.cekSetor100 = false;
                            $scope.disabledCaraBayar = false;

                        }
                    } else {
                        $scope.item.jumlah = '';
                    }

                }
            })
            $scope.klikDetail = function (dataSelectedCaraBayar2) {
                $scope.dataDetailSelect = dataSelectedCaraBayar2;

            }

            function Total() {
                var ttlPasien = 0;
                var ttlKlaim = 0;
                ttlSsetor = 0;
                //var dataDetail0 =[];
                var dataDetail = [];
                var dataDetail2 = [];
                var caraBayararr = [];
                var caraBayararr1 = [];
                var adaDetail = 0;
                var jmlSetor = 0;
                //debugger;
                if ($scope.dataSetoranKasir != undefined) {
                    // var dataResult = $scope.dataSetoranKasir.options.data
                    var dataResult = $scope.dataSetoranKasir.data
                    for (var i = 0; i < dataResult.length; i++) {
                        // if (dataResult[i].status != 'Setor') {
                        ttlPasien = ttlPasien + 1;
                        adaDetail = 0

                        for (var x = 0; x < dataDetail2.length; x++) {
                            if (dataDetail2[x].caraBayar == dataResult[i].caraBayar) {
                                dataDetail2[x].totalPenerimaan = parseFloat(dataDetail2[x].totalPenerimaan) + parseFloat(dataResult[i].totalPenerimaan)
                                adaDetail = 1;
                            }
                        };
                        if (adaDetail == 0) {
                            jmlSetor = 0;
                            caraBayararr = { id: dataResult[i].idCaraBayar, namaLengkap: dataResult[i].caraBayar };
                            var dataDetail0 = [];
                            for (var f = 0; f < addDataDetail.length; f++) {
                                if (dataResult[i].caraBayar == addDataDetail[f].caraBayar) {
                                    dataDetail0.push(addDataDetail[f]);
                                    jmlSetor += parseFloat(addDataDetail[f].jumlah);
                                };
                            }
                            if (dataDetail0.length > 0) {
                                dataDetail = {
                                    caraBayar: dataResult[i].caraBayar,
                                    totalPenerimaan: dataResult[i].totalPenerimaan,
                                    totalSetor: jmlSetor,
                                    sisa: dataResult[i].totalPenerimaan,
                                    detail: dataDetail0
                                };
                            } else {
                                /*get dari serive*/
                                var detailSetorans = [];
                                for (var z = 0; z < dataResult[i].details.length; z++) {
                                    if (dataResult[i].caraBayar == dataResult[i].details[z].carabayar) {
                                        dataResult[i].details[z].caraBayar = dataResult[i].details[z].carabayar;
                                        dataResult[i].details[z].caraSetor = dataResult[i].details[z].carasetor;
                                        detailSetorans.push(dataResult[i].details[z]);
                                        jmlSetor += parseFloat(dataResult[i].details[z].jumlah);
                                    };
                                }
                                dataDetail = {
                                    caraBayar: dataResult[i].caraBayar,
                                    totalPenerimaan: dataResult[i].totalPenerimaan,
                                    totalSetor: jmlSetor,
                                    sisa: dataResult[i].totalPenerimaan,
                                    detail: detailSetorans
                                };
                                /*end*/
                            }

                            dataDetail2.push(dataDetail);
                            caraBayararr1.push(caraBayararr);
                        }
                        // }
                    };
                    // debugger
                    for (var i = 0; i < dataDetail2.length; i++) {
                        dataDetail2[i].sisa = parseFloat(dataDetail2[i].totalPenerimaan) - parseFloat(dataDetail2[i].totalSetor)
                        ttlKlaim += parseInt(dataDetail2[i].totalPenerimaan);
                        ttlSsetor += parseInt(dataDetail2[i].totalSetor);
                    }
                    $scope.dataCaraBayar = dataDetail2
                    // 	$scope.dataCaraBayar = new kendo.data.DataSource({
                    //  					data: dataDetail2,
                    //  					pageSize: 100,
                    //  					total: dataDetail2.length,
                    //  					serverPaging: false
                    // });          			
                    $scope.listCaraBayar = caraBayararr1;
                };
                $scope.item.totalSubTotal = "Rp. " + parseFloat(ttlKlaim).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                $scope.item.totalSetoran = "Rp. " + parseFloat(ttlSsetor).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                $scope.item.sisa = "Rp. " + parseFloat(ttlKlaim - ttlSsetor).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")

                $scope.item.jumlah = '';
            };

            $scope.Simpan = function () {
                var objSave = [];
                var objData = [];
                var objStr = {};
                debugger;
                for (var i = 0; i < $scope.dataCaraBayar.length; i++) {
                    for (var j = 0; j < $scope.dataCaraBayar[i].detail.length; j++) {
                        objStr = {
                            "kdCaraBayar": $scope.dataCaraBayar[i].detail[j].idCaraBayar,
                            "totalPenerimaan": $scope.dataCaraBayar[i].detail[j].jumlah,
                            "kdAccountBank": $scope.dataCaraBayar[i].detail[j].idBankAccount,
                            "idCaraSetor": $scope.dataCaraBayar[i].detail[j].idCaraSetor
                        }
                        objData.push(objStr)
                    }

                }
                var tgl = moment($scope.item.tanggalAwal).format('YYYY-MM-DD')
                var tglAwal = moment($scope.item.tanggalAwal).format('YYYY-MM-DD HH:mm')
                var tglAkhir = moment($scope.item.tanggalAkhir).format('YYYY-MM-DD HH:mm')
                objSave = {
                    "tglPenerimaan": tgl,
                    "tglAwal": tglAwal,
                    "tglAkhir": tglAkhir,
                    "kdPegawai": $scope.item.namaKasir.id != undefined ? $scope.item.namaKasir.id : $scope.dataLogin.id,
                    "kdPegawaiLu": $scope.item.namaKasir.luid != undefined ? $scope.item.namaKasir.luid : $scope.dataLogin.id,
                    // "kdPegawai": $scope.item.namaKasir.id,
                    // "kdPegawaiLu": $scope.item.namaKasir.luid,
                    "totalSetoran": ttlSsetor,
                    "detailSetoran": objData
                }
                manageKasir.setoranKasir(objSave).then(function () {
                    var data = {
                        'tglAwal': tglAwal,
                        'tglAkhir': tglAkhir,
                        'idKasir': $scope.item.namaKasir.id
                    }
                    manageKasir.postTransaksi('kasir/save-jurnal-setorankasir', data).then(function (e) {

                    })
                    loadData();
                })
            };
            // select * from strukbuktipenerimaan_t where nosbm='RV-17050000059'
            // select * from strukclosing_t where norec='a1abea20-3b81-11e7-adf8-a9342a4e'
            // select * from strukclosingkasir_t
            // select * from strukclosingkasirstbank_t  where strukclosingfk='a1abea20-3b81-11e7-adf8-a9342a4e'

            // select * from strukhistori_t where norec in ('a1ae4100-3b81-11e7-a45d-cd183d14')

            // select * from loginuser_s where id=77
            // select * from pegawai_m where id=349

            $scope.columnSetoranKasir = {
                columns: [
                    {
                        "field": "noSbm",
                        "title": "NoSbm",
                        "template": "<span class='style-center'>#: noSbm #</span>",
                        "width": "60px"
                    },
                    {
                        "field": "namaruangan",
                        "title": "Nama Ruangan",
                        "template": "<span class='style-left'>#: namaruangan #</span>",
                        "width": "100px"
                    },
                    {
                        "field": "tglSbm",
                        "title": "Tanggal",
                        "template": "<span class='style-center'>#: tglSbm #</span>",
                        "width": "50px"
                    },
                    // {
                    // 	"field": "kelTransaksi",
                    // 	"title": "Kelompok Transaksi",
                    // 	"template": "<span class='style-left'>#: kelTransaksi #</span>"
                    // },
                    {
                        "field": "namapasien",
                        "title": "Nama",
                        "template": "<span class='style-left'>#: namapasien #</span>",
                        "width": "80px"
                    },
                    {
                        "field": "namapasien_klien",
                        "title": "Deskripsi",
                        "template": "<span class='style-left'>#: namapasien_klien #</span>",
                        "width": "70px"
                    },
                    {
                        "field": "keterangan",
                        "title": "Keterangan",
                        "template": "<span class='style-left'>#: keterangan #</span>",
                        "width": "80px"
                    },
                    {
                        "field": "caraBayar",
                        "title": "Cara Bayar",
                        "template": "<span class='style-center'>#: caraBayar #</span>",
                        "width": "70px",
                        // footerTemplate:"<span>Sub Total :</span>",
                    },
                    {
                        "field": "totalPenerimaan",
                        "title": "Total Penerimaan",
                        "template": "<span class='style-right'>{{formatRupiah('#: totalPenerimaan #', 'Rp.')}}</span>",
                        "width": "100px",

                        // footerTemplate:"<span>Rp. {{formatRupiah('#:totalPenerimaan.sum  #', '')}}</span>",
                        // aggregates:["sum"]

                    },
                    {
                        "field": "namaPenerima",
                        "title": "Kasir",
                        "template": "<span class='style-center'>#: namaPenerima #</span>",
                        "width": "80px"
                    },
                    {
                        "field": "status",
                        "title": "Status",
                        "template": "<span class='style-center'>#: status #</span>",
                        "width": "50px"
                    },
                    {
                    	"field": "noClosing",
                    	"title": "No Closing",
                    	"template": "<span class='style-center'>#: noClosing #</span>",
                    	"width":"50px"
                    }
                ],
                sortable: {
                    mode: "single",
                    allowUnsort: false,
                }
                ,
                pageable: {
                    messages: {
                        // display: "Menampilkan {2} data"
                        display: "Menampilkan {0} - {1} data dari {2} data"
                    }
                },
            };





            $scope.columnCaraBayar = [
                {
                    "field": "caraBayar",
                    "title": "Cara Bayar"
                },
                {
                    "field": "totalPenerimaan",
                    "title": "Total Penerimaan",
                    "template": "<span class='style-right'>{{formatRupiah('#: totalPenerimaan #', 'Rp.')}}</span>",

                },
                {
                    "field": "totalSetor",
                    "title": "Total Setor",
                    "template": "<span class='style-right'>{{formatRupiah('#: totalSetor #', 'Rp.')}}</span>",
                },
                {
                    "field": "sisa",
                    "title": "Sisa",
                    "template": "<span class='style-right'>{{formatRupiah('#: sisa #', 'Rp.')}}</span>",
                }

            ];
            $scope.formatRupiah = function (value, currency) {
                if (value == "null")
                    value = 0
                return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            }
            $scope.dataCaraBayar2 = function (dataItem) {
                return {
                    dataSource: new kendo.data.DataSource({
                        data: dataItem.detail
                    }),
                    //toolbar: "<button class='btnTemplate1'  style='width:10%;height:50%' ng-click='tambahCaraBayar()'>Tambah Data</button>",
                    //editable : true,
                    //scrollable:false,
                    columns: [
                        {
                            "field": "no",
                            "title": "No",
                            "width": "15px",
                            "hidden": true
                        },
                        {
                            "field": "caraBayar",
                            "title": "Cara Bayar",
                            "width": "100px"
                        },


                        // {
                        // 	"field": "bankAccount",
                        // 	"title": "Bank Account",
                        // 	"width":"200px"
                        // 	//,"template": "<input kendo-combo-box k-ng-model='dataModelGrid[#: id #].NamabankAccount' k-data-text-field=\"'namaExternal'\" k-data-value-field=\"'id'\" k-filter=\"'contains'\" k-auto-bind='false' k-data-source='listNamabankAccount' />"
                        // },
                        {
                            "field": "caraSetor",
                            "title": "Cara Setor",
                            "width": "100px"
                            //,"template": "<input kendo-combo-box k-ng-model='dataModelGrid[#: id #].NamabankAccount' k-data-text-field=\"'namaExternal'\" k-data-value-field=\"'id'\" k-filter=\"'contains'\" k-auto-bind='false' k-data-source='listNamabankAccount' />"
                        },
                        {
                            "field": "jumlah",
                            "title": "Total Setor",
                            "width": "100px",
                            "template": "<span class='style-right'>{{formatRupiah('#: jumlah #', 'Rp.')}}</span>",

                            //,"template": "<input c-text-box type='input' ng-model='dataModelGrid[#: id #].total' filter='numeric' class='k-textbox'  style='text-align: right;'/>"
                        },
                        {
                            "field": "pegawaipenerima",
                            "title": "Penerima",
                            "width": "100px"
                        }
                        // , {
                        // 	command: [{
                        // 		name: "edit",
                        // 		text: "Ubah"
                        // 	}, {
                        // 		name: "destroy",
                        // 		text: "Hapus",
                        // 	}],"width":"100px"
                        // }
                    ]
                }
            };

            // var noID = 1;
            // $scope.tambahCaraBayar = function(){
            // 	var grid = $('#kGridDetail').data("kendoGrid");

            // 	noID += 1;

            // 	$scope.dataModelGrid[noID] = {};

            // 	grid.dataSource.add({
            // 		id: noID
            // 	});	
            // };

            $scope.formatRupiah = function (value, currency) {
                return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
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


            $scope.Cetak = function () {
                $scope.pegawai = JSON.parse(window.localStorage.getItem('pegawai'));
                var Skasir = "";
                if ($scope.item.namaKasir != undefined) {
                    Skasir = $scope.item.namaKasir.id;

                    // if($scope.item != undefined){
                    var tglAwal = moment($scope.item.tanggalAwal).format('YYYY-MM-DD HH:mm');
                    var tglAkhir = moment($scope.item.tanggalAkhir).format('YYYY-MM-DD HH:mm');
                    // var fixUrlLaporan = cetakHelper.open("reporting/lapBuktiPelayanan?noRegistrasi=" + $scope.item.pasien.pasienDaftar.noRegistrasi);
                    // window.open(fixUrlLaporan, '', 'width=800,height=600')

                    //cetakan langsung service VB6 by grh
                    var client = new HttpClient();
                    client.get('http://127.0.0.1:1237/printvb/kasir?cetak-setoranKasir=1&tglAwal=' + tglAwal
                        + '&tglAkhir=' + tglAkhir + '&kasirId=' + Skasir + '&strIdPegawai=' + $scope.pegawai.namaLengkap + '&view=true', function (response) {
                            // do something with response
                            // });

                        })
                }
            }

            $scope.BatalSetor = function () {
                var tgl = moment($scope.item.tanggalAwal).format('YYYY-MM-DD')
                var tglAwal = moment($scope.item.tanggalAwal).format('YYYY-MM-DD HH:mm')
                var tglAkhir = moment($scope.item.tanggalAkhir).format('YYYY-MM-DD HH:mm')
                var objSave = {
                    "tglAwal": tglAwal,
                    "tglAkhir": tglAkhir,
                    "kdPegawai": $scope.item.namaKasir.id,
                    "kdPegawaiLu": $scope.item.namaKasir.luid,

                }

                manageKasir.batalSetoranKasir(objSave).then(function () {
                    var data = $scope.dataSetoranKasir.data
                    var listNoClos = ""
                    if (data.length != 0) {
                        var a = ""
                        var b = ""
                        for (var i = data.length - 1; i >= 0; i--) {
                            var c = data[i].noClosing
                            b = "," + c
                            a = a + b
                        }
                        listNoClos = a.slice(1, a.length)
                    }
                    var objBatal = {
                        'noclosing': listNoClos
                    }
                    manageKasir.postTransaksi('kasir/hapus-jurnal-setorankasir', objBatal).then(function () {
                    })
                    loadData();
                })
            }
            $scope.CetakLaporanPenerimaanHarian = function () {
                var dokter = ''
                if ($scope.item.namaPegawai != undefined) {
                    dokter = $scope.item.namaPegawai.id
                }
                var ruanganId = ''
                if ($scope.item.ruangan != undefined) {
                    ruanganId = $scope.item.ruangan.id
                }
                var idPegawai = ''
                if ($scope.item.namaKasir != undefined) {
                    idPegawai = $scope.item.namaKasir.id
                }
                var tglAwal = moment($scope.item.tanggalAwal).format('YYYY-MM-DD HH:mm:ss');
                var tglAkhir = moment($scope.item.tanggalAkhir).format('YYYY-MM-DD HH:mm:ss');
                var client = new HttpClient();
                client.get('http://127.0.0.1:1237/printvb/kasir?cetak-laporan-penerimaan-kasir=' + $scope.dataLogin.namalengkap + '&tglAwal=' + tglAwal + '&tglAkhir=' + tglAkhir + '&idPegawai=' + idPegawai + '&idRuangan=' + ruanganId + '&idDokter=' + dokter + '&view=true', function (response) {
                });

            }
            $scope.CetaklapPenerimaanPertransaksi = function () {
                var dokter = ''
                if ($scope.item.namaPegawai != undefined) {
                    dokter = $scope.item.namaPegawai.id
                }
                var ruanganId = ''
                if ($scope.item.ruangan != undefined) {
                    ruanganId = $scope.item.ruangan.id
                }

                var kasirId = ''
                if ($scope.item.namaKasir != undefined) {
                    kasirId = $scope.item.namaKasir.id
                }
                var tglAwal = moment($scope.item.tanggalAwal).format('YYYY-MM-DD HH:mm:ss');
                var tglAkhir = moment($scope.item.tanggalAkhir).format('YYYY-MM-DD HH:mm:ss');;
                var client = new HttpClient();
                client.get('http://127.0.0.1:1237/printvb/kasir?cetak-laporan-penerimaan-pertransaksi=' + kasirId +
                    '&tglAwal=' + tglAwal + '&tglAkhir=' + tglAkhir + '&idRuangan=' + ruanganId + '&idDokter=' + dokter + '&strIdPegawai=' + $scope.dataLogin.namaLengkap + '&view=true', function (response) {

                    });
            }





            ///////////////////////////// -TAMAT- ///////////////////////////

        }
    ]);
});