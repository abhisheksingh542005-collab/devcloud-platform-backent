import os from 'os';

export const getSystemMetrics = async () => {
  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const usedMem = totalMem - freeMem;
  const memoryUsage = ((usedMem / totalMem) * 100).toFixed(2);

  // 1-minute load average as a proxy for CPU load
  const cpuLoad = os.loadavg()[0];

  return {
    cpuLoad: cpuLoad.toFixed(2),
    memoryUsage: `${memoryUsage}%`,
    uptime: (os.uptime() / 3600).toFixed(2) + ' hours',
  };
};