export class Car {
    x: number;
    y: number;
    width: number = 64;
    height: number = 64;
    speed: number = 3;
    image: HTMLImageElement;
    isVeering: boolean = false;
    // -1 veer left, 1 veer right
    veerDirection: number = 0;

    constructor(x: number, y: number, image: HTMLImageElement) {
        this.x = x;
        this.y = y;
        this.image = image;
    }

    update() {
        this.y -= this.speed;

        if (this.isVeering) {
            this.x += this.veerDirection * 5;
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    isOffScreen(): boolean {
        return this.y + this.height < 0;
    }

    veer() {
        this.isVeering = true;
        this.veerDirection = Math.random() < 0.5 ? -1 : 1;
    }
}
