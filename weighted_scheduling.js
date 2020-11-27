class Scheduling {

  constructor(json) {
    this.data = json;
    this.memoization = [0]; // memoization[0] = 0
    this.sortedVector = [0];
    this.p = [0,0]; // p[0] é vazio
    this.solutionSet = [];

    for(let i = 1; i <= json.length; ++i) {
      this.memoization[i] = null; 
      // Coloquei null pois não sei se algum Memoization pode retornar 0
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
    new_vector.unshift(0);
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

  fill2P() {
    for(let i = (this.sortedVector.length - 1); i > 1; --i){
      for(let j = (i - 1); j > 0; --j) {
        if (this.sortedVector[i].start >= this.sortedVector[j].deadline ){
          this.p[i] = j;
          j = 0;
        } else {
          this.p[i] = 0;
        }
      }
    }
  }

  OPT(j){
    if(this.memoization[j] == null){
      this.memoization[j] = Math.max((this.sortedVector[j].value + this.OPT(this.p[j])), this.OPT(j-1));
      return this.memoization[j];
    }else{
      return this.memoization[j];
    }
  }

  findSolution(j) {
    if(j == 0) {
      return;
    }
    else if(this.sortedVector[j].value + this.memoization[this.p[j]] >= this.memoization[j - 1]) {
      this.solutionSet.push(this.sortedVector[j]);
      this.findSolution(this.p[j]);
    }
    else {
      this.findSolution(j - 1);
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

let json2 = [
  {
    task: '3',
    value: 3,
    start: 0,
    deadline: 6,
  },
  {
    task: '2',
    value: 2,
    start: 3,
    deadline: 5, 
  },
  {
    task: '1',
    value: 1,
    start: 1,
    deadline: 4,
  },
  {
    task: '5',
    value: 5,
    start: 3,
    deadline: 8,
  },
  {
    task: '4',
    value: 4,
    start: 4,
    deadline: 7,
  },
  {
    task: '8',
    value: 8,
    start: 8,
    deadline: 11,
  },
  {
    task: '6',
    value: 6,
    start: 5,
    deadline: 9,
  },
  {
    task: '7',
    value: 7,
    start: 6,
    deadline: 10,
  },
  
];

let schedule = new Scheduling(json2);

console.log(schedule.sort_vector());
schedule.fill2P();
console.log(schedule.p);
schedule.OPT(json2.length - 1);
console.log(schedule.memoization);
schedule.findSolution(json2.length - 1);
console.log(schedule.solutionSet);