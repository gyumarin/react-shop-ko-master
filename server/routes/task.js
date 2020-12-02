const express = require('express');
const router = express.Router();
const { Task } = require('../models/Task');
//=================================
//             Task
//=================================


router.post('/', (req, res) => {

  // 받아온 정보들을 DB에 넣어준다.
  const task = new Task(req.body)

  task.save((err) => {
    if (err) return res.status(400).json({ success: false, err })
    return res.status(200).json({ success: true })
  })

})

router.post('/tasks', (req, res) => {

  // companies collection에 들어있는 모든 정보를 가져오기
  
  Task.find()
    .populate("writer")
    .exec((err, taskInfo) =>{
      if (err) return res.status(400).json({ success: false, err })    
      return res.status(200).json({ success: true, taskInfo})
    })

})

router.get('/tasks_id', (req, res) => {
  
  let type = req.query.type
  let taskId = req.query.id

  // companyId를 이용해 companyId와 같은 정보를 가져온다.

  Task.find({ _id: taskId})
    .populate('writer')
    .exec((err, task) =>{
      if(err) return res.status(400).send(err)
      return res.status(200).send({success: true, task})
    })

 

})





module.exports = router;
