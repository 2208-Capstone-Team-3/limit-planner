import { EntryAttributes } from '../../server/db/models/Entry.model';

/** sorts an array of entry instances from most recent to least recent */
/** uses bubble sort */
const sortEntries = (entries:any) =>{
	let sortedArr = [...entries];
    for (let i = 0; i < sortedArr.length; i++) {
		for (let j = 0; j < sortedArr.length-1; j++) {
            if((new Date(sortedArr[j].start)) < (new Date(sortedArr[j+1].start)) ){
				let temp = sortedArr[j];
				sortedArr[j] = sortedArr[j + 1];
				sortedArr[j + 1] = temp;
			};
		};
	};
    return sortedArr;
};

export default sortEntries;
