﻿using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAppAng.Models;

namespace WebAppAng.Data
{
    public class DummyData
    {
        public static void Initialize(IApplicationBuilder app, SantaDbContext ctx,
                                                RoleManager<IdentityRole> roleManager,
                                                UserManager<IdentityUser> userManager)
        {
            using (var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetService<SantaDbContext>();
                context.Database.EnsureCreated();
                //context.Database.Migrate();

                // Look for any ailments
                if (context.Children != null && context.Children.Any())
                    return;   // DB has already been seeded

                var children = GetChildren().ToArray();
                context.Children.AddRange(children);
                GetUsersWithRoles(ctx, roleManager, userManager).Wait();
                context.SaveChanges();
            }
        }

        public static async Task GetUsersWithRoles(SantaDbContext context,
                                                             RoleManager<IdentityRole> roleManager,
                                                             UserManager<IdentityUser> userManager)
        {
            //context.Database.EnsureCreated();

            String adminId1 = "";
            String adminId2 = "";

            string role1 = "Admin";
            string role2 = "Child";

            string password = "P@$$w0rd";

            if (await roleManager.FindByNameAsync(role1) == null)
            {
                await roleManager.CreateAsync(new IdentityRole(role1));
            }

            if (await roleManager.FindByNameAsync(role2) == null)
            {
                await roleManager.CreateAsync(new IdentityRole(role2));
            }

            if (await userManager.FindByNameAsync("aa") == null)
            {
                var user = new IdentityUser
                {
                    UserName = "aa",
                    Email = "aa@aa.aa"
                };

                var result = await userManager.CreateAsync(user);
                if (result.Succeeded)
                {
                    await userManager.AddPasswordAsync(user, password);
                    await userManager.AddToRoleAsync(user, role1);
                }
                adminId1 = user.Id;
            }

            if (await userManager.FindByNameAsync("bb") == null)
            {
                var user = new IdentityUser
                {
                    UserName = "bb",
                    Email = "bb@bb.bb"
                };

                var result = await userManager.CreateAsync(user);
                if (result.Succeeded)
                {
                    await userManager.AddPasswordAsync(user, password);
                    await userManager.AddToRoleAsync(user, role1);
                }
                adminId2 = user.Id;
            }

            if (await userManager.FindByNameAsync("mm") == null)
            {
                var user = new IdentityUser
                {
                    UserName = "mm",
                    Email = "mm@mm.mm"                };

                var result = await userManager.CreateAsync(user);
                if (result.Succeeded)
                {
                    await userManager.AddPasswordAsync(user, password);
                    await userManager.AddToRoleAsync(user, role2);
                }
            }

            if (await userManager.FindByNameAsync("dd") == null)
            {
                var user = new IdentityUser
                {
                    UserName = "dd",
                    Email = "dd@dd.dd"
                };

                var result = await userManager.CreateAsync(user);
                if (result.Succeeded)
                {
                    await userManager.AddPasswordAsync(user, password);
                    await userManager.AddToRoleAsync(user, role2);
                }
            }

            if (await userManager.FindByNameAsync("santa") == null)
            {
                var user = new IdentityUser
                {
                    UserName = "santa",
                    Email = "santa@np.com"
                };

                var result = await userManager.CreateAsync(user);
                if (result.Succeeded)
                {
                    await userManager.AddPasswordAsync(user, password);
                    await userManager.AddToRoleAsync(user, role1);
                }
            }

            if (await userManager.FindByNameAsync("tim") == null)
            {
                var user = new IdentityUser
                {
                    UserName = "tim",
                    Email = "tim@np.com"
                };

                var result = await userManager.CreateAsync(user);
                if (result.Succeeded)
                {
                    await userManager.AddPasswordAsync(user, password);
                    await userManager.AddToRoleAsync(user, role2);
                }
            }
        }

        public static List<Child> GetChildren()
        {
            return new List<Child>()
            {
                new Child
                {
                    Id = 10,
                    FirstName ="Mike",
                    LastName ="Black",
                    BirthDate  = new DateTime(2000,1,15),
                    Street ="Columbia Street",
                    City = "Vancouver", 
                    Province ="British Columbia",
                    PostalCode ="V5Y 0B7",
                    Country = "Canada",
                    Latitude = 49.246292,
                    Longitude = -123.116226
                },
                new Child
                {
                    Id = 20,
                    FirstName ="Barry",
                    LastName ="Allen",
                    BirthDate  = new DateTime(2000,2,10),
                    Street ="2 Sir Winston Churchill Sq.",
                    City = "Edmonton",
                    Province ="Alberta",
                    PostalCode ="T5J 2C1",
                    Country = "Canada",
                    Latitude = 53.545055,
                    Longitude = -113.488731
                },
                new Child
                {
                    Id = 30,
                    FirstName ="Ronda",
                    LastName ="Mars",
                    BirthDate  = new DateTime(2000,3,30),
                    Street ="555 Seymore St.",
                    City = "Vancouver",
                    Province ="British Columbia",
                    PostalCode ="V6B 3H6",
                    Country = "Canada",
                    Latitude = 49.283647,
                    Longitude = -123.115276

                },
                new Child
                {
                    Id = 40,
                    FirstName ="Natalie",
                    LastName ="Portman",
                    BirthDate  = new DateTime(2000,4,20),
                    Street ="1872 Merivale Rd",
                    City = "Nepean",
                    Province ="Ontario",
                    PostalCode ="K2G 1E6",
                    Country = "Canada",
                    Latitude = 45.333745,
                    Longitude = -75.724502
                },
                new Child
                {
                    Id = 50,
                    FirstName ="Michael",
                    LastName ="Douglas",
                    BirthDate  = new DateTime(2000,5,26),
                    Street ="288 Waterloo St",
                    City = "Winnipeg",
                    Province ="Manitoba",
                    PostalCode ="R3N 0S6",
                    Country = "Canada",
                    Latitude = 49.870043,
                    Longitude = -97.183735
                }
            };
        }
    }
}
