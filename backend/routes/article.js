const express = require('express');

const router = express.Router();

const Article = require('../models/article');
const multer = require('multer');
filename = ""
const mystorage = multer.diskStorage({
    destination:'./upload',
    filename:(req,file,redirect)=>{
        let date = Date.now();
        let fl = date+'.'+file.mimetype.split('/')[1];
        redirect(null,fl);
        filename = fl;
    }
})
 
const upload = multer({storage:mystorage})


router.post("/create",upload.any('image'),(req,res)=>{


   let data = req.body;
   let article = new Article(data);
   article.date = new Date();
   article.image = filename;
   article.tags = data.tags.split(',');
   article.save().then(
    (saved)=>{
        filename="";
        res.status(200).send(saved);
    }
   ).catch(
    err=>{
        console.log(err)
    }
   )

})

router.get("/all",(req,res)=>{

    Article.find().then((newar)=>{
        res.send(newar)
    }).catch((err)=>{
        console.log(err)
    })
   
})


router.get("/getById/:id",(req,res)=>{

    const myid = req.params.id;
    Article.findOne({_id:myid}).then((arid)=>{
        res.send(arid)
    }).catch((err)=>{
        console.log(err)
    })
    
})

router.get("/getByIdAuthor/:id",(req,res)=>{
    const myid = req.params.id;
    Article.find({idAuthor:myid}).then((ardel)=>{
        res.send(ardel)
    }).catch((err)=>{
        console.log(err)
    })
})

router.delete("/delete/:id",(req,res)=>{
    const myid = req.params.id;
    Article.findByIdAndDelete({_id:myid}).then((ardel)=>{
        res.send(ardel)
    }).catch((err)=>{
        console.log(err)
    })

    
})

router.put("/update/:id",(req,res)=>{
    
})















module.exports = router ;