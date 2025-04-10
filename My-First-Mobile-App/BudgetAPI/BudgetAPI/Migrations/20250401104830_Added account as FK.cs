using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BudgetAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddedaccountasFK : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Balance_User_UserId",
                table: "Balance");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Balance",
                newName: "AccountId");

            migrationBuilder.RenameIndex(
                name: "IX_Balance_UserId",
                table: "Balance",
                newName: "IX_Balance_AccountId");

            migrationBuilder.AddForeignKey(
                name: "FK_Balance_Account_AccountId",
                table: "Balance",
                column: "AccountId",
                principalTable: "Account",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Balance_Account_AccountId",
                table: "Balance");

            migrationBuilder.RenameColumn(
                name: "AccountId",
                table: "Balance",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Balance_AccountId",
                table: "Balance",
                newName: "IX_Balance_UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Balance_User_UserId",
                table: "Balance",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
