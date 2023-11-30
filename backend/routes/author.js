const express = require('express');

const router = express.Router();
const multer = require('multer');
const Author =  require('../models/author')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
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

router.post("/register",upload.any('image'),(req,res)=>{
  
    data = req.body;
    const author = new Author(data);

     author.image = filename;
     salt = bcrypt.genSaltSync(10);
     author.password = bcrypt.hashSync(data.password,salt);

    author.save().then((newauth)=>{
        filename=""
        res.send(newauth)
    }).catch((err)=>{
        console.log(err)
    })

})




router.post("/login",(req,res)=>{

    let data = req.body;

    Author.findOne({email : data.email}).then(
        (author)=>{
            let valid = bcrypt.compareSync(data.password,author.password);
            if(!valid){
                res.send('email or password invalid');
            }else{
                let payload = {
                    _id : author._id,
                    email:author.email,
                    fullname:author.name+ ' '+author.lastname
                }
                let token = jwt.sign(payload,"12345667");
                res.send({mytoken : token})
            }
        }
    ).catch((err)=>{
        console.log(err)
    })

})

router.get("/all",(req,res)=>{

    Author.find().then((author)=>{
        res.send(author)
    }).catch((err)=>{
        console.log(err)
    })
})

router.get("/getById/:id",(req,res)=>{

    const myid = req.params.id;
    Author.findOne({_id:myid}).then((auid)=>{
        res.send(auid)
    }).catch((err)=>{
        console.log(err)
    })
})

router.delete("/delete/:id",(req,res)=>{
    const myid = req.params.id;
    Author.findByIdAndDelete({_id:myid}).then((audel)=>{
        res.send(audel)
    }).catch((err)=>{
        console.log(err)
    })
    
})

router.put("/update=:id",(req,res)=>{

    
})




module.exports = router;