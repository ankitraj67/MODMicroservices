using Microsoft.EntityFrameworkCore.Migrations;

namespace MentorOnDemand.Migrations
{
    public partial class ecoa : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EnrollCourses_AspNetUsers_UserId",
                table: "EnrollCourses");

            migrationBuilder.DropIndex(
                name: "IX_EnrollCourses_UserId",
                table: "EnrollCourses");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "EnrollCourses");

            migrationBuilder.AlterColumn<string>(
                name: "Timing",
                table: "EnrollCourses",
                maxLength: 50,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "EnrollCourses",
                maxLength: 50,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Fee",
                table: "EnrollCourses",
                maxLength: 50,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Details",
                table: "EnrollCourses",
                maxLength: 50,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MentorEmail",
                table: "EnrollCourses",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "EnrollCourses",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "StudentEmail",
                table: "EnrollCourses",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1",
                column: "ConcurrencyStamp",
                value: "d9f944ec-9a41-477f-8701-c00c6a2446c0");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2",
                column: "ConcurrencyStamp",
                value: "cd42ecf9-cbc3-43de-8c55-a82c4f40004b");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3",
                column: "ConcurrencyStamp",
                value: "b497bff4-fdb9-4c68-b336-a6233f1eb4dc");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MentorEmail",
                table: "EnrollCourses");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "EnrollCourses");

            migrationBuilder.DropColumn(
                name: "StudentEmail",
                table: "EnrollCourses");

            migrationBuilder.AlterColumn<string>(
                name: "Timing",
                table: "EnrollCourses",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 50);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "EnrollCourses",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 50);

            migrationBuilder.AlterColumn<string>(
                name: "Fee",
                table: "EnrollCourses",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 50);

            migrationBuilder.AlterColumn<string>(
                name: "Details",
                table: "EnrollCourses",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 50);

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "EnrollCourses",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1",
                column: "ConcurrencyStamp",
                value: "b52959f3-f1ff-416c-b2d2-b9069d5e1500");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2",
                column: "ConcurrencyStamp",
                value: "2ff7b030-f74e-4e1e-90d7-61d668ffb0aa");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3",
                column: "ConcurrencyStamp",
                value: "71a2f68b-f434-40ca-adaa-1b50c613b095");

            migrationBuilder.CreateIndex(
                name: "IX_EnrollCourses_UserId",
                table: "EnrollCourses",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_EnrollCourses_AspNetUsers_UserId",
                table: "EnrollCourses",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
