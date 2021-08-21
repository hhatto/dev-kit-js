export const arrayify = (obj) => {
    const keys = Object.keys(obj);
    const numericKeys = keys.filter((k) => !isNaN(Number(k)));
    return numericKeys.map((k) => obj[k]);
};
