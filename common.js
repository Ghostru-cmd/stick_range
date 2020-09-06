$(document).ready(function(){
    $(".div").stick({
        minMax: [0, 200], /** Минимальное и максимальное значение слайдера. 
        * Первое значение - минимальное значение слайдера.
        * Второе значение - максимальное значение слайдера.
        */
        vertical: false, /** Вертикальность слайдера */
        outValue: ["value", 0, 200], /** Выводимое число
        * Первое значение - percent или value. 
        * При значении percent: второе значение массива - округление.
        * При значении value: второе значение - минимальное число, третье значение - максимальное число, четвертое(не обязательное) - округление.
        */
        vagon: ["value", 0, 200], /** Выводимое число над ползунком. 
        * Первое значение percent или value. 
        * При значении percent: второе значение массива - округление.
        * При значении value, второе значение - минимальное число, третье значение - максимальное число, четвертое(не обязательное) - округление.
        */
        scale: [5, 0, 200], /** Шкала под слайдером.
        * Первое число - число делений.
        * Второе число - минимальное значение шкалы. 
        * Третье число - максимальное значение шкалы.
        */ 
        doubleThumb: true /** Двойной ползунок. 
        * True - если нужно два ползунка.
        */
    });
    $(".div2").stick({
        minMax: [0, 2000],
        outValue: ["value", 0, 2000],
        vagon: ["value", 0, 2000],
        scale: [5, 0, 2000]
    });
    $(".div3").stick({
        minMax: [0, 20],
        vagon: ["value", 0, 20],
        scale: [5, 0, 20],
        vertical: true
    });
    $(".div4").stick({
        minMax: [0, 20],
        vertical: true
    });
    $("button").click(clicked)
    function clicked () {
        text = document.getElementsByTagName("input")[0];
        input = text.value;
        $(".div2").stick({
            minMax: [0, 2000],
            vertical: false,
            outValue: ["value", 0, 2000],
            vagon: ["value", 0, 2000],
            scale: [5, 0, 2000],
            doubleThumb: false,
            value: input
        })
    };
})