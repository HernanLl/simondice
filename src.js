const btnlogin = document.getElementById('btn-play')
const input = document.getElementById('input-name')
const loginSection = document.getElementById('login')
const gameSection = document.getElementById('game')
const playerInfo = document.getElementById('data-player')
const name = document.getElementById('name')
const score = document.getElementById('score')
const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const icon = document.getElementById('icon')


btnlogin.addEventListener("click",()=>{
    loginSection.classList.add('hide')
    gameSection.classList.remove('hide')
    playerInfo.classList.remove('hide')
    name.innerHTML = input.value
    score.innerHTML = `Nivel: 1/10`
});
icon.addEventListener("click",()=>{
    icon.classList.remove('fa-play')
    icon.classList.add('fa-sync')
    game.defaultValues()
    setTimeout(() => {
        game.onInit()
    }, 500);
})

class Game{
    constructor(){
        this.secuencia = []
        this.MAX_LEVEL = 15
        this.nivel_actual = 1
        this.aux_nivel = 0
        this.difficulty = 300
        this.colores = {
            celeste,
            violeta,
            naranja,
            verde
        }
        this.selectColor = this.selectColor.bind(this)
    }
    defaultValues(){
        this.aux_nivel = 0;
        this.nivel_actual = 1;
    }
    onInit(){
        score.innerHTML = `Nivel: 1/${this.MAX_LEVEL}`
        this.generarSecuencia()
        this.siguienteNivel()
    }
    generarSecuencia(){
        this.secuencia = new Array(10).fill(0).map(n => Math.floor(Math.random() * 4))
    }
    siguienteNivel(){
        if(this.nivel_actual-1===this.MAX_LEVEL){
            alert('Gano el juego')
            return
        }
        score.innerHTML = `Nivel: ${this.nivel_actual}/${this.MAX_LEVEL}`
        for(let i=0; i<this.nivel_actual;i++){
            setTimeout(() => {
                this.iluminarColor(this.secuencia[i])
            }, this.difficulty * i)
        }
        setTimeout(() => {
            this.enableEvents()
        }, this.difficulty * this.nivel_actual)
    }
    enableEvents(){
        for(let i=0;i<4;i++){
            let color = this.numberToColor(i)
            this.colores[color].classList.add(color)
            this.colores[color].addEventListener("click",this.selectColor)
        }
    }
    disableEvents(){
        for(let i=0;i<4;i++){
            let color = this.numberToColor(i)
            this.colores[color].classList.remove(color)
            this.colores[color].removeEventListener("click",this.selectColor)
        }
    }
    selectColor(event){
        let number = this.colorToNumber(event.target.id)
        if(this.secuencia[this.aux_nivel]!==number){
            icon.classList.remove('fa-play')
            icon.classList.add('fa-sync')
            icon.classList.remove('hide')
            alert('perdio');
            this.aux_nivel = 0;
            this.nivel_actual = 1;
            score.innerHTML = `Nivel: 1/${this.MAX_LEVEL}`
        }else{
            this.aux_nivel++
            console.log(this.aux_nivel);
            if(this.aux_nivel===this.nivel_actual){
                this.nivel_actual++
                this.aux_nivel=0
                this.disableEvents()
                setTimeout(() => {
                    this.siguienteNivel()                    
                }, 500);
            }
        }
    }
    numberToColor(number){
        switch(number){
            case 0: return 'celeste'
            case 1: return 'violeta'
            case 2: return 'naranja'
            case 3: return 'verde'
        }
    }
    colorToNumber(color){
        switch(color){
            case 'celeste': return 0
            case 'violeta': return 1
            case 'naranja': return 2
            case 'verde': return 3
        }
    }
    iluminarColor(number){
        let color = this.numberToColor(number)
        this.colores[color].classList.add('light')
        setTimeout(() => {
            this.colores[color].classList.remove('light')
        }, 200);
    }
}

let game = new Game()
