define(["initialize"], function (initialize) {
  "use strict";
  initialize.controller("TransaksiPelayananApotikCtrl", [
    "$q",
    "$rootScope",
    "$scope",
    "ManageLogistikPhp",
    "$state",
    "CacheHelper",
    "$mdDialog",
    function (
      $q,
      $rootScope,
      $scope,
      manageLogistikPhp,
      $state,
      cacheHelper,
      $mdDialog
    ) {
      $scope.item = {};
      $scope.dataVOloaded = true;
      $scope.now = new Date();
      var norec_apd = "";
      var statusPosting = true;
      $scope.isRouteLoading = false;
      // var pegawaiUser = {}

      var detail = "";
      // $scope.item.tglAwal = $scope.now;ex
      // $scope.item.tglAkhir = $scope.now;
      LoadCache();

      function LoadCache() {
        var chacePeriode = cacheHelper.get("TransaksiPelayananApotikCtrl");
        if (chacePeriode != undefined) {
          //var arrPeriode = chacePeriode.split(':');
          $scope.item.noMr = chacePeriode[0];
          $scope.item.namaPasien = chacePeriode[1];
          $scope.item.jenisKelamin = chacePeriode[2];
          $scope.item.noregistrasi = chacePeriode[3];
          $scope.item.umur = chacePeriode[4];
          $scope.item.nostruk = chacePeriode[11];
          $scope.item.noSbm = chacePeriode[10];
          $scope.listKelas = [
            {
              id: chacePeriode[5],
              namakelas: chacePeriode[6],
            },
          ];
          $scope.item.kelas = {
            id: chacePeriode[5],
            namakelas: chacePeriode[6],
          };
          $scope.item.tglRegistrasi = chacePeriode[7];
          norec_apd = chacePeriode[8];
          detail = chacePeriode[9];
          manageLogistikPhp
            .getDataTableTransaksi(
              "logistik/get_detailPD?norec_apd=" + norec_apd,
              true
            )
            .then(function (data_ih) {
              $scope.item.jenisPenjamin = data_ih.data.detailPD[0].namarekanan;
              $scope.item.kelompokPasien =
                data_ih.data.detailPD[0].kelompokpasien;
              $scope.item.beratBadan = data_ih.data.detailPD[0].beratbadan;
              // pegawaiUser = data_ih.data.datalogin[0]
            });
          init();
        } else {
        }
      }

      function init() {
        //debugger;
        $scope.isRouteLoading = true;
        if (detail == "detail") {
          manageLogistikPhp
            .getDataTableTransaksi(
              "logistik/get-transaksi-pelayanan?nocm=" +
                $scope.item.noMr +
                "&noregistrasifk=" +
                norec_apd,
              true
            )
            .then(function (dat) {
              $scope.isRouteLoading = false;
              for (var i = 0; i < dat.data.length; i++) {
                dat.data[i].no = i + 1;
                dat.data[i].total =
                  parseFloat(dat.data[i].jumlah) *
                  (parseFloat(dat.data[i].hargasatuan) -
                    parseFloat(dat.data[i].hargadiscount));
                dat.data[i].total =
                  parseFloat(dat.data[i].total) + parseFloat(dat.data[i].jasa);
              }
              $scope.dataGrid = dat.data;
            });
        } else if (detail == "resep") {
          var chacePeriode = cacheHelper.get("DaftarResepCtrl");
          if (chacePeriode != undefined) {
            var noresep = chacePeriode[0];
            manageLogistikPhp
              .getDataTableTransaksi(
                "logistik/get-transaksi-pelayanan?nocm=" +
                  $scope.item.noMr +
                  "&norec_resep=" +
                  noresep,
                true
              )
              .then(function (dat) {
                $scope.isRouteLoading = false;
                for (var i = 0; i < dat.data.length; i++) {
                  dat.data[i].no = i + 1;
                  dat.data[i].total =
                    parseFloat(dat.data[i].jumlah) *
                    (parseFloat(dat.data[i].hargasatuan) -
                      parseFloat(dat.data[i].hargadiscount));
                  dat.data[i].total =
                    parseFloat(dat.data[i].total) +
                    parseFloat(dat.data[i].jasa);
                }
                $scope.dataGrid = dat.data;
              });
          }
        } else {
          manageLogistikPhp
            .getDataTableTransaksi(
              "logistik/get-transaksi-pelayanan?nocm=" + $scope.item.noMr,
              true
            )
            .then(function (dat) {
              $scope.isRouteLoading = false;
              for (var i = 0; i < dat.data.length; i++) {
                dat.data[i].no = i + 1;
                dat.data[i].total =
                  parseFloat(dat.data[i].jumlah) *
                  (parseFloat(dat.data[i].hargasatuan) -
                    parseFloat(dat.data[i].hargadiscount));
                dat.data[i].total =
                  parseFloat(dat.data[i].total) + parseFloat(dat.data[i].jasa);
              }
              $scope.dataGrid = dat.data;
            });
        }
      }

      $scope.formatTanggal = function (tanggal) {
        return moment(tanggal).format("DD-MMM-YYYY");
      };

      $scope.columnGrid = [
        {
          field: "no",
          title: "No",
          width: "30px",
        },
        {
          field: "tglpelayanan",
          title: "Tgl Pelayanan",
          width: "90px",
        },
        {
          field: "noregistrasi",
          title: "No.Registrasi",
          width: "100px",
        },
        {
          field: "noresep",
          title: "No.Resep",
          width: "100px",
        },
        {
          field: "rke",
          title: "R/ke",
          width: "30px",
        },
        {
          field: "jeniskemasan",
          title: "Kemasan",
          width: "80px",
        },
        {
          field: "namaproduk",
          title: "Deskripsi",
          width: "200px",
        },
        {
          field: "satuanstandar",
          title: "Satuan",
          width: "80px",
        },
        {
          field: "jumlah",
          title: "Qty",
          width: "40px",
        },
        {
          field: "hargasatuan",
          title: "Harga Satuan",
          width: "100px",
          template:
            "<span class='style-right'>{{formatRupiah('#: hargasatuan #', '')}}</span>",
        },
        {
          field: "hargadiscount",
          title: "Harga Discount",
          width: "100px",
          template:
            "<span class='style-right'>{{formatRupiah('#: hargadiscount #', '')}}</span>",
        },
        {
          field: "jasa",
          title: "Jasa",
          width: "70px",
          template:
            "<span class='style-right'>{{formatRupiah('#: jasa #', '')}}</span>",
        },
        {
          field: "total",
          title: "Total",
          width: "100px",
          template:
            "<span class='style-right'>{{formatRupiah('#: total #', '')}}</span>",
        },
        {
          field: "nostruk",
          title: "No Struk",
          width: "100px",
        },
      ];
      $scope.columnPopUp = [
        {
          field: "no",
          title: "No",
          width: "20px",
        },
        {
          field: "tglstruk",
          title: "Tgl Struk",
          width: "50px",
        },
        {
          field: "nostruk",
          title: "NoTerima",
          width: "60px",
        },
        {
          field: "namaruanganasal",
          title: "Nama Ruangan Asal",
          width: "100px",
        },
        {
          field: "namaruangantujuan",
          title: "Nama Ruangan Tujuan",
          width: "100px",
        },
        {
          field: "petugas",
          title: "Petugas",
          width: "100px",
        },
        {
          field: "keterangan",
          title: "Keterangan",
          width: "100px",
        },
      ];
      $scope.data2 = function (dataItem) {
        return {
          dataSource: new kendo.data.DataSource({
            data: dataItem.details,
          }),
          columns: [
            {
              field: "namaproduk",
              title: "Nama Produk",
              width: "100px",
            },
            {
              field: "satuanstandar",
              title: "Satuan",
              width: "30px",
            },
            {
              field: "qtyproduk",
              title: "Qty",
              width: "30px",
            },
          ],
        };
      };
      // $scope.mainGridOptions = {
      //     pageable: true,
      //     columns: $scope.columnProduk,
      //     editable: "popup",
      //     selectable: "row",
      //     scrollable: false
      // };
      $scope.formatRupiah = function (value, currency) {
        return (
          currency +
          " " +
          parseFloat(value)
            .toFixed(2)
            .replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
        );
      };
      $scope.back = function () {
        //$state.go("DaftarPasienApotik")
        window.history.back();
      };

      $scope.promptMiniR45 = () => {
        if ($scope.dataSelected == undefined) {
          alert("Pilih Resep terlebih dahulu!!");
          return;
        }

        var confirm = $mdDialog
          .prompt()
          .title("Harap masukkan jumlah bungkus Mini R-45?")
          .initialValue("0")
          .ok("Ya");

        $mdDialog.show(confirm).then(
          function (result) {
            if (result === "0" || !result) {
              toastr.warning("Harap isi Jumlah Bungkus", "Perhatian");
              return;
            }
            $scope.jmlBungkusMiniR45 = result;
            $scope.BridgingMiniR45();
          },
          function () {}
        );
      };

      $scope.BridgingMiniR45 = function () {
        var objSave = {
          strukresep: $scope.dataSelected.norec_resep,
          rke: $scope.dataSelected.rke,
          bungkus: $scope.jmlBungkusMiniR45,
        };

        console.log(objSave);
        manageLogistikPhp
          .postpost("bridging/save-mini-r45-rev-1", objSave)
          .then(function (e) {});
      };

      $scope.prompBridgingConsisD = () => {
        $scope.counterID = 0;

        if ($scope.dataSelected == undefined) {
          alert("Pilih Resep terlebih dahulu!!");
          return;
        }
        if ($scope.dataSelected.jeniskemasan != "Non Racikan") {
          alert("Harus Non Racikan!!");
          return;
        }

        var confirm = $mdDialog
          .prompt()
          .title("Isi Nomor sesuai Jenis Pasien : BPJS, Umum dan Ranap?")
          // .textContent('Bowser is a common name.')
          .placeholder("Nomor")
          .initialValue("0")
          .ok("Ya");
        // .cancel('I\'m a cat person');

        $mdDialog.show(confirm).then(
          function (result) {
            $scope.counterID = result;
            $scope.BridgingConsisD();
          },
          function () {}
        );
      };

      $scope.BridgingConsisD = function () {
        var objSave = {
          strukresep: $scope.dataSelected.norec_resep,
          counterid: parseInt($scope.counterID),
        };

        manageLogistikPhp.saveconsisobatbebas(objSave).then(function (e) {});
      };
      $scope.TambahObat = function () {
        // if ($scope.dataSelected.nostruk != undefined) {
        //     alert('Sudah verifikasi Tatarekening Tidak Bisa Menambah Obat!')
        //     return;
        // }
        //debugger;

        if ($scope.item.kelompokPasien === "Umum/Pribadi") {
          if (!$scope.item.noSbm && !$scope.item.nostruk) {
            var arrStr = {
              0: $scope.item.noMr,
              1: $scope.item.namaPasien,
              2: $scope.item.jenisKelamin,
              3: $scope.item.noregistrasi,
              4: $scope.item.umur,
              5: $scope.item.kelas.id,
              6: $scope.item.kelas.namakelas,
              7: $scope.item.tglRegistrasi,
              8: norec_apd,
              9: "",
              10: $scope.item.jenisPenjamin,
              11: $scope.item.kelompokPasien,
              12: $scope.item.beratBadan,
              13: $scope.item.AlergiYa,
              10: $scope.item.noSbm,
              11: $scope.item.nostruk,
              12: $scope.item.kelompokPasien,
            };
            cacheHelper.set("InputResepApotikCtrl", arrStr);
            $state.go("InputResepApotik");
          }
        }

        if ($scope.dataSelected != undefined) {
          manageLogistikPhp
            .getDataTableTransaksi(
              "tatarekening/get-sudah-verif?noregistrasi=" +
                $scope.dataSelected.noregistrasi,
              true
            )
            .then(function (dat) {
              if (dat.data.status) {
                window.messageContainer.error(
                  "Data Sudah Diclosing, Hubungi Tatarekening!!!!"
                );
                return;
              } else {
                var arrStr = {
                  0: $scope.item.noMr,
                  1: $scope.item.namaPasien,
                  2: $scope.item.jenisKelamin,
                  3: $scope.item.noregistrasi,
                  4: $scope.item.umur,
                  5: $scope.item.kelas.id,
                  6: $scope.item.kelas.namakelas,
                  7: $scope.item.tglRegistrasi,
                  8: norec_apd,
                  9: "",
                  10: $scope.item.jenisPenjamin,
                  11: $scope.item.kelompokPasien,
                  12: $scope.item.beratBadan,
                  13: $scope.item.AlergiYa,
                };
                cacheHelper.set("InputResepApotikCtrl", arrStr);
                $state.go("InputResepApotik");
              }
            });
        } else {
          manageLogistikPhp
            .getDataTableTransaksi(
              "tatarekening/get-sudah-verif?noregistrasi=" +
                $scope.item.noregistrasi,
              true
            )
            .then(function (dat) {
              if (
                $scope.item.kelompokPasien === "Umum/Pribadi" &&
                !$scope.item.noSbm &&
                !$scope.item.nostruk
              ) {
                window.messageContainer.error(
                  "Data Sudah Diclosing, Hubungi Tatarekening!!!!"
                );
                return;
              } else {
                var arrStr = {
                  0: $scope.item.noMr,
                  1: $scope.item.namaPasien,
                  2: $scope.item.jenisKelamin,
                  3: $scope.item.noregistrasi,
                  4: $scope.item.umur,
                  5: $scope.item.kelas.id,
                  6: $scope.item.kelas.namakelas,
                  7: $scope.item.tglRegistrasi,
                  8: norec_apd,
                  9: "",
                  10: $scope.item.jenisPenjamin,
                  11: $scope.item.kelompokPasien,
                  12: $scope.item.beratBadan,
                  13: $scope.item.AlergiYa,
                };
                cacheHelper.set("InputResepApotikCtrl", arrStr);
                $state.go("InputResepApotik");
              }
            });
        }
      };
      $scope.paketObat = function () {
        $scope.popupPaketObat.center().open();
        $scope.dataGrid = [];
        manageLogistikPhp
          .getDataTableTransaksi(
            "logistik-stok/get-daftar-paket-obat-pasien?" +
              "noregistrasi=" +
              $scope.item.noregistrasi,
            true
          )
          .then(function (dat) {
            $scope.isRouteLoading = false;
            for (var i = 0; i < dat.data.daftar.length; i++) {
              dat.data.daftar[i].no = i + 1;
            }
            $scope.dataPopUp = dat.data.daftar;
            // $scope.dataPopUp212 = new kendo.data.DataSource({
            //     data: dat.data.daftar
            // });
            // $scope.dataPopUpPaketObat = dat.data.daftar;
          });
      };
      $scope.baruPopUp = function () {
        manageLogistikPhp
          .getDataTableTransaksi(
            "tatarekening/get-sudah-verif?noregistrasi=" +
              $scope.item.noregistrasi,
            true
          )
          .then(function (dat) {
            if (dat.data.status == true) {
              window.messageContainer.error(
                "Data Sudah Diclosing, Hubungi Tatarekening!!!!"
              );
              return;
            } else {
              var arrStr = {
                0: $scope.item.noMr,
                1: $scope.item.namaPasien,
                2: $scope.item.jenisKelamin,
                3: $scope.item.noregistrasi,
                4: $scope.item.umur,
                5: $scope.item.kelas.id,
                6: $scope.item.kelas.namakelas,
                7: $scope.item.tglRegistrasi,
                8: norec_apd,
                9: "",
                10: $scope.item.jenisPenjamin,
                11: $scope.item.kelompokPasien,
                12: $scope.item.beratBadan,
                13: $scope.item.AlergiYa,
                14: "",
                15: "",
              };
              cacheHelper.set("PaketObatPasienCtrl", arrStr);
              $state.go("PaketObatPasien");
            }
          });
      };
      $scope.ubahPopUp = function () {
        if ($scope.dataSelectedPopUp == undefined) {
          alert("Pilih yg akan di ubah!!");
          return;
        }
        var chacePeriode = {
          0: $scope.item.noMr,
          1: $scope.item.namaPasien,
          2: $scope.item.jenisKelamin,
          3: $scope.item.noregistrasi,
          4: $scope.item.umur,
          5: $scope.item.kelas.id,
          6: $scope.item.kelas.namakelas,
          7: $scope.item.tglRegistrasi,
          8: norec_apd,
          9: "",
          10: $scope.item.jenisPenjamin,
          11: $scope.item.kelompokPasien,
          12: $scope.item.beratBadan,
          13: $scope.item.AlergiYa,
          14: "EditKirim",
          15: $scope.dataSelectedPopUp.norec,
        };
        cacheHelper.set("PaketObatPasienCtrl", chacePeriode);
        $state.go("PaketObatPasien");
      };

      $scope.EditResep = function () {
        if ($scope.dataSelected.nostruk != undefined) {
          window.messageContainer.error(
            "Data Sudah Diclosing, Hubungi Tatarekening!!!!"
          );
          return;
        }
        if (statusPosting == true) {
          window.messageContainer.error(
            "Data Sudah di Posting, Hubungi Bagian Akuntansi."
          );
          return;
        }
        manageLogistikPhp
          .getDataTableTransaksi(
            "tatarekening/get-sudah-verif?noregistrasi=" +
              $scope.dataSelected.noregistrasi,
            true
          )
          .then(function (dat) {
            if (dat.data.status == true) {
              window.messageContainer.error(
                "Sudah verifikasi Tatarekening Tidak Bisa mengubah Obat!"
              );
              return;
            } else {
              var arrStr = {
                0: $scope.item.noMr,
                1: $scope.item.namaPasien,
                2: $scope.item.jenisKelamin,
                3: $scope.dataSelected.noregistrasi,
                4: $scope.item.umur,
                5: $scope.item.kelas.id,
                6: $scope.item.kelas.namakelas,
                7: $scope.item.tglRegistrasi,
                8: norec_apd,
                9: "EditResep",
                10: $scope.item.jenisPenjamin,
                11: $scope.item.kelompokPasien,
                12: $scope.item.beratBadan,
                13: $scope.item.AlergiYa,
                14: $scope.dataSelected.norec_resep,
              };
              cacheHelper.set("InputResepApotikCtrl", arrStr);
              $state.go("InputResepApotik");
            }
          });
        //debugger;
      };
      $scope.klikgrid = function () {
        manageLogistikPhp
          .getDataTableTransaksi(
            "akutansi/get-sudah-posting?tgl=" +
              $scope.dataSelected.tglpelayanan,
            true
          )
          .then(function (dat) {
            statusPosting = dat.data.status;
          });
      };

      $scope.Retur = function () {
        if ($scope.dataSelected.nostruk != undefined) {
          window.messageContainer.error(
            "Data Sudah Diclosing, Hubungi Tatarekening."
          );
          return;
        }
        if (statusPosting == true) {
          window.messageContainer.error(
            "Data Sudah di Posting, Hubungi Bagian Akuntansi."
          );
          return;
        }
        manageLogistikPhp
          .getDataTableTransaksi(
            "tatarekening/get-sudah-verif?noregistrasi=" +
              $scope.dataSelected.noregistrasi,
            true
          )
          .then(function (dat) {
            if (dat.data.status == true) {
              window.messageContainer.error(
                "Sudah verifikasi Tatarekening Tidak Bisa retur Obat!"
              );
              return;
            } else {
              var arrStr = {
                0: $scope.item.noMr,
                1: $scope.item.namaPasien,
                2: $scope.item.jenisKelamin,
                3: $scope.dataSelected.noregistrasi,
                4: $scope.item.umur,
                5: $scope.item.kelas.id,
                6: $scope.item.kelas.namakelas,
                7: $scope.item.tglRegistrasi,
                8: norec_apd,
                9: "EditResep",
                10: $scope.item.jenisPenjamin,
                11: $scope.item.kelompokPasien,
                12: $scope.item.beratBadan,
                13: $scope.item.AlergiYa,
                14: $scope.dataSelected.norec_resep,
              };
              cacheHelper.set("InputResepApotikReturCtrl", arrStr);
              $state.go("InputResepApotikRetur");
            }
          });
        //debugger;
      };

      $scope.orderApotik = function () {
        $state.go("InputResepApotikOrder");
      };
      $scope.HapusResep = function () {
        if ($scope.dataSelected.nostruk != undefined) {
          window.messageContainer.error(
            "Sudah verifikasi Tatarekening tidak dapat di hapus!"
          );
          return;
        }
        if (statusPosting == true) {
          window.messageContainer.error(
            "Data Sudah di Posting, Hubungi Bagian Akuntansi."
          );
          return;
        }
        manageLogistikPhp
          .getDataTableTransaksi(
            "tatarekening/get-sudah-verif?noregistrasi=" +
              $scope.dataSelected.noregistrasi,
            true
          )
          .then(function (dat) {
            if (dat.data.status == true) {
              window.messageContainer.error(
                "Sudah verifikasi Tatarekening Tidak Bisa hapus Obat!"
              );
              return;
            } else {
              var stt = "false";
              if (confirm("Hapus resep? ")) {
                // Save it!
                stt = "true";
              } else {
                // Do nothing!
                return;
                stt = "false";
              }
              var objDelete = {
                norec: $scope.dataSelected.norec_resep,
              };
              manageLogistikPhp
                .posthapuspelayananapotik(objDelete)
                .then(function (e) {
                  LoadCache();
                });
              //##save Logging user
              manageLogistikPhp
                .getDataTableTransaksi(
                  "logging/save-log-hapus-resep?norec_resep=" +
                    $scope.dataSelected.norec_resep
                )
                .then(function (data) {});
              //##end
            }
          });
      };
      $scope.cetakEtiket = function () {
        var client = new HttpClient();
        client.get(
          "http://127.0.0.1:1237/printvb/farmasiApotik?cetak-label-etiket=1&norec=" +
            $scope.dataSelected.norec_resep +
            "&cetak=1",
          function (response) {
            // aadc=response;
          }
        );
      };
      $scope.cetakResep = function () {
        if ($scope.dataSelected == undefined) {
          alert("Pilih resep yg akan di cetak");
          return;
        }
        var stt = "false";
        if (confirm("View resep? ")) {
          // Save it!
          stt = "true";
        } else {
          // Do nothing!
          stt = "false";
        }
        var client = new HttpClient();
        client.get(
          "http://127.0.0.1:1237/printvb/farmasiApotik?cetak-strukresep=1&nores=" +
            $scope.dataSelected.norec_resep +
            "&view=" +
            stt +
            "&user=" +
            $scope.dataSelected.detail.userData.namauser,
          function (response) {
            // aadc=response;
          }
        );
      };
      $scope.cetakLabelResep = function () {
        if ($scope.dataSelected == undefined) {
          alert("Pilih resep yg akan di cetak");
          return;
        }
        var stt = "false";
        if (confirm("View Label resep? ")) {
          // Save it!
          stt = "true";
        } else {
          // Do nothing!
          stt = "false";
        }
        var client = new HttpClient();
        client.get(
          "http://127.0.0.1:1237/printvb/farmasi?cetak-LabelFarmasi=" +
            $scope.dataSelected.norec_resep +
            "&view=" +
            stt +
            "&user=" +
            $scope.dataSelected.detail.userData.namauser,
          function (response) {
            // aadc=response;
          }
        );
      };
      $scope.cetakLabelResepAdm = function () {
        if ($scope.dataSelected == undefined) {
          alert("Pilih resep yg akan di cetak");
          return;
        }
        var stt = "false";
        if (confirm("View Label resep? ")) {
          // Save it!
          stt = "true";
        } else {
          // Do nothing!
          stt = "false";
        }
        var client = new HttpClient();
        client.get(
          "http://127.0.0.1:1237/printvb/farmasi?cetak-LabelFarmasiAdmin=" +
            $scope.dataSelected.norec_resep +
            "&view=" +
            stt +
            "&user=" +
            $scope.dataSelected.detail.userData.namauser,
          function (response) {
            // aadc=response;
          }
        );
      };
      $scope.cetakLabelResepKemo = function () {
        if ($scope.dataSelected == undefined) {
          alert("Pilih resep yg akan di cetak");
          return;
        }
        var stt = "false";
        if (confirm("View Label resep? ")) {
          // Save it!
          stt = "true";
        } else {
          // Do nothing!
          stt = "false";
        }
        var client = new HttpClient();
        client.get(
          "http://127.0.0.1:1237/printvb/farmasi?cetak-LabelFarmasiKemo=" +
            $scope.dataSelected.norec_resep +
            "&view=" +
            stt +
            "&user=" +
            $scope.dataSelected.detail.userData.namauser,
          function (response) {
            // aadc=response;
          }
        );
      };
      $scope.cetakLabelResepTPN = function () {
        if ($scope.dataSelected == undefined) {
          alert("Pilih resep yg akan di cetak");
          return;
        }
        var stt = "false";
        if (confirm("View Label resep? ")) {
          // Save it!
          stt = "true";
        } else {
          // Do nothing!
          stt = "false";
        }
        var client = new HttpClient();
        client.get(
          "http://127.0.0.1:1237/printvb/farmasi?cetak-LabelFarmasiTPN=" +
            $scope.dataSelected.norec_resep +
            "&view=" +
            stt +
            "&user=" +
            $scope.dataSelected.detail.userData.namauser,
          function (response) {
            // aadc=response;
          }
        );
      };
      var HttpClient = function () {
        this.get = function (aUrl, aCallback) {
          var anHttpRequest = new XMLHttpRequest();
          anHttpRequest.onreadystatechange = function () {
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
              aCallback(anHttpRequest.responseText);
          };

          anHttpRequest.open("GET", aUrl, true);
          anHttpRequest.send(null);
        };
      };
      //***********************************
    },
  ]);
});

// http://127.0.0.1:1237/printvb/farmasiApotik?cetak-label-etiket=1&norec=6a287c10-8cce-11e7-943b-2f7b4944&cetak=1
