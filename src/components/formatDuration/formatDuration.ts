// duration format: "hh:mm:ss.ms"
const formatDuration = (duration: string) => {
    let pattern = "^([0-9][0-9]:[0-9][0-9]:[0-9][0-9].[0-9][0-9]*)";
    if (!duration.match(pattern)) {
        console.error(`Duration: '${duration}' did not match pattern (hh:mm:ss.ms)`);
    }
    let ms = parseFloat(`0.${duration.split(".")[1]}`);
    let hms = duration.split(":");

    return ((parseInt(hms[0], 10) * 3600) +
        (parseInt(hms[1], 10) * 60) +
        (parseInt(hms[2].split(".")[0], 10)) + ms).toFixed(7);
};

export default formatDuration;
