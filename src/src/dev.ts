//open dev menu without dev build
function getWebpackModules() {
  const moduleMap = {};
  const _moduleID = (Math.random()*1e18).toString(36);
  (globalThis['window'] as any).webpackJsonp.push([
    [1e3],
    {[_moduleID]: (_e, _t, i) => {
      let m = i.c;
      Object.keys(m).forEach((mod) => {
        moduleMap[mod] = m[mod].exports;
      });
    }},
    [[_moduleID]]
  ]);
  return moduleMap;
}
const M = getWebpackModules();
globalThis.P = (Object.values(M).find((module: any) => { return (Object.keys(module ?? {}).length === 2) && (module?.a?.bitNodeN !== undefined); }) as any).a;
globalThis.R = (Object.values(M).find((module: any) => { return (Object.keys(module ?? {}).length === 2) && (module?.b?.isInitialized !== undefined); }) as any).b;
globalThis.T = (Object.values(M).find((module: any) => { return (Object.keys(module ?? {}).length === 1) && (module?.a?.commandHistory !== undefined); }) as any).a;
globalThis.E = (Object.values(M).find((module: any) => { return (Object.keys(module ?? {}).length === 1) && (module?.a?._lastUpdate !== undefined); }) as any).a;
globalThis.M = M;

async function main(ns) {}
export { main };
