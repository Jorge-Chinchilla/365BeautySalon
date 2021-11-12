
USE beauty_salon_365;

CREATE TABLE `Categoria` (
  `ID_Categoria` INT,
  `Nombre` VARCHAR(100),
  PRIMARY KEY (`ID_Categoria`)
);

CREATE TABLE `Producto` (
  `ID_Porducto` INT NOT NULL,
  `Nombre` VARCHAR(100),
  `Cantidad` INT,
  `Precio_compra` INT NOT NULL,
  `Precio_venta` INT NOT NULL,
  `Fecha` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Categoria_ID` INT,
  PRIMARY KEY (`ID_Porducto`),
  FOREIGN KEY (`Categoria_ID`) REFERENCES `Categoria`(`ID_Categoria`)
);

CREATE TABLE `Empleado` (
  `ID_Empleado` INT NOT NULL,
  `Nombre` VARCHAR(100) NOT NULL,
  `Telefono` VARCHAR(8) NOT NULL,
  `Correo` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`ID_Empleado`)
);

CREATE TABLE `Cliente` (
  `ID_Cliente` INT NOT NULL,
  `Nombre` VARCHAR(100) NOT NULL,
  `Telefono` VARCHAR(8) NOT NULL,
  `Correo` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`ID_Cliente`)
);

CREATE TABLE `Cita` (
  `ID_Cita` INT NOT NULL AUTO_INCREMENT,
  `Cliente_ID` INT,
  `Empleado_ID` INT,
  PRIMARY KEY (`ID_Cita`),
  FOREIGN KEY (`Empleado_ID`) REFERENCES `Empleado`(`ID_Empleado`),
  FOREIGN KEY (`Cliente_ID`) REFERENCES `Cliente`(`ID_Cliente`)
);

CREATE TABLE `Servicios` (
  `ID_Servicio` VARCHAR(100),
  `Nombre` VARCHAR(100) NOT NULL,
  `Producto_ID` INT,
  PRIMARY KEY (`ID_Servicio`),
  FOREIGN KEY (`Producto_ID`) REFERENCES `Producto`(`ID_Porducto`)
);

CREATE TABLE `Detalles_Cita` (
  `Cita_ID` INT,
  `Servicio_ID` VARCHAR(100),
  `Precio` INT NOT NULL,
  `Descripcion` VARCHAR(100) NOT NULL,
  `Fecha/Hora` timestamp NOT NULL,
  FOREIGN KEY (`Cita_ID`) REFERENCES `Cita`(`ID_Cita`),
  FOREIGN KEY (`Servicio_ID`) REFERENCES `Servicios`(`ID_Servicio`)
);

CREATE TABLE `KAI` (
  `ID_KAI` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`ID_KAI`)
);

CREATE TABLE `Factura` (
  `ID_Factura` INT NOT NULL,
  `KAI_ID` VARCHAR(100),
  `Cita_ID` INT,
  `Cliente_ID` INT,
  `Fecha` timestamp NOT NULL,
  `Precio` INT NOT NULL,
  PRIMARY KEY (`ID_Factura`),
  FOREIGN KEY (`KAI_ID`) REFERENCES `KAI`(`ID_KAI`),
  FOREIGN KEY (`Fecha`) REFERENCES `Cliente`(`ID_Cliente`)
);

CREATE TABLE `Producto_Venta` (
  `Producto_ID` INT,
  `Factura_ID` INT,
  `Cantidad` INT NOT NULL,
  FOREIGN KEY (`Producto_ID`) REFERENCES `Producto`(`ID_Porducto`),
  FOREIGN KEY (`Factura_ID`) REFERENCES `Factura`(`ID_Factura`)
);