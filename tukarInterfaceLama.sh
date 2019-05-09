#!/bin/sh
if [ -f ./app/WelcomeAsli.html ]
then
	cp -f ./app/javascripts/Controllers/WelcomeCtrlAsli.js ./app/javascripts/Controllers/WelcomeCtrl.js
	cp -f ./app/WelcomeAsli.html ./app/Welcome.html 
	cp -f ./app/mainAsli.html ./app/main.html 
	cp -f ./app/module/header/headerAsli.html ./app/module/header/header.html 
	cp -rf ./app/stylesheets/lama/*.* ./app/stylesheets/

	rm -f ./app/javascripts/Controllers/WelcomeCtrlAsli.js
	rm -f ./app/WelcomeAsli.html
	rm -f ./app/module/header/headerAsli.html

	echo "Informasi : Ganti ke interface lama  berhasil"
else 

	echo "Peringatan : Masih pakai interface lama"
fi
