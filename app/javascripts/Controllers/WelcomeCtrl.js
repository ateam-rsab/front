define(['initialize'], function (initialize) {
    initialize.controller('WelcomeCtrl', ['$scope', '$state', 'R', '$rootScope', 'MenuService', 'LoginHelper', '$mdDialog', 'DateHelper',
        function ($scope, $state, r, $rootScope, MenuService, LoginHelper, $mdDialog, DateHelper) {
            //#region slide

            const _C = document.querySelector(".slider-container"),
                N = _C.children.length;

            _C.style.setProperty("--n", N);

            // detect the direction of the motion between "touchstart" (or "mousedown") event
            // and the "touched" (or "mouseup") event
            // and then update --i (current slide) accordingly
            // and move the container so that the next image in the desired direction moves into the viewport

            // on "mousedown"/"touchstart", lock x-coordiate
            // and store it into an initial coordinate variable x0:
            let x0 = null;
            let locked = false;

            function lock(e) {
                x0 = unify(e).clientX;
                // remove .smooth class
                _C.classList.toggle("smooth", !(locked = true));
            }

            // next, make the images move when the user swipes:
            // was the lock action performed aka is x0 set?
            // if so, read current x coordiante and compare it to x0
            // from the difference between these two determine what to do next

            let i = 0; // counter
            let w; //image width

            // update image width w on resive
            function size() {
                w = window.innerWidth;
            }

            function move(e) {
                if (locked) {
                    // set threshold of 20% (if less, do not drag to the next image)
                    // dx = number of pixels the user dragged
                    let dx = unify(e).clientX - x0,
                        s = Math.sign(dx),
                        f = +(s * dx / w).toFixed(2);

                    // Math.sign(dx) returns 1 or -1
                    // depending on this, the slider goes backwards or forwards

                    if ((i > 0 || s < 0) && (i < N - 1 || s > 0) && f > 0.2) {
                        _C.style.setProperty("--i", (i -= s));
                        f = 1 - f;
                    }

                    _C.style.setProperty("--tx", "0px");
                    _C.style.setProperty("--f", f);
                    _C.classList.toggle("smooth", !(locked = false));
                    x0 = null;
                }
            }

            size();

            addEventListener("resize", size, false);

            // ===============
            // drag-animation for the slider when it reaches the end
            // ===============

            function drag(e) {
                e.preventDefault();

                if (locked) {
                    _C.style.setProperty("--tx", `${Math.round(unify(e).clientX - x0)}px`);
                }
            }

            // ===============
            // prev, next
            // ===============
            let prev = document.querySelector(".prev");
            let next = document.querySelector(".next");

            prev.addEventListener("click", () => {
                if (i == 0) {
                    console.log("start reached");
                } else if (i > 0) {
                    // decrease i as long as it is bigger than the number of slides
                    _C.style.setProperty("--i", i--);
                }
            });

            next.addEventListener("click", () => {
                if (i < N) {
                    // increase i as long as it's smaller than the number of slides
                    _C.style.setProperty("--i", i++);
                }
            });

            // ===============
            // slider event listeners for mouse and touch (start, move, end)
            // ===============

            _C.addEventListener("mousemove", drag, false);
            _C.addEventListener("touchmove", drag, false);

            _C.addEventListener("mousedown", lock, false);
            _C.addEventListener("touchstart", lock, false);

            _C.addEventListener("mouseup", move, false);
            _C.addEventListener("touchend", move, false);

            // override Edge swipe behaviour
            _C.addEventListener(
                "touchmove",
                e => {
                    e.preventDefault();
                },
                false
            );

            // unify touch and click cases:
            function unify(e) {
                return e.changedTouches ? e.changedTouches[0] : e;
            }

            //#endregion slide

            $scope.now = new Date();
            $rootScope.isOpen = true;
            $scope.showAlertChangePassword = function () {

                let confirmChangePassword = $mdDialog.confirm()
                    .title('Perhatian !')
                    .textContent('Harap kepada pengguna SMART untuk mengganti Kata Kunci/Password pengguna anda')
                    .ariaLabel('Alert Dialog 2')
                    .ok('Ganti Password').cancel('Batal');

                $mdDialog.show(confirmChangePassword).then((e) => {
                    console.log(e);
                    $scope.showAlert();
                    $state.go('UbahPassword')
                }, function(e) {
                    console.log(e);
                    if(!e) {
                        $scope.showAlert();
                    }
                    // $scope.showAlert();
                });
            };
            $scope.showAlertChangePassword();

            $scope.showAlert = function () {
                // Appending dialog to document.body to cover sidenav in docs app
                // Modal dialogs should fully cover application
                // to prevent interaction outside of dialog
                $mdDialog.show(
                    $mdDialog.confirm()
                    .title('Perhatian !')
                    .textContent('Kepada seluruh karyawan Rumah Sakit Harapan Kita. Harap mengisi form Instrumen Self Assessment Risiko COVID-19')
                    .ariaLabel('Alert Dialog')
                    .ok('Go To Link').cancel('Batal')
                ).then((e) => {
                    console.log(e);
                    // $scope.showAlertChangePassword();
                    window.open('https://bit.ly/selfassessmentcovid19rsabhk', '_blank')
                }, function() {});
            };
            

            $scope.goToLink = function (url) {
                if (url.toLowerCase().indexOf('logout') < 0) {
                    if (url.toLowerCase().indexOf('bi-') > -1) {
                        window.open($window.location.origin + url, '_blank')
                    } else {
                        $window.location.href = url;
                        if (!$rootScope.$$phase) $rootScope.$apply();
                    }

                } else {
                    $rootScope.doLogout();
                }
            };

            var getNotif = function () {
                MenuService.getNotification('sdm/get-sip-str-expired-pegawai').then(res => {
                    $scope.messageNotif = '';
                    let data = res.data.data;

                    if (data.tglBerakhirSip && data.tglBerakhirStr) {
                        if (data.tglBerakhirSip >= DateHelper.toTimeStamp($scope.now) && data.tglBerakhirStr >= DateHelper.toTimeStamp($scope.now)) {
                            $scope.messageNotif = `SIP dan STR Anda akan berakhir pada ${DateHelper.getTanggalFormatted(new Date(data.tglBerakhirSip))} dan ${DateHelper.getTanggalFormatted(new Date(data.tglBerakhirStr))}. Mohon hubungi Bagian SDM untuk mengkonfirmasi status SIP dan STR terbaru Anda. Terima kasih`;
                            var popUp = $('#winSipStr').data('kendoWindow');
                            popUp.open().center();
                        } else if (data.tglBerakhirSip < DateHelper.toTimeStamp($scope.now) && data.tglBerakhirStr >= DateHelper.toTimeStamp($scope.now)) {
                            $scope.messageNotif = `Mohon hubungi Bagian SDM karena SIP Anda telah berakhir pada ${DateHelper.getTanggalFormatted(new Date(data.tglBerakhirSip))}. STR Anda akan berakhir pada ${DateHelper.getTanggalFormatted(new Date(data.tglBerakhirStr))}, mohon hubungi Bagian SDM untuk mengkonfirmasi status STR terbaru Anda. Terima kasih`;
                            var popUp = $('#winSipStr').data('kendoWindow');
                            popUp.open().center();
                        } else if (data.tglBerakhirSip >= DateHelper.toTimeStamp($scope.now) && data.tglBerakhirStr < DateHelper.toTimeStamp($scope.now)) {
                            $scope.messageNotif = `Mohon hubungi Bagian SDM karena STR Anda telah berakhir pada ${DateHelper.getTanggalFormatted(new Date(data.tglBerakhirStr))}. SIP Anda akan berakhir pada ${DateHelper.getTanggalFormatted(new Date(data.tglBerakhirSip))}, mohon hubungi Bagian SDM untuk mengkonfirmasi status SIP terbaru Anda. Terima kasih`;
                            var popUp = $('#winSipStr').data('kendoWindow');
                            popUp.open().center();
                        } else if (data.tglBerakhirSip < DateHelper.toTimeStamp($scope.now) && data.tglBerakhirStr < DateHelper.toTimeStamp($scope.now)) {
                            $scope.messageNotif = `Mohon hubungi Bagian SDM karena SIP dan STR Anda telah berakhir pada ${DateHelper.getTanggalFormatted(new Date(data.tglBerakhirSip))} dan ${DateHelper.getTanggalFormatted(new Date(data.tglBerakhirStr))}. Terima kasih`;
                            var popUp = $('#winSipStr').data('kendoWindow');
                            popUp.open().center();
                        }
                    } else if (data.tglBerakhirSip) {
                        if (data.tglBerakhirSip >= DateHelper.toTimeStamp($scope.now)) {
                            $scope.messageNotif = `SIP Anda akan berakhir pada ${DateHelper.getTanggalFormatted(new Date(data.tglBerakhirSip))}. Mohon hubungi Bagian SDM untuk mengkonfirmasi status SIP terbaru Anda. Terima kasih`;
                            var popUp = $('#winSipStr').data('kendoWindow');
                            popUp.open().center();
                        } else if (data.tglBerakhirSip < DateHelper.toTimeStamp($scope.now)) {
                            $scope.messageNotif = `Mohon hubungi Bagian SDM karena SIP Anda telah berakhir pada ${DateHelper.getTanggalFormatted(new Date(data.tglBerakhirSip))}. Terima kasih`;
                            var popUp = $('#winSipStr').data('kendoWindow');
                            popUp.open().center();
                        }
                    } else if (data.tglBerakhirStr) {
                        if (data.tglBerakhirStr >= DateHelper.toTimeStamp($scope.now)) {
                            $scope.messageNotif = `STR Anda akan berakhir pada ${DateHelper.getTanggalFormatted(new Date(data.tglBerakhirStr))}. Mohon hubungi Bagian SDM untuk mengkonfirmasi status STR terbaru Anda. Terima kasih`;
                            var popUp = $('#winSipStr').data('kendoWindow');
                            popUp.open().center();
                        } else if (data.tglBerakhirStr < DateHelper.toTimeStamp($scope.now)) {
                            $scope.messageNotif = `Mohon hubungi Bagian SDM karena STR Anda telah berakhir pada ${DateHelper.getTanggalFormatted(new Date(data.tglBerakhirStr))}. Terima kasih`;
                            var popUp = $('#winSipStr').data('kendoWindow');
                            popUp.open().center();
                        }
                    }
                });
            }

            getNotif();

            var checkAndSetPPDSLogin = function () {
                MenuService.getServiceSdm('pegawai/reset-login-pegawai-keluar').then(res => {
                    $scope.pesanPemberitahuan = '';

                    if (res.data.data.message == 'SUKSES') {
                        $scope.pesanPemberitahuan = `Program Pendidikan Dokter Spesialis Anda di RSAB Harapan Kita telah selesai!`;
                        var popUp = $('#winNotif').data('kendoWindow');
                        popUp.open().center();
                        setTimeout(function () {
                            popUp.close();
                        }, 3000);
                    }
                })
            }

            checkAndSetPPDSLogin();

            $rootScope.hideMenuUp = false;
            $scope.changeMenu = function (menu) {

                if (menu.children !== undefined) {
                    $scope.menus = menu.children;
                    $scope.listMenu.push($scope.menus);
                }
            };
            $scope.Back = function () {
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
            $scope.request = function () {
                r({
                    method: 'GET',
                    url: '/app/data/GetRequireConfig'
                }).then(function (data) {}, function (error) {});
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

            $scope.backToMenuUtama = function () {
                $scope.showMenuManajemen = false;
                $scope.showMenuSDM = false;
                $scope.showMenuKeuangan = false;
                $scope.showMenuRmPelayanan = false;
                $scope.showMenuSarpras = false;

                $scope.showMenuUtama = true;
            }

            $scope.goToMenuLayanan = function (showMenuLayanan) {
                $scope.showMenuManajemen = false;
                $scope.showMenuSDM = false;
                $scope.showMenuKeuangan = false;
                $scope.showMenuRmPelayanan = false;
                $scope.showMenuSarpras = false;

                $scope[showMenuLayanan] = true;
                $scope.showMenuUtama = false;

                switch (showMenuLayanan) {
                    case "showMenuManajemen":
                        $scope.titleMenu = "Manajemen";
                        $scope.DaftarMenu = [{
                                "title": "eis",
                                "url_image": "menu-manajemen/eis.jpg"
                            },
                            {
                                "title": "komite-etik-hukum",
                                "url_image": "menu-manajemen/komite-etik-hukum.jpg"
                            },
                            {
                                "title": "komite-keperawatan",
                                "url_image": "menu-manajemen/komite-keperawatan.jpg"
                            },
                            {
                                "title": "komite-medis",
                                "url_image": "menu-manajemen/komite-medis.jpg"
                            },
                            {
                                "title": "spi",
                                "url_image": "menu-manajemen/spi.jpg"
                            },
                            {
                                "title": "sysadmin",
                                "url_image": "menu-manajemen/sysadmin.jpg"
                            }
                        ];

                        break;

                    case "showMenuSDM":
                        $scope.titleMenu = "Sumber Daya Manusia";
                        $scope.DaftarMenu = [{
                                "title": "sdm",
                                "url_image": "menu-sdm/sdm.jpg"
                            },
                            {
                                "title": "pendidikan",
                                "url_image": "menu-sdm/pendidikan.jpg"
                            },
                            {
                                "title": "pelatihan",
                                "url_image": "menu-sdm/pelatihan.jpg"
                            },
                            {
                                "title": "sysadmin",
                                "url_image": "menu-sdm/sysadmin.jpg"
                            }
                        ];
                        break;

                    case "showMenuKeuangan":
                        $scope.titleMenu = "Keuangan";
                        $scope.DaftarMenu = [{
                                "title": "akuntansi",
                                "url_image": "menu-keuangan/akuntansi.jpg"
                            },
                            {
                                "title": "bendahara-penerimaan",
                                "url_image": "menu-keuangan/bendahara-penerimaan.jpg"
                            },
                            {
                                "title": "bendahara-pengeluaran",
                                "url_image": "menu-keuangan/bendahara-pengeluaran.jpg"
                            },
                            {
                                "title": "hutang-piutang",
                                "url_image": "menu-keuangan/hutang-piutang.jpg"
                            },
                            {
                                "title": "kasir-penerimaan",
                                "url_image": "menu-keuangan/kasir-penerimaan.jpg"
                            },
                            {
                                "title": "kasir-pengeluaran",
                                "url_image": "menu-keuangan/kasir-pengeluaran.jpg"
                            },
                            {
                                "title": "perencanaan-anggaran",
                                "url_image": "menu-keuangan/perencanaan-anggaran.jpg"
                            },
                            {
                                "title": "sysadmin",
                                "url_image": "menu-keuangan/sysadmin.jpg"
                            }
                        ];
                        break;

                    case "showMenuRmPelayanan":
                        $scope.titleMenu = "Rekam Medis & Pelayanan";
                        $scope.DaftarMenu = [{
                                "title": "bedah-sentral",
                                "url_image": "menu-rm-pelayanan/bedah-sentral.jpg"
                            },
                            {
                                "title": "depo-farmasi",
                                "url_image": "menu-rm-pelayanan/depo-farmasi.jpg"
                            },
                            {
                                "title": "gawat-darurat",
                                "url_image": "menu-rm-pelayanan/gawat-darurat.jpg"
                            },
                            {
                                "title": "gizi-kantin",
                                "url_image": "menu-rm-pelayanan/gizi-kantin.jpg"
                            },
                            {
                                "title": "gudang-farmasi",
                                "url_image": "menu-rm-pelayanan/gudang-farmasi.jpg"
                            },
                            {
                                "title": "lab",
                                "url_image": "menu-rm-pelayanan/lab.jpg"
                            },
                            {
                                "title": "radiology",
                                "url_image": "menu-rm-pelayanan/radiology.jpg"
                            },
                            {
                                "title": "rawat-inap",
                                "url_image": "menu-rm-pelayanan/rawat-inap.jpg"
                            },
                            {
                                "title": "rawat-jalan",
                                "url_image": "menu-rm-pelayanan/rawat-jalan.jpg"
                            },
                            {
                                "title": "regis-pasien",
                                "url_image": "menu-rm-pelayanan/regis-pasien.jpg"
                            },
                            {
                                "title": "rehab-medik",
                                "url_image": "menu-rm-pelayanan/rehab-medik.jpg"
                            },
                            {
                                "title": "rekam-medis",
                                "url_image": "menu-rm-pelayanan/rekam-medis.jpg"
                            },
                            {
                                "title": "sistem-informasi-rs",
                                "url_image": "menu-rm-pelayanan/sistem-informasi-rs.jpg"
                            },
                            {
                                "title": "sysadmin",
                                "url_image": "menu-rm-pelayanan/sysadmin.jpg"
                            }
                        ];
                        break;

                    case "showMenuSarpras":
                        $scope.titleMenu = "Sarana dan Prasarana";
                        $scope.DaftarMenu = [{
                                "title": "adm-tatausaha",
                                "url_image": "menu-sarpras/adm-tatausaha.jpg"
                            },
                            {
                                "title": "ambulance",
                                "url_image": "menu-sarpras/ambulance.jpg"
                            },
                            {
                                "title": "binatu-laundry",
                                "url_image": "menu-sarpras/binatu-laundry.jpg"
                            },
                            {
                                "title": "cssd",
                                "url_image": "menu-sarpras/cssd.jpg"
                            },
                            {
                                "title": "gudang-gizi",
                                "url_image": "menu-sarpras/gudang-gizi.jpg"
                            },
                            {
                                "title": "gudang-terminal",
                                "url_image": "menu-sarpras/gudang-terminal.jpg"
                            },
                            {
                                "title": "gudang-umum",
                                "url_image": "menu-sarpras/gudang-umum.jpg"
                            },
                            {
                                "title": "hukum-organisasi",
                                "url_image": "menu-sarpras/hukum-organisasi.jpg"
                            },
                            {
                                "title": "humas-pemasaran",
                                "url_image": "menu-sarpras/humas-pemasaran.jpg"
                            },
                            {
                                "title": "informasi-rs",
                                "url_image": "menu-sarpras/informasi-rs.jpg"
                            },
                            {
                                "title": "kesehatan-keselamatan-kerja",
                                "url_image": "menu-sarpras/kesehatan-keselamatan-kerja.jpg"
                            },
                            {
                                "title": "psrs",
                                "url_image": "menu-sarpras/psrs.jpg"
                            },
                            {
                                "title": "rumah-tangga",
                                "url_image": "menu-sarpras/rumah-tangga.jpg"
                            },
                            {
                                "title": "ulp",
                                "url_image": "menu-sarpras/ulp.jpg"
                            },
                            {
                                "title": "sysadmin",
                                "url_image": "menu-sarpras/sysadmin.jpg"
                            }
                        ];
                        break;
                };

                if ($scope.DaftarMenu.length > 8)
                    $scope.gridStyle = "grid_2";
                else
                    $scope.gridStyle = "grid_3";
            }


            $scope.showTooltipManajemen = false;
            $scope.showTooltipSDM = false;
            $scope.showTooltipKeuangan = false;
            $scope.showTooltipRmPelayanan = false;
            $scope.showTooltipSarpras = false;

            $scope.hoverMenu = function (showTooltip) {
                $scope[showTooltip] = true;
            }

            $scope.leaveMenu = function (showTooltip) {
                $scope[showTooltip] = false;
            }

            $scope.showSubMenu = function (title) {
                //ini ambil menu sesuai hirarkinya
                MenuService.get("GetSideMenu" + "/Menu" + title)
                    .then(function (result) {
                        $rootScope.menu = result;
                    });
                $rootScope.isOpenMenu = !$rootScope.isOpenMenu;
            }
        }
    ]);


});