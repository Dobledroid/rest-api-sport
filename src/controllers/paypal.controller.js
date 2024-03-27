import axios from "axios";
import {
  PAYPAL_API,
  HOST,
  PAYPAL_API_CLIENT,
  PAYPAL_API_SECRET,
} from "../config.js";

const userData = require('../utilidades/paypal_payment.js');

export const createOrder = async (req, res) => {
  const { ID_usuario, total } = req.body;
  userData.setUserData(ID_usuario, total);

  console.log("HOST", HOST);
  try {
    const order = {
      intent: "CAPTURE",
      purchase_units: [
        {
          reference_id: "PU12345", // Un ID único para la unidad de compra para referencia interna
          description: "Compra de artículos deportivos", // Descripción general de la compra
          custom_id: "CUST12345", // Identificador personalizado para integración con sistemas internos
          invoice_id: "INV12345", // Un identificador único de factura para rastrear la compra
          soft_descriptor: "TiendaDeportiva", // Descriptor que aparecerá en el estado de cuenta del comprador
          amount: {
            currency_code: "MXN",
            value: "105.70", // Total de la compra incluyendo impuesto, envío, etc.
            breakdown: {
              item_total: { currency_code: "MXN", value: "85.00" }, // Suma de los precios de los artículos
              shipping: { currency_code: "MXN", value: "10.00" }, // Costo de envío
              tax_total: { currency_code: "MXN", value: "10.70" } // Impuestos aplicables
            }
          },
          items: [
            {
              name: "Balón de fútbol",
              description: "Balón oficial tamaño 5",
              sku: "SKU12345",
              unit_amount: { currency_code: "MXN", value: "50.00" },
              tax: { currency_code: "MXN", value: "5.00" },
              quantity: "1",
              category: "PHYSICAL_GOODS"
            },
            {
              name: "Par de espinilleras",
              description: "Protección ligera y resistente",
              sku: "SKU67890",
              unit_amount: { currency_code: "MXN", value: "35.00" },
              tax: { currency_code: "MXN", value: "5.70" },
              quantity: "1",
              category: "PHYSICAL_GOODS"
            }
          ]
        }
      ],
      application_context: {
        brand_name: "sportgymcenter.com",
        landing_page: "NO_PREFERENCE",
        user_action: "PAY_NOW",
        return_url: `${HOST}/paypal/capture-order`,
        cancel_url: `${HOST}/paypal/cancel-payment`,
      },
    };

    // format the body
    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");

    // Generate an access token
    const {
      data: { access_token },
    } = await axios.post(
      "https://api-m.sandbox.paypal.com/v1/oauth2/token",
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        auth: {
          username: PAYPAL_API_CLIENT,
          password: PAYPAL_API_SECRET,
        },
      }
    );

    console.log(access_token);

    // make a request
    const response = await axios.post(
      `${PAYPAL_API}/v2/checkout/orders`,
      order,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    console.log(response.data);

    return res.json(response.data);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Something goes wrong");
  }
};

export const captureOrder = async (req, res) => {
  const { token } = req.query;

  try {
    const response = await axios.post(
      `${PAYPAL_API}/v2/checkout/orders/${token}/capture`,
      {},
      {
        auth: {
          username: PAYPAL_API_CLIENT,
          password: PAYPAL_API_SECRET,
        },
      }
    );

    console.log(response.data);

    res.redirect("/payed.html");
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

export const cancelPayment = (req, res) => res.redirect("/");
