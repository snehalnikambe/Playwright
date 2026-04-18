
const config = ({
  testDir: './tests',
  timeout:80*1000,
  expect :{
    timeout:80*1000,
  },
  reporter:'html',
  
  use: {

    browserName: 'chromium',
    headless: false,
  },
});
  
