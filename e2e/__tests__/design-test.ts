jest.setTimeout(10000);

it('As a user, I can see account page with balance and pockets.', async () => {
  await page.goto('http://host.docker.internal:3000');

  await page.waitFor(1000);

  expect(await page.screenshot()).toMatchImageSnapshot();
});

it('As a user, I can see exchange dialog.', async () => {
  await page.goto('http://host.docker.internal:3000');

  const exchangeBtn = await page.waitForXPath('//*[@data-e2e-id="root.exchangeBtn"]');

  exchangeBtn.click();

  await page.waitFor(1000);

  expect(await page.screenshot()).toMatchImageSnapshot();
});

it('As a user, I can see exchange dialog with filled fields.', async () => {
  await page.goto('http://host.docker.internal:3000');

  const exchangeBtn = await page.waitForXPath('//*[@data-e2e-id="root.exchangeBtn"]');

  exchangeBtn.click();

  const writeOffAmountInput = await page.waitForXPath(
    '//*[@data-e2e-id="exchangeDialog.writeOffAmountInput"]//input',
  );

  writeOffAmountInput.type('10.10');

  await page.waitFor(1000);

  expect(await page.screenshot()).toMatchImageSnapshot();
});

it('As a user, I should see error in exchange dialog when I submitting it with empty fields.', async () => {
  await page.goto('http://host.docker.internal:3000');

  const exchangeBtn = await page.waitForXPath('//*[@data-e2e-id="root.exchangeBtn"]');

  exchangeBtn.click();

  await page.waitFor(1000);

  const exchangeSubmitBtn = await page.waitForXPath('//*[@data-e2e-id="exchangeDialog.submitBtn"]');

  await exchangeSubmitBtn.click();

  expect(await page.screenshot()).toMatchImageSnapshot();
});
