var express = require('express');
var router = express.Router();
var models = require("../models")
var Op = models.Sequelize.Op

//POST: Create a TodoList
router.post('/lists', async function(req, res, next) {
    var list = await models.List.create(req.body);
    res.json({list: list});
})

//GET: Get all of the TodoLists
router.get('/lists', async function(req, res, next) {
    var list = await models.List.findAll();
    res.json({list: list});
});

//GET: Get all of the Items
router.get('/items', async function(req, res, next) {
    var item = await models.Item.findAll();
    res.json({item: item});
});

//POST: Create a TodoItem for a specific list
router.post('/items', async function(req, res, next) {
    var item = await models.Item.create(req.body);
    res.json({item: item});
})

//GET: Get all the TodoItem’s in the TodoList
router.get('/list/:id', async function(req, res, next) {
    var list = await models.List.findOne({
        where: {id: req.params.id},
        include: [models.Item]
    });
    res.json({list: list});
});

//PUT: Update a TodoItem and mark it as done
router.put('/item/:id', async function(req, res, next) {
    var list = await models.Item.findByPk(req.params.id);
    list.update(req.body);
    res.json({list: list});
});

//DELETE: Delete a TodoListItem
router.delete('/item/delete/:id', async function(req, res, next) {
    var item = await models.Item.findByPk(req.params.id);
    item.destroy();
    res.json({msg: "Delete success"});
});

//DELETE: Delete a TodoList
router.delete('/list/delete/:id', async function(req, res, next) {
    var list = await models.List.findByPk(req.params.id);
    list.destroy();
    res.json({msg: "Delete success"});
});

//PUT: change the content of list
router.put('/list/:id', async function(req, res, next) {
  var list = await models.List.findByPk(req.params.id);
  list.update(req.body);
  res.json({list: list});
});

module.exports = router;

//GET: Search by title
router.get('/list', async function(req, res, next) {
    var where = {};
    var title = req.query.title;
    if(title) {
        where.title = {
            [Op.like]: '%' + title + '%'
        }
    }
    var list = await models.List.findAll({
        where: where
    });
    res.json({todoList: list});
});