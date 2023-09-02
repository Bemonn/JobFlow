// sortablejs
const cardOpenTaskSortable = new Sortable(cardOpenTask, {
  // group: "sharedGroupOne", // set both lists to same group
  animation: 150,
  ghostClass: "blue-background-class",
});
const cardInProgressSortable = new Sortable(cardInProgress, {
  // group: "sharedGroupOne",
  animation: 150,
  ghostClass: "blue-background-class",
});

const cardCompletedSortable = new Sortable(cardCompleted, {
  // group: "sharedGroupOne",
  animation: 150,
  ghostClass: "blue-background-class",
});

// // group is not Sortable for now
// const cardGroupSortable = new Sortable(cardGroup, {
//   //   group: "sharedGroupTwo",
//   animation: 150,
// });

//  modal
const url = "http://localhost:3001/";

const cardElements = document.querySelectorAll(".taskCard");
const taskModel = document.getElementById("exampleModal");
const modalIDLabel = document.getElementById("modalIDLabel");
const modalDeadLine = document.getElementById("data-dead-line");
const modalNameInput = document.getElementById("modalNameInput");
const modelDescriptionText = document.getElementById("modelDescriptionText");
const modalDeadlineText = document.getElementById("modalDeadlineText");
const modalStatusBtnDropDown = document.getElementById("statusBtnDropDown");
const modalStatusBtn = modalStatusBtnDropDown.querySelector("button");
const modalStatusListItems =
  modalStatusBtnDropDown.querySelectorAll(".dropdown-item");
const modalAvatarIcons = document.querySelector(".modalAvatarIcons");
const dropdownAddEmployeeBtn = document.getElementById(
  "dropdownAddEmployeeBtn",
);
const modalDropdownMenu = document.getElementById("modalDropdownMenu");
const modalSaveBtn = document.getElementById("modalSaveBtn");
const modalDeleteBtn = document.getElementById("modalDeleteBtn");

// global vars initialisation
var dropDownEmployeesData = [];
var modalTaskEmployees = [];
var modalStatusId = 1;
var modalTaskName = "Enter a task name";
var modalDescription = "Enter task description";
var modalTaskId;

// Onclick event listener to each card element
cardElements.forEach((card) => {
  card.addEventListener("click", async (event) => {
    event.stopPropagation();

    // console.log(event.target);
    const taskCard = event.target.closest(".taskCard");
    const deadlineDiv = taskCard.querySelector(".deadlineDiv");
    const cardAvatarIcons = taskCard.querySelector(".cardAvatarIcons");
    if (taskCard) {
      modalTaskId = taskCard.getAttribute("data-task-id");
      modalTaskName = taskCard.getAttribute("data-task-name");
      modalDescription = taskCard.getAttribute("data-task-description");
      modalStatusId = taskCard.getAttribute("data-status-id");

      // Get the task details
      const taskData = await getTaskData(modalTaskId);

      // Get employeea details
      const employeesData = await getEmployeesData();

      // set modal content
      modalIDLabel.innerHTML = `Task ID: ${modalTaskId}`;
      modalNameInput.value = modalTaskName;
      modelDescriptionText.value = modalDescription;
      modalDeadlineText.value = deadlineDiv.textContent.trim();

      // load employee to task modal, add employee drop down
      modalDropdownMenu.innerHTML = "";
      dropDownEmployeesData = employeesData.filter(
        (employeeData) =>
          !taskData.task_employees.some(
            (task_employee) => task_employee.id === employeeData.id,
          ),
      );
      modalTaskEmployees = taskData.task_employees;
      renderModalTaskEmployee();
      renderModalEmployeeDropdown();
      setTheModalStatus();

      // remove the modalCreateBtnOnClick event listener
      modalSaveBtn.removeEventListener("click", modalCreateBtnOnClick);
      modalSaveBtn.addEventListener("click", modalUpdateBtnOnClick);
      modalDeleteBtn.style.visibility = "visible";

      // modalSaveBtn.addEventListener("click", modalCreateBtnOnClick);
    } else {
      console.log("taskCard not found");
    }
  });
});

// modalCreateBtnOnClick EventListener
function modalCreateBtnOnClick(event) {
  const thisUrl = url + "tasks/";

  // Create the request headers
  const headers = {
    "Content-Type": "application/json",
  };

  const taskData = {
    task_name: modalTaskName,
    description: modalDescription,
    deadline: convertDateFormat(modalDeadlineText.value),
    status_id: modalStatusId,
    employeeIds: modalTaskEmployees.map((employee) => {
      return { employee_id: employee.id };
    }),
  };

  console.log(taskData);
  // Create the request options
  const requestOptions = {
    method: "POST",
    headers: headers,
    body: JSON.stringify(taskData),
  };

  // Send the POST request
  fetch(thisUrl, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // Handle the response data here if needed
      console.log("POST request successful:", data);
      window.location.reload();
    })
    .catch((error) => {
      // Handle any errors that occurred during the fetch
      console.error("Error:", error);
    });
}

function modalUpdateBtnOnClick(event) {
  const thisUrl = url + `tasks/${modalTaskId}`;

  // Create the request headers
  const headers = {
    "Content-Type": "application/json",
  };

  const taskData = {
    task_name: modalTaskName,
    description: modalDescription,
    deadline: convertDateFormat(modalDeadlineText.value),
    status_id: modalStatusId,
    employeeIds: modalTaskEmployees.map((employee) => {
      return { employee_id: employee.id };
    }),
  };

  // // Create the request options
  const requestOptions = {
    method: "PUT",
    headers: headers,
    body: JSON.stringify(taskData),
  };

  // // Send the POST request
  fetch(thisUrl, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // Handle the response data here if needed
      console.log("POST request successful:", data);
      window.location.reload();
    })
    .catch((error) => {
      // Handle any errors that occurred during the fetch
      console.error("Error:", error);
    });
}

//getTaskData
const getTaskData = async (modalTaskId) => {
  const urlTask = url + `tasks/${modalTaskId}`;
  return await fetch(urlTask, {
    method: "GET",
  }).then((res) => res.json());
};

// getEmployeesData
const getEmployeesData = async () => {
  const urlEmployees = url + "employees/";
  return await fetch(urlEmployees, {
    method: "GET",
  }).then((res) => res.json());
};

// addEventListener
modalDeleteBtn.addEventListener("click", async (event) => {
  try {
    const urlTask = url + `tasks/${modalTaskId}`;
    const response = await fetch(urlTask, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    // The resource has been successfully deleted.
    window.location.reload();
    // return { success: true };
  } catch (error) {
    console.error("Error:", error);
    // return { success: false, error: error.message };
  }
});

// ---
modalStatusListItems.forEach((item) => {
  item.addEventListener("click", (event) => {
    modalStatusId = item.getAttribute("data-status-id");
    setTheModalStatus();
  });
});

// modalNameInput input EventListener
modalNameInput.addEventListener("input", (event) => {
  modalTaskName = modalNameInput.value;
});

// modalNameInput input EventListener
modelDescriptionText.addEventListener("input", (event) => {
  modalDescription = modelDescriptionText.value;
});

// set the modal status
const setTheModalStatus = () => {
  switch (parseInt(modalStatusId)) {
    case 1:
      modalStatusBtn.innerHTML = "Open Task";
      modalStatusBtn.classList.replace(
        modalStatusBtn.classList[1],
        "btn-primary",
      );
      break;
    case 2:
      modalStatusBtn.innerHTML = "In Progress";
      modalStatusBtn.classList.replace(
        modalStatusBtn.classList[1],
        "btn-warning",
      );
      break;
    case 3:
      modalStatusBtn.innerHTML = "Completed";
      modalStatusBtn.classList.replace(
        modalStatusBtn.classList[1],
        "btn-success",
      );
      break;
    default:
      break;
  }
};

// EventListener addCardBtns
const addCardBtns = document.querySelectorAll(".addCard");
addCardBtns.forEach((addCardBtn) => {
  // remove the modalCreateBtnOnClick event listener
  addCardBtn.addEventListener("click", addCardBtnOnClickEventListener);
});

//addCardBtnOnClickEventListener
async function addCardBtnOnClickEventListener(event) {
  event.stopPropagation();
  modalIDLabel.innerHTML = "Task ID: AUTO Generated";
  modalNameInput.value = "Enter a task name";
  modelDescriptionText.value = "Enter task description";
  modalDeadlineText.innerHTML = "-- / -- / ----";
  modalAvatarIcons.innerHTML = "";
  modalStatusBtn.innerHTML = "Open Task";
  modalStatusBtn.classList.replace(modalStatusBtn.classList[1], "btn-primary");
  console.log("asdfsadfa");
  dropDownEmployeesData = [];
  modalTaskEmployees = [];
  dropDownEmployeesData = await getEmployeesData();
  renderModalEmployeeDropdown(dropDownEmployeesData);
  modalSaveBtn.removeEventListener("click", modalUpdateBtnOnClick);
  modalSaveBtn.addEventListener("click", modalCreateBtnOnClick);
  modalDeleteBtn.style.visibility = "hidden";
}

dropdownAddEmployeeBtn.addEventListener("click", (event) => {
  event.stopPropagation();
});

// Event listener, modalEmployeeDropdownOnClick
const modalEmployeeDropdownOnClick = (employeeData, event) => {
  // add employee to the task_employees list
  modalTaskEmployees.push(employeeData);
  renderModalTaskEmployee();

  // remove the employee from dropDownEmployeesData
  dropDownEmployeesData = dropDownEmployeesData.filter(
    (data) => data.id !== employeeData.id,
  );

  renderModalEmployeeDropdown();
};

// load current task_employees to task modal
const renderModalTaskEmployee = () => {
  modalAvatarIcons.innerHTML = "";
  modalTaskEmployees.forEach((taskEmployee) => {
    const imgElement = document.createElement("img");

    imgElement.setAttribute("height", "30px");
    imgElement.setAttribute("width", "30px");
    imgElement.setAttribute("class", "mx-1 img-profile rounded-circle");
    imgElement.setAttribute("data-employee-id", taskEmployee.id);
    imgElement.setAttribute("src", taskEmployee.profile_pic_link);

    imgElement.addEventListener("click", (event) => {
      // console.log(taskEmployee.id);
      modalTaskEmployees = modalTaskEmployees.filter(
        (data) => data.id !== taskEmployee.id,
      );
      renderModalTaskEmployee();
      dropDownEmployeesData.push(taskEmployee);
      // console.log(taskEmployee);

      renderModalEmployeeDropdown();
    });

    modalAvatarIcons.appendChild(imgElement);
  });
};

// load current task_employees to task modal
const renderModalEmployeeDropdown = () => {
  modalDropdownMenu.innerHTML = "";
  dropDownEmployeesData.forEach((dropDownEmployeeData) => {
    const newListItem = document.createElement("li");
    newListItem.innerHTML = `
    <li 
      data-employee-id = ${dropDownEmployeeData.id}>
      <div class="dropdown-item" href="#">
        <img
          height="30px"
          width="30px"
          class="mr-2 img-profile rounded-circle d-inline"
          src="${dropDownEmployeeData.profile_pic_link}"
        />
        <div class="d-inline ml-2">${dropDownEmployeeData.first_name} ${dropDownEmployeeData.last_name}</div>
      </div>
    </li>`;

    newListItem.addEventListener(
      "click",
      modalEmployeeDropdownOnClick.bind(null, dropDownEmployeeData),
    );

    modalDropdownMenu.appendChild(newListItem);
  });
};

// convert the date to correct format for DB
const convertDateFormat = (inputDate) => {
  // Split the input date string by "/"
  const parts = inputDate.split("/");

  // Ensure there are three parts (day, month, and year)
  if (parts.length !== 3) {
    return null; // Invalid date format
  }

  // Rearrange the parts to "yyyy-mm-dd" format
  const yyyy = parts[2];
  const mm = parts[1].padStart(2, "0"); // Ensure double-digit month
  const dd = parts[0].padStart(2, "0"); // Ensure double-digit day

  // Combine the parts into the desired format
  return `${yyyy}-${mm}-${dd}`;
};
