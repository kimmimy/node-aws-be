import { Client } from 'pg';

export const getAll = async () => {
  console.log('hey, invoking get All', process.env.DB_PASSWORD);
  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: +process.env.DB_PORT
  });

  await client.connect();

  try {
    const { rows: products } = await client.query(`
      SELECT p.*, s.count
      FROM products p, stocks s
      WHERE p.id = s.product_id
    `)

    return products
  } catch (error) {
    throw error
  } finally {
    client.end()
  }
}

export const getById = async id => {
  console.log('hey, invoking get All', process.env.DB_PASSWORD);
  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: +process.env.DB_PORT
  });

  await client.connect()
  try {
    const { rows: [product] } = await client.query(`
      SELECT p.*, s.count
      FROM products p, stocks s
      WHERE p.id = s.product_id
      AND p.id = $1
    `, [id])

    return product
  } catch (error) {
    throw error
  } finally {
    client.end()
  }
}

export const addProduct = async product => {
  console.log('hey, invoking get All', process.env.DB_PASSWORD);
  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: +process.env.DB_PORT
  });

  await client.connect()
  const {
    title,
    description,
    price,
    count
  } = product
  try {
    await client.query('BEGIN')

    const insertProductsText = `
      INSERT INTO products (title, description, price) 
      VALUES ($1, $2, $3)
      RETURNING id
    `
    const insertProductsValues = [title, description, price]
    const { rows: [{ id }] } = await client.query(insertProductsText, insertProductsValues)

    const insertStocksText = `
      INSERT INTO stocks (product_id, count)
      VALUES ($1, $2)
    `
    const insertStocksValues = [id, count];
    await client.query(insertStocksText, insertStocksValues)

    await client.query('COMMIT')

    return { id, ...product };
  } catch (error) {
    await client.query('ROLLBACK')
    throw error
  } finally {
    client.end()
  }
}
