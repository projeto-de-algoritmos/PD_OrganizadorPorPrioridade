class Scheduling {

  constructor(json) {
    this.data = json;
  
  }

  sort_vector(vector) {
    let new_vector = this.data.sort(function (a, b) {

      if(a.deadline < b.deadline) {
        return -1;
      }

      else if(a.deadline > b.deadline) {
        return 1;
      }

    });

    return new_vector;
  }
}

let json = [
  {
    task: 'walk',
    deadline: 5,
  },
  {
    task: 'run',
    deadline: 2, 
  },
  {
    task: 'play_soccer',
    deadline: 8,
  },
  {
    task: 'play_basketball',
    deadline: 2,
  },
];

let schedule = new Scheduling(json);

console.log(schedule.sort_vector());