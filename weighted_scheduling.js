class Scheduling {

  constructor(json) {
    this.data = json;
    this.memoization = [];
    this.memoization[0] = 0; // memoization[0] vazio
    this.sortedVector = [];
    this.p = [null]; // p[0] é vazio

    for(let i = 1; i <= json.length; ++i) {
      this.memoization[i] = 0;
    }
  
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

    this.sortedVector = new_vector;
    return new_vector;
  }

  fillP() {
    for(let i = 1; i < this.sortedVector.length; i++){
      for(let j = i; j >= 0; j--) {
        if (this.sortedVector[i].start >= this.sortedVector[j].deadline ){
          this.p[i] = this.sortedVector[j];
          j = 0;
        } else {
          this.p[i] = null;
        }
      }
    }
  }

}

let json = [
  {
    task: 'walk',
    value: 1,
    start: 3,
    deadline: 6,
  },
  {
    task: 'run',
    value: 2,
    start: 1,
    deadline: 4, 
  },
  {
    task: 'play_soccer',
    value: 3,
    start: 5,
    deadline: 8,
  },
  {
    task: 'play_basketball',
    value: 4,
    start: 7,
    deadline: 10,
  },
  {
    task: 'play_volleyball',
    value: 5,
    start: 9,
    deadline: 12,
  },
];

let schedule = new Scheduling(json);

// console.log(schedule.memoization);
// console.log(schedule.sort_vector());

schedule.fillP();
// console.log(schedule.p);
