import moment from 'moment-timezone';
import { getConnection, querysDetallesPedido, sql } from "../database";

export const getDetallesPedidoByPedidoID = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_pedido", req.params.id)
      .query(querysDetallesPedido.getDetallesPedidoByPedidoID);
    return res.json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const addNewDetallePedido = async (req, res) => {
  const {
    ID_pedido,
    ID_producto,
    cantidad,
    precioUnitario,
    operacion_id,
    operacion_status,
    operacion_status_detail,
    operacion_description
  } = req.body;

  if (
    ID_pedido == null ||
    ID_producto == null ||
    cantidad == null ||
    precioUnitario == null ||
    operacion_id == null ||
    operacion_status == null ||
    operacion_status_detail == null ||
    operacion_description == null
  ) {
    return res.status(400).json({ msg: 'Solicitud incorrecta. Por favor proporcione todos los campos requeridos' });
  }

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("ID_pedido", sql.Int, ID_pedido)
      .input("ID_producto", sql.Int, ID_producto)
      .input("cantidad", sql.Int, cantidad)
      .input("precioUnitario", sql.Decimal(10, 2), precioUnitario)
      .input("operacion_id", sql.Int, operacion_id)
      .input("operacion_status", sql.NVarChar(50), operacion_status)
      .input("operacion_status_detail", sql.NVarChar(50), operacion_status_detail)
      .input("operacion_description", sql.NVarChar(sql.MAX), operacion_description)
      .query(querysDetallesPedido.addNewDetallePedido);
    console.log("addNewDetallePedido OK 200")
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const updateDetallePedidoByID = async (req, res) => {
  const {
    ID_pedido,
    ID_producto,
    cantidad,
    precioUnitario,
    operacion_id,
    operacion_status,
    operacion_status_detail,
    operacion_description
  } = req.body;

  if (
    ID_pedido == null ||
    ID_producto == null ||
    cantidad == null ||
    precioUnitario == null ||
    operacion_id == null ||
    operacion_status == null ||
    operacion_status_detail == null ||
    operacion_description == null
  ) {
    return res.status(400).json({ msg: 'Solicitud incorrecta. Por favor proporcione todos los campos requeridos' });
  }

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("ID_pedido", sql.Int, ID_pedido)
      .input("ID_producto", sql.Int, ID_producto)
      .input("cantidad", sql.Int, cantidad)
      .input("precioUnitario", sql.Decimal(10, 2), precioUnitario)
      .input("operacion_id", sql.Int, operacion_id)
      .input("operacion_status", sql.NVarChar(50), operacion_status)
      .input("operacion_status_detail", sql.NVarChar(50), operacion_status_detail)
      .input("operacion_description", sql.NVarChar(sql.MAX), operacion_description)
      .input("ID_detalle", req.params.id)
      .query(querysDetallesPedido.updateDetallePedidoByID);
    console.log("updateDetallePedidoByID 200 OK")
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const deleteDetallePedidoByID = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_detalle", req.params.id)
      .query(querysDetallesPedido.deleteDetallePedidoByID);
    if (result.rowsAffected[0] === 0) return res.sendStatus(404);
    return res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
