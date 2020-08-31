(function($) {

	$("head").append($("<link rel=\"stylesheet\" href=\"./stick.css\">")); // подключил стили 
	$.fn.extend({
		stick: function(opt) {
			/*Создаем дивы слайдера*/
			let main_div = document.createElement("div");
			main_div.className = "stick_main_div";
			/*Запрещаем перетаскивать как изображение*/
			main_div.setAttribute("ondrag" , "return false");
			main_div.setAttribute("ondragdrop" , "return false"); 
			main_div.setAttribute("ondragstart" , "return false");
				
			let track = document.createElement("div");
			track.className = "track";

			let progress = document.createElement("div");
			progress.className = "progress";

			let thumb = document.createElement("div");
			thumb.className = "thumb";

			let outValue = document.createElement("div");
			outValue.className = "outValue";

			let vagon = document.createElement("div");
			vagon.className = "vagon";

			let scale = document.createElement("div");
			scale.className = "scale";

			let scale_value = document.createElement("div");
			scale_value.className = "scale_value";

			/*Выводим дивы на страницу */
			$(this).append(main_div);
			$(this).children(".stick_main_div").append(track);
			$(this).children(".stick_main_div").append(progress);
			$(this).children(".stick_main_div").append(thumb);
			if (opt.outValue){
			$(this).children(".stick_main_div").append(outValue);
			};
			if (opt.vagon){
				$(this).children(".stick_main_div").append(vagon);
			};
			if (opt.scale){
				$(this).children(".stick_main_div").append(scale);
			};

			/*Создаем возможность движение ползунка*/
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
				let percent = ((delta_trackWidth - (delta_trackWidth - new_x)) / delta_trackWidth) * 100;
				
				/*Задаем значение прогрессбару*/ 
				progress.style.width = percent + "%";

				/*Задаем выводимое значение*/
				if (opt.outValue != undefined){
					/*Значение в процентах*/
					if (opt.outValue[0] == "percent"){
						outValue.innerHTML = percent.toFixed(opt.outValue[1]);
					};
					/*Числовое значение*/
					if (opt.outValue[0] == "value"){
						delta_MinMax = opt.outValue[2] - opt.outValue[1];
						thisValue = (delta_MinMax / 100 * percent) + opt.outValue[1];

						outValue.innerHTML = thisValue.toFixed(opt.outValue[3] ? opt.outValue[3] : '');

					};
				}
				
				/*Логика для вагонетки */
				if (opt.vagon != undefined){
					/* */
					/*Значение в процентах*/
					if (opt.vagon[0] == "percent"){
						vagon.innerHTML = percent.toFixed(opt.vagon[1]);
					};
					/*Числовое значение*/
					if (opt.vagon[0] == "value"){
						delta_MinMax = opt.vagon[2] - opt.vagon[1];
						thisValue = (delta_MinMax / 100 * percent) + opt.vagon[1];
						vagon.innerHTML = thisValue.toFixed(opt.vagon[3] ? opt.vagon[3] : '');
					};
					/*Расчет сдвига вагонетки */
					if (vagon.innerHTML < 9){
						vagon.style.left = progress.offsetWidth + "px";
					}else if (9 < vagon.innerHTML && vagon.innerHTML < 99){
						vagon.style.left = progress.offsetWidth + "px";
					}else if (99 < vagon.innerHTML && vagon.innerHTML < 999){
						vagon.style.left = progress.offsetWidth - 2.5 + "px";
					}else if (999 < vagon.innerHTML && vagon.innerHTML < 9999){
						vagon.style.left = progress.offsetWidth - 5 + "px";
					}
				}
			}

			/*Расчет шкалы */
			if (opt.scale != undefined){
				let delta_MinMax = opt.vagon[2] - opt.vagon[1];
				let deltaScale = delta_MinMax / opt.scale[0];
				for (i = 0; i <= opt.vagon[2]; i += deltaScale){
					let scaleWidth = track.offsetWidth / opt.scale[0];
					if (i < 9){
						scaleWidth -= 10;
					}
					if (9 < i && i < 99){
						scaleWidth -= 20;
					}
					if (99 < i && i < 999){
						scaleWidth -= 30;
					}
					if (999 < i && i < 9999){
						scaleWidth -= 40;
					}
					scale_value.innerHTML = parseInt(i);
					scale_value.style.marginRight = scaleWidth +"px";
					$(scale_value).clone().appendTo(scale);
				};
			};
	
			/*Действия при клике на шкалу 
			slider_scale_value.oninput = function() {
				$(this).parent().children("slider").value = this.innerHTML();
				alert(1);
			};*/
		}
	})	
})(jQuery);