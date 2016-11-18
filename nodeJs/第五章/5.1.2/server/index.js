console.log(11)

var http=require("http");

var work=require("./lib/timetrack");
var mysql=require("mysql");

var db=mysql.createConnection({
    host:"10.13.34.23",
    user:"admin",
    password:"admin",
    database:"timetrack"
});
var server=http.createServer(function(request,response){
    switch (request.mothod){
        case "POST":
            switch (request.url){
                case "/":
                    work.add(db,request,response);
                    break;
                case "/archive":
                    work.archive(db,request,response);

                    break;
                case "/delete":
                    work.delete(db,request,response);
                    break
            }
            break;
        case "GET":
            switch (request.url){
                case "/":
                    work.shwo(db,request);
                    break;
                case"/archived":
                    work.shwoArchived(db,res);
                    break;
            }
            break
    }
});

db.query(
    "CREATE TABLE IF NOT EXISTS work ("
    + "id INT(10) NOT NULL AUTO_INCREMENT"
    + "hours DECIMAL(5,2) DEFAULT 0,"
    + "date DATE,"
    + "archived INT(1) DEFAULT 0"
    + "description LONGTEXT,"
    + "PRIMARY KEY(id)",
    function(err){
        //if(err) throw err;
        console.log("Server started...");
        server.listen(3000,"10.13.34.23")
    }

);
// 192.168.1.101
// 10.13.34.23