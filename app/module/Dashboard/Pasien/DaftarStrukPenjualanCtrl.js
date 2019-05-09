define(['initialize'], function(initialize){
	'use strict';
	initialize.controller('DaftarStrukPenjualanCtrl', ['$rootScope', '$scope', '$state', '$mdDialog', 'ModelItem', 'DateHelper','FindPasien','ManagePasien',
		function($rootScope, $scope, $state, $mdDialog, ModelItem, DateHelper,findPasien, ManagePasien){
			$scope.item = {};
			ModelItem.get("Daftar Pasien").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
          		
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			
			findPasien.getDaftarPenjualanObatPesanBaru().then(function(e){
				$scope.ListDaftar = e.data.data.list;
				

				$scope.sourceDaftarPasien = new kendo.data.DataSource({
					pageSize: 10,
					data:$scope.ListDaftar
				});
			});

			$scope.dataSelectedRow={};
			$scope.sourceDaftarPasien = new kendo.data.DataSource({
				pageSize: 10,
				data:$scope.ListDaftar
			});

			$scope.mainGridOptions = {
                pageable: true,
                scrollable:false,
                columns: [{
					"field": "noCm",
					"title": "<h3 align=center>No CM<h3>",
					"width": "100px"
				}, {
					"field": "namaPasien",
					"title": "<h3 align=center>Nama Pasien<h3>",
					"width": "300px"
				},{
					"field": "noOrder",
					"title": "<h3 align=center>No Struk</h3>",
					"width": "150px"
				}, {
					"field": "noResep",
					"title": "<h3 align=center>No Resep<h3>",
					"width": "100px"
				}, {
					template: "#= new moment(new Date(tglResep)).format('DD-MM-YYYY HH:mm:ss') #",
					"field": "tglResep",
					"title": "<h3 align=center>Tgl Resep</h3>",
					"width": "150px"
				}, {
					template: "#= new moment(new Date(tglAmbilResep)).format('DD-MM-YYYY HH:mm:ss') #",
					"field": "tglAmbilResep",
					"title": "<h3 align=center>Tgl Struk<h3>",
					"width": "150px"
				},{
					"field": "namaLengkapAmbilResep",
					"title": "<h3 align=center>Nama Pengambil</h3>",
					"width": "150px"
				},{
					"field": "namaPemberi",
					"title": "<h3 align=center>Nama Pemberi</h3>",
					"width": "150px"
	            }]
		    };

		    $scope.isShowPopUp = false;

		    $scope.ObatAmbil = function(ev){
		    	debugger;

		    	if($scope.dataSelectedRow.noOrder === undefined)
		    	{
                    validasi();
                }else if($scope.dataSelectedRow.namaLengkapAmbilResep === undefined)
                {
                    alert("Transaksi Sudah Terjadi !!!");
                }else {
                	var myWindow = $("#winPopUp");
						myWindow.data("kendoWindow").open();
						$scope.isShowPopUp = true;
				}
		    };

		    $scope.validasi= function(){
		    	var confirm = $mdDialog.confirm()
			          .title('Validasi')
			          .textContent('Data belum di pilih !!!')
			          .ariaLabel('Lucky day')
			          .cancel('Ok')
            };

		    // $(document).ready(function () {
		    //     var dialog = $('#dialog'),
		    //         undo = $("#undo");

		    //     undo.click(function () {
		    //         dialog.data("kendoDialog").open();
		    //         undo.fadeOut();
		    //     });

		    //     function onClose() {
		    //         undo.fadeIn();
		    //     }
		        
		    //     dialog.kendoDialog({
		    //         width: "400px",
		    //         title: "Software Update",
		    //         closable: false,
		    //         modal: false,
		    //         content: "<p>A new version of <strong>Kendo UI</strong> is available. Would you like to download and install it now?<p>",
		    //         actions: [
		    //             { text: 'Skip this version' },
		    //             { text: 'Remind me later' },
		    //             { text: 'Install update', primary: true }
		    //         ],
		    //         close: onClose
		    //     });
		    // });

			$scope.klik = function(r){
				console.log(JSON.stringify(r));
				$scope.current = r;
			}

			$scope.diagramKartesius = function(){
				$state.go("DiagramKartesius")
			}
	}])
})