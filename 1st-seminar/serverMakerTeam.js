const member = require('./partMember');

const noShowMembers = [];
const offlineMembers = member
.filter(it => !noShowMembers.includes(it.name))
.sort((a, b) => Math.random() - Math.random());
const obMember = offlineMembers.filter(member => member.status === 'OB');
const ybMember = offlineMembers.filter(member => member.status === 'YB');
const teamCount = Math.floor(offlineMembers.length/noShowMembers.length);
const team = {team1:[],team2:[],team3:[],team4:[],team5:[],team6:[]};

obMember.forEach((member, index) => {
	if(member.status === 'OB') team[`team${(index%6)+1}`].push(member);
})

ybMember.forEach((member, index) => {
  if(member.status === 'YB') team[`team${(index%6)+1}`].push(member);
})

console.log(team)