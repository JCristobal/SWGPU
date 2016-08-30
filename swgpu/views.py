import json
from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import render           # para plantillas
from subprocess import check_output	
from django.views.decorators.csrf import csrf_exempt

def index(request):
	context= {
	#	'salida': check_output(["./bin/matrixMul","cvalue=1"]),
		'salida': 'hola mundo',
	}
	return render (request, 'index.html', context)



@csrf_exempt
def peticion_ackley(request):	
	
	data_operation=json.loads(request.body)

	valora = data_operation.get('valorA')						# consultamos los valores introducidos	
	valorb = data_operation.get('valorB')
	valorc = data_operation.get('valorC')
	maxGen = data_operation.get('maxgen')
	vMin = data_operation.get('valorMin')
	vMax = data_operation.get('valorMax')
	probMutation = data_operation.get('pMutation')
	probCrossover = data_operation.get('pCrossover')
	pSize = data_operation.get('populationSize')
	nV = data_operation.get('nVars')

	out = check_output(["./bin/geneticAlgorithm","-a={}".format(valora),"-b={}".format(valorb),"-c={}".format(valorc),"-max_gen={}".format(maxGen),"-min={}".format(vMin),"-max={}".format(vMax),"-p_mutation={}".format(probMutation),"-p_crossover={}".format(probCrossover),"-population_size={}".format(pSize),"-n_vars={}".format(nV) ])		

	return HttpResponse(out)


@csrf_exempt
def peticion_rastrigin(request):	
	
	data_operation=json.loads(request.body)

	valorarastrigin = data_operation.get('valorARastrigin')						# consultamos los valores introducidos	
	maxGen = data_operation.get('maxgen')
	vMin = data_operation.get('valorMin')
	vMax = data_operation.get('valorMax')
	probMutation = data_operation.get('pMutation')
	probCrossover = data_operation.get('pCrossover')
	pSize = data_operation.get('populationSize')
	nV = data_operation.get('nVars')

	out = check_output(["./bin/geneticAlgorithm","-rastrigin=1", "-A_R={}".format(valorarastrigin), "-max_gen={}".format(maxGen),"-min={}".format(vMin),"-max={}".format(vMax),"-p_mutation={}".format(probMutation),"-p_crossover={}".format(probCrossover),"-population_size={}".format(pSize),"-n_vars={}".format(nV) ])		

	return HttpResponse(out)
