define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('VerifikasiUraianTugasPegawaiLoginCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', 'ManageSdm', 'ManageSdmNew', 'DateHelper', '$state','$mdDialog','CetakHelper',
		function($q, $rootScope, $scope, ModelItem, ManageSdm, ManageSdmNew, DateHelper, $state,$mdDialog,CetakHelper) {
			$scope.now = new Date();
			$scope.item = {
				tanggal: $scope.now
			};
			$scope.dataGridUraiantugas = {
				editable: { mode: "popup", window: {
					title: "Uraian Tugas Pegawai",
					width: "auto"
				} },
				columns: [
					{
						field: "noRec",
						title: "",
						hidden: true
					},{
						field: "namaPegawai",
						title: "Nama Pegawai"
					},{
						field: "rincianKegiatan",
						title: "Nama Kegiatan"
					},
					{
						field: "waktu",
						title: "Waktu(mnt)",
						width: "5%"
					},
					{
						field: "volume",
						title: "Volume",
						width: "5%"
					},
					{
						field: "satuan",
						title: "Satuan",
						width: "5%"
					},{
						field: "namaAtasan",
						title: "Nama Atasan"
					},{
						field: "idAtasan",
						title: "Atasan"
					},
					{
						field: "approvalStatus",
						title: "Status",
						template: "#if(approvalStatus){# #: 'disetujui' # #} else {# #: '-' # #}#",
					},
                    {  template: "<button type='button' class='k-button' ng-click='approve($event)'> Approve </button>", width: 65 },
				],
				pageable: true,
				scrollable: false,
				selectable: "row"
			}
			$q.all([
				ModelItem.getPegawai()
			]).then(function(result){
				$scope.pegawai = result[0];
			}, function(error){
				console.log(error);
			}).then(function(){
				ManageSdmNew.getListData("sdm/get-pegawai-bawahan/" + $scope.pegawai.id).then(function(res){
					if(res.data.data.length > 0){
						$scope.listPegawaiBawahan = res.data.data
					}
					$scope.loadGrid();
				})
			})
			$scope.loadGrid = function(){
                ManageSdmNew.getListData("sdm/get-list-uraian-tugas-bawahan/"+$scope.pegawai.id).then(function(result){
                    var tempData = result.data.data, gridData = [];
                    $scope.dataSource = new kendo.data.DataSource({
                        pageSize: 14,
                        data: tempData,
                        schema: {
                            model: {
                                id: "noRec",
                                fields: {
                                    noRec: {editable: false},
                                    rincianKegiatan: {editable: true, validation: { 
                                        validasiKomponenRincianK: function (input) {
                                        if (input.is("[name='rincianKegiatan']") && input.val() === "") {                        
                                            return false;
                                        }
                                        return true;
                                        }
                                    }},
                                    approvalStatus: {editable: true},
                                    volume: {editable: true, validation: { 
                                        validasiKomponenVolume: function (input) {
                                        if (input.is("[name='volume']") && input.val() === "") {                        
                                            return false;
                                        }
                                        return true;
                                        }
                                    }},
                                    satuan: {editable: true, validation: { 
                                        validasiKomponenSatuan: function (input) {
                                        if (input.is("[name='satuan']") && input.val() === "") {                        
                                            return false;
                                        }
                                        return true;
                                        }
                                    }},
                                    // tgl: {editable: true, validation: { 
                                    // 	validasiKomponenTgl: function (input) {
                                    // 	if (input.is("[name='tgl']") && input.val() === "") {                        
                                    // 		return false;
                                    // 	}
                                    // 	return true;
                                    // 	}
                                    // }},
                                    waktu: {editable: true, validation: { 
                                        validasiKomponenWaktu: function (input) {
                                        if (input.is("[name='waktu']") && input.val() === "") {                        
                                            return false;
                                        }
                                        return true;
                                        }
                                    }},
                                    idPegawai: {editable: true, validation: { 
                                        validasiKomponenPegawai: function (input) {
                                        if (input.is("[name='idPegawai']") && input.val() === "") {                        
                                            return false;
                                        }
                                        return true;
                                        }
                                    }},
                                    idAtasan: {editable: true, validation: { 
                                        validasiKomponenAtasan: function (input) {
                                        if (input.is("[name='idAtasan']") && input.val() === "") {                        
                                            return false;
                                        }
                                        return true;
                                        }
                                    }, defaultValue: $scope.pegawai.id},
                                }
                            }
                        }
                    });
                })
			}
            $scope.approve = function(e){
                var element = $(e.currentTarget);
                
                var checked = element.is(':checked'),
                    row = element.closest("tr"),
                    grid = $("#gridUraianTugas").data("kendoGrid"),
                    dataItem = grid.dataItem(row);
                
                if(dataItem.approvalStatus)
                    return;
                else {
                    $scope.Save(dataItem);
                }
            }
			$scope.Save = function(item){
				var item = {
					"noRec": item.noRec,
					"rincianKegiatan": item.rincianKegiatan,
					"waktu": item.waktu,
					"volume": item.volume,
					"satuan": item.satuan,
					"atasan": {
						"id": $scope.pegawai.id
					},
					"tgl": DateHelper.getTanggalFormattedNew(new Date(item.tgl)),
					"pegawai": {
							"id": item.idPegawai
					},
					"statusEnabled": true,
					"approvalStatus": true
				}
				ManageSdmNew.saveData(item,"sdm/save-uraian-tugas-flexible").then(function(e){
					$scope.loadGrid();
				})
				// alert(JSON.stringify(item));
            }
		}
	]);
});
