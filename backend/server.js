const express=require('express');
const bodyParser=require('body-parser');
const path = require('path');
const cors=require('cors');
const mysql=require('mysql2');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();
const port = 3001;

const dbConfig = {
    host:'localhost',
    user: 'root',
    password: 'muruku',
    database: 'gama_db'
};


app.use(
  cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST","PUT","DELETE"],
  credentials: true,
  })
 );

//  app.use(express.static(path.join(__dirname, 'build')));
//  app.get('/', function (req, res) {
//    res.sendFile(path.join(__dirname, 'build', 'index.html'));
//  });

// Create a MySQL pool to handle database connections
const pool = mysql.createPool(dbConfig).promise();

// Middleware to parse incoming JSON data
app.use(express.json());
//app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));

// Define routes for handling API requests

// Data for Dashboard
app.get('/api/dashboard', async(req, res)=>{
  try{
    
    const [rows_1]=await pool.query('SELECT (SELECT count(*)  FROM gama_db.users)AS tot_users, ( SELECT count(*) FROM gama_db.quotations) AS tot_quotes ;');
    const [rows_2]=await pool.query('SELECT u.first_name AS first_name,u.last_name AS last_name, COUNT(yt.created_by) AS created_count FROM gama_db.quotations yt JOIN users u ON yt.created_by = u.user_id GROUP BY u.first_name,u.last_name, yt.created_by;');
    
    let resData=[{...rows_1[0],data:rows_2}];

    res.json(resData);
  }catch (err){
    console.error('Error while fetching data:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all customer details
app.get('/api/customers', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM customer_details ORDER BY customer_id DESC');
    res.json(rows);
  } catch (err) {
    console.error('Error while fetching customers:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new customer
app.post('/api/customers', async (req, res) => {
    // console.log(req.body);
  const { customer_name, trip_type, aircraft_id } = req.body;
  if (!customer_name || !trip_type || !aircraft_id) {
    return res.status(400).json({ error: 'Incomplete data' });
  }

  try {
    const [result] = await pool.query('INSERT INTO customer_details (customer_name, trip_type, aircraft_id) VALUES (?, ?, ?)', [customer_name, trip_type, aircraft_id]);
    const newCustomerId = result.insertId;
    res.json({ customer_id: newCustomerId });
  } catch (err) {
    console.error('Error while creating a new customer:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Define routes for handling API requests

// Get all aircraft
app.get('/api/aircrafts', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT * FROM aircrafts');
      res.json(rows);
    } catch (err) {
      console.error('Error while fetching aircraft:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Get all trip details
  app.get('/api/trip_details', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT * FROM trip_details');
      res.json(rows);
    } catch (err) {
      console.error('Error while fetching trip details:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
    
  
  // Create a new trip detail
  app.post('/api/trip_details', async (req, res) => {
    // console.log(req.body);
    const {
      customer_id,
      departure_location_id,
      arrival_location_id,
      pax,
      date_time,
      duration_minutes,
      price,
    } = req.body;

    let pax_checked=pax;
    if(pax==="" || pax===null){
      pax_checked=" "; 
    }
  
    if (!customer_id || !departure_location_id || !arrival_location_id || !pax_checked || !date_time || !duration_minutes || !price) {
      return res.status(400).json({ error: 'Incomplete data' });
    }
  
    try {
      const [result] = await pool.query('INSERT INTO trip_details (customer_id, departure_location_id, arrival_location_id, pax, date_time, duration_minutes, price) VALUES (?, ?, ?, ?, ?, ?, ?)', [customer_id, departure_location_id, arrival_location_id, pax_checked, date_time, duration_minutes, price]);
      const newTripId = result.insertId;
      res.json({ trip_id: newTripId });
    } catch (err) {
      console.error('Error while creating a new trip detail:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // Define routes for handling API requests

// Get all locations
app.get('/api/locations', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT * FROM locations');
      res.json(rows);
    } catch (err) {
      console.error('Error while fetching locations:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Get all charge boxes
  app.get('/api/charge_boxes', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT * FROM charge_boxes');
      res.json(rows);
    } catch (err) {
      console.error('Error while fetching charge boxes:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Create a new charge box
  app.post('/api/charge_boxes', async (req, res) => {
    // console.log(req.body);
    const {customer_id, chargeBoxes}=req.body;
    // console.log(chargeBoxes);

    if(!customer_id || !chargeBoxes){
      return res.status(400).json({ error: 'Incomplete data' });
    }

    try{
      // chargeBoxes.map(async (chargeBox, index)=>{
      //   await pool.query('INSERT INTO charge_boxes (title, value, customer_id) VALUES (?, ?, ?)', [chargeBoxes[index].title, chargeBoxes[index].value, customer_id]);
      // });

      for(let index=0;index<chargeBoxes.length;index++){
        await pool.query('INSERT INTO charge_boxes (title, value, customer_id) VALUES (?, ?, ?)', [chargeBoxes[index].title, chargeBoxes[index].value, customer_id]);
      }
      
    return res.status(200).json({message:"success"});
    } catch (err) {
      console.error('Error while creating a new charge box:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    // const { title, value, customer_id } = req.body;
    // if (!title || value===null) {   // changed the code here..
    //   return res.status(400).json({ error: 'Incomplete data' });
    // }
  
    // try {
    //   const [result] = await pool.query('INSERT INTO charge_boxes (title, value, customer_id) VALUES (?, ?, ?)', [title, value, customer_id]);
    //   const newChargeBoxId = result.insertId;
    //   res.json({ id: newChargeBoxId });
    // } catch (err) {
    //   console.error('Error while creating a new charge box:', err);
    //   res.status(500).json({ error: 'Internal Server Error' });
    // }
  });
  
 // Get all categories
 app.get('/api/categories', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM category');
    res.json(rows);
  } catch (err) {
    console.error('Error while fetching categories:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new category
app.post('/api/categories', async (req, res) => {
  // console.log(req.body);
  const {
    category_type,
    category_value,
    discount,
    duration,
    amount_1,
    amount_2,
    amount_3,
    amount_4,
    subTotal_1,
    subTotal_2,
    subTotal_3,
    subTotal_4,
    st_after_discount_1,
    st_after_discount_2,
    st_after_discount_3,
    st_after_discount_4,
    gst_1,
    gst_2,
    gst_3,
    gst_4,
    grandTotal_1,
    grandTotal_2,
    grandTotal_3,
    grandTotal_4,
    customer_id,
  } = req.body;

  if (duration===null ||category_type===null ||category_value===null || discount===null || amount_1===null || amount_2===null || amount_3===null || amount_4===null || subTotal_1===null || subTotal_2===null || subTotal_3===null || subTotal_4===null|| st_after_discount_1===null || st_after_discount_2===null || st_after_discount_3===null || st_after_discount_4===null || gst_1===null || gst_2===null || gst_3===null || gst_4===null || grandTotal_1===null || grandTotal_2===null || grandTotal_3===null || grandTotal_4===null || customer_id===null) {
    return res.status(400).json({ error: 'Incomplete data' });
  }

  try {
    const [result] = await pool.query('INSERT INTO category (category_type, category_value, discount, duration, amount_1, amount_2, amount_3, amount_4, subTotal_1, subTotal_2, subTotal_3, subTotal_4, st_after_discount_1, st_after_discount_2, st_after_discount_3, st_after_discount_4, gst_1, gst_2, gst_3,gst_4, grandTotal_1, grandTotal_2, grandTotal_3,grandTotal_4, customer_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [category_type, category_value, discount, duration, amount_1, amount_2, amount_3,amount_4, subTotal_1, subTotal_2, subTotal_3, subTotal_4, st_after_discount_1, st_after_discount_2, st_after_discount_3, st_after_discount_4, gst_1, gst_2, gst_3,gst_4, grandTotal_1, grandTotal_2, grandTotal_3,grandTotal_4, customer_id]);
    const newCategoryId = result.insertId;
    res.json({ id: newCategoryId });
  } catch (err) {
    console.error('Error while creating a new category:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new quotation
app.post('/api/quotations', async (req, res) => {

  // console.log(req.body);

  const { category_id, assigned_to, created_by, modified_by } = req.body;
  if (!category_id || !assigned_to || !created_by ||!modified_by) {
    return res.status(400).json({ error: 'Incomplete data' });
  }

  try {

    // const [id]=await pool.query('SELECT MAX(id) as id From quotations;');
    // console.log(id[0].id);
    // let num=0;
    // num=1+id[0].id;
    // const newQNO=quotation_no + num.toString().padStart(4,'0'); 

    const [result] = await pool.query(
      'INSERT INTO gama_db.quotations (category_id, assigned_to, created_by, modified_by ) VALUES (?, ?, ?, ?)',
      [category_id, assigned_to, created_by, modified_by]
    );
    const newQuotationId = result.insertId;
    res.json({ quotation_id: newQuotationId });
  } catch (err) {
    console.error('Error while creating a new quotation:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/quotations', async (req, res) => {

  try {
    const query = `
      SELECT ROW_NUMBER() OVER(ORDER BY quotations.id DESC) AS row_num,quotations.id,customer_details.customer_id, quotations.quotation_no, customer_details.customer_name, aircrafts.label, quotations.created_at, quotations.modified_at, created_user.email AS created_by
      FROM quotations
      INNER JOIN category ON quotations.category_id = category.id
      INNER JOIN customer_details ON category.customer_id = customer_details.customer_id
      INNER JOIN aircrafts ON customer_details.aircraft_id = aircrafts.id
      INNER JOIN users as created_user ON quotations.created_by=created_user.user_id;
    `;

    const [rows] = await pool.query(query);
    res.json(rows);
  } catch (err) {
    console.error('Error while fetching quotations with details:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/quotations/:customer_id', async (req, res) => {

  const customerId = req.params.customer_id;

  try {
    const query = `
      SELECT quotations.id,category.category_type,category.category_value, category.discount, customer_details.customer_id, customer_details.trip_type, quotations.quotation_no, customer_details.customer_name, aircrafts.id as aircraft_id, aircrafts.label, aircrafts.value, users.user_id, users.email, quotations.created_at, quotations.modified_at
      FROM quotations
      INNER JOIN category ON quotations.category_id = category.id
      INNER JOIN customer_details ON category.customer_id = customer_details.customer_id
      INNER JOIN aircrafts ON customer_details.aircraft_id = aircrafts.id
      INNER JOIN users ON quotations.assigned_to=users.user_id
      WHERE category.customer_id=?;
    `;

    const [rows] = await pool.query(query,[customerId]);
    res.json(rows);
  } catch (err) {
    console.error('Error while fetching quotations with details:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/api/quotations/:quotation_id', async(req,res)=>{
  
  // console.log(req.body);
  const quotation_id=req.params.quotation_id;
  // console.log(quotation_id);
  const {quotation_no, assigned_to, modified_by}=req.body;

  if (!quotation_no || !assigned_to || !modified_by) {
    return res.status(400).json({ error: 'Incomplete data' });
  }

  try{

    const query='UPDATE gama_db.quotations SET assigned_to = ?, modified_by = ? WHERE (id = ?) and ( quotation_no = ?);';

    const [rows] = await pool.query(query,[assigned_to,modified_by,quotation_id,quotation_no]);
    res.json({message:"Updated successfully..!"});
  } catch (err) {
    console.error('Error while fetching quotations with details:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/customer-pricing/:customer_id', async (req, res) => {
  const customerId = req.params.customer_id;

  try {
    const query = `
      SELECT *
      FROM category
      WHERE customer_id = ?;
    `;

    const [rows] = await pool.query(query, [customerId]);
    res.json(rows);
  } catch (err) {
    console.error('Error while fetching customer pricing data:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/charges/:customer_id', async (req, res) => {
  const customerId = req.params.customer_id;

  try {
    const query = `
      SELECT *
      FROM charge_boxes
      WHERE customer_id = ? ORDER BY id;
    `;

    const [rows] = await pool.query(query, [customerId]);
    res.json(rows);
  } catch (err) {
    console.error('Error while fetching charges:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//Get trip_details by customerID
app.get('/api/trip_details/:customerID', async (req, res) => {
  const customerID = req.params.customerID;

  try {
    const query = `
      SELECT trip_details.trip_id,
             departure.location_id as departure_location_id,
             departure.label as departure_label,
             departure.name as departure_name,
             arrival.location_id as arrival_location_id,
             arrival.label as arrival_label,
             arrival.name as arrival_name,
             trip_details.pax,
             trip_details.date_time,
             trip_details.duration_minutes,
             trip_details.price
      FROM trip_details
      JOIN locations departure ON departure.location_id = trip_details.departure_location_id
      JOIN locations arrival ON arrival.location_id = trip_details.arrival_location_id
      WHERE trip_details.customer_id = ? ORDER BY trip_details.date_time;
    `;

    const [rows] = await pool.query(query, [customerID]);
    res.json(rows);
  } catch (err) {
    console.error('Error while fetching trip details:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Getting all users data 
app.get('/api/users', async (req, res) => {  
  
  try {
      const [rows] = await pool.query('SELECT user_id, email as label FROM users ORDER BY id DESC');
      res.json(rows);
    } catch (err) {
      console.error('Error while fetching users:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// Getting particular user data
app.get('/api/user/:user_id', async (req, res) => {  

  const user_id=req.params.user_id;

  try {
      const [rows] = await pool.query('SELECT id,user_id,first_name,last_name,email FROM users WHERE user_id=?',[user_id]);
      res.json(rows);
    } catch (err) {
      console.error('Error while fetching users:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.post('/register', async (req, res) => {
  const firstName = req.body.first_name;
  const lastName = req.body.last_name;
  const email = req.body.email;
  const phone = req.body.phone;
  const userName = req.body.user_name;
  const password = req.body.password;
  const hashPassword = bcrypt.hashSync(password, saltRounds);

  try{
    const [rows] = await pool.execute("SELECT * FROM users WHERE email = ?",[email]);

    if (rows.length > 0){
      res.status(409).json({error:"Email exits already"});
    }
    else{
      // console.log(req.body);
     await pool.execute(
        "INSERT INTO users (first_name, last_name, email, phone, user_name, password) VALUES (?, ?, ?, ?, ?, ?)",
        [firstName, lastName, email, phone, userName, hashPassword],
        async (err, result) => {
            if (err) {
                console.log('Error while registering:', err);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
  
            // console.log("userRegistered successfully");
            res.json({ message: 'User registered successfully' });
        }
     );
     res.json({ message: 'User registered successfully' });
    }
  }catch (error) {
    console.error("Error during register:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }

});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await pool.execute(
      "SELECT user_id, first_name, last_name, user_name, password FROM users WHERE email = ?;",
      [email]
    );

    const user = rows[0];
    // console.log(user);
    const userId = user.user_id;
    const hashPassword=user.password;

    if (rows.length > 0 && bcrypt.compareSync(password, hashPassword)) {

      const [result]=await pool.execute(
        "INSERT INTO login_history (user_id, firstname, lastname, email, username, status) VALUES (?, ?, ?, ?, ?,'Logged-In')",
        [userId, user.first_name, user.last_name, email, user.user_name]
      );
      // console.log(result.insertId);
      res.json({ session_id:result.insertId, logged_user_id:userId, message: "Login successful"});
    } else {
      res.status(401).json({ message: "Incorrect email or password." });
    }
  } catch (error) {
    console.error("Error during login:", error);
    // res.status(500).json({ error: "Internal Server Error" });
    res.status(401).json({ message: "Incorrect email or password." });
  }
});

// Endpoint for user logout
app.post("/logout", async (req, res) => {
  const sessionId = req.body.sessionId;
  // console.log(sessionId);
try {

  await pool.execute("UPDATE `gama_db`.`login_history` SET `status` = 'Logged-Out' WHERE (`id` = ?);",[sessionId]);

  res.json({ message: "Logout successfully" });
} catch (error) {
  console.error("Error during logout:", error);
  res.status(500).json({ error: "Internal Server Error" });
}
});

// app.post('/register', (req, res) => {
//   const username = req.body.username;
//   const password = req.body.password;

//   pool.execute(
//       "INSERT INTO loginsystem (username, password) VALUES (?, ?)",
//       [username, password],
//       (err, result) => {
//           if (err) {
//               console.error('Error while registering:', err);
//               res.status(500).json({ error: 'Internal Server Error' });
//               return;
//           }
//           res.json({ message: 'User registered successfully' });
//       }
//   );
// });

// app.post('/login', async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const [rows] = await pool.query('SELECT * FROM loginsystem WHERE username = ? AND password = ?', [username, password]);
//     if (rows.length > 0) {
//       res.json({ message: 'Login successful' });
//     } else {
//       res.status(401).json({ message: 'Wrong username/password combination' });
//     }
//   } catch (error) {
//     console.error('Error during login:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });


/*********** For Updating the gama db ****************************/
app.put('/api/customers/:customer_id', async (req, res) => {

  const customerId = req.params.customer_id;
  const { customer_name, trip_type, aircraft_id } = req.body;

  if (!customer_name || !trip_type || !aircraft_id) {
      return res.status(400).json({ error: 'Incomplete data' });
  }

  try {
      const updateQuery = `UPDATE customer_details SET customer_name = ?, trip_type = ?, aircraft_id = ? WHERE customer_id = ?`;
      const updateValues = [customer_name, trip_type, aircraft_id, customerId];

      await pool.query(updateQuery, updateValues);
      res.json({ message: 'Customer details updated successfully' });
  } catch (err) {
      console.error('Error while updating customer details:', err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/api/categories/:customer_id', async (req, res) => {
  // console.log(req.body);
  const customerId = req.params.customer_id;
  const {
    category_type,
    category_value,
    duration,
    discount,
    amount_1,
    amount_2,
    amount_3,
    amount_4,
    subTotal_1,
    subTotal_2,
    subTotal_3,
    subTotal_4,
    st_after_discount_1,
    st_after_discount_2,
    st_after_discount_3,
    st_after_discount_4,
    gst_1,
    gst_2,
    gst_3,
    gst_4,
    grandTotal_1,
    grandTotal_2,
    grandTotal_3,
    grandTotal_4,
  } = req.body;


  if (category_type===null ||category_value===null|| discount===null ||duration===null || amount_1===null || amount_2===null || amount_3===null || amount_4===null || subTotal_1===null || subTotal_2===null || subTotal_3===null || subTotal_4===null || st_after_discount_1===null || st_after_discount_2===null || st_after_discount_3===null || st_after_discount_4===null || gst_1===null || gst_2===null || gst_3===null || gst_4===null || grandTotal_1===null || grandTotal_2===null || grandTotal_3===null || grandTotal_4===null) {
      return res.status(400).json({ error: 'Incomplete data' });
  }


  try {
      const updateQuery = `UPDATE gama_db.category SET category_type = ?, category_value = ?, discount=?, duration = ?, amount_1 = ?, amount_2 = ?, amount_3 = ?, amount_4 = ?, subTotal_1 = ?, subTotal_2 = ?, subTotal_3 = ?, subTotal_4 = ?, st_after_discount_1=?, st_after_discount_2=?, st_after_discount_3=?, st_after_discount_4=?, gst_1 = ?, gst_2 = ?, gst_3 = ?, gst_4 = ?, grandTotal_1 = ?, grandTotal_2 = ?, grandTotal_3 = ?,grandTotal_4 = ? WHERE (customer_id = ?);`;
      const updateValues = [
          category_type, category_value, discount, duration, amount_1, amount_2, amount_3,amount_4,
          subTotal_1, subTotal_2, subTotal_3,subTotal_4,
          st_after_discount_1,st_after_discount_2,st_after_discount_3,st_after_discount_4,
          gst_1, gst_2, gst_3,gst_4,
          grandTotal_1, grandTotal_2, grandTotal_3,grandTotal_4, customerId
      ];


      await pool.query(updateQuery, updateValues);


      res.json({ message: 'Category updated successfully' });
      
  } catch (err) {
      console.error('Error while updating category:', err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/api/trip_charge_edit/:customer_id', async (req, res) => {
  const customerID = req.params.customer_id;
  
  try {
      const deleteQuery1 = `DELETE FROM gama_db.trip_details WHERE (customer_id = ?);`;
      const deleteQuery2= `DELETE FROM gama_db.charge_boxes WHERE (customer_id = ?);`;
      await pool.query(deleteQuery1, [customerID]);
      await pool.query(deleteQuery2,[customerID]);


      res.json({ message: 'Trip details and Charges details deleted successfully' });
  } catch (err) {
      console.error('Error while updating trip details:', err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

//performa invoice

app.get('/api/next_id/quotes', async (req, res) => {


  try {
    const query=`SELECT MAX(id) AS last_insert_id FROM quotations;`;
    const [rows] = await pool.query(query);

    const next_id={
      next_id:rows[0]['last_insert_id'] + 1,
    }
    res.json(next_id);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/next_id/pi', async (req, res) => {


  try {
    const query=`SELECT MAX(id) AS last_insert_id FROM proforma_invoice;`;
    const [rows] = await pool.query(query);

    const next_id={
      next_id:rows[0]['last_insert_id'] + 1,
    }
    res.json(next_id);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// GET: Retrieve all proforma invoices
app.get('/api/get/proforma_invoices', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM proforma_invoice');
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Post

// POST: Create a new proforma invoice
app.post('/api/post/proforma_invoices', async (req, res) => {
  try {
    const {
      customer_name,
      customer_company_name,
      customer_address,
      customer_gst_no,
      amount_charge_in_word,
      tax_amount_in_word,
      quotation_no,
      created_by,
      updated_by,
      pi_status,
    } = req.body;


    const connection = await pool.getConnection();
    const [result] = await connection.query(
      'INSERT INTO proforma_invoice (customer_name, customer_company_name, customer_address, customer_gst_no, amount_charge_in_word, tax_amount_in_word, quotation_no, created_by, updated_by, pi_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
       
        customer_name,
        customer_company_name,
        customer_address,
        customer_gst_no,
        amount_charge_in_word,
        tax_amount_in_word,
        quotation_no,
        created_by,
        updated_by,
        pi_status,
      ]
    );
    connection.release();
    res.json({ message: 'Proforma invoice created successfully', id: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




// Start the server
app.listen(port, () => {
console.log(`Backend server is running on port ${port}`);
});