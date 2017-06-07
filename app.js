var express = require('express')
var app = express()
var fs = require('fs')
var formidable = require('formidable')

app.use(express.static('public'))

//提交页
app.get('/',function(req,res){
	if ( req.url != '/favicon.ico') {
		fs.readFile('./views/index.html',function(err,data){
			if ( err) throw err;
			res.write(data)
			res.end()
		})
	}
})

//提交完成结果页
app.post('/result',function(req,res){
	if ( req.url != '/favicon.ico') {
		var form = new formidable.IncomingForm()
		form.parse(req,function(err,fields,files){
			// fs.renameSync(files.myImage.path,'C:/Users/Admin/AppData/Local/Temp/'+files.myImage.name); //这个必须得指定才可以
			//更改路径名称
			var readStream=fs.createReadStream(files.myImage.path);
			var writeStream=fs.createWriteStream('./public/files/'+files.myImage.name);
			readStream.pipe(writeStream);
			readStream.on('end',function(){
			    fs.unlinkSync(files.myImage.path);
			});
			
			res.writeHead(200,{'Content-Type':'text/html;charset=utf8'})
			fs.readFile('./views/result.html',function(err,data){
				if ( err) throw err;
				res.write(data)
				res.end()
			})
		})
	}
})


app.listen(8082,'localhost')