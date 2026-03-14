// tests go here; this will not be compiled when this package is used as an extension.
namespace SpriteKind {
    export let Text = SpriteKind.create()
}

scene.setBackgroundImage(assets.image`orig`)
game.setDialogFrame(imageEffects.shadeRect(img`
    ..bbbbbbbbbbbbbbbbbbbb..
    .bd111111111111111111db.
    bd1dbbbbbbbbbbbbbbbbd1db
    b1dbbbbbbbbbbbbbbbbbbd1b
    b1bd1111111111111111db1b
    b1b111111111111111111b1b
    b1b111111111111111111b1b
    b1b111111111111111111b1b
    b1b111111111111111111b1b
    b1b111111111111111111b1b
    b1b111111111111111111b1b
    b1b111111111111111111b1b
    b1b111111111111111111b1b
    b1b111111111111111111b1b
    b1b111111111111111111b1b
    b1b111111111111111111b1b
    b1b111111111111111111b1b
    b1b111111111111111111b1b
    b1b111111111111111111b1b
    b1bd1111111111111111db1b
    bd1bbbbbbbbbbbbbbbbbb1db
    bbd111111111111111111dbb
    .bbbbbbbbbbbbbbbbbbbbbb.
    ..bbbbbbbbbbbbbbbbbbbb..
`,0,0,24,24,1))
game.setDialogFont(image.font12)
game.setDialogTextColor(12)
game.setDialogCursor(img`
    . . 7 7 7 7 7 7 7 7 7 7 7 7 7 . .
    . 7 6 6 6 6 6 6 6 6 6 6 6 6 6 7 .
    7 6 . . . . . . . . . . . . . 6 7
    7 . . . . . . . . . . . . . . . 7
    7 . . . . . . . . . . . . . . . 7
    7 . . . 7 . . . . . . . 7 . . . 7
    7 . . 7 6 7 . . . . . . 7 7 . . 7
    7 . 7 6 . 6 7 . 7 7 7 7 7 7 7 . 7
    7 . 7 7 7 7 7 . 6 6 6 6 7 7 6 . 7
    7 . 7 6 6 6 7 . . . . . 7 6 . . 7
    7 . 6 . . . 6 . . . . . 6 . . . 7
    7 . . . . . . . . . . . . . . . 7
    7 . . . . . . . . . . . . . . . 7
    7 . . . . . . . . . . . . . . . 7
    6 7 . . . . . . . . . . . . . 7 6
    . 6 7 7 7 7 7 7 7 7 7 7 7 7 7 6 .
    . . 6 6 6 6 6 6 6 6 6 6 6 6 6 . .
`)
game.showLongText(`Try these effects out! You can even combine them.`, DialogLayout.Center)

let mode=0
let text=sprites.create(image.create(160,48),SpriteKind.Text)
let cursor=sprites.create(img`
    f 1 f 1 f
    1 . . . 1
    f . . . f
    1 . . . 1
    f 1 f 1 f
`,SpriteKind.Player)
cursor.setFlag(SpriteFlag.StayInScreen,true)
text.top=0
const orig = assets.image`orig`
let effectAmount=2
let bulgeRadius=40
forever(function() {
    if (mode == 0) {
        text.image.fill(0)
        text.image.fillRect(0, 0, 150, 30, 15)
        text.image.print("menu: mode, Arrows: move", 1, 1, 1, image.font8)
        text.image.print("a/b: radius", 1, 10, 1, image.font8)
        text.image.print("negative effect", 1, 20, 1, image.font8)
        scene.setBackgroundImage(imageEffects.bulgePinch(orig, -3, cursor.x, cursor.y, bulgeRadius))
        controller.moveSprite(cursor, 100, 100)
        cursor.setFlag(SpriteFlag.Invisible, false)
        if (controller.A.isPressed()) {
            bulgeRadius++
        }
        if (controller.B.isPressed()) {
            bulgeRadius--
        }
        bulgeRadius = Math.constrain(bulgeRadius, 1, 160)
    }
    if (mode == 1) {
        text.image.fill(0)
        text.image.fillRect(0, 0, 150, 30, 15)
        text.image.print("menu: mode, Arrows: move", 1, 1, 1, image.font8)
        text.image.print("a/b: radius", 1, 10, 1, image.font8)
        text.image.print("positive effect", 1, 20, 1, image.font8)
        scene.setBackgroundImage(imageEffects.bulgePinch(orig, 3, cursor.x, cursor.y, bulgeRadius))
        controller.moveSprite(cursor, 100, 100)
        cursor.setFlag(SpriteFlag.Invisible, false)
        if (controller.A.isPressed()) {
            bulgeRadius++
        }
        if (controller.B.isPressed()) {
            bulgeRadius--
        }
        bulgeRadius = Math.constrain(bulgeRadius, 1, 160)
    } else if (mode==2) {
        text.image.fill(0)
        text.image.fillRect(0, 0, 160, 20, 15)
        text.image.print("menu: mode, Up/Down: value", 1, 1, 1, image.font8)
        text.image.print(`jitter: ${effectAmount}`, 1, 10, 1, image.font8)
        controller.moveSprite(cursor, 0, 0)
        cursor.setFlag(SpriteFlag.Invisible, true)
        scene.setBackgroundImage(imageEffects.jitterImage(orig, effectAmount))
    } else if (mode==3) {
        text.image.fill(0)
        text.image.fillRect(0, 0, 160, 20, 15)
        text.image.print("menu: mode, Up/Down: value", 1, 1, 1, image.font8)
        text.image.print(`melt: ${effectAmount}`, 1, 10, 1, image.font8)
        controller.moveSprite(cursor, 0, 0)
        cursor.setFlag(SpriteFlag.Invisible, true)
        scene.setBackgroundImage(imageEffects.meltImage(orig, 0, effectAmount))
    } else if (mode==4) {
        text.image.fill(0)
        text.image.fillRect(0, 0, 160, 10, 15)
        text.image.print("menu: mode, arrows: move", 1, 1, 1, image.font8)
        controller.moveSprite(cursor, 100, 100)
        cursor.setFlag(SpriteFlag.Invisible, false)
        scene.setBackgroundImage(imageEffects.shadeImage(orig, cursor.x-44,cursor.y-44,assets.image`shadeimage`,1))
    }
})
controller.menu.onEvent(ControllerButtonEvent.Pressed, function() {
    mode=(mode+1)%5
    effectAmount=2
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (mode == 2 || mode==3) { effectAmount++ }
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (mode == 2 || mode==3) { effectAmount--; effectAmount=Math.max(effectAmount,0) }
})