//node require
const axios = require('axios')
const bcryptjs = require('bcryptjs')
const cors = require('cors')
const dotenv = require('dotenv')
const express = require('express')
const google_auth_library = require('google-auth-library')
const jsonwebtoken = require('jsonwebtoken')
const mongoose = require('mongoose')
const mongoose_unique_validator = require('mongoose-unique-validator')

if (process.env.NODE_ENV === "dev") dotenv.config()

module.exports = {
    axios,
    bcryptjs,
    cors,
    dotenv,
    express,
    google_auth_library,
    jsonwebtoken,
    mongoose,
    mongoose_unique_validator
}