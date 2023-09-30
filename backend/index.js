const Joi = require("joi");
const express = require("express");
const cors = require("cors");

const app = express();

const path = require("path");

const axios = require("axios");

app.use(express.json());
const apiUrl = "https://hackathon.syftanalytics.com/api/contacts";
const apiUrlForitem = "https://hackathon.syftanalytics.com/api/item";
const apiUrlForInvoice = "https://hackathon.syftanalytics.com/api/invoice";
const apiUrlForInvoiceLines = 'https://hackathon.syftanalytics.com/api/invoice-lines';
const apiUrlForPayment = 'https://hackathon.syftanalytics.com/api/payment';
const apiUrlForPaymentAllocations = 'https://hackathon.syftanalytics.com/api/payment-allocations';

const apiKey = "e6506999-8738-4866-a13f-2a2cfb14ba99";

// Add CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Change * to the specific origin you want to allow.
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Cache for storing multiple item
const cache = {
  contacts: null,
  item: null,
};

// Create an Express route for the GET request
app.get("/contacts", async (req, res) => {
  try {

    // If contacts data is already in the cache, serve it directly
    if (cache.contacts) {
      return res.json(cache.contacts);
    }

    // Make the GET request using axios and pass the x-api-key in headers
    const response = await axios.get(apiUrl, {
      headers: {
        accept: "application/json",
        "x-api-key": apiKey,
      },
    });

    // Store the fetched contacts data in the cache
    cache.contacts = response.data;

    // Send the response from the API to the client
    res.json(response.data);
  } catch (error) {
    // Handle any errors that occur during the request
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
});


app.get("/item", async (req, res) => {
  try {
    // If other data is already in the cache, serve it directly
    if (cache.item) {
      return res.json(cache.item);
    }

    // Make the GET request for other data using axios and pass the x-api-key in headers
    const response = await axios.get(apiUrlForitem, {
      headers: {
        accept: "application/json",
        "x-api-key": apiKey,
      },
    });

    // Store the fetched other data in the cache
    cache.item = response.data;

    res.json(cache.item);
  } catch (error) {
    console.error("Error fetching other data:", error);
    res.status(500).json({ error: "Error fetching other data" });
  }
});

app.get('/invoice', async (req, res) => {
  try {
    // Extract query parameters from the request
    const { id, contactId, startDate, endDate } = req.query;

    // If invoice data is already in the cache, serve it directly
    if (cache.invoice) {
      return res.json(cache.invoice);
    }

    // Construct the query parameters for the GET request
    const queryParams = {
      id,
      contactId,
      startDate,
      endDate,
    };

    // Make the GET request for invoice data using axios and pass the x-api-key in headers
    const response = await axios.get(apiUrlForInvoice, {
      headers: {
        Accept: 'application/json',
        'x-api-key': apiKey,
      },
      params: queryParams, // Pass the query parameters
    });

    // Store the fetched invoice data in the cache
    cache.invoice = response.data;

    res.json(cache.invoice);
  } catch (error) {
    console.error('Error fetching invoice data:', error);
    res.status(500).json({ error: 'Error fetching invoice data' });
  }
});

app.get('/invoice-lines', async (req, res) => {
  try {
    // Extract the 'invoiceId' parameter from the query string
    const { invoiceId } = req.query;

    // Make the GET request for invoice lines data using axios
    const response = await axios.get(apiUrlForInvoiceLines, {
      headers: {
        Accept: 'application/json',
        'x-api-key': apiKey,
      },
      params: {
        invoiceId,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching invoice lines:', error);
    res.status(500).json({ error: 'Error fetching invoice lines' });
  }
});


const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  // res.send(req.params.id);
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    const filePath = path.join(__dirname, "notFound.html");

    // Log the file path to the console for debugging
    console.log("File path:", filePath);

    res.status(404).sendFile(filePath, (err) => {
      if (err) {
        // Log any errors that occur when sending the file
        console.error("Error sending file:", err);
        res.status(500).send("Internal Server Error");
      }
    });
  } else {
    // Send the course or other content here
    res.send(course);
  }
});

app.post("/api/courses", (req, res) => {
  // const { error } = validateCourse(req.body);
  // if (error){
  //   res.status(400).send(error.details[0].message);
  //   return;
  // }

  const schema = {
    name: Joi.string().min(3).required(),
  };

  const result = Joi.validate(req.body, schema);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

app.get('/payment', async (req, res) => {
  try {
    const response = await axios.get(apiUrlForPayment, {
      headers: {
        Accept: 'application/json',
        'x-api-key': apiKey, // Replace with your actual API key
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching payment data:', error);
    res.status(500).json({ error: 'Error fetching payment data' });
  }
});



app.get('/payment-allocations', async (req, res) => {
  try {
    const response = await axios.get(apiUrlForPaymentAllocations, {
      headers: {
        Accept: 'application/json',
        'x-api-key': apiKey, // Replace with your actual API key
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching payment data:', error);
    res.status(500).json({ error: 'Error fetching payment data' });
  }
});

app.put("/api/courses/:id", (req, res) => {
  // Look up the course
  // If not existing, return 400
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    const filePath = path.join(__dirname, "notFound.html");

    // Log the file path to the console for debugging
    console.log("File path:", filePath);

    res.status(404).sendFile(filePath, (err) => {
      if (err) {
        // Log any errors that occur when sending the file
        console.error("Error sending file:", err);
        res.status(500).send("Internal Server Error");
      }
    });
    return;
  }

  // Validate
  // If invalid, return 400 - Bad request
  const { error } = validateCourse(req.body);
  if (error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  // Update course
  course.name = req.body.name;
  // Return the updted course
  res.send(course);
});

app.delete("/api/courses/:id", (req, res) => {
  // Look up
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    const filePath = path.join(__dirname, "notFound.html");

    // Log the file path to the console for debugging
    console.log("File path:", filePath);

    res.status(404).sendFile(filePath, (err) => {
      if (err) {
        // Log any errors that occur when sending the file
        console.error("Error sending file:", err);
        res.status(500).send("Internal Server Error");
      }
    });
    return;
  }

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(course, schema);
}
// PORT

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Listening on port ${port}...`));
