export function adaptNascarLiveRace(
    liveFeed,
    lapTimes,
    pitData,
    flagData
) {

    console.log(liveFeed);
    console.log(lapTimes);
    console.log(pitData[0]);
    console.log(flagData[0]);
    
    return {

        liveFeed,
        lapTimes,
        pitData,
        flagData

    };

}
