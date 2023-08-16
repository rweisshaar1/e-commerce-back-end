const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  const tags = await Tag.findAll({
    include: [{
      model: Product,
      required: false }]
  }).catch((err) => {
    res.json(err); 
  });
  res.json(tags)
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const tag = await Tag.findByPk(id, {
    include: [{
      model: Product,
      required: false
     }]
  }).catch((err) => {
    res.json(err); 
  });
  res.json(tag);
});


router.post('/', async (req, res) => {
  const post = req.body;
  const newTag = await Tag.create(post).catch((err) => {
    res.json(err); 
  });
  res.json(newTag);
});

router.put('/:id', async (req, res) => {
  const update = req.body.tag_name ;
  const id = req.params.id ;
  const updateTag = await Tag.update(
    {tag_name: update},{
  where: {
    id: id
  }}
  ).catch((err) => {
    res.json(err); 
  });
  res.json(updateTag);
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  const id = req.params.id ;
  const deleteTag = Tag.destroy({
  where: {
    id: id
  }}
  ).catch((err) => {
    res.json(err); 
  });
  res.json(deleteTag);
});

module.exports = router;
