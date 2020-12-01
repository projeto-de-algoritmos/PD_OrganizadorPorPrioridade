export default class Scheduling {

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

  sort_vector() {
    let new_vector = this.data.sort(function (a, b) {
      if(a.deadline < b.deadline) {
        return -1;
      } else if (a.deadline > b.deadline)  {
        return 1;
      }

    });

    new_vector.unshift(0);

    this.sortedVector = new_vector;
    return new_vector;
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
    if(this.memoization[j] === null){
      this.memoization[j] = Math.max((this.sortedVector[j].value + this.OPT(this.p[j])), this.OPT(j-1));
      return this.memoization[j];
    }else{
      return this.memoization[j];
    }
  }

  findSolution(j) {
    if(j === 0) {
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
