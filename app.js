var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');

var app = express();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:false}));

var con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"node_js"
})
con.connect();
app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html')
})
app.post('/res',function(req,res){
    var rno = req.body.rno;
    var name =  req.body.name;
    var s1 = req.body.s1;
    var s2 = req.body.s2;
    var s3 = req.body.s3;
    var s4 = req.body.s4;
    var s5 = req.body.s5;
    var iq = "insert into stud(rno,name,s1,s2,s3,s4,s5) values('"+rno+"','"+name+"','"+s1+"','"+s2+"','"+s3+"','"+s4+"','"+s5+"')";
    
    con.query(iq,function(error,result,field){
        if(error)throw error;
        var total_query = "UPDATE stud SET total = s1+s2+s3+s4+s5";
        con.query(total_query,function(e1,r1,f1){
            if(e1)throw e1;
        })
        res.redirect('/res');

    });
});

app.get('/res',function(req,res){
     var sq = "select * from stud";
     con.query(sq,function(error,result,field){
        if(error)throw error;
        res.render('index',{result});
     })
})
app.get('/delete/:rno',function(req,res){
    var rno = req.params.rno;
    var dq = "delete from stud where rno="+rno;
    con.query(dq,function(error,result,field){
        if(error)throw error;
        res.redirect('/res');
    });
});
app.get('/update/:rno',function(req,res){
    var rno = req.params.rno;
    var sq = "select * from stud where rno = "+rno;
    con.query(sq,function(error,result,field){
        if(error)throw error;
        res.render('form',{result});
    })
});
app.post('/up',function(req,res){
    var rno = req.body.rno;
    var name =  req.body.name;
    var s1 = req.body.s1;
    var s2 = req.body.s2;
    var s3 = req.body.s3;
    var s4 = req.body.s4;
    var s5 = req.body.s5;
    var uq = "update stud set name='"+name+"',s1='"+s1+"',s2='"+s2+"',s3='"+s3+"',s4='"+s4+"',s5='"+s5+"' where rno='"+rno+"' ";
    con.query(uq,function(error,result,field){
        if(error)throw error;
        var total_query = "UPDATE stud SET total = s1+s2+s3+s4+s5";
        con.query(total_query,function(e1,r1,f1){
            if(e1)throw e1;
        })
        res.redirect('/res');
    })

});
app.get('/ten',function(req,res){
    var sq = "select * from stud order by total desc limit 10";
    con.query(sq,function(error,result,field){
        if(error) throw error;
        res.render('index',{result});
    })
})
app.get('/five',function(req,res){
    var sq = "select * from stud order by total desc limit 5";
    con.query(sq,function(error,result,field){
        if(error) throw error;
        res.render('index',{result});
    })
})

app.listen(3000);