
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

  getListProductsWithImagenPrincipalAdmin: `SELECT *
  FROM (
  SELECT P.*, IP.imagenUrl, M.nombre AS 'Marca', CP.nombre AS 'Categoria', SP.nombre AS 'Subcategoria',
            ROW_NUMBER() OVER (PARTITION BY P.ID_producto ORDER BY IP.ID_imagen) AS rn
      FROM Productos P
    INNER JOIN ImagenesProducto IP ON P.ID_producto = IP.ID_producto
    INNER JOIN Marcas M ON P.ID_marca = M.ID_marca
    INNER JOIN CategoriasProductos CP ON P.ID_categoria = CP.ID_categoria
    INNER JOIN SubcategoriasProductos SP ON P.ID_subcategoria = SP.ID_subcategoria
    ) AS ranked
    WHERE rn = 1
  `,
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
  `,
  updateItemQuantityByID_Orden: "UPDATE Productos SET existencias = @cantidad WHERE ID_producto =  @ID_producto"
};


export const querysUsers = {
  getAllUsers: "SELECT * FROM Usuarios",
  getUserById: `SELECT us.*, cre.correoElectronico, rol.rol FROM Usuarios us
  INNER JOIN Credenciales cre ON us.ID_usuario = cre.ID_usuario
  INNER JOIN Roles rol ON us.ID_rol = rol.ID_Rol
  WHERE us.ID_usuario = @IdUsuario`,
  addNewUser: `
    INSERT INTO Usuarios (nombre, primerApellido, segundoApellido, fechaCreacion, ID_rol) 
    VALUES (@nombre, @primerApellido, @segundoApellido, GETDATE(), 2);
    SELECT SCOPE_IDENTITY() AS ID_usuario;
  `,
  addNewUserOAuth: `
  INSERT INTO Usuarios (nombre, fechaCreacion, ID_rol) 
  VALUES (@nombre, GETDATE(), 2);
  SELECT SCOPE_IDENTITY() AS ID_usuario;
`,
  deleteUser: "DELETE FROM Usuarios WHERE ID_usuario = @IdUsuario",
  getTotalUsers: "SELECT COUNT(*) FROM Usuarios",
  updateUserById: "UPDATE Usuarios SET nombre = @nombre, primerApellido = @primerApellido, segundoApellido = @segundoApellido, telefono = @telefono, fechaNacimiento = @fechaNacimiento, genero = @genero WHERE ID_usuario = @IdUsuario",
  getUserByEmail: `SELECT cre.*, us.ID_rol FROM Credenciales cre
  INNER JOIN usuarios us ON cre.ID_usuario = us.ID_usuario
  WHERE correoElectronico = @correoElectronico`,
  getUserByEmailOAuth: `SELECT cre.ID_credencial, cre.correoElectronico, us.* FROM Credenciales cre
  INNER JOIN usuarios us ON cre.ID_usuario = us.ID_usuario
  WHERE correoElectronico = @correoElectronico;`,
  getUserByTelephone: "SELECT * FROM Usuarios WHERE telefono = @telefono;",
  updatePasswordById: "UPDATE Credenciales SET contraseña = @contraseña WHERE ID_usuario = @IdUsuario;",
  login: "SELECT * FROM Credenciales WHERE correoElectronico = @correoElectronico AND contraseña = @contraseña;",
  getCredentialByEmail: "SELECT * FROM Credenciales WHERE correoElectronico = @correoElectronico;",
  addNewCredential: "INSERT INTO Credenciales (ID_usuario, correoElectronico, contraseña) VALUES (@ID_usuario, @correoElectronico, @contraseña);",
  addNewCredentialOAuth: "INSERT INTO Credenciales (ID_usuario, correoElectronico) VALUES (@ID_usuario, @correoElectronico);",
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
  getMarcasByID_marca: "SELECT * FROM Marcas WHERE ID_categoria = @IdCategoria"
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
  addNewMembershipType: "INSERT INTO TiposMembresia (nombre, costo, ID_UnicoMembresia) VALUES (@nombre, @costo, @ID_UnicoMembresia);",
  getMembershipTypeById: "SELECT * FROM TiposMembresia WHERE ID_tipoMembresia = @ID_tipoMembresia;",
  getMembresillaIdUnico: "SELECT * FROM TiposMembresia WHERE ID_UnicoMembresia = @ID_UnicoMembresia;",
  getAllMembershipTypes: "SELECT * FROM TiposMembresia;",
  deleteMembershipTypeById: "DELETE FROM TiposMembresia WHERE ID_tipoMembresia = @ID_tipoMembresia;",
  updateMembershipTypeById: "UPDATE TiposMembresia SET nombre = @nombre, costo = @costo, ID_UnicoMembresia = @ID_UnicoMembresia WHERE ID_tipoMembresia = @ID_tipoMembresia;"
};

export const querysMembresiasUsuarios = {
  getAllMembresiasUsers: `
    SELECT MU.*, US.nombre AS usuario, US.telefono, C.correoElectronico, TM.nombre AS nombreMembresia FROM MembresiasUsuarios MU
    INNER JOIN Usuarios US ON MU.ID_usuario = US.ID_usuario
    INNER JOIN Credenciales C ON MU.ID_usuario = C.ID_usuario
    INNER JOIN TiposMembresia TM ON MU.ID_tipoMembresia = TM.ID_tipoMembresia`,
  addNewMembresiaUsuario:
    `
    DECLARE @InsertedID TABLE (ID_membresiaUsuario INT);
    INSERT INTO MembresiasUsuarios (ID_usuario, ID_tipoMembresia, fechaInicio, fechaVencimiento, imagenUrl)
    OUTPUT INSERTED.ID_membresiaUsuario INTO @InsertedID
    VALUES (@ID_usuario, @ID_tipoMembresia, @fechaInicio, @fechaVencimiento, @imagenUrl);

    SELECT ID_membresiaUsuario FROM @InsertedID;
   `,
  getMembresiaUsuarioByUserId: "SELECT * FROM MembresiasUsuarios WHERE ID_usuario = @ID_usuario ORDER BY ID_membresiaUsuario DESC;",
  getMembresiaUsuarioByIDUnicoMembresia: "SELECT * FROM MembresiasUsuarios WHERE ID_UnicoMembresia = @ID_UnicoMembresia;",
  getMembresiaUsuarioByUserIdAndTypeId: "SELECT * FROM MembresiasUsuarios WHERE ID_usuario = @ID_usuario AND ID_tipoMembresia = @ID_tipoMembresia;",
  updateMembresiaUsuarioById: "UPDATE MembresiasUsuarios SET ID_usuario = @ID_usuario, ID_tipoMembresia = @ID_tipoMembresia, fechaInicio = @fechaInicio, fechaVencimiento = @fechaVencimiento, imagenUrl = @imagenUrl WHERE ID_membresiaUsuario = @ID_membresiaUsuario;",
  updateMembresiaUsuarioByIdActualizar: "UPDATE MembresiasUsuarios SET fechaVencimiento = @fechaVencimiento, imagenUrl = @imagenUrl WHERE ID_membresiaUsuario = @ID_membresiaUsuario;",
  deleteMembresiaUsuarioById: "DELETE FROM MembresiasUsuarios WHERE ID_membresiaUsuario = @ID_membresiaUsuario;",
  existeUnaMembresiaUsuarioByID: "SELECT TOP 1 ID_membresiaUsuario, COUNT(*) AS existeRegistro FROM MembresiasUsuarios WHERE ID_membresiaUsuario = @ID_membresiaUsuario GROUP BY ID_membresiaUsuario;",
  existeUnaMembresiaUsuarioByIDMembresiaTodo: `SELECT MU.*, TM.nombre, TM.costo FROM MembresiasUsuarios MU 
  INNER JOIN TiposMembresia TM ON MU.ID_tipoMembresia = TM.ID_tipoMembresia
  WHERE ID_membresiaUsuario = @ID_membresiaUsuario;`
};

export const querysHistorialMembresias = {
  addNewHistorialMembresia: "INSERT INTO HistorialMembresias (ID_usuario, ID_tipoMembresia, fechaInicio, fechaVencimiento, precio, operacion_id, operacion_status) VALUES (@ID_usuario, @ID_tipoMembresia, @fechaInicio, @fechaVencimiento, @precio, @operacion_id, @operacion_status);",
  getHistorialMembresiaByUserId: "SELECT * FROM HistorialMembresias WHERE ID_usuario = @ID_usuario;",
  getTodasHistorialMembresiasByUsuarioID: `SELECT 
	HM.*,
	TM.*
FROM 
    HistorialMembresias HM
INNER JOIN 
    TiposMembresia TM ON HM.ID_tipoMembresia = TM.ID_tipoMembresia
WHERE HM.ID_usuario = @ID_usuario ORDER BY HM.ID_tipoMembresia DESC ;
`,
  getItemDetalleIdMembresia: '',
  getHistoriallMembresiaByUserIdAndTypeIdAndOperacionId: "SELECT * FROM HistorialMembresias WHERE ID_usuario = @ID_usuario AND ID_tipoMembresia = @ID_tipoMembresia AND operacion_id = @operacion_id;",
  getHistoriallMembresiaByUserIdAndTypeId: "SELECT * FROM HistorialMembresias WHERE ID_usuario = @ID_usuario AND ID_tipoMembresia = @ID_tipoMembresia;",
  updateHistorialMembresiaById: "UPDATE HistorialMembresias SET ID_usuario = @ID_usuario, ID_tipoMembresia = @ID_tipoMembresia, fechaInicio = @fechaInicio, fechaVencimiento = @fechaVencimiento, precio = @precio, operacion_id = @operacion_id, operacion_status = @operacion_status WHERE ID_historialMembresia = @ID_historialMembresia;",
  deleteHistorialMembresiaById: "DELETE FROM HistorialMembresias WHERE ID_historialMembresia = @ID_historialMembresia;"
};

export const querysCarritoCompras = {
  addNewItem: "INSERT INTO CarritoCompras (ID_usuario, ID_producto, cantidad) VALUES (@ID_usuario, @ID_producto, @cantidad);",
  getItemsByID: "SELECT * FROM CarritoCompras WHERE ID_carrito = @ID_carrito;",
  getItemsByIDUser: "SELECT * FROM CarritoCompras WHERE ID_usuario = @ID_usuario;",
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
  getItemsOrderByUserID: `  SELECT CC.*, P.nombre, p.existencias, P.precioFinal FROM CarritoCompras CC
    INNER JOIN Productos P ON CC.ID_producto = P.ID_producto WHERE CC.ID_usuario = @ID_usuario;`,
  deleteItemByID: "DELETE FROM CarritoCompras WHERE ID_carrito = @ID_carrito;",
  deleteItemsByUserID: "DELETE FROM CarritoCompras WHERE ID_usuario = @ID_usuario;",
  updateItemQuantityByID: "UPDATE CarritoCompras SET cantidad = @cantidad WHERE ID_carrito = @ID_carrito;",
  getCartItemByIds: "SELECT * FROM CarritoCompras WHERE ID_usuario = @ID_usuario AND ID_producto = @ID_producto;",
  updateCartItem: "UPDATE CarritoCompras SET cantidad = @cantidad WHERE ID_usuario = @ID_usuario AND ID_producto = @ID_producto;",
  getTotalItemsByUserID: "SELECT COUNT(*) AS totalProductosEnCarrito FROM CarritoCompras WHERE ID_usuario = @ID_usuario;",
  existeUnProductoEnCarritoByUserIDProductID: "SELECT TOP 1 ID_carrito, COUNT(*) AS existeRegistro FROM CarritoCompras WHERE ID_producto = @ID_producto AND ID_usuario = @ID_usuario GROUP BY ID_carrito;"
};

export const querysDireccionEnvio = {
  addNewDireccion: `
BEGIN TRANSACTION;

UPDATE DireccionesEnvio
SET predeterminado = 0
WHERE ID_usuario = @ID_usuario;

DECLARE @InsertedID TABLE (ID_direccion INT);
INSERT INTO DireccionesEnvio (ID_usuario, nombre, apellidos, pais, direccion, ciudad, colonia, estado, codigoPostal, telefono, referencias, predeterminado)
OUTPUT INSERTED.ID_direccion INTO @InsertedID
VALUES (@ID_usuario, @nombre, @apellidos, @pais, @direccion, @ciudad, @colonia, @estado, @codigoPostal, @telefono, @referencias, 1);

SELECT ID_direccion FROM @InsertedID;

COMMIT TRANSACTION;
`,
  getDireccionByID: "SELECT * FROM DireccionesEnvio WHERE ID_direccion = @ID_direccion;",
  getDireccionByUserID: "SELECT * FROM DireccionesEnvio WHERE ID_usuario = @ID_usuario;",
  getDireccionesByUserID: "SELECT * FROM DireccionesEnvio WHERE ID_usuario = @ID_usuario;",
  updateDireccionByID: "UPDATE DireccionesEnvio SET nombre = @nombre, apellidos = @apellidos, pais = @pais, direccion = @direccion, ciudad = @ciudad, colonia = @colonia, estado = @estado, codigoPostal = @codigoPostal, telefono = @telefono, referencias = @referencias WHERE ID_direccion = @ID_direccion;",
  deleteDireccionByID: "DELETE FROM DireccionesEnvio WHERE ID_direccion = @ID_direccion;"
};

export const querysDireccionEnvioPredeterminada = {
  setDireccionPredeterminada: `
    BEGIN TRANSACTION;
    UPDATE DireccionesEnvio 
    SET predeterminado = 0 
    WHERE ID_usuario = @ID_usuario;

    UPDATE DireccionesEnvio 
    SET predeterminado = 1 
    WHERE ID_usuario = @ID_usuario AND ID_direccion = @ID_direccion;
    COMMIT TRANSACTION;
  `,
  getDireccionPredeterminadaByUserID: `
    SELECT * 
    FROM DireccionesEnvio 
    WHERE ID_usuario = @ID_usuario AND predeterminado = 1;
  `,
  resetDireccionesPredeterminadas: `
    UPDATE DireccionesEnvio 
    SET predeterminado = 0 
    WHERE ID_usuario = @ID_usuario;
  `
};



export const querysPregunta = {
  getAllPreguntas: "SELECT * FROM PreguntasSecretas",
  getPreguntaByIdUser: "SELECT * FROM PreguntasSecretas WHERE ID_usuario = @IdUsuario",
  insertarPregunta: "INSERT INTO PreguntasSecretas (ID_usuario, pregunta, respuesta) VALUES (@IdUsuario, @pregunta, @respuesta)",
  getPreguntaByUserAndDetails: "SELECT * FROM PreguntasSecretas WHERE ID_usuario = @IdUsuario AND pregunta = @pregunta AND respuesta = @respuesta"
}

export const querysOrdenesPedidos = {
  addNewOrdenPedido: `
  DECLARE @InsertedID TABLE (ID_pedido INT);
  INSERT INTO OrdenesPedidos (ID_usuario, fecha, total, operacion_id, operacion_status)
OUTPUT INSERTED.ID_pedido INTO @InsertedID
VALUES (@ID_usuario, @fecha, @total, @operacion_id, @operacion_status);

SELECT ID_pedido FROM @InsertedID;
  `,
  getOrdenPedidoByUserID: "SELECT * FROM OrdenesPedidos WHERE ID_usuario = @ID_usuario;",
  getOrdenPedidoByID: "SELECT * FROM OrdenesPedidos WHERE ID_pedido = @ID_pedido;",
  updateOrdenPedidoByID: "UPDATE OrdenesPedidos SET ID_usuario = @ID_usuario, fecha = @fecha, estado = @estado, total = @total, operacion_id = @operacion_id, operacion_status = @operacion_status WHERE ID_pedido = @ID_pedido;",
  deleteOrdenPedidoByID: "DELETE FROM OrdenesPedidos WHERE ID_pedido = @ID_pedido;",
  existeUnOrdenPedidoByID: "SELECT TOP 1 ID_pedido, COUNT(*) AS existeRegistro FROM OrdenesPedidos WHERE ID_pedido = @ID_pedido GROUP BY ID_pedido;"
};

export const querysDetallesPedido = {
  addNewDetallePedido: `INSERT INTO DetallesPedido (ID_pedido, ID_producto, cantidad, precioUnitario) VALUES (@ID_pedido, @ID_producto, @cantidad, @precioUnitario);`,
  getDetallesPedidoByPedidoID: `SELECT * FROM DetallesPedido WHERE ID_pedido = @ID_pedido;`,
  getDetallesPedidosByIdUser: `  SELECT * FROM (
    SELECT OP.ID_pedido, 
    OP.operacion_id, OP.fecha, P.nombre, DP.cantidad, DP.precioUnitario,
    IP.imagenUrl,
    ROW_NUMBER() OVER (PARTITION BY DP.ID_detalle ORDER BY IP.ID_imagen) AS rn FROM OrdenesPedidos OP 
    INNER JOIN DetallesPedido DP ON OP.ID_pedido = DP.ID_pedido
    INNER JOIN Productos P ON DP.ID_producto = P.ID_producto
    INNER JOIN ImagenesProducto IP ON P.ID_producto = IP.ID_producto
    WHERE OP.ID_usuario = @ID_usuario
  ) AS ranked
    WHERE rn = 1`,
  getItemsDetallesOrdenByUserID: `
  SELECT * FROM (
    SELECT OP.ID_pedido, 
    OP.operacion_id, P.nombre, 
    IP.imagenUrl,
    ROW_NUMBER() OVER (PARTITION BY DP.ID_detalle ORDER BY IP.ID_imagen) AS rn FROM OrdenesPedidos OP 
    INNER JOIN DetallesPedido DP ON OP.ID_pedido = DP.ID_pedido
    INNER JOIN Productos P ON DP.ID_producto = P.ID_producto
    INNER JOIN ImagenesProducto IP ON P.ID_producto = IP.ID_producto
    WHERE OP.ID_pedido = @ID_pedido
  ) AS ranked
    WHERE rn = 1`,
  getDetallePedidoByID: `SELECT * FROM DetallesPedido WHERE ID_detalle = @ID_detalle;`,
  updateDetallePedidoByID: `UPDATE DetallesPedido SET ID_pedido = @ID_pedido, ID_producto = @ID_producto, cantidad = @cantidad, precioUnitario = @precioUnitario WHERE ID_detalle = @ID_detalle;`,
  deleteDetallePedidoByID: `DELETE FROM DetallesPedido WHERE ID_detalle = @ID_detalle;`
};


export const querysLogsInicioSesion = {
  getAllLogsLogsInicioSesion: "SELECT * FROM LogsInicioSesion",
  addNewLogInicioSesion: "INSERT INTO LogsInicioSesion (IPUsuario, FechaHoraEvento, CorreoElectronico, URLSolicitada, CodigoEstadoHTTP) VALUES (@IPUsuario, GETDATE(), @CorreoElectronico, @URLSolicitada, @CodigoEstadoHTTP);",
  getLogInicioSesionById: "SELECT * FROM LogsInicioSesion WHERE ID_registro = @ID_registro;",
  deleteLogInicioSesionById: "DELETE FROM LogsInicioSesion WHERE ID_registro = @ID_registro;",
  updateLogInicioSesionById: "UPDATE LogsInicioSesion SET IPUsuario = @IPUsuario, FechaHoraEvento = @FechaHoraEvento, CorreoElectronico = @CorreoElectronico, URLSolicitada = @URLSolicitada, CodigoEstadoHTTP = @CodigoEstadoHTTP WHERE ID_registro = @ID_registro;"
};

export const querysLogsBloqueoInicioSesion = {
  getAllLogsBloqueoInicioSesion: "SELECT * FROM LogsBloqueoInicioSesion",
  addNewLogBloqueoInicioSesion: "INSERT INTO LogsBloqueoInicioSesion (IPUsuario, FechaHoraEvento, CorreoElectronico) VALUES (@IPUsuario, GETDATE(), @CorreoElectronico);",
  getLogBloqueoInicioSesionById: "SELECT * FROM LogsBloqueoInicioSesion WHERE IDRegistro = @IDRegistro;",
  deleteLogBloqueoInicioSesionById: "DELETE FROM LogsBloqueoInicioSesion WHERE IDRegistro = @IDRegistro;",
  updateLogBloqueoInicioSesionById: "UPDATE LogsBloqueoInicioSesion SET IPUsuario = @IPUsuario, FechaHoraEvento = @FechaHoraEvento, CorreoElectronico = @CorreoElectronico WHERE IDRegistro = @IDRegistro;"
};

export const querysLogsInicioSesionOAuth = {
  getAllLogsInicioSesionOAuth: "SELECT * FROM LogsInicioSesionOAuth",
  addNewLogInicioSesionOAuth: "INSERT INTO LogsInicioSesionOAuth (IPUsuario, FechaHoraEvento, CorreoElectronico, ProveedorOAuth) VALUES (@IPUsuario, GETDATE(), @CorreoElectronico, @ProveedorOAuth);",
  getLogInicioSesionOAuthById: "SELECT * FROM LogsInicioSesionOAuth WHERE IDRegistro = @IDRegistro;",
  deleteLogInicioSesionOAuthById: "DELETE FROM LogsInicioSesionOAuth WHERE IDRegistro = @IDRegistro;",
  updateLogInicioSesionOAuthById: "UPDATE LogsInicioSesionOAuth SET IPUsuario = @IPUsuario, FechaHoraEvento = @FechaHoraEvento, CorreoElectronico = @CorreoElectronico, ProveedorOAuth = @ProveedorOAuth WHERE IDRegistro = @IDRegistro;"
};

export const querysLogsActualizacionDatosSensibles = {
  getAllLogsActualizacionDatosSensibles: "SELECT * FROM LogsActualizacionDatosSensibles",
  addNewLogActualizacionDatosSensibles: "INSERT INTO LogsActualizacionDatosSensibles (IPUsuario, FechaHoraEvento, CorreoElectronico, DescripcionAccion) VALUES (@IPUsuario, @FechaHoraEvento, @CorreoElectronico, @DescripcionAccion);",
  getLogActualizacionDatosSensiblesById: "SELECT * FROM LogsActualizacionDatosSensibles WHERE IDRegistro = @IDRegistro;",
  deleteLogActualizacionDatosSensiblesById: "DELETE FROM LogsActualizacionDatosSensibles WHERE IDRegistro = @IDRegistro;",
  updateLogActualizacionDatosSensiblesById: "UPDATE LogsActualizacionDatosSensibles SET IPUsuario = @IPUsuario, FechaHoraEvento = @FechaHoraEvento, CorreoElectronico = @CorreoElectronico, DescripcionAccion = @DescripcionAccion WHERE IDRegistro = @IDRegistro;"
};