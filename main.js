class Calender {
    constructor(containerId) {
        this._containerId = containerId
        this._month = this._getChildClass('month');
        this._year = this._getChildClass('year');
        this._dates = this._getChildClass('dates');

        this._previous = this._getChildClass('previous');
        this._forward = this._getChildClass('forward');

        this._date = new Date();

        this._init();
    }

    _getChildClass(className) {
        return document.querySelector(`#${this._containerId} .${className}`);
    }

    _init() {
        this._update();
        this._addButtonEvents();
    }

    _update() {
        this._displayMonth();
        this._displayYear();
        this._displayDates();
    }

    _addButtonEvents() {
        this._previous.addEventListener('click', (e) => {
            this._changeMonth(-1);
        });
        this._forward.addEventListener('click', (e) => {
            this._changeMonth(1);
        });
    }

    _changeMonth(changeAmount) {
        this._date.setMonth(this._date.getMonth() + changeAmount);
        this._update();
        this._removeDates();
        this._displayDates();
    }

    _displayMonth() {
        let month = this._date.toLocaleString(undefined, {
            month: 'long'
        });
        this._month.textContent = month;
    }

    _displayYear() {
        this._year.textContent = this._date.getFullYear();
    }

    _removeDates() {
        let dateElements = document.querySelectorAll(
            `#${this._containerId} .date`);
        for (let date of dateElements) {
            this._dates.removeChild(date);
        }
    }

    _createDate(dateNumber) {
        let container = document.createElement('div');
        container.classList.add('date');

        let span = document.createElement('p');
        span.textContent = dateNumber;

        container.append(span);
        this._dates.append(container);
    }

    _displayDates() {
        let year = this._date.getFullYear();
        let month = this._date.getMonth();

        let firstDateObject = new Date(year, month, 1);
        let firstDay = firstDateObject.getDay();

        let lastDateObject = new Date(year, month + 1, 0);
        let lastDate = lastDateObject.getDate();

        for (let i = 0; i < firstDay; i += 1) {
            this._createDate();
            // empty elements
        }

        for (let i = 1; i <= lastDate; i += 1) {
            this._createDate(i);
        }
    }
}

let calender = new Calender('calender');
