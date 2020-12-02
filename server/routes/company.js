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
    .exec((err, companyInfo) => {
      if (err) return res.status(400).json({ success: false, err })
      return res.status(200).json({ success: true, companyInfo })
    })

})

router.get('/companies_by_id', (req, res) => {

  let type = req.query.type
  let companyId = req.query.id

  // companyId를 이용해 companyId와 같은 정보를 가져온다.

  Company.find({ _id: companyId })
    .populate('writer')
    .exec((err, company) => {
      if (err) return res.status(400).send(err)
      return res.status(200).send({ success: true, company })
    })



})




module.exports = router;
