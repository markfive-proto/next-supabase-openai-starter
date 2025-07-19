const OpenAI = require('openai');
require('dotenv').config({ path: '.env' });

console.log('Testing OpenAI integration...');
console.log('API Key exists:', !!process.env.OPENAI_API_KEY);
console.log('API Key starts with:', process.env.OPENAI_API_KEY?.substring(0, 8) + '...');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function testOpenAI() {
  try {
    console.log('Testing OpenAI Chat Completions...');
    
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'user',
          content: 'Say "Hello, VibeBoard!" to test the connection.'
        }
      ],
      max_tokens: 10
    });

    console.log('✅ OpenAI API is working!');
    console.log('Response:', response.choices[0]?.message?.content);
    
  } catch (error) {
    console.error('❌ OpenAI API Error:', error.message);
    console.error('Error details:', error);
  }
}

testOpenAI(); 