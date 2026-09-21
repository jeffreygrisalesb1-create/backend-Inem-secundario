CREATE TABLE IF NOT EXISTS CategoriaProductos (
    CatPro_id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(150) NOT NULL,
    PRIMARY KEY (CatPro_id)
);

INSERT IGNORE INTO CategoriaProductos (CatPro_id, nombre) VALUES
    (1, 'Accesorio'),
    (2, 'Repuesto'),
    (3, 'Limpieza');
