const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../config/notification_manager");

const notification_options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
  };

const sendNotification = (notification, token) => {
    return admin.messaging().sendToDevice(token, notification, notification_options);
}

module.exports = sendNotification;