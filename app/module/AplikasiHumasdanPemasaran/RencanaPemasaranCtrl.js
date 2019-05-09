define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('RencanaPemasaranCtrl', ['$rootScope', '$mdDialog','$scope', 'ModelItem', 'ManageSdm',  'DateHelper', 'InfoKelas','InfoDokumenSk','InfoAnggaran','InfoRekanan','InfoAsalTempat','InformasiRuangan2','InformasiPegawaiPenerima','InformasiRuangan','$state',
		function($rootScope, $mdDialog, $scope, ModelItem, ManageSdm, DateHelper,InfoKelas,InfoDokumenSk,InfoAnggaran,InfoRekanan,InfoAsalTempat,InformasiRuangan2,InformasiPegawaiPenerima,InformasiRuangan,$state) {
			$scope.item = {};
			$scope.now = new Date();
			 $scope.dataVOloaded = false;
       var data2 = []
            

       ManageSdm.getItem("/planningdiklathumasmarket/get-load-planning-dhm", true).then(function(dat){
        $scope.item.noPlanning = dat.data.data.noPlanning;
      
      });
            
          $scope.reset=function(){
                var confirm = $mdDialog.confirm()
                      .title('Peringatan!')
                      .textContent('Tambah Baru akan mereset form Input dan Daftar Rencana, Tetap Lanjutkan?')
                      .ariaLabel('Lucky day')
                      .ok('Ya')
                      .cancel('Tidak')

                $mdDialog.show(confirm).then(function() {
                    $scope.reset2();
                     $("#grid2").data('kendoGrid').dataSource.data([]);
                })
            };

            $scope.reset2 = function(){
            debugger;

            ManageSdm.getItem("/planningdiklathumasmarket/get-load-planning-dhm", true).then(function(dat){
            debugger;
            $scope.item.noPlanning = dat.data.data.noPlanning;
            });
             
             $scope.item.NoPlanningIntern = "";
             $scope.item.NamaPlanning = "";
             $scope.item.DeskripsiPlanning = "";
             $scope.item.TglPengajuan = "";
             $scope.item.TglPlanning = "";
             $scope.item.TglPlanningAkhir ="";
             $scope.item.Ruangan = "";
             $scope.item.Ruangan2 = "";
             $scope.item.TglDimulai ="";
             $scope.item.TglBerakhir ="";
             $scope.item.TglSiklusAwal ="";
             $scope.item.TglSiklusAkhir ="";
             $scope.item.DokumenSk ="";
             $scope.item.JenisAnggaran ="";
            }

            
		    InformasiPegawaiPenerima.getOrderList("service/list-generic/?view=Pegawai&select=*", true).then(function(dat){
	     	$scope.ListDataPegawaiPenerima = dat.data;
		    });

  		  InformasiRuangan.getOrderList("service/list-generic/?view=Ruangan&select=*", true).then(function(dat){
  		 	$scope.ListDataRuangan = dat;

  			});

        InformasiRuangan2.getOrderList("service/list-generic/?view=Ruangan&select=*", true).then(function(dat){
        $scope.ListDataRuangan2 = dat;

        });

  			InfoKelas.getOrderList("/kelas/get-kelas-by-ruangan/?ruanganId=92",true).then(function(dat){
             
              $scope.ListDataKelas = dat.data.data.list;
               
  			});

        InfoDokumenSk.getOrderList("/planningdiklathumasmarket/get-load-dokumensk",true).then(function(dat){
              
              $scope.ListDataDokumen = dat.data.data.data;
               
        });

         InfoAnggaran.getOrderList("/planningdiklathumasmarket/get-load-jenisanggaran",true).then(function(dat){
           
              $scope.ListDataAnggaran = dat.data.data.data;
               
        });

       InfoRekanan.getOrderList("/planningdiklathumasmarket/get-load-rekanan",true).then(function(dat){
                  
             $scope.ListDataRekanan = dat.data.data.data;
       });

       InfoAsalTempat.getOrderList("/planningdiklathumasmarket/get-load-jenistempat",true).then(function(dat){
           debugger;  
           $scope.ListDataAsalTempat = dat.data.data.data;
       });
       
       $scope.dataModelGrid = {};

  			$scope.cutiHabis = false;
  			$scope.dataVOloaded = true;
  			$scope.disJumlahCuti = true;
  			$scope.hideJumlahCuti = false;
  			$scope.showJumlahCuti = function () {
  				if ($scope.item.statusPegawai.id == 1) {
  					$scope.hideJumlahCuti = true;
  					$scope.getCuti();
  					
  				} else {
  					$scope.hideJumlahCuti = false;
  				}
  			}

      $scope.dataSelectedRow = {};
      $scope.sourceRencanaPemasaran = new kendo.data.DataSource({
        data: [{id:1}],
        pageSize : 10
      });

       $scope.dataBoundNamaKelas = function (e) {
            $(".tbk").parent().click(false);
        };

      $scope.templateEffect =  
                "# if (data.hasChild) { #"+
                    "<span class='tbk' style='color: gray;'>#: data.namaKelas #</span>"+
                "# } else { #"+
                    "<span>#: data.namaKelas #</span>"+
                "# } #";
       

      $scope.mainGridOptions = {
                pageable: true,
                toolbar: "<button class='btnTemplate1' style='width:10%' ng-click='tambahTransaksi()'>Tambah Data</button>",
                editable : true,
                scrollable:false,
                columns: [{
          "field": "kdProdukDHM",
          "title": "<h5 align=center>Kode Produk</h5>",
          "width": "70px",
          "attributes": {align:"center"},
          "template": "<input c-text-box type='input' filter='' class='k-textbox' ng-model='dataModelGrid[#: id #].kdProdukDHM'/>"
        }, {
          "field": "namaKelas",
          "title": "<h5 align=center>Nama Kelas</h5>",
          "width": "200px",
          "template": "<input style='width: 100%;' kendo-combo-box k-ng-model='dataModelGrid[#: id #].namaKelas' k-on-data-bound='dataBoundNamaKelas()' k-data-text-field=\"'namaKelas'\" k-data-value-field=\"'id'\" k-filter=\"'contains'\" k-auto-bind=\"'false'\" k-data-source='ListDataKelas' />"
        }, {
          "field": "namaRekanan",
          "title": "<h5 align=center>Rekanan</h5>",
          "width": "300px",
          "template": "<input style='width: 100%;'  kendo-combo-box k-ng-model='dataModelGrid[#: id #].namaRekanan' k-on-data-bound='dataBoundNamaRekanan()' k-data-text-field=\"'namaRekanan'\" k-data-value-field=\"'idRekanan'\" k-filter=\"'contains'\" k-auto-bind=\"'false'\" k-data-source='ListDataRekanan' />"
        }, {
          "field": "jenisTempat",
          "title": "<h5 align=center>Jenis Tempat</h5>",
          "width": "100px",
          "attributes": {align:"center"},
          "template": "<input style='width: 100%;'  kendo-combo-box k-ng-model='dataModelGrid[#: id #].jenisTempat' k-on-data-bound='dataBoundJenisTempat()' k-data-text-field=\"'jenisTempat'\" k-data-value-field=\"'idjenisTempat'\" k-filter=\"'contains'\" k-auto-bind=\"'false'\" k-data-source='ListDataAsalTempat' />"
        }, {
          "field": "jumlahpeserta",
          "title": "<h5 align=center>Jumlah Peserta</h5>",
          "width": "100px",
          "attributes": {align:"center"},
          "template": "<input c-text-box type='number' filter='numeric' class='k-textbox' ng-model='dataModelGrid[#: id #].jumlahpeserta'/>"
        }, {
          "field": "deskripsidetail",
          "title": "<h5 align=center>Deskripsi Detail</h5>",
          "width": "70px",
          "attributes": {align:"center"},
          "template": "<input c-text-box type='input' filter='' class='k-textbox' ng-model='dataModelGrid[#: id #].deskripsidetail'/>"
        }, 
        {
            title: "<h5 align=center>Action</h5>",
            width: "100px",
            template: "<button class='btnTemplate1' style='width:50%' ng-click='hapusTransaksi()'>Hapus</button>"
              }]
        };

              var noID = 1;
                $scope.tambahTransaksi = function(){
                var grid = $('#grid2').data("kendoGrid");
              
              noID += 1;

              $scope.dataModelGrid[noID] = {};

                grid.dataSource.add({
                  id: noID
                }); 
              };


              $scope.hapusTransaksi = function()
              {
                if($scope.dataSelectedRow)
                      {
                          if(this.dataItem.id != $scope.dataSelectedRow.id)
                          {
                              alert("Untuk Menghapus Daftar Rencana Pemasaran harus dipilih terlebih dahulu!");
                          }
                          else
                          {
                            var grid = $('#grid2').data("kendoGrid");
                    grid.dataSource.remove($scope.dataSelectedRow);
                    removeDataModelGrid(this.dataItem.id);
                          }
                      }   
              };

		
             $scope.AnggaranBiaya = function(){
                debugger;
                $state.go("AnggaranBiayaPemasaran")
            }


            $scope.Save=function(){
                var confirm = $mdDialog.confirm()
                      .title('Peringatan!')
                      .textContent('Apakah anda yakin akan menyimpan data ini?')
                      .ariaLabel('Lucky day')
                      .ok('Ya')
                      .cancel('Tidak')

                $mdDialog.show(confirm).then(function() {
                    $scope.Simpan();
                })
            };


		
          $scope.Simpan = function() {
              debugger;
              // var tglPlanning = dateHelper.getDateTimeFormatted($scope.item.tglPlanning);
              // var tglPlanningAkhir = dateHelper.getDateTimeFormatted($scope.item.tglPlanningAkhir);
          var listRawRequired = [
          "item.NamaPlanning|ng-model|Nama Planning",
          "item.DeskripsiPlanning|ng-model|Deskripsi Planning",
          "item.TglPengajuan|k-ng-model|Tanggal Pengajuan",
          "item.TglPlanning|k-ng-model|Tanggal Planning",
          "item.TglPlanningAkhir|k-ng-model|Tanggal Planning Akhir",
          "item.Ruangan|k-ng-model|Ruangan",
          "item.Ruangan2|k-ng-model|Ruangan Asal",
          "item.TglDimulai|k-ng-model|Tanggal Dimulai",
          "item.TglBerakhir|k-ng-model|Tanggal Berakhir",
          "item.TglSiklusAwal|k-ng-model|Tanggal Siklus Awal",
          "item.TglSiklusAkhir|k-ng-model|Tanggal Siklus Akhir",
          "item.DokumenSk|k-ng-model|Dokumen SK",
          "item.JenisAnggaran|k-ng-model|Jenis Anggaran"

        ];

        var isValid = ModelItem.setValidation($scope, listRawRequired);    

            var grid = $('#grid2').data("kendoGrid");
            data2=[];
            for(var i=0; i<grid._data.length; i++){
            data2.push({
            "kdProdukDHM": $scope.dataModelGrid[grid._data[i].id].kdProdukDHM,
            "kelasPlanDHM":   {
                               "id" : $scope.dataModelGrid[grid._data[i].id].namaKelas.id
                              },
            "rekananPlanDHM": {
                               "id" : $scope.dataModelGrid[grid._data[i].id].namaRekanan.idRekanan
                              },
            "jenisTempatPlanDHM": {
                              "id":  $scope.dataModelGrid[grid._data[i].id].jenisTempat.idjenisTempat
                                  },
            "tglPlanning" : $scope.item.TglPlanning,
            "tglPlanningAkhir" : $scope.item.TglPlanningAkhir,
            
            "qtyPeserta": $scope.dataModelGrid[grid._data[i].id].jumlahpeserta,
            "deskripsiDetail": $scope.dataModelGrid[grid._data[i].id].deskripsidetail
                         })
            }

             var data = {
                  "namaplanning" : $scope.item.NamaPlanning,
                  "deskripsiplanning" : $scope.item.DeskripsiPlanning,
                  "tglpegajuan" : $scope.item.TglPengajuan,
                  "tglplanning" : $scope.item.TglPlanning,
                  "kdruangan" : {"id" : $scope.item.Ruangan.id},
                  "kdruanganasal" : {"id" : $scope.item.Ruangan2.id},
                  "tglsiklusawal" : $scope.item.TglSiklusAwal,
                  "tglsiklusakhir" : $scope.item.TglSiklusAkhir,
                  "kddokumensk" : {"id" : $scope.item.DokumenSk.idDokumen},
                  "kdjenisanggaran" : {"id" : $scope.item.JenisAnggaran.idjenisAnggaran},
                  "planningDHM" : data2
                }
           ManageSdm.saveData(data,"/planningdiklathumasmarket/save-planning-dhm").then(function(e) {
          console.log(JSON.stringify(e.data));
          
          });

             
            }

            var removeA = function (arr) {
                var what, a = arguments, L = a.length, ax;
                while (L > 1 && arr.length) {
                    what = a[--L];
                    while ((ax= arr.indexOf(what)) !== -1) {
                        arr.splice(ax, 1);
                    }
                }
                return arr;
            }


			
			}
		]);
});