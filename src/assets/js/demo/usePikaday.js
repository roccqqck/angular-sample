var i18nChinese = {
    previousMonth : '上個月',
    nextMonth     : '下個月',
    months        : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
    weekdays      : ['日','一','二','三','四','五','六'],
    weekdaysShort : ['日','一','二','三','四','五','六'],
};

var picker1 = new Pikaday({
    field: document.getElementById('datepicker1'),
    firstDay: 1,
    minDate: new Date(2000, 0, 1),
    maxDate: new Date(2020, 12, 31),
    yearRange: [2000,2020],
    keyboardInput: false
});
picker1.setMoment(moment().dayOfYear(366));

var picker2 = new Pikaday({
    field: document.getElementById('datepicker2'),
    firstDay: 1,
    minDate: new Date(2000, 0, 1),
    maxDate: new Date(2020, 12, 31),
    yearRange: [2000,2020],
    keyboardInput: false,
    i18n: i18nChinese
});
picker2.setMoment(moment().dayOfYear(366));

var picker3 = new Pikaday({
    field: document.getElementById('datepicker3'),
    firstDay: 1,
    minDate: new Date(2000, 0, 1),
    maxDate: new Date(2020, 12, 31),
    yearRange: [2000,2020],
    keyboardInput: false,
    i18n: i18nChinese
});
picker3.setMoment(moment().dayOfYear(366));


var startDate1,
    endDate1,
    updateStartDate1 = function() {
        startPicker1.setStartRange(startDate1);
        endPicker1.setStartRange(startDate1);
        endPicker1.setMinDate(startDate1);
    },
    updateEndDate1 = function() {
        startPicker1.setEndRange(endDate1);
        startPicker1.setMaxDate(endDate1);
        endPicker1.setEndRange(endDate1);
    },
    startPicker1 = new Pikaday({
        field: document.getElementById('start1'),
        minDate: new Date(),
        maxDate: new Date(2020, 12, 31),
        keyboardInput: false,
        i18n: i18nChinese,
        onSelect: function() {
            startDate1 = this.getDate();
            updateStartDate1();
        }
    }),
    endPicker1 = new Pikaday({
        field: document.getElementById('end1'),
        minDate: new Date(),
        maxDate: new Date(2020, 12, 31),
        keyboardInput: false,
        i18n: i18nChinese,
        onSelect: function() {
            endDate1 = this.getDate();
            updateEndDate1();
        }
    }),
    _startDate1 = startPicker1.getDate(),
    _endDate1 = endPicker1.getDate();
    if (_startDate1) {
        startDate1 = _startDate1;
        updateStartDate1();
    }
    if (_endDate1) {
        endDate1 = _endDate1;
        updateEndDate1();
    }


var startDate2,
    endDate2,
    updateStartDate2 = function() {
        startPicker2.setStartRange(startDate2);
        endPicker2.setStartRange(startDate2);
        endPicker2.setMinDate(startDate2);
    },
    updateEndDate2 = function() {
        startPicker2.setEndRange(endDate2);
        startPicker2.setMaxDate(endDate2);
        endPicker2.setEndRange(endDate2);
    },
    startPicker2 = new Pikaday({
        field: document.getElementById('start2'),
        minDate: new Date(),
        maxDate: new Date(2020, 12, 31),
        keyboardInput: false,
        i18n: i18nChinese,
        onSelect: function() {
            startDate2 = this.getDate();
            updateStartDate2();
        }
    }),
    endPicker2 = new Pikaday({
        field: document.getElementById('end2'),
        minDate: new Date(),
        maxDate: new Date(2020, 12, 31),
        keyboardInput: false,
        i18n: i18nChinese,
        onSelect: function() {
            endDate2 = this.getDate();
            updateEndDate2();
        }
    }),
    _startDate2 = startPicker2.getDate(),
    _endDate2 = endPicker2.getDate();

    if (_startDate2) {
        startDate2 = _startDate2;
        updateStartDate2();
    }
    if (_endDate2) {
        endDate2 = _endDate2;
        updateEndDate2();
    }