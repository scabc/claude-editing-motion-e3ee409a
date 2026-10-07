import React from 'react';
import {AbsoluteFill, Audio, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
import data from './reconstruction-data.json';
import playheads from './playhead-data.json';
import './accurate.css';

// Camera values measured against the reference's stationary editor borders.
// Illustrations are explicitly retained as isolated source-art sprite sheets.
// No full-frame recording, frame sequence, or video playback is used.
const val=(f:number, xs:number[], ys:number[])=>interpolate(f,xs,ys,{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
const uri=(name:string)=>staticFile(`reconstruction/${name}.webp`);
const Piece=({name,x,y,w,h,style={}}:{name:string;x:number;y:number;w:number;h:number;style?:React.CSSProperties})=><Img src={uri(name)} style={{position:'absolute',left:x,top:y,width:w,height:h,...style}}/>;
type Atlas={pages:string[];frames:(number[]|null)[]};
const Sprite=({atlas,frame}:{atlas:Atlas;frame:number})=>{
 const r=atlas.frames[frame];if(!r)return null;
 const [page,sx,sy,w,h,x,y,ow,oh]=r;
 return <div style={{position:'absolute',left:x,top:y,width:ow??w,height:oh??h,overflow:'hidden'}}><div style={{width:w,height:h,transform:ow?`scale(${ow/w},${oh/h})`:undefined,transformOrigin:'top left'}}><Img src={staticFile(`reconstruction/${atlas.pages[page]}`)} style={{position:'absolute',maxWidth:'none',width:2048,height:2048,left:-sx,top:-sy}}/></div></div>;
};
const Overlay=({name,from,to,x,y,w,h,f,pop=false}:{name:string;from:number;to:number;x:number;y:number;w:number;h:number;f:number;pop?:boolean})=>f<from||f>=to?null:<Piece name={name} x={x} y={y} w={w} h={h} style={{opacity:val(f,[from,from+2,to-3,to],[0,1,1,0]),transform:pop?`scale(${val(f,[from,from+3,from+6],[.6,1.12,1])})`:undefined}}/>;

const Sliders=({f}:{f:number})=>{
 const flash=val(f,[472,487],[0,.7]);
 const sat=val(f,[496,510,518,546,555],[1,2.25,3,3,1.1]);
 const zoom=val(f,[559,579],[0,.6]);
 const values=[flash,Math.min(1,sat/3),zoom,.5];
 const labels=[`${Math.round(flash*100)}%`,`${Math.round(sat*100)}%`,`${Math.round(zoom*100)}%`,'1.0x'];
 return <>{[155,215,275,335].map((y,i)=><React.Fragment key={y}>
  <div style={{position:'absolute',left:1009,top:y-14,width:229,height:31,background:'#faf7f1'}}/>
  <svg style={{position:'absolute',left:1017,top:y-8,width:220,height:18}}><path d="M4 7 Q103 6 213 7 Q219 10 213 13 L4 13 Q0 10 4 7Z" fill="#e5e3d8" stroke="#37332e" strokeWidth="1.8"/><path d={`M4 10 H${4+values[i]*209}`} stroke="#7ebdad" strokeWidth="5" strokeLinecap="round"/></svg>
  <Piece name="knob" x={1007+values[i]*211} y={y-11} w={24} h={25}/>
  <div style={{position:'absolute',left:1168,top:y-40,width:67,height:26,background:'#faf7f1',textAlign:'right',fontSize:19,color:'#8b867b'}}>{labels[i]}</div>
 </React.Fragment>)}</>;
};

const Timeline=({f}:{f:number})=>{
 const trim=val(f,[226,252],[0,128]);
 const city=val(f,[69,76],[0,1]);
 const ramen=val(f,[81,92],[0,1]);
 const dog=val(f,[95,103],[0,1]);
 const club=val(f,[108,118],[0,1]);
 const caption=f>=370;
 return <>
  <Piece name="clip-city" x={100} y={481} w={171} h={70} style={{opacity:city}}/>
  {f<227?<Piece name="clip-ramen-full" x={272} y={481} w={323} h={70} style={{opacity:ramen}}/>:<>
   <Piece name="clip-ramen-a" x={272} y={481} w={124} h={70}/>
   <Piece name="clip-ramen-b" x={525-trim} y={481} w={70} h={70}/>
  </>}
  <Piece name="clip-dog" x={596-trim} y={481} w={169} h={70} style={{opacity:dog}}/>
  <Piece name="clip-dance" x={766-trim} y={481} w={198} h={70} style={{opacity:club}}/>
  {f>116&&<div style={{position:'absolute',left:99,top:559,width:val(f,[116,131],[0,1036]),height:43,overflow:'hidden'}}><Piece name="audio" x={0} y={0} w={1036} h={43}/></div>}
  {caption&&<><Piece name="caption-track" x={466} y={444} w={173} h={28}/>{f<410&&<div style={{position:'absolute',left:val(f,[370,410],[489,636]),top:449,width:636-val(f,[370,410],[489,636]),height:17,background:'#f1ce61'}}/>}</>}
  {f>=287&&<Piece name="badge-rotate" x={255} y={502} w={31} h={34}/>}
  {f>=320&&<Piece name="badge-page" x={451} y={500} w={33} h={34}/>}
  {f>=349&&<Piece name="badge-glitch" x={623} y={500} w={33} h={34}/>}
  {f>45&&<svg style={{position:'absolute',left:playheads[f]-10,top:397,width:22,height:233,overflow:'visible'}}><path d="M10 15V230" stroke="#d45e74" strokeWidth="2.3"/><path d="M2 3H17V12L10 20L2 12Z" fill="#ce6374" stroke="#3f3430" strokeWidth="1.5"/></svg>}
  {f>=621&&<div className="r-beats">{Array.from({length:33},(_,i)=><svg key={i} width="17" height="18" style={{opacity:f>621+i*1.5?1:0}}><path d="M1 1H15L8 16Z" fill="#e5c458" stroke="#665e48" strokeWidth="1.5"/></svg>)}</div>}
 </>;
};

const DraggingMedia=({f}:{f:number})=>{
 const moves=[{start:60,end:75,name:'clip-city',from:[92,150],to:[110,475]}, {start:75,end:90,name:'clip-ramen-a',from:[203,151],to:[280,475]}, {start:91,end:104,name:'clip-dog',from:[93,230],to:[600,475]}, {start:104,end:118,name:'clip-dance',from:[210,230],to:[774,475]}];
 const m=moves.find(m=>f>=m.start&&f<m.end);if(!m)return null;
 const p=val(f,[m.start,m.end],[0,1]);
 return <Piece name={m.name} x={m.from[0]+(m.to[0]-m.from[0])*p-40} y={m.from[1]+(m.to[1]-m.from[1])*p-26} w={92} h={56} style={{transform:`rotate(${Math.sin(p*Math.PI)*-18}deg)`,boxShadow:'1px 2px 3px #0003'}}/>;
};

const Opening=({f}:{f:number})=>{
 if(f>30)return null;
 const z=val(f,[0,19,29],[1,1,.05]);const x=val(f,[0,19,29],[309,309,325]);const y=val(f,[0,19,29],[245,245,-170]);
 return <div style={{position:'absolute',left:x,top:y,width:663,height:207,transform:`scale(${z}) rotate(${val(f,[19,29],[0,-8])}deg)`,transformOrigin:'top left',opacity:val(f,[27,30],[1,0])}}>
  <Piece name="code-card" x={0} y={0} w={663} h={207}/>
  {[0,1,2].map(i=><div key={i} style={{position:'absolute',left:67+val(f,[i*6,i*6+6],[0,557]),top:57+i*45,width:557-val(f,[i*6,i*6+6],[0,557]),height:43,background:'#fffef7'}}/>)}
 </div>;
};

export const AccurateMotion=()=>{
 const f=useCurrentFrame();const [s,x,y]=data.camera[f];
 const final=f>=803;const saturation=f>=515&&f<547?2.9:1;
 const lib=f<270?'library-media':f<363?'library-transitions':'library-text';
 return <AbsoluteFill className="reconstruction">
  <Audio src={staticFile('assets/soundtrack.m4a')}/>
  <div style={{position:'absolute',width:1280,height:720,transform:`translate(${x}px,${y}px) scale(${s})`,transformOrigin:'top left',opacity:val(f,[20,30],[0,1])}}>
   <div style={{opacity:final?.25:1,filter:`saturate(${saturation})`}}>
    <Piece name="editor-shell" x={0} y={0} w={1280} h={720}/>
    <Piece name={lib} x={25} y={65} w={258} h={318} style={{opacity:val(f,[30,37],[0,1])}}/>
    <Sliders f={f}/><Timeline f={f}/>{f>=642&&<Piece name="beat-button" x={1140} y={563} w={99} h={43}/>}
    <div className="r-timecode">00:00:{String(Math.floor(f/30)).padStart(2,'0')}:{String(f%30).padStart(2,'0')}</div>
    {f>=725&&f<781&&<Piece name="export-progress" x={1060} y={15} w={184} h={39}/>}
    {f>=781&&<Piece name="export-complete" x={1060} y={15} w={184} h={39}/>}
    {f<47&&<div style={{position:'absolute',left:28,top:392,width:1222,height:307,background:'#f5f2e9',clipPath:`inset(${val(f,[36,47],[0,100])}% 0 0 0)`}}/>}
   </div>
   <Sprite atlas={data.phone} frame={f}/>
   <DraggingMedia f={f}/>
   <Overlay name="start-bubble" from={58} to={79} x={170} y={345} w={86} h={61} f={f}/>
   <Overlay name="sleep-bubble" from={175} to={207} x={395} y={434} w={132} h={45} f={f}/>
   <Overlay name="slash" from={193} to={200} x={364} y={455} w={35} h={103} f={f}/>
   <Overlay name="ding" from={783} to={803} x={898} y={89} w={90} h={65} f={f}/>
   {[[270,287,90,140,270,514,'badge-rotate'],[305,320,210,140,466,514,'badge-page'],[332,349,90,230,638,514,'badge-glitch']].map((a,i)=>{
    const [start,end,x0,y0,x1,y1,name]=a as [number,number,number,number,number,number,string];
    if(f<start||f>=end)return null;const p=(f-start)/(end-start);
    return <Piece key={i} name={name} x={x0+(x1-x0)*p} y={y0+(y1-y0)*p-100*Math.sin(Math.PI*p)} w={34} h={35} style={{transform:`rotate(${p*270}deg)`}}/>;
   })}
   {f>=365&&f<379&&<Piece name="caption-track" x={val(f,[365,379],[190,466])} y={val(f,[365,379],[176,444])} w={173} h={28}/>}
   <Overlay name="callout-net" from={288} to={323} x={282} y={294} w={184} h={70} f={f} pop/>
   <Overlay name="callout-cut" from={205} to={218} x={349} y={341} w={67} h={55} f={f} pop/>
   <Overlay name="cut-bin" from={230} to={255} x={407} y={550} w={246} h={130} f={f}/>
   <Overlay name="undo-key" from={425} to={466} x={262} y={490} w={177} h={111} f={f} pop/>
   <Overlay name="undo-word" from={421} to={450} x={281} y={330} w={118} h={59} f={f} pop/>
   <Overlay name="stamp" from={448} to={468} x={750} y={160} w={188} h={116} f={f} pop/>
   <Overlay name="beat-word" from={651} to={679} x={273} y={354} w={78} h={41} f={f} pop/>
   <Overlay name="sat-word" from={516} to={548} x={683} y={42} w={231} h={55} f={f} pop/>
   <Overlay name="bonk" from={771} to={789} x={875} y={293} w={147} h={74} f={f} pop/>
   <Sprite atlas={data.mascot} frame={f}/>
   {f>=805&&<div style={{position:'absolute',left:38,top:156,width:375,height:341,opacity:val(f,[805,811],[0,1])}}>
     <Piece name="note-final" x={0} y={0} w={375} h={341}/>
     <div style={{position:'absolute',left:27+val(f,[824,852],[0,323]),top:139,width:323-val(f,[824,852],[0,323]),height:108,background:'#fdfbf7'}}/>
     {f<888&&<div style={{position:'absolute',left:173,top:271,width:179,height:33,background:'#fdfbf7'}}/>}
   </div>}
  </div>
  <Opening f={f}/>
 </AbsoluteFill>;
};
