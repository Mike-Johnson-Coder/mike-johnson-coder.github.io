const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const config = require('./config');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/send-email', async (req, res) => {
  const { teacherEmail, emailBody } = req.body;

  try {
    const response = await fetch('https://api.mailersend.com/v1/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.mailerSendApiKey}`
      },
      body: JSON.stringify({
        from: {
          email: 'SecureTestPro-results@outlook.com',
          name: 'Secure Test Pro Results'
        },
        to: [
          {
            email: teacherEmail,
            name: 'Teacher'
          }
        ],
        subject: 'Test Answers',
        text: emailBody
      })
    });

    if (response.ok) {
      res.status(200).send('Email sent successfully!');
    } else {
      res.status(response.status).send('Failed to send email');
    }
  } catch (error) {
    res.status(500).send('Error sending email');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});