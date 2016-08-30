from django.conf.urls import url

from . import views

urlpatterns = [
	url(r'^$', views.index, name='index'),
	url(r'^index$', views.index, name='index'),
	url(r'^peticion_ackley/$', views.peticion_ackley, name='peticion_ackley'), 	# para hacer peticion mediante el algoritmo Ackley
	url(r'^peticion_rastrigin/$', views.peticion_rastrigin, name='peticion_rastrigin'), 	# para hacer peticion mediante el algoritmo Rastrigin
]
