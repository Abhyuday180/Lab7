describe('Basic user flow for Website', () => 
{
  beforeAll(async () => 
  {
    await page.goto('https://cse110-sp25.github.io/CSE110-Shop/');
  });

  it('Initial Home Page - Check for 20 product items', async () => 
  {
    console.log('Checking for 20 product items...');
    const productCount = await page.$$eval('product-item', 
      items => items.length);
    expect(productCount).toBe(20);
  });

  it('Make sure <product-item> elements are populated', async () => 
{
    console.log
      ('Checking to make sure <product-item> elements are populated...');

    const allProductData = await page.$$eval('product-item', items => 
    {
      return items.map(item => item.data);
    });

    let populated = true;
    console.log(`Checking ${allProductData.length} product items...`);

    for (let firstValue of allProductData) 
    {
      if (firstValue.title.length == 0 || firstValue.price.length == 0 ||
        firstValue.image.length == 0) 
      { 
        populated = false; 
      }
      
      expect(populated).toBe(true);
    }
  }, 10000);

  it('Clicking the "Add to Cart" button should change button text', async () => 
  {
    console.log('Checking the "Add to Cart" button...');
    const product = await page.$('product-item');
    const shadowRoot = await product.getProperty('shadowRoot');
    const button = await shadowRoot.$('button');

    await button.click();
    const textProp = await button.getProperty('innerText');
    const buttonText = await textProp.jsonValue();
    expect(buttonText).toBe('Remove from Cart');

    await button.click(); 
  }, 2500);

  it('Checking number of items in cart on screen', async () => {
    console.log('Checking number of items in cart on screen...');
    const productItems = await page.$$('product-item');

    for (const product of productItems) {
      const shadow = await product.getProperty('shadowRoot');
      const button = await shadow.$('button');
      await button.click();
    }

    await new Promise(resolve => setTimeout(resolve, 1000));
    const cartCountText = await page.$eval('#cart-count', el => el.innerText);
    expect(cartCountText).toBe('20');
  }, 30000);

  it('Checking number of items in cart on screen after reload', async () => 
  {
    console.log('Checking number of items in cart on screen after reload...');
    await page.reload();

    const productItems = await page.$$('product-item');
    for (const product of productItems) 
    {
      const shadow = await product.getProperty('shadowRoot');
      const button = await shadow.$('button');
      const textProp = await button.getProperty('innerText');
      const buttonText = await textProp.jsonValue();
      expect(buttonText).toBe('Remove from Cart');
    }

    const cartCountText = await page.$eval('#cart-count', el => el.innerText);
    expect(cartCountText).toBe('20');
  }, 10000);

  it('Checking the localStorage to make sure cart is correct', async () => 
  {
    const localStorageCart = 
      await page.evaluate(() => localStorage.getItem('cart'));
    expect(localStorageCart).
      toBe('[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]');
  });

  it('Checking number of items in cart on screen after removing from cart', 
    async () => 
  {
    console.log('Checking number of items in cart on screen...');
    const productItems = await page.$$('product-item');

    for (const product of productItems) 
    {
      const shadow = await product.getProperty('shadowRoot');
      const button = await shadow.$('button');
      await button.click();
    }

    const cartCountText = await page.$eval('#cart-count', el => el.innerText);
    expect(cartCountText).toBe('0');
  }, 25000);

  it('Checking number of items in cart on screen after reload', async () => 
  {
    console.log('Checking number of items in cart on screen after reload...');
    await page.reload();

    const productItems = await page.$$('product-item');
    for (const product of productItems) 
    {
      const shadow = await product.getProperty('shadowRoot');
      const button = await shadow.$('button');
      const textProp = await button.getProperty('innerText');
      const buttonText = await textProp.jsonValue();
      expect(buttonText).toBe('Add to Cart');
    }

    const cartCountText = await page.$eval('#cart-count', el => el.innerText);
    expect(cartCountText).toBe('0');
  }, 10000);

  it('Checking the localStorage to make sure cart is correct', async () => 
  {
    console.log('Checking the localStorage...');
    const localStorageCart = await page.evaluate(() => 
      localStorage.getItem('cart'));
    expect(localStorageCart).toBe('[]');
  });
});
