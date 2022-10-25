define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('RegistrasiPasienLamaRevCtrl', ['ManageServicePhp','CacheHelper', '$q', '$rootScope', '$scope', 'ModelItemAkuntansi','ModelItem', 'DateHelper', '$http', '$state', 'ReportPelayanan','$mdDialog',
        function (manageServicePhp, cacheHelper, $q, $rootScope, $scope, modelItemAkuntansi,ModelItem, DateHelper, $http, $state, ReportPelayanan,$mdDialog) {
            //Inisial Variable 
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.dataSelected = {};
            $scope.item = {};
            $scope.isRouteLoading = false;
            $scope.item.tglawal=$scope.now;
            $scope.item.tglakhir=$scope.now;
            $scope.Page = {
                refresh: true,
                pageSizes: true,
                buttonCount: 5
            }

            loadFirst()
            function loadFirst(){
                var chacePeriode = cacheHelper.get('RegistrasiPasienLamaRevCtrl');
                if(chacePeriode != undefined){
                    //debugger;
                    var arrPeriode = chacePeriode.split('~');
                    $scope.item.periodeAwal = new Date(arrPeriode[0]);
                    $scope.item.periodeAkhir = new Date(arrPeriode[1]); 
                    // $scope.item.tglLahir = new Date(arrPeriode[2]);  
                    // $scope.item.noRmNama = new Date(arrPeriode[3]);                   
                }else{
                    $scope.item.periodeAwal = $scope.now;
                    $scope.item.periodeAkhir = $scope.now;
                    // $scope.item.tglLahir = $scope.now; 
                    // $scope.item.noRmNama = "";                     
                }
            }
            $scope.SearchData = function () {
                loadData()
            }
             $scope.SearchEnter = function () {
                loadData()
            }
            $scope.SearchNoRm = function () {
                loadData()
            }
               $scope.SearchTglLahir = function () {
                loadData()
            }
           function loadData(){

                $scope.isRouteLoading=true;
               

                var rm =""
                if ($scope.item.noRM != undefined){
                     rm ="&norm=" +$scope.item.noRM
                }   

                var pasien =""
                if ($scope.item.namaPasien != undefined){
                     pasien ="&namaPasien=" +$scope.item.namaPasien
                }   
                var ayah =""
                if ($scope.item.namaAyah != undefined){
                     ayah ="&namaAyah=" +$scope.item.namaAyah
                }
                var almat =""
                if ($scope.item.alamat != undefined){
                     almat ="&alamat=" +$scope.item.alamat
                }

                if ($scope.item.namaAyah != undefined){
                     ayah ="&namaAyah=" +$scope.item.namaAyah
                }                var tglLahirs =""
                if ($scope.item.tglLahir != undefined){
                     tglLahirs ="tglLahir=" + DateHelper.formatDate($scope.item.tglLahir, 'YYYY-MM-DD');
                }

                manageServicePhp.getDataTableTransaksi("registrasipasien/get-pasien?"+

                    tglLahirs+
                    rm+
                    pasien+
                    ayah+
                    almat)
                .then(function(data) {
                    $scope.isRouteLoading=false;
                    // for (var i = 0; i < data.data.daftar.length; i++) {
                    //     data.data.daftar[i].no = i+1
                    //     var tanggal = $scope.now;
                    //     var tanggalLahir = new Date(data.data.daftar[i].tgllahir);
                    //     var umurzz = DateHelper.CountAge(tanggalLahir, tanggal);
                    //     data.data.daftar[i].umurzz =umurzz.year + ' thn ' + umurzz.month + ' bln ' + umurzz.day + ' hari'

                    // }                        
                    $scope.dataSourceGrid = data.data.daftar;
                    // var chacePeriode = tglAwal + "~" + tglAkhir ;
                    // // + "~"+ $scope.item.noRmNama;
                    // cacheHelper.set('RegistrasiPasienLamaRevCtrl', chacePeriode);

                });

            };

          
           
             $scope.columnGrid= [
                {
                    "field": "nocm",
                    "title": "No Rekam Medis",
                    "width":"80px",
                    // "template": "<span class='style-center'>#: nocm #</span>"
                },
                {
                    "field": "namapasien",
                    "title": "Nama Pasien",
                    "width":"150px",
                    // "template": "<span class='style-center'>#: namapasien #</span>"
                },
                   {
                    "field": "jeniskelamin",
                    "title": "Jenis Kelamin",
                    "width":"80px",
                    // "template": "<span class='style-center'>#: jeniskelamin #</span>"
                },

                {
                    "field": "namaayah",
                    "title": "Nama Ayah Kandung",
                    "width":"100px",
                     "template": '# if( namaayah==null) {# - # } else {# #= namaayah # #} #'
                    // "template": "<span class='style-center'>#: namaayah #</span>"
                },
                {
                    "field": "tgllahir",
                    "title": "Tanggal Lahir",
                    "width":"80px",
                    "template": "<span class='style-left'>{{formatTanggal('#: tgllahir #')}}</span>"
                },
                // {
                //     "field": "umurzz",
                //     "title": "Umur",
                //     "width":240
                
                // },
                {
                    "field": "alamatlengkap",
                    "title": "Alamat",
                    "width":"200px",

                },
                {
                    "field": "notelepon",
                    "title": "No Telepon",
                    "width":"80px",
                     "template": '# if( notelepon==null) {# - # } else {# #= notelepon # #} #'
                },
                {
                    "field": "nohp",
                    "title": "No HP",
                    "width":"80px",
                    "template": '# if( nohp==null) {# - # } else {# #= nohp # #} #'
                }                     
            ];

            $scope.klikGrid = function(dataPasienSelected){
                if (dataPasienSelected != undefined) {
                   $scope.nocm=dataPasienSelected.nocm
                    $scope.idPasien=dataPasienSelected.nocmfk
                }
            }
       
            $scope.formatTanggal = function(tanggal){
                return moment(tanggal).format('DD-MMM-YYYY');
            }
               $scope.$on("kendoWidgetCreated", function(event, widget) {
                    if (widget === $scope.grid) {
                         $scope.grid.element.on('dblclick', function(e) {
                            if ($scope.nocm!=undefined){
                                    $state.go("RegistrasiPelayananRev",{
                                        noCm:$scope.nocm
                                    })
                                      var cacheSet = undefined;           
                                       cacheHelper.set('CacheRegistrasiPasien', cacheSet);
                      
                             }
                         })
                        
                    }

               })


            $scope.RegistrasiPasien=function(){
                 if ($scope.nocm!=undefined){
                        $state.go("RegistrasiPelayananRev",{
                            noCm:$scope.nocm
                        })
                          var cacheSet = undefined;           
                           cacheHelper.set('CacheRegistrasiPasien', cacheSet);
                           var cacheSetss  =undefined;          
                             cacheHelper.set('CacheRegisOnline', cacheSetss);
          
                 }else
                 {
                    messageContainer.error("Pilih data dulu!")
                 }
            }
            $scope.EditPasien=function(){
                   if ($scope.nocm!=undefined){
                        // var isMenuDinamis = JSON.parse(localStorage.getItem('isMenuDinamis'))
                        // if(isMenuDinamis && isMenuDinamis == true){                        
                            cacheHelper.set('CacheRegisBayi', undefined);
                            $state.go('RegistrasiPasienNewRev',{
                                noRec: 0,
                                idPasien:$scope.idPasien
                            })
                        // }else{
                        //     $state.go("EditPasien",{
                        //         noCm:$scope.nocm
                        //     })
                        // }
                        
                    }else{
                    messageContainer.error("Pilih data dulu!")     
                    }
            }
             $scope.HapusPasien=function(){
                   if ($scope.idPasien!=undefined){
                    var item={
                        idpasien:$scope.idPasien
                    }
                    let hapusPasienDialog = $mdDialog.confirm()
                        .title('Hapus Data!')
                        .textContent('Apakah anda yakin hapus data pasien?')
                        .ariaLabel('Alert Dialog 2')
                        .ok('Ya').cancel('Batal');

                    $mdDialog.show(hapusPasienDialog).then((e) => {
                        console.log(e);
                        manageServicePhp.disablePasien(item).then(function(e){
                            loadData();
                        })
                    }, function (e) {
                        console.log(e);
                    });
                    
                    }else{
                        messageContainer.error("Pilih data dulu!")     
                    }
            }
            


        }
    ]);
});