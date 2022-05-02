const express = require("express")

const router = express.Router()

const controller = require("../controllers/file")

router.post("/upload", controller.upload)

router.get("/files", controller.getListFiles)

router.get("/files/:name", controller.download)


module.exports = router