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
const dropdownAddEmployeeBtn = document.getElementById(
  "dropdownAddEmployeeBtn",
);
const modalDropdownMenu = document.getElementById("modalDropdownMenu");

// Onclick event listener to each card element
cardElements.forEach((card) => {
  card.addEventListener("click", async (event) => {
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

      // Get the task details
      const urlTask = `http://localhost:3001/api/tasks/${taskId}`;
      const taskData = await fetch(urlTask, {
        method: "GET",
      }).then((res) => res.json());
      // Get employeea details
      const urlEmployees = "http://localhost:3001/api/employees/";
      const employeesData = await fetch(urlEmployees, {
        method: "GET",
      }).then((res) => res.json());

      // set modal content
      modalIDLabel.innerHTML = `Task ID: ${taskId}`;
      modalNameInput.value = task_name;
      modelDescriptionText.value = description;
      modalDeadlineText.value = deadlineDiv.textContent.trim();

      // load current task_employees to task modal
      renderModalTaskEmployee(taskData.task_employees);

      // load employee to task modal, add employee drop down
      modalDropdownMenu.innerHTML = "";
      var filteredEmployeesData = employeesData.filter(
        (employeeData) =>
          !taskData.task_employees.some(
            (task_employee) => task_employee.id === employeeData.id,
          ),
      );
      renderModalEmployeeDropdown(
        taskData.task_employees,
        filteredEmployeesData,
      );

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

// EventListener addCardBtns
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

dropdownAddEmployeeBtn.addEventListener("click", (event) => {
  event.stopPropagation();
});

// Event listener, modalEmployeeDropdownOnClick
const modalEmployeeDropdownOnClick = (
  task_employees,
  filteredEmployeesData,
  filteredEmployeeData,
  event,
) => {
  // add employee to the task_employees list
  task_employees.push(filteredEmployeeData);
  renderModalTaskEmployee(task_employees);
  console.log("123");
  // remove the employee from filteredEmployeesData
  filteredEmployeesData = filteredEmployeesData.filter(
    (data) => data.id !== filteredEmployeeData.id,
  );
  console.log(filteredEmployeesData);

  renderModalEmployeeDropdown(task_employees, filteredEmployeesData);
};

// load current task_employees to task modal
const renderModalTaskEmployee = (task_employees) => {
  modalAvatarIcons.innerHTML = "";
  task_employees.forEach((task_employee) => {
    modalAvatarIcons.innerHTML += `
    <img
      height="30px"
      width="30px"
      class="mx-1 img-profile rounded-circle"
      src=${task_employee.profile_pic_link}
    />`;
  });
};

// load current task_employees to task modal
const renderModalEmployeeDropdown = (task_employees, filteredEmployeesData) => {
  modalDropdownMenu.innerHTML = "";
  filteredEmployeesData.forEach((filteredEmployeeData) => {
    const newListItem = document.createElement("li");
    newListItem.innerHTML = `
    <li 
      data-employee-id = ${filteredEmployeeData.id}>
      <div class="dropdown-item" href="#">
        <img
          height="30px"
          width="30px"
          class="mr-2 img-profile rounded-circle d-inline"
          src="${filteredEmployeeData.profile_pic_link}"
        />
        <div class="d-inline ml-2">${filteredEmployeeData.first_name} ${filteredEmployeeData.last_name}</div>
      </div>
    </li>`;

    newListItem.addEventListener(
      "click",
      modalEmployeeDropdownOnClick.bind(
        null,
        task_employees,
        filteredEmployeesData,
        filteredEmployeeData,
      ),
    );

    modalDropdownMenu.appendChild(newListItem);
  });
};
