export class WeatherData {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.hi = 0;
        this.lo = 0;
        this.name = "";
        this.conditions = "";
    }

    // Setter functions
    setX(x_) {
        this.x = x_;
    }

    setY(y_) {
        this.y = y_;
    }

    setHi(hi_) {
        this.hi = hi_;
    }

    setLo(lo_){
        this.lo = lo_;
    }

    setName(name_) {
        this.name = name_;
    }

    setConditions(conditions_) {
        this.conditions = conditions_;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    getName() {
        return this.name;
    }
}