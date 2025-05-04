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
    rotation: number = 0;

    constructor(x: number, y: number, image: HTMLImageElement) {
        this.x = x;
        this.y = y;
        this.image = image;
    }

    update() {
        this.y -= this.speed;

        if (this.isVeering) {
            this.x += this.veerDirection * 5;

            const rotationSpeed = 0.05;
            // Apply rotation based on veering direction (~30 degrees as radians)
            const maxRotation = 0.5;

            if (this.veerDirection === -1 && this.rotation > -maxRotation) {
                this.rotation -= rotationSpeed;
            } else if (this.veerDirection === 1 && this.rotation < maxRotation) {
                this.rotation += rotationSpeed;
            }
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.save();

        // Move to center of car.
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);

        // Apply rotation.
        ctx.rotate(this.rotation);

        ctx.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);

        ctx.restore();
    }

    isOffScreen(): boolean {
        return this.y + this.height < 0;
    }

    veer() {
        this.isVeering = true;
        this.veerDirection = Math.random() < 0.5 ? -1 : 1;
    }
}
