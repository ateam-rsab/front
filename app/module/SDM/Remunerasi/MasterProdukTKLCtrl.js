define(["initialize"], function (initialize) {
  "use strict";
  initialize.controller("MasterProdukTKLCtrl", [
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
      $scope.isDuplicated = false;
      $scope.listKdProduk = [
        {
          id: 1,
          kodeProduk: "Pelayanan Pasien",
        },
        {
          id: 2,
          kodeProduk: "Pelayanan Nonpasien",
        },
      ];

      $scope.optGrid = {
        toolbar: [
          {
            text: "export",
            name: "Tambah",
            template:
              '<button ng-click="showPopupAdd()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-plus"></span>Tambah Data</button>',
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
            field: "kodeProduk",
            title: "<h3>Kode Produk</h3>",
            width: 50,
          },
          {
            field: "namaProfesi",
            title: "<h3>Profesi Pelaksana</h3>",
            width: 75,
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

      $scope.getData = () => {
        $scope.isRouteLoading = true;
        manageSdmNew
          .getListData(
            `iki-remunerasi/get-produk-nakes?namaProduk=${
              $scope.src.namaProduk ? $scope.src.namaProduk : ""
            }&kdProduk=${
              $scope.src.kdProduk ? $scope.src.kdProduk.id : ""
            }&profesiId=${$scope.src.profesi ? $scope.src.profesi.id : ""}`
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

        manageSdmNew
          .getListData(
            "service/list-generic/?view=Profesi&select=id,namaProfesi&criteria=statusEnabled&values=true&order=namaProfesi:asc"
          )
          .then((res) => {
            $scope.listProfesi = res.data;
          });
      };
      init();

      $scope.showPopupAdd = () => {
        $scope.reset();
        $scope.popup.open().center();
      };

      $scope.reset = () => {
        $scope.item.namaProduk = "";
        $scope.item.kdProduk = null;
        $scope.item.profesi = null;

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
        $scope.item.profesi = {
          id: dataItem.profesiId,
          namaProfesi: dataItem.namaProfesi,
        };
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
        $scope.item.profesi = {
          id: dataItem.profesiId,
          namaProfesi: dataItem.namaProfesi,
        };
        $scope.popup.open().center();
      }

      $scope.saveData = (statusEnabled) => {
        if ($scope.isDuplicated) {
          return;
        }
        let dataSave = {
          namaProduk: $scope.item.namaProduk,
          kdProduk: $scope.item.kdProduk.id,
          profesi: {
            id: $scope.item.profesi.id,
          },
          statusEnabled: statusEnabled,
          kdProfile: 0,
        };

        if ($scope.item.produkId) {
          dataSave.id = $scope.item.produkId;
        }

        manageSdmNew
          .saveData(dataSave, "iki-remunerasi/save-produk-nakes")
          .then((res) => {
            $scope.getData();
            $scope.reset();
            $scope.popup.close();
          });
      };

      $scope.checkDuplicateData = () => {
        let paramProductId = "";
        if ($scope.item.produkId)
          paramProductId = `&produkId=${$scope.item.produkId}`;
        manageSdmNew
          .getListData(
            `iki-remunerasi/get-duplicate-produk-nakes?namaProduk=${
              $scope.item.namaProduk ? $scope.item.namaProduk : ""
            }&profesiId=${
              $scope.item.profesi ? $scope.item.profesi.id : ""
            }${paramProductId}`
          )
          .then((res) => {
            if (res.data.data.length > 0) {
              $scope.isDuplicated = true;

              toastr.info("Data sudah ada")
            } else {
              $scope.isDuplicated = false;
            }
          });
      };
    },
  ]);
});
