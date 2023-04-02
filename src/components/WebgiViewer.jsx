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
    AnisotropyPlugin,
    GammaCorrectionPlugin,
    mobileAndTabletCheck,
    addBasePlugins,
    CanvasSnipperPlugin,



    // Color, // Import THREE.js internals
    // Texture, // Import THREE.js internals
} from "webgi";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function WebgiViewer() {
    const useref = useRef(null);
    const setupViewer = useCallback(async()=>{
        
        // Initialize the viewer
        const viewer = new ViewerApp({
            canvas: useref.current,
        })
    
        // Add some plugins
        const manager = await viewer.addPlugin(AssetManagerPlugin)
    
    
        // Add plugins individually.
        // await viewer.addPlugin(GBufferPlugin)
        // await viewer.addPlugin(new ProgressivePlugin(32))
        // await viewer.addPlugin(new TonemapPlugin(!viewer.useRgbm))
        // await viewer.addPlugin(GammaCorrectionPlugin)
        // await viewer.addPlugin(SSRPlugin)
        // await viewer.addPlugin(SSAOPlugin)
        // await viewer.addPlugin(DiamondPlugin)
        // await viewer.addPlugin(FrameFadePlugin)
        // await viewer.addPlugin(GLTFAnimationPlugin)
        // await viewer.addPlugin(GroundPlugin)
        // await viewer.addPlugin(BloomPlugin)
        // await viewer.addPlugin(TemporalAAPlugin)
        // await viewer.addPlugin(AnisotropyPlugin)
    
        // or use this to add all main ones at once.
        await addBasePlugins(viewer)
    
        // Add more plugins not available in base, like CanvasSnipperPlugin which has helpers to download an image of the canvas.
        await viewer.addPlugin(CanvasSnipperPlugin)
    
        // This must be called once after all plugins are added.
        viewer.renderer.refreshPipeline()
    
        await manager.addFromPath("scene-black.glb");
        viewer.getPlugin(TonemapPlugin).config.clipBackground = true;
        // Load an environment map if not set in the glb file
        // await viewer.scene.setEnvironment(
        //     await manager.importer!.importSinglePath<ITexture>(
        //         "./assets/environment.hdr"
        //     )
        // );
    
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