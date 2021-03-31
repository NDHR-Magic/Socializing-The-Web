module.exports = {
    section: function (name, options) {
        if (!this._sections) this._sections = {};
        this._sections[name] = options.fn(this);
        return null;
    },
    format_time: (date) => {
        return date.toLocaleTimeString();
    },
    format_date: (date) => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
    },
}