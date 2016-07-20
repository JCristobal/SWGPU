from django.conf.urls import url

from . import views

urlpatterns = [
	url(r'^$', views.index, name='index'),
	url(r'^index$', views.index, name='index'),
	url(r'^peticion_datos/$', views.peticion_datos, name='peticion_datos'), 	# para hacer peticion datos
]
