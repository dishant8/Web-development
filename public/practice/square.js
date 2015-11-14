module.exports = function (width, height, name) {
    this.name = name;
    this.width = width;
    this.height = height;

    var api = {
        getName: getName,
        getWidth: getWidth,
        setWidth: setWidth
    };

    return api;

    function getName() {
        return this.name;
    }

    function setWidth(width) {
        this.width = width;
    }

    function getWidth() {
        return this.width;
    }
}