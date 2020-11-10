import { Curtains, Plane, ShaderPass, Vec3, Vec2 } from 'curtainsjs';
import gsap from 'gsap';
import { select } from '../utils';
import store from '../global/store';

const WebGl = {
	context: null,
	savedPlane: null,
	planes: [],
	init() {
		this.context = new Curtains({
			container: 'canvas',
			watchScroll: false,
			pixelRatio: Math.min(1.5, window.devicePixelRatio),
		});

		this.context
			.onError(() => {
				// we will add a class to the document body to display original images
				document.body.classList.add('no-curtains', 'site-loaded');
			})
			.onContextLost(() => {
				// on context lost, try to restore the context
				this.context.restoreContext();
			})
			.onContextRestored(() => {
				// since we have some textures that do not have any parent
				// they won't be automatically restored
				// so restore them after everything else has been restored
				for (let i = 0; i < textures.length; i++) {
					if (!textures[i].hasParent()) {
						textures[i]._restoreContext();
					}
				}
			});

		var shaderPass = new ShaderPass(this.context, {
			fragmentShader: `
            precision mediump float;
            // get our varyings
            varying vec3 vVertexPosition;
            varying vec2 vTextureCoord;
            // our render texture
            uniform sampler2D uRenderTexture;
            // the uniform we declared inside our javascript
            uniform float uTime;
            void main() {
            // display our render texture, which contains our shader pass frame buffer object content
        
            vec2 textureCoord = vTextureCoord;
            // displace our pixels along the X axis based on our time uniform
            // textures coords are ranging from 0.0 to 1.0 on both axis
            textureCoord.x += sin(textureCoord.y * 15.0) * cos(textureCoord.x * 15.0) * (cos(uTime / 50.0)) / 50.0;
            textureCoord.y += sin(textureCoord.y * 15.0) * sin(textureCoord.x * 15.0) * (sin(uTime / 100.0)) / 50.0;
        
            gl_FragColor = texture2D(uRenderTexture, textureCoord);
            }
        
            `, // our fragment shader ID
			uniforms: {
				time: {
					name: 'uTime', // uniform name that will be passed to our shaders
					type: '1f', // this means our uniform is a float
					value: 0,
				},
			},
		});

		shaderPass
			.onReady(() => {})
			.onRender(() => {
				shaderPass.uniforms.time.value++; // update our time uniform value
			});
	},
	add(elm) {
		const params = {
			vertexShader: `
                precision mediump float;
                // those are the mandatory attributes that the lib sets
                attribute vec3 aVertexPosition;
                attribute vec2 aTextureCoord;
    
                // those are mandatory uniforms that the lib sets and that contain our model view and projection matrix
                uniform mat4 uMVMatrix;
                uniform mat4 uPMatrix;
                
                // our texture matrix that will handle image cover
                uniform mat4 uTextureMatrix0;
                
                // pass your vertex and texture coords to the fragment shader
                varying vec3 vVertexPosition;
                varying vec2 vTextureCoord;
                void main() {
                    vec3 vertexPosition = aVertexPosition;
                    gl_Position = uPMatrix * uMVMatrix * vec4(vertexPosition, 1.0);
                
                    // set the varyings
                    // here we use our texture matrix to calculate the accurate texture coords
                    vTextureCoord = (uTextureMatrix0 * vec4(aTextureCoord, 0.0, 1.0)).xy;
                    vVertexPosition = vertexPosition;
                }
            `, // our vertex shader ID
			fragmentShader: `
                precision mediump float;
                
                // get our varyings
                varying vec3 vVertexPosition;
                varying vec2 vTextureCoord;
                
                // the uniform we declared inside our javascript
                uniform float uTime;
                
                // our texture sampler (default name, to use a different name please refer to the documentation)
                uniform sampler2D uSampler0;
                void main() {
                // get our texture coords from our varying
                vec2 textureCoord = vTextureCoord;
                // textures coords are ranging from 0.0 to 1.0 on both axis
                
                gl_FragColor = texture2D(uSampler0, textureCoord);
                }
            `, // our fragment shader ID
			uniforms: {
				time: {
					name: 'uTime', // uniform name that will be passed to our shaders
					type: '1f', // this means our uniform is a float
					value: 0,
				},
			},
		};

		elm.children[0].style.display = 'none';

		this.planes.push(new Plane(this.context, elm, params));
	},
	goToProject(plane) {
		plane.userData.isTransition = true;

		var elm = select('[data-template=project]');
		var rect = elm.getBoundingClientRect();

		this.savedPlane = plane;

		this.planes.map((item) => {
			if (!item.userData.isTransition) {
				item.visible = false;
			}
		});

		var scale = {
			x: 1,
			y: 1,
		};

		var translate = {
			x: 0,
			y: 0,
			z: 0,
		};

		gsap.to(scale, {
			x: rect.width / plane.htmlElement.clientWidth,
			y: rect.height / plane.htmlElement.clientHeight,
			duration: 2,
			ease: 'elastic.out(1, 0.4)',
			onUpdate: () => {
				plane.setScale(new Vec2(scale.x, scale.y));
			},
		});

		gsap.to(translate, {
			x:
				rect.left +
				rect.width / 2 -
				plane.htmlElement.offsetLeft -
				plane.htmlElement.clientWidth / 2,
			y:
				rect.top +
				rect.height / 2 -
				plane.htmlElement.offsetTop -
				store.scroller.smoothScrollPos -
				plane.htmlElement.clientHeight / 2,
			duration: 2,
			ease: 'elastic.out(1, 0.4)',
			onUpdate: () => {
				plane.setRelativeTranslation(
					new Vec3(translate.x, translate.y, translate.z)
				);
			},
		});
	},
	setSavedPlane(elm) {
		this.savedPlane.resetPlane();
		this.savedPlane.resetPlane(elm);
		this.planes.push(this.savedPlane);
		this.savedPlane = null;

		elm.children[0].style.opacity = '0';
	},
	clean(view) {
		for (let index = 0; index < this.planes.length; index++) {
			this.planes[index].remove();

			console.log('remove!');
		}
		this.planes = [];

		this.context.resize();
	},
};

export default WebGl;
