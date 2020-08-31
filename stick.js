(function($) {

	$("head").append($("<link rel=\"stylesheet\" href=\"./stick.css\">")); // подключил стили 
	$.fn.extend({
		stick: function(opt) {
			let main_div = document.createElement("div");
			main_div.className = "stick_main_div";
				
			let track = document.createElement("div");
			track.className = "track";

			let progress = document.createElement("div");
			progress.className = "progress";

			let thumb = document.createElement("div");
			thumb.className = "thumb";

			let scale = document.createElement("div");
			scale.className = "scale";

			$(this).append(main_div);
			$(this).children(".stick_main_div").append(track);
			$(this).children(".stick_main_div").append(progress);
			$(this).children(".stick_main_div").append(thumb);
			$(this).children(".stick_main_div").append(scale);

			
			/* Определяем тип браузера */
			let ie = 0;
			let op = 0;
			let ff = 0;
			let browser = navigator.userAgent;
			if (browser.indexOf("Opera") != -1) op = 1;
			else {
				if (browser.indexOf("MSIE") != -1) ie = 1;
				else {
					if (browser.indexOf("Firefox") != -1) ff = 1;
				}
			}

			delta_x = 0;
			/* Ставим обработчики событий на нажатие и отпускание клавиши мыши */
			thumb.onmousedown = startMove;
			if (op || ff) {
			thumb.addEventListener("onmousedown", startMove, false);
			}
			document.onmouseup = stopMove;
			
			function startMove(obj_event) {
				/* Получаем текущие координаты курсора */
				if (obj_event) {
					x = obj_event.pageX;
				}
				else {
					x = window.event.clientX;
					if (ie) {
					x -= 2;
					}
				}
				/* Узнаём текущие координаты блока */
				x_block = thumb.offsetLeft;
				/* Узнаём смещение */
				delta_x = x_block - x;
				/* При движении курсора устанавливаем вызов функции moveWindow */
				document.onmousemove = moveThumb;
				if (op || ff)
					document.addEventListener("onmousemove", moveThumb, false);
				}
			function stopMove() {
				document.onmousemove = null; // При отпускании мыши убираем обработку события движения мыши
			}
			//функция выполняемая при движении ползунка
			function moveThumb(obj_event) {
				trackWidth = track.offsetWidth;
				delta_trackWidth = trackWidth - thumb.offsetWidth;
				/* Получаем новые координаты курсора мыши */
				if (obj_event) {
					x = obj_event.pageX;
				}
				else {
					x = window.event.clientX;
					if (ie) {
					x -= 2;
					}
				}
				/* Вычисляем новые координаты бегунка */
				new_x = delta_x + x;
				if (new_x < 0){
					new_x = 0;
				}else if (new_x > delta_trackWidth){
					new_x = delta_trackWidth;
				};
				thumb.style.left = new_x + "px";

				/*Значение слайдера в процентах*/
				let procent = ((delta_trackWidth - (delta_trackWidth - new_x)) / delta_trackWidth) * 100;
				
				/*Задаем значение прогрессбару*/ 
				progress.style.width = procent + "%";
			}

			

		}
	})	
})(jQuery);