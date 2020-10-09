const member = require('./partMember');

const noShowMembers = ["오승재", "김기문", "박경선", "이주은", "이현종", "김현기"];
const offlineMembers = member
.filter(it => !noShowMembers.includes(it.name))
.sort((a, b) => Math.random() - Math.random())
.sort((a, b) => a.status.localeCompare(b.status));
const team = {team1:[], team2:[], team3:[], team4:[], team5:[], team6:[]};

offlineMembers.forEach((member, index) => {
  team[`team${(index%6)+1}`].push(member);
})
console.log(team);