define(['initialize'], function(initialize) {
    initialize.controller('WelcomeCtrl', ['$scope', 'R', '$rootScope', 'MenuService', 'LoginHelper',
        function($scope, r, $rootScope, MenuService, LoginHelper) {

            $scope.title = "hayolohhh muncul";

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


            /*menu layanan*/
            $scope.showMenuManajemen = false;
            $scope.showMenuSDM = false;
            $scope.showMenuKeuangan = false;
            $scope.showMenuRmPelayanan = false;
            $scope.showMenuSarpras = false;

            $scope.showMenuUtama = true;

            $scope.backToMenuUtama = function()
            {
                $scope.showMenuManajemen = false;
                $scope.showMenuSDM = false;
                $scope.showMenuKeuangan = false;
                $scope.showMenuRmPelayanan = false;
                $scope.showMenuSarpras = false;

                $scope.showMenuUtama = true;
            }

            $scope.goToMenuLayanan = function(showMenuLayanan){
                $scope.showMenuManajemen = false;
                $scope.showMenuSDM = false;
                $scope.showMenuKeuangan = false;
                $scope.showMenuRmPelayanan = false;
                $scope.showMenuSarpras = false;

                $scope[showMenuLayanan] = true;
                $scope.showMenuUtama = false;

                //get menu form db
                /*MenuService.get(showMenuLayanan)
                .then(function(result) {
                    $scope.DaftarMenu = result;
                });*/

               switch(showMenuLayanan){
                   case "showMenuManajemen":
                        $scope.titleMenu = "Manajemen";
                        $scope.DaftarMenu = [
                            { "title" : "eis", "url_image" : "menu-manajemen/eis.jpg" },
                            { "title" : "komite-etik-hukum", "url_image" : "menu-manajemen/komite-etik-hukum.jpg" },
                            { "title" : "komite-keperawatan", "url_image" : "menu-manajemen/komite-keperawatan.jpg" },
                            { "title" : "komite-medis", "url_image" : "menu-manajemen/komite-medis.jpg" },
                            { "title" : "spi", "url_image" : "menu-manajemen/spi.jpg" },
                            { "title" : "sysadmin", "url_image" : "menu-manajemen/sysadmin.jpg" }
                        ];

                   break;

                   case "showMenuSDM":
                        $scope.titleMenu = "Sumber Daya Manusia";
                        $scope.DaftarMenu = [
                            { "title" : "sdm", "url_image" : "menu-sdm/sdm.jpg" },
                            { "title" : "pendidikan", "url_image" : "menu-sdm/pendidikan.jpg" },
                            { "title" : "pelatihan", "url_image" : "menu-sdm/pelatihan.jpg" },
                            { "title" : "sysadmin", "url_image" : "menu-sdm/sysadmin.jpg" }
                        ];
                   break;

                   case "showMenuKeuangan":
                        $scope.titleMenu = "Keuangan";
                        $scope.DaftarMenu = [
                            { "title" : "akuntansi", "url_image" : "menu-keuangan/akuntansi.jpg" },
                            { "title" : "bendahara-penerimaan", "url_image" : "menu-keuangan/bendahara-penerimaan.jpg" },
                            { "title" : "bendahara-pengeluaran", "url_image" : "menu-keuangan/bendahara-pengeluaran.jpg" },
                            { "title" : "hutang-piutang", "url_image" : "menu-keuangan/hutang-piutang.jpg" },
                            { "title" : "kasir-penerimaan", "url_image" : "menu-keuangan/kasir-penerimaan.jpg" },
                            { "title" : "kasir-pengeluaran", "url_image" : "menu-keuangan/kasir-pengeluaran.jpg" },
                            { "title" : "perencanaan-anggaran", "url_image" : "menu-keuangan/perencanaan-anggaran.jpg" },
                            { "title" : "sysadmin", "url_image" : "menu-keuangan/sysadmin.jpg" }
                        ];
                   break;

                   case "showMenuRmPelayanan":
                        $scope.titleMenu = "Rekam Medis & Pelayanan";
                        $scope.DaftarMenu = [
                            { "title" : "bedah-sentral", "url_image" : "menu-rm-pelayanan/bedah-sentral.jpg" },
                            { "title" : "depo-farmasi", "url_image" : "menu-rm-pelayanan/depo-farmasi.jpg" },
                            { "title" : "gawat-darurat", "url_image" : "menu-rm-pelayanan/gawat-darurat.jpg" },
                            { "title" : "gizi-kantin", "url_image" : "menu-rm-pelayanan/gizi-kantin.jpg" },
                            { "title" : "gudang-farmasi", "url_image" : "menu-rm-pelayanan/gudang-farmasi.jpg" },
                            { "title" : "lab", "url_image" : "menu-rm-pelayanan/lab.jpg" },
                            { "title" : "radiology", "url_image" : "menu-rm-pelayanan/radiology.jpg" },
                            { "title" : "rawat-inap", "url_image" : "menu-rm-pelayanan/rawat-inap.jpg" },
                            { "title" : "rawat-jalan", "url_image" : "menu-rm-pelayanan/rawat-jalan.jpg" },
                            { "title" : "regis-pasien", "url_image" : "menu-rm-pelayanan/regis-pasien.jpg" },
                            { "title" : "rehab-medik", "url_image" : "menu-rm-pelayanan/rehab-medik.jpg" },
                            { "title" : "rekam-medis", "url_image" : "menu-rm-pelayanan/rekam-medis.jpg" },
                            { "title" : "sistem-informasi-rs", "url_image" : "menu-rm-pelayanan/sistem-informasi-rs.jpg" },
                            { "title" : "sysadmin", "url_image" : "menu-rm-pelayanan/sysadmin.jpg" }
                        ];
                   break;

                   case "showMenuSarpras":
                        $scope.titleMenu = "Sarana dan Prasarana";
                        $scope.DaftarMenu = [
                            { "title" : "adm-tatausaha", "url_image" : "menu-sarpras/adm-tatausaha.jpg" },
                            { "title" : "ambulance", "url_image" : "menu-sarpras/ambulance.jpg" },
                            { "title" : "binatu-laundry", "url_image" : "menu-sarpras/binatu-laundry.jpg" },
                            { "title" : "cssd", "url_image" : "menu-sarpras/cssd.jpg" },
                            { "title" : "gudang-gizi", "url_image" : "menu-sarpras/gudang-gizi.jpg" },
                            { "title" : "gudang-terminal", "url_image" : "menu-sarpras/gudang-terminal.jpg" },
                            { "title" : "gudang-umum", "url_image" : "menu-sarpras/gudang-umum.jpg" },
                            { "title" : "hukum-organisasi", "url_image" : "menu-sarpras/hukum-organisasi.jpg" },
                            { "title" : "humas-pemasaran", "url_image" : "menu-sarpras/humas-pemasaran.jpg" },
                            { "title" : "informasi-rs", "url_image" : "menu-sarpras/informasi-rs.jpg" },
                            { "title" : "kesehatan-keselamatan-kerja", "url_image" : "menu-sarpras/kesehatan-keselamatan-kerja.jpg" },
                            { "title" : "psrs", "url_image" : "menu-sarpras/psrs.jpg" },
                            { "title" : "rumah-tangga", "url_image" : "menu-sarpras/rumah-tangga.jpg" },
                            { "title" : "ulp", "url_image" : "menu-sarpras/ulp.jpg" },
                            { "title" : "sysadmin", "url_image" : "menu-sarpras/sysadmin.jpg" }
                        ];
                   break;
               };

                if($scope.DaftarMenu.length > 8)
                    $scope.gridStyle = "grid_2";
                else
                    $scope.gridStyle = "grid_3";
            }


            $scope.showTooltipManajemen = false;
            $scope.showTooltipSDM = false;
            $scope.showTooltipKeuangan = false;
            $scope.showTooltipRmPelayanan = false;
            $scope.showTooltipSarpras = false;

            $scope.hoverMenu = function(showTooltip){
                $scope[showTooltip] = true;
            }

            $scope.leaveMenu = function(showTooltip){
                $scope[showTooltip] = false;
            }

            $scope.showSubMenu = function(title){
                //ini ambil menu sesuai hirarkinya
                MenuService.get("GetSideMenu" + "/Menu" + title)
                .then(function(result) {
                    $rootScope.menu = result;
                });
                $rootScope.isOpenMenu = !$rootScope.isOpenMenu;
            }
        }
    ]);


});