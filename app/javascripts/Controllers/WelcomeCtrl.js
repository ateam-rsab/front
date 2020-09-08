define(['initialize'], function (initialize) {
    initialize.controller('WelcomeCtrl', ['$scope', '$state', 'R', '$rootScope', 'MenuService', 'LoginHelper', '$mdDialog', 'DateHelper',
        function ($scope, $state, r, $rootScope, MenuService, LoginHelper, $mdDialog, DateHelper) {
            $scope.showSIPExpired = false;
            $scope.showNotifChangePassword = true;
            $scope.OnInit = () => {
                $scope.videoPlayed = {
                    title: 'Maskerku Melindungi Kamu, Maskermu Melindungi Aku',
                    src: 'https://smart.rsabhk.co.id:2222/vid/masker.mp4'
                }
            }

            $scope.OnInit();

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
                            $scope.messageNotif = `SIP dan STR Anda akan berakhir pada ${DateHelper.getTanggalFormatted(new Date(data.tglBerakhirSip))} dan ${DateHelper.getTanggalFormatted(new Date(data.tglBerakhirStr))}. Mohon hubungi Bagian SDM untuk mengkonfirmasi status SIP dan STR terbaru Anda. Terima kasih`;

                            $scope. popUp.open().center()
                            // $scope.showSIPExpired = true;
                        } else if (data.tglBerakhirSip < DateHelper.toTimeStamp($scope.now) && data.tglBerakhirStr >= DateHelper.toTimeStamp($scope.now)) {
                            $scope.messageNotif = `Mohon hubungi Bagian SDM karena SIP Anda telah berakhir pada ${DateHelper.getTanggalFormatted(new Date(data.tglBerakhirSip))}. STR Anda akan berakhir pada ${DateHelper.getTanggalFormatted(new Date(data.tglBerakhirStr))}, mohon hubungi Bagian SDM untuk mengkonfirmasi status STR terbaru Anda. Terima kasih`;

                            $scope. popUp.open().center()
                            // $scope.showSIPExpired = true;
                        } else if (data.tglBerakhirSip >= DateHelper.toTimeStamp($scope.now) && data.tglBerakhirStr < DateHelper.toTimeStamp($scope.now)) {
                            $scope.messageNotif = `Mohon hubungi Bagian SDM karena STR Anda telah berakhir pada ${DateHelper.getTanggalFormatted(new Date(data.tglBerakhirStr))}. SIP Anda akan berakhir pada ${DateHelper.getTanggalFormatted(new Date(data.tglBerakhirSip))}, mohon hubungi Bagian SDM untuk mengkonfirmasi status SIP terbaru Anda. Terima kasih`;

                            $scope. popUp.open().center()
                            // $scope.showSIPExpired = true;
                        } else if (data.tglBerakhirSip < DateHelper.toTimeStamp($scope.now) && data.tglBerakhirStr < DateHelper.toTimeStamp($scope.now)) {
                            $scope.messageNotif = `Mohon hubungi Bagian SDM karena SIP dan STR Anda telah berakhir pada ${DateHelper.getTanggalFormatted(new Date(data.tglBerakhirSip))} dan ${DateHelper.getTanggalFormatted(new Date(data.tglBerakhirStr))}. Terima kasih`;

                            $scope. popUp.open().center()
                            // $scope.showSIPExpired = true;
                        }
                    } else if (data.tglBerakhirSip) {
                        if (data.tglBerakhirSip >= DateHelper.toTimeStamp($scope.now)) {
                            $scope.messageNotif = `SIP Anda akan berakhir pada ${DateHelper.getTanggalFormatted(new Date(data.tglBerakhirSip))}. Mohon hubungi Bagian SDM untuk mengkonfirmasi status SIP terbaru Anda. Terima kasih`;

                            $scope. popUp.open().center()
                            // $scope.showSIPExpired = true;
                        } else if (data.tglBerakhirSip < DateHelper.toTimeStamp($scope.now)) {
                            $scope.messageNotif = `Mohon hubungi Bagian SDM karena SIP Anda telah berakhir pada ${DateHelper.getTanggalFormatted(new Date(data.tglBerakhirSip))}. Terima kasih`;

                            $scope. popUp.open().center()
                            // $scope.showSIPExpired = true;
                        }
                    } else if (data.tglBerakhirStr) {
                        if (data.tglBerakhirStr >= DateHelper.toTimeStamp($scope.now)) {
                            $scope.messageNotif = `STR Anda akan berakhir pada ${DateHelper.getTanggalFormatted(new Date(data.tglBerakhirStr))}. Mohon hubungi Bagian SDM untuk mengkonfirmasi status STR terbaru Anda. Terima kasih`;

                            $scope. popUp.open().center()
                            // $scope.showSIPExpired = true;
                        } else if (data.tglBerakhirStr < DateHelper.toTimeStamp($scope.now)) {
                            $scope.messageNotif = `Mohon hubungi Bagian SDM karena STR Anda telah berakhir pada ${DateHelper.getTanggalFormatted(new Date(data.tglBerakhirStr))}. Terima kasih`;

                            $scope. popUp.open().center()
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