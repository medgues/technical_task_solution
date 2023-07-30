// the tasks with their addresses and time intervals
const tasks = [
  { address: "17 reu graciouss", start: "9:00", end: "11:00" },
  { address: "22 rue soufflot", start: "13:00", end: "15:00" },
  { address: "5 reu dancourt", start: "8:45", end: "10:15" },
  { address: "5 alin turing", start: "14:30", end: "16:30" },
  { address: "2 juffre", start: "15:10", end: "17:10" },
  { address: "62 reu maurice", start: "12:30", end: "15:30" },
  { address: "42 teu de l'eglaise", start: "13:40", end: " 15:40" },
  { address: "10 reu do paris", start: "17:00", end: "19:00" },
  { address: "117 quay de valmi", start: "20:15", end: "22:15" },
  { address: "14 reu de croix", start: "18:15", end: "20:15" },
];

// Function to find optimized routes for tasks
function findOptimizedRoutes(tasks) {
  //convert the time from a string to a number in minutes
  const tasksInMinutes = tasks.map((task) => {
    const startTimeSplited = task.start.split(":");
    const endTimeSplited = task.end.split(":");
    return {
      ...task,
      start: parseInt(startTimeSplited[0]) * 60 + parseInt(startTimeSplited[1]),
      end: parseInt(endTimeSplited[0]) * 60 + parseInt(endTimeSplited[1]),
    };
  });

  //sort tasks in ascending order by starting time
  const sotrtedTasks = tasksInMinutes.sort((a, b) => a.start - b.start);
  console.log("sorted out", sotrtedTasks);

  //initiate and array of taskes to that can be added to the current route
  var tasksToBeTested = [];

  //initialise an array to store routes
  const routes = [];

  // Function to filter taskes that can be done in one route
  function makeRoute(tasks) {
    //intitalise the first route with the first task
    let currentRoute = [tasks[0]];

    //Loop through the tasks starting from the second task
    for (let i = 1; i < tasks.length; i++) {
      console.log("tasksToBeTested in", tasks);

      const currentTask = tasks[i];
      const previousTask = currentRoute[currentRoute.length - 1];

      //Check if the current task can be added to the current route
      if (canAddTaskToRoute(previousTask, currentTask)) {
        currentRoute.push(currentTask);
      } else {
        // If the current task cannot be added to the current route it gets added to taskes to be tested to make new route
        tasksToBeTested.push(currentTask);
      }
    }

    //add the last route to the list of routes
    routes.push(currentRoute);
  }

  //calling the function with the sorted tasks list
  makeRoute(sotrtedTasks);

  //check if there is taskes that cant be added to the last round
  if (tasksToBeTested.length !== 0) {
    //make a copy of the tasks list that couldnt be added to the last route
    let restTasks = tasksToBeTested.slice();

    //make new route with the tasks list that couldnt be added to the last route
    makeRoute(restTasks);
  }
  return { routes, routesNumber: routes.length };
}

// Function to check if a task can be added to a route
function canAddTaskToRoute(previousTask, currentTask) {
  //check if the start time of the next task is greater or equal the previous task time + 30 min (time needed to finish the task)
  if (previousTask.start + 30 <= currentTask.start) {
    return true;
  } else {
    return false;
  }
}

//fine optimised routes
const result = findOptimizedRoutes(tasks);

//outbut the results
console.log("Optimized Routes:", result.routes);
console.log("Number of Routes:", result.routesNumber);
