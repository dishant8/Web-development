/// <reference path="page.service.server.js" />
module.exports = function (app, model) {


    app.post("/api/practice/mongo/page", addPage);
    app.post("/api/practice/mongo/page/:pageId/content/:contentType", addContent);
    app.get("/api/practice/mongo/page", getAllPages);
    app.get("/api/practice/mongo/page/:pageId", getPageById);

    function addPage(req, res) {
        var page = req.body;
        model.addPage(page)
            .then(function (pages) {
                res.json(pages);
            });

    }

    function getAllPages(req, res) {

        model.getAllPages().then(function (pages) {
            res.json(pages);
        })
    }

    function getPageById(req, res) {
        var id = req.params.pageId;
        model.getPageById(id).then(function (page) {
            res.json(page);
        });

    }

    function addContent(req, res) {
        var pageId = req.params.pageId;
        var contentType = req.params.contentType;
        console.log(pageId);
        console.log(contentType);
        model.addContent(pageId, contentType)
            .then(function (page) {
                res.json(page);
            });
    }
};

