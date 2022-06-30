define(["initialize"], function (initialize) {
  "use strict";
  initialize.controller("MasterProdukFarmakologiCtrl", ["CacheHelper", "ManagePegawai", "ManageServicePhp", "DateHelper", "ManageSdm", "ManageSdmNew", "$state", "$rootScope", "$scope", "$mdDialog",
    function (chacheHelper, managePegawai, manageServicePhp, dateHelper, manageSdm, manageSdmNew, $state, $rootScope, $scope, $mdDialog) {
      $scope.item = {};
      $scope.src = {};
      $scope.isDuplicated = false;
      $scope.listKdProduk = [{
        id: 1,
        kodeProduk: "Pelayanan Pasien (Tarif)",
      }, {
        id: 2,
        kodeProduk: "Pelayanan Pasien (Nontarif)",
      }, {
        id: 3,
        kodeProduk: "Pelayanan Nonpasien",
      }];

      $scope.optGrid = {
        toolbar: [{
          text: "export",
          name: "Tambah",
          template:
            '<button ng-click="showPopupAdd()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-plus"></span>Tambah Data</button>',
        }, {
          text: "export",
          name: "Tambah",
          template:
            '<button ng-click="exportExcel()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-excel"></span>Export to Excel</button>',
        }],
        pageable: true,
        scrollable: true,
        columns: [{
          field: "namaProduk",
          title: "<h3>Nama Produk</h3>",
          width: 100,
        }, {
          field: "kodeProduk",
          title: "<h3>Kode Produk</h3>",
          width: 50,
        }, {
          command: [{
            text: "Hapus",
            click: confirmHapus,
            imageClass: "k-icon k-i-cancel",
          }, {
            text: "Edit",
            click: editData,
            imageClass: "k-icon k-i-pencil",
          }],
          title: "",
          width: 30,
        }],
      };

      $scope.exportExcel = () => {
        var tempDataExport = [];
        var rows = [{
          cells: [
            { value: "Nama Produk" },
            { value: "Kode Produk" }
          ]
        }];

        tempDataExport = $scope.dataSource;
        tempDataExport.fetch(function () {
          var data = this.data();
          for (var i = 0; i < data.length; i++) {
            //push single row for every record
            rows.push({
              cells: [
                { value: data[i].namaProduk },
                { value: data[i].kodeProduk }
              ]
            })
          }
          var workbook = new kendo.ooxml.Workbook({
            sheets: [
              {
                freezePane: {
                  rowSplit: 1
                },
                columns: [
                  // Column settings (width)
                  { autoWidth: true },
                  { autoWidth: true },
                  { autoWidth: true }
                ],
                // Title of the sheet
                title: "Master Produk Farmakologi",
                // Rows of the sheet
                rows: rows
              }
            ]
          });
          //save the file as Excel file with extension xlsx
          kendo.saveAs({ dataURI: workbook.toDataURL(), fileName: "data-master-produk-farmakologi.xlsx" });
        });

      }

      $scope.getData = () => {
        $scope.isRouteLoading = true;
        manageSdmNew.getListData(
          `iki-remunerasi/get-produk-farmakologi?namaProduk=${$scope.src.namaProduk ? $scope.src.namaProduk : ""}&kdProduk=${$scope.src.kdProduk ? $scope.src.kdProduk.id : ""}`
        ).then((res) => {
          $scope.dataSource = new kendo.data.DataSource({
            data: res.data.data,
            pageSize: 20,
          });
          $scope.isRouteLoading = false;
        });
      };

      let init = () => {
        $scope.getData();
      };

      init();

      $scope.showPopupAdd = () => {
        $scope.reset();
        $scope.popup.open().center();
      };

      $scope.reset = () => {
        $scope.item.namaProduk = "";
        $scope.item.kdProduk = null;

        $scope.item.produkId = null;
      };

      $scope.closePopUp = () => {
        $scope.reset();

        $scope.popup.close();
      };

      function confirmHapus(e) {
        e.preventDefault();
        var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
        $scope.reset();

        $scope.item.namaProduk = dataItem.namaProduk;
        $scope.item.kdProduk = {
          id: dataItem.kdProduk,
          kodeProduk: dataItem.kodeProduk,
        };
        $scope.item.produkId = dataItem.produkId;
        var confirm = $mdDialog
          .confirm()
          .title("Apakah anda yakin menghapus data?")
          .textContent("Anda akan menghapus data secara permanen!")
          .ariaLabel("Lucky day")
          .targetEvent(e)
          .ok("Ya")
          .cancel("Tidak");
        $mdDialog.show(confirm).then(function () {
          $scope.saveData(false);
        });
      }

      function editData(e) {
        e.preventDefault();
        var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
        $scope.reset();

        $scope.item.namaProduk = dataItem.namaProduk;
        $scope.item.kdProduk = {
          id: dataItem.kdProduk,
          kodeProduk: dataItem.kodeProduk,
        };
        $scope.item.produkId = dataItem.produkId;
        $scope.popup.open().center();
      }

      $scope.saveData = (statusEnabled) => {
        if ($scope.isDuplicated) {
          return;
        }
        let dataSave = {
          namaProduk: $scope.item.namaProduk,
          kdProduk: $scope.item.kdProduk.id,
          statusEnabled: statusEnabled,
          kdProfile: 0,
        };

        if ($scope.item.produkId) {
          dataSave.id = $scope.item.produkId;
        }

        manageSdmNew.saveData(dataSave, "iki-remunerasi/save-produk-farmakologi").then((res) => {
          $scope.getData();
          $scope.reset();
          $scope.popup.close();
        });
      };

      $scope.$watch('item.namaProduk', function (e) {
        if (!e) return;
        let paramProductId = "";
        if ($scope.item.produkId)
          paramProductId = `&produkId=${$scope.item.produkId}`;
        manageSdmNew.getListData(
          `iki-remunerasi/get-duplicate-produk-farmakolgi?namaProduk=${$scope.item.namaProduk ? $scope.item.namaProduk : ""}${paramProductId}`
        ).then((res) => {
          if (res.data.data.length > 0) {
            $scope.isDuplicated = true;

            toastr.info("Data sudah ada")
          } else {
            $scope.isDuplicated = false;
          }
        });
      });
    },
  ]);
});
