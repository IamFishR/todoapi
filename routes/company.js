var express = require('express');
var router = express.Router();
const { authMiddleware } = require('../config/authMiddleware');
const Companies = require('../controllers/stock/companyController');

const companies = new Companies();

router.post('/add', authMiddleware, (req, res) => companies.addCompany(req, res));
router.get('/list', authMiddleware, (req, res) => companies.getCompanies(req, res));
router.post('/remove', authMiddleware, (req, res) => companies.removeCompany(req, res));
router.post('/update', authMiddleware, (req, res) => companies.updateCompany(req, res));
router.get('/:name', authMiddleware, (req, res) => companies.findCompany(req, res));
router.post('/get', authMiddleware, (req, res) => companies.getCompany(req, res));

module.exports = router;