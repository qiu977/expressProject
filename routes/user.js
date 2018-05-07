var express = require('express');
var router = express.Router();
var fs = require('fs');
var pathLib = require('path');

var {MongoClient,url}=require("../config/db")

router.post("/check",function(req,res){
//    console.log(req.body)
        MongoClient.connect(url,function(err,db){
            if(err){throw err}
            var dbo=db.db("myproject")
            var str={"name":req.body.username,"userpsw":req.body.userpsw}
            dbo.collection("user").find(str).toArray(function(err,result){
                if(err){throw err}
                console.log(result)
                if(result.length){
                    req.session.sign=true
                    req.session.name=result[0].name
                    req.session.uid=result[0]._id
                    res.redirect("/")
                }else{
                    res.status(500).send("用户名或者密码错误").end()
                }
               db.close();
            })
        })

})


router.post("/publish",function(req,res){
//    console.log(req.body)
//    图片上传成功之后连接数据库
//    console.log(req.files[0])
var newName=req.files[0].path+pathLib.parse(req.files[0].originalname).ext
var saveName=req.files[0].filename+pathLib.parse(req.files[0].originalname).ext;
fs.rename(req.files[0].path,newName,function(err,){
    if(err){
        res.send("上传图像失败")
    }else{
                MongoClient.connect(url,function(err,db){
                    if(err){throw err}
                    var dbo=db.db("myproject")
                    var obj={
                        title:req.body.title,
                        content:req.body.content,
                        img:saveName,
                        author:req.session.name,
                        timer:new Date().toLocaleDateString(),
                        yuedu:0,
                        zan:0,
                        cai:0
                         }
                    dbo.collection("blog").insertOne(obj,function(err,myres){
                        if(err){throw err}
                        res.redirect("/")
                        db.close()
                    })
                })
    }
})

})



router.get("/userpage/:id",function(req,res){
    res.send(`这是${req.params["id"]}的用户中心`)

})

router.get("/logout",function(req,res){
    req.session.destroy(function(err){
        if(err){
            res.json({ret_code:2,ret_message:"退出失败"})
        }
    })
    res.clearCookie("connect.sid")
    res.redirect("/")


})










module.exports = router;
