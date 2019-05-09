define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DaftarPegawaiPensiunMeninggalCtrl', ['$q', '$rootScope', '$scope', 'ModelItem','$state', 'FindSdm', '$timeout', 'ManageSdm', 'ManageSdmNew', 'DateHelper',
		function($q, $rootScope, $scope, ModelItem, $state, FindSdm, $timeout, ManageSdm, ManageSdmNew, dateHelper) {
            $scope.title = "Data Pegawai Pensiun/Meninggal" ;
			$scope.item = {};
			$scope.isRouteLoading = true;
            $scope.daftarpegawaiOpt = {
                // toolbar: ["excel",{
                //     name: "upload",
                //     text: "Upload Contacts",
                //     template: '<button ng-click="exportDetail()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-excel"></span>Export All to Excel</button>'	
                //   }],
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
                    { field: "nipPns", title: "Nip", width: "10%" },
                    { field: "namaLengkap", title: "Nama Lengkap", width: "25%" },
                    { field: "agama", title: "Agama", width: "10%" },
                    { field: "unitKerja", title: "Unit Kerja", width: "25%" },
                    { field: "subUnitKerja", title: "SubUnit Kerja", width: "20%" },
                    { field: "jabatanInternal", title: "Jabatan Internal", width: "20%" },
                    { field: "kedudukan", title: "Kedudukan", width: "20%" }
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