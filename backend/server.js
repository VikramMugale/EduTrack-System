const express=require("express");
const { faker } = require('@faker-js/faker');
const mysql=require("mysql2");
const bcrypt=require("bcryptjs");
const cors=require("cors");
const app=express();


app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'school',
    password:'password@123'
});

app.post("/register", async (req, res) => {
    let { name, email, address, classs, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
        let q = "INSERT INTO student (id, name, email, address, class, password) VALUES (?, ?, ?, ?, ?, ?)";
        let post = [
            faker.string.uuid(),
            name,
            email,
            address,
            classs,
            hashedPassword
        ];

        connection.query(q, post, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.status(200).json({ message: "Student registered successfully" });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/login", async (req, res) => {
    let { email, password } = req.body;
    let q = "SELECT * FROM student WHERE email = ?";
    
    try {
        connection.query(q, [email], async (err, result) => {
            if (err) throw err;
            
            if (result.length === 0) {
                return res.send({
                    message: "User not found"
                });
            }
            
            let user = result[0];
            
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.send({
                    message: "Password is incorrect"
                });
            }
            
            res.send({
                message:"login success",
                user:user
            });
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Internal Server Error"
        });
    }
});

app.get("/:id",(req,res)=>{
    let {id}=req.params;
    let q=`SELECT * FROM student WHERE id=?`;

    try{
       connection.query(q,[id],(err,result)=>{
        if(err)throw err;
        if (result.length === 0) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.send(result);
       })
    }
    catch(err){
        console.log(err);
        res.status(500).send({
            message: "Internal Server Error"
        });
    }
       
});


app.put("/:id/edit", (req, res) => {
    let { id } = req.params;
    let { name, address } = req.body;
    let q = `UPDATE student SET name = ?, address = ?  WHERE id = ?`;
    
    try {
        connection.query(q, [name, address, id], (err, result) => {
            if (err) throw err;

            if (result.affectedRows === 0) {
                return res.send({
                    message: "User not found"
                });
            }

            res.send({
                message: "Update success",
            });
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Internal Server Error"
        });
    }
});

app.get("/admin/students", (req, res) => {
    const q = 'SELECT student.id, student.name, student.class, student.address, student.email,marks.math, marks.science, marks.english, marks.history, marks.geography FROM student INNER JOIN marks ON student.id = marks.student_id;';
    
    connection.query(q, (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
            return res.status(500).send({
                message: "Internal Server Error",
                error: err.message
            });
        }
        res.send(result);
    });
});



app.get("/:id/marks", (req, res) => {
    const { id } = req.params; 
    const q = 'SELECT * FROM marks WHERE student_id = ?';

    connection.query(q, [id], (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
            return res.status(500).send({
                message: "Internal Server Error",
                error: err.message
            });
        }

        if (result.length === 0) {
            return res.status(404).send({
                message: "No marks found for the specified student ID"
            });
        }

        res.status(200).json(result);
    });
});

app.put("/admin/:id/edit", async (req, res) => {
    const { id } = req.params;
    const { math, english, science, history, geography } = req.body;
    const q = `UPDATE marks SET math = ?, english = ?, science = ?, history = ?, geography = ? WHERE student_id = ?`;

    try {
        connection.query(q, [math, english, science, history, geography, id], (err, result) => {
            if (err) throw err;
            res.status(200).json({ message: 'Marks updated successfully', result });
        });
    } catch (err) {
        console.error('Unexpected error:', err);
        res.status(500).json({ message: 'An unexpected error occurred', err: err.message });
    }
});



app.delete("/admin/:id/delete", (req, res) => {
    const { id } = req.params;
    const q = 'DELETE FROM student WHERE id = ?';

    connection.query(q, [id], (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
            return res.status(500).send({
                message: "Internal Server Error",
                error: err.message
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).send({
                message: "No student found with the specified ID"
            });
        }

        res.status(200).send({
            message: "Student record deleted successfully"
        });
    });
});








app.get("/",(req,res)=>{
    res.send("Welcome");
})

app.listen(8080,()=>{
    console.log("Server started");
})