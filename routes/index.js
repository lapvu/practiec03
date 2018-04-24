var express = require('express');
var router = express.Router();
var Topic = require('../models/Topic');
/* GET home page. */
router.get('/', function (req, res, next) {
  //get data 
  Topic.find().exec((err, data) => {
    if (err) console.log(err);
    res.render('index', {
      data: data
    });
  })
});

//delete route
router.post('/delete/:id', (req, res) => {
  Topic.remove({ _id: req.params.id }).exec((err) => {
    if (err) res.status(404);
    res.send('ok')
  })
})

//edit route
router.get('/edit/:id', (req, res) => {
  Topic.findById(req.params.id).exec((err, data) => {
    if (err) console.log(err);
    if (!data) {
      // if data null 
      res.status(404);
    } else {
      res.send(data)
    }
  })
})

router.post('/add', (req, res) => {
  Topic.findOne({ _id: req.body.id }).exec((err, data) => {
    if (!data) {
      //save to batabase
      const topic = new Topic({
        user_say: req.body.ask,
        answer: req.body['answer[]']
      })
      topic.save((err) => {
        if (err) res.send('errors')
      })
      res.send('ok')
    } else {
      Topic.findByIdAndUpdate(data.id, { $set: { user_say: req.body.ask, answer: req.body['answer[]'] } }).exec((err) => {
        if (err) return handleError(err);
        res.send('ok')
      })
    }
  })
})

module.exports = router;
