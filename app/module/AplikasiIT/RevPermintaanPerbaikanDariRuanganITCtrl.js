define(['initialize'], function(initialize) {
  'use strict';
  initialize.controller('RevPermintaanPerbaikandariRuanganITCtrl', ['$rootScope', '$scope', 'ModelItem', 'IPSRSService', '$state', '$location', '$mdDialog', 'DateHelper',
    function($rootScope, $scope, ModelItem, IPSRSService, $state, $location, $mdDialog, DateHelper) {
      ModelItem.get("IP3RS/PermintaanPerbaikandariRuangan").then(function(data) {
        $scope.item = data;
        $scope.item.tanggalPesan = new Date();
        $scope.dataVOloaded = true;


        $scope.noOrderDef = function() {
          IPSRSService.getItem("it-perbaikan/get-no-order", true).then(function(dat) {
            $scope.item.noOrder = dat.data.data.noOrder;
            $scope.item.tanggalPesan = new Date();
          });
        };
         $scope.noOrderDef();

         $scope.ChangeBarang = function(newValue){
           debugger 
           newValue
           $scope.item.KategoriKerusakan = newValue.kategoriKerusakan; 
         }          

         $scope.GetAllKategori = function() {
          $scope.Tampungdata = [];
          var autoIncrement = 1;
          IPSRSService.getItem("it-perbaikan/get-kategori-kerusakan-iti", true).then(function(dat) {
            $scope.listkategori = dat.data.data;
            for(var i=0; i<$scope.listkategori.length; i++){
               var dataTemp = {
                "name" :  $scope.listkategori[i],
                "Id" : autoIncrement++
               } 
               $scope.Tampungdata.push(dataTemp);
            }
             $scope.ListDataSource = $scope.Tampungdata;
          });
           
        };
        $scope.GetAllKategori();  


         $scope.Onit = function() {
          var nomor = 1;
          IPSRSService.getItem("it-perbaikan/get-all-permintaan-perbaikan", true).then(function(dat) {
            $scope.dataSource = dat.data.data.listPermintaanPerbaikan;
            for(var i=0; i<$scope.dataSource.length; i++){
              if($scope.dataSource[i].statusPengerjaan == 0){
                  $scope.dataSource[i].statusPengerjaan = "belum ada yang dikerjakan"
              }else if($scope.dataSource[i].statusPengerjaan == 1){
                  $scope.dataSource[i].statusPengerjaan = "pemeliharaan sudah dikerjakan"
              }else if($scope.dataSource[i].statusPengerjaan == 2){
                  $scope.dataSource[i].statusPengerjaan = "service sudah dikerjakan"
              }else{
                  $scope.dataSource[i].statusPengerjaan = "kalibrasi sudah dikerjakan"    
              }
              $scope.dataSource[i].no = nomor++
              $scope.dataSource[i].Tanggal = new moment($scope.dataSource[i].tglPesan).format('YYYY-MM-DD');
            }
          });
        };
        $scope.Onit ();


        IPSRSService.getItem("psrsPermintaanPerbaikan/get-user-login", true).then(function(dat){
          $scope.item.userPelapor = dat.data.namaPegawai;
          $scope.item.IdPelapor = dat.data.id;
        });


        IPSRSService.getItem("psrsPermintaanPerbaikan/get-ruangan-by-user-login", true).then(function(dat){
          $scope.item.ruangan = dat.data.namaRuangan;
          $scope.item.idRuangan = dat.data.id;
        });        


        IPSRSService.getItem("it-perbaikan/find-ruangan-asset", true).then(function(dat){
          $scope.ListRuangan = dat.data.data.ruanganAset;
        });

        $scope.OnChangeRuangan = function(Newvalue){
          IPSRSService.getItem("it-perbaikan/find-asset-by-ruangan?id="+Newvalue.id, true).then(function(dat){
            $scope.listAsset = dat.data.data.dataAset;
          });
        }


        IPSRSService.getItem("psrsPermintaanPerbaikan/get-ruangan-tujuan", true).then(function(dat){
          $scope.item.ruanganTujuan = dat.data.namaRuangan;
          $scope.item.idRuanganTujuan = dat.data.id;
        });

        $scope.listJenisPekerjaan = [{
          "id" : 1,
          "name" : "Hardware"
        },
        {
          "id":2,
          "name": "Software"
        }];

  
        $scope.showConfirm = function(ev) {
            var confirm = $mdDialog.confirm()
            .title('Permintaan Perbaikan')
            .textContent('Ada Perminaan \n Perbaikan' + 'Data')
            .ariaLabel('Lucky day')
            .ok('Oke')

            $mdDialog.show(confirm).then(function() {
              $state.go("RespondPerbaikan");
            });
        };

        $scope.Cari = function(GetPencarian){
            var q = GetPencarian;
            var grid = $("#kGrid").data("kendoGrid");
              grid.dataSource.query({
                page:1,
                pageSize:20,
                filter:{
                  logic:"or",
                   filters:[
                             {field:"noOrder", operator:"contains",value:q},
                             {field:"namaProduk", operator:"contains",value:q},
                             {field:"namaRuangan", operator:"contains",value:q}
                         ]
                 }
            });
        }

        $scope.ClearCari = function(){
          $scope.item.pencarian =  "";
          var gridData = $("#kGrid").data("kendoGrid");
           gridData.dataSource.filter({});
        } 

      var onDataBound = function() {
        $('td').each(function(){
          if($(this).text()=="belum ada yang dikerjakan")
            {$(this).addClass('red')}});
        $('td').each(function(){
          if($(this).text()=="pemeliharaan sudah dikerjakan")
              {$(this).addClass('green')}
         });        
        $('td').each(function(){
          if($(this).text()=="kalibrasi sudah dikerjakan")
              {$(this).addClass('yellow')}
         });
        $('td').each(function(){
          if($(this).text()=="service sudah dikerjakan")
            {$(this).addClass('green')}
        })};


        $scope.mainGridOptions = { 
          pageable: true,
          toolbar: ['excel','pdf'],
          dataBound: onDataBound,
          columns: [
          { field:"Daftar",title:"<h3 align=center>Daftar Permintaan Perbaikan<h3>",headerAttributes: { style: "text-align : center"},
          columns:[{ field:"no", width:"18px", title:"<h3 align=center>No.<h3>"},
          { field:"noOrder",width:"40px", title:"<h3 align=center>No Order<h3>"}, 
          { field:"Tanggal", width:"50px",title:"<h3 align=center>Tanggal Pesan<h3>"},
          { field:"namaProduk", width:"90px", title:"<h3 align=center>Nama Barang<h3>"},
          { field:"namaRuangan", width:"90px", title:"<h3 align=center>Nama Ruangan<h3>" },
          { field:"keluhan", width:"90px", title:"<h3 align=center>Keluhan<h3>" },
          { field:"ketStatusRespon",width:"60px", title:"<h3 align=center>Status Respon<h3>" },
          { field:"statusPengerjaan",width:"80px", title:"<h3 align=center>Status Pengerjaan<h3>" },
          { field:"ketKerusakan", width:"80px", title:"<h3 align=center>Keterangan Kerusakan<h3>" }]
          }
          ],
          editable: false
        };



      $scope.simpan=function(){
        var tanggal = DateHelper.getTanggalFormattedNew($scope.item.tanggalPesan);
            var data = {
                "registrasiAset" : {"noRec":$scope.item.namaBarang.noRec,
                                    "keteranganLainnya": $scope.item.KategoriKerusakan},
                "pelaporId" : $scope.item.IdPelapor,
                "tglPesan" : tanggal,
                "keluhan" :  $scope.item.kerusakan,
                "ruanganId" : $scope.item.ruangan.id,
                "itStatusPerbaikan" : {"statusRespon":0,
                "statusPengerjaan":0,
                "ketStatusRespon" : "Belum di Respon"
              }
          }
          console.log(JSON.stringify(data));
        IPSRSService.saveDataSarPras(data, "it-perbaikan/save-permintaan-perbaikan").then(function(e) {
            $scope.noOrderDef();
            $scope.Onit();
          });
      
    }

        $scope.batal = function () {
          $scope.item = {};
        }
        
      }, function errorCallBack(err) {});
    }
  ]);
});



