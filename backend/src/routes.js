const express = require("express");

const multer = require('multer');
const uploadConfig = require('./config/upload');

const SpotController = require('./controllers/SpotController');
const SessionController = require('./controllers/SessionController');

const BookingController = require('./controllers/BookingController');
const DashboardController = require('./controllers/DashboardController');

const routes = express.Router();
const upload = multer(uploadConfig);

routes.get('/spots', SpotController.index);
routes.post('/spots', upload.single('thumbnail'), SpotController.store);
routes.post('/sessions', SessionController.store);
routes.get('/dashboard', DashboardController.show);
routes.post('/spots/:spot_id/bookings', BookingController.store);

module.exports = routes;