// const puppeteer = require('puppeteer');

const Page = require('./helpers/page');


let page;
beforeEach(async () => {
    page = await Page.build();
//   browser = await puppeteer.launch({ headless: false });
//   page = await browser.newPage();
  await page.goto('http://localhost:3000');
});

afterEach(async () => {
  await page.close();
});

test('The header has the correct text', async () => {

const text = await page.getContentsOf('a.brand-logo');
//   const text = await page.$eval('a.brand-logo', el => el.innerHTML);
  expect(text).toEqual('Blogster');
});

test('Clicking login starts oauth flow', async () => {
  await page.click('.right a');

  const url = await page.url();
  expect(url).toMatch(/accounts\.google\.com/);
});

test('When signed in, shows logout button', async () => {
//   const id = '5b5b983472152a0cea522553';
  await page.login();

  const text = await page.getContentsOf('a[href="/auth/logout"]');
//   const text = await page.$eval('a[href="/auth/logout"]', el => el.innerHTML);
  expect(text).toEqual('Logout');
});
