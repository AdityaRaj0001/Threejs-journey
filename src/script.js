import * as THREE from 'three'
import './style.css'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
// const mesh = new THREE.Mesh(
//     new THREE.SphereGeometry(1, 32, 32),
//     new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
// )

// Create an empty BufferGeometry
const geometry = new THREE.BufferGeometry()
// Create 50 triangles (450 values)
const count = 50
const positionsArray = new Float32Array(count * 3 * 3)
for(let i = 0; i < count * 3 * 3; i++)
{
    positionsArray[i] = (Math.random() - 0.5) * 4
}
const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)
geometry.setAttribute('position', positionsAttribute) //'position' as the name because Three.js internal shaders will look for that value to position the vertices

const mesh = new THREE.Mesh(
    geometry,
    new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
)
scene.add(mesh)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

     // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) //prevent the pixel ratio from going above 2, which can cause performance issues on some devices
})

window.addEventListener('dblclick', () =>
{
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

    if(!fullscreenElement)
    {
        if(canvas.requestFullscreen)
        {
            canvas.requestFullscreen()
        }
        else if(canvas.webkitRequestFullscreen)
        {
            canvas.webkitRequestFullscreen()
        }
    }
    else
    {
        if(document.exitFullscreen)
        {
            document.exitFullscreen()
        }
        else if(document.webkitExitFullscreen)
        {
            document.webkitExitFullscreen()
        }
    }
})

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 1000)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height) // canvas size is set here



/**
 * Animate
 */
const tick = () =>
{
    controls.update()

    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
}

tick()
