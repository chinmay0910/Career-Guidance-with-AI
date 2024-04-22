const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT || 3300
const bodyParser = require('body-parser');
const data = require('./public/assets/roadmap/data.json');
const TreeNode = require('./models/tree');
const Question = require('./models/questions');

// Database Connection //4SiFggXkxZSG7ZFW
const connectToMongo = require('./db')
connectToMongo();

// Use body-parser middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// import all Routes
const routes = require('./routes/routes');

// handling static files 
app.use(express.static(path.join(process.cwd(), 'public')));

// handling ejs specific stuff
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use('/', routes);

app.get('/updatedata',async (req, res) => {
    try {
        const root = await new TreeNode(data);
        root.save();
        res.json({ message: "Successfully Updated" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

app.get('/treeData', async (req, res) => {
    try {
      const rootNode = await TreeNode.find({});
      res.json(rootNode);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

app.post('/questions', async (req, res) => {
    try {
        const questionData = [
            {
                category: 'Verbal',
                questionText: 'Question 1: What is the capital of France?',
                selectName: 'verbal1',
                options: [
                    { text: 'Paris', value: 0 },
                    { text: 'London', value: 0 },
                    { text: 'Berlin', value: 20 }
                ]
            },
            {
                category: 'Verbal',
                questionText: 'Question 2: Which of the following words is a homonym for "bank"?',
                selectName: 'verbal2',
                options: [
                    { text: 'River Bank', value: 0 },
                    { text: 'Saving Bank', value: 20 },
                    { text: 'Food Bank', value: 0 }
                ]
            },
            {
                category: 'Verbal',
                questionText: 'Question 3: What does the term "obfuscate" mean?',
                selectName: 'verbal3',
                options: [
                    { text: 'To clarify', value: 0 },
                    { text: 'To confuse', value: 20 },
                    { text: 'To simplify', value: 0 }
                ]
            },
            {
                category: 'Verbal',
                questionText: 'Question 4: Choose the correct sentence that uses "affect" and "effect" appropriately:',
                selectName: 'verbal4',
                options: [
                    { text: 'The weather will affect our picnic plans', value: 20 },
                    { text: 'The weather will effect our picnic plans', value: 0 },
                    { text: 'The weather will have an affect on our picnic plans', value: 0 }
                ]
            },
            {
                category: 'Verbal',
                questionText: 'Question 5: which of the following words is a synonym for "serendipity"?',
                selectName: 'verbal5',
                options: [
                    { text: 'Misfortune', value: 20 },
                    { text: 'Luck', value: 0 },
                    { text: 'Tragedy', value: 0 }
                ]
            },
            {
                category: 'Logical',
                questionText: 'Question 6: What is the next number in the sequence: 2, 6, 12, 20, ___',
                selectName: 'logical1',
                options: [
                    { text: '26', value: 0 },
                    { text: '30', value: 0 },
                    { text: '36', value: 20 }
                ]
            },
            {
                category: 'Logical',
                questionText: 'Question 7: If three friends bring $15 each to a restaurant and the bill is $40, how much should they each contribute to cover the bill and leave a 20% tip?',
                selectName: 'logical2',
                options: [
                    { text: '$15', value: 0 },
                    { text: '$16', value: 20 },
                    { text: '$17', value: 0 }
                ]
            },
            {
                category: 'Logical',
                questionText: 'Question 8: If "APPLE" is coded as "XQQIR" using a specific pattern, what is the code for "LEMON"?',
                selectName: 'logical3',
                options: [
                    { text: 'PEKON', value: 20 },
                    { text: 'AEPKON', value: 0 },
                    { text: 'PKEON', value: 0 }
                ]
            },
            {
                category: 'Logical',
                questionText: 'Question 9: In a deck of cards, what is the probability of drawing a red card or a face card (jack, queen, or king)?',
                selectName: 'logical4',
                options: [
                    { text: '1/2', value: 0 },
                    { text: '1/4', value: 0 },
                    { text: '3/4', value: 20 }
                ]
            },
            {
                category: 'Logical',
                questionText: 'Question 10: If no mammals can fly, and all bats are mammals, can bats fly?',
                selectName: 'logical5',
                options: [
                    { text: 'YES', value: 0 },
                    { text: 'NO', value: 20 },
                    { text: 'MAY BE', value: 0 }
                ]
            },
            {
                category: 'Spatial',
                questionText: 'Question 11: Which of the following 3D shapes has the highest number of faces?',
                selectName: 'spatial1',
                options: [
                    { text: 'Octahedron', value: 0 },
                    { text: 'Dodecahedron', value: 20 },
                    { text: 'Icosahedron', value: 0 }
                ]
            },
            {
                category: 'Spatial',
                questionText: 'Question 12: Which shape does not have rotational symmetry?',
                selectName: 'spatial2',
                options: [
                    { text: 'Square', value: 0 },
                    { text: 'Triangle', value: 20 },
                    { text: 'Hexagon', value: 0 }
                ]
            },
            {
                category: 'Spatial',
                questionText: 'Question 13: In a hexagonal grid, how many sides does a hexagon share with other hexagons?',
                selectName: 'spatial3',
                options: [
                    { text: '4', value: 0 },
                    { text: '5', value: 20 },
                    { text: '6', value: 0 }
                ]
            },
            {
                category: 'Spatial',
                questionText: 'Question 14: Which of the following shapes has the highest volume-to-surface-area ratio?',
                selectName: 'spatial4',
                options: [
                    { text: 'Sphere', value: 20 },
                    { text: 'Cube', value: 0 },
                    { text: 'Cylinder', value: 0 }
                ]
            },
            {
                category: 'Spatial',
                questionText: 'Question 15: Which of the following patterns does not have rotational symmetry?',
                selectName: 'spatial5',
                options: [
                    { text: 'Snowflake', value: 20 },
                    { text: 'Windmill', value: 0 },
                    { text: 'Star', value: 0 }
                ]
            },
            {
                category: 'Numerical',
                questionText: 'Question 16: A bakery sells muffins for $2.50 each. If a customer buys 4 muffins and gets a 10% discount, how much does the customer pay in total?',
                selectName: 'numerical1',
                options: [
                    { text: '$9.00', value: 20 },
                    { text: '$8.00', value: 0 },
                    { text: '$7.50', value: 0 }
                ]
            },
            {
                category: 'Numerical',
                questionText: 'Question 17: Solve the following trigonometric equation for x: sin(x) + cos(x) = 1',
                selectName: 'numerical2',
                options: [
                    { text: 'x = π/2', value: 0 },
                    { text: 'x = π/4', value: 20 },
                    { text: 'x = π', value: 0 }
                ]
            },
            {
                category: 'Numerical',
                questionText: 'Question 18: If a train travels at a speed of 120 kilometers per hour for 2 hours, then at a speed of 80 kilometers per hour for 3 hours, what is the total distance covered by the train?',
                selectName: 'numerical3',
                options: [
                    { text: '440 kilometers', value: 0 },
                    { text: '560 kilometers', value: 0 },
                    { text: '600 kilometers', value: 20 }
                ]
            },
            {
                category: 'Numerical',
                questionText: 'Question 19: Solve for x: 2x^2 - 5x + 2 = 0?',
                selectName: 'numerical4',
                options: [
                    { text: 'x = 1, x = 2', value: 20 },
                    { text: 'x = 2, x = 3', value: 0 },
                    { text: 'x = -1, x = 2', value: 0 }
                ]
            },
            {
                category: 'Numerical',
                questionText: 'Question 20: A geometric sequence has a common ratio of 1/3. If the first term is 81, what is the fifth term in the sequence?',
                selectName: 'numerical5',
                options: [
                    { text: '9', value: 0 },
                    { text: '3', value: 0 },
                    { text: '27', value: 20 }
                ]
            }
        ];      // Assuming the request body contains the array of questions

        // Insert all questions into the database
        await Question.insertMany(questionData);

        res.status(201).json({ message: 'Questions stored successfully.' });
    } catch (error) {
        console.error('Error storing questions:', error);
        res.status(500).json({ error: 'An error occurred while storing questions.' });
    }
});

// Route to get all questions
app.get('/questions', async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});




app.listen(port, ()=>{
    console.log(`Listening on Port ${port}`);
})