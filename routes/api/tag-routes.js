const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagsData = await Tag.findAll({
      include:[{ model: Product }]
    });
    res.status(200).json(tagsData);
  } 
  catch (err) {res.status(500).json(err)};
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{model: Product}]
    });
    if (!tagData) {
      res.status(404).json({ message: 'Invalid id!' })
      return;
    }
    res.status(200).json(tagData);
  }
  catch (err) {res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try{
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } 
  catch (err) {res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag by its `id` 
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      }
    });
    res.status(200).json(tagData);
  } 
  catch (err) {res.status(400).json(err);
  }
  // if (!tagData[0]) {
  //   res.status(404).json({ message: 'invalid id!' });
  //   return;
  // }
});

router.delete('/:id', async (req, res) => {
  // delete o tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(tagData)
  }
    catch (err) {res.status(500).json(err);
    if (!tagData) {
      res.status(404).json({ message: 'invalid id!' });
      return;
    }
  }
});

module.exports = router;
