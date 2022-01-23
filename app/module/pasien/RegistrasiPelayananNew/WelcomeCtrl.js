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

            $scope.widgetKinerja = () => {
                let dateNow = DateHelper.toTimeStamp(new Date());

                ManageSdmNew.getListData(`iki-remunerasi/widget-dashboard-kinerja?pegawaiId=${dataLogin.id}&bulan=${dateNow}`).then((res) => {
                    $scope.dataDashboardKinerja = res.data.data.data;
                });
            }

            $scope.widgetWorkingRecord = () => {
                let dateNow = DateHelper.toTimeStamp(new Date());

                ManageSdmNew.getListData(`/iki-remunerasi/widget-status-verifikasi-kinerja?pegawaiId=${dataLogin.id}&bulan=${dateNow}`).then((res) => {
                    $scope.dataWidgetStatusVerifikasi = res.data.data;
                });
            }

            $scope.linkDashboardKinerja = () => {
                $state.go('DashboardPencatatanKinerja');
            }

            $scope.linkVerifWorkingRecord = () => {
                $state.go('VerifikasiCatatanKegiatanHarian');
            }

            $scope.OnInit = () => {
                $scope.videoPlayed = {
                    title: 'Profil Zona Integritas WBK dan WBBM RSAB Harapan Kita 2021',
                    src: 'https://smart.rsabhk.co.id:2222/vid/zona-integritas.mp4'
                }

                $scope.widgetKinerja()
                $scope.widgetWorkingRecord()
            }

            $scope.dataPemberitahuan = [
		{
        	        path: "data/dokumen/pemberitahuan-SK-KGB-TMT-Januari-2022-an-Aliyah-dkk.pdf",
	                fileName: "Pemberitahuan SK KGB TMT Januari 2022 a.n. Aliyah dkk ",
                	new: true
            	},
		{
                    path: "data/dokumen/hasil-seleksi-rekrutmen-internal-jabfung-RSABHarapanKita.pdf",
                    fileName: "Hasil Seleksi Rekrutmen Internal Jabfung RSAB Harapan Kita"
                },
		{
                    path: "data/dokumen/SURAT-PENUNDAAN-PINDAH.pdf",
                    fileName: "SURAT PENUNDAAN PINDAH"
                },
		{
                    path: "data/dokumen/pemberitahuan-kgb-tmt-1-desember-2021-ade-kurniah-dkk.pdf",
                    fileName: "PEMBERITAHUAN - KGB TMT 1 Desember 2021 Ade Kurniah dkk"
                },
		{
                    path: "data/dokumen/nodin-informasi-data-kepegawaian.pdf",
                    fileName: "Nodin Informasi Data Kepegawaian"
                },
                {
                    path: "data/dokumen/Daftar-Nama-Pegawai-Yang-Dapat-Diusulkan-Kenaikan-Jabfung-Ahli.pdf",
                    fileName: "Daftar Nama Pegawai yang dapat Diusulkan Kenaikan Jabfung Ahli"
                },
                {
                    path: "data/dokumen/Daftar-Nama-Pegawai-Yang-Dapat-Diusulkan-KPO-April-2022-an.-nur.pdf",
                    fileName: "Daftar Nama Pegawai yang Dapat Diusulkan KPO April 2022 an. nur"
                },
                {
                    path: "data/dokumen/PEMBERITAHUAN-Daftar-Nama-Pegawai-yang-Dapat-Diusulkan-KP-Fun.pdf",
                    fileName: "PEMBERITAHUAN - Daftar Nama Pegawai yang Dapat Diusulkan KP Fun"
                },
                {
                    path: "data/dokumen/PEMBERITAHUAN-SK-KP-FUNGSIONAL-an.-dr.-Akira-dkk-27-orang.pdf",
                    fileName: "PEMBERITAHUAN - SK KP FUNGSIONAL an. dr. Akira dkk 27 orang"
                },
                {
                    path: "data/dokumen/PEMBERITAHUAN-SK-KPO-dan-NON-KPO-an.-Suprapto.pdf",
                    fileName: "PEMBERITAHUAN - SK KPO dan NON KPO an. Suprapto"
                },
            ]

            $scope.dataBerkasAdministrasi = [
	    {
                path: "data/dokumen/pengumuman-hasil-seleksi-rekrutmen-internal.pdf",
                fileName: "Pengumuman Hasil Seleksi Rekrutmen Internal"
            },
	    {
                path: "data/dokumen/rekrutmen-internal-JABFUNG-di-lingkungan-RSABHK-tahun-2021.pdf",
                fileName: "Rekrutmen Internal Jabatan Fungsional di Lingkungan RSAB HK tahun 2021",
                new: true
            }, {
                path: "data/dokumen/prosedur-pembuatan-kartu-e-id-kepesertaan-bpjs-kesehatan-pegawai.pdf",
                fileName: "Prosedur Pembuatan Kartu E-ID Kepesertaan BPJS Kesehatan Pegawai",
                new: false
            }, {
                path: "data/dokumen/prosedur-pembuatan-daftar-uang-makan-bagi-pns.pdf",
                fileName: "Prosedur Pembuatan Daftar Uang Makan bagi PNS",
                new: false
            }, {
                path: "data/dokumen/rekrutmen-internal-JABFUNG-di-lingkungan-RSABHK-tahun-2021.pdf",
                fileName: "Rekrutmen Internal Jabatan Fungsional di Lingkungan RSAB HK tahun 2021"
            }]

	    $scope.lihatDokumen = (url) => {
            	
            	window.open(`${window.location.origin}/app/${url}`, '_blank');
            }

            $scope.OnInit();

            let getDataAbsensi = () => {
                let today = DateHelper.formatDate(new Date(), "YYYY-MM-DD");
                let dataPegawai = JSON.parse(localStorage.getItem("pegawai"));

                MenuService.getNotification('sdm/get-kehadiran/' + dataPegawai.id + '/' + today + '/' + today).then(res => {
                    let dataKehadiran = res.data.data.listkehadiran[0];


                    dataKehadiran.isAbsensiPulang = dataKehadiran.absensiPulang === '-' ? false : true;
                    dataKehadiran.isAbsensiMasuk = dataKehadiran.absensiMasuk === '-' ? false : true;

                    if (dataKehadiran.namaShift === "Libur") {
                        $scope.showNotif.messageAbsensi = false;
                        return;
                    }

                    if (!dataKehadiran.isAbsensiMasuk) {
                        $scope.showNotif.messageAbsensi = true;
                        $scope.messageAbsensi = "Anda belum presensi masuk hari ini";
                        return;
                    }

                    if (!dataKehadiran.isAbsensiPulang) {
                        $scope.showNotif.messageAbsensi = true;
                        $scope.messageAbsensi = "Anda belum presensi pulang hari ini";
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
                document.getElementById('video-kampanye').play();
                // document.getElementById('video-kampanye').load();
            }
            $scope.changeVideo('https://smart.rsabhk.co.id:2222/vid/zona-integritas.mp4', 'Profil Zona Integritas WBK dan WBBM RSAB Harapan Kita 2021');
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
