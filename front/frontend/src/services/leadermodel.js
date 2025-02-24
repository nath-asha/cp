export class LeaderModel {
    constructor(name, score, github_url) {
      this.name = name;
      this.score = score;
      this.github_url = github_url;
    }
  
    static fromJSON(data) {
      return new LeaderModel(data.name, data.score, data.github_url);
    }
  }
  