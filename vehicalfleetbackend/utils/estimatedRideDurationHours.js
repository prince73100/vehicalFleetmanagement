export const estimatedRideDurationHours=(topincode,frompincode)=>{
    const estimatedhours = Math.abs(parseInt(topincode),parseInt(frompincode))%24;
    return estimatedhours;
}