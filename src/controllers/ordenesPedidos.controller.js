import moment from 'moment-timezone';
import { getConnection, querysOrdenesPedidos, sql } from "../database";

export const addNewOrdenPedido = async (req, res) => {
  const { ID_usuario, fecha, estado, total } = req.body;

  try {
    const pool = await getConnection();

    const formattedFecha = moment(fecha).format('YYYY-MM-DD HH:mm:ss');

    await pool
      .request()
      .input("ID_usuario", sql.Int, ID_usuario)
      .input("fecha", sql.DateTime, formattedFecha)
      .input("estado", sql.NVarChar, estado)
      .input("total", sql.Decimal(10, 2), total)
      .query(querysOrdenesPedidos.addNewOrdenPedido);

    res.status(200).json({ msg: "Orden de pedido añadida correctamente" });
  } catch (error) {
    console.error("Error al añadir la orden de pedido:", error.message);
    res.status(500).json({ msg: "Error al añadir la orden de pedido" });
  }
};

export const getOrdenPedidoByUserID = async (req, res) => {
  const { ID_usuario } = req.params;

  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("ID_usuario", sql.Int, ID_usuario)
      .query(querysOrdenesPedidos.getOrdenPedidoByUserID);

    if (result.recordset.length === 0) {
      return res.status(404).json({ msg: "No se encontraron órdenes de pedido para este usuario" });
    }

    res.json(result.recordset);
  } catch (error) {
    console.error("Error al obtener las órdenes de pedido:", error.message);
    res.status(500).json({ msg: "Error al obtener las órdenes de pedido" });
  }
};

export const getOrdenPedidoByID = async (req, res) => {
  const { ID_pedido } = req.params;

  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("ID_pedido", sql.Int, ID_pedido)
      .query(querysOrdenesPedidos.getOrdenPedidoByID);

    if (result.recordset.length === 0) {
      return res.status(404).json({ msg: "No se encontró la orden de pedido" });
    }

    res.json(result.recordset[0]);
  } catch (error) {
    console.error("Error al obtener la orden de pedido:", error.message);
    res.status(500).json({ msg: "Error al obtener la orden de pedido" });
  }
};

export const updateOrdenPedidoByID = async (req, res) => {
  const { ID_pedido } = req.params;
  const { ID_usuario, fecha, estado, total } = req.body;

  try {
    const pool = await getConnection();

    const formattedFecha = moment(fecha).format('YYYY-MM-DD HH:mm:ss');

    const result = await pool
      .request()
      .input("ID_pedido", sql.Int, ID_pedido)
      .input("ID_usuario", sql.Int, ID_usuario)
      .input("fecha", sql.DateTime, formattedFecha)
      .input("estado", sql.NVarChar, estado)
      .input("total", sql.Decimal(10, 2), total)
      .query(querysOrdenesPedidos.updateOrdenPedidoByID);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ msg: "No se encontró la orden de pedido" });
    }

    res.json({ msg: "Orden de pedido actualizada correctamente" });
  } catch (error) {
    console.error("Error al actualizar la orden de pedido:", error.message);
    res.status(500).json({ msg: "Error al actualizar la orden de pedido" });
  }
};

export const deleteOrdenPedidoByID = async (req, res) => {
  const { ID_pedido } = req.params;

  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("ID_pedido", sql.Int, ID_pedido)
      .query(querysOrdenesPedidos.deleteOrdenPedidoByID);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ msg: "No se encontró la orden de pedido" });
    }

    res.json({ msg: "Orden de pedido eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar la orden de pedido:", error.message);
    res.status(500).json({ msg: "Error al eliminar la orden de pedido" });
  }
};
