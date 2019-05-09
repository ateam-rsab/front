define(['initialize'], function(initialize) {
'use strict';
initialize.controller('RekananDetailCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
function($q, $rootScope, $scope, IPSRSService) {
$scope.dataVOloaded = true;
$scope.now = new Date();


$scope.dataRekananDetail = new kendo.data.DataSource({
data: []
});
$scope.columnRekananDetail = [
{
"field": "No",
"title": "No"
},
{
"field": "alamatEmail",
"title": "alamat Email"
},
{
"field": "contactPerson",
"title": "contact Person"
},
{
"field": "faksimile",
"title": "faksimile"
},
{
"field": "fixedPhone",
"title": "fixed Phone"
},
{
"field": "rekanan",
"title": "rekanan"
},
{
"field": "rekananId",
"title": "rekanan Id"
},
{
"field": "unitBagian",
"title": "unit Bagian"
},
{
"field": "unitBagianId",
"title": "unit Bagian Id"
},
{
"field": "keteranganLainnya",
"title": "keterangan Lainnya"
},
{
"field": "mobilePhone",
"title": "mobile Phone"
},
{
"field": "noKode_Intern",
"title": "no Kode _Intern"
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