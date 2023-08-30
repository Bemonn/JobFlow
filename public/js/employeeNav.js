//delete employee

document.addEventListener("DOMContentLoaded", () => {
  const deleteEmployee = document.querySelectorAll(".delete-employee");

  deleteEmployee.forEach((button) => {
    button.addEventListener("click", (e) => {
      const id = e.target.getAttribute("data-id");

      fetch(`/api/employee/${id}`, {
        method: "DELETE",
      }).then((res) => {
        window.location.reload();
      });
    });
  });
});

// view employee information and navigate to their worksheet
