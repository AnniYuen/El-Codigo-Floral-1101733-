USE [master]
GO
/****** Object:  Database [db_elcodigofloral]    Script Date: 12/16/2024 8:08:37 PM ******/
CREATE DATABASE [db_elcodigofloral]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'db_elcodigofloral', FILENAME = N'D:\SQL SERVER 2022\MSSQL16.MSSQLSERVER\MSSQL\DATA\db_elcodigofloral.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'db_elcodigofloral_log', FILENAME = N'D:\SQL SERVER 2022\MSSQL16.MSSQLSERVER\MSSQL\DATA\db_elcodigofloral_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [db_elcodigofloral] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [db_elcodigofloral].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [db_elcodigofloral] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [db_elcodigofloral] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [db_elcodigofloral] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [db_elcodigofloral] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [db_elcodigofloral] SET ARITHABORT OFF 
GO
ALTER DATABASE [db_elcodigofloral] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [db_elcodigofloral] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [db_elcodigofloral] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [db_elcodigofloral] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [db_elcodigofloral] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [db_elcodigofloral] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [db_elcodigofloral] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [db_elcodigofloral] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [db_elcodigofloral] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [db_elcodigofloral] SET  ENABLE_BROKER 
GO
ALTER DATABASE [db_elcodigofloral] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [db_elcodigofloral] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [db_elcodigofloral] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [db_elcodigofloral] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [db_elcodigofloral] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [db_elcodigofloral] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [db_elcodigofloral] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [db_elcodigofloral] SET RECOVERY FULL 
GO
ALTER DATABASE [db_elcodigofloral] SET  MULTI_USER 
GO
ALTER DATABASE [db_elcodigofloral] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [db_elcodigofloral] SET DB_CHAINING OFF 
GO
ALTER DATABASE [db_elcodigofloral] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [db_elcodigofloral] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [db_elcodigofloral] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [db_elcodigofloral] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'db_elcodigofloral', N'ON'
GO
ALTER DATABASE [db_elcodigofloral] SET QUERY_STORE = ON
GO
ALTER DATABASE [db_elcodigofloral] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [db_elcodigofloral]
GO
/****** Object:  User [User]    Script Date: 12/16/2024 8:08:37 PM ******/
CREATE USER [User] FOR LOGIN [User] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  DatabaseRole [db_executor]    Script Date: 12/16/2024 8:08:37 PM ******/
CREATE ROLE [db_executor]
GO
ALTER ROLE [db_executor] ADD MEMBER [User]
GO
ALTER ROLE [db_datareader] ADD MEMBER [User]
GO
/****** Object:  Table [dbo].[Categorias]    Script Date: 12/16/2024 8:08:37 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Categorias](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Colores]    Script Date: 12/16/2024 8:08:38 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Colores](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Flores]    Script Date: 12/16/2024 8:08:38 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Flores](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[NombreComun] [varchar](100) NOT NULL,
	[NombreCientifico] [varchar](100) NOT NULL,
	[Simbolismo] [text] NOT NULL,
	[Descripcion] [text] NOT NULL,
	[Origen] [varchar](100) NOT NULL,
	[Imagen] [varchar](200) NOT NULL,
	[CategoriaId] [int] NOT NULL,
	[ColorId] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[Flores]  WITH CHECK ADD FOREIGN KEY([CategoriaId])
REFERENCES [dbo].[Categorias] ([Id])
GO
ALTER TABLE [dbo].[Flores]  WITH CHECK ADD FOREIGN KEY([ColorId])
REFERENCES [dbo].[Colores] ([Id])
GO
/****** Object:  StoredProcedure [dbo].[sp_ObtenerCategorias]    Script Date: 12/16/2024 8:08:38 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Stored Procedure para obtener todas las Categorias
CREATE PROCEDURE [dbo].[sp_ObtenerCategorias]
AS
BEGIN
    SELECT *
    FROM Categorias;
END;

GO
/****** Object:  StoredProcedure [dbo].[sp_ObtenerCategoriasPorNombre]    Script Date: 12/16/2024 8:08:38 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- Stored Procedure para obtener todas las Categorias filtrando por nombre
CREATE PROCEDURE [dbo].[sp_ObtenerCategoriasPorNombre]
    @Nombre VARCHAR(50) = NULL
AS
BEGIN
    SELECT *
    FROM Categorias
    WHERE @Nombre IS NULL OR Nombre LIKE '%' + @Nombre + '%';
END;

GO
/****** Object:  StoredProcedure [dbo].[sp_ObtenerColores]    Script Date: 12/16/2024 8:08:38 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- Stored Procedure para obtener todos los Colores
CREATE PROCEDURE [dbo].[sp_ObtenerColores]
AS
BEGIN
    SELECT *
    FROM Colores;
END;

GO
/****** Object:  StoredProcedure [dbo].[sp_ObtenerColoresPorNombre]    Script Date: 12/16/2024 8:08:38 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- Stored Procedure para obtener todos los Colores filtrando por nombre
CREATE PROCEDURE [dbo].[sp_ObtenerColoresPorNombre]
    @Nombre VARCHAR(50) = NULL
AS
BEGIN
    SELECT *
    FROM Colores
    WHERE @Nombre IS NULL OR Nombre LIKE '%' + @Nombre + '%';
END;

GO
/****** Object:  StoredProcedure [dbo].[sp_ObtenerFlores]    Script Date: 12/16/2024 8:08:38 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- Stored Procedure para obtener todas las Flores
CREATE PROCEDURE [dbo].[sp_ObtenerFlores]
AS
BEGIN
    SELECT f.Id, f.NombreComun, f.NombreCientifico, f.Simbolismo, f.Descripcion, 
           f.Origen, f.Imagen, c.Nombre AS Categoria, co.Nombre AS Color
    FROM Flores f
    INNER JOIN Categorias c ON f.CategoriaId = c.Id
    INNER JOIN Colores co ON f.ColorId = co.Id;
END;

GO
/****** Object:  StoredProcedure [dbo].[sp_ObtenerFloresPorCategoriaYColor]    Script Date: 12/16/2024 8:08:38 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- Stored Procedure para obtener todas las Flores filtrando por categoría y/o color
CREATE PROCEDURE [dbo].[sp_ObtenerFloresPorCategoriaYColor]
    @CategoriaId INT = NULL,
    @ColorId INT = NULL
AS
BEGIN
    SELECT f.Id, f.NombreComun, f.NombreCientifico, f.Simbolismo, f.Descripcion, 
           f.Origen, f.Imagen, c.Nombre AS Categoria, co.Nombre AS Color
    FROM Flores f
    INNER JOIN Categorias c ON f.CategoriaId = c.Id
    INNER JOIN Colores co ON f.ColorId = co.Id
    WHERE (@CategoriaId IS NULL OR f.CategoriaId = @CategoriaId)
      AND (@ColorId IS NULL OR f.ColorId = @ColorId);
END;

GO
/****** Object:  StoredProcedure [dbo].[sp_ObtenerFloresPorFiltros]    Script Date: 12/16/2024 8:08:38 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_ObtenerFloresPorFiltros]
  @CategoriaId INT = NULL,
  @ColorId INT = NULL,
  @Nombre NVARCHAR(100) = NULL
AS
BEGIN
  SELECT f.Id, f.NombreComun, f.NombreCientifico, f.Simbolismo, f.Descripcion, f.Origen, f.Imagen,
         c.Nombre AS Categoria, col.Nombre AS Color
  FROM Flores f
  INNER JOIN Categorias c ON f.CategoriaId = c.Id
  INNER JOIN Colores col ON f.ColorId = col.Id
  WHERE (@CategoriaId IS NULL OR f.CategoriaId = @CategoriaId)
    AND (@ColorId IS NULL OR f.ColorId = @ColorId)
    AND (@Nombre IS NULL OR f.NombreComun LIKE @Nombre);
END;
GO
USE [master]
GO
ALTER DATABASE [db_elcodigofloral] SET  READ_WRITE 
GO
