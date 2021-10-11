define(['initialize'], function (initialize) {
    initialize.controller('WelcomeCtrl', ['$scope', '$state', 'R', '$rootScope', 'MenuService', 'LoginHelper', '$mdDialog', 'DateHelper', 'ManageSdmNew',
        function ($scope, $state, r, $rootScope, MenuService, LoginHelper, $mdDialog, DateHelper, ManageSdmNew) {
            $scope.showSIPExpired = false;
            $scope.messageAbsensi = "Tidak ada";
            let dataLogin = JSON.parse(localStorage.getItem("pegawai"));
            let remunId = [1, 10, 14]
            $scope.isRemun = false;
            if (dataLogin.kategoryPegawai && remunId.includes(dataLogin.kategoryPegawai.id)) {
                $scope.isRemun = true;
            }
            $scope.showNotif = {
                changePassword: false,
                formISARC: true,
                messageAbsensi: false
            };

            $scope.dataPemberitahuan = [{
                path: "data/dokumen/prosedur-dan-form-pengajuan-klaim-asuransi-kematian-taspen-bagi-pns.pdf",
                fileName: "Prosedur Dan Form Pengajuan Klaim Asuransi Kematian TASPEN bagi PNS"
            }, {
                path: "data/dokumen/prosedur-pembuatan-kartu-e-id-kepesertaan-bpjs-kesehatan-pegawai.pdf",
                fileName: "Prosedur Pembuatan Kartu E-ID Kepesertaan BPJS Kesehatan Pegawai"
            }, {
                path: "data/dokumen/prosedur-pembuatan-daftar-uang-makan-bagi-pns.pdf",
                fileName: "Prosedur Pembuatan Daftar Uang Makan bagi PNS"
            }]

            $scope.widgetKinerja = () => {
                let dateNow = DateHelper.toTimeStamp(new Date());

                ManageSdmNew.getListData(`iki-remunerasi/widget-dashboard-kinerja?pegawaiId=${dataLogin.id}&bulan=${dateNow}`).then((res) => {
                    $scope.dataDashboardKinerja = res.data.data.data;
                })
            }

            $scope.OnInit = () => {
                $scope.videoPlayed = {
                    title: '6 Langkah Cuci Tangan Pakai Sabun (CTPS)',
                    src: 'https://smart.rsabhk.co.id:2222/vid/masker.mp4'
                }

                $scope.widgetKinerja()
            }

            $scope.OnInit();

            $scope.linkDashboardKinerja = () => {
                $state.go('DashboardPencatatanKinerja');
            }

            let getDataAbsensi = () => {
                let today = DateHelper.formatDate(new Date(), "YYYY-MM-DD");
                let dataPegawai = JSON.parse(localStorage.getItem("pegawai"));

                MenuService.getNotification('sdm/get-kehadiran/' + dataPegawai.id + '/' + today + '/' + today).then(res => {
                    let dataKehadiran = res.data.data.listkehadiran[0];

                    dataKehadiran.isAbsensiPulang = dataKehadiran.absensiPulang === '-' ? false : true;
                    dataKehadiran.isAbsensiMasuk = dataKehadiran.absensiMasuk === '-' ? false : true;
                    // console.log(dataKehadiran);

                    if (dataKehadiran.namaShift === "Libur") {
                        $scope.showNotif.messageAbsensi = false;
                        return;
                    }

                    if (!dataKehadiran.isAbsensiMasuk) {
                        $scope.showNotif.messageAbsensi = true;
                        $scope.messageAbsensi = "Anda belum absensi masuk hari ini";
                        return;
                    }

                    if (!dataKehadiran.isAbsensiPulang) {
                        $scope.showNotif.messageAbsensi = true;
                        $scope.messageAbsensi = "Anda belum absensi pulang hari ini";
                        return;
                    }

                });
            }
            getDataAbsensi();

            $scope.changeVideo = (path, title) => {
                $scope.videoPlayed = {
                    title: title,
                    src: path
                }
                document.getElementById('video-kampanye').setAttribute('src', $scope.videoPlayed.src);
                document.getElementById('video-kampanye').load();
            }

            var getNotif = function () {
                MenuService.getNotification('sdm/get-sip-str-expired-pegawai').then(res => {
                    $scope.messageNotif = '';
                    let data = res.data.data;

                    if (data.tglBerakhirSip && data.tglBerakhirStr) {
                        if (data.tglBerakhirSip >= DateHelper.toTimeStamp($scope.now) && data.tglBerakhirStr >= DateHelper.toTimeStamp($scope.now)) {
                            $scope.messageNotif = `SIP dan STR Anda akan berakhir pada ${DateHelper.getTanggalFormatted(new Date(data.tglBerakhirSip))} `
                                + `dan ${DateHelper.getTanggalFormatted(new Date(data.tglBerakhirStr))}. `
                                + `Mohon hubungi Bagian SDM untuk mengkonfirmasi status SIP/ STR terbaru Anda. `
                                + `Dengan Surat Edaran No. HK.02.03/XXI.4/285/2021 tentang perpanjangan SIP dan STR dalam masa Status Bencana Nasional Covid-19, `
                                + `perpanjangan dapat dilakukan sampai 1 tahun setelah tanggal berakhir. Terima kasih`;

                            $scope.popUp.open().center()
                            // $scope.showSIPExpired = true;
                        } else if (data.tglBerakhirSip < DateHelper.toTimeStamp($scope.now) && data.tglBerakhirStr >= DateHelper.toTimeStamp($scope.now)) {
                            $scope.messageNotif = `Mohon hubungi Bagian SDM karena SIP Anda `
                                + `telah berakhir pada ${DateHelper.getTanggalFormatted(new Date(data.tglBerakhirSip))}. `
                                + `STR Anda akan berakhir pada ${DateHelper.getTanggalFormatted(new Date(data.tglBerakhirStr))}, `
                                + `mohon hubungi Bagian SDM untuk mengkonfirmasi status STR terbaru Anda. `
                                + `Dengan Surat Edaran No. HK.02.03/XXI.4/285/2021 tentang perpanjangan SIP/ STR dalam masa Status Bencana Nasional Covid-19, `
                                + `perpanjangan dapat dilakukan sampai 1 tahun setelah tanggal berakhir. Terima kasih`;

                            $scope.popUp.open().center()
                            // $scope.showSIPExpired = true;
                        } else if (data.tglBerakhirSip >= DateHelper.toTimeStamp($scope.now) && data.tglBerakhirStr < DateHelper.toTimeStamp($scope.now)) {
                            $scope.messageNotif = `Mohon hubungi Bagian SDM karena STR Anda `
                                + `telah berakhir pada ${DateHelper.getTanggalFormatted(new Date(data.tglBerakhirStr))}. `
                                + `SIP Anda akan berakhir pada ${DateHelper.getTanggalFormatted(new Date(data.tglBerakhirSip))}, `
                                + `mohon hubungi Bagian SDM untuk mengkonfirmasi status SIP terbaru Anda. `
                                + `Dengan Surat Edaran No. HK.02.03/XXI.4/285/2021 tentang perpanjangan SIP/ STR dalam masa Status Bencana Nasional Covid-19, `
                                + `perpanjangan dapat dilakukan sampai 1 tahun setelah tanggal berakhir. Terima kasih`;

                            $scope.popUp.open().center()
                            // $scope.showSIPExpired = true;
                        } else if (data.tglBerakhirSip < DateHelper.toTimeStamp($scope.now) && data.tglBerakhirStr < DateHelper.toTimeStamp($scope.now)) {
                            $scope.messageNotif = `Mohon hubungi Bagian SDM karena SIP dan STR Anda `
                                + `telah berakhir pada ${DateHelper.getTanggalFormatted(new Date(data.tglBerakhirSip))} `
                                + `dan ${DateHelper.getTanggalFormatted(new Date(data.tglBerakhirStr))}. `
                                + `Dengan Surat Edaran No. HK.02.03/XXI.4/285/2021 tentang perpanjangan SIP/ STR dalam masa Status Bencana Nasional Covid-19, `
                                + `perpanjangan dapat dilakukan sampai 1 tahun setelah tanggal berakhir. Terima kasih`;

                            $scope.popUp.open().center()
                            // $scope.showSIPExpired = true;
                        }
                    } else if (data.tglBerakhirSip) {
                        if (data.tglBerakhirSip >= DateHelper.toTimeStamp($scope.now)) {
                            $scope.messageNotif = `SIP Anda akan berakhir pada ${DateHelper.getTanggalFormatted(new Date(data.tglBerakhirSip))}. `
                                + `Mohon hubungi Bagian SDM untuk mengkonfirmasi status SIP terbaru Anda. `
                                + `Dengan Surat Edaran No. HK.02.03/XXI.4/285/2021 tentang perpanjangan SIP/ STR dalam masa Status Bencana Nasional Covid-19, `
                                + `perpanjangan dapat dilakukan sampai 1 tahun setelah tanggal berakhir. Terima kasih`;

                            $scope.popUp.open().center()
                            // $scope.showSIPExpired = true;
                        } else if (data.tglBerakhirSip < DateHelper.toTimeStamp($scope.now)) {
                            $scope.messageNotif = `Mohon hubungi Bagian SDM karena SIP Anda `
                                + `telah berakhir pada ${DateHelper.getTanggalFormatted(new Date(data.tglBerakhirSip))}. `
                                + `Dengan Surat Edaran No. HK.02.03/XXI.4/285/2021 tentang perpanjangan SIP/ STR dalam masa Status Bencana Nasional Covid-19, `
                                + `perpanjangan dapat dilakukan sampai 1 tahun setelah tanggal berakhir. Terima kasih`;

                            $scope.popUp.open().center()
                            // $scope.showSIPExpired = true;
                        }
                    } else if (data.tglBerakhirStr) {
                        if (data.tglBerakhirStr >= DateHelper.toTimeStamp($scope.now)) {
                            $scope.messageNotif = `STR Anda akan berakhir pada ${DateHelper.getTanggalFormatted(new Date(data.tglBerakhirStr))}. `
                                + `Mohon hubungi Bagian SDM untuk mengkonfirmasi status STR terbaru Anda. `
                                + `Dengan Surat Edaran No. HK.02.03/XXI.4/285/2021 tentang perpanjangan SIP/ STR dalam masa Status Bencana Nasional Covid-19, `
                                + `perpanjangan dapat dilakukan sampai 1 tahun setelah tanggal berakhir. Terima kasih`;

                            $scope.popUp.open().center()
                            // $scope.showSIPExpired = true;
                        } else if (data.tglBerakhirStr < DateHelper.toTimeStamp($scope.now)) {
                            $scope.messageNotif = `Mohon hubungi Bagian SDM karena STR Anda `
                                + `telah berakhir pada ${DateHelper.getTanggalFormatted(new Date(data.tglBerakhirStr))}. `
                                + `Dengan Surat Edaran No. HK.02.03/XXI.4/285/2021 tentang perpanjangan SIP/ STR dalam masa Status Bencana Nasional Covid-19, `
                                + `perpanjangan dapat dilakukan sampai 1 tahun setelah tanggal berakhir. Terima kasih`;

                            $scope.popUp.open().center()
                            // $scope.showSIPExpired = true;
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
                        // var popUp = $('#winNotif').data('kendoWindow');
                        //  $scope. popUp.open().center()
                        $scope.showPPDSNotif = true;
                        // $scope.showSIPExpired = true;
                        // setTimeout(function () {
                        //     popUp.close();
                        // }, 3000);
                    }
                })
            }

            checkAndSetPPDSLogin();
        }
    ]);
});