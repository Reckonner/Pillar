const scene = new Entity()
const pillar = new Entity()
const island = new Entity()

const B1 = new Entity
const B2 = new Entity
const B3 = new Entity
const B4 = new Entity
const B5 = new Entity

let isStarted = false
let isFinished = false
let timer = 0
let achivement = 0
let topAchivement = 60

const camera = Camera.instance

const canvas = new UICanvas
const timeMessage = new UIText(canvas)
const topTimeMessage = new UIText(canvas)


export function distance(pos1: Vector3, pos2: Vector3): number {
    const a = pos1.x - pos2.x
    const b = pos1.z - pos2.z
    return a * a + b * b
  }

export class UISystem {
    update(){
        timeMessage.value = timer.toFixed(2)
        timeMessage.fontSize = 30
        timeMessage.vAlign = 'top'
        topTimeMessage.value = topAchivement.toFixed(2) + '\n top time '
        topTimeMessage.fontSize = 30
        topTimeMessage.hAlign = 'right'
        topTimeMessage.vAlign = 'top'
        topTimeMessage.positionX = -100
        topTimeMessage.positionY = -30
        //topTimeMessage.vAlign = 'bottom'

    }
}

export class Running {
    update(dt: number){
        if(isStarted == true && isFinished == false)
        timer += dt
    }
}

export class start {
    update() {
      let transform = pillar.getComponent(Transform)
      let dist = distance(transform.position, camera.position)
      if ( dist < 950) {
        isStarted = true
        isFinished = false
      }
    }
  }

  export class finish {
    update() {
      let transform = island.getComponent(Transform)
      let dist = distance(transform.position, camera.position)
      if ( dist < 850 && isStarted == true) {
        isStarted = false
        isFinished = true
        }
      }
  }

  export class record {
      update(){
          if (isFinished == true){
              isFinished = false
              achivement = timer
               if (achivement < topAchivement){
               topAchivement = achivement
               }
              timer = 0 
          }
      }

  }

let b1Animator = new Animator
let b2Animator = new Animator
let b3Animator = new Animator
let b4Animator = new Animator
let b5Animator = new Animator

const moveClip1 = new AnimationState('move1')
const moveClip2 = new AnimationState('move2')
const moveClip3 = new AnimationState('move3')
const moveClip4 = new AnimationState('move4')
const moveClip5 = new AnimationState('move5')

b1Animator.addClip(moveClip1)
b2Animator.addClip(moveClip2)
b3Animator.addClip(moveClip3)
b4Animator.addClip(moveClip4)
b5Animator.addClip(moveClip5)
moveClip1.looping = false
moveClip2.looping = false
moveClip3.looping = false
moveClip4.looping = false
moveClip5.looping = false

moveClip1.playing = false
moveClip2.playing = false
moveClip3.playing = false
moveClip4.playing = false
moveClip5.playing = false


scene.addComponent(new GLTFShape('models/E.glb'))
scene.addComponent(new Transform({ position: new Vector3(0, 0, 0)}))

pillar.addComponent(new GLTFShape('models/pillar.glb'))
pillar.addComponent(new Transform({ position: new Vector3(36, 0, 91)}))

island.addComponent(new GLTFShape('models/island.glb'))
island.addComponent(new Transform({ position: new Vector3(105.759, 64.82, 25.934)}))

B1.addComponent(new GLTFShape('models/Bridge_001.glb'))
B1.addComponent(new Transform({ position: new Vector3(0, 0, 0)}))
B1.addComponent(b1Animator)
B1.addComponent(new OnClick(e => {
    
    moveClip1.play()
}))

B2.addComponent(new GLTFShape('models/Bridge_002.glb'))
B2.addComponent(new Transform({ position: new Vector3(0, 0, 0)}))
B2.addComponent(b2Animator)
B2.addComponent(new OnClick(e => {
    
    moveClip2.play()
}))

B3.addComponent(new GLTFShape('models/Bridge_003.glb'))
B3.addComponent(new Transform({ position: new Vector3(0, 0, 0)}))
B3.addComponent(b3Animator)
B3.addComponent(new OnClick(e => {
    
    moveClip3.play()
}))

B4.addComponent(new GLTFShape('models/Bridge_004.glb'))
B4.addComponent(new Transform({ position: new Vector3(0, 0, 0)}))
B4.addComponent(b4Animator)
B4.addComponent(new OnClick(e => {
    
    moveClip4.play()
}))

B5.addComponent(new GLTFShape('models/Bridge_005.glb'))
B5.addComponent(new Transform({ position: new Vector3(0, 0, 0)}))
B5.addComponent(b5Animator)
B5.addComponent(new OnClick(e => {
    
    moveClip5.play()
}))


engine.addEntity(scene)
engine.addEntity(pillar)
engine.addEntity(island)

engine.addEntity(B1)
engine.addEntity(B2)
engine.addEntity(B3)
engine.addEntity(B4)
engine.addEntity(B5)
engine.addSystem(new UISystem)
engine.addSystem(new start)
engine.addSystem(new finish)
engine.addSystem(new Running)
engine.addSystem(new record)