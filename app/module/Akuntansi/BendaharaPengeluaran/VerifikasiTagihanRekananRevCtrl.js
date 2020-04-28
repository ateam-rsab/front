define(['initialize'], function (initialize) {
  'use strict';
  initialize.controller('VerifikasiTagihanRekananRevCtrl', ['CacheHelper', '$timeout', '$q', '$rootScope', '$scope', 'ManageSdm', '$state', 'DateHelper',
    function (cacheHelper, $timeout, $q, $rootScope, $scope, manageSdm, $state, dateHelper) {
      $scope.item = {};
      $scope.dataGrid = new kendo.data.DataSource({
        data: [],
        pageSize: 10,
        serverPaging: false,

      });

      $scope.columnGrid = [{
          // "field": "tglTerimaKiriman",
          "title": "No",
          "width": "70px"
        },
        {
          // "field": "noFaktur",
          "title": "No Faktur",
          // "template": "<span class='style-center'>{{'#: noFaktur #'}}</span>",
          "width": "80px"
        },
        {
          // "field": "namaRekanan",
          "title": "No. SPK",
          "width": "200px"
        },
        {
          // "field": "totalHarusDibayar",
          "title": "Nilai Faktur",
          "template": "<span class='style-right'>{{formatRupiah('#: totalHarusDibayar #', 'Rp.')}}</span>",
          "width": "100px"
        },
        {
          // "field": "status",
          "title": "Nilai yang dibayarkan",
          "template": "<span class='style-center'>{{'#: status #'}}</span>",
          "width": "80px"
        }
      ];
    }
  ]);
});