define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('AksespegawaiCtrl', ['$q', '$rootScope', '$scope', 'ManageSarprasPhp', 'ModelItem', '$http', 'ManageSarpras',
		function ($q, $rootScope, $scope, manageSarprasPhp, modelItem, $http, manageSarpras) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();

			init();
			$scope.columnModulAplikasi = [{
				"field": "id",
				"title": "Kode Modul Aplikasi"
			}, {
				"field": "Name",
				"title": "Parent id"
			}, {
				"field": "HasModule",
				"title": "Subsistem"
			}, {
				"title": "Action",
				"width": "200px",
				"template": "<button class='btnEdit' ng-click='enableData()'>Enable</button>" +
					"<button class='btnHapus' ng-click='disableData()'>Disable</button>"
			}];

			function init() {
				$scope.treeSourceModulAplikasi = [];
				manageSarprasPhp.getDataTableTransaksi("pegawai/svc-modul?get=modul", true).then(function (dat) {
					var inlineDefault = new kendo.data.HierarchicalDataSource({
						data: dat.data,
						schema: {
							model: {
								children: "Module"
							}
						}
					});
					$scope.treeSourceModulAplikasi = inlineDefault
					$scope.mainTreeViewSubsistemOption = {
						dataTextField: ["Name"],
						select: onSelect,
						dragAndDrop: true,
						checkboxes: true
					}

				});

				$scope.treeSourceRuangan = [];
				manageSarprasPhp.getDataTableTransaksi("pegawai/data-map-login-usertoruangan?jenis=departemenruangan", true).then(function (dat) {
					$scope.listInstalasi = dat.data
					var inlineDefault = new kendo.data.HierarchicalDataSource({
						data: dat.data,
						// check: onCheck,
						schema: {
							model: {
								children: "child"
							}
						}
					});
					$scope.treeSourceRuangan = inlineDefault
					$scope.mainTreeViewOptionRuangan = {
						dataTextField: ["title"],
						select: onSelect,
						dragAndDrop: true,
						checkboxes: true
					}

				});
				manageSarprasPhp.getDataTableTransaksi("pegawai/svc-modul?get=kelompokuser").then(function (datapegawai) {
					// debugger;=
					$scope.listKelompokuser = datapegawai.data;
					// console.log($scope.listdatapegawai);
				});
				manageSarprasPhp.getDataTableTransaksi("pegawai/svc-modul?get=pegawai&nama=" + $scope.item.namaPegawai).then(function (datapegawai) {
					// debugger;
					// $scope.listdatapegawai = datapegawai.data.pegawai;
					$scope.listdataloginuser = datapegawai.data.loginuser;
					// console.log($scope.listdatapegawai);
				});
			}

			$scope.CariPegawai = function () {
				manageSarprasPhp.getDataTableTransaksi("pegawai/svc-modul?get=pegawai&nama=" + $scope.item.namaPegawai).then(function (datapegawai) {
					// debugger;
					// $scope.listdatapegawai = datapegawai.data.pegawai;
					$scope.listdataloginuser = datapegawai.data.loginuser;
					$scope.item.loginUser = {
						luid: $scope.listdataloginuser[0].luid,
						namauser: $scope.listdataloginuser[0].namauser
					};
					getdadata()
					// console.log($scope.listdatapegawai);
				});
			}

			$scope.SearchData = function () {
				manageSarprasPhp.getDataTableTransaksi("pegawai/svc-modul?get=pegawai&nama=" + $scope.item.namaPegawai).then(function (datapegawai) {
					// debugger;
					// $scope.listdatapegawai = datapegawai.data.pegawai;
					$scope.listdataloginuser = datapegawai.data.loginuser;
					// console.log($scope.listdatapegawai);
				});
			}

			function onSelect(e) {

			}
			$scope.getDataRuangan = function () {
				$scope.listdataruangan = $scope.item.instalasi.child
			}



			$scope.getDataUser = function () {
				getdadata()
			}

			function getdadata() {
				// DataGetPegawai()
				manageSarprasPhp.getDataTableTransaksi("pegawai/svc-modul?get=loginuser&id=" + $scope.item.loginUser.luid).then(function (data) {
					$scope.item.idlogin = data.data.loginuser[0].luid;
					$scope.item.namaUser = data.data.loginuser[0].namauser;
					// $scope.item.kataKunciPass = data.data.loginuser.katasandi;
					// $scope.item.kataKunciConfirm = data.data.loginuser.katasandi;
					$scope.item.kelompokUserHakAkses = {
						id: data.data.loginuser[0].kuid,
						kelompokuser: data.data.loginuser[0].kelompokuser
					};
					$scope.dataGrid = data.data.loginuser[0].data;


				})
			}
			// $scope.klikGrid = function(){
			// 	$scope.item.instalasi = {id:$scope.dataSelected.dpid,title:$scope.dataSelected.namadepartemen}
			// 	$scope.item.ruangan = {id:$scope.dataSelected.ruid,title:$scope.dataSelected.namaruangan}
			// }

			$scope.tambah = function () {
				manageSarprasPhp.getDataTableTransaksi("pegawai/save-map-luRuangan?loginuserfk=" + $scope.item.loginUser.luid + "&ruanganfk=" + $scope.item.ruangan.id).then(function (data) {
					manageSarprasPhp.getDataTableTransaksi("pegawai/svc-modul?get=loginuser&id=" + $scope.item.loginUser.luid).then(function (data) {
						$scope.item.idlogin = data.data.loginuser[0].luid;
						$scope.item.namaUser = data.data.loginuser[0].namauser;
						// $scope.item.kataKunciPass = data.data.loginuser.katasandi;
						// $scope.item.kataKunciConfirm = data.data.loginuser.katasandi;
						$scope.item.kelompokUserHakAkses = {
							id: data.data.loginuser[0].kuid,
							kelompokuser: data.data.loginuser[0].kelompokuser
						};
						$scope.dataGrid = data.data.loginuser[0].data;


					})
				})
			}
			$scope.hapus = function () {
				manageSarprasPhp.getDataTableTransaksi("pegawai/save-hapus-map-luRuangan?loginuserfk=" + $scope.item.loginUser.luid + "&ruanganfk=" + $scope.dataSelected.ruid).then(function (data) {
					manageSarprasPhp.getDataTableTransaksi("pegawai/svc-modul?get=loginuser&id=" + $scope.item.loginUser.luid).then(function (data) {
						$scope.item.idlogin = data.data.loginuser[0].luid;
						$scope.item.namaUser = data.data.loginuser[0].namauser;
						// $scope.item.kataKunciPass = data.data.loginuser.katasandi;
						// $scope.item.kataKunciConfirm = data.data.loginuser.katasandi;
						$scope.item.kelompokUserHakAkses = {
							id: data.data.loginuser[0].kuid,
							kelompokuser: data.data.loginuser[0].kelompokuser
						};
						$scope.dataGrid = data.data.loginuser[0].data;


					})
				})
			}

			$scope.columnGrid = [{
					"field": "no",
					"title": "No",
					"width": "20px",
				},
				{
					"field": "dpid",
					"title": "Id Instalasi",
					"width": "30px",
				},
				{
					"field": "namadepartemen",
					"title": "Instalasi",
					"width": "100px",
				},
				{
					"field": "ruid",
					"title": "Id Ruangan",
					"width": "30px",
				},
				{
					"field": "namaruangan",
					"title": "Nama Ruangan",
					"width": "100px",
				}
			];



			function onSelectRuangan(e) {
				//debugger;
				//alert(this.text(e.node));
				var namaObjekSelected = this.text(e.node)
				var arrText = namaObjekSelected.split('_');
				//var idObjekmodulaplikasiHead =''
				// $scope.item.nmMenu = arrText[1];
				$scope.data4 = [];
				manageSarprasPhp.getDataTableTransaksi("pegawai/data?jenis=objekmodultokelompokuser&omaid=" + arrText[0] + "&id=" + idModul, true).then(function (dat) {
					if (dat.data.data1.length != 0) {
						for (var i = 0; i < dat.data.data1.length; i++) {
							dat.data.data1[i].no = i + 1;
						}
						$scope.data4 = dat.data.data1;
					}
					$scope.item.idMenu = dat.data.data2.omaid;
					$scope.item.idHead = dat.data.data2.kdobjekmodulaplikasihead;
					$scope.item.nmMenu = dat.data.data2.objekmodulaplikasi;
					$scope.item.fungsi = dat.data.data2.fungsi;
					$scope.item.keterangan = dat.data.data2.keterangan;
					$scope.item.noUrut2 = dat.data.data2.nourut;
					$scope.item.url = dat.data.data2.alamaturlform;

					$scope.item.idHeadMenu = dat.data.data2.kdobjekmodulaplikasihead;
					$scope.item.nmModulHead = dat.data.data2.objekmodulaplikasihead;
					$scope.showIdMenu = true
				});
			}

			// getmodulpegawai();

			function checkedNodeIds(nodes, checkedNodes) {
				for (var i = 0; i < nodes.length; i++) {
					if (nodes[i].checked) {
						checkedNodes.push(nodes[i].moduleId);
					}

					if (nodes[i].hasChildren) {
						checkedNodeIds(nodes[i].children.view(), checkedNodes);
					}
				}
			}



			$scope.simpan = function () {
				for (var i = $scope.treeSourceRuangan._data.length - 1; i >= 0; i--) {
					if ($scope.treeSourceRuangan._data[i].children != undefined) {

					}
				}
				if ($scope.item.idlogin == undefined) {
					alert('Pilih dahullu pegawai!')
					return
				}
				if ($scope.item.kataKunciPass != $scope.item.kataKunciConfirm) {
					alert('Kata kunci tidak sama')
					return
				}
				// var objSave = {
				//                     id:$scope.item.idlogin,
				// 		kelompokUser:{  
				// 	      id:$scope.item.kelompokUserHakAkses.id
				// 		},
				// 		statusLogin:0,
				// 		kataSandi:$scope.item.kataKunciPass,
				// 		namaUser:$scope.item.namaUser,
				// 		pegawai:{  
				// 	      id:$scope.item.namaPegawai.pegawaiId
				// 		}
				//                 }
				var objSave = {
					id: $scope.item.idlogin,
					kelompokUser: {
						id: $scope.item.kelompokUserHakAkses.id
					},
					statusLogin: 0,
					kataSandi: $scope.item.kataKunciPass,
					namaUser: $scope.item.namaUser,
					pegawai: {
						id: $scope.item.loginUser.objectpegawaifk
					}
				}
				//save to php passcode column
				manageSarprasPhp.saveDataTransaksi('admin/ubah-password', objSave).then(function (e) {

				})
				//save to java katasandi column
				manageSarpras.saveLoginUser(objSave).then(function (e) {

				})
			}

			function onCheck() {
				var checkedNodes = [],
					treeView = $scope.treeSourceModulAplikasi,
					message;

				checkedNodeIds(treeView.dataSource.view(), checkedNodes);

				if (checkedNodes.length > 0) {
					message = "IDs of checked nodes: " + checkedNodes.join(",");
				} else {
					message = "No nodes checked.";
				}

				$("#result").html(message);
			}

			$scope.mainGridOptionsModulAplikasi = {
				pageable: true,
				columns: $scope.columnModulAplikasi,
				editable: "popup",
				selectable: "row",
				scrollable: false
			};

		}
	]);
});