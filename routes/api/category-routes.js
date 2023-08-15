const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  const categories = await Category.findAll({
    include: [{
      model: Product,
      required: false
     }]
  }).catch((err) => {
    res.json(err); 
  });
  res.json(categories)
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const categories = await Category.findByPk(id, {
    include: [{
      model: Product,
      required: true
     }]
  }).catch((err) => {
    res.json(err); 
  });
  res.json(categories)
});

router.post('/', async (req, res) => {
  // create a new category
  const post = req.body;
  const newCat = await Category.create(post).catch((err) => {
    res.json(err); 
  });
  res.json(newCat);
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const update = req.body.category_name;
  const id = req.params.id ;
  const updateCat = Category.update(
    {category_name: update},{
  where: {
    id: id
  }}
  ).catch((err) => {
    res.json(err); 
  });
  res.json(updateCat);
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  const id = req.params.id ;
  const updateCat = Category.destroy({
  where: {
    id: id
  }}
  ).catch((err) => {
    res.json(err); 
  });
  res.json(updateCat);
});

module.exports = router;
