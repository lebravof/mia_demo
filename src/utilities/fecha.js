export function fecha(){
    const date = new Date();
    const formatter = new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const formattedDate = formatter.format(date);
    return formattedDate;
};