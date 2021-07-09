const microOffset = 10000;
const epochUtcTicks = 621355968000000000;

export const convertTicksToDate = (dateTimeOffsetArray: number[]): Date => {
    const convertedTicks = (Math.trunc((dateTimeOffsetArray[0] + dateTimeOffsetArray[1])) - epochUtcTicks) / microOffset;
    return new Date(convertedTicks);
}

export const convertDateToTicks = (datetime: string | undefined): number => {
    if(!datetime){
        throw Error("datetime argument not set.");
    }
    const sinceDateTime = new Date(datetime);
    return ((sinceDateTime.getTime() * microOffset) + epochUtcTicks);
}

export const getCurrentTimeInTicks = (): number[] => {
    return [((Date.now() * microOffset) + epochUtcTicks), 0]
}

export const convertTicksToSinceString = (dateTimeOffsetArray: number[] | undefined, toDateTime: number): string => {
    if (!dateTimeOffsetArray) {
        return 'never';
    }

    const fromDateTime = (Math.trunc((dateTimeOffsetArray[0] + dateTimeOffsetArray[1])) - epochUtcTicks) / microOffset;

    const diffDays = getDifferenceInDays(fromDateTime, toDateTime);
    if (diffDays > 1){
        return `${diffDays} days ago`;
    } else if (diffDays === 1){
        return 'yesterday';
    }
    
    const diffHours = getDifferenceInHours(fromDateTime, toDateTime);
    if (diffHours > 1) {
        return `${diffHours} hours ago`;
    } else if (diffHours === 1) {
        return '1 hour ago';
    } 
    
    const diffMinutes = getDifferenceInMinutes(fromDateTime, toDateTime);
    if (diffMinutes > 1) {
        return `${diffMinutes} minutes ago`;
    } else if (diffMinutes === 1) {
        return '1 minute ago';
    } 
    
    const diffSeconds = getDifferenceInSeconds(fromDateTime, toDateTime);
    if (diffSeconds > 1) {
        return `${diffSeconds} seconds ago`;
    } else if (diffSeconds === 1) {
        return '1 second ago';
    } 
    
    throw new Error(`Invalid date diff supplied. fromDateTime: ${fromDateTime}, toDateTime: ${toDateTime}.`);
}

function getDifferenceInDays(date1: number, date2: number) {
    const diffInMs = Math.abs(date2 - date1);
    return Math.trunc(diffInMs / (1000 * 60 * 60 * 24));
  }
  
  function getDifferenceInHours(date1: number, date2: number) {
    const diffInMs = Math.abs(date2 - date1);
    return Math.trunc(diffInMs / (1000 * 60 * 60));
  }
  
  function getDifferenceInMinutes(date1: number, date2: number) {
    const diffInMs = Math.abs(date2 - date1);
    return Math.trunc(diffInMs / (1000 * 60));
  }
  
  function getDifferenceInSeconds(date1: number, date2: number) {
    const diffInMs = Math.abs(date2 - date1);
    return Math.trunc(diffInMs / 1000);
  }