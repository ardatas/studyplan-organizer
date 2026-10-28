import type { CSSProperties } from 'react';
export const courseColors:Record<string,string>={gdb:'#60a5fa',gbs:'#4ade80',its:'#fbbf24',ana:'#fb7185'};
const courseSurfaces:Record<string,string>={gdb:'#142e4d',gbs:'#153629',its:'#3c3018',ana:'#3d2331'};
export const courseStyle=(course:string):CSSProperties=>({'--event-color':courseColors[course]||'#7dc3ff','--event-surface':courseSurfaces[course]||'#10243c'} as CSSProperties);
