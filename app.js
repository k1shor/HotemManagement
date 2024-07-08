class Graph {
  constructor(studentCount, mentorCount) {
    this.studentCount = studentCount;
    this.mentorCount = mentorCount;
    this.totalNodes = studentCount + mentorCount;
    this.adjList = Array.from({ length: this.totalNodes }, () => []);
  }

  addEdge(u, v) {
    this.adjList[u].push(v);
  }

  dfs(u, visited, matches) {
    for (let v of this.adjList[u]) {
      if (!visited[v]) {
        visited[v] = true;
        if (matches[v] === -1 || this.dfs(matches[v], visited, matches)) {
          matches[v] = u;
          return true;
        }
      }
    }
    return false;
  }

  maxBipartiteMatching() {
    let matches = Array(this.totalNodes).fill(-1);
    let result = [];

    for (let u = 0; u < this.studentCount; u++) {
      let visited = Array(this.totalNodes).fill(false);
      this.dfs(u, visited, matches);
    }

    for (let v = this.studentCount; v < this.totalNodes; v++) {
      if (matches[v] !== -1) {
        result.push([matches[v], v - this.studentCount]);
      }
    }

    return result;
  }
}

// Students and mentors data
const students = [
  {
    name: "Ramesh",
    interestedFields: ["Data Science", "Machine Learning", "Web Development"],
  },
  {
    name: "Nischal",
    interestedFields: ["Web Development", "Mobile Development"],
  },
  { name: "Nripesh", interestedFields: ["AI", "Robotics"] },
];

const mentors = [
  {
    name: "Sandesh",
    masteryFields: ["Data Science", "Machine Learning", "Blockchain", "IoT"],
  },
  { name: "Pesal", masteryFields: ["AI", "Robotics", "Web Development"] },
  {
    name: "Nihal",
    masteryFields: ["Web Development", "Mobile Development", "Data Science"],
  },
];

const studentCount = students.length;
const mentorCount = mentors.length;
const graph = new Graph(studentCount, mentorCount);

// Add edges based on interest and mastery fields
for (let i = 0; i < studentCount; i++) {
  for (let j = 0; j < mentorCount; j++) {
    const commonInterests = students[i].interestedFields.filter((interest) =>
      mentors[j].masteryFields.includes(interest)
    );
    if (commonInterests.length > 0) {
      graph.addEdge(i, studentCount + j);
    }
  }
}

const matches = graph.maxBipartiteMatching();

// Output results with names
let matchResults = Array.from({ length: studentCount }, () => []);

for (let [student, mentor] of matches) {
  matchResults[student].push(mentors[mentor].name);
}

students.forEach((student, index) => {
  console.log(
    `${student.name} matches with: ${matchResults[index].join(", ")}`
  );
});
