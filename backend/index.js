const Joi = require('joi');
const express = require('express');
const app = express();

const path = require('path');

const axios = require('axios');

app.use(express.json());

const apiUrl = 'https://hackathon.syftanalytics.com/api/contacts';
const apiKey = 'e6506999-8738-4866-a13f-2a2cfb14ba99';

// Create an Express route for the GET request
app.get('/contacts', async (req, res) => {
  try {
    // Make the GET request using axios and pass the x-api-key in headers
    const response = await axios.get(apiUrl, {
      headers: {
        'accept': 'application/json',
        'x-api-key': apiKey,
      },
    });

    // Send the response from the API to the client
    res.json(response.data);
  } catch (error) {
    // Handle any errors that occur during the request
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
});

const  courses = [
    {id: 1, name: "course1"},
    {id: 2, name: "course2"},
    {id: 3, name: "course3"}

];

app.get('/', (req, res) => {
    res.send("Hello, World!");
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    // res.send(req.params.id);
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        const filePath = path.join(__dirname, 'notFound.html');
    
        // Log the file path to the console for debugging
        console.log('File path:', filePath);
    
        res.status(404).sendFile(filePath, (err) => {
          if (err) {
            // Log any errors that occur when sending the file
            console.error('Error sending file:', err);
            res.status(500).send('Internal Server Error');
          }
        });
      } else {
        // Send the course or other content here
        res.send(course);
      }
});

app.post ('/api/courses', (req, res) => {

  // const { error } = validateCourse(req.body);
  // if (error){
  //   res.status(400).send(error.details[0].message);
  //   return;
  // }

  const schema = {
    name: Joi.string().min(3).required()
  };

  const result = Joi.validate(req.body, schema);

  if(result.error){
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
  // Look up the course
  // If not existing, return 400
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) {
      const filePath = path.join(__dirname, 'notFound.html');
  
      // Log the file path to the console for debugging
      console.log('File path:', filePath);
  
      res.status(404).sendFile(filePath, (err) => {
        if (err) {
          // Log any errors that occur when sending the file
          console.error('Error sending file:', err);
          res.status(500).send('Internal Server Error');
        }
      });
      return;
    } 

  // Validate
  // If invalid, return 400 - Bad request
  const { error } = validateCourse(req.body);
  if (error){
    res.status(400).send(result.error.details[0].message);
    return;
  }

  // Update course
  course.name = req.body.name;
  // Return the updted course
  res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
  // Look up
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) {
      const filePath = path.join(__dirname, 'notFound.html');
  
      // Log the file path to the console for debugging
      console.log('File path:', filePath);
  
      res.status(404).sendFile(filePath, (err) => {
        if (err) {
          // Log any errors that occur when sending the file
          console.error('Error sending file:', err);
          res.status(500).send('Internal Server Error');
        }
      });
      return;
    } 

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course)
});

function validateCourse(course){
  const schema = {
    name: Joi.string().min(3).required()
  };

  return Joi.validate(course, schema);
}
// PORT

const port = process.env.PORT || 3001

app.listen(port, () => console.log(`Listening on port ${port}...`));