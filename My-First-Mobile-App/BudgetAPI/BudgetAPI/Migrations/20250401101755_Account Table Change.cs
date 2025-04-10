using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace BudgetAPI.Migrations
{
    /// <inheritdoc />
    public partial class AccountTableChange : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Account_Balance_BalanceId",
                table: "Account");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Account",
                table: "Account");

            migrationBuilder.DropIndex(
                name: "IX_Account_BalanceId",
                table: "Account");

            migrationBuilder.DropColumn(
                name: "Amount",
                table: "Account");

            migrationBuilder.RenameColumn(
                name: "Liabilities",
                table: "Account",
                newName: "Balance");

            migrationBuilder.RenameColumn(
                name: "BalanceId",
                table: "Account",
                newName: "Id");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Account",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Account",
                table: "Account",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Account_UserId",
                table: "Account",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Account",
                table: "Account");

            migrationBuilder.DropIndex(
                name: "IX_Account_UserId",
                table: "Account");

            migrationBuilder.RenameColumn(
                name: "Balance",
                table: "Account",
                newName: "Liabilities");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Account",
                newName: "BalanceId");

            migrationBuilder.AlterColumn<int>(
                name: "BalanceId",
                table: "Account",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddColumn<double>(
                name: "Amount",
                table: "Account",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Account",
                table: "Account",
                columns: new[] { "UserId", "BalanceId" });

            migrationBuilder.CreateIndex(
                name: "IX_Account_BalanceId",
                table: "Account",
                column: "BalanceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Account_Balance_BalanceId",
                table: "Account",
                column: "BalanceId",
                principalTable: "Balance",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
