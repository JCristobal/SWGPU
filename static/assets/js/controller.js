var app = angular.module("myApp", []);


app.controller("myController", function($scope, $http) { 

	$scope.valueA=20;
	$scope.valueB=0.2;
	$scope.valueC=2*Math.PI;
	$scope.valueARastrigin=10;

	$scope.max_gen=100;
	$scope.min=-32.768;
	$scope.max=32.768;
	$scope.minR=-5.12;
	$scope.maxR=5.12;
	$scope.p_mutation=0.15;
	$scope.population_size=50;
	$scope.p_crossover=0.8;
	$scope.n_vars=10;


    $scope.peticionAckley = function(a, b, c, max_gen, min, max, p_mutation, p_crossover, population_size, n_vars) { 

		$('.icono_espera').css('display','initial'); 
		$('body').css('opacity','0.5'); 

		var datos = {valorA: a, valorB: b, valorC: c, maxgen: max_gen, valorMin: min, valorMax: max, pMutation: p_mutation, pCrossover: p_crossover, populationSize: population_size, nVars: n_vars };

		$http({
		  method: 'POST',
		  url: '/swgpu/peticion_ackley/',
		  data: datos
		}).then(function successCallback(response) {

		    console.log(response.data.calculo);

		    // calcula la fecha actual para mostrarla por pantalla
			var hora_pet = new Date();
			$('#fecha_peticion').html(hora_pet);
			// Dirige a los resultados, pero sin transición
			// //window.location="#2";
			// Eliminamos el elemento de espera
			$('#ver_resultados_ackley').css('display','initial');
			$('.icono_espera').css('display','none');
			$('body').css('opacity','1');
	
			// Variable para mostrar las variables
			var variables = "";
			for(var i=0;i<n_vars;i++){
				variables = variables +" Variable "+i+": "+ response.data.calculo.resultado_AG.values[i]+"<br>";
			}
			// Variable para mostrarlo en forma de "array"
			var listaVariables = "[";
			for(var i=0;i<n_vars-1;i++){
				listaVariables = listaVariables + response.data.calculo.resultado_AG.values[i]+", ";
			}
			listaVariables = listaVariables + response.data.calculo.resultado_AG.values[n_vars-1]+"]";

	    	// Mostramos los resultados por pantalla
			$('#muestra_resultado').html("<strong>"+JSON.stringify(response.data.calculo.nombre).replace(/\"/g,"")+" </strong><br>"
										+JSON.stringify(response.data.calculo.dispositivo).replace(/\"/g,"").replace("GPU Device 0","Device")+"<br>"
										+"Performance: "+JSON.stringify(response.data.calculo.datos_computo.performance)+"<br>"
										+"Time: "+JSON.stringify(response.data.calculo.datos_computo.time)+"<br>"
										+"Size: "+JSON.stringify(response.data.calculo.datos_computo.size)+"<br>"
										+"Workgroup size: "+JSON.stringify(response.data.calculo.datos_computo.workgroupSize)+"<br><br>"
										+"<strong>Para la entrada: </strong> <br> Número de generaciones: "+JSON.stringify(response.data.calculo.info_input.n_generations).replace(/\"/g,"")+"<br>"
										+"Valor mínimo: "+JSON.stringify(response.data.calculo.info_input.minimal_value).replace(/\"/g,"")+"<br>"
										+"Valor máximo: "+JSON.stringify(response.data.calculo.info_input.maximum_value).replace(/\"/g,"")+"<br>"
										+"Con :"+JSON.stringify(response.data.calculo.info_input.n_vars).replace(/\"/g,"")+" variables <br>"
										+"Probabilidad de mutación: "+(JSON.stringify(response.data.calculo.info_input.p_mutation).replace(/\"/g,""))*100+"% <br>"
										+"Probabilidad de cruce: "+(JSON.stringify(response.data.calculo.info_input.p_crossover).replace(/\"/g,""))*100+"% <br>"
										+"Y una población de "+JSON.stringify(response.data.calculo.info_input.population_size).replace(/\"/g,"")+" <br>"
										+"Con las variables a: "+JSON.stringify(response.data.calculo.info_input.a).replace(/\"/g,"")+" b:"+JSON.stringify(response.data.calculo.info_input.b).replace(/\"/g,"")+" c:"+JSON.stringify(response.data.calculo.info_input.c).replace(/\"/g,"")+" propias de la función de optmización Ackley<br>"
										+"<br>Tras "+JSON.stringify(response.data.calculo.resultado_AG.generations).replace(/\"/g,"")+" generaciones con el mejor 'fitness' de "+JSON.stringify(response.data.calculo.resultado_AG.best_fitness).replace(/\"/g,"")+" se obtienen las <strong>variables:</strong> <br>"+variables +"<br>"
										+"<strong>Array con las variables: </strong>"+listaVariables );


		  }, function errorCallback(response) {

		  	console.log("fallo al realizar la petición");

		  });

    };


	$scope.peticionRastrigin = function(ar, max_gen, min, max, p_mutation, p_crossover, population_size, n_vars) { 
	
		
		$('.icono_espera').css('display','initial'); 
		$('body').css('opacity','0.5'); 

		var datos = {valorARastrigin: ar, maxgen: max_gen, valorMin: min, valorMax: max, pMutation: p_mutation, pCrossover: p_crossover, populationSize: population_size, nVars: n_vars };

		$http({
		  method: 'POST',
		  url: '/swgpu/peticion_rastrigin/',
		  data: datos
		}).then(function successCallback(response) {

		    console.log(response.data.calculo);

		    // calcula la fecha actual para mostrarla por pantalla
			var hora_pet = new Date();
			$('#fecha_peticion').html(hora_pet);
			// Dirige a los resultados, pero sin transición
			// //window.location="#2";
			// Eliminamos el elemento de espera
			$('#ver_resultados_rastrigin').css('display','initial');
			$('.icono_espera').css('display','none');
			$('body').css('opacity','1');
	
			// Variable para mostrar las variables
			var variables = "";
			for(var i=0;i<n_vars;i++){
				variables = variables +" Variable "+i+": "+ response.data.calculo.resultado_AG.values[i]+"<br>";
			}
			// Variable para mostrarlo en forma de "array"
			var listaVariables = "[";
			for(var i=0;i<n_vars-1;i++){
				listaVariables = listaVariables + response.data.calculo.resultado_AG.values[i]+", ";
			}
			listaVariables = listaVariables + response.data.calculo.resultado_AG.values[n_vars-1]+"]";

	    	// Mostramos los resultados por pantalla
			$('#muestra_resultado').html("<strong>"+JSON.stringify(response.data.calculo.nombre).replace(/\"/g,"")+" </strong><br>"
										+JSON.stringify(response.data.calculo.dispositivo).replace(/\"/g,"").replace("GPU Device 0","Device")+"<br>"
										+"Performance: "+JSON.stringify(response.data.calculo.datos_computo.performance)+"<br>"
										+"Time: "+JSON.stringify(response.data.calculo.datos_computo.time)+"<br>"
										+"Size: "+JSON.stringify(response.data.calculo.datos_computo.size)+"<br>"
										+"Workgroup size: "+JSON.stringify(response.data.calculo.datos_computo.workgroupSize)+"<br><br>"
										+"<strong>Para la entrada: </strong> <br> Número de generaciones: "+JSON.stringify(response.data.calculo.info_input.n_generations).replace(/\"/g,"")+"<br>"
										+"Valor mínimo: "+JSON.stringify(response.data.calculo.info_input.minimal_value).replace(/\"/g,"")+"<br>"
										+"Valor máximo: "+JSON.stringify(response.data.calculo.info_input.maximum_value).replace(/\"/g,"")+"<br>"
										+"Con "+JSON.stringify(response.data.calculo.info_input.n_vars).replace(/\"/g,"")+" variables <br>"
										+"Probabilidad de mutación: "+(JSON.stringify(response.data.calculo.info_input.p_mutation).replace(/\"/g,""))*100+"% <br>"
										+"Probabilidad de cruce: "+(JSON.stringify(response.data.calculo.info_input.p_crossover).replace(/\"/g,""))*100+"% <br>"
										+"Y una población de "+JSON.stringify(response.data.calculo.info_input.population_size).replace(/\"/g,"")+" <br>"
										+"Con la variable A: "+JSON.stringify(response.data.calculo.info_input.A).replace(/\"/g,"")+" propia de la función de optmización Rastrigin<br>"
										+"<br>Tras "+JSON.stringify(response.data.calculo.resultado_AG.generations).replace(/\"/g,"")+" generaciones con el mejor 'fitness' de "+JSON.stringify(response.data.calculo.resultado_AG.best_fitness).replace(/\"/g,"")+" se obtienen las <strong>variables:</strong> <br>"+variables +"<br>"
										+"<strong>Array con las variables: </strong>"+listaVariables );


		  }, function errorCallback(response) {

		  	console.log("fallo al realizar la petición");

		  });

	};

	
});