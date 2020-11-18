const express = require('express');
const router = express.Router();
const { Company } = require('../models/Company');
//=================================
//             Company
//=================================


router.post('/', (req, res) => {

  // 받아온 정보들을 DB에 넣어준다.
  const company = new Company(req.body)

  company.save((err) => {
    if (err) return res.status(400).json({ success: false, err })
    return res.status(200).json({ success: true })
  })

})

router.post('/companies', (req, res) => {

  // companies collection에 들어있는 모든 정보를 가져오기
  
  Company.find()
    .populate("writer")
    .exec((err, companyInfo) =>{
      if (err) return res.status(400).json({ success: false, err })    
      return res.status(200).json({ success: true, companyInfo})
    })

})






module.exports = router;
