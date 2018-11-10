using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAppAng.Models;

namespace WebAppAng.Data
{
    public class SantaDbContext : IdentityDbContext<IdentityUser>
    {
        public SantaDbContext(DbContextOptions<SantaDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            #region "Seed Data"

            builder.Entity<IdentityRole>().HasData(
                new { Id = "1", Name = "Admin", NormalizedName = "ADMIN" },
                new { Id = "2", Name = "Child", NormalizedName = "CHILD" }
            );

            #endregion
        }

        public DbSet<Child> Children { get; set; }
    }
}
