/***
* 粒子效果：雨、雪、雾
*/

export function addPostProcessStage(viewer, type) {
    removePostProcessStage(viewer);
    let fs = null, name = '', stage;
    switch (type) {
        case "snow":
            name = 'ces_snow';
            fs = fs_snow();
            break;
        case "rain":
            name = 'ces_rain';
            fs = fs_rain();
            break;
        case "fog":
            name = 'ces_fog';
            fs = fs_fog();
            break;
    }
    stage = new Cesium.PostProcessStage({
        name: name,
        fragmentShader: fs
    });
    viewer.scene.postProcessStages.add(stage);
}
export function removePostProcessStage(viewer) {
    let stages = viewer.scene.postProcessStages;
    for (let i = 0; i < stages._stages.length; i++) {
        stages.remove(stages.get(i));
    }
}
//  获取指定的stage
function getStage(viewer, name) {
    let stage = null,
        stages = viewer.scene.postProcessStages;
    for (let i = 0; i < stages._stages.length; i++) {
        let tmp = stages.get(i);
        if (tmp.name == name) {
            stage = tmp;
            break;
        }
    }
    return stage;
}
// 雪片源着色器代码字符串，它是GLSL代码语言
function fs_snow() {
    return 'uniform sampler2D colorTexture;\n'
        + 'varying vec2 v_textureCoordinates;\n'
        + 'float snow(vec2 uv,float scale)\n'
        + '{\n'
        + '    float time = czm_frameNumber / 60.0;\n'
        + '    float w=smoothstep(1.,0.,-uv.y*(scale/10.));if(w<.1)return 0.;\n'
        + '    uv+=time/scale;uv.y+=time*2./scale;uv.x+=sin(uv.y+time*.5)/scale;\n'
        + '    uv*=scale;vec2 s=floor(uv),f=fract(uv),p;float k=3.,d;\n'
        + '    p=.5+.35*sin(11.*fract(sin((s+p+scale)*mat2(7,3,6,5))*5.))-f;d=length(p);k=min(d,k);\n'
        + '    k=smoothstep(0.,k,sin(f.x+f.y)*0.01);\n'
        + '    return k*w;\n'
        + '}\n'
        + 'void main(void){\n'
        + '     vec2 resolution = czm_viewport.zw;\n'
        + '     vec2 uv=(gl_FragCoord.xy*2.-resolution.xy)/min(resolution.x,resolution.y);\n'
        + '     vec3 finalColor=vec3(0);\n'
        + '     float c = 0.0;\n'
        + '     c+=snow(uv,30.)*.0;\n'
        + '     c+=snow(uv,20.)*.0;\n'
        + '     c+=snow(uv,15.)*.0;\n'
        + '     c+=snow(uv,10.);\n'
        + '     c+=snow(uv,8.);\n'
        + '     c+=snow(uv,6.);\n'
        + '     c+=snow(uv,5.);\n'
        + '     finalColor=(vec3(c));\n'
        + '     gl_FragColor = mix(texture2D(colorTexture, v_textureCoordinates), vec4(finalColor,1), 0.5);\n'
        + '}';
}
// 雨片源着色器代码字符串，它是GLSL代码语言
function fs_rain() {
    return 'uniform sampler2D colorTexture;\n'
        + 'varying vec2 v_textureCoordinates;\n'
        + '	float hash(float x){\n'
        + '	     return fract(sin(x*133.3)*13.13);\n'
        + '	 }\n'
        + '	void main(void){\n'
        + '	     float time = czm_frameNumber / 60.0;\n'
        + '	     vec2 resolution = czm_viewport.zw; \n'
        + '	     vec2 uv=(gl_FragCoord.xy*2.-resolution.xy)/min(resolution.x,resolution.y);\n'
        + '	     vec3 c=vec3(.6,.7,.8); \n'
        + '	     float a=-.4;\n'
        + '	     float si=sin(a),co=cos(a);\n'
        + '	     uv*=mat2(co,-si,si,co);\n'
        + '	     uv*=length(uv+vec2(0,4.9))*.3+1.;\n'
        + '	     float v=1.-sin(hash(floor(uv.x*100.))*2.);\n'
        + '	     float b=clamp(abs(sin(20.*time*v+uv.y*(5./(2.+v))))-.95,0.,1.)*20.;\n'
        + '	     c*=v*b; \n'
        + '	     gl_FragColor = mix(texture2D(colorTexture, v_textureCoordinates), vec4(c,1), 0.5); \n'
        + '	}';
}
// 雾片源着色器代码字符串，它是GLSL代码语言
function fs_fog() {
    return 'uniform sampler2D colorTexture;\n'
        + '  uniform sampler2D depthTexture;\n'
        + '  varying vec2 v_textureCoordinates;\n'
        + '  void main(void)\n'
        + '  {\n'
        + '      vec4 origcolor=texture2D(colorTexture, v_textureCoordinates);\n'
        + '      vec4 fogcolor=vec4(0.8,0.8,0.8,0.5);\n'
        + '      float depth = czm_readDepth(depthTexture, v_textureCoordinates);\n'
        + '      vec4 depthcolor=texture2D(depthTexture, v_textureCoordinates);\n'
        + '      float f=(depthcolor.r-0.22)/0.2;\n'
        + '      if(f<0.0) f=0.0;\n'
        + '      else if(f>1.0) f=1.0;\n'
        + '      gl_FragColor = mix(origcolor,fogcolor,f);\n'
        + '   }';
}