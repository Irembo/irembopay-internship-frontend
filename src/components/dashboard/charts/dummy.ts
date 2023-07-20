const generateDate = (length = 24): Array<any> => {
    const arr: Array<any> = [];
    for (let i = 0; i < length; i++) {
        const rand1: number = Math.random() * 15 + 5;
        const rand2: number = Math.random() * 15 + 5;

        const date: Date = new Date();
        date.setHours(date.getHours() - i);

        arr.unshift({
            date: formatDate(date),
            index: i,
            spent: Math.ceil(rand1),
            items: Math.ceil(rand2),
        });
    }

    return arr;
};

const formatDate = (date: Date): string => {
    const hours: string = String(date.getHours()).padStart(2, '0');
    const minutes: string = String(date.getMinutes()).padStart(2, '0');

    return `${hours}:${minutes}`;
};

export default generateDate;
