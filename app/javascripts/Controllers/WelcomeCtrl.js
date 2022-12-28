define(['initialize'], function (initialize) {
    initialize.controller('WelcomeCtrl', ['$scope', '$state', 'R', '$rootScope', 'MenuService', 'LoginHelper', '$mdDialog', 'DateHelper', 'ManageSdmNew',
        function ($scope, $state, r, $rootScope, MenuService, LoginHelper, $mdDialog, DateHelper, ManageSdmNew) {
            $scope.showSIPExpired = false;
            $scope.customFullscreen = false;
            $scope.messageAbsensi = "Tidak ada";
            let dataLogin = JSON.parse(localStorage.getItem("pegawai"));
            $scope.listBirthdayData = [];
            let remunId = [1, 10, 14]
            $scope.isRemun = false;

            if (dataLogin.kategoryPegawai && remunId.includes(dataLogin.kategoryPegawai.id)) {
                $scope.isRemun = true;
            }
            $scope.dateNow = DateHelper.getTanggalFormatted(new Date(), "DD MMM YYYY")
            $scope.showNotif = {
                changePassword: false,
                formISARC: true,
                messageAbsensi: false
            };
            const authToken=()=>{
                ManageSdmNew.authToken("cek-token").then(function(res){
                    console.log(res)
                });
            }
            $scope.widgetKinerja = () => {
                let dateNow = DateHelper.toTimeStamp(new Date());

                ManageSdmNew.getListData(`iki-remunerasi/widget-dashboard-kinerja?pegawaiId=${dataLogin.id}&bulan=${dateNow}`).then((res) => {
                    $scope.dataDashboardKinerja = res.data.data.data;
                });
            }

            $scope.getBirthdayData = () => {
                ManageSdmNew.getListData('pegawai/get-birthday').then(res => {
                    for (let i = 0; i < res.data.data.length; i++) {
                        res.data.data[i].imgUrlData = res.data.data[i].imgUrlData ? res.data.data[i].imgUrlData : "../app/images/user.png"
                    }
                    $scope.listBirthdayData = res.data.data;
                })
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
                authToken();
                $scope.getBirthdayData();
                $scope.videoPlayed = {
                    title: 'Pegawai Ulang Tahun 1 s/d 9 Januari 2022',
                    src: 'https://smart.rsabhk.co.id:2222/vid/ultah-jan-1-9.mp4'
                }

                $scope.widgetKinerja()
                $scope.widgetWorkingRecord()
                // $scope.showVisiMisi();
            }
            $scope.showVisiMisi = function (ev) {
                $mdDialog.show({
                  contentElement: '#myDialog',
                  // Appending dialog to document.body to cover sidenav in docs app
                  // Modal dialogs should fully cover application to prevent interaction outside of dialog
                  parent: angular.element(document.body),
                  targetEvent: ev,
                  clickOutsideToClose: true
                });
              };
            $scope.visimisi=[
                {
                    no:"1",
                    data:"Menyelenggarakan pelayanan kesehatan ibu dan anak yang nyaman dan berkualitas"
                },
                {
                    no:"2",
                    data:"Menyelenggarakan pendidikan tenaga kesehatan di bidang kesehatan ibu dan anak"
                },
                {
                    no:"3",
                    data:"Menyelenggarakan pelatihan dibidang kesehatan ibu dan anak"
                },
                {
                    no:"4",
                    data:"Menyelenggarakan penelitian di bidang kesehatan ibu dan anak"
                },
                {
                    no:"5",
                    data:"Menyelenggarakan jejaring dan sistem rujukan di bidang kesehatan ibu dan anak"
                }
            ]
            $scope.dataPemberitahuan = [
                {
                    path: "data/dokumen/Formulir-Permohonan-Surat-Keterangan.pdf",
                    fileName: "Formulir Permohonan Surat Keterangan / Perincian Penghasilan",
                    new: false
                }, 
                {
                    path: "data/dokumen/PEMBERITAHUAN_KPO_APRIL_2023.pdf",
                    fileName: "Daftar Pegawai Yang Dapat Diusulkan Kenaikan Pangkat Otomatis Periode April 2023",
                    new: true
                },
                {
                    path: "data/dokumen/PEMBERITAHUAN KENAIKAN_JABFUNG_AHLI_UTAMA_APRIL_2023.pdf",
                    fileName: "Kenaikan Jabatan Fungsional Ahli Utama April 2023",
                    new: true
                },
                {
                    path: "data/dokumen/PEMBERITAHUAN KP_APRIL_2023.pdf",
                    fileName: "Daftar Pegawai Yang Dapat Diusulkan Kenaikan Pangkat Fungsional Periode April 2023",
                    new: true
                },
                {
                    path: "data/dokumen/Sosialisasi_Pembuatan_SKP_2022_menggunakan_aplikasi_e-Kinerja.pdf",
                    fileName: "Sosialisasi Pembuatan SKP 2022 menggunakan aplikasi e-Kinerja",
                    new: true
                },
                {
                    path: "data/dokumen/PENGUMUMAN_DATA_TENAGA_NON_ASN_PRAFINALISASI.pdf",
                    fileName: "Data Tenaga Non ASN Prafinlisasi di lingkungkan Kementerian Kesehatan tahun 2022",
                    new: false
                },
                {
                    path: "data/dokumen/Pemberitahuan-Pendataan-Tenaga-Non-ASN.pdf",
                    fileName: "Pendataan Tenaga Non ASN",
                    new: false
                },{
                    path: "data/dokumen/Nota-Dinas-Sosialisasi-Pengisian-Target-SKP-2022.pdf",
                    fileName: "Nota Dinas Sosialisasi Pengisian Target SKP 2022",
                    new: false
                }, {
                    path: "data/dokumen/Formulir-Untuk-Mendapatkan-Pembayaran-Tunjangan-Keluarga-bagi-Pegawai-PNS-(FORM-KP4).pdf",
                    fileName: "Formulir Untuk Mendapatkan Pembayaran Tunjangan Keluarga bagi Pegawai PNS (FORM-KP4)",
                    new: false
                }, {
                    path: "data/dokumen/SE-Kewajiban-Mentaati-Ketentuan-Jam-Kerja-Bagi-Seluruh-Pegawai .pdf",
                    fileName: "SE Kewajiban Mentaati Ketentuan Jam Kerja Bagi Seluruh Pegawai ",
                    new: false
                }, {
                    path: "data/dokumen/PEMBERITAHUAN-KGB-AGUSTUS-2022.pdf",
                    fileName: "PEMBERITAHUAN KGB AGUSTUS 2022",
                    new: false
                }, {
                    path: "data/dokumen/SE-Tata-Cara-Usul-Pencantuman-Gelar-Akademik-Bagi-PNS.pdf",
                    fileName: "SE Tata Cara Usul Pencantuman Gelar Akademik Bagi PNS",
                    new: false
                }, {
                    path: "data/dokumen/PEMBERITAHUAN-USUL-PAK-KEMENTERIAN-KESEHATAN.pdf",
                    fileName: "PEMBERITAHUAN USUL PAK KEMENTERIAN KESEHATAN",
                    new: false
                }, {
                    path: "data/dokumen/PEMBERITAHUAN-SK-KP-FUNGSIONAL-APRIL-2022.pdf",
                    fileName: "PEMBERITAHUAN SK KP FUNGSIONAL APRIL 2022",
                    new: false
                }, {
                    path: "data/dokumen/PEMBERITAHUAN-SK-KPO-APRIL-2022.pdf",
                    fileName: "PEMBERITAHUAN SK KPO APRIL 2022",
                    new: false
                }, {
                    path: "data/dokumen/PEMBERITAHUAN-KGB-JULI-2022.pdf",
                    fileName: "PEMBERITAHUAN KGB JULI 2022",
                    new: false
                }, {
                    path: "data/dokumen/PEMBERITAHUAN-DAFTAR-NAMA-PEGAWAI-YANG-DAPAT-DIUSULKAN-KP-FUNGSIONAL-AHLI-UTAMA.pdf",
                    fileName: "PEMBERITAHUAN DAFTAR NAMA PEGAWAI YANG DAPAT DIUSULKAN KP FUNGSIONAL AHLI UTAMA",
                    new: false
                }, {
                    path: "data/dokumen/PEMBERITAHUAN-KP-FUNGSIONAL-OKTOBER-2022.pdf",
                    fileName: "PEMBERITAHUAN DAFTAR NAMA PEGAWAI YANG DAPAT DIUSULKAN KP FUNGSIONAL OKTOBER 2022",
                    new: false
                }, {
                    path: "data/dokumen/PEMBERITAHUAN-DAFTAR-NAMA-PEGAWAI-YANG-DAPAT-DIUSULKAN-KP-OTOMATIS-OKTOBER-2022.pdf",
                    fileName: "PEMBERITAHUAN DAFTAR NAMA PEGAWAI YANG DAPAT DIUSULKAN KP OTOMATIS OKTOBER 2022",
                    new: false
                }, {
                    path: "data/dokumen/PEMBERITAHUAN-KGB-JUNI-2022-MUHAMMAD-SUPRI-SETIYADI-DKK.pdf",
                    fileName: "PEMBERITAHUAN KGB JUNI 2022 MUHAMMAD SUPRI SETIYADI DKK",
                    new: false
                },
            ]
            $scope.dataBerkasAdministrasi = [
                {
                path: "data/dokumen/Nodin-Bimtek-SKP.pdf",
                fileName: "Nota Dinas Bimtek SKP",
                new: true
            }, {
                path: "data/dokumen/SE-LARANGAN-BEKERJA-DI-TEMPAT-LAIN.pdf",
                fileName: "SE LARANGAN BEKERJA DI TEMPAT LAIN",
                new: false
            }, {
                path: "data/dokumen/SE-Libur-Nasional-dan-Cuti-Bersama-Hari-Raya-Idul-Fitri-Tahun-2022.pdf",
                fileName: "SE Libur Nasional dan Cuti Bersama Hari Raya Idul Fitri Tahun 2022",
                new: false
            }, {
                path: "data/dokumen/SE-Penatapan-Jam-Kerja-Bulan-Ramadan-1443-H-RSAB-Harapan-Kita.pdf",
                fileName: "SE Penetapan Jam Kerja Bulan Ramadan 1443 H RSAB Harapan Kita",
                new: false
            }, {
                path: "data/dokumen/RENCANA-USULAN-PENGANGKATAN-JABFUNG-2022.pdf",
                fileName: "RENCANA USULAN PENGANGKATAN JABFUNG 2022",
                new: false
            }, {
                path: "data/dokumen/PEMBERITAHUAN-KGB-Non-PNS-2022-an.-Karwito-dkk.pdf",
                fileName: "PEMBERITAHUAN - KGB Non PNS 2022 an. Karwito dkk",
                new: false
            }, {
                path: "data/dokumen/PEMBERITAHUAN-KGB-TMT-April-2022-an.-Budi-Bahtiar-dkk.pdf",
                fileName: "PEMBERITAHUAN - KGB TMT April 2022 an. Budi Bahtiar dkk",
                new: false
            }, {
                path: "data/dokumen/KGB-TMT-Maret-2022-an-Agus-Susilo-dkk.pdf",
                fileName: "KGB TMT Maret 2022 an. Agus Susilo dkk",
                new: false
            }, {
                path: "data/dokumen/PEMBERITAHUAN-Daftar-Nama-Pegawai-yg-Dapat-Diusulkan-PAK-Dokd.pdf",
                fileName: "PEMBERITAHUAN - Daftar Nama Pegawai yg Dapat Diusulkan PAK Dokd",
                new: false
            }, {
                path: "data/dokumen/SK-KGB-TMT-Februari-2022-an-Adi-Puspita-dkk.pdf",
                fileName: "SK KGB TMT Februari 2022 an Adi Puspita dkk",
                new: false
            }, {
                path: "data/dokumen/PEMBERITAHUAN-PENERIMA-PIAGAM-PENGHARGAAN-TAHUN-2021.pdf",
                fileName: "PEMBERITAHUAN PENERIMA PIAGAM PENGHARGAAN TAHUN 2021",
                new: false
            }, {
                path: "data/dokumen/pemberitahuan-SK-KGB-TMT-Januari-2022-an-Aliyah-dkk.pdf",
                fileName: "Pemberitahuan SK KGB TMT Januari 2022 a.n. Aliyah dkk ",
                new: false
            }, {
                path: "data/dokumen/SURAT-PENUNDAAN-PINDAH.pdf",
                fileName: "SURAT PENUNDAAN PINDAH",
                new: false
            }, {
                path: "data/dokumen/nodin-informasi-data-kepegawaian.pdf",
                fileName: "Nodin Informasi Data Kepegawaian",
                new: false
            }, {
                path: "data/dokumen/SE-ttg-ketentuan-TUBEL-pembiayaan-BPPSDMK-KEMENKES-RI-tahun-2022.pdf",
                fileName: "Surat Edararan tentang ketentuan TUBEL pembiayaan BPPSDMK KEMENKES RI th 2022",
                new: true
            }, {
                path: "data/dokumen/pemberitahuan-kgb-tmt-1-desember-2021-ade-kurniah-dkk.pdf",
                fileName: "PEMBERITAHUAN - KGB TMT 1 Desember 2021 Ade Kurniah dkk"
            }, {
                path: "data/dokumen/hasil-seleksi-rekrutmen-internal-jabfung-RSABHarapanKita.pdf",
                fileName: "Hasil Seleksi Rekrutmen Internal Jabfung RSAB Harapan Kita"
            }, {
                path: "data/dokumen/Daftar-Nama-Pegawai-Yang-Dapat-Diusulkan-Kenaikan-Jabfung-Ahli.pdf",
                fileName: "Daftar Nama Pegawai yang dapat Diusulkan Kenaikan Jabfung Ahli"
            }, {
                path: "data/dokumen/Daftar-Nama-Pegawai-Yang-Dapat-Diusulkan-KPO-April-2022-an.-nur.pdf",
                fileName: "Daftar Nama Pegawai yang Dapat Diusulkan KPO April 2022 an. nur"
            }, {
                path: "data/dokumen/PEMBERITAHUAN-Daftar-Nama-Pegawai-yang-Dapat-Diusulkan-KP-Fun.pdf",
                fileName: "PEMBERITAHUAN - Daftar Nama Pegawai yang Dapat Diusulkan KP Fun"
            }, {
                path: "data/dokumen/PEMBERITAHUAN-SK-KP-FUNGSIONAL-an.-dr.-Akira-dkk-27-orang.pdf",
                fileName: "PEMBERITAHUAN - SK KP FUNGSIONAL an. dr. Akira dkk 27 orang"
            }, {
                path: "data/dokumen/PEMBERITAHUAN-SK-KPO-dan-NON-KPO-an.-Suprapto.pdf",
                fileName: "PEMBERITAHUAN - SK KPO dan NON KPO an. Suprapto"
            }, {
                path: "data/dokumen/pengumuman-hasil-seleksi-rekrutmen-internal.pdf",
                fileName: "Pengumuman Hasil Seleksi Rekrutmen Internal"
            }, {
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
            $scope.dokumenTerkaitCovid=[
                {
                    path: "data/dokumen/pedoman-covid19.pdf",
                    fileName: "Pedoman Pencegahan Pengendalian CORONA VIRUS DISEASE (COVID-19).",
                },
                {
                    path: "data/dokumen/suit-level.pdf",
                    fileName: "Standar APD (Alat Pelindung Diri) dalam Lingkungan Kerja RSAB Harapan Kita.",
                },
                {
                    path: "data/dokumen/Standar_APD_dalam_Manajemen_Penanganan_Covid19.pdf.pdf",
                    fileName: "Standar APD (Alat Pelindung Diri) dalam Manajemen Penanganan COVID-19",
                },
            ]
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

