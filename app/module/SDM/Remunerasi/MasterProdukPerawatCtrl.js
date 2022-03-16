define(["initialize"], function (initialize) {
  "use strict";
  initialize.controller("MasterProdukPerawatCtrl", [
    "CacheHelper",
    "ManagePegawai",
    "ManageServicePhp",
    "DateHelper",
    "ManageSdm",
    "ManageSdmNew",
    "$state",
    "$rootScope",
    "$scope",
    "$mdDialog",
    function (
      chacheHelper,
      managePegawai,
      manageServicePhp,
      dateHelper,
      manageSdm,
      manageSdmNew,
      $state,
      $rootScope,
      $scope,
      $mdDialog
    ) {
      $scope.item = {};
      $scope.src = {};

      $scope.listKlasifikasiProduk = [
        {
          id: 1,
          klasifikasi: "Asuhan",
        },
        {
          id: 2,
          klasifikasi: "Tindakan",
        },
        {
          id: 3,
          klasifikasi: "Laporan",
        },
      ];

      $scope.optGrid = {
        toolbar: [
          {
            text: "export",
            name: "Tambah",
            template:
              '<button ng-click="showPopupAdd()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-plus"></span>Tambah Data</button>',
          }, {
            text: "export",
            name: "Tambah",
            template:
              '<button ng-click="exportExcel()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-excel"></span>Export to Excel</button>',
          },
        ],
        pageable: true,
        scrollable: true,
        columns: [
          {
            field: "namaProduk",
            title: "<h3>Nama Produk</h3>",
            width: 100,
          },
          {
            field: "klasifikasi",
            title: "<h3>Klasifikasi Produk</h3>",
            width: 50,
          },
          {
            command: [
              {
                text: "Hapus",
                click: confirmHapus,
                imageClass: "k-icon k-i-cancel",
              },
              {
                text: "Edit",
                click: editData,
                imageClass: "k-icon k-i-pencil",
              },
            ],
            title: "",
            width: 30,
          },
        ],
      };

      $scope.exportExcel = () => {
        var tempDataExport = [];
        var rows = [
          {
            cells: [
              { value: "Nama Produk" },
              { value: "Klasifikasi" },
            ]
          }
        ];

        tempDataExport = $scope.dataSource;
        tempDataExport.fetch(function () {
          var data = this.data();
          console.log(data);
          for (var i = 0; i < data.length; i++) {
            //push single row for every record
            rows.push({
              cells: [
                { value: data[i].namaProduk },
                { value: data[i].klasifikasi }
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
                  { autoWidth: true }
                ],
                // Title of the sheet
                title: "Master Produk Perawat",
                // Rows of the sheet
                rows: rows
              }
            ]
          });
          //save the file as Excel file with extension xlsx
          kendo.saveAs({ dataURI: workbook.toDataURL(), fileName: "data-master-produk-perawat.xlsx" });
        });

      }

      $scope.getData = () => {
        $scope.isRouteLoading = true;
        //  http://192.168.12.3:8080/jasamedika-sdm/iki-remunerasi/get-produk-perawat?namaProduk=&kdKlasif=
        manageSdmNew
          .getListData(
            `iki-remunerasi/get-produk-perawat?namaProduk=${
              $scope.src.namaProduk ? $scope.src.namaProduk : ""
            }&kdKlasif=${$scope.src.klasifikasi ? $scope.src.klasifikasi.id : ""}`
          )
          .then((res) => {
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
        $scope.item.klasifikasi = null;

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
        $scope.item.klasifikasi = {
          id: dataItem.kdKlasif,
          kodeProduk: dataItem.klasifikasi,
        };
        $scope.item.produkId = dataItem.id;

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
        $scope.item.klasifikasi = {
          id: dataItem.kdKlasif,
          kodeProduk: dataItem.klasifikasi,
        };
        $scope.item.produkId = dataItem.id;

        $scope.popup.open().center();
      }

      $scope.saveData = (statusEnabled) => {
        let dataSave = {
          namaProduk: $scope.item.namaProduk,
          klasifikasi: $scope.item.klasifikasi.id,
          statusEnabled: statusEnabled,
          kdProfile: 0,
        };

        if ($scope.item.produkId) {
          dataSave.id = $scope.item.produkId;
        }

        $scope.checkDuplicateData();

        manageSdmNew
          .saveData(dataSave, "iki-remunerasi/save-produk-perawat")
          .then((res) => {
            $scope.getData();
            $scope.reset();
            $scope.popup.close();
          });
      };

      //   http://192.168.12.3:8080/jasamedika-sdm/iki-remunerasi/get-duplicate-produk-perawat?namaProduk=tes nama produk perawat 2&kdKlasif=1&produkId=
      $scope.checkDuplicateData = () => {
        let paramProductId = "";
        if ($scope.item.produkId)
          paramProductId = `&produkId=${$scope.item.produkId}`;
        manageSdmNew
          .getListData(
            `iki-remunerasi/get-duplicate-produk-perawat?namaProduk=${$scope.item.namaProduk ? $scope.item.namaProduk : ""
            }&kdKlasif=${$scope.item.klasifikasi ? $scope.item.klasifikasi.id : ""
            }${paramProductId}`
          )
          .then((res) => {
            if (res.data.data.length > 0) {
              $scope.isDuplicated = true;

              toastr.info("Data sudah ada");
            } else {
              $scope.isDuplicated = false;
            }
          });
      };
    },
  ]);
});
