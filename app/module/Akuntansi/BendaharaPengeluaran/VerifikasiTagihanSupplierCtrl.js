define(['initialize'], function (initialize) {
  'use strict';
  initialize.controller('VerifikasiTagihanSupplierCtrl', ['CacheHelper', '$timeout', '$q', '$rootScope', '$scope', 'ManageAkuntansi', '$state', 'DateHelper', 'ManageSarpras', 'ModelItemAkuntansi', '$mdDialog',
    function (cacheHelper, $timeout, $q, $rootScope, $scope, ManageAkuntansi, $state, dateHelper, ManageSarpras, modelItemAkuntansi, $mdDialog) {

      //catatan : PENTING
      //cek tabel maploginusertoruangan_s

      $scope.listAnggaran = [];
      $scope.listSumberDana = [];

      $scope.isPagu = false;

      $scope.dataVOloaded = true;
      $scope.now = new Date();
      $scope.item = {};
      $scope.verif = {};
      $scope.dataSelected = {};
      $scope.item.tanggalVerifikasi = new Date();
      //$scope.dataSelectedPiutang = {};
      $scope.item.tanggalAwal = $scope.now;
      $scope.item.tanggalAkhir = $scope.now;

      $scope.listStatus = [{
        "id": 0,
        "namaStatus": "Verifikasi"
      }, {
        "id": 1,
        "namaStatus": "Belum Verifikasi"
      }]

      $scope.item.status = {
        id: 1,
        namaStatus: "Belum Verifikasi"
      }

      //ON LOAD with Params
      $scope.item.tanggalAwal = $scope.now;
      $scope.item.tanggalAkhir = $scope.now;

      let init = function () {
        // serive get sumber dana
        ManageAkuntansi.getDataTableTransaksi('bendahara-pengeluaran/get-sumber-dana').then(res => {
          $scope.listSumberDana = res.data;
        })

        // service get list anggaran
        ManageAkuntansi.getDataTableTransaksi('bendahara-pengeluaran/get-penggunaan-anggaran?tahun=' + new Date().getFullYear()).then(res => {
          for (let i = 0; i < res.data.data.length; i++) {
            res.data.data[i].anggaranFormatted = new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR'
            }).format(res.data.data[i].anggaran);
          }
          $scope.listAnggaran = res.data.data;
        });
      }

      init();

      $scope.loadData = function () {
        $scope.isRouteLoading = true;
        // YYYY-MM-DD
        ManageAkuntansi.getDataTableTransaksi("bendahara-pengeluaran/get-data-verifikasi-tagihan-suplier?tglAwal=" + dateHelper.formatDate($scope.item.tanggalAwal, 'YYYY-MM-DD') + "&tglAkhir=" + dateHelper.formatDate($scope.item.tanggalAkhir, 'YYYY-MM-DD') + "&Supplier=" + ($scope.item.namaSupplier ? $scope.item.namaSupplier :"")+ "&status=" + ($scope.item.status.namaStatus ? $scope.item.status.namaStatus :"")).then((res) => {
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
          $scope.dataGrid = new kendo.data.DataSource({
            data: res.data.daftar,
            pageSize: 25
          });
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

      $scope.columnGrid = [{
          "field": "namarekanan",
          "title": "<h3>Nama Rekanan</h3>",
          "width": "200px"
        },
        {
          "field": "noverifikasi",
          "title": "<h3>No. Verifikasi</h3>",
          "template": "<span class='style-center'>{{'#: noverifikasi #'}}</span>",
          "width": "150px"
        },
        {
          "field": "tglstruk",
          "title": "<h3>Tanggal <br>Struk</h3>",
          "template": "<span class='style-center'>{{'#: tglstruk #'}}</span>",
          "width": "150px"
        },
        {
          "field": "tgldokumen",
          "title": "<h3>Tanggal Dokumen</h3>",
          "template": "<span class='style-center'>{{'#: tgldokumen #'}}</span>",
          "width": "150px"
        },
        {
          "field": "nostruk",
          "title": "<h3>No. Struk</h3>",
          "template": "<span class='style-center'>{{'#: nostruk #'}}</span>",
          "width": "150px"
        },
        {
          "field": "nodokumen",
          "title": "<h3>No. Dokumen</h3>",
          "template": "<span class='style-center'>{{'#: nodokumen #'}}</span>",
          "width": "200px"
        },
        // {
        //   "field": "nopo",
        //   "title": "<h3>No. PO</h3>",
        //   "template": "<span class='style-center'>{{'#: nopo #'}}</span>",
        //   "width": "200px"
        // }, 
        // {
        //   "field": "nosbk",
        //   "title": "<h3>No. SBK</h3>",
        //   "template": "<span class='style-center'>{{'#: nosbk #'}}</span>",
        //   "width": "150px"
        // },
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
        {
          "field": "statusbayar",
          "title": "<h3>Status Bayar</h3>",
          "template": "<span class='style-center'>{{'#: statusbayar #'}}</span>",
          "width": "150px"
        },
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

      $scope.gridOpt = {
        toolbar: [{
            text: "export",
            name: "Export detail",
            template: '<button ng-click="exportExcel()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-excel"></span>Export to Excel</button>'
          }

        ],
        pageable: true,
        scrollable: true,
        columns: $scope.columnGrid
      };

      $scope.exportExcel = function () {
        var tempDataExport = [];
        var rows = [{
          cells: [{
              value: "Nama Rekanan"
            },
            {
              value: "No. Verifikasi"
            },
            {
              value: "Tanggal Struk"
            },
            {
              value: "Tanggal Dokumen"
            },
            {
              value: "No. Struk"
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

        tempDataExport = $scope.dataGrid;
        tempDataExport.fetch(function () {
          var data = this.data();
          console.log(data);
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
                  value: data[i].tglstruk
                },
                {
                  value: data[i].tgldokumen
                },
                {
                  value: data[i].nostruk
                },
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
                {
                  value: data[i].statusbayar
                },
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
            fileName: "daftar-verifikasi-tagihan-rekanan.xlsx"
          });
        });
      };

      function showDataVerifikasi(e) {
        e.preventDefault();
        let tr = $(e.target).closest("tr");
        let dataItem = this.dataItem(tr);
        console.log(dataItem);
        if(dataItem.statusbayar !== 'BELUM LUNAS') {
          toastr.info('Data Tagihan SUDAH LUNAS');
          return;
        }

        // status
        if(dataItem.status !== 'Belum Verifikasi') {
          toastr.info('Data Tagihan Sudah Verifikasi');
          return;
        }
        $scope.dataSelected = dataItem;
        $scope.verif.totalBayar = dataItem.sisautang;
        // $scope.item.noFakturVerifikasi = null;
        // $scope.clearVerifikasi();
        $scope.verifkasiRekanan.open().center();
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


      $scope.verifikasiTagihan = function () {
        if(!$scope.verif.sumberDana) { 
          toastr.warning("Harap isi Sumber Dana");
          return;
        };
        if(!$scope.verif.anggaran) {
          toastr.warning("Harap isi Anggaran");
          return;
        }

        if(!$scope.verif.totalBayar) {
          toastr.warning("Harap isi Total yang akan dibayarkan");
          return;
        };
        let dataSave = {
          "norec": $scope.dataSelected.norec,
          "tglVerifikasi": dateHelper.formatDate($scope.item.tanggalVerifikasi, "YYYY-DD-MM")
          // "2020-04-02"
        };
        $scope.verifkasiRekanan.close();

        var confirm = $mdDialog.confirm()
          .title('Apakah anda yakin akan Verifikasi Tagihan Rekanan (' + $scope.dataSelected.namarekanan + ')')
          .ok('Ya')
          .cancel('Batal');

        $mdDialog.show(confirm).then(function () {
          // yes
          ManageAkuntansi.postpost(dataSave, 'bendahara-pengeluaran/save-verifikasi-tagihan-suplier').then(res => {
            $scope.verifkasiRekanan.close();
            $scope.loadData();
          });
        }, function () {
          // no
          $scope.closePopUpVerifikasi();
          $scope.verifkasiRekanan.open().center();
        });

      };

      $scope.showPagu = function (data) {
        $scope.verif.kodeDana = data.kode_dana;
        $scope.verif.tahunDana = data.tahun;
        $scope.verif.namaAnggaran = data.nama_anggaran;
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
    }
  ]);
});