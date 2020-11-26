class Scheduling {

  constructor(json) {
    this.data = json;
    this.memoization = [0]; // memoization[0] = 0
    this.sortedVector = [0];
    this.p = [0,0]; // p[0] é vazio

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

  OPT(j){
    if(this.memoization[j] == null){
      this.memoization[j] = Math.max((this.sortedVector[j].value + this.OPT(this.p[j])), this.OPT(j-1));
      return this.memoization[j];
    }else{
      return this.memoization[j];
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

console.log(schedule.sort_vector());
// schedule.sort_vector();
schedule.fill2P();
console.log(schedule.p);
schedule.OPT(json.length - 1);
// console.log(schedule.OPT(json.length + 1));
console.log(schedule.memoization);
