var express = require('express');
var router = express.Router();
var {MongoClient,url}=require("../config/db")


router.get(["/:num","/"], function(req, res, next) {
//          总数
            var total;
//          每页多少条数据
             var pagesize=3;
//           当前页码
             var currentpage=(parseInt(req.params["num"])>=1)?parseInt(req.params["num"]):1;

        MongoClient.connect(url,function(err,db){
            if(err){throw err}
            var dbo=db.db("myproject")

			//查询数据库中一共有多少条数据
            dbo.collection("blog").find().toArray(function(err,result){
                total=result.length;
            })
//			真正实现分页
            dbo.collection("blog").find().skip((currentpage-1)*pagesize).limit(pagesize).toArray(function(err,result){
                if(err){throw err}

                 if(req.session.sign){
                     res.render('index',{
                     "data":result,
                     "pagecount":total,  //总数
                     "pagesize":pagesize,  //每页的条数
                     "currentpage":currentpage, //当前页
                     "name":req.session.name,
                     "uid":req.session.uid});
                }else{
                     res.render('index',{"data":result,
                      "pagecount":total,
                       "pagesize":pagesize,
                       "currentpage":currentpage,
                       "name":"",
                       "uid":""});
                }

               db.close();
            })
        })




});



module.exports = router;
