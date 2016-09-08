#! /bin/bash
# despliegue.sh para el despliegue automatizado de SWGPU

#Primero comprobamos los requisitos

requisitos=0
total_requisitos=7

echo "Comprobando requisitos..."


# Apache
versionapache=$(apache2 -v)
if [[ $versionapache == *'2.4'* ]]; then
	echo "[x] Versión de Apache correcta"
	let requisitos+=1
else
	echo "[ ] Se necesita la versión de Apache 2.4 "
fi


# Python
if [ -f /usr/bin/python2 ]; then
	echo "[x] Versión de Python correcta"
	let requisitos+=1
else
	echo "[ ] Se necesita usar python 2"
fi


# Django
versiondjango=$(python -m django --version)
if [[ $versiondjango == *'1.1'* ]]; then
	echo "[x] Versión de Django correcta"
	let requisitos+=1
else
	echo "[ ] Se necesita una versión de Django 1.10 o superior"
fi


# Tarjeta gráfica NVIDIA
nvidia=$(lspci | grep -i nvidia)
if [[ $nvidia == '' ]]; then
	echo "[ ] Para hacer uso de la GPU se necesita un dispositivo NVIDIA"
else
	echo "[x] Dispone de dispositivo NVIDIA"
	let requisitos+=1	
fi


# Drivers de NVIDIA
versiondrivers=$(nvidia-smi -a | grep -i 'Driver Version')
if [[ $versiondrivers == *'352.'* ]]; then
	echo "[x] Drivers de NVIDIA correctos"
	let requisitos+=1
else
	echo "[ ] Se necesita cualquier versión 352 de los drivers den NVIDIA (352.xx)"
fi


# CUDA y su versión
if [ -d /usr/local/cuda-7.5 ]; then
	echo "[x] Versión de CUDA correcta"
	let requisitos+=1
else
	echo "[ ] Se necesita la versión de CUDA 7.5 "
fi


# Versión de C++
versionc=$(ls /usr/bin)
if [[ $versionc == *'g++-4.'* ]]; then
	echo "[x] Versión de C++ correcta"
	let requisitos+=1
else
	echo "[ ] Se necesita la versión de C++ 4.x"
fi



echo ""
if [[ $requisitos == $total_requisitos ]]; then
	echo $requisitos/$total_requisitos": cumple con todos los requisitos"
else
	echo $requisitos/$total_requisitos": no se cumplen todos los requisitos"
fi
echo ""



if [[ $EUID -ne 0 ]]; then
	echo "Debes tener permisos de administrador para desplegar la aplicación"

else	

	if [[ $requisitos == $total_requisitos ]]; then
	# Se especifica donde se despliega
	echo 'Introduzca la URL donde desplegar la aplicación:'
	read nombre
	echo "Desplegar en: "$nombre

	# Se reinicia el servidor y se lanza
	sudo service apache2 restart | python manage.py runserver $nombre
	else
		echo "Se necesitan todos los requisitos para desplegar"
	fi
fi

