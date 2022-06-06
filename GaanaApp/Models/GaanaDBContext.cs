using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace GaanaApp.Models
{
    public partial class GaanaDBContext : DbContext
    {
        public GaanaDBContext()
        {
        }

        public GaanaDBContext(DbContextOptions<GaanaDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Artist> Artists { get; set; }
        public virtual DbSet<Songslist> Songslists { get; set; }
        public virtual DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=DESKTOP-0K4TUC1\\SQLEXPRESS;Initial Catalog=GaanaDB;Integrated Security=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Artist>(entity =>
            {
                entity.ToTable("Artist");

                entity.Property(e => e.Artistid).HasColumnName("artistid");

                entity.Property(e => e.Artistname)
                    .HasMaxLength(50)
                    .HasColumnName("artistname");

                entity.Property(e => e.Deleted).HasColumnName("deleted");

                entity.Property(e => e.Dob)
                    .HasMaxLength(50)
                    .HasColumnName("DOB");
            });

            modelBuilder.Entity<Songslist>(entity =>
            {
                entity.HasKey(e => e.Songid);

                entity.ToTable("Songslist");

                entity.Property(e => e.Songid).HasColumnName("songid");

                entity.Property(e => e.Artistid).HasColumnName("artistid");

                entity.Property(e => e.Artistname)
                    .HasMaxLength(50)
                    .HasColumnName("artistname");

                entity.Property(e => e.Deleted).HasColumnName("deleted");

                entity.Property(e => e.Image).HasColumnName("image");

                entity.Property(e => e.Ratings)
                    .HasMaxLength(50)
                    .HasColumnName("ratings");

                entity.Property(e => e.Songname)
                    .HasMaxLength(50)
                    .HasColumnName("songname");

                entity.Property(e => e.Userid).HasColumnName("userid");

                entity.HasOne(d => d.Artist)
                    .WithMany(p => p.Songslists)
                    .HasForeignKey(d => d.Artistid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Songslist_Artist");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Songslists)
                    .HasForeignKey(d => d.Userid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Songslist_User");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("User");

                entity.Property(e => e.Userid).HasColumnName("userid");

                entity.Property(e => e.Deleted).HasColumnName("deleted");

                entity.Property(e => e.Email)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("email");

                entity.Property(e => e.Password)
                    .HasMaxLength(50)
                    .HasColumnName("password");

                entity.Property(e => e.Username)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("username");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
