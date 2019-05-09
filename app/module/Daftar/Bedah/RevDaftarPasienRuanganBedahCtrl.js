define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('RevDaftarPasienRuanganBedahCtrl', ['ReportHelper', 'CacheHelper', 'ManagePasien', 'socket', '$rootScope', '$scope', 'ModelItem', '$state', 'RegistrasiPasienBaru', 'FindPasien', 'FindPasien', 'DateHelper','$timeout',

        function(reportHelper, cacheHelper, managePasien, socket, $rootScope, $scope, ModelItem, $state, RegistrasiPasienBaru, findPasien, findPasienBedahSentral, dateHelper, $timeout) {
            $scope.now = new Date();
            $rootScope.isOpen = true;
            $scope.tglAwal = new Date();
            $scope.tglAkhir = new Date();
            $scope.selected = function(data) {
                $scope.item = data;
            }
            
            $scope.PengkajianMedis = function() {
                var cookie = document.cookie.split(';');
                var statusCode = ModelItem.getStatusUser();
                cookie = cookie[0].split('=');
                $state.go('dashboardpasien.PengkajianMedis', {
                    noCM: $scope.item.pasien.noCm,
                    tanggal: moment(new Date($scope.item.pasienDaftar.tglRegistrasi)).format('YYYY-MM-DD HH:mm:ss'),
                    noRec: $scope.item.noRec,
                    ruangana: $scope.item.ruangan.id
                });
            }
             $scope.susterClick = function() {
                var cookie = document.cookie.split(';');
                var statusCode = ModelItem.getStatusUser();
                cookie = cookie[0].split('=');
                $state.go('dashboardpasien.SoapSuster', {
                    noCM: $scope.item.pasien.noCm,
                    tanggal: moment(new Date($scope.item.pasienDaftar.tglRegistrasi)).format('YYYY-MM-DD HH:mm:ss'),
                    noRec: $scope.item.noRec,
                    noRegister: $scope.item.noRec,
                    noOrder: $scope.item.strukOrder.noOrder,
                    noAntrianPasien: $scope.item.noRec
                });
            }
            $scope.pasienNoCm = $scope.item;
     
            $scope.listPasien = cacheHelper.get('listBedahSentral');
            $scope.tglAwal = new Date($scope.tglAwal.getFullYear(), $scope.tglAwal.getMonth(), $scope.tglAwal.getDate(), 0, 0, 0);
            $scope.refresh = function() {
                $scope.isLoadingData = true;
                cacheHelper.set('tglAwalBedahSentral', $scope.tglAwal);
                cacheHelper.set('tglAkhirBedahSentral', $scope.tglAkhir);
                findPasienBedahSentral.getListBedahPatient(dateHelper.formatDate($scope.tglAwal, 'YYYY-MM-DD HH:mm:00'), dateHelper.formatDate($scope.tglAkhir, 'YYYY-MM-DD HH:mm:59'), $scope.noCm).then(function(e) {
                    if(e.data.data == null || e.data.data == undefined){
                    window.messageContainer.error("Data pada tanggal"+dateHelper.formatDate($scope.tglAwal, 'YYYY-MM-DD HH:mm:00')+" s/d "+dateHelper.formatDate($scope.tglAkhir, 'YYYY-MM-DD HH:mm:59')+" tersebut tidak ada !!!")
                    var data = [];
                    }else{
                    var data = e.data.data.listData
                    for(var y = 0; y<e.data.data.listData.length; y++){
                        if(data[y].pasienDaftar.tglRegistrasi){
                            data[y].pasienDaftar.tglRegistrasi = new moment(new Date(data[y].pasienDaftar.tglRegistrasi)).format('DD-MM-YYYY');
                        }
                    }
                    var Warnaku = [];
                    for(var i = 0; i<e.data.data.listData.length; i++){
                        switch(data[i].statusAntrian){
                           case "UNDIFINED" :
                             data[i].myStyle = {'background-color': '#606572','color' : '#F0FFFF'};
                             break;
                           case "MENUNGGU" :
                             data[i].myStyle = {'background-color': '#606572','color' : '#F0FFFF'};
                             break;
                           case "DIPANGGIL_SUSTER" :
                             data[i].myStyle = {'background-color': '#625D5D','color' : '#F0FFFF'};
                             break;
                           case "DIPANGGIL_DOKTER":
                             data[i].myStyle = {'background-color': '#FF0000','color' : '#F0FFFF'};
                             break;
                           case "SELESAI_DIPERIKSA":
                             data[i].myStyle = {'background-color': '#00FF00'};
                             break;
                           case "SAMPLE_DI_TERIMA":
                             data[i].myStyle = {'background-color': '#FF3BAD'};
                             break;
                           case "SAMPLE_DI_AMBIL":
                             data[i].myStyle = {'background-color': '#FF7E3B'};
                             break;
                           case "VALIDASI_ANALIS":
                             data[i].myStyle = {'background-color': '#f6a8ff'};
                             break;
                            case "VALIDASI":
                             data[i].myStyle = {'background-color': '#701afb'};
                             break;
                             case "PERIKSA":
                             data[i].myStyle = {'background-color': '#00FF00'};
                             break;
                        }  
                    }
                    }
                    $scope.isLoadingData = false;
                    data = _.sortBy(data, function(e) {
                        if (e.strukOrder.noOrderIntern == undefined)
                            return 100000;
                        return -1 * parseInt(e.strukOrder.noOrderIntern.substring(1));
                    });
                    $scope.listDataPasien =
                        new kendo.data.DataSource({
                            data: data
                        });
                    $scope.listDataPasien.fetch(function(e) {
                        var temp = [];
                        for (var key in this._data) {
                            if (this._data.hasOwnProperty(key)) {
                                var element = this._data[key];
                                if (angular.isFunction(element) === false && key !== "_events" && key !== "length")
                                    temp.push(element);
                            }
                        }
                        $scope.listPasien = temp;
                        cacheHelper.set('listBedahSentral', temp);
                    });
                });


            }

           //Auto Reload Data Interval.
             // $scope.intervalFunction = function(){
             //    $timeout(function() {
             //      $scope.refresh();
             //      $scope.intervalFunction();
             //    }, 1000)
             //  };
             //  $scope.intervalFunction();


            socket.on('DaftarAntrianBedahSentral', function(data) {
                $scope.refresh();
            });

            $scope.refresh();
            $scope.notDetail = true;
            if ($state.current.name === 'BedahSentral.Queue' || $state.current.name === 'BedahSentral.Sample' || $state.current.name === 'Radiologi.Result' || $state.current.name === 'BedahSentral.Take') {
                $scope.notDetail = false;
            }

            $scope.title = $state.params.title;
            if ($scope.title === undefined)
                $scope.title = "Daftar Pasien Terdaftar";

            $scope.verifikasi = function() {
                $state.go('DashboardBedahSentralCtrlVerifikasi', {
                    noRegistrasi: $scope.item.noRec,
                    noOrder: $scope.item.strukOrder.noOrder,
                    noAntrianPasien: $scope.item.noRec,
                    noRegister: $scope.item.noRec
                })
            }

            $scope.daftarAntrian = function(){
                 $state.go('daftarAntrian', {
                    norec: $scope.item.noRec
                   
                })
            }
        
            $scope.kasa = function() {
                debugger;
                $state.go('LaporanPerhitunganKasaBaru', {
                    noRec : $scope.item.noRec
                })
            }
            $scope.CheckIn = function() {
                if($scope.item == undefined || $scope.item.noRec == undefined){
                    window.messageContainer.error('Pilih 1 Daftar Antrian terlebih dahulu !!');
                }else{
                $state.go('CheckIn', {
                      noRec : $scope.item.noRec,
                })
                }
            }
            $scope.FormulirPraAnastesiPasien = function() {
                if($scope.item == undefined || $scope.item.noRec == undefined){
                    window.messageContainer.error('Pilih 1 Daftar Antrian terlebih dahulu !!');
                }else{
                $state.go('FormulirPraAnastesiSedasi', {
                      noRec : $scope.item.noRec,
            
                })
                }
            }

            $scope.FormulirPraAnastesiDokter = function() {
                debugger;
                if($scope.item == undefined || $scope.item.noRec == undefined){
                    window.messageContainer.error('Pilih 1 Daftar Antrian terlebih dahulu !!')
                }else{
                $state.go('FormulirPraAnastesiSedasiPerawat', {
                      noRec : $scope.item.noRec,
            
                })
            }
            }

            $scope.LaporanPembedahanInstuksiPasca = function() {
                if($scope.item == undefined || $scope.item.noRec == undefined){
                    window.messageContainer.error('Pilih 1 Daftar Antrian terlebih dahulu !!')
                }else{
                $state.go('LaporanPembedahanInstruksiPasca', {
                      noRec : $scope.item.noRec,
            
                })
                }
            }

            $scope.PemantauanAnestesi = function(){
                 if($scope.item == undefined || $scope.item.noRec == undefined){
                    window.messageContainer.error('Pilih 1 Daftar Antrian terlebih dahulu !!')
                 }else{
                 $state.go('PemantauanAnestesi', {
                 noRec : $scope.item.noRec,
                })
                 }
            }

            $scope.AskepPerawatAndBedah = function(){
                if($scope.item == undefined || $scope.item.noRec == undefined){
                    window.messageContainer.Eror('Pilih 1 Daftar Antrian terlebih dahulu !!')
                }else{
                 $state.go('AsuhanKeperawatanPeriOperatif', {
                      noRec : $scope.item.noRec,
                })
                }
            }

            $scope.AskepPerawatIntra = function(){
                if($scope.item == undefined || $scope.item.noRec == undefined){
                 window.messageContainer.error('Pilih 1 Daftar Antrian terlebih dahulu !!')
                 }else{
                 $state.go('IntraOperasi', {
                      noRec : $scope.item.noRec,
                })
                }
            }
            $scope.AskepPerawatAnestesi = function(){
                if($scope.item == undefined || $scope.item.noRec == undefined){
                window.messageContainer.error('Pilih 1 Daftar Antrian terlebih dahulu !!')
                }else{
                 $state.go('IntraOperasiAnestesi', {
                      noRec : $scope.item.noRec,
                })
                 }
            }

            $scope.Rencana = function() {
                if($scope.item == undefined || $scope.item.noRec == undefined){
                window.messageContainer.error('Pilih 1 Daftar Antrian terlebih dahulu !!')
                }else{
                $state.go('PasienBedah.Schedule', {
                    noRec : $scope.item.noRec,
                })
                }
            }
            $scope.SignIn = function() {
                debugger;
                if($scope.item == undefined || $scope.item.noRec == undefined){
                    window.messageContainer.error('Pilih 1 Daftar Antrian terlebih dahulu !!')
                }else{
                $state.go('SignIn', {
                    noRec : $scope.item.noRec,

                })
                }
            }
            $scope.PerhitunganKasa = function() {
                if($scope.item == undefined || $scope.item.noRec == undefined){
                    window.messageContainer.error('Pilih 1 Daftar Antrian terlebih dahulu !!')
                }else{
                $state.go('PasienBedah.PerhitunganKasa', {
                    noRegister: $scope.item.noRec
                })
                }
            }
            $scope.TimeOut = function() {
                if($scope.item == undefined || $scope.item.noRec == undefined){
                    window.messageContainer.error('Pilih 1 Daftar Antrian terlebih dahulu !!')
                }else{
                $state.go('TimeOut', {
                   noRec : $scope.item.noRec,
                })
                }
            }
            $scope.laporanPembedahan = function() {
                if($scope.item == undefined || $scope.item.noRec == undefined){
                    window.messageContainer.error('Pilih 1 Daftar Antrian terlebih dahulu !!')
                }else{
                $state.go('PasienBedah.LaporanPembedahan', {
                    noRec : $scope.item.noRec,
                })
                }
            }
            $scope.CheckOut = function() {
                if ($scope.item == undefined || $scope.item.noRec == undefined) {
                    window.messageContainer.error('Pilih 1 Daftar Antrian terlebih dahulu !!')
                }else{
                $state.go('CheckOut', {
                    noRec : $scope.item.noRec,
                })
                }
            }
            $scope.SignOut = function() {
                if ($scope.item == undefined || $scope.item.noRec == undefined) {
                    window.messageContainer.error('Pilih 1 Daftar Antrian terlebih dahulu !!')
                }else{
                $state.go('SignOut', {
                    noRec : $scope.item.noRec,
                })
                }
            }

        $scope.PostOperasiAnestesi = function() {
                if ($scope.item == undefined || $scope.item.noRec == undefined) {
                    window.messageContainer.error('Pilih 1 Daftar Antrian terlebih dahulu !!')
                }else{
                $state.go('PostOperasiAnestesi', {
                    noRec : $scope.item.noRec,
                })
                }
            }

       $scope.PostOperasiPerawatBedah = function() {
                if ($scope.item == undefined || $scope.item.noRec == undefined) {
                    window.messageContainer.error('Pilih 1 Daftar Antrian terlebih dahulu !!')
                }else{
                $state.go('PostOperasiPerawatBedah', {
                    noRec : $scope.item.noRec,
                })
                }
         }



             $scope.rincianClick = function(){
              debugger;
                if($scope.item.pasienDaftar.noRegistrasi != undefined){
                    var obj = {
                        noRegistrasi : $scope.item.pasienDaftar.noRegistrasi
                    }

                    $state.go('RincianTagihanTataRekening', {
                        dataPasien: JSON.stringify(obj)
                    });
                }
            }

            $scope.group = {
                field: "statusAntrian",
            };
            $scope.laporanClick = function()
            {
                if($scope.item.pasien.noCm != undefined){
                    var fixUrlLaporan = reportHelper.open("reporting/lapCheckListProsedurKeselamatan?noRegistrasi="+$scope.item.pasien.noCm);
                    window.open(fixUrlLaporan, '_blank')
                } 
            }
            //@RENDY

        }
    ]);
});