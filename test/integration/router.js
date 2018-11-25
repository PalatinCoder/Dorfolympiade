/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

const puppeteer = require('puppeteer');
const expect = require('chai').expect;
const {startServer} = require('polyserve');
const path = require('path');
const appUrl = 'http://127.0.0.1:4444';

describe('routing tests', function() {
  let polyserve, browser, page;

  before(async function() {
    polyserve = await startServer({port:4444, root:path.join(__dirname, '../..'), moduleResolution:'node'});
  });

  after((done) => polyserve.close(done));

  beforeEach(async function() {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    // should probably test on mobile size?
    await page.setViewport({width: 1920, height: 1080});
  });

  afterEach(() => browser.close());

  it('the page selector switches pages', async function() {
    await page.goto(`${appUrl}`);
    await page.waitForSelector('dorfolympiade-app', {visible: true});

    await testNavigation(page, 'station', 'Station');
  });

  it('the page selector switches pages in a different way', async function() {
    await page.goto(`${appUrl}`);
    await page.waitForSelector('dorfolympiade-app', {visible: true});

    // Setup
    await page.evaluate(() => {
      window.deepQuerySelector = function(query) {
        const parts = query.split('::shadow');
        let el = document;
        for (let i = 0; i < parts.length; i++) {
          el = el.querySelector(parts[i]);
          if (i % 2 === 0) {
            el = el.shadowRoot;
          }
        }
        return el === document ? null : el;
      }
      console.log(window.deepQuerySelector);
    });

    await testNavigationInADifferentWay(page, 'station', 'Station');
  });
  
  it('switching the page shows the right views', async function() {
    await testViewRouting(page, 'home', 'station-view');
    await testViewRouting(page, 'station', 'station-view');
    await testViewRouting(page, 'lizard', 'view-404');
  });
});

async function testViewRouting(page, href, viewName) {
  const getShadowRootChildProp = (el, childSelector, prop) => {
    return el.shadowRoot.querySelector(childSelector)[prop];
  };

  await page.goto(`${appUrl}/${href}`);
  await page.waitForSelector('dorfolympiade-app', {visible: true});

  const myApp = await page.$('dorfolympiade-app');
  const activeViewTagName = await page.evaluate(getShadowRootChildProp, myApp, '.page[active]', 'localName');
  expect(await activeViewTagName).equal(viewName);
}

async function testNavigation(page, href, linkText) {
  // Shadow DOM helpers.
  const getShadowRootChildProp = (el, childSelector, prop) => {
    return el.shadowRoot.querySelector(childSelector)[prop];
  };
  const doShadowRootClick = (el, childSelector) => {
    return el.shadowRoot.querySelector(childSelector).click();
  };

  const selector = `a[href="/${href}"]`;
  const shadowSelector = `a[href="/${href}"]`;

  // Does the link say the right thing?
  const myApp = await page.$('dorfolympiade-app');
  const myText = await page.evaluate(getShadowRootChildProp, myApp, selector, 'textContent');
  expect(await myText).equal(linkText);

  // Does the click take you to the right page?
  await page.evaluate(doShadowRootClick, myApp, selector);
  const newUrl = await page.evaluate('window.location.href')
  expect(newUrl).equal(`${appUrl}/${href}`);
}

async function testNavigationInADifferentWay(page, href, linkText) {
  const query = `dorfolympiade-app::shadow a[href="/${href}"]`;

  const linkHandle = await page.evaluateHandle((query) => window.deepQuerySelector(query), query);
  const text = await page.evaluate((el) => el.textContent, linkHandle);
  expect(text).equal(linkText);

  await linkHandle.click();
  let newUrl = await page.evaluate('window.location.href')
  expect(newUrl).equal(`${appUrl}/${href}`);
}
