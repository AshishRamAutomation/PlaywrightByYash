# PlaywrightByYash
Training in Playwright
For Branch < PlaywrightAssignmentYash >,Use Below in your Local VS Code

**Step 1:** Install Playwright - (npx init playwright@latest)
**step 2 : **import read CSV - (npm install csv-parse)
**step 3 : **for Allure Reports
npm install -D allure-playwright --save-dev
npm install allure-commandline --save-dev
npm install -g allure-commandline
npm install allure-commandline@1.4.22-1
In playwright.config.ts under reporter include: 
['allure-playwright', {  outputFolder: 'allure-results' }],
Then after executing tests, run:
allure serve allure-results 
**step 4 :** Check the Playwright config file and verify the testdir file for running test cases - (example - testDir: '././tests',)
