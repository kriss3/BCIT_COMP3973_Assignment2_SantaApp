using System;
using System.ComponentModel.DataAnnotations;

namespace WebAppAng.Models
{
    public class Child
    {
        [Required]
        public int Id { get; set; }
        [Display(Name="First Name")]
        [Required]
        public string FirstName { get; set; }
        [Display(Name = "Last Name")]
        [MinLength(5)]
        [Required]
        public string LastName { get; set; }
        [Display(Name = "Date of Birth")]
        public DateTime BirthDate { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string Province { get; set; }
        [Display(Name = "Post Code")]
        public string PostalCode { get; set; }
        public string Country { get; set; }
        [Required]
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        [Display(Name = "Naughty?")]
        public bool IsNaughty { get; set; } = false;
        [Display(Name = "Created Date")]
        public DateTime DateCreated { get; set; } = DateTime.UtcNow;
        [Display(Name = "Created By")]
        public Guid CreatedBy { get; set; } = Guid.NewGuid();
    }
}
