define(['initialize'], function(initialize) { 
'use strict';
initialize.controller('DaftarRABUnitKerjactrl', ['$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'ManageAkuntansi',
function($q, $rootScope, $scope, modelItemAkuntansi, manageAkuntansi) {
$scope.dataVOloaded = true;
$scope.now = new Date();



$scope.dataRABUnitKerja = new kendo.data.DataSource({
data: [{"No":"1","tglPengajuan":"2016-12-12","unitKerja":"Farmasi","Detail":"link: Detail","TOR":"link: TOR","Status":"-"}]
});
$scope.columnRABUnitKerja = [
{
"field": "No",
"title": "No"
},
{
"field": "tglPengajuan",
"title": "Tanggal Pengajuan"
},
{
"field": "unitKerja",
"title": "Unit Kerja"
},
{
"field": "Detail",
"title": "Detail"
},
{
"field": "TOR",
"title": "TOR"
},
{
"field": "Status",
"title": "Status"
}
];

}
]);
});