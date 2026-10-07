import React from 'react';
import {AbsoluteFill, Audio, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
import './style.css';

// All motion is derived from the frame: scrubbing and parallel rendering are deterministic.
const curve = (t:number, xs:number[], ys:number[]) => interpolate(t,xs,ys,{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
const assets = ['city','ramen','dog','dance'];
const filenames = ['夜景.mp4','拉面.mp4','柴犬.mov','小克蹦迪.mp4'];
const Art = ({kind,style={}}:{kind:number;style?:React.CSSProperties}) => <Img src={staticFile(`assets/${assets[kind]}.png`)} style={{width:'100%',height:'100%',objectFit:'cover',...style}}/>;
const Box = ({children,style={},className=''}:{children?:React.ReactNode;style?:React.CSSProperties;className?:string}) => <div className={`box ${className}`} style={style}>{children}</div>;

export const Robot = ({x,y,t,arm,emotion='happy',scale=1}:{x:number;y:number;t:number;arm?:[number,number];emotion?:string;scale?:number}) => {
  const bob = Math.sin(t*8)*2;
  return <svg style={{position:'absolute',left:0,top:0,width:1280,height:720,overflow:'visible',pointerEvents:'none'}}>
    {arm && <g stroke="#332d28" strokeWidth="15" strokeLinecap="round"><path d={`M ${x+75} ${y+32+bob} L ${arm[0]} ${arm[1]}`} /><path d={`M ${x+75} ${y+32+bob} L ${arm[0]} ${arm[1]}`} stroke="#c87764" strokeWidth="10"/><circle cx={arm[0]} cy={arm[1]} r="7" fill="#c87764" strokeWidth="2"/></g>}
    <g transform={`translate(${x},${y+bob}) scale(${scale}) rotate(${emotion==='angry'?-5:Math.sin(t*5)*2},45,35)`} stroke="#332d28" strokeWidth="2.7" strokeLinejoin="round">
      <path d="M12 59 L12 78 L22 78 L22 59 M65 59 L65 78 L76 78 L76 59" fill="#c87764"/>
      <path d="M1 26 H-9 V38 H1 M88 26 H99 V38 H88" fill="#c87764"/>
      <path d="M1 2 Q40 0 88 2 L89 60 Q43 63 1 60 Z" fill="#c16c59"/>
      <path d="M5 7 L82 6" stroke="#df9982"/>
      {emotion==='angry'?<path d="M23 24 L34 28 M59 23 L48 28" strokeWidth="5"/>:emotion==='happy'?<path d="M23 29 Q28 17 34 28 M51 29 Q57 17 63 28" fill="none"/>:<><ellipse cx="28" cy="25" rx="3" ry="7" fill="#302b26"/><ellipse cx="57" cy="25" rx="3" ry="7" fill="#302b26"/><path d="M28 21 v2 M57 21 v2" stroke="#fff" strokeWidth="2"/></>}
      {emotion==='happy'&&<><ellipse cx="20" cy="37" rx="7" ry="4" fill="#df9290" stroke="none"/><ellipse cx="66" cy="37" rx="7" ry="4" fill="#df9290" stroke="none"/></>}
      <path d="M7 49 l9 -6 M39 57 l9 -6 M71 48 l8 -6" opacity=".08"/>
    </g>
  </svg>;
};

const Library = ({t}:{t:number}) => {
 const tab=t<9?0:t<12?1:2;
 return <Box className="library" style={{opacity:curve(t,[.9,1.4],[0,1])}}>
  <div className="tabs">{['素材','转场','文字'].map((s,i)=><Box key={s} style={{background:i===tab?'#f3ce68':'#faf8f1'}}>{s}</Box>)}</div>
  {tab===0?<div className="asset-grid">{filenames.map((name,i)=><div key={name}><Box className="thumb" style={{outline:t>2&&t<4&&i===Math.floor(t-2)?'3px solid #dfbd54':undefined}}><Art kind={i}/><span className="duration">{[2.4,4.6,2.4,2.8][i]}s</span></Box><div className="filename">{name}</div></div>)}{[0,1].map(i=><div key={i}><div className="import">＋</div><div className="filename muted">导入素材</div></div>)}</div>:tab===1?<div className="asset-grid">{['旋转','翻页','故障','缩放','滑动','溶解'].map((s,i)=><div key={s}><Box className="effect" style={{background:['#dfdaf0','#d8f1e8','#f8dbe5','#d6edf5','#f8ebc9','#ece7dc'][i]}}><span>{['◎','▤','▣','⊕','➜','▧'][i]}</span></Box><div className="filename">{s}</div></div>)}</div>:<div className="text-presets"><Box><span className="outlined">前方高能</span></Box><Box style={{background:'#fae7ee',color:'#d68da5'}}>好耶～</Box><Box style={{background:'#30263b',color:'#f0d3ff'}}>霓虹 NEON</Box></div>}
 </Box>;
};

const Adjust = ({t}:{t:number}) => {
 const values=[t<16?0:70,t<16?50:t<17?100:t<18?95:t<19?70:35,t<18?0:60,50];
 return <Box className="adjust"><div style={{fontSize:25,marginBottom:12}}>调整 ✧</div>{['闪光','饱和度','缩放冲击','速度'].map((name,i)=><div className="slider" key={name}><div>{name}<span>{i===3?'1.0x':i===1?(t<16?'100%':t<17?'100%':t<18?'225%':'110%'):`${values[i]}%`}</span></div><div className="rail"><div style={{width:`${values[i]}%`}}/><i style={{left:`${values[i]}%`}}/></div></div>)}</Box>;
};

const DanceScene = ({t}:{t:number}) => {
 const sway=Math.sin(t*7)*6;
 return <svg width="100%" height="100%" viewBox="0 0 180 290" preserveAspectRatio="none">
  <defs><linearGradient id="club" x2="0" y2="1"><stop stopColor="#6860a5"/><stop offset="1" stopColor="#bd87ad"/></linearGradient><linearGradient id="floor" x2="0" y2="1"><stop stopColor="#35355c"/><stop offset="1" stopColor="#232743"/></linearGradient></defs>
  <path fill="url(#club)" d="M0 0H180V191H0Z"/><path fill="url(#floor)" d="M0 191H180V290H0Z"/>
  <g opacity=".17" fill="#ffffcb" transform={`rotate(${Math.sin(t*2)*18},90,40)`}><path d="M90 40L0 195H38Z"/><path d="M90 40L160 192H180Z"/></g>
  {Array.from({length:7},(_,row)=>Array.from({length:10},(_,col)=>{const y1=191+99*(row/7)**1.7,y2=191+99*((row+1)/7)**1.7;const spread1=(y1-184)*1.1,spread2=(y2-184)*1.1;return <path key={`${row}-${col}`} d={`M${90+(col-5)*spread1/5},${y1} L${90+(col-4)*spread1/5},${y1} L${90+(col-4)*spread2/5},${y2} L${90+(col-5)*spread2/5},${y2}Z`} fill={['#7471b0','#383f71','#658d99','#bf96aa','#b9a955'][(row+col)%5]} opacity={.6}/>;}))}
  <path d="M90 0V32" stroke="#302e35" strokeWidth="2"/><circle cx="90" cy="45" r="18" fill="#d9d9ed" stroke="#302e35" strokeWidth="2"/>
  <g stroke="#817ba2" strokeWidth=".8"><path d="M73 39H107M73 49H107M78 58H102M82 28V61M95 28V62"/></g><path d="M78 33H91V39H78Z" fill="#fff"/><path d="M94 48H104V55H94Z" fill="#efdf82"/>
  <g transform={`translate(${sway},${Math.abs(Math.sin(t*7))*-7}) rotate(${sway/2},90,205)`} stroke="#322d32" strokeWidth="2.2" strokeLinejoin="round">
   <path d="M62 197L65 222H74L73 197M105 197L106 222H116L116 197" fill="#c97865"/>
   <path d="M59 170Q45 164 42 148M121 169Q138 160 140 144" fill="none" strokeWidth="9"/><path d="M59 170Q45 164 42 148M121 169Q138 160 140 144" fill="none" stroke="#c97865" strokeWidth="5"/>
   <circle cx="42" cy="148" r="6" fill="#c97865"/><circle cx="140" cy="144" r="6" fill="#c97865"/>
   <path d="M57 159L121 156L123 203L59 206Z" fill="#c77562"/><path d="M71 178Q75 171 79 178M98 177Q102 169 106 177" fill="none"/><ellipse cx="69" cy="188" rx="5" ry="3" fill="#df9393" stroke="none"/><ellipse cx="110" cy="185" rx="5" ry="3" fill="#df9393" stroke="none"/>
  </g>
 </svg>;
};

const Phone = ({t,final=false}:{t:number;final?:boolean}) => {
 const kind=t<5?0:t<11?1:t<16?2:3;
 const shake=t>17&&t<18?Math.sin(t*45)*4:0;
 const ending=final?curve(t,[26.8,28.2],[0,1]):0;
 return <div className="phone-group" style={{left:final?curve(t,[26.8,28.2],[560,453]):560,top:final?curve(t,[26.8,28.2],[73,133]):73,transform:`translateX(${shake}px) scale(${final?1+ending*.45:1})`,transformOrigin:'top left'}}>
  <div className="phone"><div className="screen" style={{filter:t>17&&t<18?'saturate(2.5)':undefined}}>{kind===3?<DanceScene t={t}/>:<Art kind={kind} style={{transform:`rotate(${t>9&&t<10?curve(t,[9,9.5,10],[0,360,360]):0}deg)`}}/>}
   {t<2.4&&<AbsoluteFill style={{background:'#23211e',opacity:curve(t,[2,2.4],[1,0])}}/>}
   {t>6&&t<7&&<AbsoluteFill style={{backdropFilter:'blur(5px) grayscale(1)',background:'#4445',alignItems:'center',justifyContent:'center',color:'white',fontSize:27,textShadow:'2px 2px #222'}}>◌<br/>对焦中..</AbsoluteFill>}
   {t>12&&t<16&&<div className="phone-caption outlined">{t>14?'前方高能预警':'前方高能'}</div>}
   {kind===3&&Array.from({length:8},(_,i)=><span className="spark" key={i} style={{left:20+(i*31)%170,top:25+(i*53)%210,opacity:.4+.6*Math.abs(Math.sin(t*4+i)),transform:`scale(${.6+.4*Math.sin(t*4+i)})`}}>✦</span>)}
   {final&&t>27&&<><div className="social">🟠<br/>♥<small>10.2w</small>▣<small>2333</small>➤<small>分享</small></div><div className="social-caption">@小克 · Opus 5.5<br/><small>#AI剪辑 #卡点 #code2video</small></div></>}
   {final&&t>28.5&&<div className="win outlined">拿捏了!</div>}
  </div><div className="notch"/></div>
  {!final&&<div className="playback">◂　⊙　▸</div>}
 </div>;
};

const Timeline = ({t}:{t:number}) => {
 const progress=curve(t,[2,4,5,8,11,15,16,23,25],[0,2.3,2.5,4.2,5.8,8.1,8.2,11.7,12]);
 const clips=t<3?1:t<3.7?2:t<4?3:4;
 const widths=[175,t<8?330:205,175,205];
 let offset=0;
 return <Box className="timeline" style={{opacity:curve(t,[1.1,1.6],[0,1])}}>
  <div className="ruler">{Array.from({length:9},(_,i)=><div key={i} style={{left:i*140}}><span>0:{String(i*2).padStart(2,'0')}</span><i/></div>)}</div>
  <div className="track-labels">{['T','▶','♪'].map((v,i)=><Box key={v} style={{background:['#faf0c8','#dbefe5','#e3dcef'][i],height:i===1?66:40}}>{v}</Box>)}</div>
  <div className="video-track">{assets.slice(0,clips).map((a,i)=>{const left=offset;offset+=widths[i]+3;return <Box key={a} className="clip" style={{left,width:widths[i],borderColor:i===2?'#487e70':i===3?'#885578':undefined}}><div className="clip-art">{Array.from({length:i===1?4:3},(_,j)=><Art key={j} kind={i}/>)}</div><span className="clip-name">{filenames[i]}</span>{i===1&&t>5.5&&t<8&&<div className="bad-cut"/>}{t>9&&i>0&&<div className="transition">{['','◎','▤','▣'][i]}</div>}</Box>;})}</div>
  {t>4&&<Box className="audio-track"><span>♪ bgm_小克.wav</span><svg width="1150" height="29"><g stroke="#9d87c6" strokeWidth="1.7">{Array.from({length:380},(_,i)=>{const h=3+22*Math.abs(Math.sin(i*1.61)*Math.sin(i*.031+1));return <path key={i} d={`M ${i*3} ${14-h/2} v ${h}`}/>;})}</g></svg></Box>}
  {t>12&&<Box className="caption-clip" style={{width:175,left:440}}>T 前方高能预警</Box>}
  <div className="playhead" style={{left:82+progress*70}}><div/></div>
  {t>22&&<div className="beats">{Array.from({length:34},(_,i)=><span key={i}>▽</span>)}</div>}
  <div className="zoom-control">− ───○──── ＋</div>
 </Box>;
};

const Callout = ({children,x,y,color='#7fb4a3',size=36}:{children:React.ReactNode;x:number;y:number;color?:string;size?:number}) => <div className="callout" style={{left:x,top:y,color,fontSize:size}}>{children}</div>;

export const EditingMotion = () => {
 const f=useCurrentFrame();const t=f/30;
 const z=curve(t,[.7,1.2,1.8,2.4,5.5,6,8.5,9,15.5,16,19.5,20,23.5,24,26,26.5],[.34,1,1,1.28,1.28,1.48,1.48,1.28,1.28,1.4,1.4,1.28,1.28,1.38,1.38,1]);
 const dx=curve(t,[1.8,2.4,5.5,6,8.5,9,15.5,16,19.5,20,23.5,24,26,26.5],[0,-80,-80,-120,-120,-80,-80,-440,-440,-240,-240,-380,-380,0]);
 const dy=curve(t,[1.8,2.4,5.5,6,8.5,9,15.5,16,23.5,24,26,26.5],[0,-85,-85,-205,-205,-95,-95,0,0,0,0,0]);
 const rx=curve(t,[2,3,4,6,8,10,12,14,16,18,20,22,24,26],[120,140,180,160,170,150,170,240,350,350,400,700,860,980]);
 const ry=curve(t,[2,4,6,8,10,12,14,16,20,22,24,26],[350,350,350,350,335,335,335,405,420,430,390,450]);
 let arm:[number,number]|undefined;
 if(t>2&&t<4)arm=[t<3?220:220, t<3?105:190];
 if(t>9.2&&t<10.8)arm=[205,175];
 if(t>16&&t<17.7)arm=[1130,220];
 if(t>18.5&&t<19.5)arm=[1110,281];
 if(t>21&&t<22.5)arm=[1200,598];
 if(t>24&&t<25)arm=[1150,34];
 return <AbsoluteFill className="canvas">
  <Audio src={staticFile('assets/soundtrack.m4a')}/>
  {t<.9&&<Box className="code-window" style={{transform:`scale(${curve(t,[0,.5,.9],[1,1,.6])})`,opacity:curve(t,[.65,.9],[1,0])}}><div className="code-title">🔴🟡🟢 <span>小克.js — 终端</span></div><p><b>1</b> <span style={{color:'#75a8ac'}}>const</span> 剪辑软件 = 小克.写代码()</p><p><b>2</b> <span style={{color:'#84bda0'}}>帮我做</span>.动态(<span style={{color:'#d8aa62'}}>剪切, 转场, 字幕</span>)<span className="cursor">▍</span></p><p><b>3</b></p></Box>}
  <div className="editor" style={{opacity:curve(t,[.7,1],[0,1]),transform:`translate(${dx}px,${dy}px) scale(${z})`,transformOrigin:'top left'}}>
   <div style={{opacity:t>27? .24:1}}>
    <Box className="header"><div className="traffic">🔴🟡🟢</div><span>🎬 小克剪辑_最终版_打死不改(3).mp4</span><Box className="timecode">00:00:{String(Math.floor(t)).padStart(2,'0')}:{String(f%30).padStart(2,'0')}</Box><span className="saved">· 已自动保存</span><Box className="resolution">1080p</Box><Box className="export" style={{background:t>24&&t<26?'#f1ce60':'#79bdb6'}}>{t>26?'完成 ✓':t>24?`渲染中 ${Math.min(99.99,(t-24)*60).toFixed(1)}%`:'↥ 导出'}</Box></Box>
    <Library t={t}/><Adjust t={t}/><Timeline t={t}/>
   </div>
   {t<27&&<Phone t={t}/>}
   {t>2&&t<26.5&&<Robot x={rx} y={ry} t={t} arm={arm} emotion={t>6&&t<8||t>17&&t<19?'angry':t<12?'neutral':'happy'}/>}
   {t>2&&t<2.8&&<Box className="bubble" style={{left:rx+10,top:ry-40}}>开工!</Box>}
   {t>6&&t<7.6&&<Box className="bubble" style={{left:rx+140,top:ry+20}}>这段在发呆 zzz</Box>}
   {t>7.8&&t<8.8&&<><Callout x={520} y={335} color="#f3cf54">咔!</Callout><Callout x={650} y={540} color="#f3cf54">哐当!</Callout><div className="trash" style={{left:620,top:510}}>▥</div></>}
   {t>9.5&&t<10.8&&<Callout x={310} y={280}>空心入网!</Callout>}
   {t>14&&t<15.5&&<><Callout x={710} y={320}>撤销!</Callout><Box className="keycap" style={{left:rx-10,top:ry+40}}>Ctrl+Z</Box></>}
   {t>15.3&&t<16&&<div className="stamp">已修正</div>}
   {t>17&&t<18&&<Callout x={530} y={62} color="#e965ad" size={30}>饱和度：拉满</Callout>}
   {t>22&&t<23&&<Callout x={315} y={345}>卡点!</Callout>}
   {t>26&&t<26.8&&<Callout x={870} y={80}>叮!</Callout>}
   {t>26.8&&<><Phone t={t} final/><Box className="note" style={{opacity:curve(t,[26.8,27.3],[0,1]),transform:`rotate(-2deg) translateY(${curve(t,[26.8,27.3],[20,0])}px)`}}><div className="tape"/><div>30 秒剪完,</div><strong>{'Opus 5.5'.slice(0,Math.floor(curve(t,[27.2,29],[0,8])))}</strong><svg width="285" height="15"><path d="M0 9 Q140 -5 280 9" fill="none" stroke="#cc7a68" strokeWidth="5"/></svg>{t>29.4&&<small>— 小克 收工 ✧</small>}</Box><Robot x={980} y={490} scale={1.25} t={t}/>{Array.from({length:26},(_,i)=><span key={i} className="confetti" style={{left:950+(i*71)%310,top:(t*70+i*49)%440,color:['#ce8b75','#dec468','#80b3a6'][i%3],transform:`rotate(${i*40+t*70}deg)`}}>▪</span>)}</>}
  </div>
  <div className="paper-grain"/>
 </AbsoluteFill>;
};
