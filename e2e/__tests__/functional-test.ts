jest.setTimeout(10000);

it('As a user, I can exchange money between my pockets.', async () => {
  await page.goto('http://host.docker.internal:3000');

  const exchangeBtn = await page.waitForXPath('//*[@data-e2e-id="root.exchangeBtn"]');

  exchangeBtn.click();

  await page.waitFor(1000);

  const writeOffAmountInput = await page.waitForXPath(
    '//*[@data-e2e-id="exchangeDialog.writeOffAmountInput"]//input',
  );

  writeOffAmountInput.type('10.10');

  const exchangeSubmitBtn = await page.waitForXPath('//*[@data-e2e-id="exchangeDialog.submitBtn"]');

  exchangeSubmitBtn.click();

  await page.waitFor(1000);

  expect(await page.screenshot()).toMatchImageSnapshot();
});
