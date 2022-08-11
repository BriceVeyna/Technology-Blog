const router = require('express').Router();
const { Post, Comment } = require('../../models');

// Get all posts
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll();
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get post by id
router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [{ model: Comment }],
        });

        if (!postData) {
            res.status(404).json({ message: 'No post found with that id' });
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Create a new post
router.post('/', async (req, res) => {
    try {
        const postData = await Post.create(req.body);
        res.status(200).json(postData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Edit post by id
router.put("/:id", async (req, res) => {
    try {
      const postData = await Post.update(req.body, {
        where: { id: req.params.id },
      });
      if (!postData) {
        res.status(400).json({ message: "No post found with this id." });
        return;
      }
      res.status(200).json(postData);
    } catch (err) {
      res.status(500).json(err);
    }
});

// Delete post by id
router.delete("/:id", async (req, res) => {
    try {
      const postData = await Post.destroy(req.body, {
        where: { id: req.params.id },
      });
      if (!postData) {
        res.status(400).json({ message: "No post found with this id." });
        return;
      }
      res.status(200).json(postData);
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;