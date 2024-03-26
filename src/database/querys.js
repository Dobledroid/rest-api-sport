// export const querys = {
//   getAllProducts: "SELECT * FROM Productos",
//   getProductById: "SELECT * FROM Productos WHERE ID_producto = @IdProducto",
//   addNewProduct: "INSERT INTO Productos (nombre, descripcion, precio, precioDescuento, existencias, ID_categoria, ID_subcategoria, ID_marca) VALUES (@nombre, @descripcion, @precio, @precioDescuento, @existencias, @ID_categoria, @ID_subcategoria, @ID_marca)",
//   deleteProduct: "DELETE FROM Productos WHERE ID_producto = @IdProducto",
//   getTotalProducts: "SELECT COUNT(*) FROM Productos",
//   updateProductById: "UPDATE Productos SET nombre = @nombre, descripcion = @descripcion, precio = @precio, precioDescuento = @precioDescuento, existencias = @existencias, ID_categoria = @ID_categoria, ID_subcategoria = @ID_subcategoria, ID_marca = @ID_marca WHERE ID_producto = @IdProducto",
//   getAllProductsWithRelations: `
//   SELECT 
//   P.ID_producto,
//   P.nombre,
//   P.descripcion,
//   P.precio,
//   P.precioDescuento,
//   p.existencias,
//   C.ID_categoria,
//   C.nombre AS nombreCategoria,
//   SC.ID_subcategoria,
//   SC.nombre AS nombreSubcategoria,
//   M.ID_marca,
//   M.nombre AS nombreMarca
//   FROM 
//   Productos P
//   INNER JOIN 
//     CategoriasProductos C ON P.ID_categoria = C.ID_categoria
//   INNER JOIN 
//     SubcategoriasProductos SC ON P.ID_subcategoria = SC.ID_subcategoria
//   INNER JOIN 
//     Marcas M ON P.ID_marca = M.ID_marca
//   `
// };


// export const querysUsers = {
//   getAllUsers: "SELECT * FROM Usuarios",
//   getUserById: "SELECT * FROM Usuarios WHERE ID_usuario = @IdUsuario",
//   addNewUser: "INSERT INTO Usuarios (nombre, primerApellido, segundoApellido, direccion, correoElectronico, contraseña, telefono, fechaNacimiento, genero) VALUES (@nombre, @primerApellido, @segundoApellido, @direccion, @correoElectronico, @contraseña, @telefono, @fechaNacimiento, @genero);",
//   deleteUser: "DELETE FROM Usuarios WHERE ID_usuario = @IdUsuario",
//   getTotalUsers: "SELECT COUNT(*) FROM Usuarios",
//   updateUserById: "UPDATE Usuarios SET nombre = @nombre, primerApellido = @primerApellido, segundoApellido = @segundoApellido, direccion = @direccion, correoElectronico = @correoElectronico, contraseña = @contraseña, telefono = @telefono, fechaNacimiento = @fechaNacimiento, genero = @genero WHERE ID_usuario = @IdUsuario",
//   getUserByEmail: "SELECT * FROM Usuarios WHERE correoElectronico = @correoElectronico;",
//   getUserByTelephone: "SELECT * FROM Usuarios WHERE telefono = @telefono;",
//   updatePasswordById: "UPDATE Usuarios SET contraseña = @contraseña WHERE ID_usuario = @IdUsuario;",
//   login: "SELECT * FROM Usuarios WHERE correoElectronico = @correoElectronico AND contraseña = @contraseña;",
// };


// export const querysToken = {
//   addNewUserToken: "INSERT INTO Tokens (ID_usuario, token, expiracionToken) VALUES (@IdUser, @token, DATEADD(MINUTE, 30, GETDATE()));",
//   getUserToken: "SELECT * FROM Tokens WHERE ID_usuario = @IdUser;",
//   updateTokenById: "UPDATE Tokens SET token = @token, expiracionToken = DATEADD(MINUTE, 30, GETDATE()) WHERE ID_usuario = @IdUser;",
//   deleteTokenById: "DELETE FROM Tokens WHERE ID_usuario = @IdUser;"
// };


// export const querysCategoriasProductos = {
//   getAllCategoriasProductos: "SELECT * FROM CategoriasProductos",
//   getCategoriaProductoById: "SELECT * FROM CategoriasProductos WHERE ID_categoria = @IdCategoria",
//   addNewCategoriaProducto: "INSERT INTO CategoriasProductos (nombre) VALUES (@nombre);",
//   deleteCategoriaProducto: "DELETE FROM CategoriasProductos WHERE ID_categoria = @IdCategoria",
//   getTotalCategoriasProductos: "SELECT COUNT(*) FROM CategoriasProductos",
//   updateCategoriaProductoById: "UPDATE CategoriasProductos SET nombre = @nombre WHERE ID_categoria = @IdCategoria"
// };

// export const querysSubcategoriasProductos = {
//   getAllSubcategoriasProductos: "SELECT * FROM SubcategoriasProductos",
//   getSubcategoriaProductoById: "SELECT * FROM SubcategoriasProductos WHERE ID_subcategoria = @IdSubcategoria",
//   addNewSubcategoriaProducto: "INSERT INTO SubcategoriasProductos (nombre, ID_categoria) VALUES (@nombre, @IdCategoria);",
//   deleteSubcategoriaProducto: "DELETE FROM SubcategoriasProductos WHERE ID_subcategoria = @IdSubcategoria",
//   getTotalSubcategoriasProductos: "SELECT COUNT(*) FROM SubcategoriasProductos",
//   updateSubcategoriaProductoById: "UPDATE SubcategoriasProductos SET nombre = @nombre, ID_categoria = @IdCategoria WHERE ID_subcategoria = @IdSubcategoria",
//   getCategoriasByID_categoria: "SELECT * FROM SubcategoriasProductos WHERE ID_categoria = @IdCategoria"
// };

// export const querysMarcas = {
//   getAllMarcas: "SELECT * FROM Marcas",
//   getMarcaById: "SELECT * FROM Marcas WHERE ID_marca = @IdMarca",
//   addNewMarca: "INSERT INTO Marcas (nombre, ID_categoria) VALUES (@nombre, @IdCategoria);",
//   deleteMarca: "DELETE FROM Marcas WHERE ID_marca = @IdMarca",
//   getTotalMarcas: "SELECT COUNT(*) FROM Marcas",
//   updateMarcaById: "UPDATE Marcas SET nombre = @nombre, ID_categoria = @IdCategoria WHERE ID_marca = @IdMarca",
//   getMarcasByID_marca:"SELECT * FROM Marcas WHERE ID_categoria = @IdCategoria"
// };
export const querys = {
  getAllProducts: "SELECT * FROM Productos",
  getListProductsWithImagen: `
  SELECT Productos.*, ImagenesProducto.imagenUrl
  FROM Productos
  JOIN ImagenesProducto ON Productos.ID_producto = ImagenesProducto.ID_producto;`,
  getListProductsWithImagenPrincipal: `
  SELECT *
  FROM (
    SELECT P.*,
           IP.imagenUrl,
           ROW_NUMBER() OVER (PARTITION BY P.ID_producto ORDER BY IP.ID_imagen) AS rn
    FROM Productos P
    INNER JOIN ImagenesProducto IP ON P.ID_producto = IP.ID_producto
  ) AS ranked
  WHERE rn = 1;`,
  getProductById: "SELECT * FROM Productos WHERE ID_producto = @IdProducto",
  getProductByIdWithImagens: `SELECT Productos.*, ImagenesProducto.imagenUrl
  FROM Productos
  JOIN ImagenesProducto ON Productos.ID_producto = ImagenesProducto.ID_producto
  WHERE Productos.ID_producto = @ID_producto;`,
  addNewProduct: "INSERT INTO Productos (nombre, descripcion, precio, precioDescuento, ID_categoria, ID_subcategoria, ID_marca) VALUES (@nombre, @descripcion, @precio, @precioDescuento, @ID_categoria, @ID_subcategoria, @ID_marca)",
  deleteProduct: "DELETE FROM Productos WHERE ID_producto = @IdProducto",
  getTotalProducts: "SELECT COUNT(*) FROM Productos",
  updateProductById: "UPDATE Productos SET nombre = @nombre, descripcion = @descripcion, precio = @precio, precioDescuento = @precioDescuento, ID_categoria = @ID_categoria, ID_subcategoria = @ID_subcategoria, ID_marca = @ID_marca WHERE ID_producto = @IdProducto",
  getAllProductsWithRelations: `
  SELECT 
  P.ID_producto,
  P.nombre,
  P.descripcion,
  P.precio,
  P.precioDescuento,
  C.ID_categoria,
  C.nombre AS nombreCategoria,
  SC.ID_subcategoria,
  SC.nombre AS nombreSubcategoria,
  M.ID_marca,
  M.nombre AS nombreMarca
  FROM 
  Productos P
  INNER JOIN 
    CategoriasProductos C ON P.ID_categoria = C.ID_categoria
  INNER JOIN 
    SubcategoriasProductos SC ON P.ID_subcategoria = SC.ID_subcategoria
  INNER JOIN 
    Marcas M ON P.ID_marca = M.ID_marca
  `
};


export const querysUsers = {
  getAllUsers: "SELECT * FROM Usuarios",
  getUserById: "SELECT * FROM Usuarios WHERE ID_usuario = @IdUsuario",
  addNewUser: `
    INSERT INTO Usuarios (nombre, primerApellido, segundoApellido, fechaCreacion, ID_rol) 
    VALUES (@nombre, @primerApellido, @segundoApellido, GETDATE(), 2);
    SELECT SCOPE_IDENTITY() AS ID_usuario;
  `,  
  deleteUser: "DELETE FROM Usuarios WHERE ID_usuario = @IdUsuario",
  getTotalUsers: "SELECT COUNT(*) FROM Usuarios",
  updateUserById: "UPDATE Usuarios SET nombre = @nombre, primerApellido = @primerApellido, segundoApellido = @segundoApellido, direccion = @direccion, correoElectronico = @correoElectronico, contraseña = @contraseña, telefono = @telefono, fechaNacimiento = @fechaNacimiento, genero = @genero WHERE ID_usuario = @IdUsuario",
  getUserByEmail: "SELECT * FROM Credenciales WHERE correoElectronico = @correoElectronico;",
  getUserByTelephone: "SELECT * FROM Usuarios WHERE telefono = @telefono;",
  updatePasswordById: "UPDATE Credenciales SET contraseña = @contraseña WHERE ID_usuario = @IdUsuario;",
  login: "SELECT * FROM Credenciales WHERE correoElectronico = @correoElectronico AND contraseña = @contraseña;",
  getCredentialByEmail: "SELECT * FROM Credenciales WHERE correoElectronico = @correoElectronico;",
  addNewCredential: "INSERT INTO Credenciales (ID_usuario, correoElectronico, contraseña) VALUES (@ID_usuario, @correoElectronico, @contraseña);",
};


export const querysToken = {
  addNewUserToken: "INSERT INTO RecuperacionContraseña (ID_usuario, CodigoRecuperacion) VALUES (@IdUser, @recovery_code);",
  getUserToken: "SELECT * FROM RecuperacionContraseña WHERE ID_usuario = @IdUser;",
  updateTokenById: "UPDATE RecuperacionContraseña SET CodigoRecuperacion = @recovery_code WHERE ID_usuario = @IdUser;",
  deleteTokenById: "DELETE FROM RecuperacionContraseña WHERE ID_usuario = @IdUser;"
};

export const querysCategoriasProductos = {
  getAllCategoriasProductos: "SELECT * FROM CategoriasProductos",
  getCategoriaProductoById: "SELECT * FROM CategoriasProductos WHERE ID_categoria = @IdCategoria",
  addNewCategoriaProducto: "INSERT INTO CategoriasProductos (nombre) VALUES (@nombre);",
  deleteCategoriaProducto: "DELETE FROM CategoriasProductos WHERE ID_categoria = @IdCategoria",
  getTotalCategoriasProductos: "SELECT COUNT(*) FROM CategoriasProductos",
  updateCategoriaProductoById: "UPDATE CategoriasProductos SET nombre = @nombre WHERE ID_categoria = @IdCategoria"
};

export const querysSubcategoriasProductos = {
  getAllSubcategoriasProductos: "SELECT * FROM SubcategoriasProductos",
  getSubcategoriaProductoById: "SELECT * FROM SubcategoriasProductos WHERE ID_subcategoria = @IdSubcategoria",
  addNewSubcategoriaProducto: "INSERT INTO SubcategoriasProductos (nombre, ID_categoria) VALUES (@nombre, @IdCategoria);",
  deleteSubcategoriaProducto: "DELETE FROM SubcategoriasProductos WHERE ID_subcategoria = @IdSubcategoria",
  getTotalSubcategoriasProductos: "SELECT COUNT(*) FROM SubcategoriasProductos",
  updateSubcategoriaProductoById: "UPDATE SubcategoriasProductos SET nombre = @nombre, ID_categoria = @IdCategoria WHERE ID_subcategoria = @IdSubcategoria",
  getCategoriasByID_categoria: "SELECT * FROM SubcategoriasProductos WHERE ID_categoria = @IdCategoria"
};

export const querysMarcas = {
  getAllMarcas: "SELECT * FROM Marcas",
  getMarcaById: "SELECT * FROM Marcas WHERE ID_marca = @IdMarca",
  addNewMarca: "INSERT INTO Marcas (nombre, ID_categoria) VALUES (@nombre, @IdCategoria);",
  deleteMarca: "DELETE FROM Marcas WHERE ID_marca = @IdMarca",
  getTotalMarcas: "SELECT COUNT(*) FROM Marcas",
  updateMarcaById: "UPDATE Marcas SET nombre = @nombre, ID_categoria = @IdCategoria WHERE ID_marca = @IdMarca",
  getMarcasByID_marca:"SELECT * FROM Marcas WHERE ID_categoria = @IdCategoria"
};

export const querysEstadoCuenta = {
  addNewEstadoCuenta: "INSERT INTO EstadoCuenta (ID_usuario, estado, descripcion, intentosFallidos) VALUES (@ID_usuario, @estado, @descripcion, 0);",
  getEstadoCuentaByUserId: "SELECT TOP 1 * FROM EstadoCuenta WHERE ID_usuario = @ID_usuario ORDER BY ID_estadoCuenta DESC;",
  updateEstadoCuentaById: "UPDATE EstadoCuenta SET estado = @estado, descripcion = @descripcion, intentosFallidos = @intentosFallidos WHERE ID_estadoCuenta = @ID_estadoCuenta;",
  updateIntentosFallidos: "UPDATE EstadoCuenta SET intentosFallidos = @intentosFallidos WHERE ID_estadoCuenta = @ID_estadoCuenta;",
  deleteEstadoCuentaById: "DELETE FROM EstadoCuenta WHERE ID_estadoCuenta = @ID_estadoCuenta;",
  bloquearCuenta: "UPDATE EstadoCuenta SET estado = 0, descripcion = 'Bloqueado', fechaBloqueo = GETDATE(), tiempoDesbloqueo = DATEADD(MINUTE, @tiempoBloqueoMinutos, GETDATE()) WHERE ID_usuario = @ID_usuario;",
  desbloquearCuenta: "UPDATE EstadoCuenta SET estado = 1, descripcion = 'Activo', intentosFallidos = 0, fechaBloqueo = NULL, tiempoDesbloqueo = NULL WHERE ID_estadoCuenta = @ID_estadoCuenta;"
};


export const querysEstadoUsuario = {
  addNewEstadoUsuario: "INSERT INTO EstadoUsuario (ID_usuario, estado, descripcion) VALUES (@ID_usuario, @estado, @descripcion);",
  getEstadoUsuarioByUserId: "SELECT * FROM EstadoUsuario WHERE ID_usuario = @ID_usuario;",
  updateEstadoUsuarioById: "UPDATE EstadoUsuario SET estado = @estado, descripcion = @descripcion WHERE ID_usuario = @ID_usuario;",
  deleteEstadoUsuarioById: "DELETE FROM EstadoUsuario WHERE ID_usuario = @ID_usuario;"
};

export const querysRoles = {
  addNewRol: "INSERT INTO Roles (rol, fechaCreacion) VALUES (@rol, GETDATE());",
  getRolById: "SELECT * FROM Roles WHERE ID_Rol = @ID_Rol;",
  deleteRolById: "DELETE FROM Roles WHERE ID_Rol = @ID_Rol;",
  updateRolById: "UPDATE Roles SET rol = @rol WHERE ID_Rol = @ID_Rol;",
};

export const querysTiposMembresillas = {
  addNewMembershipType: "INSERT INTO TiposMembresia (nombre, costo) VALUES (@nombre, @costo);",
  getMembershipTypeById: "SELECT * FROM TiposMembresia WHERE ID_tipoMembresia = @ID_tipoMembresia;",
  getMembresillaIdUnico: "SELECT * FROM TiposMembresia WHERE ID_UnicoMembresilla = @ID_UnicoMembresilla;",
  getAllMembershipTypes: "SELECT * FROM TiposMembresia;",
  deleteMembershipTypeById: "DELETE FROM TiposMembresia WHERE ID_tipoMembresia = @ID_tipoMembresia;",
  updateMembershipTypeById: "UPDATE TiposMembresia SET nombre = @nombre, costo = @costo WHERE ID_tipoMembresia = @ID_tipoMembresia;"
};

export const querysMembresiasUsuarios = {
  addNewMembresiaUsuario: "INSERT INTO MembresiasUsuarios (ID_usuario, ID_tipoMembresia, fechaInicio, fechaVencimiento, imagenUrl) VALUES (@ID_usuario, @ID_tipoMembresia, @fechaInicio, @fechaVencimiento, @imagenUrl);",
  getMembresiaUsuarioByUserId: "SELECT * FROM MembresiasUsuarios WHERE ID_usuario = @ID_usuario;",
  getMembresiaUsuarioByUserIdAndTypeId: "SELECT * FROM MembresiasUsuarios WHERE ID_usuario = @ID_usuario AND ID_tipoMembresia = @ID_tipoMembresia;",
  updateMembresiaUsuarioById: "UPDATE MembresiasUsuarios SET ID_usuario = @ID_usuario, ID_tipoMembresia = @ID_tipoMembresia, fechaInicio = @fechaInicio, fechaVencimiento = @fechaVencimiento, imagenUrl = @imagenUrl WHERE ID_membresiaUsuario = @ID_membresiaUsuario;",
  deleteMembresiaUsuarioById: "DELETE FROM MembresiasUsuarios WHERE ID_membresiaUsuario = @ID_membresiaUsuario;"
};

export const querysHistorialMembresias = {
  addNewHistorialMembresia: "INSERT INTO HistorialMembresias (ID_usuario, ID_tipoMembresia, fechaInicio, fechaVencimiento, precio, operacion_id, operacion_status, operacion_status_detail, operacion_description, operacion_total_paid_amount) VALUES (@ID_usuario, @ID_tipoMembresia, @fechaInicio, @fechaVencimiento, @precio, @operacion_id, @operacion_status, @operacion_status_detail, @operacion_description, @operacion_total_paid_amount);",
  getHistorialMembresiaByUserId: "SELECT * FROM HistorialMembresias WHERE ID_usuario = @ID_usuario;",
  getTodasHistorialMembresiasByUsuarioID: `SELECT 
	HM.*,
	TM.*
FROM 
    HistorialMembresias HM
INNER JOIN 
    TiposMembresia TM ON HM.ID_tipoMembresia = TM.ID_tipoMembresia
WHERE HM.ID_usuario = @ID_usuario;
`,
  getHistoriallMembresiaByUserIdAndTypeIdAndOperacionId: "SELECT * FROM HistorialMembresias WHERE ID_usuario = @ID_usuario AND ID_tipoMembresia = @ID_tipoMembresia AND operacion_id = @operacion_id;",
  getHistoriallMembresiaByUserIdAndTypeId: "SELECT * FROM HistorialMembresias WHERE ID_usuario = @ID_usuario AND ID_tipoMembresia = @ID_tipoMembresia;",
  updateHistorialMembresiaById: "UPDATE HistorialMembresias SET ID_usuario = @ID_usuario, ID_tipoMembresia = @ID_tipoMembresia, fechaInicio = @fechaInicio, fechaVencimiento = @fechaVencimiento, precio = @precio, operacion_id = @operacion_id, operacion_status = @operacion_status, operacion_status_detail = @operacion_status_detail, operacion_description = @operacion_description, operacion_total_paid_amount = @operacion_total_paid_amount WHERE ID_historialMembresia = @ID_historialMembresia;",
  deleteHistorialMembresiaById: "DELETE FROM HistorialMembresias WHERE ID_historialMembresia = @ID_historialMembresia;"
};

export const querysCarritoCompras = {
  addNewItem: "INSERT INTO CarritoCompras (ID_usuario, ID_producto, cantidad) VALUES (@ID_usuario, @ID_producto, @cantidad);",
  getItemsByUserID: `SELECT *
  FROM (
    SELECT CC.*,
        P.nombre,
        p.existencias,
        P.precioFinal,
        IP.imagenUrl,
           ROW_NUMBER() OVER (PARTITION BY CC.ID_carrito ORDER BY IP.ID_imagen) AS rn
    FROM CarritoCompras CC
    INNER JOIN Productos P ON CC.ID_producto = P.ID_producto
    INNER JOIN ImagenesProducto IP ON P.ID_producto = IP.ID_producto
    WHERE CC.ID_usuario = @ID_usuario
  ) AS ranked
  WHERE rn = 1;`,
  deleteItemByID: "DELETE FROM CarritoCompras WHERE ID_carrito = @ID_carrito;",
  updateItemQuantityByID: "UPDATE CarritoCompras SET cantidad = @cantidad WHERE ID_carrito = @ID_carrito;",
  getCartItemByIds: "SELECT * FROM CarritoCompras WHERE ID_usuario = @ID_usuario AND ID_producto = @ID_producto;",
  updateCartItem: "UPDATE CarritoCompras SET cantidad = @cantidad WHERE ID_usuario = @ID_usuario AND ID_producto = @ID_producto;",
};

export const querysDireccionEnvio = {
  addNewDireccion: "DECLARE @InsertedID TABLE (ID_direccion INT); INSERT INTO DireccionesEnvio (ID_usuario, nombre, apellidos, pais, direccion, ciudad, colonia, estado, codigoPostal, telefono, referencias) OUTPUT INSERTED.ID_direccion INTO @InsertedID VALUES (@ID_usuario, @nombre, @apellidos, @pais, @direccion, @ciudad, @colonia, @estado, @codigoPostal, @telefono, @referencias); SELECT ID_direccion FROM @InsertedID;",
  getDireccionByID: "SELECT * FROM DireccionesEnvio WHERE ID_direccion = @ID_direccion;",
  getDireccionByUserID: "SELECT * FROM DireccionesEnvio WHERE ID_usuario = @ID_usuario;",
  getDireccionesByUserID: "SELECT * FROM DireccionesEnvio WHERE ID_usuario = @ID_usuario;",
  updateDireccionByID: "UPDATE DireccionesEnvio SET nombre = @nombre, apellidos = @apellidos, pais = @pais, direccion = @direccion, ciudad = @ciudad, colonia = @colonia, estado = @estado, codigoPostal = @codigoPostal, telefono = @telefono, referencias = @referencias WHERE ID_direccion = @ID_direccion;",
  deleteDireccionByID: "DELETE FROM DireccionesEnvio WHERE ID_direccion = @ID_direccion;"
};

export const querysDireccionEnvioPredeterminada = {
  upsertDireccionPredeterminada: "IF EXISTS (SELECT 1 FROM DireccionEnvioPredeterminada WHERE ID_usuario = @ID_usuario) UPDATE DireccionEnvioPredeterminada SET ID_direccion = @ID_direccion WHERE ID_usuario = @ID_usuario ELSE INSERT INTO DireccionEnvioPredeterminada (ID_usuario, ID_direccion) VALUES (@ID_usuario, @ID_direccion);",
  getDireccionPredeterminadaByUserID: "SELECT de.* FROM DireccionEnvioPredeterminada dep INNER JOIN DireccionesEnvio de ON dep.ID_direccion = de.ID_direccion WHERE dep.ID_usuario = @ID_usuario;",
  deleteDireccionPredeterminadaByUserID: "DELETE FROM DireccionEnvioPredeterminada WHERE ID_usuario = @ID_usuario;"
};


export const querysPregunta = {
  getAllPreguntas: "SELECT * FROM PreguntasSecretas",
  getPreguntaByIdUser: "SELECT * FROM PreguntasSecretas WHERE ID_usuario = @IdUsuario",
  insertarPregunta: "INSERT INTO PreguntasSecretas (ID_usuario, pregunta, respuesta) VALUES (@IdUsuario, @pregunta, @respuesta)",
  getPreguntaByUserAndDetails: "SELECT * FROM PreguntasSecretas WHERE ID_usuario = @IdUsuario AND pregunta = @pregunta AND respuesta = @respuesta"
}

export const querysOrdenesPedidos = {
  addNewOrdenPedido: "INSERT INTO OrdenesPedidos (ID_usuario, fecha, estado, total) VALUES (@ID_usuario, @fecha, @estado, @total);",
  getOrdenPedidoByUserID: "SELECT * FROM OrdenesPedidos WHERE ID_usuario = @ID_usuario;",
  getOrdenPedidoByID: "SELECT * FROM OrdenesPedidos WHERE ID_pedido = @ID_pedido;",
  updateOrdenPedidoByID: "UPDATE OrdenesPedidos SET ID_usuario = @ID_usuario, fecha = @fecha, estado = @estado, total = @total WHERE ID_pedido = @ID_pedido;",
  deleteOrdenPedidoByID: "DELETE FROM OrdenesPedidos WHERE ID_pedido = @ID_pedido;"
};


export const querysDetallesPedido = {
  addNewDetallePedido: `INSERT INTO DetallesPedido (ID_pedido, ID_producto, cantidad, precioUnitario, operacion_id, operacion_status, operacion_status_detail, operacion_description) 
                        VALUES (@ID_pedido, @ID_producto, @cantidad, @precioUnitario, @operacion_id, @operacion_status, @operacion_status_detail, @operacion_description);`,
  getDetallesPedidoByPedidoID: `SELECT * FROM DetallesPedido WHERE ID_pedido = @ID_pedido;`,
  getDetallePedidoByID: `SELECT * FROM DetallesPedido WHERE ID_detalle = @ID_detalle;`,
  updateDetallePedidoByID: `UPDATE DetallesPedido SET ID_pedido = @ID_pedido, ID_producto = @ID_producto, cantidad = @cantidad, precioUnitario = @precioUnitario, operacion_id = @operacion_id, operacion_status = @operacion_status, operacion_status_detail = @operacion_status_detail, operacion_description = @operacion_description 
                            WHERE ID_detalle = @ID_detalle;`,
  deleteDetallePedidoByID: `DELETE FROM DetallesPedido WHERE ID_detalle = @ID_detalle;`
};
