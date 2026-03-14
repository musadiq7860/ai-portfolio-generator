const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');

async function testGenerate() {
  const formData = new FormData();
  formData.append('github_url', 'https://github.com/musadiq7860');
  formData.append('role', 'Fullstack Developer');
  formData.append('job_target', 'Senior Engineer');
  formData.append('skills_to_emphasize', 'React, Python');
  formData.append('one_liner', 'Building AI solutions');
  formData.append('highlighted_projects', JSON.stringify(['ai-portfolio-generator']));
  formData.append('template', 'Minimal');
  formData.append('user_id', 'test-user');
  formData.append('username', 'musadiq7860');
  formData.append('full_name', 'Musadiq');
  
  // Create a dummy PDF buffer
  const dummyPdf = Buffer.from('%PDF-1.4\n1 0 obj\n<< /Title (Test) >>\nendobj\n%%EOF');
  formData.append('linkedin_pdf', dummyPdf, { filename: 'test.pdf', contentType: 'application/pdf' });

  try {
    console.log('Sending test request to Hugging Face...');
    const res = await axios.post('https://musadiq7860-ai-portfolio-api.hf.space/api/generate/portfolio', formData, {
      headers: formData.getHeaders()
    });
    console.log('SUCCESS:', JSON.stringify(res.data, null, 2));
  } catch (err) {
    if (err.response) {
      console.log('FAILED with Status:', err.response.status);
      console.log('ERROR DATA:', JSON.stringify(err.response.data, null, 2));
    } else {
      console.log('FAILED:', err.message);
    }
  }
}

testGenerate();
