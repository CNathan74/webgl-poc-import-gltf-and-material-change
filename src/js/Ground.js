import {Color, FrontSide, Mesh, MeshBasicMaterial, PlaneBufferGeometry} from "three";

export class Ground {
  constructor() {
    this.mesh = null

    this.init()
  }

  init() {
    const width = 20
    const height = 20
    const geometry = new PlaneBufferGeometry(width, height)
    const material = new MeshBasicMaterial({
      side: FrontSide,
      color: new Color(0xe0e020),
      polygonOffset: true,
      polygonOffsetUnits: 0.9,
      polygonOffsetFactor: 1,
    })
    this.mesh = new Mesh(geometry, material)
    this.mesh.rotateX(-Math.PI / 2)
  }

  destroy() {
    // dispose permet de libérer ... ?
    this.mesh.geometry.dispose()
    this.mesh.material.dispose()
    this.mesh = null
  }
}