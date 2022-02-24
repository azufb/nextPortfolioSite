export const formatDate = (...value) => {
    const finishedDate = new Date(...value.splice(","));
    let formattedDate = finishedDate.getFullYear() + "/" + ("0" + (finishedDate.getMonth() + 1)).slice(-2) + "/" + ("0" + (finishedDate.getDate())).slice(-2);
    return formattedDate;
}