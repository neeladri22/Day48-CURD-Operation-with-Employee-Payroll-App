//UC2 - Ability to Update an Employee Payroll details.
const stringifyDate = (date) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const newDate = !date ? "undefined" :
                    new Date(Date.parse(date)).toLocaleDateString('en-GB', options);
    return newDate;
}