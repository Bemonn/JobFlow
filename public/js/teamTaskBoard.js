// sortablejs
const cardOpenTaskSortable = new Sortable(cardOpenTask, {
  group: "sharedGroupOne", // set both lists to same group
  animation: 150,
  ghostClass: "blue-background-class",
});
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

// // group is not Sortable for now
// const cardGroupSortable = new Sortable(cardGroup, {
//   //   group: "sharedGroupTwo",
//   animation: 150,
// });

//  modal
const cardElements = document.querySelectorAll(".taskCard");
const taskModel = document.getElementById("exampleModal");
const modalIDLabel = document.getElementById("modalIDLabel");
const modalDeadLine = document.getElementById("data-dead-line");
const modalNameInput = document.getElementById("modalNameInput");
const modelDescriptionText = document.getElementById("modelDescriptionText");
const modalDeadlineText = document.getElementById("modalDeadlineText");
const modalStatusId = document.getElementById("statusId");
const modalAvatarIcons = document.querySelector(".modalAvatarIcons");

// Onclick event listener to each card element
cardElements.forEach((card) => {
  card.addEventListener("click", (event) => {
    event.stopPropagation();

    // console.log(event.target);
    const taskCard = event.target.closest(".taskCard");
    const deadlineDiv = taskCard.querySelector(".deadlineDiv");
    const cardAvatarIcons = taskCard.querySelector(".cardAvatarIcons");
    if (taskCard) {
      const taskId = taskCard.getAttribute("data-task-id");
      const task_name = taskCard.getAttribute("data-task-name");
      const description = taskCard.getAttribute("data-task-description");
      const status_id = taskCard.getAttribute("data-status-id");

      modalIDLabel.innerHTML = `Task ID: ${taskId}`;
      modalNameInput.value = task_name;
      modelDescriptionText.value = description;
      modalDeadlineText.value = deadlineDiv.textContent.trim();

      modalAvatarIcons.innerHTML = cardAvatarIcons.innerHTML;
      console.log(parseInt(status_id));
      // set the modal status
      switch (parseInt(status_id)) {
        case 1:
          modalStatusId.innerHTML = "Open Task";
          // const className = modalStatusId.classList[1];
          modalStatusId.classList.replace(
            modalStatusId.classList[1],
            "text-bg-primary",
          );
          break;
        case 2:
          modalStatusId.innerHTML = "In Progress";
          modalStatusId.classList.replace(
            modalStatusId.classList[1],
            "text-bg-warning",
          );
          break;
        case 3:
          modalStatusId.innerHTML = "Completed";
          modalStatusId.classList.replace(
            modalStatusId.classList[1],
            "text-bg-success",
          );
          break;
        default:
          break;
      }
    } else {
      console.log("taskCard not found");
    }
  });
});

const addCardBtns = document.querySelectorAll(".addCard");
addCardBtns.forEach((addCardBtn) => {
  addCardBtn.addEventListener("click", (event) => {
    event.stopPropagation();

    modalIDLabel.innerHTML = "Task ID: AUTO Generated";
    modalNameInput.value = "Enter a task name";
    modelDescriptionText.value = "Enter task description";
    modalDeadlineText.innerHTML = "-- / -- / ----";
    modalAvatarIcons.innerHTML = "";
    modalStatusId.innerHTML = "Open Task";
    modalStatusId.classList.replace(
      modalStatusId.classList[1],
      "text-bg-primary",
    );
  });
});
