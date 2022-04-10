export default class Timer {
    constructor(root){
        root.innerHTML = Timer.getHTML();
        this.elm = {
            minutes: document.querySelector(".timer__part--min"),
            seconds: document.querySelector(".timer__part--secs"),
            control: root.querySelector(".timer__btn--control"),
            input: document.querySelector(".input__time")
        };

        this.interval = null;
        this.totalSecs = 0;

        this.elm.control.addEventListener("click", () => {
            if (this.interval === null){
                this.start();
            } else {
                this.stop();
            }
        })
        this.elm.input.addEventListener("input", () => {
            this.totalSecs = this.elm.input.value*60;
            this.elm.minutes.innerHTML = this.elm.input.value.toString().padStart(2, "0");
        })
    }

    updateInterfaceTime(){
        const min = Math.floor(this.totalSecs/60);
        const secs = this.totalSecs%60

        this.elm.minutes.innerHTML = min.toString().padStart(2, "0")
        this.elm.seconds.innerHTML = secs.toString().padStart(2, "0");
    }

    updateInterfaceBtn(){
        if (this.interval === null){
            //Not running
            this.elm.control.innerHTML = `<span class = "material-icons">play_arrow</span>`;
            this.elm.control.classList.add("timer__btn--start");
            this.elm.control.classList.remove("timer__btn--stop");
        } else {
            //running
            this.elm.control.innerHTML = `<span class = "material-icons">pause</span>`;
            this.elm.control.classList.add("timer__btn--stop");
            this.elm.control.classList.remove("timer__btn--start");
        }
    }


    start(){
        if (this.totalSecs === 0) return;

        this.interval = setInterval(() => {
            this.totalSecs--;
            this.updateInterfaceTime();

            if(this.totalSecs===0){
                this.stop();
            }
        }, 1000);

        this.updateInterfaceBtn();
    }

    stop(){
        clearInterval(this.interval);

        this.interval = null;

        this.updateInterfaceBtn();
    }

    static getHTML(){
        return `
        <button type="button" class = "timer__btn timer__btn--control timer__btn--start">
            <span class="material-icons">
                play_arrow
            </span>
        </button>
        `
    }

    
}