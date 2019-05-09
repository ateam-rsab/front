#!/bin/sh
if [ -f ./app/WelcomeAsli.html ]
then
	echo "Peringatan : Masih pakai interface baru"
else 
	cp -f ./app/javascripts/Controllers/WelcomeCtrl.js ./app/javascripts/Controllers/WelcomeCtrlAsli.js
	cp -f ./app/Welcome.html ./app/WelcomeAsli.html
	cp -f ./app/main.html ./app/mainAsli.html
	cp -f ./app/module/header/header.html ./app/module/header/headerAsli.html
	
	cp -f ./app/javascripts/Controllers/WelcomeCtrlBaru.js ./app/javascripts/Controllers/WelcomeCtrl.js
	cp -f ./app/WelcomeBaru.html ./app/Welcome.html
	cp -f ./app/mainBaru.html ./app/main.html
	cp -f ./app/module/header/headerBaru.html ./app/module/header/header.html
	cp -rf ./app/stylesheets/baru/*.* ./app/stylesheets/
	
	echo "Informasi : Ganti ke interface baru  berhasil"
fi