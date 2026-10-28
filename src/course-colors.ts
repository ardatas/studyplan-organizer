import type { CSSProperties } from 'react';
export const courseColors:Record<string,string>={gdb:'#82b8ff',gbs:'#5cd6c8',its:'#f0bf69',ana:'#f28f89'};
export const courseStyle=(course:string):CSSProperties=>({'--event-color':courseColors[course]||'#7dc3ff'} as CSSProperties);
