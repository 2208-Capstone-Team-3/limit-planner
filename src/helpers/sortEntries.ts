import { EntryAttributes } from '../../server/db/models/Entry.model';

/** sorts an array of entry instances from most recent to least recent */
const sortEntries = (entries:EntryAttributes[]) =>{
    for (let i = 0; i < entries.length; i++) {
		for (let j = 0; j < entries.length-1; j++) {
            if((new Date(entries[j].start)) < (new Date(entries[j+1].start)) ){
				let temp = entries[j];
				entries[j] = entries[j + 1];
				entries[j + 1] = temp;
			};
		};
	};
    return entries;
};

export default sortEntries;