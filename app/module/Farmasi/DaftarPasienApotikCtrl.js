define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('DaftarPasienApotikCtrl', ['$q', '$rootScope', '$scope', '$window', 'ManageLogistikPhp', '$state', 'CacheHelper', 'DateHelper',
        function ($q, $rootScope, $scope, window, manageLogistikPhp, $state, cacheHelper, dateHelper) {
            $scope.item = {};
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.isRouteLoading = false;
            // $scope.item.tglAwal = $scope.now;
            // $scope.item.tglAkhir = $scope.now;
            LoadCache();
            loadCombo();
            function LoadCache() {
                var chacePeriode = cacheHelper.get('DaftarPasienApotikCtrl');
                if (chacePeriode != undefined) {
                    //var arrPeriode = chacePeriode.split(':');
                    $scope.item.tglAwal = new Date(chacePeriode[0]);
                    $scope.item.tglAkhir = new Date(chacePeriode[1]);

                    init();
                }
                else {
                    $scope.item.tglAwal = $scope.now;
                    $scope.item.tglAkhir = $scope.now;
                    init();
                }
            }
            function loadCombo() {
                manageLogistikPhp.getDataTableTransaksi("logistik/get-datacombo_dp", true).then(function (dat) {
                    $scope.listDepartemen = dat.data.departemen;
                    $scope.listKelompokPasien = dat.data.kelompokpasien;
                });
            }
            function init() {
                $scope.isRouteLoading = true;
                var ins = ""
                if ($scope.item.instalasi != undefined) {
                    var ins = "&dpid=" + $scope.item.instalasi.id
                }
                var rg = ""
                if ($scope.item.ruangan != undefined) {
                    var rg = "&ruid=" + $scope.item.ruangan.id
                }
                var kp = ""
                if ($scope.item.kelompokPasien != undefined) {
                    var kp = "&kpid=" + $scope.item.kelompokPasien.id
                }
                var tglAwal = moment($scope.item.tglAwal).format('YYYY-MM-DD');
                var tglAkhir = moment($scope.item.tglAkhir).format('YYYY-MM-DD');
                manageLogistikPhp.getDataTableTransaksi("logistik/get-daftar-pasien-farmasi?" +
                    "tglAwal=" + tglAwal +
                    "&tglAkhir=" + tglAkhir +
                    "&noregistrasi=" + $scope.item.noReg +
                    "&nocm=" + $scope.item.noMr +
                    "&namapasien=" + $scope.item.namaPasien + ins + rg + kp
                    , true).then(function (dat) {
                        $scope.isRouteLoading = false;
                        for (var i = 0; i < dat.data.length; i++) {
                            dat.data[i].no = i + 1
                            var tanggal = $scope.now;
                            var tanggalLahir = new Date(dat.data[i].tgllahir);
                            var umur = dateHelper.CountAge(tanggalLahir, tanggal);
                            dat.data[i].umur = umur.year + ' thn ' + umur.month + ' bln ' + umur.day + ' hari'
                            //itungUsia(dat.data[i].tgllahir)
                        }
                        $scope.dataGrid = dat.data;
                    });

                var chacePeriode = {
                    0: tglAwal,
                    1: tglAkhir,
                    2: '',
                    3: '',
                    4: '',
                    5: '',
                    6: ''
                }
                cacheHelper.set('DaftarPasienApotikCtrl', chacePeriode);


            }
            $scope.getRuangan = function () {
                $scope.listRuangan = $scope.item.instalasi.ruangan;
            }
            $scope.cariFilter = function () {

                init();
            }

            $scope.TransaksiPelayanan = function () {
                if ($scope.dataSelected.nostruklastfk != null && $scope.dataSelected.rpp != null) {
                    window.messageContainer.error("Pelayanan yang sudah di Verif tidak bisa di ubah!")
                    return
                }
                // debugger;
                var arrStr = {
                    0: $scope.dataSelected.nocm,
                    1: $scope.dataSelected.namapasien,
                    2: $scope.dataSelected.jeniskelamin,
                    3: $scope.dataSelected.noregistrasi,
                    4: $scope.dataSelected.umur,
                    5: $scope.dataSelected.klid,
                    6: $scope.dataSelected.namakelas,
                    7: $scope.dataSelected.tglregistrasi,
                    8: $scope.dataSelected.norec,
                    9: ''
                }
                cacheHelper.set('TransaksiPelayananApotikCtrl', arrStr);
                $state.go('TransaksiPelayananApotik')
            }

            // $scope.tambah = function(){
            //  $state.go('Produk')
            // }
            $scope.formatTanggal = function (tanggal) {
                return moment(tanggal).format('DD-MMM-YYYY');
            }


            $scope.columnGrid = [
                {
                    "field": "no",
                    "title": "No",
                    "width": "30px",
                },
                {
                    "field": "namaruangan",
                    "title": "Nama Ruangan",
                    "width": "130px",
                },
                {
                    "field": "noregistrasi",
                    "title": "No Registrasi",
                    "width": "80px",
                },
                {
                    "field": "nocm",
                    "title": "No MR",
                    "width": "70px",
                },
                {
                    "field": "namapasien",
                    "title": "Nama Pasien",
                    "width": "150px",
                },
                {
                    "field": "jeniskelamin",
                    "title": "Jenis Kelamin",
                    "width": "70px",
                },
                {
                    "field": "umur",
                    "title": "Umur",
                    "width": "100px"
                },
                {
                    "field": "kelompokpasien",
                    "title": "Kelompok Pasien",
                    "width": "100px",
                },
                // {
                //     "field": "namarekanan",
                //     "title": "namarekanan",
                //     "width" : "100px"//,
                //     //"template": "<span class='style-right'>{{formatRupiah('#: total #', '')}}</span>"
                // },
                {
                    "field": "namakelas",
                    "title": "Nama Kelas",
                    "width": "80px",
                },
                {
                    "field": "tglregistrasi",
                    "title": "Tgl Registrasi",
                    "width": "100px",
                },
                {
                    "field": "tglpulang",
                    "title": "Tgl Pulang",
                    "width": "100px",
                }, {
                    command: [{
                        text: "Cetak SEP",
                        click: cetakSEP,
                        imageClass: "k-icon k-i-excel"
                    }],
                    width: "120px",
                }
            ];
            // $scope.mainGridOptions = { 
            //     pageable: true,
            //     columns: $scope.columnProduk,
            //     editable: "popup",
            //     selectable: "row",
            //     scrollable: false
            // };
            $scope.formatRupiah = function (value, currency) {
                return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            }

            function cetakSEP(e) {
				e.preventDefault();
				var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
				console.log(dataItem);

				if(dataItem.kelompokpasien !== "BPJS") {
					toastr.error("Bukan kelompok pasien BPJS", "Gagal Cetak");
					return;
				}

				window.open("http://172.16.44.33:7777/service-reporting/cetak-sep/" + dataItem.norec , "_blank", "fullscreen=yes");
			}

            $scope.formatTanggal = function (tanggal) {
                return moment(tanggal).format('DD/MM/YYYY');
            }
            function itungUsia(tgl) {
                debugger;
                // var tg = parseInt(form.elements[0].value);
                // var bl = parseInt(form.elements[1].value);
                // var th = parseInt(form.elements[2].value);
                var tanggal = $scope.now;
                var tglLahir = new Date(tgl);
                var selisih = Date.parse(tanggal.toGMTString()) - Date.parse(tglLahir.toGMTString());
                var thn = Math.round(selisih / (1000 * 60 * 60 * 24 * 365));
                //var bln = Math.round((selisih % 365)/(1000*60*60*24));
                return thn + ' thn '// + bln + ' bln'
            }
            //***********************************

        }
    ]);
});
