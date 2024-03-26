import { getConnection, querysCarritoCompras, sql } from "../database";

export const addItemToCart = async (req, res) => {
  const { ID_usuario, ID_producto, cantidad } = req.body;

  if (ID_usuario == null || ID_producto == null || cantidad == null) {
    return res.status(400).json({ msg: 'Solicitud incorrecta. Proporcione el ID de usuario, el ID del producto y la cantidad.' });
  }

  try {
    const pool = await getConnection();

    const existingCartItem = await getCartItemByIds(pool, ID_usuario, ID_producto);

    if (existingCartItem) {
      await updateCartItem(pool, ID_usuario, ID_producto, cantidad);
      return res.status(200).json({ msg: 'Cantidad actualizada en el carrito exitosamente' });
    } else {
      await pool
        .request()
        .input("ID_usuario", sql.Int, ID_usuario)
        .input("ID_producto", sql.Int, ID_producto)
        .input("cantidad", sql.Int, cantidad)
        .query(querysCarritoCompras.addNewItem);
      
      return res.status(200).json({ msg: 'Artículo agregado al carrito exitosamente' });
    }
  } catch (error) {
    return res.status(500).json({ msg: 'Error interno del servidor' });
  }
};

const getCartItemByIds = async (pool, ID_usuario, ID_producto) => {
  const result = await pool
    .request()
    .input("ID_usuario", sql.Int, ID_usuario)
    .input("ID_producto", sql.Int, ID_producto)
    .query(querysCarritoCompras.getCartItemByIds);

  return result.recordset.length > 0 ? result.recordset[0] : null;
};


const updateCartItem = async (pool, ID_usuario, ID_producto, cantidad) => {
  await pool
    .request()
    .input("ID_usuario", sql.Int, ID_usuario)
    .input("ID_producto", sql.Int, ID_producto)
    .input("cantidad", sql.Int, cantidad)
    .query(querysCarritoCompras.updateCartItem);
};


export const getItemsByUserID = async (req, res) => {
  const { ID_usuario } = req.params;

  if (ID_usuario == null) {
    return res.status(400).json({ msg: 'Solicitud incorrecta. Por favor proporcione ID de usuario' });
  }

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_usuario", sql.Int, ID_usuario)
      .query(querysCarritoCompras.getItemsByUserID);
    return res.json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const deleteItemByID = async (req, res) => {
  const { ID_carrito } = req.params;

  if (ID_carrito == null) {
    return res.status(400).json({ msg: 'Solicitud incorrecta. Por favor proporcione ID de usuario' });
  }

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_carrito", sql.Int, ID_carrito)
      .query(querysCarritoCompras.deleteItemByID);
    if (result.rowsAffected[0] === 0) return res.sendStatus(404);
    return res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const updateItemQuantityByID = async (req, res) => {
  const { ID_carrito } = req.params;
  const { cantidad } = req.body;

  if (ID_carrito == null || cantidad == null) {
    return res.status(400).json({ msg: 'Solicitud incorrecta. Proporcione el ID del artículo del carrito y la cantidad' });
  }

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("cantidad", sql.Int, cantidad)
      .input("ID_carrito", sql.Int, ID_carrito)
      .query(querysCarritoCompras.updateItemQuantityByID);
    res.json({ msg: 'Cantidad de artículo actualizada correctamente' });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
