import { Float, useMatcapTexture, Center, Text3D, OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { useState, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

const torusGeometry = new THREE.TorusGeometry(1, 0.6, 16, 32)
const material = new THREE.MeshMatcapMaterial()

export default function Experience() {

    //Reference is just an object with a current property
    //const donutGroup = useRef()
    const donuts = useRef([])
    const meme3D = useRef()
    const goon3D = useRef()
    const itIs3D = useRef()
    let which = 0


    const [memesMatCapTexture] = useMatcapTexture('7DA1BA_A4CCE8_5D7A8B_5E7C94', 256)
    const [goonMatCapTexture] = useMatcapTexture('80CA23_B7EE37_D5FA4C_A3E434', 256)
    const [itIsMatCapTexture] = useMatcapTexture('4F439F_A28BE5_8570D6_7765C9', 256)
    let matCapTexture = useMatcapTexture('7DA1BA_A4CCE8_5D7A8B_5E7C94', 256)



    useEffect(() => {

        which = Math.random()
        console.log(which);

        if (which < .3333) {
            matCapTexture = memesMatCapTexture
            meme3D.current.visible = true
        } else if (which > .6666) {
            matCapTexture = goonMatCapTexture
            goon3D.current.visible = true
        }
        else {
            matCapTexture = itIsMatCapTexture
            itIs3D.current.visible = true
        }

        matCapTexture.encoding = THREE.sRGBEncoding
        matCapTexture.needsUpdate = true

        material.matcap = matCapTexture
        material.needsUpdate = true
    }, [])


    // const [torusGeometry, setTorusGeometry] = useState()
    // const [material, setMaterial] = useState()


    // const tempArray = [...Array(100)]
    // console.log('-----')
    // tempArray.map((value,index)=>{
    //     console.log(value);
    // })

    useFrame((state, delta) => {
        for (const donut of donuts.current) {
            donut.rotation.y += delta * 0.2
            donut.rotation.x += (Math.random() - 0.5) * delta * 0.2
            donut.rotation.z += (Math.random() - 0.5) * delta * 0.2
        }
    })

    return <>

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        {/* <torusGeometry ref={setTorusGeometry} args={[1, 0.6, 16, 32]} />
        <meshMatcapMaterial ref={setMaterial} matcap={matCapTexture} /> */}

        <Float rotationIntensity={2} floatIntensity={2}>
            <Center>
                <Text3D ref={meme3D} font="./fonts/helvetiker_regular.typeface.json"
                    material={material}
                    size={0.75}
                    height={0.2}
                    curveSegments={12}
                    bevelEnabled
                    bevelThickness={0.02}
                    bevelSize={0.02}
                    bevelOffset={0}
                    bevelSegments={5}
                    visible={false}>
                    Memes Matter
                </Text3D>
            </Center>
        </Float>
        <Float rotationIntensity={2} floatIntensity={2}>
            <Center>
                <Text3D ref={goon3D} font="./fonts/helvetiker_regular.typeface.json"
                    material={material}
                    size={0.75}
                    height={0.2}
                    curveSegments={12}
                    bevelEnabled
                    bevelThickness={0.02}
                    bevelSize={0.02}
                    bevelOffset={0}
                    bevelSegments={5}
                    visible={false}>
                    GOON
                </Text3D>
            </Center>
        </Float>
        <Float rotationIntensity={2} floatIntensity={2}>
            <Center>
                <Text3D ref={itIs3D} font="./fonts/helvetiker_regular.typeface.json"
                    material={material}
                    size={0.75}
                    height={0.2}
                    curveSegments={12}
                    bevelEnabled
                    bevelThickness={0.02}
                    bevelSize={0.02}
                    bevelOffset={0}
                    bevelSegments={5}
                    visible={false}>
                    It is WhatItIs
                </Text3D>
            </Center>
        </Float>


        {[...Array(100)].map((value, index) =>
            <mesh
                ref={(element) => donuts.current[index] = (element)}
                key={index}
                geometry={torusGeometry}
                material={material}
                position={[
                    (Math.random() - 0.5) * 10,
                    (Math.random() - 0.5) * 10,
                    (Math.random() - 0.5) * 10
                ]}
                scale={0.2 + Math.random() * 0.2}
                rotation={[Math.random() * Math.PI,
                Math.random() * Math.PI,
                    0]} />
        )}

    </>
}