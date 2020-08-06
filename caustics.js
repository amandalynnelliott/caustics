let settings = {
   pointsCount: 100,
   multiplier: 15
};

let colors = {
    bgColor1: "#F39B57",
    bgColor2: "#B96351",
    bgColor3: "#582E37",
    lineColor: "#f2f2f2"
};

// const rad = (2 * Math.PI) / settings.pointsCount;

window.onload = function() {
    const pixelRatio = window.devicePixelRatio;
    const c = document.getElementById("myCanvas");
    /** @type {CanvasRenderingContext2D} */
    const ctx = c.getContext("2d");
    let gui = new dat.GUI();

    let width = c.width = window.innerWidth;
    let height = c.height = window.innerHeight;

    function datGui(){
        gui = new dat.GUI();
        let guiSettings = gui.addFolder('Settings');
        guiSettings.add(settings, 'pointsCount', 2, 1000).step(1).onChange(draw);
        guiSettings.add(settings, 'multiplier', 2, 100).step(1).onChange(draw);
        guiSettings.addColor(colors, 'bgColor1').onChange(draw);
        guiSettings.addColor(colors, 'bgColor2').onChange(draw);
        guiSettings.addColor(colors, 'bgColor3').onChange(draw);
        guiSettings.addColor(colors, 'lineColor').onChange(draw);
        guiSettings.open();
        return gui;
      }
    datGui();

    function draw() {
        width = c.width = window.innerWidth;
        height = c.height = window.innerHeight;

        ctx.clearRect(0, 0, width, height);
        const bgGrd = ctx.createRadialGradient(width / 2, height / 2, 50, width / 2, height / 2, 700);
        bgGrd.addColorStop(0, colors.bgColor1);
        bgGrd.addColorStop(0.5, colors.bgColor2);
        bgGrd.addColorStop(1, colors.bgColor3);
        ctx.fillStyle = bgGrd;
        ctx.fillRect(0, 0, width, height);

        let x0 = width/2;
        let y0 = height/2;
        let r = Math.min(width, height) /2 * .8;

        ctx.lineWidth = 1.1;
        ctx.strokeStyle = "#e6e6e6";
        ctx.beginPath();
        ctx.arc(x0, y0, r, 0, 2 * Math.PI, false);
        ctx.stroke();

        let dot_positions = []
        let products = []
        let font_size = 16;
        ctx.font = font_size + "px Open Sans";
        ctx.textAlign = "center";

        let new_r = r + 20;

        for (i = 0; i < settings.pointsCount; i++) {

            let x = x0 - r * Math.cos(2 * Math.PI * i / settings.pointsCount);
            let y = y0 - r * Math.sin(2 * Math.PI * i / settings.pointsCount);

            let position = [i, x, y];
            dot_positions.push(position);

           

            let product = (i * settings.multiplier);
            products.push(product);

            // ctx.moveTo(x, y)
            ctx.beginPath();
            ctx.fillStyle=colors.lineColor;
            ctx.arc(x, y, 3, 0, 2 * Math.PI);
            ctx.fill();

            if (settings.pointsCount <= 100){
                x = x0 - (new_r) * Math.cos(2 * Math.PI * i / settings.pointsCount);
                y = y0 - (new_r) * Math.sin(2 * Math.PI * i / settings.pointsCount) + (font_size/3);
                ctx.fillStyle="#e6e6e6";
                ctx.fillText(i, x, y)
            } 
        }
        
        for (i = 0; i < settings.pointsCount; i++) {
            j = products[i] % settings.pointsCount
            
            ctx.beginPath();
            ctx.moveTo(dot_positions[i][1], dot_positions[i][2]);
            ctx.lineTo(dot_positions[j][1], dot_positions[j][2]);
            ctx.strokeStyle = colors.lineColor;
            ctx.stroke();
        }
    }

    draw();

    window.addEventListener('resize', draw);
    window.addEventListener('orientationchange', draw);
}








