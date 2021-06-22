const epochUtcTicks = 621355968000000000;

export const convertDateTimeOffsetToDate = (dateTimeOffsetArray: number[]): Date => {
    const convertedTicks = (Math.trunc((dateTimeOffsetArray[0] + dateTimeOffsetArray[1])) - epochUtcTicks) / 10000;
    return new Date(convertedTicks);
}

export const convertDateToTicks = (datetime: string | undefined): number => {
    if(!datetime){
        throw Error("datetime argument not set.");
    }
    const sinceDateTime = new Date(datetime);
    return ((sinceDateTime.getTime() * 10000) + epochUtcTicks);
}