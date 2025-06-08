using Microsoft.EntityFrameworkCore;
using UniversityApi.Model;

namespace UniversityApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Student> Students { get; set; }
    }
}