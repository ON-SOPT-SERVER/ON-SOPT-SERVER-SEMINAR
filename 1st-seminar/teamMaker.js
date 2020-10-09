const member = require('./partMember');

const noShowMembers = [];
const offlineMembers = member
.filter(it => !noShowMembers.includes(it.name))
.sort((a, b) => Math.random() - Math.random())
.sort((a, b) => a.status.localeCompare(b.status));
const team = {team1:[],team2:[],team3:[],team4:[],team5:[],team6:[]};

offlineMembers.forEach((member, index) => {
  team[`team${(index%6)+1}`].push(member);
})
console.log(team);