from django.conf.urls import url

from . import views

urlpatterns = [
	url(r'^$', views.index, name='index'),
	url(r'^index$', views.index, name='index'),
	url(r'^peticion_datos/$', views.peticion_datos, name='peticion_datos'), 	# para hacer peticion datos
	url(r'^peticion_ackley/$', views.peticion_ackley, name='peticion_ackley'), 	# para hacer peticion datos
]
