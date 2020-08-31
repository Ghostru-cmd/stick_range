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
			thumb.onmousedown = saveXY;
			if (op || ff) {
			thumb.addEventListener("onmousedown", saveXY, false);
			}
			document.onmouseup = clearXY;
			/* При нажатии кнопки мыши попадаем в эту функцию */
			function saveXY(obj_event) {
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
				document.onmousemove = moveBlock;
				if (op || ff)
					document.addEventListener("onmousemove", moveBlock, false);
				}
			function clearXY() {
				document.onmousemove = null; // При отпускании мыши убираем обработку события движения мыши
			}
			function moveBlock(obj_event) {
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
				/* Вычисляем новые координаты блока */
				new_x = delta_x + x;
				if (new_x < 0){
					new_x = 0;
				}else if (new_x > track.offsetWidth){
					new_x = track.offsetWidth - thumb.offsetWidth;
				};
				thumb.style.left = new_x + "px";
			}
		}
	})	
})(jQuery);