
const { test, expect } = require('@playwright/test');

test('API - Get sample user', async ({ request }) => {
    const response = await request.get(
        'https://qaplayground.com/bank/login'
    );

    expect(response.status()).toBe(200);

    const data = await response.json();

    expect(data.id).toBe(1);
    expect(data.name).toBeTruthy();
    expect(data.email).toBeTruthy();

    console.log('Status:', response.status());
    console.log('User:', data.name);
    console.log('Email:', data.email);
});
