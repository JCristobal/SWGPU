from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import render           # para plantillas
from subprocess import check_output	


def index(request):
	context= {
	#	'salida': check_output(["./bin/matrixMul","cvalue=1"]),
		'salida': 'hola mundo',
	}
	return render (request, 'index.html', context)


def peticion_datos(valor):	
	valor = valor.GET.get('peticion')							# consultamos el valor introducido	
	out = check_output(["./bin/matrixMul","cvalue="+valor])		# hacemos los calculos con ese valor

	return HttpResponse(out)



