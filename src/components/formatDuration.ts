// duration format: "hh:mm:ss.ms"
const formatDuration = (duration: string) => {
    let ms = parseFloat(`0.${duration.split(".")[1]}`);
    let hms = duration.split(":");

    return ((parseInt(hms[0], 2) * 3600) +
        (parseInt(hms[1], 2) * 60) +
        (parseInt(hms[2], 2)) + ms).toFixed(7);
};

export default formatDuration;