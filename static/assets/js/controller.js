var app = angular.module("myApp", []);


app.controller("myController", function($scope, $http) { 

	// Función para recoger el valor introducido por el usuario, hacer la consulta y devolver el resultado en #muestra_resultado
	$scope.peticionCalculo = function(valor) { 		
		// Modificamos el maquetado con jQuery y hacemos la petición con el valor introducido
		$('.icono_espera').css('display','initial'); 
		$('body').css('opacity','0.5'); 

		var peticion_calculo = $.get('/swgpu/peticion_datos/', {peticion: valor });

		peticion_calculo.success(function(data){
		     // calcula la fecha actual para mostrarla por pantalla
				var hora_pet = new Date();
				$('#fecha_peticion').html(hora_pet);
				// Dirige a los resultados, pero sin transición
				// //window.location="#2";
				// Eliminamos el elemento de espera
				$('#ver_resultados').css('display','initial');
				$('.icono_espera').css('display','none');
				$('body').css('opacity','1');
		    	// Parseamos los datos
		    	var datos = JSON.parse(data);
		    	// Preparamos los datos para mostrarlos
		    	var muestra_datos="<strong>"+JSON.stringify(datos.calculo.nombre)+"</strong> <br>"
											+JSON.stringify(datos.calculo.dispositivo)+"<br>"
											+JSON.stringify(datos.calculo.info_matriz)+"<br>"
											+"Performance: "+JSON.stringify(datos.calculo.datos_computo.performance)+"<br>"
											+"Time: "+JSON.stringify(datos.calculo.datos_computo.time)+"<br>"
											+"Size: "+JSON.stringify(datos.calculo.datos_computo.size)+"<br>"
											+"Workgroup size: "+JSON.stringify(datos.calculo.datos_computo.workgroupSize)
				muestra_datos=muestra_datos.replace(/\"/g,"");							
				// Mostramos algunos datos por pantalla
				$('#muestra_datos').html(muestra_datos);
		    	// Mostramos los resultados por pantalla
		    	$('#muestra_resultado').html(JSON.stringify(datos.calculo.resultados));
		});
					 
    };

	$scope.valueA=20;
	$scope.valueB=0.2;
	$scope.valueC=2*Math.PI;

	$scope.max_gen=100;
	$scope.min=-32.768;
	$scope.max=32.768;
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
	
			// Mostramos algunos datos por pantalla
			var muestra_datos=JSON.stringify(response.data.calculo.info_input)+"<br>"
								+JSON.stringify(response.data.calculo.datos_computo)+"<br>";											
			
			$('#muestra_datos_ackley').html(muestra_datos);

	    	// Mostramos los resultados por pantalla
	    	$('#muestra_resultado').html(JSON.stringify(response.data.calculo.resultado_AG));

		  }, function errorCallback(response) {

		  	console.log("fallo al realizar la petición");

		  });

    };
	
});