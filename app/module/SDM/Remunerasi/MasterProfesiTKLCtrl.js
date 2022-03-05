define(["initialize"], function (initialize) {
  "use strict";
  initialize.controller("MasterProfesiTKLCtrl", [
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

      $scope.listJenisProfesi = [
        {
          id: 1,
          jenisProfesi: "PPA",
        },
        {
          id: 2,
          jenisProfesi: "Non-PPA",
        }
      ]

      $scope.optGrid = {
        filterable: {
          extra: false,
          operators: {
            string: {
              startswith: "Dimulai dengan",
              contains: "mengandung kata",
              neq: "Tidak mengandung kata",
            },
          },
        },
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
            field: "no",
            title: "<h3>No.</h3>",
            width: 10,
            // filterable: false,
          },
          {
            field: "namaProfesi",
            title: "<h3>Nama Profesi</h3>",
            width: 100,
            // filterable: true,
          },
          {
            field: "jenisProfesi",
            title: "<h3>Jenis Profesi</h3>",
            width: 50,
            template: "#if(jenisProfesi == 1){#PPA#}else{#Non-PPA#}#",
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
            width: 20,
          },
        ],
      };

      $scope.getData = () => {
        $scope.isRouteLoading = true;
        manageSdmNew
          .getListData(`iki-remunerasi/get-profesi-nakes`)
          .then((res) => {

            for (let i = 0; i < res.data.data.length; i++) {
              res.data.data[i].no = i + 1;
            }

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
        $scope.item.profesiId = undefined;
        $scope.item.namaProfesi = "";
        $scope.item.jenisProfesi = null;
      };

      $scope.closePopUp = () => {
        $scope.reset();

        $scope.popup.close();
      }

      function confirmHapus(e) {
        e.preventDefault();
        var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
        $scope.reset();

        $scope.item.namaProfesi = dataItem.namaProfesi;
        $scope.item.profesiId = dataItem.id;

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

        $scope.item.namaProfesi = dataItem.namaProfesi;
        $scope.item.profesiId = dataItem.id;
        $scope.item.jenisProfesi = {
          id: dataItem.jenisProfesi,
          jenisProfesi: dataItem.jenisProfesi == 1 ? "PPA" : "Non-PPA"
        };
        $scope.popup.open().center();
      }

      $scope.saveData = (statusEnabled) => {
        let dataSave = {
          namaProfesi: $scope.item.namaProfesi,
          jenisProfesi: $scope.item.jenisProfesi.id,
          statusEnabled: statusEnabled,
          kdProfile: 0,
        };

        if ($scope.item.profesiId) {
          dataSave.id = $scope.item.profesiId;
        }

        console.log(dataSave);
        // http://192.168.12.3:8080/jasamedika-sdm/iki-remunerasi/save-profesi-nakes
        manageSdmNew
          .saveData(dataSave, "iki-remunerasi/save-profesi-nakes")
          .then((res) => {
            $scope.getData();
            $scope.reset();
            $scope.popup.close();
          });
      };
    },
  ]);
});
