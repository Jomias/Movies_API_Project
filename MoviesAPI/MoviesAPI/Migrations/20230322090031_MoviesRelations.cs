using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MoviesAPI.Migrations
{
    /// <inheritdoc />
    public partial class MoviesRelations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MovieGenres_Genres_GenreID",
                table: "MovieGenres");

            migrationBuilder.RenameColumn(
                name: "GenreID",
                table: "MovieGenres",
                newName: "GenreId");

            migrationBuilder.AddForeignKey(
                name: "FK_MovieGenres_Genres_GenreId",
                table: "MovieGenres",
                column: "GenreId",
                principalTable: "Genres",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MovieGenres_Genres_GenreId",
                table: "MovieGenres");

            migrationBuilder.RenameColumn(
                name: "GenreId",
                table: "MovieGenres",
                newName: "GenreID");

            migrationBuilder.AddForeignKey(
                name: "FK_MovieGenres_Genres_GenreID",
                table: "MovieGenres",
                column: "GenreID",
                principalTable: "Genres",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
