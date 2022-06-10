USE [GaanaDB]
GO

/****** Object:  Table [dbo].[Artist]    Script Date: 10-06-2022 00:51:23 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Artist](
	[artistid] [int] IDENTITY(1,1) NOT NULL,
	[artistname] [nvarchar](50) NULL,
	[DOB] [nvarchar](50) NULL,
	[Bio] [nvarchar](max) NULL,
	[deleted] [bit] NULL,
 CONSTRAINT [PK_Artist] PRIMARY KEY CLUSTERED 
(
	[artistid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO


