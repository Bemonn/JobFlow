// Sort the tasks with SortableJS
const cardOpenTaskSortable = new Sortable(cardOpenTask, {
  group: "sharedGroupOne", // set both lists to same group
  animation: 150,
  ghostClass: "blue-background-class",
});
console.log(cardOpenTaskSortable);
const cardInProgressSortable = new Sortable(cardInProgress, {
  group: "sharedGroupOne",
  animation: 150,
  ghostClass: "blue-background-class",
});

const cardCompletedSortable = new Sortable(cardCompleted, {
  group: "sharedGroupOne",
  animation: 150,
  ghostClass: "blue-background-class",
});

const cardGroupSortable = new Sortable(cardGroup, {
  //   group: "sharedGroupTwo",
  animation: 150,
});

// // Select all card elements with the specified class
// const cardElements = document.querySelectorAll("teamTaskBoardCard");

// // Define the function to handle the click event
// function openTaskDetails(event) {
//   const taskId = event.currentTarget.dataset.taskId;
//   fetch(`http://localhost:3000/tasks/${taskId}`)
//     .then((response) => response.json())
//     .then((data) => {
//       // Handle the fetched data here (e.g., open a modal)
//       console.log(data);
//     })
//     .catch((error) => {
//       console.error("Error fetching task details:", error);
//     });
// }

// // Add a click event listener to each card element
// cardElements.forEach((card) => {
//   card.addEventListener("click", openTaskDetails);
// });

// function openTaskDetails(taskId) {
//   fetch(`http://localhost:3000/tasks/${taskId}`)
//     .then((response) => {
//       console.log(response);
//       const modal = new bootstrap.Modal(
//         document.getElementById("exampleModal"),
//       );
//       modal.show();
//       // return response.json();
//     })
//     // .then((data) => {
//     //   // Handle the fetched data here (e.g., open a modal)
//     //   // Open the modal
//     //   const modal = new bootstrap.Modal(
//     //     document.getElementById("exampleModal"),
//     //   );
//     //   modal.show();
//     //   console.log(data); // You can use the fetched data in this callback
//     // })
//     .catch((error) => {
//       console.error("Error fetching task details:", error);
//     });
// }

// // Assume you have a function to open the modal with task details
// function openModalWithTaskDetails(data) {
//   const modalTemplate = Handlebars.compile(
//     document.getElementById("modal-template").innerHTML,
//   );
//   const modalContent = modalTemplate(data);

//   // Set the content of the modal
//   const modalBody = document.querySelector(".modal-body");
//   modalBody.innerHTML = modalContent;

//   // Show the modal
//   const modal = new bootstrap.Modal(document.getElementById("exampleModal"));
//   // modal.show();
// }

// // Add an event listener to each card element to open the modal
// const cardElements = document.querySelectorAll(".teamTaskBoardCard");

// cardElements.forEach((card) => {
//   card.addEventListener("click", function () {
//     const taskId = card.getAttribute("data-task-id");
//     fetch(`http://localhost:3000/tasks/${taskId}`)
//       .then((response) => response.json())
//       .then((data) => {
//         openModalWithTaskDetails(data);
//       })
//       .catch((error) => {
//         console.error("Error fetching task details:", error);
//       });
//   });
// });
