define(['initialize'], function(initialize) {
'use strict';
initialize.controller('KontrakKinerjaCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
function($q, $rootScope, $scope, IPSRSService) {
$scope.dataVOloaded = true;
$scope.now = new Date();


$scope.dataKontrakKinerja = new kendo.data.DataSource({
data: []
});
$scope.columnKontrakKinerja = [
{
"field": "No",
"title": "No"
},
{
"field": "unitKerja",
"title": "unit Kerja"
},
{
"field": "unitKerjaId",
"title": "unit Kerja Id"
},
{
"field": "kamusIndikator",
"title": "kamus Indikator"
},
{
"field": "kamusIndikatorId",
"title": "kamus Indikator Id"
},
{
"field": "peran",
"title": "peran"
},
{
"field": "peranId",
"title": "peran Id"
},
{
"field": "tahun",
"title": "tahun"
},
{
"field": "pencapaian",
"title": "pencapaian"
},
{
"field": "bobot",
"title": "bobot"
},
{
"field": "program",
"title": "program"
},
{
"field": "reportDisplay",
"title": "report Display"
},
{
"field": "kodeExternal",
"title": "kode External"
},
{
"field": "namaExternal",
"title": "nama External"
},
{
"field": "statusEnabled",
"title": "status Enabled"
}
];

}
]);
});