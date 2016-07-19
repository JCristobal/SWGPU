from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import render           # para plantillas

#def index(request):
#	return HttpResponse("Hello, world. You're at the polls index.")

def index(request):
	context= {
		'mensaje': 'hola mundo',
	}
	return render (request, 'index.html', context)
