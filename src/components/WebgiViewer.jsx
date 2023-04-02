import React,{useRef, useCallback, useState, forwardRef, useImperativeHandle, useEffect} from 'react'
import {
    ViewerApp,
    AssetManagerPlugin,
    GBufferPlugin,
    ProgressivePlugin,
    TonemapPlugin,
    SSRPlugin,
    SSAOPlugin,
    BloomPlugin,
    GammaCorrectionPlugin,
    mobileAndTabletCheck,
    CanvasSnipperPlugin,



    // Color, // Import THREE.js internals
    // Texture, // Import THREE.js internals
} from "webgi";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {scrollAnimation} from "../lib/scroll-aimation";
gsap.registerPlugin(ScrollTrigger);

function WebgiViewer() {
    const useref = useRef(null);

    const memoizedScrollAnimation = useCallback((position, target, onUpdate) =>{
        if (position && target && onUpdate){
            scrollAnimation(position, target, onUpdate)
        }
    }, [])
    const setupViewer = useCallback(async()=>{
        
        // Initialize the viewer
        const viewer = new ViewerApp({
            canvas: useref.current,
        })

        // Add some plugins
        const manager = await viewer.addPlugin(AssetManagerPlugin)
        
        const camera = viewer.scene.activeCamera;
        const position = camera.position;
        const target  = camera.target;
    
        // Add plugins individually.
        await viewer.addPlugin(GBufferPlugin)
        await viewer.addPlugin(new ProgressivePlugin(32))
        await viewer.addPlugin(new TonemapPlugin(true))
        await viewer.addPlugin(GammaCorrectionPlugin)
        await viewer.addPlugin(SSRPlugin)
        await viewer.addPlugin(SSAOPlugin)

        await viewer.addPlugin(BloomPlugin)
      
    
    

    
        // This must be called once after all plugins are added.
        viewer.renderer.refreshPipeline()
    
        await manager.addFromPath("scene-black.glb");
        viewer.getPlugin(TonemapPlugin).config.clipBackground = true;
       
        viewer.scene.activeCamera.setCameraOptions({controlsEnabled:false});
        window.scrollTo(0, 0);
        let needsUpdate = true;
        const onUpdate = () =>{
            needsUpdate = true;
            viewer.setDirty();

        }

        viewer.addEventListener("preFrame", ()=>{
            if (needsUpdate){
            camera.positionTargetUpdated(true);
            needsUpdate= false;}

        })
        memoizedScrollAnimation(position, target, onUpdate );
    
        // Add some UI for tweak and testing.
        const uiPlugin = await viewer.addPlugin(TweakpaneUiPlugin)
        // Add plugins to the UI to see their settings.
        uiPlugin.setupPlugins<IViewerPlugin>(TonemapPlugin, CanvasSnipperPlugin)
    
    

    }, [])
    useEffect(()=>{setupViewer();}, [])
  return (
    <div id='webgi-canvas-container'>
        <canvas id='webgi-canvas' ref={useref}>

        </canvas>
    </div>
  )
}

export default WebgiViewer;