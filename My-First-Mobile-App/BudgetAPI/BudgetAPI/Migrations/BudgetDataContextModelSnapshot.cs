﻿// <auto-generated />
using BudgetAPI.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace BudgetAPI.Migrations
{
    [DbContext(typeof(BudgetDataContext))]
    partial class BudgetDataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("BudgetAPI.Models.Account", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnType("integer");

                    b.Property<int>("BalanceId")
                        .HasColumnType("integer");

                    b.Property<double>("Amount")
                        .HasColumnType("double precision");

                    b.Property<double>("Liabilities")
                        .HasColumnType("double precision");

                    b.Property<double>("Savings")
                        .HasColumnType("double precision");

                    b.Property<double>("Target")
                        .HasColumnType("double precision");

                    b.HasKey("UserId", "BalanceId");

                    b.HasIndex("BalanceId");

                    b.ToTable("Account");
                });

            modelBuilder.Entity("BudgetAPI.Models.Balance", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<double>("AvailableBalance")
                        .HasColumnType("double precision");

                    b.Property<int>("ExpenseId")
                        .HasColumnType("integer");

                    b.Property<int>("IncomeId")
                        .HasColumnType("integer");

                    b.Property<double>("PreviousBalance")
                        .HasColumnType("double precision");

                    b.Property<bool>("ValidTransaction")
                        .HasColumnType("boolean");

                    b.HasKey("Id");

                    b.HasIndex("ExpenseId");

                    b.HasIndex("IncomeId");

                    b.ToTable("Balance");
                });

            modelBuilder.Entity("BudgetAPI.Models.Expense", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("ExpenseCategory")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.Property<double>("MoneyOut")
                        .HasColumnType("double precision");

                    b.Property<string>("Store")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Expense");
                });

            modelBuilder.Entity("BudgetAPI.Models.Income", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("AllowanceType")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<double>("MoneyIn")
                        .HasColumnType("double precision");

                    b.Property<string>("Source")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Income");
                });

            modelBuilder.Entity("BudgetAPI.Models.Users", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.Property<string>("Institution")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Surname")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.HasKey("Id");

                    b.HasIndex("Email")
                        .IsUnique();

                    b.ToTable("User");
                });

            modelBuilder.Entity("BudgetAPI.Models.Account", b =>
                {
                    b.HasOne("BudgetAPI.Models.Balance", "Balance")
                        .WithMany()
                        .HasForeignKey("BalanceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BudgetAPI.Models.Users", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Balance");

                    b.Navigation("User");
                });

            modelBuilder.Entity("BudgetAPI.Models.Balance", b =>
                {
                    b.HasOne("BudgetAPI.Models.Expense", "Expense")
                        .WithMany()
                        .HasForeignKey("ExpenseId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BudgetAPI.Models.Income", "Income")
                        .WithMany()
                        .HasForeignKey("IncomeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Expense");

                    b.Navigation("Income");
                });
#pragma warning restore 612, 618
        }
    }
}
