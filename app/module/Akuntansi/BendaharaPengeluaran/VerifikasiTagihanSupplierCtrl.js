define(['initialize'], function (initialize) {
  'use strict';
  initialize.controller('VerifikasiTagihanSupplierCtrl', ['CacheHelper', '$timeout', '$q', '$rootScope', '$scope', 'ManageAkuntansi', '$state', 'DateHelper', 'ManageSarpras', 'ModelItemAkuntansi', '$mdDialog',
    function (cacheHelper, $timeout, $q, $rootScope, $scope, ManageAkuntansi, $state, dateHelper, ManageSarpras, modelItemAkuntansi, $mdDialog) {

      //catatan : PENTING
      //cek tabel maploginusertoruangan_s
      $scope.dataPegawaiLogin = JSON.parse(localStorage.getItem('pegawai'));

      $scope.listAnggaran = [];
      $scope.listSumberDana = [];

      $scope.isPagu = false;
      $scope.isKasubag = false;

      $scope.dataVOloaded = true;
      $scope.now = new Date();
      $scope.item = {};
      $scope.verif = {};
      $scope.confirm = {};
      $scope.dataSelected = {};
      $scope.item.tanggalVerifikasi = new Date();
      //$scope.dataSelectedPiutang = {};
      $scope.item.tanggalAwal = $scope.now;
      $scope.item.tanggalAkhir = $scope.now;

      $scope.showInputNoSpk = false;
      $scope.showInputNoFaktur = false;
      $scope.showInputBa = false;
      $scope.showInputSppb = false;

      // $scope.listStatus = [{
      //   "id": 0,
      //   "namaStatus": "Verifikasi"
      // }, {
      //   "id": 1,
      //   "namaStatus": "Belum Verifikasi"
      // }]

      // $scope.item.status = {
      //   id: 1,
      //   namaStatus: "Belum Verifikasi"
      // }

      //ON LOAD with Params
      $scope.item.tanggalAwal = $scope.now;
      $scope.item.tanggalAkhir = $scope.now;

      let init = function () {
        // serive get sumber dana
        ManageAkuntansi.getDataTableTransaksi('bendahara-pengeluaran/get-sumber-dana').then(res => {
          $scope.listSumberDana = res.data;
        })

      }

      init();

      $scope.getListAnggaran = function () {
        $scope.verif.anggaran = null;
        $scope.isPagu = false;
        ManageAkuntansi.getDataTableTransaksi('bendahara-pengeluaran/get-penggunaan-anggaran?tahun=' + new Date().getFullYear() + "&kodeDana=" + $scope.verif.sumberDana.kodeanggaran).then(res => {
          for (let i = 0; i < res.data.data.length; i++) {
            res.data.data[i].anggaranFormatted = new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR'
            }).format(res.data.data[i].anggaran);
          }
          $scope.listAnggaran = res.data.data;
        });
      }

      $scope.loadData = function () {
        let dataTempVerified = [],
          dataTempUnverified = [];
        $scope.isRouteLoading = true;
        // YYYY-MM-DD
        // filtering status
        // + ($scope.item.status.namaStatus ? $scope.item.status.namaStatus : "")
        ManageAkuntansi.getDataTableTransaksi("bendahara-pengeluaran/get-data-verifikasi-tagihan-suplier-rev-1?tglAwal=" + dateHelper.formatDate($scope.item.tanggalAwal, 'YYYY-MM-DD') + "&tglAkhir=" + dateHelper.formatDate($scope.item.tanggalAkhir, 'YYYY-MM-DD') + "&Supplier=" + ($scope.item.namaSupplier ? $scope.item.namaSupplier : "") + "&status=").then((res) => {
          for (let i = 0; i < res.data.daftar.length; i++) {
            res.data.daftar[i].totalFormatted = new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR'
            }).format(res.data.daftar[i].total);
            res.data.daftar[i].totalppnFormatted = new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR'
            }).format(res.data.daftar[i].totalppn);
            res.data.daftar[i].totaldiskonFormatted = new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR'
            }).format(res.data.daftar[i].totaldiskon);
            res.data.daftar[i].subtotalFormatted = new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR'
            }).format(res.data.daftar[i].subtotal);
            res.data.daftar[i].sisautangFormatted = new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR'
            }).format(res.data.daftar[i].sisautang);
          }

          for (let i = 0; i < res.data.daftar.length; i++) {

            if (res.data.daftar[i].status === "BLM VERIFIKASI") dataTempUnverified.push(res.data.daftar[i])
            else dataTempVerified.push(res.data.daftar[i])
          }
          $scope.dataGridVerified = new kendo.data.DataSource({
            data: dataTempVerified,
            pageSize: 5
          });

          $scope.dataGridUnverified = new kendo.data.DataSource({
            data: dataTempUnverified,
            pageSize: 5
          })
          $scope.isRouteLoading = false;
        }, err => {
          $scope.isRouteLoading = false;
        });
      };

      $scope.loadData();

      $scope.formatRupiah = function (value, currency) {
        return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1.");
      }
      $scope.formatTgl = function (value) {
        return dateHelper.formatDate(value, "YYYY-MM-DD");
      }

      $scope.columnGridAnggaran = [{
          "field": "kode_anggaran",
          "title": "<h3>Kode Anggaran</h3>",
          "width": "150px"
        },
        {
          "field": "kode_dana",
          "title": "<h3>Kode Dana</h3>",
          "width": "150px"
        },
        {
          "field": "nama_anggaran",
          "title": "<h3>Nama Anggaran</h3>",
          "width": "170px"
        },
        {
          "field": "anggaranFormatted",
          "title": "<h3>Anggaran</h3>",
          "width": "150px"
        },
        {
          "field": "penggunaanFormatted",
          "title": "<h3>Penggunaan</h3>",
          "width": "150px"
        }
      ];

      $scope.columnGridVerified = [{
          "field": "namarekanan",
          "title": "<h3>Nama Rekanan</h3>",
          "width": "200px"
        },
        {
          "field": "noverifikasi",
          "title": "<h3>No. Voucher</h3>",
          "template": "<span class='style-center'>{{'#: noverifikasi #'}}</span>",
          "width": "150px"
        },
        {
          "field": "namaAnggaran",
          "title": "<h3>Nama Anggaran</h3>",
          "width": "150px"
        },
        {
          "field": "kodeanggaran",
          "title": "<h3>Kode Anggaran</h3>",
          "width": "150px"
        },
        {
          "field": "tglSPK",
          "title": "<h3>Tanggal <br>SPK</h3>",
          "template": "<span class='style-center'>{{'#: tglSPK ? tglSPK : '-' #'}}</span>",
          "width": "170px"
        },
        {
          "field": "noSPK",
          "title": "<h3>No. SPK</h3>",
          "template": "<span class='style-center'>{{'#: noSPK ? noSPK : '-' #'}}</span>",
          "width": "150px"
        },
        {
          "field": "tgldokumen",
          "title": "<h3>Tanggal Dokumen</h3>",
          "template": "<span class='style-center'>{{'#: tgldokumen #'}}</span>",
          "width": "150px"
        },
        {
          "field": "nodokumen",
          "title": "<h3>No. Dokumen</h3>",
          "template": "<span class='style-center'>{{'#: nodokumen #'}}</span>",
          "width": "200px"
        },
        {
          "field": "totalFormatted",
          "title": "<h3>Total</h3>",
          "template": "<span class='style-center'>{{'#: totalFormatted #'}}</span>",
          "width": "150px"
        },
        {
          "field": "totalppnFormatted",
          "title": "<h3>PPN</h3>",
          "template": "<span class='style-center'>{{'#: totalppnFormatted #'}}</span>",
          "width": "150px"
        },
        {
          "field": "totaldiskonFormatted",
          "title": "<h3>Diskon</h3>",
          "template": "<span class='style-center'>{{'#: totaldiskonFormatted #'}}</span>",
          "width": "150px"
        },
        {
          "field": "subtotalFormatted",
          "title": "<h3>Sub Total</h3>",
          "template": "<span class='style-center'>{{'#: subtotalFormatted #'}}</span>",
          "width": "150px"
        },
        {
          "field": "sisautangFormatted",
          "title": "<h3>Sisa Hutang</h3>",
          "template": "<span class='style-center'>{{'#: sisautangFormatted #'}}</span>",
          "width": "150px"
        },
        // {
        //   "field": "statusbayar",
        //   "title": "<h3>Status Bayar</h3>",
        //   "template": "<span class='style-center'>{{'#: statusbayar #'}}</span>",
        //   "width": "150px"
        // },
        {
          "field": "status",
          "title": "<h3>Status</h3>",
          "template": "<span class='style-center'>{{'#: status #'}}</span>",
          "width": "150px"
        },

        {
          "field": "statusConfirmKabag",
          "title": "<h3>Ka. Subag</h3>",
          // "template": "<span class='style-center'>{{'#: status #'}}</span>",
          "width": "150px"
        },

        {
          "field": "statusConfirmAnggaran",
          "title": "<h3>Ka. Bag</h3>",
          // "template": "<span class='style-center'>{{'#: status #'}}</span>",
          "width": "150px"
        },
        {
          command: [{
              text: "Konfirmasi Kasubag",
              // name:"Konfirmasi",
              align: "center",
              attributes: {
                align: "center"
              },
              click: showWindowKonfirmasi,
              imageClass: "k-icon k-i-pencil"
            },
            {
              text: "Konfirmasi Kabag",
              // name:"Konfirmasi",
              align: "center",
              attributes: {
                align: "center"
              },
              click: showWindowKonfirmasi,
              imageClass: "k-icon k-i-pencil"
            },
            {
              text: "Detail Tagihan",
              align: "center",
              attributes: {
                align: "center"
              },
              click: detailTagihan,
              imageClass: "k-icon k-i-pencil"
            },
            {
              text: "Cetak",
              align: "center",
              attributes: {
                align: "center"
              },
              click: cetakTagihan,
              imageClass: "k-icon k-i-pencil"
            }
          ],
          title: "",
          width: "600px",
          attributes: {
            style: "text-align:center;valign=middle"
          },
        }
      ];

      $scope.columnGridUnverified = [{
          "field": "namarekanan",
          "title": "<h3>Nama Rekanan</h3>",
          "width": "200px"
        },
        {
          "field": "tglSPK",
          "title": "<h3>Tanggal <br>SPK</h3>",
          "template": "<span class='style-center'>{{'#: tglSPK ? tglSPK : '-' #'}}</span>",
          "width": "170px"
        },
        {
          "field": "noSPK",
          "title": "<h3>No. SPK</h3>",
          "template": "<span class='style-center'>{{'#: noSPK #'}}</span>",
          "width": "150px"
        },
        {
          "field": "tgldokumen",
          "title": "<h3>Tanggal Dokumen</h3>",
          "template": "<span class='style-center'>{{'#: tgldokumen #'}}</span>",
          "width": "150px"
        },
        {
          "field": "nodokumen",
          "title": "<h3>No. Dokumen</h3>",
          "template": "<span class='style-center'>{{'#: nodokumen #'}}</span>",
          "width": "200px"
        },
        {
          "field": "totalFormatted",
          "title": "<h3>Total</h3>",
          "template": "<span class='style-center'>{{'#: totalFormatted #'}}</span>",
          "width": "150px"
        },
        {
          "field": "totalppnFormatted",
          "title": "<h3>PPN</h3>",
          "template": "<span class='style-center'>{{'#: totalppnFormatted #'}}</span>",
          "width": "150px"
        },
        {
          "field": "totaldiskonFormatted",
          "title": "<h3>Diskon</h3>",
          "template": "<span class='style-center'>{{'#: totaldiskonFormatted #'}}</span>",
          "width": "150px"
        },
        {
          "field": "subtotalFormatted",
          "title": "<h3>Sub Total</h3>",
          "template": "<span class='style-center'>{{'#: subtotalFormatted #'}}</span>",
          "width": "150px"
        },
        {
          "field": "sisautangFormatted",
          "title": "<h3>Sisa Hutang</h3>",
          "template": "<span class='style-center'>{{'#: sisautangFormatted #'}}</span>",
          "width": "150px"
        },
        // {
        //   "field": "statusbayar",
        //   "title": "<h3>Status Bayar</h3>",
        //   "template": "<span class='style-center'>{{'#: statusbayar #'}}</span>",
        //   "width": "150px"
        // },
        {
          "field": "status",
          "title": "<h3>Status</h3>",
          "template": "<span class='style-center'>{{'#: status #'}}</span>",
          "width": "150px"
        },
        {
          command: [{
              text: "Verifikasi",
              align: "center",
              attributes: {
                align: "center"
              },
              click: showDataVerifikasi,
              imageClass: "k-icon k-i-pencil"
            },
            {
              text: "Detail Tagihan",
              align: "center",
              attributes: {
                align: "center"
              },
              click: detailTagihan,
              imageClass: "k-icon k-i-pencil"
            }
          ],
          title: "",
          width: "300px",
          attributes: {
            style: "text-align:center;valign=middle"
          },
        }
      ];

      $scope.getTerbilang = function (data, model) {
        modelItemAkuntansi.getDataGlobal('valet/terbilang/' + data).then(res => {
          $scope.verif[`${model}`] = res.terbilang;
        });
      }

      $scope.clearVerifikasi = function () {
        $scope.dataSelected = {};
        $scope.verif = {};
      }

      $scope.gridOptVerified = {
        toolbar: [{
            text: "export",
            name: "Export detail",
            template: '<button ng-click="exportExcel(true)" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-excel"></span>Export to Excel</button>'
          }

        ],
        filterable: {
          extra: false,
          operators: {
            string: {
              startswith: "Dimulai dengan",
              contains: "mengandung kata",
              neq: "Tidak mengandung kata"
            }
          }
        },
        pageable: true,
        scrollable: true,
        columns: $scope.columnGridVerified
      };

      $scope.gridOptPenggunaanAnggaran = {
        pageable: true,
        scrollable: true,
        columns: $scope.columnGridAnggaran
      }

      $scope.gridOptUnverified = {
        toolbar: [{
            text: "export",
            name: "Export detail",
            template: '<button ng-click="exportExcel(false)" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-excel"></span>Export to Excel</button>'
          }

        ],
        filterable: {
          extra: false,
          operators: {
            string: {
              startswith: "Dimulai dengan",
              contains: "mengandung kata",
              neq: "Tidak mengandung kata"
            }
          }
        },
        pageable: true,
        scrollable: true,
        columns: $scope.columnGridUnverified
      };

      $scope.exportExcel = (isVerified) => {
        var tempDataExport = [];
        var rows = [{
          cells: [{
              value: "Nama Rekanan"
            },
            {
              value: "No. Voucher"
            },
            {
              value: "Nama Anggaran"
            },
            {
              value: "Kode Anggaran"
            },
            {
              value: "No. SPK"
            },
            {
              value: "Tanggal Struk"
            },
            {
              value: "Tanggal Dokumen"
            },
            {
              value: "No. Dokumen"
            },
            {
              value: "Total"
            },
            {
              value: "PPN"
            },
            {
              value: "Diskon"
            },
            {
              value: "Sub Total"
            },
            {
              value: "Sisa Hutang"
            },
            {
              value: "Status Bayar"
            },
            {
              value: "Status"
            },
            {
              value: "Diskon"
            }
          ]
        }];

        tempDataExport = isVeriverif.totalBayarfied ? $scope.dataGridVerified : $scope.dataGridUnverified;
        tempDataExport.fetch(() => {
          var data = tempDataExport._data;
          for (var i = 0; i < data.length; i++) {
            //push single row for every record
            rows.push({
              cells: [{
                  value: data[i].namarekanan
                },
                {
                  value: data[i].noverifikasi
                },
                {
                  value: data[i].namaAnggaran
                },
                {
                  value: data[i].kodeanggaran
                },
                {
                  value: data[i].noSPK
                },
                {
                  value: data[i].tglstruk
                },
                {
                  value: data[i].tgldokumen
                },
                {
                  value: data[i].nostruk
                },
                // {
                //   value:
                // },
                {
                  value: data[i].total
                },
                {
                  value: data[i].totalppn
                },
                {
                  value: data[i].totaldiskon
                },
                {
                  value: data[i].subtotal
                },
                {
                  value: data[i].sisautang
                },
                // {
                //   value: data[i].statusbayar
                // },
                {
                  value: data[i].status
                },
                {
                  value: data[i].totaldiskon
                }
              ]
            })
          }
          var workbook = new kendo.ooxml.Workbook({
            sheets: [{
              freezePane: {
                rowSplit: 1
              },
              columns: [
                // Column settings (width)
                {
                  autoWidth: true
                },
                {
                  autoWidth: true
                },
                {
                  autoWidth: true
                },
                {
                  autoWidth: true
                },
                {
                  autoWidth: true
                },
                {
                  autoWidth: true
                },
                {
                  autoWidth: true
                },
                {
                  autoWidth: true
                },
                {
                  autoWidth: true
                },
                {
                  autoWidth: true
                },
                {
                  autoWidth: true
                },
                {
                  autoWidth: true
                },
                {
                  autoWidth: true
                },
                {
                  autoWidth: true
                },
                {
                  autoWidth: true
                },
                {
                  autoWidth: true
                }
              ],
              // Title of the sheet
              title: "Daftar Verifikasi Tagihan Rekanan",
              // Rows of the sheet
              rows: rows
            }]
          });
          //save the file as Excel file with extension xlsx
          kendo.saveAs({
            dataURI: workbook.toDataURL(),
            fileName: "daftar-verifikasi-tagihan-rekanan-" + (isVerified ? "verified" : "unverified") + ".xlsx"
          });
        });
      };

      function showDataVerifikasi(e) {
        e.preventDefault();
        let tr = $(e.target).closest("tr");
        let dataItem = this.dataItem(tr);
        $scope.dataSelected = dataItem;

        $scope.showInputNoSpk = false;
        $scope.showInputNoFaktur = false;
        $scope.showInputBa = false;
        $scope.showInputSppb = false;

        $scope.item.ba = '';
        $scope.item.sppb = '';
        $scope.item.noFaktur = '';

        // if (dataItem.statusbayar !== 'BELUM LUNAS') {
        //   toastr.info('Data Tagihan SUDAH LUNAS');
        //   return;
        // }

        // status
        if (dataItem.status !== 'BLM VERIFIKASI') {
          toastr.info('Data Tagihan Sudah Verifikasi');
          return;
        }
        // $scope.keperluan = 'Untuk Pembayaran ' + ($scope.verif.anggaran ? $scope.verif.anggaran.nama_anggaran : '') + ' a/n Supplier ' + $scope.dataSelected.namarekanan + ' No.SPK = ' + $scope.dataSelected.noSPK
        $scope.keperluan = 'Untuk Pembayaran Supplier ' + $scope.dataSelected.namarekanan + ' No.SPK = ' + $scope.dataSelected.noSPK
        $scope.loadData();
        $scope.verif.totalBayar = dataItem.sisautang;
        $scope.getTerbilang($scope.verif.totalBayar, 'totalBayarTerbilang');
        $scope.verifkasiRekanan.open().center();

      }

      $scope.closePopUpKonfirmasi = function () {
        $scope.konfirmasiAnggaran.close();
      }

      function detailTagihan(e) {
        e.preventDefault();
        let tr = $(e.target).closest("tr");
        let dataItem = this.dataItem(tr);
        $scope.dataSelected = dataItem;
        let tglTerima = moment($scope.dataSelected.tglstruk).format('YYYY-MM-DD');
        let tglfaktur = moment($scope.dataSelected.tgldokumen).format('YYYY-MM-DD');
        let tglJatuhTempo = moment($scope.dataSelected.tgljatuhtempo).format('YYYY-MM-DD');

        var tempData = tglTerima + "#" + $scope.dataSelected.namarekanan + "#" + $scope.dataSelected.nodokumen + "#" + tglJatuhTempo + "#" + tglfaktur + "#" + $scope.dataSelected.norec + "#DaftarTagihanSupplier#" + $scope.dataSelected.nostruk;
        cacheHelper.set('DetailTagihanRekanan', tempData);
        $state.go('DetailTagihanRekanan', {
          noTerima: '0308'
        })
      }

      function cetakTagihan(e) {
        e.preventDefault();
        let tr = $(e.target).closest("tr");
        let dataItem = this.dataItem(tr);

        console.log(dataItem.norec);
        window.open('http://192.168.12.4:7777/service-reporting/lap-verifikasi-tagihan-supplier/' + dataItem.noverifikasifk)
      }

      function showWindowKonfirmasi(e) {
        e.preventDefault();
        let tr = $(e.target).closest("tr");
        let dataItem = this.dataItem(tr);

        $scope.confirm = dataItem;
        console.log(e);

        $scope.isKasubag = e.data.commandName === "Konfirmasi Kasubag" ? true : false;
        if (!$scope.isKasubag && !$scope.confirm.confirmfk) {
          toastr.warning('Harap Konfirmasi Ka. Subag Terlebih dahulu')
          return;
        }
        //  + "&noverifikasifk=" + dataItem.noverifikasifk
        ManageAkuntansi.getDataTableTransaksi('bendahara-pengeluaran/get-penggunaan-anggaran?tahun=' + new Date().getFullYear() + "&kodeAnggaran=" + dataItem.kodeanggaran).then(res => {

          for (let i = 0; i < res.data.data.length; i++) {
            res.data.data[i].anggaranFormatted = new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR'
            }).format(res.data.data[i].anggaran);

            res.data.data[i].penggunaanFormatted = new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR'
            }).format(res.data.data[i].penggunaan);
          }
          $scope.dataGridPenggunaanAnggaran = new kendo.data.DataSource({
            data: res.data.data,
            pageSize: 5
          });
          // $scope.listAnggaran = res.data.data;
        });
        $scope.konfirmasiAnggaran.open().center();
      }

      $scope.konfirmasiData = (state) => {

        $scope.closePopUpKonfirmasi();

        var confirm = $mdDialog.confirm()
          .title(`Apakah Anda yakin akan mengkonfirmasi Verifikasi Tagihan`)
          .textContent(`Anda akan konfirmasi Verifikasi Tagihan dengan Supplier ${$scope.confirm.namarekanan} dengan No. SPK ${$scope.confirm.noSPK}`)
          .ok('Ya')
          .cancel('Batal');

        $mdDialog.show(confirm).then(function () {
          // yes
          if (state) {
            // if (!$scope.confirm.confirmfk) {
            //   toastr.warning('Harap Konfirmasi Ka. Subag terlebih dahulu', 'Perhatian!');
            //   return;
            // }
            let data = {
              noverifikasifk: $scope.confirm.noverifikasifk,
              confirmfk: $scope.dataPegawaiLogin.id,
              tglconfirm: dateHelper.formatDate(new Date, 'YYYY-MM-DD')
            }

            ManageAkuntansi.postpost(data, 'bendahara-pengeluaran/save-confirm-verifikasi-tagihan-suplier').then(res => {
              $scope.loadData();
            });

          } else {

            let data = {
              noverifikasifk: $scope.confirm.noverifikasifk,
              confirmfk: $scope.confirm.confirmfk,
              confirm1fk: $scope.dataPegawaiLogin.id,
              tglconfirm: dateHelper.formatDate(new Date, 'YYYY-MM-DD')
            }

            ManageAkuntansi.postpost(data, 'bendahara-pengeluaran/save-confirm-anggaran-verifikasi-tagihan-suplier').then(res => {
              $scope.loadData();
            });

          }
        }, function () {
          $scope.konfirmasiAnggaran.open().center();
          toastr.info('Konfirmasi dibatalkan');
        });
      }

      $scope.verifikasiTagihan = function () {
        if (!$scope.verif.sumberDana) {
          toastr.warning("Harap isi Sumber Dana");
          return;
        };

        if (!$scope.verif.anggaran) {
          toastr.warning("Harap isi Anggaran");
          return;
        };

        if (!$scope.verif.pph) {
          toastr.warning("Harap isi Pph");
          return;
        };

        if (!$scope.verif.totalBayar) {
          toastr.warning("Harap isi Total yang akan dibayarkan");
          return;
        };

        let dataSave = {
          norec: $scope.dataSelected.norec,
          tglVerifikasi: dateHelper.formatDate($scope.item.tanggalVerifikasi, "YYYY-MM-DD"),
          pegawaifk: $scope.dataPegawaiLogin.id,
          kodeAnggaran: $scope.verif.anggaran.kode_anggaran,
          noverifikasifk: $scope.dataSelected.noverifikasifk ? $scope.dataSelected.noverifikasifk : "",
          keperluan: $scope.keperluan,
          ba: $scope.item.isBa ? $scope.item.ba : "",
          sppb: $scope.item.isSppb ? $scope.item.sppb : "",
          faktur: $scope.item.isNoFaktur ? $scope.item.noFaktur : "",
          pph: JSON.parse($scope.verif.pph)
        };

        $scope.verifkasiRekanan.close();


        var confirm = $mdDialog.confirm()
          .title('Apakah anda yakin akan Verifikasi Tagihan Rekanan (' + $scope.dataSelected.namarekanan + ')')
          .ok('Ya')
          .cancel('Batal');

        $mdDialog.show(confirm).then(() => {
          // yes
          ManageAkuntansi.postpost(dataSave, 'bendahara-pengeluaran/save-verifikasi-tagihan-suplier').then(res => {
            $scope.verifkasiRekanan.close();
            window.open('http://192.168.12.4:7777/service-reporting/lap-verifikasi-tagihan-supplier/' + res.data.noverifikasifk);
            $scope.loadData();
          });
        }, () => {
          // no
          $scope.closePopUpVerifikasi();
          $scope.verifkasiRekanan.open().center();
        });

      };

      $scope.showPagu = function (data) {
        $scope.keperluan = 'Untuk Pembayaran ' + ($scope.verif.anggaran ? $scope.verif.anggaran.nama_anggaran : '') + ' a/n Supplier ' + $scope.dataSelected.namarekanan + ' No.SPK = ' + $scope.dataSelected.noSPK
        $scope.verif.kodeDana = data.kode_dana;
        $scope.verif.tahunDana = data.tahun;
        $scope.verif.namaAnggaran = data.nama_anggaran;
        console.log($scope.verif.anggaran);
        $scope.verif.sisaPagu = new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR'
        }).format((data.anggaran - data.penggunaan));
        $scope.verif.pagu = data.anggaranFormatted;
        $scope.verif.rawSisaPagu = (data.anggaran - data.penggunaan);
        $scope.getTerbilang((data.anggaran - data.penggunaan), 'sisaPaguTerbilang');
        $scope.getTerbilang(data.anggaran, 'paguTerbilang');
        $scope.isPagu = true;
      }

      $scope.closePopUpVerifikasi = function () {
        $scope.clearVerifikasi();
        $scope.isPagu = false;
        $scope.verifkasiRekanan.close();
      }

      $scope.validasiTotalBayar = function () {
        if (parseInt($scope.verif.totalBayar) > $scope.verif.rawSisaPagu) {
          toastr.warning('Total bayar tidak bisa lebih dari sisa pagu');
          $scope.verif.totalBayar = '';
          $scope.getTerbilang(0, 'totalBayarTerbilang');
        }
      }

      $scope.toogleClick = () => {
        $scope.showInputNoSpk = $scope.item.isNoSpk ? true : false;
        $scope.showInputNoFaktur = $scope.item.isNoFaktur ? true : false;
        $scope.showInputBa = $scope.item.isBa ? true : false;
        $scope.showInputSppb = $scope.item.isSppb ? true : false;
      }
    }
  ]);
});