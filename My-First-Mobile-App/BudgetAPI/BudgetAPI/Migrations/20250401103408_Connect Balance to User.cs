using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BudgetAPI.Migrations
{
    /// <inheritdoc />
    public partial class ConnectBalancetoUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Balance",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Balance_UserId",
                table: "Balance",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Balance_User_UserId",
                table: "Balance",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Balance_User_UserId",
                table: "Balance");

            migrationBuilder.DropIndex(
                name: "IX_Balance_UserId",
                table: "Balance");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Balance");
        }
    }
}
