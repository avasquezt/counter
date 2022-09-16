const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home')

router.get('/', homeController.getIndex)
router.post('/add', homeController.addCounter)
router.put('/decreaseCount', homeController.decreaseCounter)
router.delete('/resetCount', homeController.resetCounter)

module.exports = router