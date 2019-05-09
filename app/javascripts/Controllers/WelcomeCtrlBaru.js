define(['initialize'], function(initialize) {
    initialize.controller('WelcomeCtrl', ['$state', 'socket', '$window', '$location', '$scope', 'R', '$rootScope', 'MenuService', 'LoginHelper',
        function($state, socket, $window, $location, $scope, r, $rootScope, MenuService, LoginHelper) {

            $scope.title = "hayolohhh muncul";

            $rootScope.showMenuUtama  = true;

            $rootScope.menu = [];

            $rootScope.rootRuanganUnitKerja = JSON.parse(window.localStorage.getItem("dataRuangan"));

            var sdhLogout = $rootScope.rootRuanganUnitKerja == undefined || $rootScope.rootRuanganUnitKerja == null;

            if (!sdhLogout) {
                $scope.idCurrentIdMenuLayanan = JSON.parse(window.localStorage.getItem("idCurrentIdMenuLayanan"));
                $scope.modulAplikasiId = JSON.parse(window.localStorage.getItem("modulAplikasiId"));
                $rootScope.showMenuUtama  = false;

                MenuService.getDataMenu("modul-aplikasi/get-all-sub-modul/"+$scope.idCurrentIdMenuLayanan+"/show")
                    .then(function(result) {
                        $scope.DaftarSubModul = result.data;

                        if($scope.DaftarSubModul.length >= 8) {
                            $scope.gridStyle = "grid_2";                        
                        } else {
                            $scope.gridStyle = "grid_3";
                        }

                        $scope.dataWelcome = JSON.parse(window.localStorage.getItem("dataWelcome"));
                        
                        $scope.showSubMenu($scope.modulAplikasiId , $scope.dataWelcome.urlIconModul, $scope.dataWelcome.namaModul, true);

                });

            }            

            var getShowMenuPelayanan = function(noUrut){
                switch(noUrut){
                    case 1:
                        return "showMenuRmPelayanan";
                    break;

                    case 2:
                        return "showMenuRmPelayanan";
                    break;

                    case 3:
                        return "showMenuSarpras";
                    break;

                    case 4:
                        return "showMenuSDM";
                    break;

                    case 5:
                        return "showMenuKeuangan";
                    break;

                    case 6:
                        return "showMenuManajemen";
                    break;  
                }
            }


            var getTooltip = function(noUrut){
                switch(noUrut){
                    case 1:
                        return "showTooltipRmPelayanan";
                    break;

                    case 2:
                        return "showTooltipRmPelayanan";
                    break;

                    case 3:
                        return "showTooltipSarpras";
                    break;

                    case 4:
                        return "showTooltipSDM";
                    break;

                    case 5:
                        return "showTooltipKeuangan";
                    break;

                    case 6:
                        return "showTooltipManajemen";
                    break;  
                }
            }

            var getClassTooltip = function(noUrut){
                switch(noUrut){
                    case 1:
                        return "tooltip-rmpelayanan";
                    break;

                    case 2:
                        return "tooltip-rmpelayanan";
                    break;

                    case 3:
                        return "tooltip-sarpras";
                    break;

                    case 4:
                        return "tooltip-sdm";
                    break;

                    case 5:
                        return "tooltip-keuangan";
                    break;

                    case 6:
                        return "tooltip-manajemen";
                    break;  
                }
            }


            MenuService.getDataMenu("modul-aplikasi/get-all-sub-system") // Enam Sub Sistem Rumah Sakit
                .then(function(result) {

                    $rootScope.socketOffruanganId($rootScope.rootRuanganUnitKerja);

                    $scope.DaftarMenu = result.data;
                    for(var i=0; i<$scope.DaftarMenu.length; i++){
                        $scope.DaftarMenu[i].modulClass = "menu0"+(i+1)+ "anime0"+(i+1);
                        $scope.DaftarMenu[i].showTooltip = false;
                        $scope.DaftarMenu[i].modulClass = "menu0"+(i+1)+ " anime0"+(i+1);
                        $scope.DaftarMenu[i].tooltipClass = getClassTooltip($scope.DaftarMenu[i].noUrut);
                        $scope.DaftarMenu[i].showMenuPelayanan = getShowMenuPelayanan($scope.DaftarMenu[i].noUrut);
                        $scope.DaftarMenu[i].classTooltip = "tooltip-menu-"+(i+1);
                    }
            });

            $scope.DefaultLeftMenu = [];
                
            MenuService.getDataMenu("modul-aplikasi/get-all-default-objek-modul").then(function(result){
                debugger;
                $scope.DefaultLeftMenu = result.data;
            });

            $scope.datauserlogin = JSON.parse(window.localStorage.getItem("datauserlogin"));
            
            $rootScope.isOpen = true;

            $rootScope.hideMenuUp = false;
            $scope.changeMenu = function(menu) {

                if (menu.children !== undefined) {
                    $scope.menus = menu.children;
                    $scope.listMenu.push($scope.menus);
                }
            };
            $scope.Back = function() {
                var item = $scope.listMenu.slice(0, $scope.listMenu.length - 1);
                $scope.listMenu = item;
                $scope.menus = item[item.length - 1];
            };

            $scope.listMenu = [$scope.menus];
            $scope.request = function() {
                r({
                    method: 'GET',
                    url: '/app/data/GetRequireConfig'
                }).then(function(data) {}, function(error) {});
            }
            $scope.data = [{
                link: '#/Pasien',
                Name: 'Pasien'
            }];

            $scope.hideUnitKerjaAtauRuanganSaja = function(){
                $scope.showRootRuangan = false;
            }    

            $scope.hideUnitKerjaAtauRuangan = function(){
                var lDataRuangan = $rootScope.rootRuanganUnitKerja;

                MenuService.getDataMenu("modul-aplikasi/pilih-ruangan/"+$scope.modulaplikasiid+"/"+lDataRuangan.ruanganId) 
                    .then(function(result) {
                        
                        if(result.data != ""){
                            $rootScope.notifListperRuangan($rootScope.rootRuanganUnitKerja); // Socket on

                            $scope.showRootRuangan = false;
                            $rootScope.isOpenMenu = !$rootScope.isOpenMenu;
                            window.localStorage.setItem('dataRuangan', JSON.stringify($rootScope.rootRuanganUnitKerja));
                            window.localStorage.setItem('modulAplikasiId', JSON.stringify($scope.modulAplikasiId));

                            var pegawai = JSON.parse(result.data);

                            window.localStorage.setItem('pegawai', JSON.stringify(pegawai));

                            var dataWelcome = {
                                "namaModul" : $scope.namaModul,
                                "urlIconModul" : $scope.urlIconModul,
                                "unitKerja" : $rootScope.rootRuanganUnitKerja.namaRuangan
                            }

                            window.localStorage.setItem('dataWelcome', JSON.stringify(dataWelcome));

                            $state.go("welcome");
                        }
                        else
                        {
                            window.messageContainer.error(result.headers('error_message'));
                        }

                }, function(response){
                    if (response.headers('error_message') == undefined) {                        
                        window.messageContainer.error('Periksa jaringan LAN.');
                    } else {
                        window.messageContainer.error(response.headers('error_message'));
                    }
                });  
            }

            $scope.hideMenuUtama = function(){
                $rootScope.showMenuUtama  = true;
                $scope.showRootRuangan = false;
            }

            $scope.backToMenuUtama = function(){
                
                $rootScope.socketOffruanganId($rootScope.rootRuanganUnitKerja);

                window.localStorage.removeItem('dataRuangan');
                window.localStorage.removeItem('modulAplikasiId');
                $scope.DaftarSubModul = [];
                $rootScope.showMenuUtama  = true;                
            }

            $rootScope.showRootFormlogin = false
            $rootScope.showRootAuthPassword = false;
            $scope.showRootRuangan = false;
            $rootScope.rootRuanganUnitKerja = {};

            $scope.idCurrentIdMenuLayanan = 0;
            $scope.currShowMenuLayanan = "";

            $scope.goToMenuLayanan = function(showMenuLayanan, id, modulAplikasi){
                $scope.titleMenu = modulAplikasi,
                $scope.idCurrentIdMenuLayanan = id;
                $scope.currShowMenuLayanan = showMenuLayanan;
                $rootScope.showMenuUtama  = false;
                $scope.showSubModul();
            }

            $scope.changeDataRuangan = function(rootRuanganUnitKerja){
                $rootScope.rootRuanganUnitKerja = rootRuanganUnitKerja;
                window.localStorage.setItem('dataRuangan', JSON.stringify($rootScope.rootRuanganUnitKerja));
            }

            $scope.showSubModul = function(){          
                window.localStorage.removeItem('dataRuangan');
                $scope.showRootRuangan = false;
                $rootScope.showMenuUtama  = false;                
                $scope[$scope.currShowMenuLayanan] = true;

                window.localStorage.setItem('idCurrentIdMenuLayanan', JSON.stringify($scope.idCurrentIdMenuLayanan));

                MenuService.getDataMenu("modul-aplikasi/get-all-sub-modul/"+$scope.idCurrentIdMenuLayanan+"/show")
                    .then(function(result) {
                        $scope.DaftarSubModul = result.data;

                        if($scope.DaftarSubModul.length >= 8)
                            $scope.gridStyle = "grid_2";
                        else
                            $scope.gridStyle = "grid_3";

                });
            }

            $scope.showTooltipManajemen = false;
            $scope.showTooltipSDM = false;
            $scope.showTooltipKeuangan = false;
            $scope.showTooltipRmPelayanan = false;
            $scope.showTooltipSarpras = false;

            $scope.hoverMenu = function(data){
                data.showTooltip = true;
            }

            $scope.leaveMenu = function(data){
                data.showTooltip = false;
            }

            var getChildren = function(arr){
                var children = [];
                for(var i=0; i< arr.length; i++){
                    var menu = {};
                    menu["name"] = arr[i].objekModulAplikasi;
                    menu["id"] = arr[i].id;    

                    if(arr[i].children.length > 0){
                        menu["children"] = getChildren(arr[i].children);
                    }
                    else
                    {
                        menu["link"] = arr[i].alamatUrlForm;
                    }

                    children.push(menu);
                }
                return children;
            }

            $scope.showPopupRuangan = function(id){
                MenuService.getDataMenu("modul-aplikasi/get-all-unit-kerja/"+$scope.datauserlogin.id+"/"+id+"/show")
                .then(function(result) {
                    $rootScope.rootListRuangan = result.data;
                    if(result.data.length > 0){
                        $rootScope.rootRuanganUnitKerja = result.data[0];
                        $scope.modulAplikasiId = id;
                        $scope.showRootRuangan = true;
                    }
                    else
                    {
                        $scope.showRootRuangan = false;
                        window.messageContainer.error(result.headers('error_message'));
                    }
                }, function(response) {
                    $scope.showRootRuangan = false;
                    if (response.headers('error_message') == undefined) {                        
                        window.messageContainer.error('Periksa jaringan LAN.');
                    } else {
                        window.messageContainer.error(response.headers('error_message'));
                    }
                });
            }

            $scope.showSubMenu = function(id, urlIconModul, nama, isLogin){              
                
                $scope.modulaplikasiid = id; 
                $scope.urlIconModul = urlIconModul;
                $scope.namaModul = nama;

                MenuService.getDataMenu("modul-aplikasi/get-all-objek-modul/"+$scope.datauserlogin.id+"/"+$scope.modulaplikasiid+"/show")
                    .then(function(result) {
                        
                        $scope.showPopupRuangan(id);

                        $rootScope.menu = [];
                        var menu = {};
                        menu["name"] = "Depan";
                        menu["link"] = "#/home";
                        
                        $rootScope.menu.push(menu);

                        var childMenu = result.data;   
                        var defMenu = $scope.DefaultLeftMenu;
                           
                        for (var i=0; i < defMenu.length; i++){
                           
                            menu = {};
                            var add = false;
                            menu["children"] = [];   
                            for (var j=0; j < childMenu.length; j++){
                                if (defMenu[i].id == childMenu[j].kdObjekModulAplikasiHead){
                                    menu["name"] = defMenu[i].objekModulAplikasi;      
                                    menu["id"] = defMenu[i].id;                              
                                    var iChildMenu = {};
                                    iChildMenu["name"] = childMenu[j].objekModulAplikasi;
                                    if(childMenu[j].children.length > 0){
                                        iChildMenu["children"] = getChildren(childMenu[j].children);
                                    }
                                    menu["children"].push(iChildMenu);
                                } 
                            }
                            if ("name" in menu){
                                $rootScope.menu.push(menu);
                            }

                            if(isLogin)
                            {
                                $state.go("welcome");
                            }
                        }    
                  
                }, function(response) {
                    $scope.showRootRuangan = false;
                    if (response.headers('error_message') == undefined) {                        
                        window.messageContainer.error('Periksa jaringan LAN.');
                    } else {
                        window.messageContainer.error(response.headers('error_message'));
                    }
                });                
            }

            $scope.menuBackOffices = [{
                imgUrl: 'stylesheets/keuangan.png',
                title: 'Keuangan'
            }, {
                imgUrl: 'stylesheets/sarpras.png',
                title: 'Sarana & Prasarana'
            }, {
                imgUrl: 'stylesheets/hrd.png',
                title: 'SDM'
            }, {
                imgUrl: 'stylesheets/management.png',
                title: 'management'
            }];
            $scope.menus = [{
                imgUrl: 'stylesheets/RekamMedik.png',
                title: 'Rekam Medik'
            }, {
                imgUrl: 'stylesheets/pelayananMedik.png',
                title: 'Pelayanan Medik',
                children: [{
                    imgUrl: 'stylesheets/RekamMedik.png',
                    title: 'Instalasi Rawat Jalan',
                    children: [{
                        imgUrl: 'stylesheets/RekamMedik.png',
                        title: 'Instalasi Rawat Jalan',
                        children: [{
                            imgUrl: 'stylesheets/RekamMedik.png',
                            title: 'Spesialis Anak',
                            children: [{
                                imgUrl: 'stylesheets/RekamMedik.png',
                                title: 'Alamanda'
                            }, {
                                imgUrl: 'stylesheets/RekamMedik.png',
                                title: 'Potas'
                            }, {
                                imgUrl: 'stylesheets/RekamMedik.png',
                                title: 'Aster'
                            }]
                        }, {
                            imgUrl: 'stylesheets/RekamMedik.png',
                            title: 'Spesialis THT'
                        }]

                    }, {
                        imgUrl: 'stylesheets/RekamMedik.png',
                        title: 'Instalasi Rawat Jalan Terpadu'
                    }, {
                        imgUrl: 'stylesheets/RekamMedik.png',
                        title: 'Instalasi Gawat Darurat'
                    }]
                }, {
                    imgUrl: 'stylesheets/RekamMedik.png',
                    title: 'Instalasi Rawat Inap'
                }]
            }];
        }
    ]);
});