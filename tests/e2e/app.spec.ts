import {test,expect} from '@playwright/test';
import fs from 'node:fs/promises';
const at='2026-11-04T10:30:00Z';
test.beforeEach(async({page})=>{await page.clock.install({time:new Date(at)});await page.goto('./');});
test('navigation, readable blocks, source details, selecting/removing and persistence',async({page})=>{
 await expect(page.getByRole('heading',{name:'Your week, your way.',exact:true})).toBeVisible();
 await page.getByRole('navigation',{name:'Courses'}).getByRole('button',{name:/IT Security/}).click();
 await page.getByRole('button',{name:'Add IT Security · Group 16',exact:true}).click();
 await page.getByRole('button',{name:/My timetable/}).click();await expect(page.locator('.event-card').first()).toContainText('10:00–12:00');
 await expect(page.locator('.event-card').first()).toContainText('Andreas Wilhelmer');await expect(page.locator('.event-card').first()).toContainText('01.13.007');
 await page.reload();await expect(page.getByRole('button',{name:/My timetable/})).toContainText('1');
 await page.getByRole('button',{name:/My timetable/}).click();await page.locator('.event-card').first().click();await expect(page.getByRole('dialog')).toContainText('Official source');
 await page.getByRole('button',{name:'Remove from my timetable'}).click();await page.getByRole('button',{name:'Close',exact:true}).click();await expect(page.getByRole('button',{name:/My timetable/})).toContainText('0');
});
test('conflicts, search, excluded dates and ICS download contents',async({page})=>{
 await page.getByRole('navigation',{name:'Courses'}).getByRole('button',{name:/IT Security/}).click();
 await page.getByRole('button',{name:'Add IT Security · Group 16',exact:true}).click();await page.getByRole('button',{name:'Add IT Security · Group 17',exact:true}).click();await expect(page.locator('.conflict')).toContainText('dates with overlaps');
 await page.getByRole('textbox',{name:'Search courses, tutors or rooms'}).fill('Wilhelmer');await expect(page.locator('.slot-row')).toHaveCount(2);await page.getByRole('button',{name:'Clear search'}).click();
 await page.getByRole('button',{name:/My timetable/}).click();await page.locator('.event-card').filter({hasText:'Group 16'}).first().click();await page.getByRole('dialog').getByRole('checkbox').filter({visible:true}).nth(1).uncheck();await page.getByRole('button',{name:'Close',exact:true}).click();
 await page.getByRole('button',{name:'Export calendar'}).click();const downloaded=page.waitForEvent('download');await page.getByRole('button',{name:'Download .ics'}).click();const download=await downloaded;const body=await fs.readFile((await download.path())!,'utf8');expect(body).toContain('BEGIN:VCALENDAR');expect(body).toContain('UID:its-17-2026-11-04');expect(body).not.toContain('UID:its-16-2026-11-04');expect(body).not.toContain('DTSTART:20261230');
});
test('shared plans restore without replacing a local plan until saved',async({page,context})=>{
 await page.getByRole('button',{name:'Add GBS · Mi-1400-A',exact:true}).click();await page.getByRole('button',{name:'Share',exact:true}).click();const link=await page.getByRole('textbox',{name:'Schedule link'}).inputValue();
 const second=await context.newPage();await second.goto(link);await expect(second.getByText('Shared preview',{exact:true})).toBeVisible();await expect(second.getByRole('button',{name:/My timetable/})).toContainText('1');
 await second.getByRole('button',{name:'Add GBS · Mi-1600-A',exact:true}).click();
 expect(JSON.parse((await second.evaluate(()=>localStorage.getItem('studyplan:v1')))! ).selected).toHaveLength(1);
 await second.getByRole('button',{name:'Save a copy'}).click();await second.reload();await expect(second.getByRole('button',{name:/My timetable/})).toContainText('2');await expect(second).not.toHaveURL(/#plan=/);
});
test('month/day/week/list navigation, live line and mobile overflow',async({page},info)=>{
 await page.getByRole('button',{name:'Day',exact:true}).click();await expect(page.getByTestId('now-line')).toBeVisible();await page.clock.fastForward(60000);await expect(page.getByTestId('now-line')).toContainText('11:31');
 await page.getByRole('button',{name:'Next period'}).click();await expect(page.getByRole('heading',{name:/Thursday.*5 November/})).toBeVisible();await page.getByRole('button',{name:'Today',exact:true}).click();
 await page.getByRole('button',{name:'Month',exact:true}).click();await expect(page.locator('.month-cell')).toHaveCount(42);await page.locator('.more').first().click();await expect(page.getByRole('button',{name:'Day',exact:true})).toHaveAttribute('aria-pressed','true');
 await page.getByRole('button',{name:'List',exact:true}).click();await expect(page.locator('.agenda')).toBeVisible();
 await page.getByRole('button',{name:'Week',exact:true}).click();const bounds=await page.evaluate(()=>({full:document.documentElement.scrollWidth,viewport:innerWidth}));expect(bounds.full).toBeLessThanOrEqual(bounds.viewport);
 await page.screenshot({path:`artifacts/${info.project.name}-week.png`,fullPage:false});
 await page.getByRole('button',{name:'Day',exact:true}).click();await page.getByRole('button',{name:'Today',exact:true}).click();await page.screenshot({path:`artifacts/${info.project.name}-day.png`,fullPage:false});
 const card=page.locator('.event-card').first();const size=await card.boundingBox();expect(size!.width).toBeGreaterThan(150);expect(size!.height).toBeGreaterThan(90);
});
test('date range, provisional export opt-in, cancelled groups and malformed links',async({page})=>{
 await page.getByRole('navigation',{name:'Courses'}).getByRole('button',{name:/GDB/}).click();await page.getByRole('button',{name:'Add GDB · Gruppe 03',exact:true}).click();await page.getByRole('button',{name:'Export calendar'}).click();await expect(page.getByRole('button',{name:'Download .ics'})).toBeDisabled();await page.getByRole('checkbox',{name:/Include.*provisional/}).check();await expect(page.getByRole('button',{name:'Download .ics'})).toBeEnabled();await page.getByRole('button',{name:'Close',exact:true}).click();
 await page.getByRole('button',{name:/Schedule dates & exclusions/}).click();await page.getByLabel('Schedule end').fill('2026-11-04');await page.getByRole('button',{name:'Apply dates'}).click();
 await page.getByRole('navigation',{name:'Courses'}).getByRole('button',{name:/IT Security/}).click();await expect(page.getByRole('button',{name:'Add IT Security · Group 13',exact:true})).toBeDisabled();
 await page.goto('./#plan=bad');await expect(page.getByRole('status')).toContainText('invalid');
});

test('standalone root assets, narrow viewport and invalid initial share preserve saved plan',async({page})=>{
 await page.setViewportSize({width:320,height:800});
 await page.getByRole('button',{name:'All courses',exact:true}).click();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
 await page.getByRole('button',{name:'Add GBS · Mi-1400-A',exact:true}).click();
 await page.goto('./#plan=invalid');await page.reload();
 await expect(page.getByRole('status')).toContainText('invalid');
 await expect(page.getByRole('button',{name:/My timetable/})).toContainText('1');
 await expect(page.getByText('Shared preview',{exact:true})).toHaveCount(0);
 const assets=await page.locator('script[src],link[rel=stylesheet]').evaluateAll(es=>es.map(e=>e.getAttribute('src')||e.getAttribute('href')));
 expect(assets.length).toBeGreaterThan(0);expect(assets.every(a=>a?.startsWith('/assets/'))).toBe(true);
});

test('range moves displayed period and assembly conflicts explain excluded dates',async({page})=>{
 await page.getByRole('navigation',{name:'Courses'}).getByRole('button',{name:/IT Security/}).click();
 await page.locator('.slot-summary').filter({hasText:'IT Security · Group 16'}).click();
 await expect(page.getByRole('dialog')).toContainText('FVV: teaching is suspended in Garching from 10:00 to 11:30');
 await expect(page.getByRole('dialog').getByRole('checkbox').first()).toBeDisabled();
 await page.getByRole('button',{name:'Close',exact:true}).click();
 await page.getByRole('button',{name:/Schedule dates & exclusions/}).click();
 await page.getByLabel('Schedule start').fill('2027-01-11');
 await page.getByRole('button',{name:'Apply dates'}).click();
 await page.getByRole('button',{name:'Week',exact:true}).click();
 await expect(page.getByRole('heading',{name:'11 Jan – 17 Jan 2027',exact:true})).toBeVisible();
 await expect(page.locator('.event-card').first()).toBeVisible();
});
