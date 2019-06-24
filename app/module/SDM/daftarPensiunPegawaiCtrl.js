define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('daftarPensiunPegawaiCtrl', ['$q', '$rootScope', '$scope', '$state', 'ModelItem', 'ManageSdmNew', 'DateHelper', 'FindPegawai',
		function($q, $rootScope, $scope, $state, ModelItem, ManageSdmNew, dateHelper, findPegawai) {
            $scope.loadInit = function() {
                $scope.item = {
                    periodeAwal: new Date(),
                    periodeAkhir: new Date()
                };
                ManageSdmNew.getListData("pegawai/get-pegawai-pensiun/"+dateHelper.getFormatMonthPicker($scope.item.periodeAwal)+"/" + dateHelper.getFormatMonthPicker($scope.item.periodeAkhir)).then(function(res){
                    $scope.dataPensiun = new kendo.data.DataSource({
                        data: res.data.data,
                        pageSize: 25
                    });
                })
            };
            $scope.opsiDataPensiun = {
                toolbar: [
                    {
                        text: "export",
                        name:"Export detail",
                        template: '<button ng-click="exportDataRencanaPensiun()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-excel"></span>Export to Excel</button>'
                    }
                ],
                pageable: true,
                scrollable: false,
                columns: [
                    {field: "namaLengkap", title: "<h3>Nama Pegawai</h3>"},
                    {field: "nip", title: "<h3>NIP</h3>"},
                    {field: "golongan", title: "<h3>Golongan</h3>"},
                    {field: "unitKerja", title: "<h3>Unit Kerja</h3>", template: "# if (unitKerja == null){ # #: '-' # # }else{# #= unitKerja # #}#"},
                    {field: "subUnitKerja", title: "<h3>Sub Unit Kerja</h3>", template: "# if (subUnitKerja == null){ # #: '-' # # }else{# #= subUnitKerja # #}#"},
                    {field: "tglLahir", title: "<h3>Tanggal Lahir</h3>", template: "#= kendo.toString(new Date(tglLahir), \"dd/MM/yyyy\") #"},
                    {field: "tglpensiun", title: "<h3>Tanggal Pensiun</h3>", template: "#= kendo.toString(new Date(tglpensiun), \"dd/MM/yyyy\") #"},
                ],
                sortable: true
            }

            $scope.exportDataRencanaPensiun = function () {
                var fileName = '';
                if(dateHelper.toTimeStamp($scope.item.periodeAwal) === dateHelper.toTimeStamp($scope.item.periodeAkhir) || dateHelper.toTimeStamp($scope.item.periodeAkhir) === dateHelper.toTimeStamp($scope.item.periodeAwal)) {
                    fileName = "Daftar-Rencana-Pensiun-Pegawai-" + dateHelper.getPeriodFormat($scope.item.periodeAwal) + ".xlsx";
                } else {
                    fileName = "Daftar-Rencana-Pensiun-Pegawai-" + dateHelper.getPeriodFormat($scope.item.periodeAwal)  + "-s/d-" + dateHelper.getPeriodFormat($scope.item.periodeAkhir) + ".xlsx";
                }
                var tempDataExport = [];
                var rows = [{
                    cells: [
                        { value: "Nama Pegawai" },
                        { value: "NIP" },
                        { value: "Golongan" },
                        { value: "Unit Kerja" },
                        { value: "Sub Unit Kerja" },
                        { value: "Tanggal Lahir" },
                        { value: "Tanggal Pensiun" }
                    ]
                }];
                tempDataExport = $scope.dataPensiun;
                tempDataExport.fetch(function(){
                    var data = this.data();
                    for (var i = 0; i < data.length; i++){
                        //push single row for every record
                        rows.push({
                            cells: [
                                { value: data[i].namaLengkap },
                                { value: data[i].nip },
                                { value: data[i].golongan },
                                { value: data[i].unitKerja },
                                { value: data[i].subUnitKerja },
                                { value: dateHelper.toDateFromTimestamp(data[i].tglLahir) },
                                { value: dateHelper.toDateFromTimestamp(data[i].tglpensiun) },
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
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true }
                                ],
                                // Title of the sheet
                                title: "Daftar-Rencana-Pensiun-Pegawai",
                                // Rows of the sheet
                                rows: rows
                            }
                        ]
                    });
                    //save the file as Excel file with extension xlsx
                    kendo.saveAs({dataURI: workbook.toDataURL(), fileName: fileName});
                });
            }

            $scope.loadInit();
            
            $scope.findData = function(){
                // findPegawai.getDaftarPensiun(DateHelper.getFormatMonthPicker($scope.item.periodeAwal), DateHelper.getFormatMonthPicker($scope.item.periodeAkhir)).then(function(res){
                ManageSdmNew.getListData("pegawai/get-pegawai-pensiun/" + dateHelper.getFormatMonthPicker($scope.item.periodeAwal)+ "/" + dateHelper.getFormatMonthPicker($scope.item.periodeAkhir)).then(function(res){
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