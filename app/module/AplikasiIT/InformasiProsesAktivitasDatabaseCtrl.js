define(['initialize'], function (initialize) {
  'use strict'
  initialize.controller('InformasiProsesAktivitasDatabaseCtrl', ['$q', 'DateHelper', 'ManageSdmNew', '$state', '$rootScope', '$scope', '$mdDialog',
    function ($q, dateHelper, manageSdmNew, $state, $rootScope, $scope, $mdDialog) {
      $scope.item = {};
      $scope.intervalRefresh = 120; // second
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
        pageable: true,
        scrollable: true,
        columns: [
          {
            field: "no",
            title: "<h3>No.</h3>",
            width: 30,
          }, {
            field: "pid",
            title: "<h3>PID</h3>",
            width: 60,
          }, {
            field: "state",
            title: "<h3>State</h3>",
            width: 60,
          }, {
            field: "duration",
            title: "<h3>Duration</h3>",
            width: 100,
          }, {
            field: "query",
            title: "<h3>Query</h3>",
            width: 100,
          },
          {
            command: [{
              text: "Terminate",
              click: terminate,
              // imageClass: "k-icon k-i-",
            }, {
              text: "Cancel",
              click: cancel,
              // imageClass: "k-icon k-i-",
            }],
            title: "",
            width: 70,
          },
        ],
      };

      function terminate(e) {
        e.preventDefault();
        var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

        var confirm = $mdDialog
          .confirm()
          .title(`Apakah anda yakin akan Terminate State`)
          // .textContent("Anda akan mengubah data " + dataItem. + "")
          .ariaLabel("Lucky day")
          .targetEvent(e)
          .ok("Ya")
          .cancel("Tidak");

        $mdDialog.show(confirm).then(function () {
          $scope.isRouteLoading = true;

          manageSdmNew.saveData({}, `integrasi/pg-stat-activity/terminate-backend?pid=${dataItem.pid}`).then((res) => {
            $scope.isRouteLoading = false;
            init();
          });
        }, () => { });
      }

      function cancel(e) {
        e.preventDefault();
        var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

        var confirm = $mdDialog
          .confirm()
          .title(`Apakah anda yakin akan Cancel State`)
          // .textContent("Anda akan mengubah data " + dataItem. + "")
          .ariaLabel("Lucky day")
          .targetEvent(e)
          .ok("Ya")
          .cancel("Tidak");

        $mdDialog.show(confirm).then(function () {
          $scope.isRouteLoading = true;

          manageSdmNew.saveData({}, `integrasi/pg-stat-activity/cancel-backend?pid=${dataItem.pid}`).then((res) => {
            $scope.isRouteLoading = false;
            init();
          });
        }, () => { });

      }

      $scope.refresh = () => {
        setTimeout(() => {
          $scope.getData();
        }, $scope.intervalRefresh * 1000)
      }

      $scope.getData = () => {
        manageSdmNew.getListData('integrasi/pg-stat-activity/in-state-for-minutes').then(res => {
          for (let i = 0; i < res.data.data.length; i++) {
            res.data.data[i].no = i + 1;
          }
          $scope.dataSource = new kendo.data.DataSource({
            data: res.data.data,
            pageSize: 100
          })
          $scope.refresh();
        })
      }

      let init = () => {
        $scope.refresh();
        $scope.getData(); 
      }
      init();
    }
  ])
})