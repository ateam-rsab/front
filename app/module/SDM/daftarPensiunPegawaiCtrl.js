define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('daftarPensiunPegawaiCtrl', ['$q', '$rootScope', '$scope', '$state', 'ModelItem', 'ManageSdmNew', 'DateHelper', 'FindPegawai',
		function($q, $rootScope, $scope, $state, ModelItem, ManageSdmNew, dateHelper, findPegawai) {
            $scope.loadInit = function() {
                $scope.item = {
                    periodeAwal: new Date(),
                    periodeAkhir: new Date()
                };
            };
            $scope.opsiDataPensiun = {
                toolbar: ["excel"],
                excelExport: function(e) {
                e.workbook.fileName = kendo.toString(new Date, "dd/MM/yyyy HH:mm") + " DaftarPegawaiPensiun.xlsx";
                },

                pageable: true,
                scrollable: false,
                columns: [
                    {field: "namaLengkap", title: "Nama Pegawai"},
                    {field: "nip", title: "NIP"},
                    {field: "golongan", title: "Golongan"},
                    {field: "unitKerja", title: "Unit Kerja", template: "# if (unitKerja == null){ # #: '-' # # }else{# #= unitKerja # #}#"},
                    {field: "subUnitKerja", title: "Sub Unit Kerja", template: "# if (subUnitKerja == null){ # #: '-' # # }else{# #= subUnitKerja # #}#"},
                    {field: "tglLahir", title: "Tgl Lahir", template: "#= kendo.toString(new Date(tglLahir), \"dd/MM/yyyy\") #"},
                    {field: "tglpensiun", title: "Tgl Pensiun", template: "#= kendo.toString(new Date(tglpensiun), \"dd/MM/yyyy\") #"},
                ],
                sortable: true
            }
            $scope.loadInit();
            $scope.findData = function(){
                // findPegawai.getDaftarPensiun(DateHelper.getFormatMonthPicker($scope.item.periodeAwal), DateHelper.getFormatMonthPicker($scope.item.periodeAkhir)).then(function(res){
                ManageSdmNew.getListData("pegawai/get-pegawai-pensiun/"+dateHelper.getFormatMonthPicker($scope.item.periodeAwal)+"/" + dateHelper.getFormatMonthPicker($scope.item.periodeAkhir)).then(function(res){
                    $scope.dataPensiun = new kendo.data.DataSource({
                        data: res.data.data,
                        pageSize: 25
                    });
                })
            }
            $scope.yearSelected = { 
                format: "MMMM yyyy",
                start: "year", 
                depth: "year" 
            };
		}
	]);
});