define(['initialize'], function(initialize) {
  'use strict';
  initialize.controller('LoguserCtrl', ['$rootScope', '$scope', 'ModelItem','$state','DateHelper','ManageLogInfo','$mdDialog','$element',
    function($rootScope, $scope, ModelItem,$state,DateHelper,ManageLogInfo,$mdDialog,$element) {
      $scope.item = {};
      ModelItem.get("Sample/Loguser").then(function(data) {
        $scope.item = data;
        
        $scope.item.total = 0;
        $scope.no = 1;
        $scope.now = new Date();
        $scope.item.awal= new Date($scope.now).getFullYear();
        $scope.item.akhir= new Date($scope.now).getFullYear();
 
         $scope.kl = function(current) {

                $scope.current = current;
                $scope.current.id= current.id; 


                //debugger;
                init2(current.namaUser);
         
            };
          

      $scope.kl2 = function(logm) {

                $scope.logm = logm;
                $scope.logm.id= logm.id; 

                 //
      init3(logm.id);
          
            };

        $scope.yearSelected = { 
                start: "decade", 
                depth: "decade" 
              };
              $scope.JenisAnalisa = false;
        $scope.dataVOloaded = true;
      }, function errorCallBack(err) {});
      
      
      $scope.tahun = function(){
        $scope.item.awal= $scope.item.awal.getFullYear();
        $scope.item.akhir= $scope.item.awal+4;
      }
    
      $scope.no=1;
      
      $scope.dataLaporanUjiHasil = new kendo.data.DataSource({
        data: [{}],

      });
        

       $scope.pindah = function(){
         
        $state.go("RekamDataPegawai");
         
       }
       
       
        $scope.pindah1 = function(){
         
        $state.go("DataKeluarga");
         
       }
      
      
       function loadCombo(){
       
        ManageLogInfo.getListData("get-all-user")
        .then(function(data){
          $scope.listJenisTransaksi=data;
        });

      }
   
           

            $scope.columnLoguser = [
            {
                field: "no",
                title: "<div style='text-align:center;'>No</div>",
                filterable: false,
                width: "5%"
            },
            


            {
                field: "nipPns",
                title: "<div style='text-align:center;'>NIP</div>",
                filterable: false,
                width: "10%"
            },


            {
                field: "namaLengkap",
                title: "<div style='text-align:center;'>Nama Pegawai</div>",
                width: "30%",
                filterable:       {
                    ui: namaFilter
                                  }
            },

            {
                field: "namaUser",
                width: "20%",
                title: "<div style='text-align:center;'>Nama User</div>",
                filterable:       {
                    ui: namaFilter
                                  }

            },

            {
             field: "departemen",
                width: "40%",
                title: "<div style='text-align:center;'>Departemen</div>",
               filterable:       {
                    ui: namaFilter
                                 }
            },

            {
              field:"kelompokUser",
              width:"30%",
              title:"<div style='text-align:center;'>Kelompok User</div>",
              filterable: {
                    ui: namaFilter
            }


            }];  




            $scope.columnsubsistem = [
            {
                field: "no2",
                title: "<div style='text-align:center;'>No</div>",
                filterable: false,
                width: "5%"
            },
            


            {
                field: "tglLogin",
                title: "<div style='text-align:center;'>Tanggal Login</div>",
                filterable: false,
                width: "10%"
            }, {
                field: "modulAplikasi",
                title: "<div style='text-align:center;'>Modul Aplikasi</div>",
                width: "30%",
                filterable: {
                    ui: namaFilter
               
                            }

            }

            ];



             $scope.columnoperasi = [
           {
             "field": "no3",
             "title": "No",
             "width": "10%"


           },
     
           {
            
            "field":"isCRUD",
            "title": "Operasi",
            "width": "40%",
            "template": "<span class='style-right'>{{konfersi('#: isCRUD #')}}</span>"

           },


           {
             "field": "detailDataCRUD",
             "title": "Detail Operasi",
             "width": "50%",
                "template": "<button class='btnEdit' ng-click='openWindow()'> Detail </button>"

           },];



         $scope.columndatadetail = [
        {
           "field": "detailDataCRUD",
           "title": "User",
           "width": "10%",
           "template": '#: detailDataCRUD.user #'
        },
        
        {
           "field": "detailDataCRUD",
           "title": "Supervisor",
           "width": "10%",
           "template": '#: detailDataCRUD.supervisor #'
        },

        {
           "field": "detailDataCRUD",
           "title": "No Record",
           "width": "10%",
           "template": '#: detailDataCRUD.noRecP #'
        },


         


         {
           "field": "detailDataCRUD",
           "title": "Property",
           "width": "10%",
           "template": '#: detailDataCRUD.property["0"].column #'
        },

        {
           "field": "detailDataCRUD",
           "title": "Column Table",
           "width": "10%",
           "template": '#: detailDataCRUD.property["0"].name #'
        },
         
         {
           "field": "detailDataCRUD",
           "title": "Data Sebelumnya",
           "width": "10%",
           "template": '#: detailDataCRUD.property["0"].oldData #'
        },

         {
           "field": "detailDataCRUD",
           "title": "Data Baru",
           "width": "10%",
           "template": ('#: detailDataCRUD.property["0"].newData #')
        },
          
         

      



        ];



  $scope.mainGridOptions = {
              editable: "popup",
                pageable: true,
                scrollable: true,
                height: 300,
                selectable: "row",
                columns: $scope.columnLoguser,
                filterable: {
                    extra: false,
                    operators: {
                        string: {
                            startsWith: "Mulai Dengan",
                            eq: "Is equal to",
                            neq: "Is not equal to"
                        }
                    }
                },
               
            };



            $scope.mainGridOptions = {
              editable: "popup",
                pageable: true,
                //scrollable: true,
                //height: 300,
                selectable: "row",
                columns: $scope.columnsubsistem,
                filterable: {
                    extra: false,
                    operators: {
                        string: {
                            startsWith: "Starts With",
                           // eq: "Is equal to",
                           // neq: "Is not equal to"
                        }
                    }
                },
               
            };

  


 $scope.konfersi = function(values){
  var data=values;
   if (data=='U'){
        return 'update'
   }   
   else if(data=='D'){
        return 'delete'
   }
   else {
        return 'insert'
  }
}
  



var init = function () {
        ManageLogInfo.findPegawaiUser().then(function(dat){
          $scope.listDataMaster = dat.data.data.data;
        //  debugger;
          var data = [];
          var i = 1;
          $scope.listDataMaster.forEach(function(e){
            var daftar = {
                "nipPns": e.pegawai.nipPns,
                "namaLengkap": e.pegawai.namaLengkap,
                "namaUser":e.namaUser,
                "departemen":e.pegawai.ruangan.departemen.namaDepartemen,
                 "kelompokUser":e.kelompokUser.kelompokUser,
                 "id":e.pegawai.id,
                "no": i
              }
            data[i-1]=daftar
            i++;
          });
          $scope.source = data;
           var arr = [];
                    for (var i = 0; i < data.length; i++) {
                        arr.push(data[i].namaLengkap);

                    }
                        //debugger;
          $scope.dataSource = new kendo.data.DataSource({
                      pageSize: 10,
                      data: $scope.source,
                      autoSync: true,
                      
                      /*schema: {
                          model: {
                            id: "asetId",
                            fields: {
                                
                            }   
                        }
                    } */
                });
          
        });
      }
      init();
      


      var init2 = function (namaUser) {
        ManageLogInfo.findlogging(namaUser).then(function(dat){
          $scope.listDataMaster2 = dat.data.data.listData;
        //debugger;
          var data = [];
          var i = 1;
          $scope.listDataMaster2.forEach(function(e){
            var daftar = {
              "id":e.id,
        "modulAplikasi": e.modulAplikasi,
        "ruanganUser": e.ruanganUser,
         "kdUser": e.kdUser,
         "tglLogin": e.tglLogin,
         "no2": i
              }
            data[i-1]=daftar
            i++;
          });
          $scope.source = data;
          $scope.dataSource2 = new kendo.data.DataSource({
                      pageSize: 10,
                      data: $scope.source,
                      autoSync: true
                     
                });
          
        });
      }
      init2();




var init3 = function (id) {
        ManageLogInfo.findlogging2(id).then(function(dat){
          $scope.listDataMaster3 = dat.data.data.listData;
      // debugger;
          var data = [];
          var i = 1;
          $scope.listDataMaster3.forEach(function(e){
            var daftar = {
              "supervisor" : e.supervisor,
                "isCRUD" : e.isCRUD, //{{konfersi('#: isCRUD #')}}
                "detailDataCRUD" : JSON.parse(e.detailDataCRUD),
                "historyLoginId":e.historyLoginId, 
                "no3": i
   
              }

            data[i-1]=daftar
             
            i++;


          });
         
             
       
           $scope.mainGridOptions = {

            editable: "popup",
                pageable: true,
             scrollable: true,
               height: 300,
               selectable: "row",
                columns: $scope.columnTitle,
                 change: function(e){
                   console.log(e);
                // debugger;
               },
                 filterable: {
                     extra: false,
                     operators: {
                         string: {
                             startsWith: "Starts With",
                             eq: "Is equal to",
                             neq: "Is not equal to"
                         }
                     }
                 },
               
             };

   $scope.source = data;


  // debugger;
  // console.log(JSON.parse(data[0].detailDataCRUD));




             
          $scope.dataSource3 = new kendo.data.DataSource({
                      pageSize: 10,
                      data: $scope.source,
                      autoSync: true
                      /*schema: {
                          model: {
                            id: "asetId",
                            fields: {
                                
                            }   
                        }
                    } */
                });
          
        });
      }
      init3();


  

      var retrievedObject = localStorage.getItem('added-items');
      var itemPegawai = localStorage.getItem('added-namaPegawai');
      var titles = JSON.parse(itemPegawai);
       function namaFilter(element) {
                element.kendoAutoComplete({
                    dataSource: titles
                });
            }



          
          $scope.dataSource3 = new kendo.data.DataSource({
 
                      data: $scope.source
                     
                });

       $scope.isShowPopUp = false;
      $scope.dataSelected = {};


      $scope.openWindow = function(){
       
       
       
        
            var myWindow = $("#winPopUp");
            myWindow.data("kendoWindow").open();
            $scope.isShowPopUp = true;
                    }
               

      $scope.closeWindow = function(){
        $scope.isShowPopUp = false;
      }

      $scope.editData = function(){
        var myWindow = $("#winPopUp");
        myWindow.data("kendoWindow").close();

        //isi codingan buat ngedit data

      }

      $scope.hapusData = function(){
        //isi codingan buat hapus data
      }

      $scope.cancelData = function(){
        var myWindow = $("#winPopUp");
        myWindow.data("kendoWindow").close();

    
      }
/*
     
    */



      
   

      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
    }
  ]);
});