const firstMonth = (date) => {
    var months;
    let today = new Date();
    months = (date.getFullYear() - today.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0;
}

const isPast = (date) => {
    const today = new Date();
    today.setHours(23, 59, 59, 998);
  
    return date < today;
}

module.exports = {
    firstMonth,
    isPast
}