define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('PenangananCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageIPSRS', 'IPSRSService', '$state', '$location', '$mdDialog', 'DateHelper', 'ManagePhp', 'ModelItemAkuntansi', 'CacheHelper',
		function ($rootScope, $scope, ModelItem, ManageIPSRS, IPSRSService, $state, $location, $mdDialog, DateHelper, ManagePhp, modelItemAkuntansi, cacheHelper) {
				var data2 = [];
				var data3 = [];
				var noRut;
				$scope.item = {};
				var tampungNorec;
				var chaceRespon = cacheHelper.get('PenangananCtrl');
				if (chaceRespon != undefined) {
					$scope.item.noOrder = chaceRespon[0]
					$scope.item.tglOrder = chaceRespon[1]
					tampungNorec  = chaceRespon[2]

					$scope.isRouteLoading=true;
	                ManagePhp.getData("ip3rs/get-daftar-permintaan-perbaikan-det?"
	                    +"noOrder=" + $scope.item.noOrder, true)
	                .then(function(data){
	                       $scope.isRouteLoading=false;   
		                   for (var i = 0; i < data.data.daftar.length; i++) {
                        		data.data.daftar[i].no = i+1
                    		}
                    		$scope.dataGrid = data.data.daftar;
	                });
				}
				ManagePhp.getData("ip3rs/get-combo-suku-cadang?").then(function(datt) {
					    $scope.listNamaSukuCadang = datt.data.data;
				});
				ManagePhp.getData("ip3rs/get-status-produk-ip3rs?").then(function(datt) {
					    $scope.listStatus = datt.data.daftar;
				});
				ManagePhp.getData("ip3rs/get-teknisi-ip3rs?").then(function(datt) {
					    $scope.listNamaTeknisi = datt.data.daftar;
				});
				ManagePhp.getData("ip3rs/get-satuan-ip3rs?").then(function(datt) {
					    $scope.listSatuan = datt.data.daftar;
				});
		        // DATAGRID
		        $scope.columnGrid = [
		        {
		            "field": "no",
		            "title": "No",
		            "width" : "30px",
		        },
		        {
		            "field": "kdproduk",
		            "title": "Kode Sirs",
		            "width" : "70px",
		        },
		        {
		            "field": "prid",
		            "title": "Kode Smart",
		            "width" : "100px",
		        },
		        {
		            "field": "namaproduk",
		            "title": "kerusakanalt/gdg",
		            "width" : "60px",
		        },
		        {
		            "field": "ruanganasal",
		            "title": "Ruangan Asal",
		            "width" : "80px",
		        },
		        {
		            "field": "ruangantujuan",
		            "title": "Ruangan Tujuan",
		            "width" : "80px",
		        },
		        {
		            "field": "keteranganlainnya",
		            "title": " Ket Kerusakan/Keluhan",
		            "width" : "100px",
		        }
		        ];

		        // GRID2 
		        $scope.columnGrid2 = {
			        columns:[
				        {
				            "field": "no",
				            "title": "No",
				            "width" : "30px",
				        },
				        {
				            "field": "kdproduk",
				            "title": "Kd produk",
				            "width" : "70px",
				        },
				        {
				            "field": "namaproduk",
				            "title": "Nama Produk",
				            "width" : "100px",
				        },
				        {
				            "field": "qty",
				            "title": "Qty",
				            "width" : "60px",
				        },
				        {
				            "field": "satuan",
				            "title": "Satuan",
				            "width" : "60px",
				        },
				        {
				            "field": "status",
				            "title": "Status",
				            "width" : "60px",
				        },
				        {
				        	"command":[
				        	{text:"Hapus", click:Hapus, imageClass:"k-icon k-i-trash"}
				        	],
				        	title:"",
				        	width:"85px"
				        }
			        ],

			        toolbar: [
		                {
		                    "name": "add",
		                    "text": "Tambah",
		                    "template": '<a ng-click="onClick()" class="k-button k-button-icontext k-grid-upload">Tambah</a>'	
		                },
		                 {
		                    "name": "edit",
		                    "text": "Edit",
		                    "template": '<a ng-click="editGrid()" class="k-button k-button-icontext k-grid-upload">Edit</a>'   
		                }
	                ],
	                editable: {
	                    mode: "popup",
	                    window: {
	                        title: "Update Data Kendali Dokumen"
	                    },
	                }

		        }
                
		        // END DATAGRID

		        // GRID2 
		        $scope.columnGrid3 = {
			        columns:[
			        {
			            "field": "no",
			            "title": "No",
			            "width" : "30px",
			        },
			        {
			            "field": "pegawaiid",
			            "title": "Id Teknisi",
			            "width" : "40px",
			        },
			        {
			            "field": "namalengkap",
			            "title": "Nama Teknisi",
			            "width" : "85px",
			        },
			        {
			        	"command":[
			        	{text:"Hapus", click:HapusF, imageClass:"k-icon k-i-trash"}
			        	],
			        	title:"",
			        	width:"40px"
			        }
			        ],
			        toolbar: [
			                {
			                    "name": "add",
			                    "text": "Tambah1",
			                    "template": '<a ng-click="onClick2()" class="k-button k-button-icontext k-grid-upload">Tambah</a>'	
			                }
		            ],
	        	}
		        // END DATAGRID

		        // KLIK GRID
		 //    $scope.klikGrid2 = function(dataSelected){
	  //           var dataProduk =[];            
	  //           $scope.item.noUrut = dataSelected.no
	  //           $scope.item.namaSukuCadang = {
		 //            id: dataSelected.id,
		 //            namaproduk: dataSelected.namaproduk
		 //        }
		 //         $scope.item.ruanganAsal = {
	  //           	id: dataSelected.ruanganasalId,
		 //            namaruangan: dataSelected.ruanganasal
	  //           }
	  //           $scope.item.qtySparePart = dataSelected.qty
			// }
			$scope.onClick = function(){
                $scope.winDialog.center().open();
            }
            $scope.onClick2 = function(){
                $scope.winDialog2.center().open();
            }
            $scope.batal = function(){
                $scope.winDialog.close();
            }

	// END KLIK GRID
		    $scope.tambah = function () {
	            if ($scope.item.qtySparePart == undefined) {
	                alert("Qty harus di isi!")
	                return;
	            }
	            var nomor = $scope.item.noUrut
		            if ($scope.dataGrid2 == undefined) {
		                nomor = 1
		            }else{
		                nomor = data2.length+1
		            }
	            var data ={};
	            if ($scope.item.noUrut != undefined){
	                for (var i = data2.length - 1; i >= 0; i--) {
	                    if (data2[i].no ==  $scope.item.noUrut){
	                       data.no = nomor
	                       data.produkid = $scope.item.namaSukuCadang.id
	                       data.kdproduk = $scope.item.namaSukuCadang.kdproduk
	                       data.namaproduk = $scope.item.namaSukuCadang.namaproduk
	                       data.qty = $scope.item.qtySparePart
	                       data.satuan = $scope.item.satuan.sstujuan
	                       data.satuanstandardid = $scope.item.satuan.sstujuanid
	                       data.status = $scope.item.status.sstujuan
	                       data.statusid = $scope.item.status.id

	                        data2[i] = data;
	                        $scope.dataGrid2 = new kendo.data.DataSource({
	                            data: data2
	                        });
	                    }
	                }

	            }else{
	                data={
	                       no:nomor,
	                       produkid:String($scope.item.namaSukuCadang.id),
	                       kdproduk:String($scope.item.namaSukuCadang.kdproduk),
	                       namaproduk:String($scope.item.namaSukuCadang.namaproduk),
	                       qty:String($scope.item.qtySparePart),
	                       satuan:String($scope.item.satuan.sstujuan),
	                       satuanstandardid:String($scope.item.satuan.sstujuanid),
	                       status:String($scope.item.status.statusproduk),
	                       statusprodukid:String($scope.item.status.id)
	                    }
	                data2.push(data)
	                $scope.dataGrid2 = new kendo.data.DataSource({
	                    data: data2
	                });
	            }
	            $scope.clear()
	            $scope.winDialog.close();
			}

			$scope.tambahTeknisi = function () {
	            if ($scope.item.namaTeknisi == undefined) {
	                alert("Qty harus di isi!")
	                return;
	            }
	            var nomor = $scope.item.noUrut1
		            if ($scope.dataGrid3 == undefined) {
		                nomor = 1
		            }else{
		                nomor = data3.length+1
		            }
	            var data ={};
	            if ($scope.item.noUrut1 != undefined){
	                for (var i = data3.length - 1; i >= 0; i--) {
	                    if (data3[i].no ==  $scope.item.noUrut){
	                       data.no = nomor
	                       data.pegawaiid = $scope.item.namaTeknisi.id
	                       data.namalengkap = $scope.item.namaTeknisi.namalengkap

	                        data3[i] = data;
	                        $scope.dataGrid3 = new kendo.data.DataSource({
	                            data: data3
	                        });
	                    }
	                }

	            }else{
	                data={
	                       no:nomor,
	                       pegawaiid:String($scope.item.namaTeknisi.id),
	                       namalengkap:String($scope.item.namaTeknisi.namalengkap)
	                    }
	                data3.push(data)
	                $scope.dataGrid3 = new kendo.data.DataSource({
	                    data: data3
	                });
	            }
	            $scope.clear1()
	            $scope.winDialog2.close();
			}
			// SIMPAN
			$scope.simpan=function(){
				var objSave = {
							analisakerusakan:$scope.item.analisaKerusakan,
							keterangan:$scope.item.deskPenanganan,
							sukucadang:data2,
	                    	pegawai:data3

	                    }

	            ManagePhp.postSukuCadang(objSave).then(function(e) {
	            	$state.go('ResponPerbaikan')
	            	// $scope.tombolSimpanVis = false
	            })
			}
	    // END SIMPAN

	    	// HAPUS
	    	 function Hapus(e){
	    		e.preventDefault();
	    		var dataItem = this.dataItem($(e.currentTarget).closest("tr"));  		
                
	    		var grid = this;
	    		var row = $(e.currentTarget).closest("tr");
                var tr = $(e.target).closest("tr");
                 for (var i = data2.length - 1; i >= 0; i--) {
                    if (data2[i].no ==dataItem.no){
                        data2.splice(i, 1);
                    }
                }

 				grid.removeRow(row);

	        }
	        function HapusF(e){
	    		e.preventDefault();
	    		var dataItem = this.dataItem($(e.currentTarget).closest("tr"));  		
                
	    		var grid = this;
	    		var row = $(e.currentTarget).closest("tr");
                var tr = $(e.target).closest("tr");
                 for (var i = data3.length - 1; i >= 0; i--) {
                    if (data3[i].no ==dataItem.no){
                        data3.splice(i, 1);
                    }
                }

 				grid.removeRow(row);

	        }
	    	// END HAPUS

			$scope.clear = function () {
				// body...
				$scope.item.noUrut = undefined
				$scope.item.namaSukuCadang = undefined
				$scope.item.qtySparePart = ""
			}
			$scope.clear1 = function () {
				// body...
				$scope.item.namaTeknisi = undefined
				$scope.item.noUrut1 = undefined
			}
			// close
		}
	]);
});
