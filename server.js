// Framework principal
const express = require('express');
const db = require('./config/database');
const path = require('path');

// Permite peticiones desde otros dominios
const cors = require('cors');

const app = express();

// Middleware para recibir JSON
app.use(express.json());

// Middleware CORS
app.use(cors());

const raizFrontendPrincipal = path.resolve(__dirname, '../../paginaWebINEMVentas');
const raizFormularios = path.resolve(__dirname, '../../Front-2.0/front-Inem-secundario/INEM-VENTAS/front/Proyecto-inem-ventas-fronted');

app.use('/branding', express.static(path.join(raizFrontendPrincipal, 'assets', 'branding')));
app.get('/formularios-gerente.html', (req, res) => {
    res.sendFile(path.join(raizFrontendPrincipal, 'formularios-gerente.html'));
});
app.use('/formularios', express.static(raizFormularios));

// Importar rutas
const categoriaProductosRoutes = require('./routes/CategoriaProductos.routes');
const CategoriasRoutes = require('./routes/Categorias.routes');
const CiudadesRoutes = require('./routes/Ciudades.routes');
const ClientesRoutes = require('./routes/Clientes.routes');
const ComprasRoutes = require('./routes/Compras.routes');
const CPRoutes = require('./routes/CP.routes');
const CvRoutes = require('./routes/Cv.routes');
const EmpleadosRoutes = require('./routes/Empleados.routes');
const EnviosRoutes = require('./routes/Envios.routes');
const PaisesRoutes = require('./routes/Paises.routes');
const productosRoutes = require('./routes/productos.routes');
const TransportadorasRoutes = require('./routes/transportadoras.routes');
const VehiculosRoutes = require('./routes/vehiculos.routes');

// Registrar rutas
app.use('/api/categoriaProductos', categoriaProductosRoutes);

app.use('/api/categorias', CategoriasRoutes);

app.use('/api/ciudades', CiudadesRoutes);

app.use('/api/clientes', ClientesRoutes);

app.use('/api/compras', ComprasRoutes);

app.use('/api/cp', CPRoutes);

app.use('/api/cv', CvRoutes);

app.use('/api/empleados', EmpleadosRoutes);

app.use('/api/envios', EnviosRoutes);

app.use('/api/paises', PaisesRoutes);

app.use('/api/productos', productosRoutes);

app.use('/api/transportadoras', TransportadorasRoutes);
app.use('/api/Transportadoras', TransportadorasRoutes);

app.use('/api/vehiculos', VehiculosRoutes);
app.use('/api/Vehiculos', VehiculosRoutes);

// Puerto del servidor
const PORT = 3000;

const iniciarServidor = async () => {
    await db.query(`
        CREATE TABLE IF NOT EXISTS CategoriaProductos (
            CatPro_id INT NOT NULL AUTO_INCREMENT,
            nombre VARCHAR(150) NOT NULL,
            PRIMARY KEY (CatPro_id)
        )
    `);

    const [columnasEnvios] = await db.query(`
        SELECT COLUMN_NAME
        FROM information_schema.COLUMNS
        WHERE TABLE_SCHEMA = DATABASE()
          AND TABLE_NAME = 'Envios'
          AND COLUMN_NAME = 'Descripcion'
    `);
    if (columnasEnvios.length === 0) {
        await db.query('ALTER TABLE Envios ADD COLUMN Descripcion VARCHAR(255) NULL');
    }

    app.listen(PORT, () => {
        console.log(`Servidor ejecutándose en puerto ${PORT}`);
    });
};

iniciarServidor().catch((error) => {
    console.error('No fue posible iniciar el servidor:', error.message);
    process.exit(1);
});