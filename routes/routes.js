
const express = require('express');
const router = express.Router();
const { homeController, AnalyseController, Roadmap, AnalyseUsingAptitude, AnalyseUsingInterest, ChatBot } = require("../controllers/homeController");

router.get('/', homeController)
router.get('/analyse', AnalyseController)
router.get('/roadmap', Roadmap)
router.get('/analyse/aptitude', AnalyseUsingAptitude)
router.get('/analyse/interest', AnalyseUsingInterest)
router.get('/chatwithAI', ChatBot)

module.exports = router;
