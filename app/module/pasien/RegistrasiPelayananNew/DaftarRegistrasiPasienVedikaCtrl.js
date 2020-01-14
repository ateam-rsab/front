define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('DaftarRegistrasiPasienVedikaCtrl', ['$state', '$window', '$q', '$scope', 'CacheHelper', 'ManagePhp', 'DateHelper', 'ModelItemAkuntansi',
        function ($state, $window, $q, $scope, cacheHelper, managePhp, dateHelper, modelItemAkuntansi) {

            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.item = {};
            $scope.popupRad = {};
            $scope.item.periodeAwal = new Date();
            $scope.item.periodeAkhir = new Date();
            $scope.item.tanggalPulang = new Date();
            $scope.cboDokter = false;
            $scope.pasienPulang = false;
            $scope.cboUbahDokter = true;
            $scope.isRouteLoading = false;
            $scope.cboUbahSEP = true;
            $scope.cboSep = false;
            $scope.item.jmlRows = 50
            $scope.dataLogin = JSON.parse(localStorage.getItem('pegawai'))
            loadCombo();
            loadData();

            function loadCombo() {
                var chacePeriode = cacheHelper.get('DaftarRegistrasiPasienOperatorCtrl');
                if (chacePeriode != undefined) {
                    //debugger;
                    var arrPeriode = chacePeriode.split('~');
                    $scope.item.periodeAwal = new Date(arrPeriode[0]);
                    $scope.item.periodeAkhir = new Date(arrPeriode[1]);
                    if (arrPeriode[2] != "undefined")
                         $scope.item.noReg = arrPeriode[2];
                    // $scope.item.noReg = arrPeriode[2];		
                    // $scope.item.noRm = arrPeriode[3];	
                    // $scope.item.nama = arrPeriode[4];			
                } else {
                    $scope.item.periodeAwal = $scope.now;
                    $scope.item.periodeAkhir = $scope.now;
                    // $scope.item.tglpulang = $scope.now;					
                }
                managePhp.getData("operator/get-data-combo-operator", false).then(function (data) {
                    $scope.listDepartemen = data.data.departemen;
                    $scope.listKelompokPasien = data.data.kelompokpasien;
                    $scope.listDokter = data.data.dokter;
                    $scope.listDokter2 = data.data.dokter;
                    $scope.listRuanganBatal = data.data.ruanganall;
                    // $scope.listRuanganApd = data.data.ruanganall;
                    $scope.listPembatalan = data.data.pembatalan;
                    $scope.sourceJenisDiagnosisPrimer = data.data.jenisdiagnosa;
                    $scope.item.jenisDiagnosis = { id: data.data.jenisdiagnosa[1].id, jenisdiagnosa: data.data.jenisdiagnosa[1].jenisdiagnosa };

                });
                modelItemAkuntansi.getDataDummyPHP("operator/get-data-diagnosa", true, true, 10).then(function (data) {
                    $scope.sourceDiagnosisPrimer = data;
                });
            }
            $scope.getIsiComboRuangan = function () {
                $scope.listRuangan = $scope.item.instalasi.ruangan
            }

            $scope.formatTanggal = function (tanggal) {
                return moment(tanggal).format('DD-MMM-YYYY HH:mm');
            }

            $scope.formatRupiah = function (value, currency) {
                return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            }


            $scope.columnDaftarPasienPulang = {
                toolbar: [
                    "excel",

                ],
                excel: {
                    fileName: "DaftarRegistrasiPasien.xlsx",
                    allPages: true,
                },
                excelExport: function (e) {
                    var sheet = e.workbook.sheets[0];
                    sheet.frozenRows = 2;
                    sheet.mergedCells = ["A1:K1"];
                    sheet.name = "Orders";

                    var myHeaders = [{
                        value: "Daftar Registrasi Pasien",
                        fontSize: 20,
                        textAlign: "center",
                        background: "#ffffff",
                        // color:"#ffffff"
                    }];

                    sheet.rows.splice(0, 0, { cells: myHeaders, type: "header", height: 70 });
                },
                selectable: 'row',
                pageable: true,
                columns: [
                    {
                        "field": "no",
                        "title": "No",
                        "width": "30px",
                    },
                    {
                        "field": "tglregistrasi",
                        "title": "Tgl Registrasi",
                        "width": "80px",
                        "template": "<span class='style-left'>{{formatTanggal('#: tglregistrasi #')}}</span>"
                    },
                    {
                        "field": "noregistrasi",
                        "title": "NoReg",
                        "width": "90px"
                    },
                    {
                        "field": "nocm",
                        "title": "NoRM",
                        "width": "70px",
                        "template": "<span class='style-center'>#: nocm #</span>"
                    },
                    {
                        "field": "namapasien",
                        "title": "Nama Pasien",
                        "width": "150px",
                        "template": "<span class='style-left'>#: namapasien #</span>"
                    },
                    {
                        "field": "namaruangan",
                        "title": "Nama Ruangan",
                        "width": "150px",
                        "template": "<span class='style-left'>#: namaruangan #</span>"
                    },
                    {
                        "field": "namadokter",
                        "title": "Nama Dokter",
                        "width": "150px",
                        "template": '# if( namadokter==null) {# - # } else {# #= namadokter # #} #'
                    },
                    {
                        "field": "kelompokpasien",
                        "title": "Kelompok Pasien",
                        "width": "80px",
                        "template": "<span class='style-left'>#: kelompokpasien #</span>"
                    },
                    {
                        "field": "namarekanan",
                        "title": "Penjamin",
                        "width": "120px",
                        "template": "<span class='style-left'>#: namarekanan #</span>"
                    },
                    {
                        "field": "tglpulang",
                        "title": "Tgl Pulang",
                        "width": "80px",
                        "template": "<span class='style-left'>{{formatTanggal('#: tglpulang #')}}</span>"
                    },
                    {
                        "field": "nostruk",
                        "title": "No Verif",
                        "width": "80px",
                        "template": "<span class='style-left'>#: nostruk #</span>"
                    },
                    {
                        "field": "nosep",
                        "title": "No SEP",
                        "width": "150px",
                        "template": '# if( nosep==null) {# - # } else {# #= nosep # #} #'
                    }
                ]
            };


            $scope.SearchData = function () {
                loadData()
            }
            function loadData() {
                $scope.isRouteLoading = true;
                var tglAwal = moment($scope.item.periodeAwal).format('YYYY-MM-DD HH:mm:ss');
                var tglAkhir = moment($scope.item.periodeAkhir).format('YYYY-MM-DD HH:mm:ss');

                var reg = ""
                if ($scope.item.noReg != undefined) {
                    var reg = "&noreg=" + $scope.item.noReg
                }
                var rm = ""
                if ($scope.item.noRm != undefined) {
                    var rm = "&norm=" + $scope.item.noRm
                }
                var nm = ""
                if ($scope.item.nama != undefined) {
                    var nm = "&nama=" + $scope.item.nama
                }
                var ins = ""
                if ($scope.item.instalasi != undefined) {
                    var ins = "&deptId=" + $scope.item.instalasi.id
                }
                var rg = ""
                if ($scope.item.ruangan != undefined) {
                    var rg = "&ruangId=" + $scope.item.ruangan.id
                }
                var kp = ""
                if ($scope.item.kelompokpasien != undefined) {
                    var kp = "&kelId=" + $scope.item.kelompokpasien.id
                }
                var dk = ""
                if ($scope.item.dokter != undefined) {
                    var dk = "&dokId=" + $scope.item.dokter.id
                }
                var cacheNoreg = ""
                if ($scope.item.noReg != undefined) {
                    cacheNoreg = $scope.item.noReg
                }
                var cacheNoRm = ""
                if ($scope.item.noRm != undefined) {
                    cacheNoRm = $scope.item.noRm
                }
                var cacheNama = ""
                if ($scope.item.nama != undefined) {
                    cacheNama = $scope.item.nama
                }
                var jmlRows = "";
                if ($scope.item.jmlRows != undefined) {
                    jmlRows = $scope.item.jmlRows
                }


                $q.all([
                    managePhp.getData("vedika/get-daftar-pasien?" +
                        "tglAwal=" + tglAwal +
                        "&tglAkhir=" + tglAkhir +
                        reg + rm + nm + ins + rg + kp + dk
                        + '&jmlRows=' + jmlRows),
                ]).then(function (data) {
                    $scope.isRouteLoading = false;
                    for (var i = 0; i < data[0].data.length; i++) {
                        data[0].data[i].no = i + 1

                        data[0].data[i].umur = dateHelper.CountAge(new Date(data[0].data[i].tgllahir), new Date(data[0].data[i].tglregistrasi));
                        var bln = data[0].data[i].umur.month,
                            thn = data[0].data[i].umur.year,
                            day = data[0].data[i].umur.day

                        data[0].data[i].umur = day + 'hr ' + bln + 'bln ' + thn + 'thn'
                    }
                    $scope.dataDaftarPasienPulang = new kendo.data.DataSource({
                        data: data[0].data,
                        pageSize: 10,
                        total: data[0].data,
                        serverPaging: false,
                        schema: {
                            model: {
                                fields: {
                                }
                            }
                        }
                    });


                    var chacePeriode = tglAwal + "~" + tglAkhir + "~" + $scope.item.noReg;

                    cacheHelper.set('DaftarRegistrasiPasienOperatorCtrl', chacePeriode);
                });

            };

            $scope.klikGrid = function (dataPasienSelected) {
                if (dataPasienSelected != undefined) {
                    $scope.item.namaDokter = { id: dataPasienSelected.pgid, namalengkap: dataPasienSelected.namadokter }
                    // $scope.item.ruanganAntrian = {id:dataPasienSelected.objectruanganlastfk,namaruangan:dataPasienSelected.namaruangan}
                }
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
            $scope.hasil = function (criteria) {
                if ($scope.dataPasienSelected == undefined) {
                    toastr.error('Pilih data dulu')
                    return
                }
                $scope.isRouteLoading = true
                $scope.sourceHasilRad = new kendo.data.DataSource({
                    data: [],
                    pageSize: 10
                });
                if (criteria == 1) {
                    $scope.showRadiologi = false
                    $scope.ruanganMana = 'lab'
                } else {
                    $scope.ruanganMana = 'rad'
                    $scope.showRadiologi = true
                }

             
                $scope.popupRad = $scope.dataPasienSelected
                //  managePhp.getData('laporan/get-order-' + $scope.ruanganMana + '?noregistrasi='
                managePhp.getData('lab-radiologi/get-daftar-order-hasil-' + $scope.ruanganMana + '?noregistrasi='
                    + $scope.dataPasienSelected.noregistrasi).then(function (e) {
                        for (var i = e.data.daftar.length - 1; i >= 0; i--) {
                            e.data.daftar[i].no = i + 1
                        }
                        $scope.isRouteLoading = false
                        $scope.sourceHasilRad = new kendo.data.DataSource({
                            data: e.data.daftar,
                            pageSize: 10
                        });
                    });
                $scope.popUpHasilRad.center().open()
            }
            $scope.columnHasilRad = [
                {
                    "field": "no",
                    "title": "No",
                    "width": "20px",
                },
                {
                    "field": "tglorder",
                    "title": "Tgl Order",
                    "width": "50px",
                },
                {
                    "field": "noorder",
                    "title": "No Order",
                    "width": "60px",
                },
                {
                    "field": "dokter",
                    "title": "Dokter",
                    "width": "100px"
                },
                {
                    "field": "namaruangantujuan",
                    "title": "Ruangan",
                    "width": "100px",
                },
                {
                    "field": "statusorder",
                    "title": "Keterangan",
                    "width": "80px",
                },
                {
                    command: [
                        { text: "PDF", click: exportToPdf },
                    ], title: "&nbsp;", width: 50,
                    attributes: {
                        style: "text-align:center;valign=middle"
                    }

                }
            ];

            function exportToPdf(e) {
                e.preventDefault();
                let dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                console.log(dataItem);
                window.open('http://192.168.12.4:7777/service-reporting/lap-lab/' + dataItem.noregistrasi);
            }
            $scope.detailHasilRad = function (dataItem) {
                return {
                    dataSource: new kendo.data.DataSource({
                        data: dataItem.details
                    }),
                    columns: [
                        {
                            field: "namaproduk",
                            title: "Deskripsi",
                            width: "300px"
                        },
                        {
                            field: "qtyproduk",
                            title: "Qty",
                            width: "100px"
                        }]
                };
            };

            $scope.klikHasilRad = function (data, ruang) {
                if (data != undefined) {
                    if (ruang == 'rad') {
                        $scope.noOrder = data.noorder;

                        managePhp.getData("dokter/get-acc-number-radiologi?noOrder=" + $scope.noOrder)
                            .then(function (e) {
                                $scope.dataRisOrder = e.data.data[0]
                            })
                    }
                    if (ruang == 'lab') {

                        managePhp.getData("registrasipasien/get-apd-detail/"
                            + $scope.dataPasienSelected.noregistrasi
                            + "/" + $scope.dataPasienSelected.objectruanganlastfk)
                            .then(function (e) {
                                $scope.resDataAPD = e.data.data
                            })
                    }

                }
            }

            $scope.lihatHasilRad = function () {
                if ($scope.dataHasilRad == undefined) {
                    toastr.error('Pilih data dulu', 'Info')
                }

                if ($scope.dataRisOrder != undefined) {
                    // 192.168.12.11:8080
                    $window.open("http://182.23.26.34:1111/URLCall.do?LID=dok&LPW=dok&LICD=003&PID="
                        + $scope.popupRad.nocm
                        + '&ACN=' + $scope.dataRisOrder.accession_num, "_blank");
                } else {
                    toastr.info('Hasil tidak ada', 'Info')

                }

            }
            $scope.tutup = function () {
                $scope.popUpHasilRad.close()
            }

            $scope.lihatHasilLab = function () {
                if ($scope.dataHasilRad == undefined) {
                    toastr.error('Pilih data dulu');
                    return
                }
                var arrStr = {
                    0: $scope.dataPasienSelected.nocm,
                    1: $scope.dataPasienSelected.namapasien,
                    2: $scope.resDataAPD.jeniskelamin,
                    3: $scope.dataPasienSelected.noregistrasi,
                    4: $scope.dataPasienSelected.umur,
                    5: $scope.dataPasienSelected.kelompokpasien,
                    6: $scope.dataPasienSelected.tglregistrasi,
                    7: $scope.resDataAPD.norec_apd,
                    8: $scope.dataPasienSelected.norec_pd,
                    9: $scope.resDataAPD.idkelas,
                    10: $scope.resDataAPD.namakelas,
                    11: $scope.resDataAPD.objectruanganfk,
                    12: $scope.resDataAPD.namaruangan + '`'
                }

                cacheHelper.set('TransaksiPelayananLaboratoriumDokterRevCtrl', arrStr);
                $state.go('HasilLaboratorium', {
                    norecPd: $scope.dataHasilRad.norecpd,
                    noOrder: $scope.dataHasilRad.noorder,
                    norecApd: $scope.resDataAPD.norec_apd,
                })

            }
            $scope.Detail = function () {
                if ($scope.dataPasienSelected.noregistrasi != undefined) {

                    var obj = {
                        noRegistrasi: $scope.dataPasienSelected.noregistrasi
                    }

                    $state.go('RincianTagihanVedika', {
                        dataPasien: JSON.stringify(obj)
                    });
                }
            }

            $scope.Billing = function () {

                $scope.isRouteLoading = true;
                modelItemAkuntansi.getDataTableTransaksi("tatarekening/detail-tagihan/" + $scope.dataPasienSelected.noregistrasi + '?jenisdata=bill').then(function (dat) {
                    $scope.isRouteLoading = false;
                    var NoStruk = $scope.dataRincianTagihan;
                    var struk = "";
                    var kwitansi = "";
                    var stt = 'false'
                    if (confirm('View Rincian Biaya? ')) {
                        // Save it!
                        stt = 'true';
                    } else {
                        // Do nothing!
                        stt = 'false'
                    }
                    if ($scope.item.jenisPasien != "BPJS") {
                        var client = new HttpClient();
                        client.get('http://127.0.0.1:1237/printvb/kasir?cetak-RincianBiaya=1&strNoregistrasi=' + $scope.dataPasienSelected.noregistrasi
                            + '&strNoStruk=' + struk
                            + '&strNoKwitansi=' + kwitansi
                            + '&strIdPegawai=' + $scope.dataLogin.namaLengkap
                            + '&view=' + stt, function (response) {
                                // do something with response
                            });
                    } else {
                        var client = new HttpClient();
                        client.get('http://127.0.0.1:1237/printvb/kasir?cetak-RekapBiaya=1&strNoregistrasi=' + $scope.dataPasienSelected.noregistrasi
                            + '&strNoStruk=' + struk
                            + '&strNoKwitansi=' + kwitansi
                            + '&strIdPegawai=' + $scope.dataLogin.namaLengkap
                            + '&view=' + stt, function (response) {
                                // do something with response
                            });
                    }
                });






            }

            $scope.rekamMedisElektronik = function () {
                if ($scope.dataPasienSelected.nocm ==null && $scope.dataPasienSelected.norec_apd == null)
                   {
                        window.messageContainer.error("Pilih Dahulu Pasien!")
                        return
                    }
                // debugger;
                var arrStr ={ 0 : $scope.dataPasienSelected.nocm ,
                    1 : $scope.dataPasienSelected.namapasien,
                    2 : $scope.dataPasienSelected.jeniskelamin,
                    3 : $scope.dataPasienSelected.noregistrasi, 
                    4 : $scope.dataPasienSelected.umurzz,
                    5 : $scope.dataPasienSelected.kelompokpasien,
                    6 : $scope.dataPasienSelected.tglregistrasi,
                    7 : $scope.dataPasienSelected.norec_apd,
                    8 : $scope.dataPasienSelected.norec_pd,
                    9 : $scope.dataPasienSelected.idkelas,
                    10 : $scope.dataPasienSelected.namakelas,
                    11 : $scope.dataPasienSelected.objectruanganfk,
                    12 : $scope.dataPasienSelected.namaruangan + '`'
                }
               cacheHelper.set('cacheRMelektronik', arrStr);
               $state.go('RekamMedis',{
                norecAPD: $scope.dataPasienSelected.norec,
                noRec: $scope.dataPasienSelected.norec
               })
            }
            /*** END PAGE */
        }
    ]);
});