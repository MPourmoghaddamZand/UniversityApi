using Microsoft.EntityFrameworkCore;
using UniversityApi.Model;

namespace UniversityApi.Data
{
    public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
    {
        public DbSet<Student> Students { get; set; }
    }
}