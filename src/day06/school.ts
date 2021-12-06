type FishStorage = { [key: number]: number };

export default class School {
    fish: FishStorage;

    constructor(fish: number[]) {
        this.fish = this.groupFish(fish);
    }

    private groupFish(fish: number[]): FishStorage {
        const groupedFish: FishStorage = {};
        fish.forEach((fish) => {
            if (groupedFish[fish]) {
                groupedFish[fish]++;
            } else {
                groupedFish[fish] = 1;
            }
        });

        return groupedFish;
    }

    public simulate(days = 1) {
        for (let i = 0; i < days; i++) {
            let newFish: FishStorage = {};

            for (let j = 8; j >= -1; j--) {
                if (j >= 0) {
                    if (j > 0)
                        newFish[j - 1] = (newFish[j - 1] ?? 0) + (this.fish[j] ?? 0);
                    else {
                        newFish[6] = (newFish[6] ?? 0) + (this.fish[j] ?? 0);
                        newFish[8] = (newFish[8] ?? 0) + (this.fish[j] ?? 0);
                    }
                }
            }

            this.fish = newFish;
        }
    }

    public get size(): number {
        return Object.values(this.fish).reduce((a, b) => a + b, 0);
    }
}