var app = angular.module("myApp", []);


app.controller("myController", function($scope) { 

	// Función para recoger el valor introducido por el usuario, hacer la consulta y devolver el resultado en #muestra_resultado
	$scope.peticionCalculo = function(valor) { 		
		// Modificamos el maquetado con jQuery y hacemos la petición con el valor introducido
		$('#icono_espera').css('display','initial'); 
		$('body').css('opacity','0.5'); 
		$.get('/swgpu/peticion_datos/', {peticion: valor }, function(data){
				// calcula la fecha actual para mostrarla por pantalla
				var hora_pet = new Date();
				$('#fecha_peticion').html(hora_pet);
				// Dirige a los resultados, pero sin transición
				// //window.location="#2";
				// Eliminamos el elemento de espera
				$('#ver_resultados').css('display','initial');
				$('#icono_espera').css('display','none');
				$('body').css('opacity','1');
				// Mostramos los resultados por pantalla
		    	$('#muestra_resultado').html(data);
	    });	

    };
	
});