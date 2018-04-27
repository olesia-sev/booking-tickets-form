;'use strict';

var Places = window.google && window.google.maps && window.google.maps.places;

(function (Places, $) {
    $(function () {
        //autocomplete (google api)
        try {
            new Places.Autocomplete(document.getElementById('departure-city'));
            new Places.Autocomplete(document.getElementById('arrival-city'));
        } catch (error) {
            console.warn(error);
        }

        //поменять города местами по клику на стрелочки
        $('.js-form__arrows').on('click', function () {
            var $departureCityInput = $('#departure-city'),
                $arrivalCityInput = $('#arrival-city'),
                departureCityInputValue = $departureCityInput.val(),
                arrivalCityInputValue = $arrivalCityInput.val();

            $arrivalCityInput.val(departureCityInputValue);
            $departureCityInput.val(arrivalCityInputValue);
        });

        //заполнение инпутов по клику на подсказки Москва, Санкт-Петербург
        $('.js-fast-input').on('click', function () {
            $($(this).data('target')).val($(this).data('value'));
        });

        //календарь
        $.fn.datepicker.language['en'] = {
            days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            daysMin: ['Sn', 'Mn', 'Tu', 'Wd', 'Th', 'Fr', 'St'],
            months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            today: 'Today',
            clear: 'Reset',
            dateFormat: 'dd.mm.yyyy',
            timeFormat: 'hh:ii',
            firstDay: 1
        };

        //проверка браузера (если Сафари 7 и ниже, не показывать календарь datepicker, заменить на input type=date)
        function isBadSafari() {
            var userAgent = navigator.userAgent.toLowerCase();

            if (userAgent.indexOf('chrome') > -1) {
                console.log('OK', 'Not Safari');
                return false;
            }

            if (userAgent.indexOf('safari') === -1) {
                console.log('OK', 'Not Safari');
                return false;
            }

            var version = userAgent.match(/version\/(\d+)/i);

            if (Array.isArray(version) && version[1] > 7) {
                console.log('OK', version);
                return false;
            }

            console.log('Bad Safari');
            return true;
        }

        // Datepicker
        if (isBadSafari()) {
            var date = new Date(),
                YYYY = date.getUTCFullYear(),
                MM = date.getUTCMonth() + 1,
                DD = date.getUTCDate();

            if (MM < 10) {
                MM = '0' + MM;
            }

            if (DD < 10) {
                DD = '0' + DD;
            }

            $('.js-datepicker-here')
                .prop({
                    'type': 'date',
                    'readonly': false
                })
                .attr('min', YYYY + '-' + MM + '-' + DD);
        } else {
            $('.js-datepicker-here').datepicker({
                language: 'en',
                minDate: new Date()
            });
        }

        //активное поле выбора даты обратного билета по клику на чекбокс
        var $returnDateInput = $('#return-date');

        $('#roundtrip').on('change', function () {
            $returnDateInput
                .prop('disabled', !$returnDateInput.prop('disabled'))
                .toggleClass('inactive');
        });

        //выбор валюты
        $('.js-select').select2({
            width: 'style'
        });

        //burger-menu
        var clickHandler = function (event) {
            event.preventDefault();
            $(this).toggleClass('menu-on');
            $('.burger-menu-wrap').toggleClass('burger-menu-wrap__visible');
            $('html, body').toggleClass('no-scroll');
        };

        $('.burger-icon').on('click', clickHandler);
    });
})(Places, jQuery);




