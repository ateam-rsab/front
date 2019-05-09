define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('GajiPegawaiHonorCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'NamaAsuransi', 'ManageSdm', 'DateHelper',
        function($rootScope, $scope, ModelItem, $state, NamaAsuransi, ManageSdm, dateHelper) {
            $scope.now = new Date();
            $scope.dataVOloaded = true;
            $scope.item = {};
            $scope.dataPost=[];

            $scope.pindah = function() {

                    $state.go("RekamDataPegawai");

                }
             
            ManageSdm.getOrderList("pay-roll/find-status-pegawai-blu-pkwt", true).then(function(dat) {
				
				$scope.listpegawai=dat.data.data;
           
             
          
            //debugger;

            });
			
		
			
			 ManageSdm.getOrderList("pay-roll/find-jenis-gaji", true).then(function(dat) {
				
				$scope.listgaji=dat.data.data;
           
       
            


            });
			
			
			$scope.selectRow = function(dataItem)
			{
				//debugger;
				var dataObj = {
					nipPns : dataItem.nipPns,
					pegawaiId:dataItem.pegawaiId,
					statusPegawai:dataItem.statusPegawai,
					jabatanId:dataItem.jabatanId,
					hargaKotor:dataItem.hargaKotor,
					noGaji:dataItem.noGaji,
					kelompokshiftId:dataItem.kelompokshiftId,
					periode:dataItem.periode,
					harga:dataItem.harga,
					pendidikanId:dataItem.pendidikanId,
					namaJabatan:dataItem.namaJabatan,
					potonganPajak:dataItem.potonganPajak,
					namaLengkap:dataItem.namaLengkap,
					isVerifikasi:dataItem.isVerifikasi,
				    
					kategoriPegawai:dataItem.kategoriPegawai,
					namaRuangan:dataItem.namaRuangan,
					pendidikan:dataItem.pendidikan,
					detailKategoriPegawaiId:dataItem.detailKategoriPegawaiId,
					tglHistori:dataItem.tglHistori,
					komponenGaji:dataItem.komponenGaji,
					golonganPegawaiId:dataItem.golonganPegawaiId,
					ruanganId:dataItem.ruanganId,
					masaKerja:dataItem.masaKerja,
					golonganPegawai:dataItem.golonganPegawai,
					tglMasuk:dataItem.tglMasuk,
					jenisGajiId:dataItem.jenisGajiId,
					detailKategoriPegawai:dataItem.detailKategoriPegawai,
					
					
					
					
					
					
					
					
					
					
					
					komponen : dataItem.komponen
					
					
					
					
					
				}
				
			  
					
					
					
					
			

				var isExist = _.find($scope.dataPost, function(dataExist){ 
					if (
					dataExist.nipPns == dataObj.nipPns) {
						return true;
					} else {
						return undefined;
					}
				});

				if(isExist == undefined)
				{
					$scope.dataPost.push(dataObj);
				}
				else
				{
					$scope.dataPost =  _.without($scope.dataPost, _.findWhere($scope.dataPost, {
						nipPns: dataObj.nipPns
					}));
				}
			 	

			}
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			

        

			function Proses () {
				
			 
				
			 var gaji = $scope.item.jenisGaji.id ;	
			 var kerja =  $scope.item.statusPegawai.id;	
			 var period =  moment($scope.item.Periode).format("MM-YYYY");
			 
			//debugger;	
			ManageSdm.getOrderList("pay-roll/get-pegawai-blu-pkwt?idKategoryPegawai="+kerja+"&idJenisGaji="+gaji+"&periode="+period ).then(function(dat){
			//debugger;
			$scope.sourceOrder = new kendo.data.DataSource({
				data: dat.data.data
			});				
			$scope.item.nomorGaji = dat.data.data[0].noGaji;
			//debugger;
			});		
					
			}
			
			
			$scope.viewgrid = function(){
			 
			 var gaji = $scope.item.jenisGaji.id ;	
			 var kerja =  $scope.item.statusPegawai.id;	
			 var period =  moment($scope.item.Periode).format("MM-YYYY");			 
		     Proses();
         			
				
				
			}




            $scope.pindah1 = function() {

                $state.go("DataKeluarga");

            }


           
            $scope.monthSelectorOptions = {
                start: "year",
                depth: "year"
            };
			
			$scope.formatRupiah = function(value, currency) {
			    return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
			}
         
           
		   
		      var onChange = function(e) {
                //var inputId = this.element.attr("id");
              //  console.log(inputId);
                var grid = $(this).data("mainGridOptions");

            }
		   
		   
		   
            $scope.mainGridOptions = {
				pageable:true,
				change:onChange,
				pageSize:10,
				selectable:'row',
				scrollable:true,
				 filterable: {
                            extra: false,
                            operators: {
                               string: {
                                   startswith: "Dimulai dengan",
                                    contains: "mengandung kata",
                                   neq: "Tidak mengandung kata"
                                }
                            }
                        },
                columns: [{
                    title: "<center><input type='checkbox' title='Select All' ng-click='toggleSelectAll($event)'></center>",
                    width: "3%",
                    template: "<div class='center'><input type='checkbox' class='checkbox' ng-model='dataItem.selected' ng-click='selectRow(dataItem)''></div>"
                

                }, {
                    "field": "nipPns",
                    "title": "NIP"	,
				    "width": "200px"
				}, {
                    "field": "komponenGaji",
                    "title": "KomponenGaji",
                    hidden :true	
				}, {
                    "field": "statusPegawai",
                    "title": "Status Pegawai",
                    hidden :true		
				}, {
                    "field": "golonganPegawaiId",
                    "title": "Golongan Pegawai Id",
                    hidden :true
				}, {
                    "field": "potonganPajak",
                    "title": "Potongan Pajak",
                    hidden :true	
				}, {
                    "field": "tglMasuk",
                    "title": "Tanggal Masuk",
                    hidden :true	
				}, {
                    "field": "jenisGajiId",
                    "title": "Jenis Gaji Id",
                    hidden :true		
					
				}, {
                    "field": "tglHistori",
                    "title": "Tanggal Masuk",
                    hidden :true	
				}, {
                    "field": "namaRuangan",
                    "title": "Nama Ruangan",
                    hidden :true	
				}, {
                    "field": "ruanganId",
                    "title": "Ruangan Id",
                    hidden :true		
                }, {
                    "field": "isVerifikasi",
                    "title": "Is Verifikasi",
                    hidden :true						
					
				}, {
                    "field": "detailKategoriPegawaiId",
                    "title": "Detail Kategori Pegawai Id",
                    hidden :true		
				}, {
                    "field": "pegawaiId",
                    "title": "Pegawai Id",
                    hidden :true
				}, {
                    "field": "jabatanId",
                    "title": "Jabatan Id",
                     hidden: true  
				}, {
                    "field": "hargaKotor",
                    "title": "Harga Kotor",
                     hidden: true  	 
				}, {
                    "field": "noGaji",
                    "title": "Nomor Gaji",
                     hidden: true  
				}, {
                    "field": "kelompokshiftId",
                    "title": "Kelompok Shift Id",
                     hidden: true  	 	 
                }, {
                    "field": "namaLengkap",
                    "title": "Nama Pegawai"
				}, {
                    "field": "detailKategoriPegawai",
                    "title": "Status Pegawai",
                    "filterable":false				
				}, {
                    "field": "golonganPegawai",
                    "title": "Golongan "		
				}, {
                    "field": "pendidikan",
                    "title": "Pendidikan"
				}, {
                    "field": "pendidikanId",
                    "title": "Pendidikan",
				     hidden : true
				}, {
                    "field": "periode",
                    "title": "Periode",
				     hidden : true	 
				}, {
                    "field": "kategoriPegawai",
                    "title": "Kategori Pegawai",
                    "filterable":false						
				}, {
                    "field": "masaKerja",
                    "title": "Masa Kerja",
                    "filterable":false					
				}, {
                    "field": "namaJabatan",
                    "title": "Jabatan",
                    					
				}, {
                    "field": "harga",
                    "title": "Total",
					"filterable":false,			
                    "template": "{{formatRupiah('#: harga #', 'Rp.')}}"	
              
                }],
                pageable: true,
                sortable: false,
                selectable: "row",
                editable: "popup"
            };
           
           
		   
		   $scope.mainGridOptions_1_2 = function(dataItem) {
               return {
                    dataSource: new kendo.data.DataSource({
						data: dataItem.komponen
					}),
                    columns: [
                    {
	                    field: "namaKomponen",
	                    title: "Nama Komponen"
	                },
	                {
	                    field: "harga",
	                    title: "Harga",
					    template: "{{formatRupiah('#: harga #', 'Rp.')}}"	
	                }]
                }
			}
		   
		   
           $scope.toggleSelectAll = function(ev) {
				var grids = $('#kGrid').data("kendoGrid");
				var grid = $(ev.target).closest("[kendo-grid]").data("kendoGrid");
				var items = grid.dataSource.data();
				items.forEach(function(item){
					item.selected = ev.target.checked;
					var dataObj = {
					nipPns : item.nipPns,
					pegawaiId:item.pegawaiId,
					statusPegawai:item.statusPegawai,
					jabatanId:item.jabatanId,
					hargaKotor:item.hargaKotor,
					noGaji:item.noGaji,
					kelompokshiftId:item.kelompokshiftId,
					periode:item.periode,
					harga:item.harga,
					pendidikanId:item.pendidikanId,
					namaJabatan:item.namaJabatan,
					potonganPajak:item.potonganPajak,
					namaLengkap:item.namaLengkap,
					isVerifikasi:item.isVerifikasi,
				    
					kategoriPegawai:item.kategoriPegawai,
					namaRuangan:item.namaRuangan,
					pendidikan:item.pendidikan,
					detailKategoriPegawaiId:item.detailKategoriPegawaiId,
					tglHistori:item.tglHistori,
					komponenGaji:item.komponenGaji,
					golonganPegawaiId:item.golonganPegawaiId,
					ruanganId:item.ruanganId,
					masaKerja:item.masaKerja,
					golonganPegawai:item.golonganPegawai,
					tglMasuk:item.tglMasuk,
					jenisGajiId:item.jenisGajiId,
					detailKategoriPegawai:item.detailKategoriPegawai,
					komponen : item.komponen
					
					
					
					
					
				}
					$scope.dataPost.push(dataObj);
				});
			};
           
          
           
               $scope.Save = function() {
						
			  if ($scope.item.statusPegawai === undefined || $scope.item.jenisGaji === undefined  ||
                     $scope.item.keterangan === undefined || $scope.item.Periode === undefined ) {
                     toastr.warning("Lengkapi semua data");
                     return;
                 }
         
			 	
             ManageSdm.saveGajiPegawaiHonor($scope.dataPost,"pay-roll/save-pegawai-blu-pkwt").then(function (e) {
				 //debugger;
                //  $scope.item= {};
                 // init();  
                    /*$state.go('dashboardpasien.TandaVital', {
                     noCM: $scope.noCM
                     });*/
             });


            }




          





















        }
    ]);
});
