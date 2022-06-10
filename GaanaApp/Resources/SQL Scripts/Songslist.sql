USE [GaanaDB]
GO

/****** Object:  Table [dbo].[Songslist]    Script Date: 10-06-2022 12:45:34 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Songslist](
	[songid] [int] IDENTITY(1,1) NOT NULL,
	[songname] [nvarchar](50) NULL,
	[image] [nvarchar](max) NULL,
	[ratings] [nvarchar](50) NULL,
	[artistid] [int] NOT NULL,
	[userid] [int] NOT NULL,
	[deleted] [bit] NULL,
 CONSTRAINT [PK_Songslist] PRIMARY KEY CLUSTERED 
(
	[songid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[Songslist]  WITH CHECK ADD  CONSTRAINT [FK_Songslist_Artist] FOREIGN KEY([artistid])
REFERENCES [dbo].[Artist] ([artistid])
GO

ALTER TABLE [dbo].[Songslist] CHECK CONSTRAINT [FK_Songslist_Artist]
GO

ALTER TABLE [dbo].[Songslist]  WITH CHECK ADD  CONSTRAINT [FK_Songslist_User] FOREIGN KEY([userid])
REFERENCES [dbo].[User] ([userid])
GO

ALTER TABLE [dbo].[Songslist] CHECK CONSTRAINT [FK_Songslist_User]
GO


