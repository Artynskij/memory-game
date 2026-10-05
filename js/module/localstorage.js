export class LocalStorage {
    constructor() {}
    getStat() {
        return JSON.parse(localStorage.getItem("stat"));
    }
    setStat(moves) {
        const date = this.getFormatDate(new Date());
        const newItem = { moves: moves, date: date };

        const oldData = this.getStat() || [];

        const newData = [...oldData, newItem]
            .sort(
                (a, b) =>
                    a.moves - b.moves ||
                    this.getDateForSort(b.date) - this.getDateForSort(a.date),
            )
            .slice(0, 10);

        localStorage.setItem("stat", JSON.stringify(newData));
    }
    getDateForSort(str) {
        const [day, month, year] = str.split(".");
        return Number(`${year}${month}${day}`);
    }
    getFormatDate(dateProp) {
        const date = new Date(dateProp);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    }
}

// [{"moves":8,"date":"05.10.2026"},{"moves":8,"date":"05.10.2026"},{"moves":80,"date":"05.10.2026"},{"moves":8,"date":"05.10.2026"},{"moves":2,"date":"05.10.2026"},{"moves":8,"date":"05.10.2026"},{"moves":8,"date":"01.10.2026"},{"moves":8,"date":"05.10.2026"},{"moves":8,"date":"05.10.2026"},{"moves":8,"date":"05.10.2026"},{"moves":8,"date":"03.10.2026"}]
