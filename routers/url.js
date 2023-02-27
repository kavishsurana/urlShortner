const express = require("express")
const validUrl = require("valid-url")
const shortId = require("shortid")
const config = require("config")
const Url = require("../models/url")

const router = require("express").Router()

router.get("/health" , (req,res) => {
    return res.status(200).json({message: "Application is healthy!"})
})

router.post("/shorten" , async(req,res) => {
    const {longUrl} = req.body
    const baseUrl = config.get("baseUrl")

    if(validUrl.isUri(longUrl)){
        try{
            let url = await Url.findOne({longUrl})
            if(url){
                console.log("Already exist...")
                return res.status(201).json({data:url})
            }else{
                let urlCode = shortId.generate()
                let shortUrl = baseUrl + "/" + urlCode

                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                })

                console.log("Saving new record....")
                await url.save()
                return res.status(201).json({data:url})
            }
        }catch(err){
            console.log(err)
            return res.status(500).json({message : "Some error has ocurred"})
        }
    }else{
        return res.status(400).json({message:"Invalid long url"})
    }
})


router.get("/:code" , async(req,res) => {
    try{
        const url = await Url.findOne({urlCode : req.params.code})

        if(url){
            console.log("Long url found for short url. Redirecting...")
            return res.redirect(url.longUrl)
        }else{
            return res.status(404).json({message : "No url Found"})
        }
    }catch(err){
        console.log(err)
        return res.status(500).json({message : "Some error has occurred"})
    }
})


module.exports = router