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