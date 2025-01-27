import Brush from './Brush';
import {SC_CONFIG, SCRATCH_TYPE} from './ScratchCardConfig';
import {dispatchCustomEvent, getOffset, injectHTML, loadImage, throttle} from './utils'

class ScratchCard {
    readonly config: SC_CONFIG;
    readonly scratchType: SCRATCH_TYPE;
    readonly ctx: CanvasRenderingContext2D;
    readonly container: HTMLElement;
    private position: number[];
    private canvas: HTMLCanvasElement;
    private readyToClear: Boolean;
    private brush: Brush;
    private callbackDone: Boolean;
    private scratchImage: HTMLImageElement;
    public brushImage: any;
    public zone: { top: number, left: number };
    public percent: number;
    public static type = SCRATCH_TYPE;

    constructor(selector: string | HTMLElement, config: SC_CONFIG) {
        const defaults = {
            scratchType: SCRATCH_TYPE.LINE,
            containerWidth: 100,
            containerHeight: 100,
            percentToFinish: 50,
            nPoints: 0,
            pointSize: [0, 0],
            callback: () => {
            },
            brushSrc: '',
            imageForwardSrc: '',
            imageBackgroundSrc: '',
            htmlBackground: '',
            clearZoneRadius: 0,
            enabledPercentUpdate: true,
        };

        this.config = {...defaults, ...config};
        this.scratchType = this.config.scratchType;
        this.container = <HTMLElement>(
            this.isString(selector) ?
                document.querySelector(String(selector)) : selector
        );
        this.position = [0, 0]; // init position
        this.readyToClear = false;
        this.percent = 0;
        this.callbackDone = false;

        // Create and add the canvas
        this.generateCanvas();

        this.ctx = this.canvas.getContext('2d', {willReadFrequently: this.config.enabledPercentUpdate});

        // Init the brush instance
        this.brush = new Brush(this.ctx, this.position[0], this.position[1]);

        // Init the brush if  necessary
        if (this.config.scratchType === SCRATCH_TYPE.BRUSH) {
            loadImage(this.config.brushSrc).then(image => {
                this.brushImage = image;
            });
        }

        /*---- Scratching method , call in throttle event ------------------------------------*/
        let scratching = throttle((event: Event) => {
            event.preventDefault();
            this.dispatchEvent('scratch', 'move');
            this.position = this.mousePosition(event);
            this.brush.updateMousePosition(this.position[0], this.position[1]);
            this.scratch();

            // calculate the percent of area scratched.
            if (this.config.enabledPercentUpdate) {
                this.percent = this.updatePercent();
            }
        }, 16);

        const addListener = (down: string, up: string, move: string) => {
            this.canvas.addEventListener(down, (event) => {
                event.preventDefault();
                this._setScratchPosition();

                if (this.scratchType === SCRATCH_TYPE.LINE) {
                    this.position = this.mousePosition(event);
                    this.brush.updateMousePosition(this.position[0], this.position[1]);
                    this.brush.startLine(this.config.clearZoneRadius);
                }

                this.canvas.addEventListener(move, scratching);
                const func = () => {
                    this.canvas.removeEventListener(move, scratching);
                    this.checkFinish(); // clear and callback
                    document.body.removeEventListener(up, func);
                }
                document.body.addEventListener(up, func);
            });
        }

        addListener('mousedown', 'mouseup', 'mousemove');
        addListener('touchstart', 'touchend', 'touchmove');

        // Update canvas positions when the window has been resized
        window.addEventListener('resize', throttle(() => {
            this._setScratchPosition();
        }, 100));

        // Update canvas positions when the window has been scrolled
        window.addEventListener('scroll', throttle(() => {
            this._setScratchPosition();
        }, 16));
    }


    /**
     * Check if selector is a string
     * @param selector
     * @returns {boolean}
     */
    isString(selector: string | HTMLElement): boolean {
        return (typeof selector === 'string' || selector instanceof String)
    }

    /**
     * Get percent of scratchCard
     * @returns {number}
     */
    getPercent(): number {
        return this.percent;
    }

    /**
     * Return the top and left position
     * @private
     */
    private _setScratchPosition() {
        this.zone = getOffset(this.canvas);
    }

    checkFinish() {
        // Exec the callback once
        if (!this.callbackDone && this.percent > this.config.percentToFinish) {
            this.finish();
        }
    }

    finish() {
        this.clear();
        this.canvas.style.pointerEvents = 'none';
        if (this.config.callback !== undefined) {
            this.callbackDone = true;
            this.config.callback.call(this);
        }
    }

    /**
     * Distpach event
     * @param {string} phase
     * @param {string} type
     */
    dispatchEvent(phase: string, type: string) {
        dispatchCustomEvent(this.canvas, `${phase}.${type}`, {});
    }

    init(): Promise<any> {
        return new Promise((resolve: any, reject: any) => {
            loadImage(this.config.imageForwardSrc).then((img: HTMLImageElement) => {
                this.percent = 0;
                this.callbackDone = false;
                this.scratchImage = img;
                this.ctx.drawImage(this.scratchImage, 0, 0, this.canvas.width, this.canvas.height);
                this.setBackground();
                // Resolve the promise init
                resolve();
            }, (event: Event): Error => {
                // Reject init
                reject(event);
                return new TypeError(`${this.config.imageForwardSrc} is not loaded.`);
            });
        });
    }

    private generateCanvas(): void {
        this.canvas = document.createElement('canvas');
        this.canvas.classList.add('sc__canvas');

        // Add canvas into container
        this.canvas.width = this.config.containerWidth;
        this.canvas.height = this.config.containerHeight;
        this.container.appendChild(this.canvas);
    }

    private setBackground(): void {
        if (this.config.htmlBackground.length !== 0) {
            injectHTML(this.config.htmlBackground, this.container);
        } else {
            let image = document.createElement('img');
            loadImage(this.config.imageBackgroundSrc).then((img: HTMLImageElement) => {
                image.src = img.src;
                this.container.insertBefore(image, this.canvas);
            });
        }
    };

    mousePosition(event: any): number[] {
        let posX: number;
        let posY: number;

        switch (event.type) {
            case 'touchmove':
                posX = event.touches[0].clientX - this.config.clearZoneRadius - this.zone.left;
                posY = event.touches[0].clientY - this.config.clearZoneRadius - this.zone.top;
                break;
            case 'mousemove':
                posX = event.clientX - this.config.clearZoneRadius - this.zone.left;
                posY = event.clientY - this.config.clearZoneRadius - this.zone.top;
                break;
        }

        return [posX, posY];
    }

    scratch(): void {
        this.ctx.globalCompositeOperation = 'destination-out';
        this.ctx.save();

        // Choose the good method to 'paint'
        switch (this.config.scratchType) {
            case SCRATCH_TYPE.BRUSH:
                this.brush.brush(this.brushImage);
                break;
            case SCRATCH_TYPE.CIRCLE:
                this.brush.circle(this.config.clearZoneRadius);
                break;
            case SCRATCH_TYPE.SPRAY:
                this.brush.spray(this.config.clearZoneRadius, this.config.pointSize, this.config.nPoints);
                break;
            case SCRATCH_TYPE.LINE:
                this.brush.drawLine(this.config.clearZoneRadius);
                break;
        }

        this.ctx.restore();
    }

    /*
    * Image data :
    * Red: image.data[0]
    * Green: image.data[1]
    * Blue: image.data[2]
    * Alpha: image.data[3]
    * */
    updatePercent(): number {
        let counter = 0; // number of pixels cleared
        let imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        let imageDataLength = imageData.data.length;

        // loop data image drop every 4 items [r, g, b, a, ...]
        for (let i = 0; i < imageDataLength; i += 4) {
            // Increment the counter only if the pixel in completely clear
            if (imageData.data[i] === 0 && imageData.data[i + 1] === 0 && imageData.data[i + 2] === 0 && imageData.data[i + 3] === 0) {
                counter++;
            }
        }

        return (counter >= 1) ? (counter / (this.canvas.width * this.canvas.height)) * 100 : 0;
    }

    /**
     * Just clear the canvas
     */
    clear(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

}

export default ScratchCard;
