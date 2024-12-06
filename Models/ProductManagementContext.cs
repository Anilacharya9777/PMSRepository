using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using PMS.DTOs;

namespace PMS.Models
{
    public partial class ProductManagementContext : DbContext
    {
        public ProductManagementContext()
        {
        }

        public ProductManagementContext(DbContextOptions<ProductManagementContext> options)
            : base(options)
        {
        }

        public virtual DbSet<BrandMaster> BrandMasters { get; set; } = null!;
        public virtual DbSet<CategoryMaster> CategoryMasters { get; set; } = null!;
        public virtual DbSet<ProductMaster> ProductMasters { get; set; } = null!;
        public virtual DbSet<ProductQuantityLog> ProductQuantityLogs { get; set; } = null!;
        public virtual DbSet<ProductTransactionDetail> ProductTransactionDetails { get; set; } = null!;
        public virtual DbSet<ProductTypeMaster> ProductTypeMasters { get; set; } = null!;
        public virtual DbSet<QuantityMaster> QuantityMasters { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Name=MyConnection");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Explicitly configure Dto as keyless
            modelBuilder.Entity<BrandDetailsDto>().HasNoKey();
            modelBuilder.Entity<ProductDetails>().HasNoKey();
            modelBuilder.Entity<ProductTypeDetailsDto>().HasNoKey();
            modelBuilder.Entity<ProductTransactionDto>().HasNoKey();
            modelBuilder.Entity<ProductTransactionDetailsDto>().HasNoKey();
            modelBuilder.Entity<ProductTransactionListDtos>().HasNoKey();
            modelBuilder.Entity<ProductDetailsByBarcodeDtos>().HasNoKey();

            modelBuilder.Entity<BrandMaster>(entity =>
            {
                entity.HasKey(e => e.BrandId);

                entity.ToTable("Brand_Master");

                entity.Property(e => e.BrandId).HasColumnName("Brand_Id");

                entity.Property(e => e.BrandName)
                    .HasMaxLength(150)
                    .HasColumnName("Brand_Name");

                entity.Property(e => e.CategoryId).HasColumnName("Category_Id");

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.BrandMasters)
                    .HasForeignKey(d => d.CategoryId)
                    .HasConstraintName("FK_Brand_Master_Category_Master");
            });

            modelBuilder.Entity<CategoryMaster>(entity =>
            {
                entity.HasKey(e => e.CategoryId);

                entity.ToTable("Category_Master");

                entity.Property(e => e.CategoryId).HasColumnName("Category_Id");

                entity.Property(e => e.CategoryName)
                    .HasMaxLength(150)
                    .HasColumnName("Category_Name");
            });

            modelBuilder.Entity<ProductMaster>(entity =>
            {
                entity.HasKey(e => e.ProductId);

                entity.ToTable("Product_Master");

                entity.Property(e => e.ProductId).HasColumnName("Product_Id");

                entity.Property(e => e.ProductName)
                    .HasMaxLength(150)
                    .HasColumnName("Product_Name");

                entity.Property(e => e.ProductTypeId).HasColumnName("Product_Type_Id");

                entity.HasOne(d => d.ProductType)
                    .WithMany(p => p.ProductMasters)
                    .HasForeignKey(d => d.ProductTypeId)
                    .HasConstraintName("FK_Product_Master_Product_Type_Master");
            });

            modelBuilder.Entity<ProductQuantityLog>(entity =>
            {
                entity.HasKey(e => e.LogId);

                entity.ToTable("Product_Quantity_Log");

                entity.Property(e => e.LogId).HasColumnName("Log_Id");

                entity.Property(e => e.AvailableQuantity).HasColumnName("Available_Quantity");

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(100)
                    .HasColumnName("Created_By");

                entity.Property(e => e.CreatedDate).HasColumnName("Created_Date");

                entity.Property(e => e.PreviousQuantity).HasColumnName("Previous_Quantity");

                entity.Property(e => e.ProductId).HasColumnName("Product_Id");

                entity.Property(e => e.TransactionDate).HasColumnName("Transaction_Date");

                entity.Property(e => e.TransactionQuantity).HasColumnName("Transaction_Quantity");

                entity.Property(e => e.TransactionType)
                    .HasMaxLength(150)
                    .HasColumnName("Transaction_Type");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.ProductQuantityLogs)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK_Product_Quantity_Log_Product_Master");
            });

            modelBuilder.Entity<ProductTransactionDetail>(entity =>
            {
                entity.HasKey(e => e.TransactionId);

                entity.ToTable("Product_Transaction_Details");

                entity.Property(e => e.TransactionId).HasColumnName("Transaction_Id");

                entity.Property(e => e.BarcodeNo)
                    .HasMaxLength(200)
                    .HasColumnName("Barcode_No");

                entity.Property(e => e.PerchaseQuantity).HasColumnName("Perchase_Quantity");

                entity.Property(e => e.ProductId).HasColumnName("Product_Id");

                entity.Property(e => e.PurchasePrice)
                    .HasColumnType("decimal(10, 2)")
                    .HasColumnName("Purchase_Price");

                entity.Property(e => e.PurchaseSellDate).HasColumnName("Purchase_Sell_Date");

                entity.Property(e => e.RackNo)
                    .HasMaxLength(50)
                    .HasColumnName("Rack_No");

                entity.Property(e => e.SellingPrice)
                    .HasColumnType("decimal(10, 2)")
                    .HasColumnName("Selling_Price");

                entity.Property(e => e.ShelfNo)
                    .HasMaxLength(50)
                    .HasColumnName("Shelf_No");

                entity.Property(e => e.TransactionDate).HasColumnName("Transaction_Date");

                entity.Property(e => e.TransactionType)
                    .HasMaxLength(50)
                    .HasColumnName("Transaction_Type");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.ProductTransactionDetails)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK_Product_Transaction_Details_Product_Transaction_Details");
            });

            modelBuilder.Entity<ProductTypeMaster>(entity =>
            {
                entity.HasKey(e => e.ProductTypeId);

                entity.ToTable("Product_Type_Master");

                entity.Property(e => e.ProductTypeId).HasColumnName("Product_Type_Id");

                entity.Property(e => e.BrandId).HasColumnName("Brand_Id");

                entity.Property(e => e.ProductType)
                    .HasMaxLength(150)
                    .HasColumnName("Product_Type");

                entity.HasOne(d => d.Brand)
                    .WithMany(p => p.ProductTypeMasters)
                    .HasForeignKey(d => d.BrandId)
                    .HasConstraintName("FK_Product_Type_Master_Brand_Master");
            });

            modelBuilder.Entity<QuantityMaster>(entity =>
            {
                entity.HasKey(e => e.QuantityId);

                entity.ToTable("Quantity_Master");

                entity.Property(e => e.QuantityId).HasColumnName("Quantity_Id");

                entity.Property(e => e.LastUpdatedDate).HasColumnName("LastUpdated_Date");

                entity.Property(e => e.OnhandQuantity).HasColumnName("Onhand_Quantity");

                entity.Property(e => e.ProductId).HasColumnName("Product_Id");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.QuantityMasters)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK_Quantity_Master_Product_Master");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
