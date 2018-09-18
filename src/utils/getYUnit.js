export const getYUnit = showValuesAt => {
    let [value] = showValuesAt;
    if(showValuesAt.length === 4) value = 'all';
    return value;
};
 