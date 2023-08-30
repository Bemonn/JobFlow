// Sample data for seeding the employees table
const employeeData = [
  {
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    password: "password123", // This password should be hashed during creation in the model
    position: 1,
    profile_pic_link: "www.linkedIn.com/johnDoe",
  },
  {
    first_name: "Jane",
    last_name: "Smith",
    email: "jane.smith@example.com",
    password: "password456",
    position: 2,
    profile_pic_link: "www.linkedIn.com/janeSmith",
  },
  {
    first_name: "Michael",
    last_name: "Johnson",
    email: "michael.johnson@example.com",
    password: "pass123",
    position: 1,
    profile_pic_link: "www.linkedIn.com/michaelJohnson",
  },
  {
    first_name: "Emily",
    last_name: "Williams",
    email: "emily.williams@example.com",
    password: "emilypass",
    position: 3,
    profile_pic_link: "www.linkedIn.com/emilyWilliams",
  },
  {
    first_name: "David",
    last_name: "Brown",
    email: "david.brown@example.com",
    password: "dbrownpw",
    position: 2,
    profile_pic_link: "www.linkedIn.com/davidBrown",
  },
  {
    first_name: "Olivia",
    last_name: "Miller",
    email: "olivia.miller@example.com",
    password: "olivia123",
    position: 1,
    profile_pic_link: "www.linkedIn.com/oliviaMiller",
  },
  {
    first_name: "Daniel",
    last_name: "Davis",
    email: "daniel.davis@example.com",
    password: "davispw",
    position: 3,
    profile_pic_link: "www.linkedIn.com/danielDavis",
  },
  {
    first_name: "Sophia",
    last_name: "Martinez",
    email: "sophia.martinez@example.com",
    password: "sophiapass",
    position: 2,
    profile_pic_link: "www.linkedIn.com/sophiaMartinez",
  },
];

module.exports = employeeData;
