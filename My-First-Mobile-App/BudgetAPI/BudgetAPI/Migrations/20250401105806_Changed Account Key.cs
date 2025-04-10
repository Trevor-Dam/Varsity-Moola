using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BudgetAPI.Migrations
{
    /// <inheritdoc />
    public partial class ChangedAccountKey : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Account",
                newName: "AccountId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "AccountId",
                table: "Account",
                newName: "Id");
        }
    }
}
