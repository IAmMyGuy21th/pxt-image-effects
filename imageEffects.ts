
/**
* Use this file to define custom functions and blocks.
* Read more at https://arcade.makecode.com/blocks/custom
*/

enum ShadingLevel {
    //% block="One"
    One = 1,
    //% block="Two"
    Two = 2,
    //% block="Three"
    Three = 3,
    //% block="Four"
    Four = 4
}

/**
 * Image effects. Try not to use the reporter versions much because it creates a new image each time (low memory)
 */
//% weight=100 color=#339999 icon="" advanced=true
namespace imageEffects {
    //% block="shading image"
    //% group="Helpers"
    export let shadingImage = img`
        . 1 2 3 4 5 6 7 8 9 a b c d e f
        . d e b e 4 8 6 c 6 c c f b c f
        . b c c c e c 8 f 8 f f f c f f
        . c f f f c f c f c f f f f f f
        . f f f f f f f f f f f f f f f
    `
    /**
     * Goes through every pixel in an image and jitters it by amount then returns output
     * @param image image to jitter
     * @param amount jitter amount in pixels
     */
    //% block="$image jittered with radius $amount"
    //% image.shadow=screen_image_picker
    //% group="Effects and Util Reporters"
    export function jitteredImage(image: Image, amount: number) {
        amount = Math.round(amount)
        let tempImage = image.clone()
        for (let tx = 0; tx < image.width; tx++) {
            for (let ty = 0; ty < image.height; ty++) {
                tempImage.setPixel(tx, ty, image.getPixel(Math.constrain(Math.randomRange(-amount, amount) + tx, 0, image.width - 1), Math.constrain(Math.randomRange(-amount, amount) + ty, 0, image.height - 1)))
            }
        }
        return tempImage.clone()
    }

    /**
     * Goes through every pixel in an image and jitters it by amount
     * @param image image to jitter
     * @param amount jitter amount in pixels
     */
    //% block="jitter $image radius $amount"
    //% image.shadow=screen_image_picker
    //% group="Effects and Util"
    export function jitterImage(image: Image, amount: number) {
        amount = Math.round(amount)
        let tempimg = image.clone()
        for (let tx = 0; tx < image.width; tx++) {
            for (let ty = 0; ty < image.height; ty++) {
                image.setPixel(tx, ty, tempimg.getPixel(Math.constrain(Math.randomRange(-amount, amount) + tx, 0, image.width - 1), Math.constrain(Math.randomRange(-amount, amount) + ty, 0, image.height - 1)))
            }
        }
    }

    /**
     * Bulges or pinches an image from given coords by amount
     * @param image image to bulge/pinch
     * @param amount amount to bulge/pinch
     * @param cx origin x
     * @param cy origin y
     * @param r optional if you want to change radius
     */
    //% block="bulge/pinch $image amount $amount center x $cx y $cy radius $r"
    //% image.shadow=screen_image_picker
    //% group="Effects and Util"
    //% expandableArgumentMode="toggle"
    //% expandableArgument="r"
    export function setBulgePinch(image: Image, amount: number, cx: number, cy: number, r?: number) {
        const src = image.clone()
        const maxR = r ? r : Math.max(src.width, src.height) / 2

        for (let x = 0; x < src.width; x++) {
            for (let y = 0; y < src.height; y++) {

                // distance from center
                const dx = x - cx
                const dy = y - cy
                const dist = Math.sqrt(dx * dx + dy * dy)

                // normalize 0–1
                const r = dist / maxR
                if (r > 1) {
                    // outside effect radius → copy pixel unchanged
                    image.setPixel(x, y, src.getPixel(x, y))
                    continue
                }

                // bulge/pinch curve
                // amount > 0 = bulge, amount < 0 = pinch
                const factor = 1 + amount * (1 - r * r)

                // compute source coords
                const sx = cx + dx * factor
                const sy = cy + dy * factor

                // clamp using Math.constrain
                const csx = Math.constrain(Math.round(sx), 0, src.width - 1)
                const csy = Math.constrain(Math.round(sy), 0, src.height - 1)

                image.setPixel(x, y, src.getPixel(csx, csy))
            }
        }
    }

    /**
     * Returns a deformed image bulged or pinched from given coords by amount
     * @param image image to bulge/pinch
     * @param amount amount to bulge/pinch
     * @param cx origin x
     * @param cy origin y
     * @param r optional if you want to change radius
     */
    //% block="$image bulge/pinch by amount $amount center x $cx y $cy radius $r"
    //% image.shadow=screen_image_picker
    //% group="Effects and Util Reporters"
    //% expandableArgumentMode="toggle"
    //% expandableArgument="r"
    export function bulgePinch(image: Image, amount: number, cx: number, cy: number, r?: number): Image {
        const src = image.clone()
        const out = image.clone()
        const maxR = r ? r : Math.max(src.width, src.height) / 2

        for (let x = 0; x < src.width; x++) {
            for (let y = 0; y < src.height; y++) {

                // distance from center
                const dx = x - cx
                const dy = y - cy
                const dist = Math.sqrt(dx * dx + dy * dy)

                // normalize 0–1
                const r = dist / maxR
                if (r > 1) {
                    // outside effect radius → copy pixel unchanged
                    out.setPixel(x, y, src.getPixel(x, y))
                    continue
                }

                // bulge/pinch curve
                // amount > 0 = bulge, amount < 0 = pinch
                const factor = 1 + amount * (1 - r * r)

                // compute source coords
                const sx = cx + dx * factor
                const sy = cy + dy * factor

                // clamp using Math.constrain
                const csx = Math.constrain(Math.round(sx), 0, src.width - 1)
                const csy = Math.constrain(Math.round(sy), 0, src.height - 1)

                out.setPixel(x, y, src.getPixel(csx, csy))
            }
        }

        return out
    }

    /**
     * Melt effect on image
     * @param image image to jitter
     * @param min minimum to melt
     * @param max maximum to melt
     */
    //% block="melt $image min $min max $max backward? $backward"
    //% image.shadow=screen_image_picker
    //% group="Effects and Util"
    export function setMeltImage(image: Image, min: number, max: number, backward?: boolean) {
        for (let tx = 0; tx < image.width; tx++) {
            if (backward) {
                for (let ty = 0; ty < image.height; ty++) {
                    image.drawLine(tx, ty, tx, Math.randomRange(min, max) + ty, image.getPixel(tx, ty))
                }
            } else {
                for (let ty = image.height - 1; ty >= 0; ty--) {
                    image.drawLine(tx, ty, tx, Math.randomRange(min, max) + ty, image.getPixel(tx, ty))
                }
            }
        }
    }

    /**
     * Returns melted version of image
     * @param image image to jitter
     * @param min minimum to melt
     * @param max maximum to melt
     */
    //% block="$image melted random min $min max $max backward? $backward"
    //% image.shadow=screen_image_picker
    //% group="Effects and Util Reporters"
    export function meltedImage(image: Image, min: number, max: number, backward?: boolean) {
        let tempImage = image.clone()
        for (let tx = 0; tx < image.width; tx++) {
            if (backward) {
                for (let ty = 0; ty < image.height; ty++) {
                    tempImage.drawLine(tx, ty, tx, Math.randomRange(min, max) + ty, image.getPixel(tx, ty))
                }
            } else {
                for (let ty = image.height - 1; ty >= 0; ty--) {
                    tempImage.drawLine(tx, ty, tx, Math.randomRange(min, max) + ty, image.getPixel(tx, ty))
                }
            }
        }
        return tempImage.clone()
    }

    /**
     * For blocks. Sets current shading image. Should be 16 pixels wide, with unshaded colors in order at the top.
     */
    //% block="set shading image to $newImage"
    //% newImage.shadow=screen_image_picker
    //% group="Helpers"
    export function blocksSetShadingImage(newImage: Image) {
        shadingImage = newImage.clone()
    }

    //% block="convert shading image to Buffer row: $row"
    //% group="Helpers"
    export function paletteRowToBuffer(row: number): Buffer {
        // clamp row to 0–4 just in case
        row = Math.constrain(row, 0, shadingImage.height - 1)

        const buf = pins.createBuffer(16)
        for (let c = 0; c < 16; c++) {
            // x = color index, y = row (shade level)
            buf[c] = shadingImage.getPixel(c, row)
        }
        return buf
    }


    /**
     * Returns target shaded in rectangle using current shading image
     * @param target image to shade
     * @param left left of rect
     * @param top top of rect
     * @param width rect width
     * @param height rect height
     * @param shadeLevel how much to shade (row in shadingImage)
     */
    //% block="$target shaded in rectangle left top $left $top width $width height $height with shade $shadeLevel"
    //% target.shadow=screen_image_picker
    //% group="Effects and Util Reporters"
    export function shadeRect(
        target: Image,
        left: number,
        top: number,
        width: number,
        height: number,
        shadeLevel: ShadingLevel
    ): Image {
        const out = target.clone()
        const colormap = paletteRowToBuffer(shadeLevel)

        out.mapRect(left, top, width, height, colormap)

        return out
    }

    /**
     * Shades a rectangular area in target using current shading image
     * @param target image to shade
     * @param left left of rect
     * @param top top of rect
     * @param width rect width
     * @param height rect height
     * @param shadeLevel how much to shade (row in shadingImage)
     */
    //% block="shade area in $target left top $left $top width $width height $height with shade $shadeLevel"
    //% target.shadow=screen_image_picker
    //% group="Effects and Util"
    export function setShadeRect(
        target: Image,
        left: number,
        top: number,
        width: number,
        height: number,
        shadeLevel: ShadingLevel
    ) {
        const colormap = paletteRowToBuffer(shadeLevel)
        target.mapRect(left, top, width, height, colormap)
    }

    /**
     * Returns target shaded where mask is non-transparent
     * @param target image
     * @param left left coord
     * @param top top coord
     * @param mask mask Image
     * @param shadeLevel shading row/level (1-4)
     */
    //% block="$target shaded from corner $left $top using $mask shadelevel $shadeLevel"
    //% target.shadow=screen_image_picker
    //% mask.shadow=screen_image_picker
    //% group="Effects and Util Reporters"
    export function shadeImage(
        target: Image,
        left: number,
        top: number,
        mask: Image,
        shadeLevel: ShadingLevel
    ): Image {
        const out = target.clone()
        const row = Math.constrain(shadeLevel, 0, shadingImage.height - 1)

        for (let mx = 0; mx < mask.width; mx++) {
            const tx = left + mx
            if (tx < 0 || tx >= target.width) continue

            for (let my = 0; my < mask.height; my++) {
                const ty = top + my
                if (ty < 0 || ty >= target.height) continue

                if (mask.getPixel(mx, my)) {
                    const c = target.getPixel(tx, ty)
                    const shaded = shadingImage.getPixel(c, row)
                    out.setPixel(tx, ty, shaded)
                }
            }
        }

        return out
    }

    /**
     * Shades an area in target where mask is non-transparent
     * @param target image
     * @param left left coord
     * @param top top coord
     * @param mask mask Image
     * @param shadeLevel shading row/level (1-4)
     */
    //% block="shade $target corner $left $top using $mask shadelevel $shadeLevel"
    //% target.shadow=screen_image_picker
    //% mask.shadow=screen_image_picker
    //% group="Effects and Util"
    export function setShadeImage(
        target: Image,
        left: number,
        top: number,
        mask: Image,
        shadeLevel: ShadingLevel
    ) {
        const row = Math.constrain(shadeLevel, 0, shadingImage.height - 1)

        for (let mx = 0; mx < mask.width; mx++) {
            const tx = left + mx
            if (tx < 0 || tx >= target.width) continue

            for (let my = 0; my < mask.height; my++) {
                const ty = top + my
                if (ty < 0 || ty >= target.height) continue

                if (mask.getPixel(mx, my)) {
                    const c = target.getPixel(tx, ty)
                    const shaded = shadingImage.getPixel(c, row)
                    target.setPixel(tx, ty, shaded)
                }
            }
        }
    }


    /**
     * Returns a masked image using provided mask, showing areas where mask image is non-transparent
     * @param input image to mask
     * @param mask mask image to use
     */
    //% block="$input masked using $mask pos $x $y"
    //% input.shadow=screen_image_picker
    //% mask.shadow=screen_image_picker
    //% group="Effects and Util Reporters"
    export function maskedImage(input: Image, mask: Image, x: number, y: number) {
        //if (mask.width == input.width && mask.height == input.height) {
            let out = image.create(input.width, input.height)
            for (let tx = 0; tx < input.width; tx++) {
                for (let ty = 0; ty < input.height; ty++) {
                    out.setPixel(tx, ty, mask.getPixel(tx-x, ty-y) > 0 ? input.getPixel(tx, ty) : 0)
                }
            }
            return out
        //}
    }

    /**
     * Masks an image using provided mask, showing areas where mask image is non-transparent
     * @param input image to mask
     * @param mask mask image to use
     */
    //% block="mask $input using $mask pos $x $y"
    //% input.shadow=screen_image_picker
    //% mask.shadow=screen_image_picker
    //% group="Effects and Util"
    export function setMaskedImage(input: Image, mask: Image, x: number, y: number) {
        //if (mask.width == input.width && mask.height == input.height) {
            for (let tx = 0; tx < input.width; tx++) {
                for (let ty = 0; ty < input.height; ty++) {
                    input.setPixel(tx, ty, mask.getPixel(tx-x, ty-y) > 0 ? input.getPixel(tx, ty) : 0)
                }
            }
        //}
    }
}

/**
 * Block wrappers and extras for image modifications.
 */
//% weight=95 color=#66bbbb icon="" advanced=true
namespace imageExtras {
    /**
     * Returns an image repeated count times in the Y axis.
     * @param i image to repeat
     * @param c count
     */
    //% block="repeat $i along y axis $c times"
    //% i.shadow=screen_image_picker
    //% group="Block Wrappers"
    export function imageRepeatY(i: Image, c: number) {
        return image.repeatY(c, i)
    }

    /**
     * Return an image from the image array provided concat along Y axis.
     * @param i image array to concat
     */
    //% block="concat images $i along y axis"
    //% i.shadow=lists_create_with
    //% i.defl=screen_image_picker
    //% group="Block Wrappers"
    export function imageConcatY(i: Image[]) {
        return image.concatY(i)
    }


    //% block="font 5px"
    //% group="Block Wrappers"
    export const font5 = image.font5
    //% block="font 8px"
    //% group="Block Wrappers"
    export const font8 = image.font8
    //% block="font 12px"
    //% group="Block Wrappers"
    export const font12 = image.font12

    /**
     * Gets the most appropriate font for the text provided
     * @param text text to use
     */
    //% block="get font for text $text"
    //% group="Block Wrappers"
    export function imageGetFontForText(text: string) {
        return image.getFontForText(text)
    }

    /**
     * Scales a font object by provided size multiplier
     * @param font font to scale
     * @param s size multiplier
     */
    //% block="scale font $font by $s"
    //% group="Block Wrappers"
    export function imageScaledFont(font: image.Font, s: number) {
        return image.scaledFont(font, s)
    }
}
