var app = angular.module("myApp", []);


app.controller("myController", function($scope) { 

	// Función para recoger el valor introducido por el usuario, hacer la consulta y devolver el resultado en #muestra_resultado
	$scope.peticionCalculo = function(valor) { 		
		// Modificamos el maquetado con jQuery y hacemos la petición con el valor introducido
		$('#icono_espera').css('display','initial'); 
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
				$('#icono_espera').css('display','none');
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
	$scope.valueC=2;

    $scope.peticionAckley = function(a,b,c,valores) { 

    };
	
});