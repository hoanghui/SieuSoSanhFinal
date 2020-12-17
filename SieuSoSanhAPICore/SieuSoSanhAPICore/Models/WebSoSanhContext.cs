using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace SieuSoSanhAPICore.Models
{
    public partial class WebSoSanhContext : DbContext
    {
        public WebSoSanhContext()
        {
        }

        public WebSoSanhContext(DbContextOptions<WebSoSanhContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<CategoryProperty> CategoryProperties { get; set; }
        public virtual DbSet<Company> Companies { get; set; }
        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<ProductProperty> ProductProperties { get; set; }
        public virtual DbSet<Property> Properties { get; set; }
        public virtual DbSet<Supplier> Suppliers { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=HOANGHUY\\HOANGHUYSQL;Database=WebSoSanh;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Category>(entity =>
            {
                entity.Property(e => e.CategoryId).HasColumnName("CategoryID");

                entity.Property(e => e.CategoryCode)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.CategoryName).HasMaxLength(50);
            });

            modelBuilder.Entity<CategoryProperty>(entity =>
            {
                entity.HasKey(e => new { e.CategoryId, e.PropertyId })
                    .HasName("PK__Category__5E05A05E20694EF5");

                entity.ToTable("CategoryProperty");

                entity.Property(e => e.CategoryId).HasColumnName("CategoryID");

                entity.Property(e => e.PropertyId).HasColumnName("PropertyID");

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.CategoryProperties)
                    .HasForeignKey(d => d.CategoryId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__CategoryP__Categ__336AA144");

                entity.HasOne(d => d.Property)
                    .WithMany(p => p.CategoryProperties)
                    .HasForeignKey(d => d.PropertyId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__CategoryP__Prope__345EC57D");
            });

            modelBuilder.Entity<Company>(entity =>
            {
                entity.Property(e => e.CompanyId).HasColumnName("CompanyID");

                entity.Property(e => e.CompanyImage).IsUnicode(false);

                entity.Property(e => e.CompanyName).HasMaxLength(50);
            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.Property(e => e.ProductId).HasColumnName("ProductID");

                entity.Property(e => e.CategoryId).HasColumnName("CategoryID");

                entity.Property(e => e.CompanyId).HasColumnName("CompanyID");

                entity.Property(e => e.HyperLink).IsUnicode(false);

                entity.Property(e => e.LinkOfProductImage).IsUnicode(false);

                entity.Property(e => e.ProductName).HasMaxLength(100);

                entity.Property(e => e.SupplierId).HasColumnName("SupplierID");

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.Products)
                    .HasForeignKey(d => d.CategoryId)
                    .HasConstraintName("FK__Products__Catego__2EA5EC27");

                entity.HasOne(d => d.Company)
                    .WithMany(p => p.Products)
                    .HasForeignKey(d => d.CompanyId)
                    .HasConstraintName("FK__Products__Compan__2F9A1060");

                entity.HasOne(d => d.Supplier)
                    .WithMany(p => p.Products)
                    .HasForeignKey(d => d.SupplierId)
                    .HasConstraintName("FK__Products__Suppli__308E3499");
            });

            modelBuilder.Entity<ProductProperty>(entity =>
            {
                entity.HasKey(e => new { e.ProductId, e.PropertyId })
                    .HasName("PK__ProductP__F3005C987F5C077A");

                entity.ToTable("ProductProperty");

                entity.Property(e => e.ProductId).HasColumnName("ProductID");

                entity.Property(e => e.PropertyId).HasColumnName("PropertyID");

                entity.Property(e => e.ValueAsString).HasMaxLength(50);

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.ProductProperties)
                    .HasForeignKey(d => d.ProductId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__ProductPr__Value__373B3228");

                entity.HasOne(d => d.Property)
                    .WithMany(p => p.ProductProperties)
                    .HasForeignKey(d => d.PropertyId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__ProductPr__Prope__382F5661");
            });

            modelBuilder.Entity<Property>(entity =>
            {
                entity.Property(e => e.PropertyId).HasColumnName("PropertyID");

                entity.Property(e => e.PropertyName).HasMaxLength(50);
            });

            modelBuilder.Entity<Supplier>(entity =>
            {
                entity.Property(e => e.SupplierId)
                    .ValueGeneratedNever()
                    .HasColumnName("SupplierID");

                entity.Property(e => e.SupplierName).HasMaxLength(50);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
