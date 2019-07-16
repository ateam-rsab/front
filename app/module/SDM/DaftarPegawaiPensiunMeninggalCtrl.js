define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DaftarPegawaiPensiunMeninggalCtrl', ['$q', '$rootScope', '$scope', 'ModelItem','$state', 'FindSdm', '$timeout', 'ManageSdm', 'ManageSdmNew', 'DateHelper',
		function($q, $rootScope, $scope, ModelItem, $state, FindSdm, $timeout, ManageSdm, ManageSdmNew, dateHelper) {
            //$state.go('UnderMaintenance',  { namaForm: 'DaftarPegawaiPensiunMeninggal' });
            $scope.title = "Data Pegawai Pensiun/Meninggal" ;
			$scope.item = {};
			$scope.isRouteLoading = true;
            $scope.daftarpegawaiOpt = {
                toolbar: [
                    {
                        name: "upload",
                        text: "Upload Contacts",
                        template: '<button ng-click="exportDetail()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-excel"></span>Export to Excel</button>'	
                    }
                ],
                // excel: {
                //     allPages: true,
                //     fileName: "RSAB HK Export Data Pegawai-" + dateHelper.formatDate(new Date(), 'DD-MMM-YYYY HH:mm:ss') +".xlsx"
                // },
                pageable: true,
                pageSize: 10, //page size
                selectable: 'row',
                scrollable: true,
                // filterable: {
                //     extra: false,
                //     operators: {
                //         string: {
                //             startswith: "Dimulai dengan kata",
                //             contains: "Mengandung kata",
                //             neq: "Tidak mengandung kata"
                //         }
                //     }
                // },
                columns: [
                    { field: "nipPns", title: "<h3>Nip</h3>", width: "20%", attributes: { style: "text-align:center;valign=middle" }},
                    { field: "namaLengkap", title: "<h3>Nama Lengkap</h3>", width: "25%" },
                    // { field: "agama", title: "<h3>Agama</h3>", width: "10%" },
                    { field: "unitKerja", title: "<h3>Unit Kerja</h3>", width: "25%" },
                    { field: "subUnitKerja", title: "<h3>SubUnit Kerja</h3>", width: "20%" },
                    { field: "jabatanInternal", title: "<h3>Jabatan Internal</h3>", width: "20%" },
                    { field: "kedudukan", title: "<h3>Kedudukan</h3>", width: "15%" },
                    {
                        command: [
                            {
                                text: "Lihat",
                                width: "40px",
                                align: "center",
                                attributes: {
                                    align: "center"
                                },
                                click: editDataPegawai,
                                imageClass: "k-i-arrow-60-right"
                            }
                        ],
                        title: "",
                        width: "10%",
                        attributes: { style: "text-align:center;valign=middle" },
                    }
                ],
                // set column width to auto
                // excelExport: function(e) {
                //     var columns = e.workbook.sheets[0].columns;
                //     columns.forEach(function(column){
                //         delete column.width;
                //         column.autoWidth = true;
                //     });
                // }
            };

            function editDataPegawai(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                $scope.dataItem = dataItem;
                if ($scope.dataItem) {
                    $state.go("RekamDataPegawai", { idPegawai: $scope.dataItem.idPegawai });
                } else {
                    messageContainer.error('Pegawai belum di pilih')
                }
            }

            $scope.exportDetail = function(e){
                var tempDataExport = [];
                var rows = [{
                    cells: [
                        { value: "NIP" },
                        { value: "Nama Lengkap" },
                        { value: "Agama" },
                        { value: "Unit Kerja" },
                        { value: "Sub Unit Kerja" },
                        { value: "Jabatan Internal" },
                        { value: "Kedudukan"}
                    ]
                }];
                // if($scope.filteredData.length > 0){
                //     tempDataExport = new kendo.data.DataSource({
                //         data: $scope.daftarPegawai
                //     });
                // } else {
                //     tempDataExport = $scope.daftarPegawai;
                // }
                tempDataExport = $scope.daftarPegawai;
                tempDataExport.fetch(function(){
                    var data = this.data();
                    for (var i = 0; i < data.length; i++){
                        //push single row for every record
                        rows.push({
                            cells: [
                                { value: data[i].nipPns },
                                { value: data[i].namaLengkap },
                                { value: data[i].agama },
                                { value: data[i].unitKerja },
                                { value: data[i].jabatanInternal },
                                { value: data[i].kedudukan}
                            ]
                        })
                    }
                    var workbook = new kendo.ooxml.Workbook({
                        sheets: [
                            {
                                freezePane: {
                                    rowSplit: 1
                                },
                                filter: { from: 0, to: 1 },
                                columns: [
                                    // Column settings (width)
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true }                                    
                                ],
                                // Title of the sheet
                                title: "Daftar",
                                // Rows of the sheet
                                rows: rows
                            }
                        ]
                    });
                    //save the file as Excel file with extension xlsx
                    kendo.saveAs({dataURI: workbook.toDataURL(), fileName: "Daftar-Pegawai-Pensiun/Meninggal.xlsx"});
                });
            };

            $q.all([
                ManageSdm.getOrderList("service/list-generic/?view=Jabatan&select=id,namaJabatan&criteria=jenisJabatan&values=3", true),
                // FindSdm.getSubUnitKerja(),
                ManageSdmNew.getListData("sdm/get-all-sub-unit-kerja"),
                // FindSdm.getUnitKerja(),
                ManageSdmNew.getListData("sdm/get-all-unit-kerja"),
                ManageSdmNew.getListData("sdm/get-all-kedudukan"),
                ManageSdmNew.getListData("pegawai/get-pegawai-meninggal-pindah-pensiun-no-paging/")
            ]).then(function(result){
                $scope.ListJabatanInternal = result[0].data;
                $scope.listSubUnitKerja = result[1].data.data;
                $scope.listUnitKerja = result[2].data.data;
                // $scope.ListKedudukanPegawai = result[3].data.data;
                if(result[3].statResponse){
                    var toRemove = [3, 4, 5, 24, 25],
                        listKedudukan = result[3].data.data;

                    $scope.ListKedudukanPegawai = listKedudukan.filter( function (el){
                        return toRemove.includes( el.id );
                    })
                }
                if(result[4].statResponse){
                    var data = result[4].data.data.pegawai
                    for (let i in data){
                        data[i].tglLahir = moment(data[i].tglLahir ).format('DD-MM-YYYY')
                    }
                    $scope.daftarPegawai = new kendo.data.DataSource({
                        data: data,
                        pageSize: 10,
                        total: data.length,
                        serverPaging: false
                    });
                }
                $scope.isRouteLoading = false;
            }, (err) => {
                console.log(err);
            })
            // FindSdm.getListData("pegawai/get-pegawai-meninggal-pindah-pensiun-no-paging/").then(function(res) {
			// 	var data = res.data.data.pegawai
			// 	$scope.daftarPegawai = new kendo.data.DataSource({
            //         data: data,
            //         pageSize: 10,
            //         total: data.length,
            //         serverPaging: false
            //     });
            //     $scope.isRouteLoading = false;
            // });
            $scope.lihatDetil = function() {
                $state.go("RekamDataPegawai", { idPegawai: $scope.dataItem.idPegawai });
            }
            $scope.keluarga = function() {
                $state.go("DataKeluarga", { idPegawai: $scope.dataItem.idPegawai });
            }
            $scope.riwayat = function(data){
                if(!data){
                    messageContainer.error('data belum di pilih');
                    return;
                }
                // FindSdm.getHistoryDataPg(data.idPegawai).then(function(res){
                ManageSdmNew.getListData("sdm/get-list-history-pegawai/" + parseInt(data.idPegawai)).then(function(res){
                    if(res.data.data.length > 0){
                        $scope.title = "Histori Perubahan Data Pegawai" ;
                        $scope.optHistoriPegawai = {
                            selectable: "row",
                            columns: [
                                { field: "tanggal", title: "Tanggal", width: "10%", template: "#= kendo.toString(new Date(tanggal), \"dd/MM/yyyy\") #" },
                                { field: "perubahan", title: "Perubahan", width: "64%" },
                                { field: "petugas", title: "Petugas", width: "20%" },
                                {command: [{text: "Detil", click: showDetail}], title: "&nbsp;", width: "6%"}
                            ]
                        }
                        $scope.dataHistoriPegawai = new kendo.data.DataSource({
                            data: res.data.data,
                            pageSize: 10
                        });
                        $scope.klikRiwayat = true;
                    } else {
                        messageContainer.log('Belum ada histori')
                    }
                })
            }
            function showDetail(e){
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

                // FindSdm.getDetilHistoriDataPg(dataItem.id).then(function(res){
                ManageSdmNew.getListData("sdm/get-detail-history-pegawai/" + dataItem.id).then(function(res){
                    var dataObject = res.data.data;
                    dataObject.tglPerubahan = dataItem.tanggal;
                    dataObject.namaPetugas = dataItem.petugas;
                    if(dataObject){
                        for(var key in dataObject){
                            if(dataObject.hasOwnProperty(key)){
                                if(key.indexOf("tgl") >= 0){
                                    dataObject[key] = dateHelper.formatDate(dataObject[key], "DD-MM-YYYY");
                                }
                            }
                        }
                        $scope.popupHistory.setOptions({
                            width: "90%",
                            height: "80%",
                            title: 'Rekam Data Pegawai'
                        });
                        $scope.dataDetil = dataObject;
                        $scope.popupHistory.center().open();

                    } else {
                        messageContainer.log("Data tidak ditemukan");
                    }
                }, (error) => {
                    throw error;
                })
            }
            $scope.closeHistory = function(){
                $scope.title = "Data Pegawai Pensiun/Meninggal" ;
                $scope.klikRiwayat = false;
            }
            var timeoutPromise;
            $scope.$watch('item.qnamaPegawai', function(newVal, oldVal){
                if(!newVal) return;
                $timeout.cancel(timeoutPromise);
                timeoutPromise = $timeout(function(){
                    if(newVal && newVal !== oldVal){
                        applyFilter("namaLengkap", newVal);
                    }
                }, 500)
            });
            $scope.$watch('item.qkedudukanPegawai', function(newVal, oldVal){
                if(!newVal) return;
                if(newVal && newVal !== oldVal){
                    applyFilter("kedudukan", newVal)
                }
            });
            $scope.$watch('item.qjabatanInternal', function(newVal, oldVal){
                if(!newVal) return;
                if(newVal && newVal !== oldVal){
                    applyFilter("idJabatanInternal", newVal)
                }
            });
            $scope.$watch('item.qunitKerja', function(newVal, oldVal){
                if(!newVal) return;
                if(newVal && newVal !== oldVal){
                    applyFilter("idUnitKerja", newVal)
                }
            });
            function applyFilter(filterField, filterValue){
                var dataGrid = $("#gridDataPegawai").data("kendoGrid");
                var currFilterObject = dataGrid.dataSource.filter();
                var currentFilters = currFilterObject ? currFilterObject.filters : [];

                if(currentFilters && currentFilters.length > 0){
                    for (var i = 0; i < currentFilters.length; i++) {
                        if (currentFilters[i].field == filterField) {
                            currentFilters.splice(i, 1);
                            break;
                        }
                    }
                }

                if (filterField === "namaLengkap") {
                    currentFilters.push({
                        field: filterField,
                        operator: "contains",
                        value: filterValue
                    });
                } else if (filterField === "kedudukan"){
                    currentFilters.push({
                        field: filterField,
                        operator: "eq",
                        value: filterValue.name
                    });
                } else if (filterField === "idJabatanInternal" || filterField === "idUnitKerja"){
                    currentFilters.push({
                        field: filterField,
                        operator: "eq",
                        value: filterValue.id
                    });
                }

                dataGrid.dataSource.filter({
                    logic: "and",
                    filters: currentFilters
                });
            }
            $scope.resetFilters = function(){
                var gridData = $("#gridDataPegawai").data("kendoGrid");
                gridData.dataSource.filter({});
                $scope.item = {};
            };
			
		}
	]);
});