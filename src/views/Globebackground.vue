<template>
  <div class="globe-bg">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref(null)

let animFrame
let canvas, ctx
let width, height
let rotX = 0.3, rotY = 0
let targetRotX = 0.3, targetRotY = 0
let autoRotate = true
let lastMouse = Date.now()

function latLonToXYZ(lat, lon, r) {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)
  return {
    x: -r * Math.sin(phi) * Math.cos(theta),
    y:  r * Math.cos(phi),
    z:  r * Math.sin(phi) * Math.sin(theta)
  }
}

function rotatePoint(p, rx, ry) {
  let x  =  p.x * Math.cos(ry) + p.z * Math.sin(ry)
  let y  =  p.y
  let z  = -p.x * Math.sin(ry) + p.z * Math.cos(ry)
  let y2 =  y * Math.cos(rx) - z * Math.sin(rx)
  let z2 =  y * Math.sin(rx) + z * Math.cos(rx)
  return { x, y: y2, z: z2 }
}

function project(p, r, cx, cy) {
  const fov   = width * 2.2
  const scale = fov / (fov + p.z)
  return {
    x: cx + p.x * scale,
    y: cy + p.y * scale,
    scale,
    visible: p.z > -r * 0.1
  }
}

function buildGrid(r) {
  const lines = []
  for (let lat = -80; lat <= 80; lat += 20) {
    const pts = []
    for (let lon = -180; lon <= 180; lon += 3) pts.push(latLonToXYZ(lat, lon, r))
    lines.push(pts)
  }
  for (let lon = -180; lon < 180; lon += 20) {
    const pts = []
    for (let lat = -90; lat <= 90; lat += 3) pts.push(latLonToXYZ(lat, lon, r))
    lines.push(pts)
  }
  return lines
}

const CONTINENTS = [
  [[35,355],[37,350],[40,345],[43,342],[44,338],[48,335],[52,332],[55,330],[58,328],[60,325],[62,322],[60,318],[58,315],[55,312],[52,310],[48,308],[44,306],[40,304],[37,302],[35,304],[33,308],[32,314],[33,320],[34,328],[35,335],[35,342],[35,355]],
  [[37,332],[30,332],[20,330],[10,330],[0,330],[-10,328],[-20,326],[-30,324],[-35,322],[-34,328],[-30,332],[-20,336],[-10,340],[0,342],[10,344],[20,344],[30,340],[37,336],[37,332]],
  [[60,280],[55,275],[50,270],[45,268],[40,266],[35,264],[30,262],[25,260],[20,258],[15,256],[20,252],[25,250],[30,252],[35,254],[40,256],[45,258],[50,260],[55,265],[60,270],[65,272],[68,275],[65,280],[60,280]],
  [[10,280],[5,278],[0,276],[-5,274],[-10,272],[-15,270],[-20,270],[-25,272],[-30,274],[-35,276],[-40,278],[-45,280],[-40,284],[-35,286],[-30,286],[-25,284],[-20,282],[-15,280],[-10,280],[-5,280],[0,280],[5,280],[10,280]],
  [[60,330],[55,335],[50,340],[45,345],[40,350],[35,355],[30,360],[25,365],[20,370],[25,375],[30,378],[35,380],[40,382],[45,380],[50,378],[55,375],[60,370],[65,365],[68,360],[65,355],[62,350],[60,345],[60,330]],
  [[-15,375],[-20,375],[-25,375],[-30,373],[-35,371],[-38,370],[-35,368],[-30,366],[-25,365],[-20,365],[-15,366],[-12,370],[-15,375]],
]

function buildContinents(r) {
  return CONTINENTS.map(c => c.map(([la, lo]) => latLonToXYZ(la, lo - 180, r)))
}

let gridLines = [], continentLines = [], globeR = 0

function init() {
  canvas = canvasRef.value
  ctx = canvas.getContext('2d')
  resize()
  window.addEventListener('resize', resize)
  window.addEventListener('mousemove', onMouseMove)
  loop()
}

function resize() {
  width = canvas.width = window.innerWidth
  height = canvas.height = window.innerHeight
  globeR = Math.min(width, height) * 0.38
  gridLines = buildGrid(globeR)
  continentLines = buildContinents(globeR)
}

function onMouseMove(e) {
  const dx = (e.clientX / width  - 0.5) * 2
  const dy = (e.clientY / height - 0.5) * 2
  targetRotY = dx * Math.PI * 0.6
  targetRotX = 0.3 + dy * Math.PI * 0.25
  lastMouse = Date.now()
  autoRotate = false
}

function drawLine(points, rx, ry, cx, cy, alpha, color, lw) {
  ctx.beginPath()
  ctx.lineWidth = lw
  let first = true
  for (const p of points) {
    const rp = rotatePoint(p, rx, ry)
    const pp = project(rp, globeR, cx, cy)
    if (!pp.visible) { first = true; continue }
    if (first) { ctx.moveTo(pp.x, pp.y); first = false }
    else ctx.lineTo(pp.x, pp.y)
  }
  ctx.globalAlpha = alpha
  ctx.strokeStyle = color
  ctx.stroke()
}

function loop() {
  animFrame = requestAnimationFrame(loop)

  if (Date.now() - lastMouse > 2000) autoRotate = true
  if (autoRotate) targetRotY += 0.004

  rotX += (targetRotX - rotX) * 0.06
  rotY += (targetRotY - rotY) * 0.06

  ctx.clearRect(0, 0, width, height)

  const cx = width  * 0.72   // positionné à droite
  const cy = height * 0.50

  // Halo glow
  const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, globeR * 1.4)
  grd.addColorStop(0,   'rgba(3,177,208,0.12)')
  grd.addColorStop(0.5, 'rgba(3,117,148,0.06)')
  grd.addColorStop(1,   'transparent')
  ctx.globalAlpha = 1
  ctx.fillStyle = grd
  ctx.beginPath()
  ctx.arc(cx, cy, globeR * 1.4, 0, Math.PI * 2)
  ctx.fill()

  // Grille
  for (const line of gridLines)
    drawLine(line, rotX, rotY, cx, cy, 0.28, 'rgba(3,200,230,1)', 0.5)

  // Continents
  for (const cLine of continentLines)
    drawLine(cLine, rotX, rotY, cx, cy, 0.9, 'rgba(200,240,255,1)', 1.5)

  // Cercle extérieur
  ctx.globalAlpha = 0.2
  ctx.strokeStyle = 'rgba(3,200,230,1)'
  ctx.lineWidth = 1.5
  ctx.beginPath()
  ctx.arc(cx, cy, globeR, 0, Math.PI * 2)
  ctx.stroke()

  // Points villes pulsants
  ctx.globalAlpha = 1
  const cities = [
    [51,0],[40,2],[35,139],[-34,151],[19,-99],[55,37],[-23,-43],[1,103],[48,2],[52,13]
  ]
  for (const [lat, lon] of cities) {
    const p  = latLonToXYZ(lat, lon, globeR)
    const rp = rotatePoint(p, rotX, rotY)
    if (rp.z < 0) continue
    const pp    = project(rp, globeR, cx, cy)
    const pulse = 0.5 + 0.5 * Math.sin(Date.now() * 0.0025 + lat)
    const dotR  = 3.5 * pp.scale

    const gDot = ctx.createRadialGradient(pp.x, pp.y, 0, pp.x, pp.y, dotR * 4)
    gDot.addColorStop(0,   `rgba(0,240,255,${0.95 * pulse})`)
    gDot.addColorStop(0.3, `rgba(3,177,208,${0.5  * pulse})`)
    gDot.addColorStop(1,   'transparent')
    ctx.fillStyle = gDot
    ctx.beginPath()
    ctx.arc(pp.x, pp.y, dotR * 4, 0, Math.PI * 2)
    ctx.fill()
  }
}

onMounted(init)
onUnmounted(() => {
  cancelAnimationFrame(animFrame)
  window.removeEventListener('resize', resize)
  window.removeEventListener('mousemove', onMouseMove)
})
</script>

