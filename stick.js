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

			let doubleThumb = document.createElement("div");
			doubleThumb.className = "doubleThumb";

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
			if (opt.doubleThumb){
				$(this).children(".stick_main_div").append(doubleThumb);
			};
			if (opt.outValue){
				$(this).children(".stick_main_div").append(outValue);
				outValue.innerHTML = 0;
			};
			if (opt.vagon){
				$(this).children(".stick_main_div").append(vagon);
				vagon.innerHTML = 0;
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
			if (browser.indexOf("Opera") != -1) {
				op = 1
			}else if (browser.indexOf("MSIE") != -1) {
				ie = 1
			}else if (browser.indexOf("Firefox") != -1) {
				ff = 1
			};

			delta_x = 0;
			/*Значение слайдера в процентах*/
			function newPercent() {
				percent = ((thumb.offsetLeft + thumb.offsetWidth) / track.offsetWidth) * 100;
			}
			function newPercent2() {
				percent2 = (doubleThumb.offsetLeft / track.offsetWidth) * 100;
			}

			/* Ставим обработчики событий на нажатие и отпускание клавиши мыши */
			thumb.onmousedown = startMove;
			doubleThumb.onmousedown = startMoveSecond;
			if (op || ff) {
			thumb.addEventListener("onmousedown", startMove, false);
			doubleThumb.addEventListener("onmousedown", startMoveSecond, false);
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
				if (doubleThumb.offsetLeft > (thumb.offsetLeft - thumb.offsetWidth)) {
					if (doubleThumb.offsetLeft > 0) {
						doubleThumb.style.left = (thumb.offsetLeft - thumb.offsetWidth) + "px";
					};
				};
				
				newPercent();

				changeProgress();

				if (opt.outValue){
					valueInferred();
				}
				if (opt.vagon){
					vagonetka();
				}
			}

			function startMoveSecond(obj_event) {
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
				x_block = doubleThumb.offsetLeft;
				/* Узнаём смещение */
				delta_x = x_block - x;
				/* При движении курсора устанавливаем вызов функции moveWindow */
				document.onmousemove = moveThumbSecond;
				if (op || ff) {
					document.addEventListener("onmousemove", moveThumbSecond, false);
				}
			}

			function moveThumbSecond(obj_event) {
				trackWidth = track.offsetWidth;
				delta_trackWidth = trackWidth - doubleThumb.offsetWidth;
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
				doubleThumb.style.left = new_x + "px";
				if (thumb.offsetLeft < (doubleThumb.offsetLeft + doubleThumb.offsetWidth)) {
					if (thumb.offsetLeft < (track.offsetWidth - thumb.offsetWidth)) {
						thumb.style.left = (doubleThumb.offsetLeft + doubleThumb.offsetWidth) + "px";
					};
				};

				newPercent2();
				
				changeProgress();

				if (opt.outValue){
					valueInferred();
				}
				if (opt.vagon){
					vagonetka();
				}
			}

			function stopMove() {
				document.onmousemove = null; // При отпускании мыши убираем обработку события движения мыши
			}

			/*Задаем выводимое значение*/
			function valueInferred(scalValue) {
				outValueInner = outValue.innerHTML;
				scalValue = parseInt(scalValue);
				/*Значение в процентах*/
				if (opt.outValue[0] == "percent"){
					newPercent();
					newPercent2();
					outValue.innerHTML = percent.toFixed(opt.outValue[1]);
					if (opt.doubleThumb){
						outValue.innerHTML = percent2.toFixed(opt.outValue[1]) + "-" + percent.toFixed(opt.outValue[1]);
					}
				};
				/*Числовое значение*/
				if (opt.outValue[0] == "value"){
					delta_MinMax = opt.outValue[2] - opt.outValue[1];
					if (!scalValue){
						thisValue = (delta_MinMax / 100 * percent) + opt.outValue[1];
					}else {
						thisValue = scalValue;
					}
					outValue.innerHTML = thisValue.toFixed(opt.outValue[3] ? opt.outValue[3] : '');
					if (opt.doubleThumb){
						if (closerThumb() == "firstThumb"){
							if (!scalValue){
								thisValue = (delta_MinMax / 100 * percent) + opt.outValue[1];
							}else {
								thisValue = scalValue;
							}
							outValue.innerHTML = outValueInner.split("-")[0] + "-" + thisValue.toFixed(opt.outValue[3] ? opt.outValue[3] : '');
						}else {
							if (!scalValue){
								thisValue2 = (delta_MinMax / 100 * percent2) + opt.outValue[1];
							}else {
								thisValue2 = scalValue;
							}
							outValue.innerHTML = thisValue2.toFixed(opt.outValue[3] ? opt.outValue[3] : '') + "-" + outValueInner.split("-")[1];
						}
					}

				};
			
			}

			/*Задаем значение прогрессбару*/ 
			function changeProgress() {
				if (opt.doubleThumb){
					progress.style.width = thumb.offsetLeft - doubleThumb.offsetLeft + "px";
					progress.style.left = doubleThumb.offsetLeft + "px";
				}else{
					progress.style.width = thumb.offsetLeft + "px";
				}
			}

			/*Логика для вагонетки */
			function vagonetka(scalValue) {
				vadonInner = vagon.innerHTML;
				/*Значение в процентах*/
				if (opt.vagon[0] == "percent") {
					if (opt.doubleThumb) {
						vagon.innerHTML = percent2.toFixed(opt.vagon[1]) + "-" + percent.toFixed(opt.vagon[1]);
					}else {
						vagon.innerHTML = percent.toFixed(opt.vagon[1]);
					}
				};
				/*Числовое значение*/
				if (opt.vagon[0] == "value"){
					if (opt.doubleThumb) {
						delta_MinMax = opt.vagon[2] - opt.vagon[1];
						newPercent();
						thisValue = (delta_MinMax / 100 * percent) + opt.vagon[1];
						newPercent2();
						thisValue2 = (delta_MinMax / 100 * percent2) + opt.vagon[1];
						vagon.innerHTML = (thisValue2.toFixed(opt.vagon[3] ? opt.vagon[3] : '') + "-" + thisValue.toFixed(opt.vagon[3] ? opt.vagon[3] : ''));
					}else {
						delta_MinMax = opt.vagon[2] - opt.vagon[1];
						thisValue = (delta_MinMax / 100 * percent) + opt.vagon[1];
						vagon.innerHTML = thisValue.toFixed(opt.vagon[3] ? opt.vagon[3] : '');
					}
				};
				/*Расчет сдвига вагонетки */
				if (opt.doubleThumb) {
					if (vagon.innerHTML < 9){
						vagon.style.left = progress.offsetLeft + "px";
					}else if (9 < vagon.innerHTML && vagon.innerHTML < 99){
						vagon.style.left = progress.offsetLeft + "px";
					}else if (99 < vagon.innerHTML && vagon.innerHTML < 999){
						vagon.style.left = progress.offsetLeft - 2.5 + "px";
					}else if (999 < vagon.innerHTML && vagon.innerHTML < 9999){
						vagon.style.left = progress.offsetLeft - 5 + "px";
					}
				}else {
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
				if (scalValue) {
					if (opt.vagon[0] == "value"){
						if (opt.doubleThumb) {
							if (closerThumb() == "firstThumb") {
								vagon.innerHTML = (vadonInner.split("-")[0] + "-" + scalValue);
							}else {
								vagon.innerHTML = (scalValue + "-" + vadonInner.split("-")[1]);
							}
						}else {
							vagon.innerHTML = scalValue;
						}
					}
					if (opt.vagon[0] == "percent"){
						if (opt.doubleThumb) {
							if (closerThumb() == "firstThumb") {
								vagon.innerHTML = (percent2.toFixed(opt.vagon[3] ? opt.vagon[3] : '') + "-" + scalValue);
							}else {
								vagon.innerHTML = (scalValue + "-" + percent.toFixed(opt.vagon[3] ? opt.vagon[3] : ''));
							}
						}else {
							vagon.innerHTML = scalValue;
						}
					}
				}
			}

			/*Расчет шкалы */
			if (opt.scale){
				let delta_MinMax = opt.scale[2] - opt.scale[1];
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
	
			/*Действия при клике на шкалу */
			$(this).children(".stick_main_div").children(".scale").children(".scale_value").click(scaleClick);
			function scaleClick() {
				let scaleValue = $(this).html();
				changeValue(scaleValue);
				
			};

			/*Узнаем какой ползунок ближе */
			function closerThumb() {
				let firstThumb = x - thumb.getBoundingClientRect().left;
				let secondThumb = x - doubleThumb.getBoundingClientRect().left;
				if (Math.abs(firstThumb) <= Math.abs(secondThumb)) {
					return "firstThumb";
				}else {
					return "secondThumb";
				}
			}

			function changeValue(pressedValue, obj_event){
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

				
				if (opt.doubleThumb) {
					if (closerThumb() == "firstThumb"){
						/*Перемещаем бегунок*/
						thumb.style.left = pressedValue - (thumb.offsetWidth / 2) + "px";
					}else {
						/*Перемещаем бегунок*/
						doubleThumb.style.left = pressedValue - (doubleThumb.offsetWidth / 2) + "px";
					}
				}else {
					thumb.style.left = pressedValue - (thumb.offsetWidth / 2) + "px";
				}
				

				changeProgress();

				vagonetka(pressedValue);

				valueInferred(pressedValue);

			};

			/*Действия при клике на track и progress */
			$(this).children(".stick_main_div").children(".track").click(trackProgressClick);
			$(this).children(".stick_main_div").children(".progress").click(trackProgressClick);
			function trackProgressClick(obj_event) {
				x = track.offsetWidth;

				let elem_left = $(this).offset().left;
				y = obj_event.pageX - elem_left;
				let changeVal = (y / x) * 100;
				changeValue(changeVal);
				
			};

			
		}
	})	
})(jQuery);